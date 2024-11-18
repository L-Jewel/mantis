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
  // Keeps track of the offsets implemented by the node's parents.
  const [currentOffset, setCurrentOffset] = createSignal({ x: 0, y: 0 });
  // Information about the currently selected node.
  const [currentNodeId, setCurrentNodeId] = createSignal(id);
  const currentNode = () =>
    scenegraphSignal().scenegraph[currentNodeId()] as BluefishNodeType;
  const currentBboxInfo = () =>
    currentNode()?.bbox ?? {
      left: 0,
      top: 0,
      width: 0,
      height: 0,
    };
  const currentTransform = () => {
    return {
      x: currentOffset().x + (currentNode()?.transform.translate.x ?? 0),
      y: currentOffset().y + (currentNode()?.transform.translate.y ?? 0),
    };
  };
  const currentChildren = () => currentNode()?.children ?? [];
  // Information about the parent of the currently selected node.
  const currentParentId = () => currentNode()?.parent ?? "";
  const currentParent = () =>
    scenegraphSignal().scenegraph[currentParentId()] as BluefishNodeType;
  const currentSiblings = () => currentParent()?.children ?? [];

  // Returns true if the node is a node, false if it is a ref.
  function isNode(nodeId: string): boolean {
    return scenegraphSignal().scenegraph[nodeId].type === "node";
  }

  const handleKeyPress = (event: KeyboardEvent) => {
    let nextNodeId = currentNodeId();
    const currentSiblingIndex = currentSiblings().indexOf(currentNodeId());

    // Traverse down to the first child
    if (event.key === "ArrowDown") {
      console.log("ArrowDown");
      if (currentChildren().length) {
        nextNodeId = currentChildren()[0];
      }
      if (currentNodeId() !== nextNodeId && isNode(nextNodeId)) {
        setCurrentOffset({
          x: currentTransform().x,
          y: currentTransform().y,
        });
        setCurrentNodeId(nextNodeId);
      }
    }
    // Traverse up to the parent
    if (event.key === "ArrowUp") {
      console.log("ArrowUp");
      if (currentParentId()) {
        nextNodeId = currentParentId();
      }
      if (currentNodeId() !== nextNodeId && isNode(nextNodeId)) {
        setCurrentNodeId(nextNodeId);
        setCurrentOffset({
          x: currentOffset().x - (currentNode()?.transform.translate.x ?? 0),
          y: currentOffset().y - (currentNode()?.transform.translate.y ?? 0),
        });
      }
    }
    // Traverse to the next sibling
    if (event.key === "ArrowRight") {
      console.log("ArrowRight");
      if (currentSiblingIndex < currentSiblings().length - 1) {
        nextNodeId = currentSiblings()[currentSiblingIndex + 1];
      }
      if (isNode(nextNodeId)) setCurrentNodeId(nextNodeId);
    }
    // Traverse to the previous sibling
    if (event.key === "ArrowLeft") {
      console.log("ArrowLeft");
      if (currentSiblingIndex > 0) {
        nextNodeId = currentSiblings()[currentSiblingIndex - 1];
      }
      if (isNode(nextNodeId)) setCurrentNodeId(nextNodeId);
    }

    event.preventDefault();
  };

  document.addEventListener("keydown", handleKeyPress);

  onCleanup(() => {
    document.removeEventListener("keydown", handleKeyPress);
  });

  createEffect(() => {
    console.log(currentNodeId());
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
    let svgRef: SVGSVGElement;
    const width = () =>
      props.width ?? (paintProps.bbox.width ?? 0) + props.padding! * 2;
    const height = () =>
      props.height ?? (paintProps.bbox.height ?? 0) + props.padding! * 2;
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
    const magnificationFactor = 2;
    const magnificationWidth = () => width() / magnificationFactor;
    const magnificationHeight = () => height() / magnificationFactor;
    const magnificationViewBox = () =>
      `${rectCenterX() - magnificationWidth() / 2} ${rectCenterY() - magnificationHeight() / 2} ${magnificationWidth()} ${magnificationHeight()}`;

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
