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
import {
  isMiniMapContext,
  isSplitScreenContext,
  isSplitScreenType,
  isTraversalType,
  MantisComponentType,
  MantisTraversalPattern,
  useMantisProvider,
} from "./mantis";

export type BluefishProps = ParentProps<{
  width?: number;
  height?: number;
  padding?: number;
  id?: string;
  debug?: boolean;
  positioning?: "absolute" | "relative";
  mantisComponentType: MantisComponentType;
  mantisTraversalPattern?: MantisTraversalPattern;
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
type ViewBox = {
  x: number;
  y: number;
  width: number;
  height: number;
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

  // Calculate the midpoint of each node (Traversal Components Only)
  createEffect(() => {
    if (isTraversalType(props.mantisComponentType)) {
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
    // "GLOBAL" CONSTANTS
    const GSAP_DURATION =
      props.mantisTraversalPattern === MantisTraversalPattern.Bubble
        ? 0.75
        : 1.25;
    const SCROLL_DELTA = 0.4;
    const CURSOR_EPSILON = 5;

    // SVG View Box Information
    const width = () =>
      props.width ?? (paintProps.bbox.width ?? 0) + props.padding! * 2;
    const height = () =>
      props.height ?? (paintProps.bbox.height ?? 0) + props.padding! * 2;
    const minX = () =>
      -props.padding! +
      (props.positioning === "absolute" ? 0 : (paintProps.bbox.left ?? 0));
    const minY = () =>
      -props.padding! +
      (props.positioning === "absolute" ? 0 : (paintProps.bbox.top ?? 0));
    const defaultViewBox = () => `${minX()} ${minY()} ${width()} ${height()}`;

    // Calculates mouse position in SVG coordinates
    // Reference: https://github.com/enxaneta/SVG-mouse-position-in-svg/blob/master/mousePositionSVG.js
    const [mouseX, setMouseX] = createSignal(0);
    const [mouseY, setMouseY] = createSignal(0);
    const [elementActive, setElementActive] = createSignal(false);
    const [mouseActive, setMouseActive] = createSignal(true);
    function getMousePositionSVG(point: Point): Point | undefined {
      if (svgRef) {
        let mousePoint = svgRef.createSVGPoint();
        mousePoint.x = point.x; //event.clientX;
        mousePoint.y = point.y; //event.clientY;
        const screenCTM = svgRef.getScreenCTM();
        if (screenCTM) {
          mousePoint = mousePoint.matrixTransform(screenCTM.inverse());
          return { x: mousePoint.x, y: mousePoint.y };
        }
      }
      return undefined;
    }
    function detectElementActive(event: MouseEvent): void {
      const elementUnderMouse = document.elementFromPoint(
        event.clientX,
        event.clientY
      );
      if (elementUnderMouse && svgRef && svgRef.contains(elementUnderMouse)) {
        setElementActive(true);
      } else {
        setElementActive(false);
      }
    }

    // Selected Node BBox Information
    const selNodeX = () =>
      (currentBboxInfo()?.left ?? 0) + (currentTransform()?.x ?? 0);
    const selNodeY = () =>
      (currentBboxInfo()?.top ?? 0) + (currentTransform()?.y ?? 0);
    const selNodeWidth = () => currentBboxInfo()?.width ?? 0;
    const selNodeHeight = () => currentBboxInfo()?.height ?? 0;
    const selNodeCenterX = () => selNodeX() + selNodeWidth() / 2;
    const selNodeCenterY = () => selNodeY() + selNodeHeight() / 2;

    // Red Box Information
    const [rectX, setRectX] = createSignal(0);
    const [rectY, setRectY] = createSignal(0);
    const [rectWidth, setRectWidth] = createSignal(0);
    const [rectHeight, setRectHeight] = createSignal(0);

    // Magnification Information (i.e. the user's view box)
    const [magnificationFactor, setMagnificationFactor] = createSignal(1);
    const magnificationWidth = () => width() / magnificationFactor();
    const magnificationHeight = () => height() / magnificationFactor();
    const [magnificationCenterX, setMagnificationCenterX] =
      createSignal(selNodeCenterX());
    const [magnificationCenterY, setMagnificationCenterY] =
      createSignal(selNodeCenterY());
    const magnificationX = () =>
      magnificationCenterX() - magnificationWidth() / 2;
    const magnificationY = () =>
      magnificationCenterY() - magnificationHeight() / 2;
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
          gsap.to(svgRef, {
            attr: { viewBox: defaultViewBox() },
            duration: GSAP_DURATION,
          });
        } else {
          gsap.to(svgRef, {
            attr: { viewBox: magnificationViewBox() },
            duration: GSAP_DURATION,
          });
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
      if (
        elementUnderMouse &&
        isZoomed() &&
        svgRef &&
        svgRef.contains(elementUnderMouse)
      ) {
        event.preventDefault();
        if (event.deltaY > 0) {
          setMagnificationFactor(magnificationFactor() + SCROLL_DELTA);
        } else {
          setMagnificationFactor(
            Math.max(1, magnificationFactor() - SCROLL_DELTA)
          );
        }
      }
    }
    // Makes the mini-map rectangle draggable
    const [dragStartX, setDragStartX] = createSignal(0);
    const [dragStartY, setDragStartY] = createSignal(0);
    function handleMouseMove(event: MouseEvent) {
      const mousePos = getMousePositionSVG({
        x: event.clientX,
        y: event.clientY,
      });
      if (mousePos) {
        setMouseX(mousePos.x);
        setMouseY(mousePos.y);
      }
    }
    function handleMouseDown(event: MouseEvent) {
      if (isMiniMapContext(mantisContext)) {
        const mousePos = getMousePositionSVG({
          x: event.clientX,
          y: event.clientY,
        });
        if (mousePos) {
          mantisContext.setIsDragging(true);
          setDragStartX(mousePos.x - rectX());
          setDragStartY(mousePos.y - rectY());
        }
      }
    }
    function handleDrag(event: MouseEvent) {
      if (isMiniMapContext(mantisContext) && mantisContext.isDragging()) {
        const mousePos = getMousePositionSVG({
          x: event.clientX,
          y: event.clientY,
        });
        if (mousePos) {
          setRectX(mousePos.x - dragStartX());
          setRectY(mousePos.y - dragStartY());
          mantisContext.setViewBBox(
            `${rectX()} ${rectY()} ${rectWidth()} ${rectHeight()}`
          );
        }
      }
    }
    function endDrag() {
      if (isMiniMapContext(mantisContext)) mantisContext.setIsDragging(false);
    }

    // GSAP Logic (Mini-Map Main + Split Screen Components)
    createEffect(() => {
      if (svgRef) {
        if (
          props.mantisComponentType == MantisComponentType.MMMain &&
          isMiniMapContext(mantisContext)
        ) {
          if (isZoomed()) {
            gsap.to(svgRef, {
              attr: { viewBox: magnificationViewBox() },
              duration: mantisContext.isDragging() ? 0.5 : GSAP_DURATION,
            });
            mantisContext.setViewBBox(magnificationViewBox());
          } else {
            mantisContext.setViewBBox(defaultViewBox());
          }
        } else if (isSplitScreenType(props.mantisComponentType)) {
          if (isZoomed()) {
            gsap.to(svgRef, {
              attr: { viewBox: magnificationViewBox() },
              duration: GSAP_DURATION,
            });
          }
        }
      }
    });

    // SVG Event Listeners
    /**
     * When the 'f' key is pressed, toggle whether or not the mouse is frozen on the
     * main SVG.
     */
    function handleKeyPress(event: KeyboardEvent) {
      if (
        isTraversalType(props.mantisComponentType) &&
        elementActive() &&
        event.key === "f"
      ) {
        setMouseActive(!mouseActive());
      }
    }
    createEffect(() => {
      if (svgRef) {
        document.addEventListener("keydown", handleKeyPress);
        document.addEventListener("mousemove", detectElementActive);
        svgRef.addEventListener(
          "mousemove",
          (e) => {
            if (mouseActive()) handleMouseMove(e);
            handleDrag(e);
          },
          false
        );
        if (isTraversalType(props.mantisComponentType)) {
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
    // Navigational Logic (Traversal Type Components)
    createEffect(() => {
      if (isTraversalType(props.mantisComponentType)) {
        if (props.mantisTraversalPattern === MantisTraversalPattern.Bubble) {
          // Finds the node closest to the cursor.
          const closestPoint = delaunay().find(mouseX(), mouseY());
          const closestNode = midpointsToNodes.get(
            pointToString(midpoints()[closestPoint])
          );
          setCurrentNodeId(resolveNode(closestNode ?? id));
          // Update the user's view to center around that node.
          setMagnificationCenterX(selNodeCenterX());
          setMagnificationCenterY(selNodeCenterY());
        } else {
          setMagnificationCenterX((currX: number) => {
            return Math.abs(currX - mouseX()) > CURSOR_EPSILON
              ? mouseX()
              : currX;
          });
          setMagnificationCenterY((currY: number) => {
            return Math.abs(currY - mouseY()) > CURSOR_EPSILON
              ? mouseY()
              : currY;
          });
        }
        // SPLIT SCREEN - Put this component's view box into the global context.
        if (isSplitScreenContext(mantisContext)) {
          if (props.mantisComponentType === MantisComponentType.SSLeft) {
            mantisContext.setLeftViewBBox(
              isZoomed() ? magnificationViewBox() : defaultViewBox()
            );
          } else {
            mantisContext.setRightViewBBox(
              isZoomed() ? magnificationViewBox() : defaultViewBox()
            );
          }
        }
      }
    });

    // MINI-MAP LOGIC
    createEffect(() => {
      if (
        isMiniMapContext(mantisContext) &&
        props.mantisComponentType === MantisComponentType.MMMiniMap
      ) {
        // Have the rectangle in the mini-map respond to the main window.
        const viewBBoxSplit = mantisContext.viewBBox().split(" ");
        setRectX(parseFloat(viewBBoxSplit[0]));
        setRectY(parseFloat(viewBBoxSplit[1]));
        setRectWidth(parseFloat(viewBBoxSplit[2]));
        setRectHeight(parseFloat(viewBBoxSplit[3]));
      } else if (
        props.mantisComponentType === MantisComponentType.MMMain &&
        isMiniMapContext(mantisContext) &&
        mantisContext.isDragging()
      ) {
        // Update the user's view box when the mini-map rectangle is dragged.
        const [vbbX, vbbY, vbbW, vbbH] = mantisContext.viewBBox().split(" ");
        setMagnificationCenterX(parseFloat(vbbX) + parseFloat(vbbW) / 2);
        setMagnificationCenterY(parseFloat(vbbY) + parseFloat(vbbH) / 2);
      }
    });

    // HELPER FUNCTIONS
    /**
     * @returns the point within `viewBox` that is closest to `point`.
     */
    function closestPointInViewBox(viewBox: ViewBox, point: Point): Point {
      const PADDING = 30;
      return {
        x: Math.max(
          viewBox.x + PADDING,
          Math.min(point.x, viewBox.x + viewBox.width - PADDING)
        ),
        y: Math.max(
          viewBox.y + PADDING,
          Math.min(point.y, viewBox.y + viewBox.height - PADDING)
        ),
      };
    }
    /**
     * @returns true if `point1` is in the same place as `point2`
     */
    function pointEquals(point1: Point, point2: Point): boolean {
      return point1.x === point2.x && point1.y === point2.y;
    }
    /**
     * @param arrowTarget the direction that the arrow is pointing
     * @param arrowStart the point where the arrow starts (i.e. tip of arrowhead)
     * @param arrowLength length of the arrow
     * @returns where the arrow should end for the inputted parameters to be true.
     */
    function calculateArrowEnd(
      arrowTarget: Point,
      arrowStart: Point,
      arrowLength: number
    ): { x: number; y: number } {
      const vectorX = arrowStart.x - arrowTarget.x;
      const vectorY = arrowStart.y - arrowTarget.y;
      const magnitude = Math.sqrt(Math.pow(vectorX, 2) + Math.pow(vectorY, 2));
      if (magnitude === 0) {
        return arrowStart;
      }
      return {
        x: arrowStart.x + (vectorX / magnitude) * arrowLength,
        y: arrowStart.y + (vectorY / magnitude) * arrowLength,
      };
    }
    /**
     * @returns the % dimensions (height & width) that correspond to `component`.
     */
    function calculateSVGDims(component: MantisComponentType) {
      switch (component) {
        case MantisComponentType.MMMiniMap:
          return "30%";
        default:
          return "100%";
      }
    }

    const OffScreenArrow = (props: {
      arrowStart: Point;
      arrowEnd: Point;
      arrowLength: number;
      arrowColor: string;
    }) => {
      return (
        <>
          <defs>
            <marker
              id="vbArrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="0"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill={props.arrowColor} />
            </marker>
          </defs>
          <line
            x2={props.arrowStart.x}
            y2={props.arrowStart.y}
            x1={props.arrowEnd.x}
            y1={props.arrowEnd.y}
            stroke={props.arrowColor}
            stroke-width="2"
            marker-end="url(#vbArrowhead)"
          />
        </>
      );
    };

    const ViewBoxRect = (props: {
      viewBox: string | undefined;
      stroke?: string;
      strokeWidth?: number;
    }) => {
      // Unpack the view box from the other screen.
      const viewBox = () => (props.viewBox ?? "0 0 0 0").split(" ");
      const vbX = () => parseFloat(viewBox()[0]);
      const vbY = () => parseFloat(viewBox()[1]);
      const vbW = () => parseFloat(viewBox()[2]);
      const vbH = () => parseFloat(viewBox()[3]);
      // Calculate the center point of that view box.
      const vbCenterPoint = () => {
        return { x: vbX() + vbW() / 2, y: vbY() + vbH() / 2 };
      };
      // Calculate the point within the current view box that's closest to the center
      // of the other view box.
      const arrowStart = () =>
        closestPointInViewBox(
          isZoomed()
            ? {
                x: magnificationX(),
                y: magnificationY(),
                width: magnificationWidth(),
                height: magnificationHeight(),
              }
            : {
                x: minX(),
                y: minY(),
                width: width(),
                height: height(),
              },
          vbCenterPoint()
        );
      // Calculate where the arrow pointing towards that view box ends.
      const arrowLength = () =>
        0.25 * Math.min(magnificationHeight(), magnificationWidth());
      const arrowEnd = () =>
        calculateArrowEnd(vbCenterPoint(), arrowStart(), arrowLength());

      const arrowColor = "red";

      return (
        <>
          <rect
            x={vbX()}
            y={vbY()}
            width={vbW()}
            height={vbH()}
            fill="transparent"
            stroke={props.stroke}
            stroke-width={props.strokeWidth}
          />
          {isZoomed() &&
            !pointEquals(arrowStart(), vbCenterPoint()) &&
            props.viewBox !== defaultViewBox() && (
              <OffScreenArrow
                arrowColor={arrowColor}
                arrowStart={arrowStart()}
                arrowEnd={arrowEnd()}
                arrowLength={arrowLength()}
              />
            )}
        </>
      );
    };

    return (
      <svg
        style={
          props.mantisComponentType === MantisComponentType.MMMiniMap
            ? {
                position: "absolute",
                top: 0,
                left: 0,
                background: "rgba(255, 255, 255, 0.7)",
                "border-right": ".2rem solid black",
                "border-bottom": ".2rem solid black",
              }
            : {}
        }
        width={calculateSVGDims(props.mantisComponentType)}
        height={calculateSVGDims(props.mantisComponentType)}
        viewBox={defaultViewBox()}
        ref={svgRef}
      >
        {paintProps.children}
        {/* Mini-Map Rectangle */}
        {props.mantisComponentType === MantisComponentType.MMMiniMap && (
          <rect
            x={rectX()}
            y={rectY()}
            width={rectWidth()}
            height={rectHeight()}
            fill="transparent"
            stroke="red"
            stroke-width={8}
          />
        )}
        {/* Split Screen Rectangles */}
        {isSplitScreenContext(mantisContext) &&
          (props.mantisComponentType === MantisComponentType.SSLeft
            ? mantisContext.rightViewBBox() !== defaultViewBox() && (
                <ViewBoxRect
                  viewBox={mantisContext.rightViewBBox()}
                  stroke="blue"
                  strokeWidth={2}
                />
              )
            : mantisContext.leftViewBBox() !== defaultViewBox() && (
                <ViewBoxRect
                  viewBox={mantisContext.leftViewBBox()}
                  stroke="blue"
                  strokeWidth={2}
                />
              ))}
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
