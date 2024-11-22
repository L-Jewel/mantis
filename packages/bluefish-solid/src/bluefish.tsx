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
  onCleanup,
  untrack,
} from "solid-js";
import { ParentScopeIdContext, Scope, ScopeContext } from "./createName";
import { createStore } from "solid-js/store";
import { ErrorContext, createErrorContext } from "./errorContext";
import { BluefishError } from "./errors";
import { getAncestorChain } from "./util/lca";
import toast, { Toaster } from "solid-toast";
import gsap from "gsap";

export type BluefishProps = ParentProps<{
  width?: number;
  height?: number;
  padding?: number;
  id?: string;
  debug?: boolean;
  positioning?: "absolute" | "relative";
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
  let svgRef: SVGSVGElement;
  // Information about the currently selected node.
  const [currentNodeId, setCurrentNodeId] = createSignal(id);
  const currentNode = () =>
    scenegraphSignal().scenegraph[currentNodeId()] as BluefishNodeType;
  // const currentBboxInfo = () =>
  //   currentNode()?.bbox ?? {
  //     left: 0,
  //     top: 0,
  //     width: 0,
  //     height: 0,
  //   };
  const currentChildren = () => currentNode()?.children ?? [];
  // Information about the parent of the currently selected node.
  const [currentParentId, setCurrentParentId] = createSignal(
    currentNode()?.parent ?? ""
  );
  const currentParent = () =>
    scenegraphSignal().scenegraph[currentParentId()] as BluefishNodeType;
  const currentSiblings = () => currentParent()?.children ?? [];
  // Helper Functions
  function updateNode(nodeId: string): void {
    const nextNode = scenegraphSignal().scenegraph[nodeId];
    if (nextNode.type === "node") {
      setCurrentNodeId(nodeId);
      setCurrentParentId(nextNode.parent ?? "");
    } else {
      setCurrentNodeId(nextNode.refId);
      setCurrentParentId(nextNode.parent ?? "");
    }
  }
  function getNodeType(nodeId: string): string {
    const match = nodeId.match(/([A-Z])\w+/);
    return match ? match[0].trim() : "";
  }
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

  const currentTransform = () => calculateTransform(currentNodeId());
  const currentBboxInfo = () => {
    const nodeType = getNodeType(currentNodeId());
    if (nodeType === "Align" || nodeType === "Distribute") {
      const unionBBox = computeBoundingBoxUnion(currentNode().children);
      return unionBBox;
    }
    return currentNode()?.bbox ?? { left: 0, top: 0, width: 0, height: 0 };
  };

  // Keyboard navigation
  const handleKeyPress = (event: KeyboardEvent) => {
    let nextNodeId = currentNodeId();
    const currentSiblingIndex = currentSiblings()
      .map((childId) => {
        const childNode = scenegraphSignal().scenegraph[childId];
        if ("refId" in childNode) {
          return childNode.refId;
        }
        return childId;
      })
      .indexOf(currentNodeId());

    // Traverse down to the first child
    if (event.key === "ArrowDown") {
      if (currentChildren().length) {
        nextNodeId = currentChildren()[0];
      }
      if (currentNodeId() !== nextNodeId) {
        updateNode(nextNodeId);
      }
    }
    // Traverse up to the parent
    if (event.key === "ArrowUp") {
      if (currentParentId()) {
        nextNodeId = currentParentId();
      }
      if (currentNodeId() !== nextNodeId) {
        updateNode(nextNodeId);
      }
    }
    // Traverse to the next sibling
    if (event.key === "ArrowRight") {
      if (currentSiblingIndex < currentSiblings().length - 1) {
        nextNodeId = currentSiblings()[currentSiblingIndex + 1];
      }
      if (nextNodeId !== currentNodeId()) updateNode(nextNodeId);
    }
    // Traverse to the previous sibling
    if (event.key === "ArrowLeft") {
      if (currentSiblingIndex > 0) {
        nextNodeId = currentSiblings()[currentSiblingIndex - 1];
      }
      if (nextNodeId !== currentNodeId()) updateNode(nextNodeId);
    }

    event.preventDefault();
  };

  document.addEventListener("keydown", handleKeyPress);

  onCleanup(() => {
    document.removeEventListener("keydown", handleKeyPress);
  });

  createEffect(() => {
    console.log("current node:", currentNodeId());
    console.log(JSON.parse(JSON.stringify(currentNode())));
  });

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
    const width = () =>
      (props.width ?? (paintProps.bbox.width ?? 0) + props.padding! * 2) * 2;
    const height = () =>
      (props.height ?? (paintProps.bbox.height ?? 0) + props.padding! * 2) * 2;
    const defaultViewBox = () =>
      `${
        -props.padding! +
        (props.positioning === "absolute" ? 0 : (paintProps.bbox.left ?? 0))
      } ${
        -props.padding! +
        (props.positioning === "absolute" ? 0 : (paintProps.bbox.top ?? 0))
      } ${width()} ${height()}`;

    // Red Box Information
    const rectX = () =>
      (currentBboxInfo()?.left ?? 0) + (currentTransform()?.x ?? 0);
    const rectY = () =>
      (currentBboxInfo()?.top ?? 0) + (currentTransform()?.y ?? 0);
    const rectWidth = () => currentBboxInfo()?.width ?? 0;
    const rectHeight = () => currentBboxInfo()?.height ?? 0;
    const rectCenterX = () => rectX() + rectWidth() / 2;
    const rectCenterY = () => rectY() + rectHeight() / 2;

    // Magnification Information
    const magnificationFactor = () =>
      1 / Math.max(rectWidth() / width(), rectHeight() / height());
    const magnificationWidth = () => width() / magnificationFactor();
    const magnificationHeight = () => height() / magnificationFactor();
    const magnificationViewBox = () =>
      `${rectCenterX() - magnificationWidth() / 2} ${rectCenterY() - magnificationHeight() / 2} ${magnificationWidth()} ${magnificationHeight()}`;

    // Each time the focus changes, redirect the user's view to it.
    createEffect(() => {
      gsap.to(svgRef, { attr: { viewBox: magnificationViewBox() } });
    });

    const updateViewBox = (event: KeyboardEvent) => {
      // Reset viewBox to default when 'r' key is pressed
      if (event.key === "r") {
        gsap.to(svgRef, { attr: { viewBox: defaultViewBox() } });
      }
      // Zoom into the red box when 'z' key is pressed
      if (event.key === "z") {
        gsap.to(svgRef, { attr: { viewBox: magnificationViewBox() } });
      }
    };
    document.addEventListener("keydown", updateViewBox);
    onCleanup(() => {
      document.removeEventListener("keydown", updateViewBox);
    });

    return (
      <svg
        width={width()}
        height={height()}
        viewBox={defaultViewBox()}
        ref={svgRef}
      >
        {paintProps.children}
        <rect
          x={rectX()}
          y={rectY()}
          width={rectWidth()}
          height={rectHeight()}
          fill="transparent"
          stroke="red"
        />
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
          <h1>Current Node</h1>
          <p>{currentNodeId()}</p>
          <pre>{JSON.stringify(currentNode(), null, 2)}</pre>
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
