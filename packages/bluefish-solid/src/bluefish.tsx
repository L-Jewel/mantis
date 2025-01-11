import Layout from "./layout";
import { maxOfMaybes, maybeAdd, maybeSub, minOfMaybes } from "./util/maybe";
import {
  ScenegraphContext,
  ScenegraphNode,
  Transform,
  createScenegraph,
  Id,
  BBox,
  ChildNode,
  Scenegraph,
  resolveScenegraphElements,
  BBoxOwners,
  TransformOwners,
} from "./scenegraph";
import {
  Accessor,
  JSX,
  ParentProps,
  Show,
  createContext,
  createEffect,
  createRenderEffect,
  createSignal,
  createUniqueId,
  mergeProps,
  untrack,
} from "solid-js";
import { ParentScopeIdContext, Scope, ScopeContext } from "./createName";
import { createStore } from "solid-js/store";
import { ErrorContext, createErrorContext } from "./errorContext";
import { BluefishError } from "./errors";
import { getAncestorChain } from "./util/lca";
import toast, { Toaster } from "solid-toast";
import gsap from "gsap";
import * as d3 from "d3";
import { MantisComponentType, useMantisProvider } from "./miniMap";

export type BluefishProps = ParentProps<{
  width?: number;
  height?: number;
  padding?: number;
  id?: string;
  debug?: boolean;
  positioning?: "absolute" | "relative";
  enlargementFactor?: number;
  mantisComponentType: MantisComponentType;
}>;

type BluefishNodeType = {
  type: "node";
  bbox: BBox;
  bboxOwners: BBoxOwners;
  transform: Transform;
  transformOwners: TransformOwners;
  children: Id[];
  parent: Id | null;
  customData?: any;
  layout: () => void;
};
type Point = {
  x: number;
  y: number;
};

declare global {
  interface Window {
    bluefish?: { [key: string]: { [key: string]: ScenegraphNode } };
  }
}

const createResolveScopeName = (scope: Scope) => (id: Id) => {
  for (const [name, value] of Object.entries(scope)) {
    if (value.layoutNode === id) {
      return name;
    }
  }

  return id;
};

const createOnError =
  (scenegraph: Scenegraph, scope: Scope) => (error: BluefishError) => {
    const resolveScopeName = createResolveScopeName(scope);
    const errorMessage = `Error in ${resolveScopeName(error.source)}:
    ${error.display(resolveScopeName)} (${error.type})

Error path from root:
  ${getAncestorChain(scenegraph, error.source)
    .concat([error.source])
    .map((id) => resolveScopeName(id))
    .join(" >>\n  ")}`;

    console.error(errorMessage);
    // toast.error(errorMessage);
  };

export const LayoutUIDContext = createContext<Accessor<string>>(() =>
  createUniqueId()
);

export function Bluefish(props: BluefishProps) {
  props = mergeProps(
    {
      padding: 10,
      positioning: "relative" as const,
    },
    props
  );

  const scenegraphContext = createScenegraph();
  const { scenegraph } = scenegraphContext;
  const [scope, setScope] = createStore<Scope>({});
  const errorContext = createErrorContext(createOnError(scenegraph, scope));

  const autoGenId = `Bluefish(${createUniqueId()})`;
  const autoGenScopeId = `Bluefish(${createUniqueId()})`;
  const id = autoGenId;
  const scopeId = props.id ?? autoGenScopeId;

  const [fullLayoutFunction, setFullLayoutFunction] = createSignal(() => {});

  const [layoutUID, setLayoutUID] = createSignal(createUniqueId());
  const [scenegraphSignal, setScenegraphSignal] = createSignal({
    scenegraph,
    uid: createUniqueId(),
  });

  // SCREEN MAGNIFICATION TRAVERSAL PROTOTYPING
  let svgRef: SVGSVGElement | undefined;
  const mantisContext = useMantisProvider();
  const [midpoints, setMidpoints] = createSignal<Point[]>([]);
  const midpointsToNodes = new Map<string, string>();
  // Helper functions
  /**
   * @param nodeId a string that corresponds to the ID of a node in the scenegraph
   * @returns the type of that node
   */
  function getNodeType(nodeId: string): string {
    const match = nodeId.match(/([A-Z])\w+/);
    return match ? match[0].trim() : "";
  }
  /**
   * Resolve reference nodes into the nodes that they reference. If the node is not a reference node, return the same node.
   * @param nodeId a string that corresponds to the ID of a node in the scenegraph
   * @returns a string that corresponds to the ID of the resolved node
   */
  function resolveNode(nodeId: string): string {
    const node = scenegraphSignal().scenegraph[nodeId];
    if (node && node.type === "ref") {
      return resolveNode(node.refId);
    }
    return nodeId;
  }
  /**
   * @param nodeId a string that corresponds to the ID of a node in the scenegraph
   * @returns the node's transform/bbox offset.
   */
  function calculateTransform(nodeId: string): { x: number; y: number } {
    const currNode = scenegraphSignal().scenegraph[nodeId];

    if (!currNode || !currNode.parent) {
      return { x: 0, y: 0 };
    }
    const parentTransform = calculateTransform(currNode.parent);
    if (currNode.type === "node") {
      return {
        x: parentTransform.x + (currNode.transform.translate.x ?? 0),
        y: parentTransform.y + (currNode.transform.translate.y ?? 0),
      };
    } else {
      return parentTransform;
    }
  }
  function computeBoundingBoxUnion(nodeIds: string[]): {
    left: number;
    top: number;
    width: number;
    height: number;
  } {
    let unionBBox = { left: 0, top: 0, right: 0, bottom: 0 };
    nodeIds.forEach((nodeId) => {
      const childNode = scenegraphSignal().scenegraph[nodeId];

      if (childNode && childNode.type === "node" && childNode.bbox) {
        const childNodeTransform = calculateTransform(nodeId);
        unionBBox = {
          left: Math.min(
            unionBBox.left,
            childNodeTransform.x + (childNode.bbox.left ?? Infinity)
          ),
          top: Math.min(
            unionBBox.top,
            childNodeTransform.y + (childNode.bbox.top ?? Infinity)
          ),
          right: Math.max(
            unionBBox.right,
            childNodeTransform.x +
              (childNode.bbox.left ?? 0) +
              (childNode.bbox.width ?? 0)
          ),
          bottom: Math.max(
            unionBBox.bottom,
            childNodeTransform.y +
              (childNode.bbox.top ?? 0) +
              (childNode.bbox.height ?? 0)
          ),
        };
      } else if (childNode && childNode.type === "ref") {
        const refNode = scenegraphSignal().scenegraph[childNode.refId];
        const childNodeTransform = calculateTransform(childNode.refId);
        if (refNode && refNode.type === "node" && refNode.bbox) {
          unionBBox = {
            left: Math.min(
              unionBBox.left,
              childNodeTransform.x + (refNode.bbox.left ?? Infinity)
            ),
            top: Math.min(
              unionBBox.top,
              childNodeTransform.y + (refNode.bbox.top ?? Infinity)
            ),
            right: Math.max(
              unionBBox.right,
              childNodeTransform.x +
                (refNode.bbox.left ?? 0) +
                (refNode.bbox.width ?? 0)
            ),
            bottom: Math.max(
              unionBBox.bottom,
              childNodeTransform.y +
                (refNode.bbox.top ?? 0) +
                (refNode.bbox.height ?? 0)
            ),
          };
        }
      }
    });
    return {
      left: unionBBox.left,
      top: unionBBox.top,
      width: unionBBox.right - unionBBox.left,
      height: unionBBox.bottom - unionBBox.top,
    };
  }
  function pointToString(point: Point): string {
    return `${point.x},${point.y}`;
  }
  /**
   * @param nodeId a string that corresponds to the ID of a node in the scenegraph
   * @returns the node's bbox
   */
  function getBbox(nodeId: string): BBox {
    const nodeType = getNodeType(nodeId);
    const node = scenegraphSignal().scenegraph[nodeId];
    if (nodeType === "Align" || nodeType === "Distribute") {
      return computeBoundingBoxUnion((node as BluefishNodeType).children);
    }
    if (node && node.type === "node") {
      return node.bbox;
    } else {
      return getBbox(node.refId);
    }
  }

  // Calculate the midpoint of each node (Mini-Map Main SVG Only)
  createEffect(() => {
    if (props.mantisComponentType === MantisComponentType.MMMain) {
      const newMidpoints = [];

      for (const nodeId in scenegraph) {
        if (getNodeType(nodeId) === "Ref") continue;
        const nodeBbox = getBbox(nodeId);
        const nodeTransform = calculateTransform(nodeId);
        const nodeMidpoint = {
          x: nodeTransform.x + (nodeBbox.left ?? 0) + (nodeBbox.width ?? 0) / 2,
          y: nodeTransform.y + (nodeBbox.top ?? 0) + (nodeBbox.height ?? 0) / 2,
        };
        newMidpoints.push(nodeMidpoint);
        midpointsToNodes.set(pointToString(nodeMidpoint), nodeId);
      }

      setMidpoints(newMidpoints);
    }
  });

  // Information about the currently selected node
  const [currentNodeId, setCurrentNodeId] = createSignal<string>(id);
  const currentNode = () =>
    scenegraphSignal().scenegraph[currentNodeId()] as BluefishNodeType;
  const currentTransform = () => calculateTransform(currentNodeId());
  const currentBboxInfo = () => {
    const nodeType = getNodeType(currentNodeId());
    if (nodeType === "Align" || nodeType === "Distribute") {
      const unionBBox = computeBoundingBoxUnion(currentNode().children);
      return unionBBox;
    }
    return currentNode()?.bbox ?? { left: 0, top: 0, width: 0, height: 0 };
  };

  const layout = (childNodes: ChildNode[]) => {
    untrack(() => {
      for (const childNode of childNodes) {
        if (!childNode.owned.left) {
          childNode.bbox.left = 0;
        }
        if (!childNode.owned.top) {
          childNode.bbox.top = 0;
        }
      }
    });

    const bboxes = {
      left: childNodes.map((childNode) => childNode.bbox.left),
      top: childNodes.map((childNode) => childNode.bbox.top),
      width: childNodes.map((childNode) => childNode.bbox.width),
      height: childNodes.map((childNode) => childNode.bbox.height),
    };

    const left = minOfMaybes(bboxes.left) ?? 0;

    const right = maxOfMaybes(
      bboxes.left.map((left, i) => maybeAdd(left, bboxes.width[i]))
    );

    const top = minOfMaybes(bboxes.top) ?? 0;

    const bottom = maxOfMaybes(
      bboxes.top.map((top, i) => maybeAdd(top, bboxes.height[i]))
    );

    const width = maybeSub(right, left);
    const height = maybeSub(bottom, top);

    return {
      transform: {
        translate: {
          x: 0,
          y: 0,
        },
      },
      bbox: { left, top, width, height },
    };
  };

  const paint = (paintProps: {
    bbox: BBox;
    transform: Transform;
    children: JSX.Element;
  }) => {
    // SVG View Box Information
    const enlargementFactor = props.enlargementFactor ?? 1;
    console.log(enlargementFactor);
    const width = () =>
      (props.width ?? (paintProps.bbox.width ?? 0) + props.padding! * 2) *
      enlargementFactor;
    const height = () =>
      (props.height ?? (paintProps.bbox.height ?? 0) + props.padding! * 2) *
      enlargementFactor;
    const minX = () =>
      -props.padding! +
      (props.positioning === "absolute" ? 0 : (paintProps.bbox.left ?? 0));
    const minY = () =>
      -props.padding! +
      (props.positioning === "absolute" ? 0 : (paintProps.bbox.top ?? 0));
    const defaultViewBox = () =>
      `${minX()} ${minY()} ${width() / enlargementFactor} ${height() / enlargementFactor}`;

    // Calculates mouse position in SVG coordinates
    // Reference: https://github.com/enxaneta/SVG-mouse-position-in-svg/blob/master/mousePositionSVG.js
    const [mouseX, setMouseX] = createSignal(0);
    const [mouseY, setMouseY] = createSignal(0);
    function getMousePositionSVG(event: MouseEvent): void {
      if (svgRef) {
        let mousePoint = svgRef.createSVGPoint();
        mousePoint.x = event.clientX;
        mousePoint.y = event.clientY;
        const screenCTM = svgRef.getScreenCTM();
        if (screenCTM) {
          mousePoint = mousePoint.matrixTransform(screenCTM.inverse());
          setMouseX(mousePoint.x);
          setMouseY(mousePoint.y);
        }
      }
    }

    // Red Box Information
    const [rectX, setRectX] = createSignal(0);
    const [rectY, setRectY] = createSignal(0);
    const [rectWidth, setRectWidth] = createSignal(0);
    const [rectHeight, setRectHeight] = createSignal(0);
    const rectCenterX = () => rectX() + rectWidth() / 2;
    const rectCenterY = () => rectY() + rectHeight() / 2;

    // Magnification Information
    const [magnificationFactor, setMagnificationFactor] =
      createSignal(enlargementFactor);
    const magnificationWidth = () => width() / magnificationFactor();
    const magnificationHeight = () => height() / magnificationFactor();
    const [magnificationX, setMagnificationX] = createSignal(
      rectCenterX() - magnificationWidth() / 2
    );
    const [magnificationY, setMagnificationY] = createSignal(
      rectCenterY() - magnificationHeight() / 2
    );
    createEffect(() => {
      setMagnificationX(rectCenterX() - magnificationWidth() / 2);
      setMagnificationY(rectCenterY() - magnificationHeight() / 2);
    });
    const magnificationViewBox = () =>
      `${magnificationX()} ${magnificationY()} ${magnificationWidth()} ${magnificationHeight()}`;

    // Voronoi Calculation
    // TODO - For performance, maybe only calculate this for certain component types
    const delaunay = () =>
      d3.Delaunay.from(
        midpoints(),
        (d) => d.x,
        (d) => d.y
      );

    // VISUAL LOGIC
    // Handles zoom-related functionalities
    const [isZoomed, setIsZoomed] = createSignal(false);
    function zoomInNode() {
      if (svgRef) {
        if (isZoomed()) {
          gsap.to(svgRef, { attr: { viewBox: defaultViewBox() } });
        } else {
          gsap.to(svgRef, { attr: { viewBox: magnificationViewBox() } });
        }
        setIsZoomed(!isZoomed());
      }
    }
    function handleScroll(event: WheelEvent) {
      // First check if the mouse is in the SVG
      const elementUnderMouse = document.elementFromPoint(
        event.clientX,
        event.clientY
      );
      if (elementUnderMouse && svgRef && svgRef.contains(elementUnderMouse)) {
        event.preventDefault();
        const delta = 0.3;
        if (event.deltaY > 0) {
          setMagnificationFactor(magnificationFactor() + delta);
        } else {
          setMagnificationFactor(Math.max(1, magnificationFactor() - delta));
        }
      }
    }
    // Makes the mini-map rectangle draggable
    const [dragStartX, setDragStartX] = createSignal(0);
    const [dragStartY, setDragStartY] = createSignal(0);
    function handleMouseDown(event: MouseEvent) {
      if (mantisContext) {
        mantisContext.setIsDragging(true);
        setDragStartX(event.clientX / enlargementFactor - rectX());
        setDragStartY(event.clientY / enlargementFactor - rectY());
      }
    }
    function handleDrag(event: MouseEvent) {
      if (mantisContext && mantisContext.isDragging()) {
        setRectX(event.clientX / enlargementFactor - dragStartX());
        setRectY(event.clientY / enlargementFactor - dragStartY());
        mantisContext.setViewBBox(
          `${rectX()} ${rectY()} ${rectWidth()} ${rectHeight()}`
        );
      }
    }
    function endDrag() {
      if (mantisContext) mantisContext.setIsDragging(false);
    }

    // Mini-Map Main Component Only
    createEffect(() => {
      // TODO - is this necessary?
      if (props.mantisComponentType == MantisComponentType.MMMain && svgRef) {
        if (isZoomed()) {
          gsap.to(svgRef, { attr: { viewBox: magnificationViewBox() } });
          if (mantisContext) mantisContext.setViewBBox(magnificationViewBox());
        } else {
          if (mantisContext) mantisContext.setViewBBox(defaultViewBox());
        }
      }
    });

    // SVG Event Listeners
    createEffect(() => {
      if (svgRef) {
        svgRef.addEventListener(
          "mousemove",
          (e) => {
            getMousePositionSVG(e);
            handleDrag(e);
          },
          false
        );
        if (props.mantisComponentType === MantisComponentType.MMMain) {
          svgRef.addEventListener("click", zoomInNode, false);
          svgRef.addEventListener("wheel", handleScroll, false);
        }
        if (props.mantisComponentType === MantisComponentType.MMMiniMap) {
          svgRef.addEventListener("mousedown", handleMouseDown, false);
          svgRef.addEventListener("mouseup", endDrag, false);
          svgRef.addEventListener("mouseleave", endDrag, false);
        }
      }
    });
    // Navigational logic (bubble cursor)
    createEffect(() => {
      if (props.mantisComponentType === MantisComponentType.MMMain) {
        const closestPoint = delaunay().find(mouseX(), mouseY());
        const closestNode = midpointsToNodes.get(
          pointToString(midpoints()[closestPoint])
        );
        setCurrentNodeId(resolveNode(closestNode ?? id));
      }
    });

    // MINI-MAP LOGIC
    createEffect(() => {
      if (
        mantisContext &&
        props.mantisComponentType === MantisComponentType.MMMiniMap
      ) {
        const viewBBoxSplit = mantisContext.viewBBox().split(" ");
        setRectX(parseFloat(viewBBoxSplit[0]));
        setRectY(parseFloat(viewBBoxSplit[1]));
        setRectWidth(parseFloat(viewBBoxSplit[2]));
        setRectHeight(parseFloat(viewBBoxSplit[3]));
      } else if (
        mantisContext &&
        props.mantisComponentType === MantisComponentType.MMMain
      ) {
        setRectX((currentBboxInfo()?.left ?? 0) + (currentTransform()?.x ?? 0));
        setRectY((currentBboxInfo()?.top ?? 0) + (currentTransform()?.y ?? 0));
        setRectWidth(currentBboxInfo()?.width ?? 0);
        setRectHeight(currentBboxInfo()?.height ?? 0);
        if (mantisContext.isDragging()) {
          const viewBBoxSplit = mantisContext.viewBBox().split(" ");
          setMagnificationX(parseFloat(viewBBoxSplit[0]));
          setMagnificationY(parseFloat(viewBBoxSplit[1]));
        }
      }
    });

    return (
      <svg
        width={width()}
        height={height()}
        viewBox={defaultViewBox()}
        ref={svgRef}
      >
        {paintProps.children}
        {props.mantisComponentType === MantisComponentType.MMMiniMap && (
          <rect
            x={rectX()}
            y={rectY()}
            width={rectWidth()}
            height={rectHeight()}
            fill="transparent"
            stroke="red"
            stroke-width={10}
          />
        )}
        <circle cx={mouseX()} cy={mouseY()} r={3} fill="red" />
      </svg>
    );
  };

  const jsx = (
    <LayoutUIDContext.Provider value={layoutUID}>
      <ErrorContext.Provider value={errorContext}>
        <ScenegraphContext.Provider value={scenegraphContext}>
          <ScopeContext.Provider value={[scope, setScope]}>
            {(() => {
              const layoutNode = resolveScenegraphElements(
                <Layout name={id} layout={layout} paint={paint}>
                  <ParentScopeIdContext.Provider value={() => scopeId}>
                    {props.children}
                  </ParentScopeIdContext.Provider>
                </Layout>
              );

              setFullLayoutFunction(() => {
                return () => layoutNode[0].layout(null);
              });

              return layoutNode[0].jsx;
            })()}
          </ScopeContext.Provider>
        </ScenegraphContext.Provider>
      </ErrorContext.Provider>
    </LayoutUIDContext.Provider>
  );

  // whenever a layout changes, blast away the old scenegraph and rebuild it
  createRenderEffect(() => {
    // clear scenegraph
    for (const id in scenegraph) {
      delete scenegraph[id];
    }

    // run layout
    fullLayoutFunction()();

    const uid = createUniqueId();
    // we use this signal to notify Layout nodes to re-render
    setLayoutUID(uid);
    // we use this signal for debugging since the scenegraph itself is not reactive
    setScenegraphSignal({ scenegraph, uid });
  });

  return (
    <>
      {jsx}
      <Toaster
        position="top-left"
        containerStyle={{
          position: "relative",
          width: "500px",
        }}
      />
      <Show when={props.debug === true}>
        <br />
        <div
          style={{
            float: "left",
            "margin-right": "40px",
            "margin-left": "5px",
          }}
        >
          {/* <h1>Current Node</h1>
          <p>{currentNodeId()}</p>
          <pre>{JSON.stringify(currentNode(), null, 2)}</pre> */}
        </div>
        <div style={{ float: "left", "margin-right": "40px" }}>
          <h1>Scenegraph</h1>
          <pre>{JSON.stringify(scenegraphSignal().scenegraph, null, 2)}</pre>
        </div>
        <div style={{ float: "left" }}>
          <h1>Scope</h1>
          <pre>{JSON.stringify(scope, null, 2)}</pre>
        </div>
      </Show>
    </>
  );
}

export default Bluefish;
