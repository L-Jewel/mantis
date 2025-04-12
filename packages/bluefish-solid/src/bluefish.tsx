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
  For,
  JSX,
  Match,
  ParentProps,
  Show,
  Switch,
  createContext,
  createEffect,
  createMemo,
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
import * as d3 from "d3";
import {
  BiMap,
  isAMAutoType,
  isAMTraversalType,
  isAutoMapContext,
  isDLMainType,
  isDockedLensContext,
  isDraggableType,
  isMiniMapContext,
  isMultiLensContext,
  isPreviewType,
  isSplitScreenContext,
  isTraversalType,
  LLensInfo,
  MantisComponentType,
  MantisTraversalPattern,
  useMantisProvider,
} from "./mantis";

export type MantisOverrides = {
  cursorEpsilon?: number;
  traditionalEpsilon?: number;
  scrollDelta?: number;
  zoomLevel?: number;
  gsapDuration?: number;
  arrowSize?: number;
};
export type BluefishProps = ParentProps<{
  width?: number;
  height?: number;
  padding?: number;
  id?: string;
  debug?: boolean;
  positioning?: "absolute" | "relative";
  mantisComponentType?: MantisComponentType;
  mantisTraversalPattern?: MantisTraversalPattern;
  mantisId?: number;
  showVoronoi?: boolean;
  showHighlighting?: boolean;
  parameterOverrides?: MantisOverrides;
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
type NodeInfo = {
  nodeId: string;
  left: number;
  top: number;
  cx: number;
  cy: number;
  width: number;
  height: number;
};

/**
 * Preview/Enemy Indicator + Auto Map Prototype Only.
 * @returns A map that maps a node to a list of nodes related to it.
 */
const getNodeRelations = (
  type: MantisComponentType | undefined
): Map<string, string[]> => {
  switch (type) {
    case MantisComponentType.DLPlanets:
    case MantisComponentType.AMPlanetsTraversal:
    case MantisComponentType.PreviewPlanets: {
      return new Map<string, string[]>([
        ["mercury", ["label", "arrow"]],
        ["label", ["mercury", "arrow"]],
        ["arrow", ["label", "mercury"]],
      ]);
    }
    case MantisComponentType.DLPythonTutor:
    case MantisComponentType.AMPyTutorTraversal:
    case MantisComponentType.PreviewPythonTutor: {
      return new Map<string, string[]>([
        ["stackSlot-0", ["address-0", "stack-heap-arrow-0"]],
        ["stack-heap-arrow-0", ["address-0", "stackSlot-0"]],
        [
          "address-0",
          [
            "stack-heap-arrow-0",
            "stackSlot-0",
            "heap-arrow-0-1",
            "heap-arrow-0-4",
            "heap-arrow-0-5",
            "address-1",
            "address-2",
            "address-3",
          ],
        ],
        ["stackSlot-1", ["address-1", "stack-heap-arrow-1"]],
        ["stack-heap-arrow-1", ["address-1", "stackSlot-1"]],
        [
          "address-1",
          ["stack-heap-arrow-1", "heap-arrow-0-1", "stackSlot-1", "address-0"],
        ],
        ["heap-arrow-0-1", ["address-1", "address-0"]],
        [
          "address-2",
          ["heap-arrow-0-4", "address-4", "address-0", "heap-arrow-2-4"],
        ],
        ["heap-arrow-0-4", ["address-2", "address-0"]],
        ["heap-arrow-0-5", ["address-3", "address-0"]],
        [
          "address-3",
          ["address-0", "heap-arrow-0-5", "address-4", "heap-arrow-3-1"],
        ],
        [
          "address-4",
          ["address-3", "address-2", "heap-arrow-3-1", "heap-arrow-2-4"],
        ],
        ["heap-arrow-2-4", ["address-2", "address-4"]],
        ["heap-arrow-3-1", ["address-3", "address-4"]],
      ]);
    }
    case MantisComponentType.DLPulley:
    case MantisComponentType.AMPulleyTraversal:
    case MantisComponentType.PreviewPulley: {
      return new Map<string, string[]>([
        ["l0", ["rect", "B"]],
        ["l1", ["A", "B", "t1"]],
        ["l2", ["B", "C", "t2"]],
        ["l3", ["rect", "C", "t3"]],
        ["l4", ["A", "w1-weight", "t4"]],
        ["l5", ["A", "w2-weight", "t5"]],
        ["l6", ["C", "w2-weight", "t6"]],
        ["rect", ["l0", "l3", "t3", "B", "C"]],
        [
          "A",
          ["l1", "l4", "l5", "t1", "t4", "t5", "B", "w1-weight", "w2-weight"],
        ],
        ["B", ["l0", "l1", "l2", "t1", "t2", "A", "C", "rect"]],
        ["C", ["l2", "l3", "l6", "t2", "t3", "t6", "B", "rect", "w2-weight"]],
        ["w1-weight", ["l4", "A", "t4"]],
        ["w2-weight", ["l5", "l6", "A", "C", "t5", "t6"]],
        ["t1", ["l1"]],
        ["t2", ["l2"]],
        ["t3", ["l3"]],
        ["t4", ["l4"]],
        ["t5", ["l5"]],
        ["t6", ["l6"]],
      ]);
    }
    case MantisComponentType.DLNetworkMap:
    case MantisComponentType.AMNetworkMapTraversal:
    case MantisComponentType.PreviewNetworkMap: {
      return new Map<string, string[]>([
        ["isp-1", ["wan-router-1"]],
        ["isp-2", ["wan-router-2"]],
        [
          "wan-router-1",
          ["isp-1", "shrimp-asa-1", "wan-router-2", "shrimp-asa-2"],
        ],
        [
          "wan-router-2",
          ["isp-2", "shrimp-asa-1", "wan-router-1", "shrimp-asa-2"],
        ],
        [
          "shrimp-asa-1",
          [
            "wan-router-1",
            "wan-router-2",
            "shrimp-asa-2",
            "shrimp-1010-01",
            "shrimp-1010-02",
            "shrimp-9002",
            "shrimp-9003",
            "fallover-link-label",
          ],
        ],
        [
          "shrimp-asa-2",
          [
            "wan-router-1",
            "wan-router-2",
            "shrimp-asa-1",
            "shrimp-1010-01",
            "shrimp-1010-02",
            "shrimp-9002",
            "shrimp-9003",
            "fallover-link-label",
          ],
        ],
        [
          "shrimp-1010-01",
          [
            "shrimp-asa-1",
            "shrimp-asa-2",
            "int-dns-1",
            "int-dns-2",
            "db-server-1",
            "db-server-2",
          ],
        ],
        [
          "shrimp-1010-02",
          [
            "shrimp-asa-1",
            "shrimp-asa-2",
            "int-dns-1",
            "int-dns-2",
            "db-server-1",
            "db-server-2",
          ],
        ],
        ["int-dns-1", ["shrimp-1010-01", "shrimp-1010-02"]],
        ["int-dns-2", ["shrimp-1010-01", "shrimp-1010-02"]],
        ["db-server-1", ["shrimp-1010-01", "shrimp-1010-02", "db-server-2"]],
        ["db-server-2", ["shrimp-1010-01", "shrimp-1010-02", "db-server-1"]],
        [
          "shrimp-9002",
          [
            "shrimp-asa-1",
            "shrimp-asa-2",
            "css-switch-1",
            "css-switch-2",
            "shrimp-9003",
            "dmz-dns-server-1",
            "dmz-dns-server-2",
          ],
        ],
        [
          "shrimp-9003",
          [
            "shrimp-asa-1",
            "shrimp-asa-2",
            "css-switch-1",
            "css-switch-2",
            "shrimp-9002",
            "dmz-dns-server-1",
            "dmz-dns-server-2",
          ],
        ],
        [
          "css-switch-1",
          ["shrimp-9002", "shrimp-9003", "web-server-1", "web-server-2"],
        ],
        [
          "css-switch-2",
          ["shrimp-9002", "shrimp-9003", "web-server-1", "web-server-2"],
        ],
        ["dmz-dns-server-1", ["shrimp-9002", "shrimp-9003"]],
        ["dmz-dns-server-2", ["shrimp-9002", "shrimp-9003"]],
        ["web-server-1", ["css-switch-1", "css-switch-2"]],
        ["web-server-2", ["css-switch-1", "css-switch-2"]],
      ]);
    }
    default: {
      return new Map<string, string[]>([]);
    }
  }
};
/**
 * Preview/Enemy Indicator + Auto Map Prototype Only.
 * @returns a list of the salient nodes in the given diagram
 */
const getPreviewNodes = (
  type: MantisComponentType | undefined
): Set<string> => {
  switch (type) {
    case MantisComponentType.DLPlanets:
    case MantisComponentType.AMPlanetsTraversal:
    case MantisComponentType.PreviewPlanets: {
      return new Set(["mercury", "venus", "earth", "mars", "label", "arrow"]);
    }
    case MantisComponentType.DLPythonTutor:
    case MantisComponentType.AMPyTutorTraversal:
    case MantisComponentType.PreviewPythonTutor: {
      return new Set([
        "stack-heap-arrow-0",
        "stack-heap-arrow-1",
        "address-0",
        "address-1",
        "address-2",
        "address-3",
        "address-4",
        "heap-arrow-0-1",
        "heap-arrow-0-4",
        "heap-arrow-0-5",
        "heap-arrow-2-4",
        "heap-arrow-3-1",
        "stackSlot-0",
        "stackSlot-1",
        "stackSlot-2",
      ]);
    }
    case MantisComponentType.DLPulley:
    case MantisComponentType.AMPulleyTraversal:
    case MantisComponentType.PreviewPulley: {
      return new Set([
        "l0",
        "l1",
        "l2",
        "l3",
        "l4",
        "l5",
        "l6",
        "t1",
        "t2",
        "t3",
        "t4",
        "t5",
        "t6",
        "w1-weight",
        "w2-weight",
        "A",
        "B",
        "C",
        "rect",
      ]);
    }
    case MantisComponentType.DLNetworkMap:
    case MantisComponentType.AMNetworkMapTraversal:
    case MantisComponentType.PreviewNetworkMap: {
      return new Set([
        "isp-1",
        "isp-2",
        "wan-router-1",
        "wan-router-2",
        "external-net-seg-label",
        "shrimp-asa-1",
        "shrimp-asa-2",
        "fallover-link-line",
        "fallover-link-label",
        "shrimp-1010-01",
        "shrimp-1010-02",
        "internal-net-seg-label",
        "int-dns-1",
        "int-dns-2",
        "db-server-1",
        "db-server-2",
        "shrimp-9002",
        "shrimp-9003",
        "css-switch-1",
        "css-switch-2",
        "dmz-dns-server-1",
        "dmz-dns-server-2",
        "web-server-1",
        "web-server-2",
        "dmz-net-seg-label",
      ]);
    }
    default: {
      return new Set([]);
    }
  }
};
/**
 * Preview/Enemy Indicator + Auto Map Prototype Only.
 * @returns a list of the salient nodes (excluding arrows/connectors) in the given diagram
 */
const getIndicatorNodes = (
  type: MantisComponentType | undefined
): Set<string> => {
  switch (type) {
    case MantisComponentType.AMPlanetsTraversal:
    case MantisComponentType.PreviewPlanets: {
      return new Set(["mercury", "venus", "earth", "mars", "label"]);
    }
    case MantisComponentType.AMPyTutorTraversal:
    case MantisComponentType.PreviewPythonTutor: {
      return new Set([
        "address-0",
        "address-1",
        "address-2",
        "address-3",
        "address-4",
        "stackSlot-0",
        "stackSlot-1",
        "stackSlot-2",
      ]);
    }
    case MantisComponentType.AMPulleyTraversal:
    case MantisComponentType.PreviewPulley: {
      return new Set([
        "t1",
        "t2",
        "t3",
        "t4",
        "t5",
        "t6",
        "w1-weight",
        "w2-weight",
        "A",
        "B",
        "C",
      ]);
    }
    case MantisComponentType.AMNetworkMapTraversal:
    case MantisComponentType.PreviewNetworkMap: {
      return new Set([
        "isp-1",
        "isp-2",
        "wan-router-1",
        "wan-router-2",
        "external-net-seg-label",
        "shrimp-asa-1",
        "shrimp-asa-2",
        "fallover-link-line",
        "fallover-link-label",
        "shrimp-1010-01",
        "shrimp-1010-02",
        "internal-net-seg-label",
        "int-dns-1",
        "int-dns-2",
        "db-server-1",
        "db-server-2",
        "shrimp-9002",
        "shrimp-9003",
        "css-switch-1",
        "css-switch-2",
        "dmz-dns-server-1",
        "dmz-dns-server-2",
        "web-server-1",
        "web-server-2",
        "dmz-net-seg-label",
      ]);
    }
    default: {
      return new Set([]);
    }
  }
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
  const showHighlighting = () => props.showHighlighting ?? false;
  const mantisContext = useMantisProvider();
  const [bubbleNodeData, setBubbleNodeData] = createSignal<NodeInfo[]>([]);
  const [previewNodeData, setPreviewNodeData] = createSignal<NodeInfo[]>([]);
  const previewNodeInfo = new Map<string, NodeInfo>();
  /**
   * scopeName <=> nodeId
   */
  const scopeMap = new BiMap<string, string>();
  const nodeRelations = () => getNodeRelations(props.mantisComponentType);
  const previewNodes = () => getPreviewNodes(props.mantisComponentType);
  const indicatorNodes = () =>
    new Set(getIndicatorNodes(props.mantisComponentType));
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
  function calculateTransform(nodeId: string): Point {
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
  /**
   * @param nodeIds a list of scenegraph node IDs
   * @returns the smalled bounding box that contains all the nodes in `nodeIds`
   */
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
  /**
   * Computes the union of an array of bounding boxes (BBoxes).
   *
   * This function takes an array of bounding boxes and calculates a single bounding box
   * that encompasses all the input bounding boxes. The resulting bounding box is defined
   * by its `left`, `top`, `width`, and `height` properties.
   *
   * @param bboxes - An array of bounding boxes, where each bounding box is an object
   *                 containing `left`, `top`, `width`, and `height` properties. These
   *                 properties may be optional, and default values are used when they
   *                 are not provided.
   *
   * @returns An object representing the union of the input bounding boxes. The object
   *          contains the following properties:
   *          - `left`: The smallest `left` value among all the bounding boxes.
   *          - `top`: The smallest `top` value among all the bounding boxes.
   *          - `width`: The width of the union bounding box, calculated as the difference
   *                     between the largest `right` value and the smallest `left` value.
   *          - `height`: The height of the union bounding box, calculated as the difference
   *                      between the largest `bottom` value and the smallest `top` value.
   */
  function computeBBoxUnion(bboxes: BBox[]): {
    left: number;
    top: number;
    width: number;
    height: number;
  } {
    let unionBBox = {
      left: Infinity,
      top: Infinity,
      right: -Infinity,
      bottom: -Infinity,
    };
    bboxes.forEach((bbox) => {
      unionBBox = {
        left: Math.min(unionBBox.left, bbox.left ?? Infinity),
        top: Math.min(unionBBox.top, bbox.top ?? Infinity),
        right: Math.max(unionBBox.right, (bbox.left ?? 0) + (bbox.width ?? 0)),
        bottom: Math.max(
          unionBBox.bottom,
          (bbox.top ?? 0) + (bbox.height ?? 0)
        ),
      };
    });
    return {
      left: unionBBox.left,
      top: unionBBox.top,
      width: unionBBox.right - unionBBox.left,
      height: unionBBox.bottom - unionBBox.top,
    };
  }
  /**
   * @param nodeId a string that corresponds to the ID of an arrow node in the scenegraph
   * @returns the arrow's bounding box
   */
  function computeBoundingBoxArrow(nodeId: string): {
    left: number;
    top: number;
    width: number;
    height: number;
  } {
    const node = scenegraphSignal().scenegraph[nodeId];
    if (node && node.type === "node") {
      const nodeCustomData = node.customData;
      return {
        left: Math.min(nodeCustomData.sx, nodeCustomData.ex),
        top: Math.min(nodeCustomData.sy, nodeCustomData.ey),
        width: Math.max(Math.abs(nodeCustomData.sx - nodeCustomData.ex), 1),
        height: Math.max(Math.abs(nodeCustomData.sy - nodeCustomData.ey), 1),
      };
    } else {
      return computeBoundingBoxArrow(node.refId);
    }
  }
  /**
   * @param nodeId a string that corresponds to the ID of a line node in the scenegraph
   * @returns the line's bounding box with nonzero width and height
   */
  function computeBoundingBoxLine(nodeId: string): {
    left: number;
    top: number;
    width: number;
    height: number;
  } {
    const node = scenegraphSignal().scenegraph[nodeId];
    if (node && node.type === "node") {
      const nodeCustomData = node.customData;
      const left = Math.min(nodeCustomData.fromX, nodeCustomData.toX);
      const top = Math.min(nodeCustomData.fromY, nodeCustomData.toY);
      const width = Math.max(
        Math.abs(nodeCustomData.fromX - nodeCustomData.toX),
        1
      );
      const height = Math.max(
        Math.abs(nodeCustomData.fromY - nodeCustomData.toY),
        1
      );
      return { left, top, width, height };
    } else {
      return computeBoundingBoxLine(node.refId);
    }
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
    } else if (nodeType === "Arrow") {
      return computeBoundingBoxArrow(nodeId);
    } else if (nodeType === "Line") {
      return computeBoundingBoxLine(nodeId);
    }
    if (node && node.type === "node") {
      return node.bbox;
    } else if (node && node.type === "ref") {
      return getBbox(node.refId);
    } else {
      return { left: 0, top: 0, width: 0, height: 0 };
    }
  }
  function calculateTransformedBboxXY(nodeId: string): Point {
    const nodeBbox = getBbox(nodeId);
    const nodeTransform = calculateTransform(resolveNode(nodeId));
    return {
      x: nodeTransform.x + (nodeBbox.left ?? 0),
      y: nodeTransform.y + (nodeBbox.top ?? 0),
    };
  }
  /**
   * Calculates the center point of a given view box.
   *
   * @param viewBox - The view box as a string in the format "x y width height".
   * @returns The center point of the view box.
   */
  function getViewBoxCenter(viewBox: string): Point {
    const [x, y, width, height] = viewBox.split(" ").map(Number);
    return {
      x: x + width / 2,
      y: y + height / 2,
    };
  }
  /**
   * Determines if two SVG view boxes overlap.
   *
   * @param viewBox1 - The first view box as a string in the format "x y width height".
   * @param viewBox2 - The second view box as a string in the format "x y width height".
   * @param percentVisible - A number between 0 and 1 representing the minimum percentage of overlap
   *                         required for the view boxes to be considered overlapping. Defaults to 0.
   * @returns A boolean indicating whether the two view boxes overlap by at least the specified percentage.
   *
   * The function calculates the overlapping area between the two view boxes and compares it to the
   * area of the smaller view box. If the overlapping area divided by the smaller view box's area
   * exceeds the `percentVisible` threshold, the function returns `true`.
   */
  function viewBoxOverlaps(
    viewBox1: string,
    viewBox2: string,
    percentVisible: number = 0
  ): boolean {
    const [x1, y1, w1, h1] = viewBox1.split(" ").map(Number);
    const [x2, y2, w2, h2] = viewBox2.split(" ").map(Number);

    const overlapX = Math.max(0, Math.min(x1 + w1, x2 + w2) - Math.max(x1, x2));
    const overlapY = Math.max(0, Math.min(y1 + h1, y2 + h2) - Math.max(y1, y2));
    const overlapArea = overlapX * overlapY;

    const area1 = w1 * h1;
    const area2 = w2 * h2;
    const smallestArea = Math.min(area1, area2);

    return overlapArea / smallestArea > percentVisible;
  }
  /**
   * Determines if a point is within a given view box.
   *
   * @param point - The point to check.
   * @param viewBox - The view box as a string in the format "x y width height".
   * @returns A boolean indicating whether the point is within the view box.
   */
  function isPointInViewBox(point: Point, viewBox: string): boolean {
    const [x, y, width, height] = viewBox.split(" ").map(Number);
    return (
      point.x >= x &&
      point.x <= x + width &&
      point.y >= y &&
      point.y <= y + height
    );
  }
  /**
   * @returns the % dimensions (height & width) that correspond to `component`.
   */
  function calculateSVGDims(component: MantisComponentType | undefined) {
    switch (component) {
      case MantisComponentType.MMMiniMap:
        return "30%";
      default:
        return "100%";
    }
  }
  /**
   * @returns a CSS properties object to style the SVG based on `component`.
   */
  function determineCSSStyle(
    component: MantisComponentType | undefined
  ): JSX.CSSProperties {
    switch (component) {
      case MantisComponentType.MMMiniMap:
        return {
          position: "absolute",
          top: 0,
          left: 0,
          background: "rgba(255, 255, 255, 0.7)",
          "border-right": ".2rem solid black",
          "border-bottom": ".2rem solid black",
        };
      case MantisComponentType.LLens: {
        return {
          position: "absolute",
          top: 0,
          left: 0,
          "pointer-events": "none",
        };
      }
      default:
        return {};
    }
  }
  /**
   * @returns the color of the cursor based on the component type
   */
  function getCursorColor(): string {
    switch (props.mantisComponentType) {
      case MantisComponentType.SSLeft:
      case MantisComponentType.AMPlanetsTraversal:
      case MantisComponentType.AMPyTutorTraversal:
      case MantisComponentType.AMPulleyTraversal:
        return "orangered";
      case MantisComponentType.SSRight:
      case MantisComponentType.AMPlanetsAuto:
      case MantisComponentType.AMPyTutorAuto:
      case MantisComponentType.AMPulleyAuto:
        return "blue";
      default:
        return "red";
    }
  }

  // Calculate the midpoint of each node (Traversal Components Only)
  createEffect(() => {
    if (
      isPreviewType(props.mantisComponentType) ||
      isAMTraversalType(props.mantisComponentType) ||
      isDLMainType(props.mantisComponentType)
    ) {
      const newBubbleMidpoints: NodeInfo[] = [];
      const newPreviewMidpoints: NodeInfo[] = [];
      /**
       * Sometimes, the name of the node contains a changing ID. With this
       * function, we can just use the part of the name that doesn't change
       * to find the node in the scope.
       * @param searchString a string to search for in the scope
       * @returns the actual name of the node in the scope
       */
      const findKeyInScope = (searchString: string): string | undefined => {
        for (const key in scope) {
          const regex = new RegExp(`^${searchString}(\\(cl-\\d+\\))?$`);
          if (regex.test(key)) {
            return key;
          }
        }
        return undefined;
      };

      for (const iNode of previewNodes()) {
        const iNodeActual = findKeyInScope(iNode);
        if (!iNodeActual) continue;
        scopeMap.set(iNode, scope[iNodeActual].layoutNode ?? "");
      }
      const previewNodeIds = new Set(scopeMap.getValues());

      for (const nodeId in scenegraph) {
        if (getNodeType(nodeId) === "Ref") continue;
        const nodeBbox = getBbox(nodeId);
        const nodeTransform = calculateTransform(nodeId);
        const nodeX = nodeTransform.x + (nodeBbox.left ?? 0);
        const nodeY = nodeTransform.y + (nodeBbox.top ?? 0);
        const newNodeInfo: NodeInfo = {
          nodeId,
          left: nodeX,
          top: nodeY,
          cx: nodeX + (nodeBbox.width ?? 0) / 2,
          cy: nodeY + (nodeBbox.height ?? 0) / 2,
          width: nodeBbox.width ?? 0,
          height: nodeBbox.height ?? 0,
        };
        newBubbleMidpoints.push(newNodeInfo);
        if (previewNodeIds.has(nodeId)) {
          newPreviewMidpoints.push(newNodeInfo);
          previewNodeInfo.set(nodeId, newNodeInfo);
        }
      }

      setBubbleNodeData(newBubbleMidpoints);
      setPreviewNodeData(newPreviewMidpoints);
    } else if (
      isTraversalType(props.mantisComponentType) ||
      props.mantisComponentType === MantisComponentType.LLens
    ) {
      const newMidpoints = [];

      for (const nodeId in scenegraph) {
        if (getNodeType(nodeId) === "Ref") continue;
        const nodeBbox = getBbox(nodeId);
        const nodeTransform = calculateTransform(nodeId);
        const nodeX = nodeTransform.x + (nodeBbox.left ?? 0);
        const nodeY = nodeTransform.y + (nodeBbox.top ?? 0);
        newMidpoints.push({
          nodeId,
          left: nodeX,
          top: nodeY,
          cx: nodeX + (nodeBbox.width ?? 0) / 2,
          cy: nodeY + (nodeBbox.height ?? 0) / 2,
          width: nodeBbox.width ?? 0,
          height: nodeBbox.height ?? 0,
        });
      }

      setBubbleNodeData(newMidpoints);
    }
  });

  // Information about the currently selected node
  const [currentNodeBubbleIndex, setCurrentNodeBubbleIndex] = createSignal(-1);
  const [currentNodePreviewIndex, setCurrentNodePreviewIndex] =
    createSignal(-1);
  const [currentNodeId, setCurrentNodeId] = createSignal<string>(id);
  const [previewNodeId, setPreviewNodeId] = createSignal<string>(id);
  const currentNode = () =>
    scenegraphSignal().scenegraph[currentNodeId()] as BluefishNodeType;
  const previewNode = () =>
    scenegraphSignal().scenegraph[previewNodeId()] as BluefishNodeType;
  const currentTransform = () => calculateTransform(currentNodeId());
  const previewTransform = () => calculateTransform(previewNodeId());
  const currentBboxInfo = () => {
    return currentNodeId()
      ? getBbox(currentNodeId())
      : { left: 0, top: 0, width: 0, height: 0 };
  };
  const previewBboxInfo = () => {
    return previewNodeId()
      ? getBbox(previewNodeId())
      : { left: 0, top: 0, width: 0, height: 0 };
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
    const GSAP_DURATION = () =>
      props.parameterOverrides?.gsapDuration ??
      (props.mantisTraversalPattern === MantisTraversalPattern.Bubble
        ? 0.75
        : 1);
    const SCROLL_DELTA = () => props.parameterOverrides?.scrollDelta ?? 0.2;
    const CURSOR_EPSILON = () => props.parameterOverrides?.cursorEpsilon ?? 3;
    const TRADITIONAL_EPSILON = () =>
      (props.parameterOverrides?.traditionalEpsilon ?? 0.8) * 100;
    const ARROW_SIZE = () => props.parameterOverrides?.arrowSize ?? 12;
    const MAGNIFICATION_DEFAULT = 2;

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

    const [actualWidth, setActualWidth] = createSignal(0);
    const [actualHeight, setActualHeight] = createSignal(0);
    const [actualMinX, setActualMinX] = createSignal(0);
    const [actualMinY, setActualMinY] = createSignal(0);

    // Observe changes to the bounding box of svgRef
    const observer = new ResizeObserver(() => {
      const svgOrigin = getSVGPositionMouse({ x: 0, y: 0 }) ?? { x: 0, y: 0 };
      const topLeftCorner = getMousePositionSVG({ x: 0, y: 0 });
      const bottomRightCorner = getMousePositionSVG({
        x: svgOrigin.x + (svgRef?.getBoundingClientRect().width ?? 0),
        y: svgOrigin.y + (svgRef?.getBoundingClientRect().height ?? 0),
      });
      setActualWidth(bottomRightCorner?.x ?? 0);
      setActualHeight(bottomRightCorner?.y ?? 0);
      setActualMinX(topLeftCorner?.x ?? 0);
      setActualMinY(topLeftCorner?.y ?? 0);
    });
    createEffect(() => {
      if (svgRef) {
        observer.observe(svgRef);
      }

      // Cleanup observer on component unmount
      return () => {
        if (svgRef) {
          observer.unobserve(svgRef);
        }
      };
    });

    // Calculates mouse position in SVG coordinates
    // Reference: https://github.com/enxaneta/SVG-mouse-position-in-svg/blob/master/mousePositionSVG.js
    const [clientX, setClientX] = createSignal(0);
    const [clientY, setClientY] = createSignal(0);
    const [mouseX, setMouseX] = createSignal(0);
    const [mouseY, setMouseY] = createSignal(0);
    const [elementActive, setElementActive] = createSignal(false);
    const [mouseActive, setMouseActive] = createSignal(true);
    /**
     * @param point - a point in screen coordinates
     * @returns the corresponding point in SVG coordinates
     */
    function getMousePositionSVG(point: Point): Point | undefined {
      if (svgRef) {
        let mousePoint = svgRef.createSVGPoint();
        mousePoint.x = point.x;
        mousePoint.y = point.y;
        const screenCTM = svgRef.getScreenCTM();
        if (screenCTM) {
          mousePoint = mousePoint.matrixTransform(screenCTM.inverse());
          return { x: mousePoint.x, y: mousePoint.y };
        }
      }
      return undefined;
    }
    /**
     * The inverse of `getMousePositionSVG`.
     * @param point - a point in SVG coordinates
     * @returns the corresponding point in screen coordinates
     */
    function getSVGPositionMouse(point: Point): Point | undefined {
      if (svgRef) {
        let svgPoint = svgRef.createSVGPoint();
        svgPoint.x = point.x;
        svgPoint.y = point.y;
        const screenCTM = svgRef.getScreenCTM();
        if (screenCTM) {
          svgPoint = svgPoint.matrixTransform(screenCTM);
          return { x: svgPoint.x, y: svgPoint.y };
        }
      }
      return undefined;
    }
    /**
     * Zooms the SVG to `zoomLevel`, but with the focal point at
     * `point` rather than the center of the view.
     */
    function zoomAroundPoint(point: Point, zoomLevel: number) {
      setMagnificationFactor(zoomLevel);
      const newCenterX =
        point.x - (point.x - minX()) / zoomLevel + magnificationWidth() / 2;
      const newCenterY =
        point.y - (point.y - minY()) / zoomLevel + magnificationHeight() / 2;
      setMagnificationCenterX(newCenterX);
      setMagnificationCenterY(newCenterY);
    }
    function detectElementActive(event: MouseEvent | TouchEvent): void {
      let elementUnderMouse;
      if (event instanceof MouseEvent) {
        elementUnderMouse = document.elementFromPoint(
          event.clientX,
          event.clientY
        );
      } else if (event instanceof TouchEvent && event.touches.length > 0) {
        elementUnderMouse = document.elementFromPoint(
          event.touches[0].clientX,
          event.touches[0].clientY
        );
        event.preventDefault();
      }
      if (
        elementUnderMouse &&
        svgRef &&
        svgRef.contains(elementUnderMouse) &&
        elementUnderMouse.id !== "mantis-ui-arrow"
      ) {
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
    // Preview Node BBox Information
    const prevNodeX = () =>
      (previewBboxInfo()?.left ?? 0) + (previewTransform()?.x ?? 0);
    const prevNodeY = () =>
      (previewBboxInfo()?.top ?? 0) + (previewTransform()?.y ?? 0);
    const prevNodeWidth = () => previewBboxInfo()?.width ?? 0;
    const prevNodeHeight = () => previewBboxInfo()?.height ?? 0;
    const prevNodeCenterX = () => prevNodeX() + prevNodeWidth() / 2;
    const prevNodeCenterY = () => prevNodeY() + prevNodeHeight() / 2;

    const relatedNodes = () =>
      nodeRelations().get(scopeMap.getKey(previewNodeId()) ?? "") ?? [];

    // Red Box Information
    // Honestly just a misc signal used for different things in each component.
    const [rectX, setRectX] = createSignal(0);
    const [rectY, setRectY] = createSignal(0);
    const [rectWidth, setRectWidth] = createSignal(0);
    const [rectHeight, setRectHeight] = createSignal(0);

    // Magnification Information (i.e. the user's view box)
    const [magnificationFactor, setMagnificationFactor] = createSignal(1);
    // Callback to let the top level parent component set the magnification factor.
    createEffect(() => {
      if (
        isTraversalType(props.mantisComponentType) &&
        props.parameterOverrides?.zoomLevel
      ) {
        setMagnificationFactor(props.parameterOverrides.zoomLevel);
      }
    });
    const magnificationWidth = () =>
      props.mantisComponentType === MantisComponentType.LLens
        ? width() / magnificationFactor()
        : actualWidth() / magnificationFactor();
    const magnificationHeight = () =>
      props.mantisComponentType === MantisComponentType.LLens
        ? height() / magnificationFactor()
        : actualHeight() / magnificationFactor();
    const [magnificationCenterX, setMagnificationCenterX] =
      createSignal(selNodeCenterX());
    const [magnificationCenterY, setMagnificationCenterY] =
      createSignal(selNodeCenterY());
    const magnificationX = createMemo(
      () => magnificationCenterX() - magnificationWidth() / 2
    );
    const magnificationY = createMemo(
      () => magnificationCenterY() - magnificationHeight() / 2
    );
    const magnificationViewBox = () =>
      `${magnificationX()} ${magnificationY()} ${magnificationWidth()} ${magnificationHeight()}`;
    // Keeps track of the user's view box (during GSAP transitions).
    const [gsapCenterX, setGsapCenterX] = createSignal(selNodeCenterX());
    const [gsapCenterY, setGsapCenterY] = createSignal(selNodeCenterY());
    const [gsapWidth, setGsapWidth] = createSignal(magnificationWidth());
    const [gsapHeight, setGsapHeight] = createSignal(magnificationHeight());
    const gsapMagnificationFactor = createMemo(
      () => actualHeight() / gsapHeight()
    );
    const updateGSAPCenter = () => {
      if (svgRef) {
        const viewBox = svgRef.getAttribute("viewBox")?.split(" ");
        setGsapCenterX(parseFloat(viewBox![0]) + parseFloat(viewBox![2]) / 2);
        setGsapCenterY(parseFloat(viewBox![1]) + parseFloat(viewBox![3]) / 2);
        setGsapWidth(parseFloat(viewBox![2]));
        setGsapHeight(parseFloat(viewBox![3]));
      }
    };

    // Voronoi Calculation
    // TODO - For performance, maybe only calculate this for certain component types
    const bubbleDelaunay = () =>
      d3.Delaunay.from(
        bubbleNodeData(),
        (d) => d.cx,
        (d) => d.cy
      );
    const previewDelaunay = () =>
      d3.Delaunay.from(
        previewNodeData(),
        (d) => d.cx,
        (d) => d.cy
      );
    const bubbleVoronoi = () =>
      bubbleDelaunay().voronoi([
        minX(),
        minY(),
        minX() + width(),
        minY() + height(),
      ]);
    const previewVoronoi = () =>
      previewDelaunay().voronoi([
        minX(),
        minY(),
        minX() + width(),
        minY() + height(),
      ]);

    // VISUAL LOGIC
    // Handles zoom-related functionalities
    const [isZoomed, setIsZoomed] = createSignal(false);
    function zoomInNode() {
      if (svgRef && elementActive()) {
        if (isZoomed()) {
          gsap.to(svgRef, {
            attr: { viewBox: defaultViewBox() },
            duration: GSAP_DURATION(),
          });
        } else {
          gsap.to(svgRef, {
            attr: { viewBox: magnificationViewBox() },
            duration: GSAP_DURATION(),
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
        (isZoomed() ||
          isDLMainType(props.mantisComponentType) ||
          props.mantisComponentType === MantisComponentType.LLens) &&
        svgRef &&
        svgRef.contains(elementUnderMouse)
      ) {
        event.preventDefault();
        if (
          props.mantisComponentType === MantisComponentType.LLens &&
          isMultiLensContext(mantisContext)
        ) {
          // Zoom for Lens Component
          const newMagnificationFactor =
            event.deltaY > 0
              ? magnificationFactor() + SCROLL_DELTA()
              : Math.max(1, magnificationFactor() - SCROLL_DELTA());
          mantisContext.updateLensInfo((prevList) =>
            prevList.map((item, i) =>
              i === props.mantisId
                ? { ...item, magnification: newMagnificationFactor }
                : item
            )
          );
        } else if (isDLMainType(props.mantisComponentType)) {
          // Zoom for DLMain Component
          const newMagnificationFactor =
            event.deltaY > 0
              ? magnificationFactor() + SCROLL_DELTA()
              : Math.max(1, magnificationFactor() - SCROLL_DELTA());
          setMagnificationFactor(newMagnificationFactor);
          if (!isZoomed()) {
            setMagnificationCenterX((minX() + width()) / 2);
            setMagnificationCenterY((minY() + height()) / 2);
            setIsZoomed(true);
          }
        } else {
          // Zoom for all other components
          if (event.deltaY > 0) {
            setMagnificationFactor(magnificationFactor() + SCROLL_DELTA());
          } else {
            setMagnificationFactor(
              Math.max(1, magnificationFactor() - SCROLL_DELTA())
            );
          }
        }
      }
    }
    // Makes the mini-map rectangle draggable
    const [dragStartX, setDragStartX] = createSignal(0);
    const [dragStartY, setDragStartY] = createSignal(0);
    const [isDragging, setIsDragging] = createSignal(false);
    function handleMouseMove(event: MouseEvent | TouchEvent) {
      let clientX, clientY;
      if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if (
        event instanceof TouchEvent &&
        event.touches.length > 0 &&
        props.mantisComponentType !== MantisComponentType.LLens
      ) {
        event.preventDefault();
        // Support for "pinch to zoom" on mobile devices
        if (isZoomed() && event.touches.length === 2) {
          const currPointer1 = event.touches[0];
          const currPointer2 = event.touches[1];
          const currDiff = Math.sqrt(
            Math.pow(currPointer1.clientX - currPointer2.clientX, 2) +
              Math.pow(currPointer1.clientY - currPointer2.clientY, 2)
          );

          if (prevPinchDiff > 0) {
            if (currDiff > prevPinchDiff) {
              setMagnificationFactor(magnificationFactor() + SCROLL_DELTA());
            } else {
              setMagnificationFactor(
                Math.max(1, magnificationFactor() - SCROLL_DELTA())
              );
            }
          }
          prevPinchDiff = currDiff;
          return;
        }
        // Otherwise, if they're not pinching, just move the cursor.
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
      } else {
        return;
      }

      const mousePos = getMousePositionSVG({ x: clientX, y: clientY });
      setClientX(clientX);
      setClientY(clientY);
      if (mousePos) {
        setMouseX(mousePos.x);
        setMouseY(mousePos.y);
      }
    }
    function handleMouseDown(event: MouseEvent | TouchEvent) {
      let mousePos;
      if (event instanceof MouseEvent) {
        mousePos = getMousePositionSVG({
          x: event.clientX,
          y: event.clientY,
        });
      } else if (event instanceof TouchEvent && event.touches.length > 0) {
        mousePos = getMousePositionSVG({
          x: event.touches[0].clientX,
          y: event.touches[0].clientY,
        });
      }
      if (!mousePos) return;
      if (isMiniMapContext(mantisContext)) {
        mantisContext.setIsDragging(true);
        setDragStartX(mousePos.x - rectX());
        setDragStartY(mousePos.y - rectY());
      } else if (
        isMultiLensContext(mantisContext) &&
        props.mantisId !== undefined
      ) {
        const prevLensInfo = mantisContext.lensInfo()[props.mantisId];
        setDragStartX(mousePos.x - prevLensInfo.x);
        setDragStartY(mousePos.y - prevLensInfo.y);
        setIsDragging(true);
      }
    }
    function handleDrag(event: MouseEvent | TouchEvent) {
      let clientX, clientY;
      if (event instanceof MouseEvent) {
        clientX = event.clientX;
        clientY = event.clientY;
      } else if (event instanceof TouchEvent && event.touches.length > 0) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
        event.preventDefault();
      } else {
        return;
      }

      const mousePos = getMousePositionSVG({ x: clientX, y: clientY });
      if (!mousePos) return;
      if (isMiniMapContext(mantisContext) && mantisContext.isDragging()) {
        setRectX(mousePos.x - dragStartX());
        setRectY(mousePos.y - dragStartY());
        mantisContext.setViewBBox(
          `${rectX()} ${rectY()} ${rectWidth()} ${rectHeight()}`
        );
      } else if (
        isMultiLensContext(mantisContext) &&
        props.mantisId !== undefined &&
        isDragging()
      ) {
        setRectX(mousePos.x - dragStartX());
        setRectY(mousePos.y - dragStartY());
      }
    }
    function endDrag() {
      if (isMiniMapContext(mantisContext)) mantisContext.setIsDragging(false);
      else if (isMultiLensContext(mantisContext)) {
        mantisContext.updateLensInfo((prevList) =>
          prevList.map((item, i) =>
            i === props.mantisId ? { ...item, x: rectX(), y: rectY() } : item
          )
        );
        setIsDragging(false);
      }
    }

    /**
     * For the multi-lens component, add a lens centered around the mouse location.
     */
    function addLens(event: MouseEvent) {
      const mousePos = getMousePositionSVG({
        x: event.clientX,
        y: event.clientY,
      });
      if (mousePos && isMultiLensContext(mantisContext)) {
        event.preventDefault();
        mantisContext.updateLensInfo((prevInfo) => [
          ...prevInfo,
          {
            x: mousePos.x,
            y: mousePos.y,
            magnification: MAGNIFICATION_DEFAULT,
          },
        ]);
      }
    }
    /**
     * For the multi-lens component, delete the lens that is currently being hovered over.
     */
    function deleteLens(event: MouseEvent) {
      if (isMultiLensContext(mantisContext) && elementActive()) {
        event.preventDefault();
        mantisContext.updateLensInfo((prevInfo) =>
          prevInfo.filter((_, i) => i !== props.mantisId)
        );
      }
    }

    // GSAP Logic (Mini-Map Main + Traversal Components)
    createEffect(() => {
      if (svgRef) {
        if (
          props.mantisComponentType == MantisComponentType.MMMain &&
          isMiniMapContext(mantisContext)
        ) {
          if (isZoomed()) {
            gsap.to(svgRef, {
              attr: { viewBox: magnificationViewBox() },
              duration: mantisContext.isDragging() ? 0.5 : GSAP_DURATION(),
            });
            mantisContext.setViewBBox(magnificationViewBox());
          } else {
            mantisContext.setViewBBox(defaultViewBox());
          }
        } else if (isTraversalType(props.mantisComponentType)) {
          if (isZoomed()) {
            gsap.to(svgRef, {
              attr: { viewBox: magnificationViewBox() },
              duration: GSAP_DURATION(),
              onUpdate: updateGSAPCenter,
            });
            // TODO: Address the lag in the scroll.
            // if (
            //   prevMagnificationFactor !== undefined &&
            //   prevMagnificationFactor !== magnificationFactor()
            // ) {
            //   // svgRef.setAttribute("viewBox", magnificationViewBox());
            //   gsap.to(svgRef, {
            //     attr: { viewBox: magnificationViewBox() },
            //     duration: 0,
            //     immediateRender: true,
            //     onUpdate: updateGSAPCenter,
            //   });
            // } else {
            //   gsap.to(svgRef, {
            //     attr: { viewBox: magnificationViewBox() },
            //     duration: GSAP_DURATION(),
            //     onUpdate: updateGSAPCenter,
            //   });
            // }
          }
        }
      }
    });

    // Fixed Positioning (Multi-Lens Lens Component)
    const [lensShape, setLensShape] = createSignal<"circle" | "rectangle">(
      "rectangle"
    );
    createEffect(() => {
      if (props.mantisComponentType === MantisComponentType.LLens) {
        zoomAroundPoint({ x: rectX(), y: rectY() }, magnificationFactor());
      }
    });

    // SVG Event Listeners
    // Pinch-to-Zoom Support (Mobile)
    let prevPinchDiff = -1; // The previous distance between two fingers
    /**
     * Handles the "keydown" event.
     * When the 'f' key is pressed, toggle whether or not the mouse is frozen on the
     * main SVG.
     */
    function handleKeyPress(event: KeyboardEvent) {
      if (
        (isTraversalType(props.mantisComponentType) ||
          isDLMainType(props.mantisComponentType)) &&
        elementActive()
      ) {
        if (event.key === "f") setMouseActive(!mouseActive());
        else if (event.shiftKey && event.key === "ArrowUp") {
          event.preventDefault();
          if (isDockedLensContext(mantisContext)) {
            mantisContext.setDockedLensZoom((prev) => Math.floor(prev) + 1);
          } else if (isZoomed()) {
            setMagnificationFactor((prev) => Math.floor(prev) + 1);
          }
        } else if (event.shiftKey && event.key === "ArrowDown") {
          event.preventDefault();
          if (isDockedLensContext(mantisContext)) {
            mantisContext.setDockedLensZoom((prev) => Math.ceil(prev) - 1);
          } else if (isZoomed()) {
            setMagnificationFactor((prev) => Math.max(1, Math.ceil(prev) - 1));
          }
        }
        // Allows users to pan the Docked Lens main component.
        if (isDLMainType(props.mantisComponentType)) {
          if (event.shiftKey) return;
          switch (event.key) {
            case "ArrowUp":
              setMagnificationCenterY((prev) => prev - height() / 10);
              break;
            case "ArrowDown":
              setMagnificationCenterY((prev) => prev + height() / 10);
              break;
            case "ArrowLeft":
              setMagnificationCenterX((prev) => prev - width() / 10);
              break;
            case "ArrowRight":
              setMagnificationCenterX((prev) => prev + width() / 10);
              break;
          }
        }
        // Allows for users to cycle through the auto-focus of the Auto Map.
        if (
          isAutoMapContext(mantisContext) &&
          isAMTraversalType(props.mantisComponentType)
        ) {
          switch (event.key) {
            case "d":
              setAutoMapIndex((prev) => (prev + 1) % autoMapContent().length);
              break;
            case "a":
              setAutoMapIndex((prev) =>
                prev === 0 ? autoMapContent().length - 1 : prev - 1
              );
              break;
            case "w":
              mantisContext.setIsAutoZoomed(false);
              break;
            case "s":
              mantisContext.setIsAutoZoomed(true);
              break;
            case "e": {
              // TODO - Fix bug where it doesn't jump when the mouse is frozen
              const targetNodeCenter = mantisContext.selNodeCenter();
              setMagnificationCenterX(targetNodeCenter.x);
              setMagnificationCenterY(targetNodeCenter.y);
              setPreviewNodeId(
                previewNodeData()[
                  previewDelaunay().find(targetNodeCenter.x, targetNodeCenter.y)
                ].nodeId
              );
              setAutoMapIndex(0);
              if (!mouseActive()) {
                setMouseX(targetNodeCenter.x);
                setMouseY(targetNodeCenter.y);
              }
            }
          }
        }
      } else if (
        elementActive() &&
        props.mantisComponentType === MantisComponentType.LLens
      ) {
        // TODO - Resetting the zoom of a Lens doesn't work.
        if (event.key === "z") setMagnificationFactor(MAGNIFICATION_DEFAULT);
        else if (event.key === "c") setLensShape("circle");
        else if (event.key === "r") setLensShape("rectangle");
      }
    }
    createEffect(() => {
      if (svgRef) {
        document.addEventListener("keydown", handleKeyPress);
        document.addEventListener("mousemove", detectElementActive);
        document.addEventListener("touchmove", detectElementActive);
        svgRef.addEventListener(
          "mousemove",
          (e) => {
            if (mouseActive()) handleMouseMove(e);
            handleDrag(e);
          },
          false
        );
        svgRef.addEventListener(
          "touchmove",
          (e) => {
            if (mouseActive()) handleMouseMove(e);
            handleDrag(e);
          },
          false
        );
        svgRef.addEventListener(
          "touchend",
          () => {
            prevPinchDiff = -1;
          },
          false
        );
        if (isTraversalType(props.mantisComponentType)) {
          svgRef.addEventListener("click", zoomInNode, false);
          svgRef.addEventListener("wheel", handleScroll, false);
        } else if (isDraggableType(props.mantisComponentType)) {
          svgRef.addEventListener("mousedown", handleMouseDown, false);
          svgRef.addEventListener("touchstart", handleMouseDown, false);
          svgRef.addEventListener("mouseup", endDrag, false);
          svgRef.addEventListener("mouseleave", endDrag, false);
          svgRef.addEventListener("touchend", endDrag, false);
          if (props.mantisComponentType === MantisComponentType.LLens) {
            svgRef.addEventListener("wheel", handleScroll, false);
            svgRef.addEventListener(
              "click",
              (event) => {
                if (event.shiftKey) {
                  deleteLens(event);
                }
              },
              false
            );
          }
        } else if (props.mantisComponentType === MantisComponentType.LMain) {
          svgRef.addEventListener(
            "click",
            (event) => {
              if (event.shiftKey) {
                addLens(event);
              }
            },
            false
          );
        } else if (isDLMainType(props.mantisComponentType)) {
          svgRef.addEventListener("wheel", handleScroll, false);
        }
      }

      onCleanup(() => {
        if (svgRef) {
          document.removeEventListener("keydown", handleKeyPress);
          document.removeEventListener("mousemove", detectElementActive);
          document.removeEventListener("touchmove", detectElementActive);
          svgRef.removeEventListener(
            "mousemove",
            (e) => {
              if (mouseActive()) handleMouseMove(e);
              handleDrag(e);
            },
            false
          );
          svgRef.removeEventListener(
            "touchmove",
            (e) => {
              if (mouseActive()) handleMouseMove(e);
              handleDrag(e);
            },
            false
          );
          svgRef.removeEventListener(
            "touchend",
            () => {
              prevPinchDiff = -1;
            },
            false
          );
          if (isTraversalType(props.mantisComponentType)) {
            svgRef.removeEventListener("click", zoomInNode, false);
            svgRef.removeEventListener("wheel", handleScroll, false);
          } else if (isDraggableType(props.mantisComponentType)) {
            svgRef.removeEventListener("mousedown", handleMouseDown, false);
            svgRef.removeEventListener("touchstart", handleMouseDown, false);
            svgRef.removeEventListener("mouseup", endDrag, false);
            svgRef.removeEventListener("mouseleave", endDrag, false);
            svgRef.removeEventListener("touchend", endDrag, false);
            if (props.mantisComponentType === MantisComponentType.LLens) {
              svgRef.removeEventListener("wheel", handleScroll, false);
              svgRef.removeEventListener(
                "click",
                (event) => {
                  if (event.shiftKey) {
                    deleteLens(event);
                  }
                },
                false
              );
            }
          } else if (props.mantisComponentType === MantisComponentType.LMain) {
            svgRef.removeEventListener(
              "click",
              (event) => {
                if (event.shiftKey) {
                  addLens(event);
                }
              },
              false
            );
          } else if (isDLMainType(props.mantisComponentType)) {
            svgRef.removeEventListener("wheel", handleScroll, false);
          }
        }
      });
    });

    // Navigational Logic (Traversal Type Components)
    createEffect(() => {
      if (isTraversalType(props.mantisComponentType)) {
        // Finds the node closest to the cursor.
        const closestPointBubble = bubbleDelaunay().find(mouseX(), mouseY());
        const closestPointImportant = previewDelaunay().find(
          mouseX(),
          mouseY()
        );
        if (isNaN(closestPointBubble)) return;
        setCurrentNodeBubbleIndex(closestPointBubble);
        setCurrentNodePreviewIndex((prevVal) => {
          const newVal = isNaN(closestPointImportant)
            ? -1
            : closestPointImportant;
          if (newVal !== prevVal) setAutoMapIndex(0);
          return newVal;
        });

        setCurrentNodeId(
          resolveNode(bubbleNodeData()[closestPointBubble].nodeId)
        );
        if (!isNaN(closestPointImportant))
          setPreviewNodeId(
            resolveNode(previewNodeData()[closestPointImportant].nodeId)
          );

        if (props.mantisTraversalPattern === MantisTraversalPattern.Bubble) {
          // Update the user's view to center around the selected node.
          setMagnificationCenterX(selNodeCenterX());
          setMagnificationCenterY(selNodeCenterY());

          setRectX(selNodeX());
          setRectY(selNodeY());
          setRectHeight(selNodeHeight());
          setRectWidth(selNodeWidth());
        } else if (
          props.mantisTraversalPattern === MantisTraversalPattern.Joystick
        ) {
          // Mirrors the traditional behavior of screen magnifiers. In other words, it allows
          // the user to move their mouse around, but only moves the screen around when the mouse
          // is near the edge of the screen.
          /**
           * Updates the magnification center based on the current position, mouse position, and boundaries.
           *
           * @param current - The current magnification center position.
           * @param mouse - The current mouse position.
           * @param min - The minimum boundary for the magnification center.
           * @param max - The maximum boundary for the magnification center.
           * @param length - The total length of the area being magnified.
           * @returns The updated magnification center position.
           */
          const updateMagnificationCenter = (
            current: number,
            mouse: number,
            min: number,
            max: number,
            length: number
          ) => {
            const edgeThreshold = length / 7; // Distance from the edge of the screen to start scrolling

            if (mouse < min + edgeThreshold) {
              return Math.max(min, current - TRADITIONAL_EPSILON());
            } else if (mouse > max - edgeThreshold) {
              return Math.min(max, current + TRADITIONAL_EPSILON());
            }
            return current;
          };

          setMagnificationCenterX((currX) => {
            const newX = updateMagnificationCenter(
              currX,
              mouseX(),
              magnificationX(),
              magnificationX() + magnificationWidth(),
              magnificationWidth()
            );
            return Math.max(minX(), Math.min(newX, minX() + width()));
          });
          setMagnificationCenterY((currY) => {
            const newY = updateMagnificationCenter(
              currY,
              mouseY(),
              magnificationY(),
              magnificationY() + magnificationHeight(),
              magnificationHeight()
            );
            return Math.max(minY(), Math.min(newY, minY() + height()));
          });
        } else {
          // A more free form traversal pattern. The center of the screen just follows the mouse.
          setMagnificationCenterX((currX: number) => {
            const newX =
              Math.abs(currX - mouseX()) > CURSOR_EPSILON() ? mouseX() : currX;
            return Math.max(minX(), Math.min(newX, minX() + width()));
          });
          setMagnificationCenterY((currY: number) => {
            const newY =
              Math.abs(currY - mouseY()) > CURSOR_EPSILON() ? mouseY() : currY;
            return Math.max(minY(), Math.min(newY, minY() + height()));
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
        const newCenterX = parseFloat(vbbX) + parseFloat(vbbW) / 2;
        const newCenterY = parseFloat(vbbY) + parseFloat(vbbH) / 2;
        setMagnificationCenterX(newCenterX);
        setMagnificationCenterY(newCenterY);
        setMouseX(newCenterX);
        setMouseY(newCenterY);
      }
    });

    // AUTO-MAP LOGIC
    // Node IDs of the related nodes to the current node.
    const autoMapContent = () => {
      const relatedNodeIds = relatedNodes()
        .filter((node) => indicatorNodes().has(node))
        .map((node) => scopeMap.getValue(node))
        .filter((nodeId) => nodeId !== undefined);
      return [previewNodeId(), ...relatedNodeIds];
    };
    // Auto-Map Helper Functions
    /**
     * Updates the magnification view box to zoom in on a given bounding box (bbox).
     * Maintains the aspect ratio of the view box.
     *
     * @param bbox - The bounding box to zoom in on, defined by left, top, width, and height.
     */
    function zoomToBBox(bbox: {
      left: number;
      top: number;
      width: number;
      height: number;
    }) {
      const bboxAspectRatio = bbox.width / bbox.height;
      const viewBoxAspectRatio = actualWidth() / actualHeight();

      let zoomWidth, zoomHeight;

      if (bboxAspectRatio > viewBoxAspectRatio) {
        // Match width and adjust height to maintain aspect ratio
        zoomWidth = bbox.width;
        zoomHeight = bbox.width / viewBoxAspectRatio;
      } else {
        // Match height and adjust width to maintain aspect ratio
        zoomHeight = bbox.height;
        zoomWidth = bbox.height * viewBoxAspectRatio;
      }

      const zoomFactor = Math.min(
        actualWidth() / zoomWidth,
        actualHeight() / zoomHeight
      );
      const zoomX = bbox.left + bbox.width / 2 - actualWidth() / zoomFactor / 2;
      const zoomY =
        bbox.top + bbox.height / 2 - actualHeight() / zoomFactor / 2;

      setMagnificationCenterX(zoomX + actualWidth() / zoomFactor / 2);
      setMagnificationCenterY(zoomY + actualHeight() / zoomFactor / 2);
      setMagnificationFactor(Math.max(1, zoomFactor * 0.9));
    }

    // Auto-Map Traversal/Visual Logic
    const [autoMapIndex, setAutoMapIndex] = createSignal(0);
    createEffect(() => {
      if (isAutoMapContext(mantisContext)) {
        // Update the main context with information from the Traversal component.
        if (isAMTraversalType(props.mantisComponentType)) {
          mantisContext.setMainViewBox(magnificationViewBox());
          // The traversal component keeps track of which node is currently selected to be viewed
          // by the auto component. Right now, the user just uses 'a' and 'd' to cycle through the nodes.
          // TODO - Maybe we can be more helpful in this cycling process?
          const autoMapNode = previewNodeInfo.get(
            autoMapContent()[autoMapIndex() ?? 0]
          );
          if (!autoMapNode) return;
          mantisContext.setSelNodeCenter({
            x: autoMapNode.cx,
            y: autoMapNode.cy,
          });
          // At the moment, the zoom matches the traversal component.
          mantisContext.setZoomLevel(magnificationFactor());
          // Provides the auto component with a list of all of the view boxes of the related nodes.
          // That way, when the user presses "w", they can see all of the related nodes at once.
          mantisContext.setAllViewBoxes(
            autoMapContent().map((nodeId) => {
              const currContentBBox = getBbox(nodeId) ?? {
                left: 0,
                top: 0,
                width: 0,
                height: 0,
              };
              const currContentTransform = calculateTransform(nodeId);
              return `${(currContentBBox.left ?? 0) + currContentTransform.x} ${(currContentBBox.top ?? 0) + currContentTransform.y} ${currContentBBox.width} ${currContentBBox.height}`;
            })
          );
        } else if (isAMAutoType(props.mantisComponentType) && svgRef) {
          if (mantisContext.isAutoZoomed()) {
            // Update the automatic screen to center around the selected node
            // and zoom to the specified zoom level.
            setMagnificationFactor(mantisContext.zoomLevel());
            setMagnificationCenterX(mantisContext.selNodeCenter().x);
            setMagnificationCenterY(mantisContext.selNodeCenter().y);
          } else {
            const allVBBBox = computeBBoxUnion(
              mantisContext.allViewBoxes().map((viewBox) => {
                const [left, top, width, height] = viewBox
                  .split(" ")
                  .map(Number);
                return { left, top, width, height };
              })
            );
            zoomToBBox(allVBBBox);
          }
          gsap.to(svgRef, {
            attr: {
              viewBox: magnificationViewBox(),
            },
            duration: GSAP_DURATION(),
            onUpdate: updateGSAPCenter,
          });
        }
      }
    });

    // DOCKED LENS LOGIC
    function updateMouseCenter() {
      const newMouseCoords = getMousePositionSVG({
        x: clientX(),
        y: clientY(),
      });
      if (!newMouseCoords) return;
      setMouseX(newMouseCoords.x);
      setMouseY(newMouseCoords.y);
    }
    createEffect(() => {
      if (isDockedLensContext(mantisContext)) {
        if (isDLMainType(props.mantisComponentType) && svgRef) {
          if (props.mantisComponentType !== MantisComponentType.DLMain) {
            // Finds the preview node closest to the cursor.
            const closestPointPreview = previewDelaunay().find(
              mouseX(),
              mouseY()
            );
            if (isNaN(closestPointPreview)) return;
            setPreviewNodeId(
              resolveNode(previewNodeData()[closestPointPreview].nodeId)
            );

            mantisContext.setMouseCenter({
              x: prevNodeCenterX(),
              y: prevNodeCenterY(),
            });
          } else if (
            props.mantisTraversalPattern === MantisTraversalPattern.Bubble
          ) {
            // Finds the node closest to the cursor.
            const closestPointBubble = bubbleDelaunay().find(
              mouseX(),
              mouseY()
            );
            if (isNaN(closestPointBubble)) return;
            setCurrentNodeId(
              resolveNode(bubbleNodeData()[closestPointBubble].nodeId)
            );

            mantisContext.setMouseCenter({
              x: selNodeCenterX(),
              y: selNodeCenterY(),
            });
          } else {
            mantisContext.setMouseCenter({ x: mouseX(), y: mouseY() });
          }
          gsap.to(svgRef, {
            attr: {
              viewBox: isZoomed() ? magnificationViewBox() : defaultViewBox(),
            },
            duration: GSAP_DURATION(),
            onUpdate: updateGSAPCenter,
            onComplete: updateMouseCenter,
          });
        } else if (
          props.mantisComponentType === MantisComponentType.DLLens &&
          svgRef
        ) {
          const { x, y } = mantisContext.mouseCenter();
          setMagnificationCenterX(x);
          setMagnificationCenterY(y);
          setMagnificationFactor(mantisContext.dockedLensZoom());

          gsap.to(svgRef, {
            attr: {
              viewBox: magnificationViewBox(),
            },
            duration: GSAP_DURATION(),
            onUpdate: updateGSAPCenter,
          });
        }
      }
    });

    // Highlighting?
    function hideNode(nodeId: string) {
      if (svgRef) {
        const element =
          svgRef.querySelector(`[name="${nodeId}"]`) ||
          svgRef.querySelector(`[id="${nodeId}"]`);
        if (element) {
          element.setAttribute("filter", "");
        }
      }
    }
    function highlightNode(
      nodeId: string,
      rgbaColor: string = "rgba(0, 128, 0, 0.5)"
    ) {
      if (svgRef) {
        const element =
          svgRef.querySelector(`[name="${nodeId}"]`) ||
          svgRef.querySelector(`[id="${nodeId}"]`);
        if (element) {
          element.setAttribute(
            "filter",
            `drop-shadow(1.5mm 1.5mm 2mm ${rgbaColor})`
          );
        }
      }
    }
    const relatedNodesToHighlight = () =>
      new Set(
        (
          nodeRelations().get(
            scopeMap.getKey(
              isPreviewType(props.mantisComponentType) ||
                isAMTraversalType(props.mantisComponentType) ||
                isDLMainType(props.mantisComponentType)
                ? previewNodeId()
                : currentNodeId()
            ) ?? ""
          ) ?? []
        ).map((nrId) => scopeMap.getValue(nrId))
      );
    createEffect(() => {
      for (const bubbleNode of previewNodeData()) {
        if (previewNodeId() === bubbleNode.nodeId) {
          highlightNode(bubbleNode.nodeId, "rgba(0, 0, 255, 0.8");
        } else if (relatedNodesToHighlight().has(bubbleNode.nodeId)) {
          highlightNode(bubbleNode.nodeId);
        } else {
          hideNode(bubbleNode.nodeId);
        }
      }
    });

    // HELPER FUNCTIONS
    const OffScreenArrow = (props: {
      targetPoint: Point;
      arrowheadColor?: string;
      arrowType?: "notch" | "enemy";
      nodeId?: string;
      onClick?: () => void;
      straightenArrow?: boolean;
      hideIcon?: boolean;
    }) => {
      // CONSTANTS
      const mergedProps = mergeProps(
        { arrowheadColor: "purple", arrowType: "notch", nodeId: "" },
        props
      );

      // Calculate the direction vector from the center of the magnification view box to the `targetPoint`.
      const vbbXMin = createMemo(() => gsapCenterX() - gsapWidth() / 2);
      const vbbXMax = createMemo(() => gsapCenterX() + gsapWidth() / 2);
      const vbbYMin = createMemo(() => gsapCenterY() - gsapHeight() / 2);
      const vbbYMax = createMemo(() => gsapCenterY() + gsapHeight() / 2);

      // Arrow Icons
      const [arrowIcon, setArrowIcon] = createSignal<
        SVGTextElement | SVGCircleElement | SVGGraphicsElement | undefined
      >(undefined);
      const [iconNodeId, setIconNodeId] = createSignal<string>("");

      const iconDims = createMemo(() => {
        return getBbox(iconNodeId());
      });
      const iconWidth = createMemo(() => {
        const bbox = arrowIcon()?.getBBox();
        return bbox ? bbox.width : 0;
      });
      const iconHeight = createMemo(() => {
        const bbox = arrowIcon()?.getBBox();
        return bbox ? bbox.height : 0;
      });
      // Queries the target node.
      createEffect(() => {
        if (svgRef && props.nodeId) {
          const currNodeType = getNodeType(props.nodeId);
          if (currNodeType === "Text") {
            const node = previewNodeInfo.get(props.nodeId);
            if (node) {
              const textLabel = svgRef.querySelector(
                `[name="${props.nodeId}"]`
              );
              if (textLabel) {
                setArrowIcon(textLabel as SVGTextElement);
                setIconNodeId(props.nodeId);
              }
            }
          } else if (currNodeType === "Circle") {
            const node = previewNodeInfo.get(props.nodeId);
            if (node) {
              const circleNode = svgRef.querySelector(
                `[name="${props.nodeId}"]`
              );
              if (circleNode) {
                setArrowIcon(circleNode.cloneNode(false) as SVGCircleElement);
                setIconNodeId(props.nodeId);
              }
            }
          } else {
            const node = previewNodeInfo.get(props.nodeId);
            if (node) {
              const findAndCloneNode = (selector: string) => {
                const element = svgRef.querySelector(selector);
                if (element) {
                  const clonedElement = element.cloneNode(
                    true
                  ) as SVGGraphicsElement;
                  clonedElement.removeAttribute("transform");
                  return clonedElement;
                }
                return null;
              };

              const clonedNode =
                findAndCloneNode(`[name="${props.nodeId}"]`) ||
                findAndCloneNode(`[id="${props.nodeId}"]`);

              if (clonedNode) {
                setArrowIcon(clonedNode);
                setIconNodeId(props.nodeId);
                return;
              }

              const parentNodeId = scenegraph[props.nodeId]?.parent;
              if (parentNodeId) {
                const clonedParentNode = findAndCloneNode(
                  `[id="${parentNodeId}"]`
                );
                if (clonedParentNode) {
                  setArrowIcon(clonedParentNode);
                  setIconNodeId(parentNodeId);
                }
              }
            }
          }
        }
      });

      const ArrowIconElement = () => {
        const nodeType = () => getNodeType(mergedProps.nodeId);

        return (
          <Switch
            fallback={
              <>
                <g
                  transform={`translate(${iconCenter().x - (iconDims().width ?? iconWidth()) / 2 / gsapMagnificationFactor()}, ${
                    iconCenter().y -
                    (iconDims().height ?? iconHeight()) /
                      2 /
                      gsapMagnificationFactor()
                  }) scale(${1 / gsapMagnificationFactor()})`}
                >
                  <rect
                    x={0}
                    y={0}
                    width={iconDims().width ?? 0}
                    height={iconDims().height ?? 0}
                    fill="white"
                    stroke={mergedProps.arrowheadColor}
                    stroke-width={1 / gsapMagnificationFactor()}
                  />
                  <g
                    transform={`translate(${-(iconDims().left ?? 0)}, ${-(iconDims().top ?? 0)})`}
                  >
                    {arrowIcon()}
                  </g>
                </g>
              </>
            }
          >
            <Match when={nodeType() === "Text"}>
              <text
                x={iconCenter().x}
                y={iconCenter().y}
                fill={
                  mergedProps.arrowType === "enemy"
                    ? mergedProps.arrowheadColor
                    : (arrowIcon()?.getAttribute("fill") ?? "black")
                }
                font-size={`${
                  (parseFloat(arrowIcon()?.getAttribute("font-size") ?? "14") *
                    MAGNIFICATION_DEFAULT *
                    1.5) /
                  gsapMagnificationFactor()
                }`}
                font-family={
                  arrowIcon()?.getAttribute("font-family") ??
                  "Alegreya Sans, sans-serif"
                }
                font-weight={arrowIcon()?.getAttribute("font-weight") ?? "700"}
                text-anchor="middle"
                alignment-baseline="middle"
                dominant-baseline="middle"
              >
                {arrowIcon()?.textContent}
              </text>
            </Match>
            <Match when={nodeType() === "Circle"}>
              <circle
                cx={iconCenter().x}
                cy={iconCenter().y}
                r={arrowBaseWidth()}
                fill={arrowIcon()?.getAttribute("fill") ?? "black"}
                stroke={arrowIcon()?.getAttribute("stroke") ?? "none"}
                stroke-width={
                  parseFloat(arrowIcon()?.getAttribute("stroke-width") ?? "0") /
                  gsapMagnificationFactor()
                }
              />
            </Match>
          </Switch>
        );
      };

      const directionVector = createMemo(() => {
        if (props.straightenArrow) {
          const nodeType = getNodeType(mergedProps.nodeId);
          const inWidth =
            (nodeType === "Text"
              ? props.targetPoint.x - iconWidth()
              : props.targetPoint.x) >= vbbXMin() &&
            (nodeType === "Text"
              ? props.targetPoint.x + iconWidth()
              : props.targetPoint.x) <= vbbXMax();
          const inHeight =
            (nodeType === "Text"
              ? props.targetPoint.y - iconHeight()
              : props.targetPoint.y) >= vbbYMin() &&
            (nodeType === "Text"
              ? props.targetPoint.y + iconHeight()
              : props.targetPoint.y) <= vbbYMax();

          if (inWidth) {
            return {
              x: 0,
              y: props.targetPoint.y - gsapCenterY(),
            };
          } else if (inHeight) {
            return {
              x: props.targetPoint.x - gsapCenterX(),
              y: 0,
            };
          }
        }
        return {
          x: props.targetPoint.x - gsapCenterX(),
          y: props.targetPoint.y - gsapCenterY(),
        };
      });
      const directionVectorMagnitude = createMemo(() =>
        Math.sqrt(directionVector().x ** 2 + directionVector().y ** 2)
      );
      const directionVectorAngle = createMemo(() => {
        const angle = Math.atan2(directionVector().y, directionVector().x);
        return angle < 0 ? angle + 2 * Math.PI : angle;
      });
      const normalizedDirectionVector = createMemo(() => {
        return {
          x: directionVector().x / directionVectorMagnitude(),
          y: directionVector().y / directionVectorMagnitude(),
        };
      });

      // Scale the dimensions of the arrowhead by the `magnificationFactor`.
      const arrowLength = createMemo(
        () =>
          Math.min(actualWidth(), actualHeight()) /
          gsapMagnificationFactor() /
          ARROW_SIZE()
      ); // Length of the arrowhead
      const arrowBaseWidth = createMemo(
        () =>
          Math.min(actualWidth(), actualHeight()) /
          gsapMagnificationFactor() /
          (ARROW_SIZE() * 2)
      ); // Width of the arrowhead base
      const arrowPadding = createMemo(
        () =>
          Math.min(actualWidth(), actualHeight()) /
          gsapMagnificationFactor() /
          ARROW_SIZE()
      ); // Padding between the arrow and the edge of the view box
      const notchDepth = createMemo(
        () =>
          Math.min(actualWidth(), actualHeight()) /
          gsapMagnificationFactor() /
          (ARROW_SIZE() * 2)
      ); // Depth of the arrowhead notch
      const arrowCenter = createMemo(() => {
        const distanceToEdge = Math.min(
          Math.abs(gsapWidth() / 2 / Math.cos(directionVectorAngle())),
          Math.abs(gsapHeight() / 2 / Math.sin(directionVectorAngle()))
        );
        const multiplier = distanceToEdge - arrowPadding();
        const nodeType = getNodeType(mergedProps.nodeId);
        const inWidth =
          (nodeType === "Text"
            ? props.targetPoint.x - iconWidth()
            : props.targetPoint.x) >= vbbXMin() &&
          (nodeType === "Text"
            ? props.targetPoint.x + iconWidth()
            : props.targetPoint.x) <= vbbXMax();
        const inHeight =
          (nodeType === "Text"
            ? props.targetPoint.y - iconHeight()
            : props.targetPoint.y) >= vbbYMin() &&
          (nodeType === "Text"
            ? props.targetPoint.y + iconHeight()
            : props.targetPoint.y) <= vbbYMax();

        return {
          x:
            props.straightenArrow && inWidth
              ? props.targetPoint.x
              : gsapCenterX() + normalizedDirectionVector().x * multiplier,
          y:
            props.straightenArrow && inHeight
              ? props.targetPoint.y
              : gsapCenterY() + normalizedDirectionVector().y * multiplier,
        };
      });
      const notchLeft = createMemo(() => {
        return {
          x:
            arrowCenter().x -
            normalizedDirectionVector().y * arrowBaseWidth() -
            normalizedDirectionVector().x * notchDepth(),
          y:
            arrowCenter().y +
            normalizedDirectionVector().x * arrowBaseWidth() -
            normalizedDirectionVector().y * notchDepth(),
        };
      });
      const normLeft = createMemo(() => {
        return {
          x: arrowCenter().x - normalizedDirectionVector().y * arrowBaseWidth(),
          y: arrowCenter().y + normalizedDirectionVector().x * arrowBaseWidth(),
        };
      });
      const notchRight = createMemo(() => {
        return {
          x:
            arrowCenter().x +
            normalizedDirectionVector().y * arrowBaseWidth() -
            normalizedDirectionVector().x * notchDepth(),
          y:
            arrowCenter().y -
            normalizedDirectionVector().x * arrowBaseWidth() -
            normalizedDirectionVector().y * notchDepth(),
        };
      });
      const normRight = createMemo(() => {
        return {
          x: arrowCenter().x + normalizedDirectionVector().y * arrowBaseWidth(),
          y: arrowCenter().y - normalizedDirectionVector().x * arrowBaseWidth(),
        };
      });
      const arrowTip = createMemo(() => {
        return {
          x: arrowCenter().x + normalizedDirectionVector().x * arrowLength(),
          y: arrowCenter().y + normalizedDirectionVector().y * arrowLength(),
        };
      });
      const iconCenter = createMemo(() => {
        const adjustment = {
          x: 0,
          y: 0,
        };

        if (
          directionVectorAngle() > Math.PI / 4 &&
          directionVectorAngle() < (3 * Math.PI) / 4
        ) {
          // Arrow is pointing up
          adjustment.y = iconDims().height ?? 0;
        } else if (
          directionVectorAngle() > (5 * Math.PI) / 4 &&
          directionVectorAngle() < (7 * Math.PI) / 4
        ) {
          // Arrow is pointing down
          adjustment.y = -(iconDims().height ?? 0);
        } else if (
          directionVectorAngle() <= Math.PI / 4 ||
          directionVectorAngle() >= (7 * Math.PI) / 4
        ) {
          // Arrow is pointing right
          adjustment.x = iconDims().width ?? 0;
        } else if (
          directionVectorAngle() >= (3 * Math.PI) / 4 &&
          directionVectorAngle() <= (5 * Math.PI) / 4
        ) {
          // Arrow is pointing left
          adjustment.x = -(iconDims().width ?? 0);
        }

        return {
          x:
            arrowCenter().x -
            (mergedProps.arrowType === "enemy"
              ? 0
              : normalizedDirectionVector().x * arrowLength() * 0.75) -
            adjustment.x / 2 / gsapMagnificationFactor(),
          y:
            arrowCenter().y -
            (mergedProps.arrowType === "enemy"
              ? 0
              : normalizedDirectionVector().y * arrowLength() * 0.75) -
            adjustment.y / 2 / gsapMagnificationFactor(),
        };
      });

      // Event Listener
      let polygonRef: SVGPolygonElement | undefined;
      function onPolygonClick(e: MouseEvent | TouchEvent) {
        e.preventDefault();
        e.stopImmediatePropagation();
        if (props.onClick) props.onClick();
      }
      createEffect(() => {
        if (polygonRef) {
          polygonRef.addEventListener("click", onPolygonClick, false);
        }

        onCleanup(() => {
          if (polygonRef) {
            polygonRef.removeEventListener("click", onPolygonClick, false);
          }
        });
      });

      return (
        <Switch>
          <Match when={mergedProps.arrowType === "notch"}>
            <polygon
              id="mantis-ui-arrow"
              points={`${arrowTip().x},${arrowTip().y} ${notchLeft().x},${notchLeft().y} ${arrowCenter().x},${arrowCenter().y} ${notchRight().x},${notchRight().y}`}
              fill={mergedProps.arrowheadColor}
              stroke={"black"}
              stroke-width={0}
              style={{
                filter: `drop-shadow(${0.3 / gsapMagnificationFactor()}rem ${0.3 / gsapMagnificationFactor()}rem ${0.5 / gsapMagnificationFactor()}rem rgba(0, 0, 0, 0.7))`,
              }}
              ref={polygonRef}
            />
            {!props.hideIcon && arrowIcon() && <ArrowIconElement />}
          </Match>
          <Match when={mergedProps.arrowType === "enemy"}>
            <polygon
              points={`${arrowTip().x},${arrowTip().y} ${normLeft().x},${normLeft().y} ${normRight().x},${normRight().y}`}
              fill={mergedProps.arrowheadColor}
              stroke={"black"}
              stroke-width={0}
              ref={polygonRef}
            />
            {!props.hideIcon && arrowIcon() && <ArrowIconElement />}
          </Match>
        </Switch>
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

      return (
        <>
          {(showHighlighting() || isAutoMapContext(mantisContext)) && (
            <rect
              x={vbX()}
              y={vbY()}
              width={vbW()}
              height={vbH()}
              fill="transparent"
              stroke={props.stroke}
              stroke-width={props.strokeWidth}
            />
          )}
          {isZoomed() &&
            props.viewBox &&
            !viewBoxOverlaps(magnificationViewBox(), props.viewBox) && (
              <OffScreenArrow
                targetPoint={vbCenterPoint()}
                arrowheadColor={props.stroke}
              />
            )}
        </>
      );
    };
    const LensClipPath = (
      props: ParentProps & {
        id: number;
        lensInfo: LLensInfo;
        snap?: boolean;
        shape?: "circle" | "rectangle";
      }
    ) => {
      const STROKE_WIDTH_VAL = 8;
      const [lensScale, setLensScale] = createSignal(2);
      const LENS_RADIUS = () =>
        Math.min(actualWidth(), actualHeight()) /
        magnificationFactor() /
        lensScale();
      const LENS_WIDTH = () =>
        (Math.min(actualWidth(), actualHeight()) /
          magnificationFactor() /
          lensScale()) *
        2;
      const LENS_HEIGHT = () =>
        (Math.min(actualWidth(), actualHeight()) /
          magnificationFactor() /
          (lensScale() * 1.5)) *
        2;
      const lensID = () => `lensClip-${props.id}`;

      // On mount, set the initial conditions of the lens component.
      createEffect(() => {
        if (!isDragging()) {
          // If snapping is enabled, the lens snaps to the nearest node when it's not being dragged.
          // Otherwise, the lens stays where the mouse leaves it.
          if (props.snap) {
            // Finds the node closest to the lens.
            const closestPointIndex = bubbleDelaunay().find(
              props.lensInfo.x,
              props.lensInfo.y
            );
            if (isNaN(closestPointIndex)) return;
            const closestPoint = bubbleNodeData()[closestPointIndex];
            setRectX(closestPoint.cx);
            setRectY(closestPoint.cy);
          } else {
            setRectX(props.lensInfo.x);
            setRectY(props.lensInfo.y);
          }
          setMagnificationFactor(props.lensInfo.magnification);
          zoomAroundPoint(
            { x: rectX(), y: rectY() },
            props.lensInfo.magnification
          );
        }
      });

      function changeLensSize(event: KeyboardEvent) {
        if (elementActive()) {
          if (event.key === "ArrowDown") {
            setLensScale((prev) => prev + 0.1);
            event.preventDefault();
          } else if (event.key === "ArrowUp") {
            setLensScale((prev) => Math.max(prev - 0.1, 0.1));
            event.preventDefault();
          }
        }
      }

      createEffect(() => {
        if (svgRef) {
          document.addEventListener("keydown", changeLensSize);
        }
        onCleanup(() => {
          document.removeEventListener("keydown", changeLensSize);
        });
      });

      return (
        <>
          <defs>
            <clipPath id={lensID()}>
              {props.shape === "rectangle" ? (
                <rect
                  x={rectX() - LENS_WIDTH() / 2}
                  y={rectY() - LENS_HEIGHT() / 2}
                  width={LENS_WIDTH()}
                  height={LENS_HEIGHT()}
                />
              ) : (
                <circle cx={rectX()} cy={rectY()} r={LENS_RADIUS()} />
              )}
            </clipPath>
          </defs>
          <g
            clip-path={`url(#${lensID()})`}
            style={{ "pointer-events": "auto" }}
          >
            {props.shape === "rectangle" ? (
              <rect
                x={rectX() - LENS_WIDTH() / 2}
                y={rectY() - LENS_HEIGHT() / 2}
                width={LENS_WIDTH()}
                height={LENS_HEIGHT()}
                fill="white"
              />
            ) : (
              <circle
                cx={rectX()}
                cy={rectY()}
                r={LENS_RADIUS()}
                fill="white"
              />
            )}
            {props.children}
            {props.shape === "rectangle" ? (
              <rect
                x={rectX() - LENS_WIDTH() / 2}
                y={rectY() - LENS_HEIGHT() / 2}
                width={LENS_WIDTH()}
                height={LENS_HEIGHT()}
                stroke="black"
                stroke-width={STROKE_WIDTH_VAL / magnificationFactor()}
                fill="transparent"
              />
            ) : (
              <circle
                cx={rectX()}
                cy={rectY()}
                r={LENS_RADIUS()}
                stroke="black"
                stroke-width={STROKE_WIDTH_VAL / magnificationFactor()}
                fill="transparent"
              />
            )}
          </g>
        </>
      );
    };

    return (
      <svg
        style={determineCSSStyle(props.mantisComponentType)}
        width={calculateSVGDims(props.mantisComponentType)}
        height={calculateSVGDims(props.mantisComponentType)}
        viewBox={
          props.mantisComponentType === MantisComponentType.LLens
            ? magnificationViewBox()
            : defaultViewBox()
        }
        ref={svgRef}
      >
        {props.mantisComponentType === MantisComponentType.LLens ? (
          <>
            {isMultiLensContext(mantisContext) &&
              props.mantisId !== undefined && (
                <LensClipPath
                  shape={lensShape()}
                  id={props.mantisId}
                  lensInfo={mantisContext.lensInfo()[props.mantisId]}
                  snap={
                    props.mantisTraversalPattern ===
                    MantisTraversalPattern.Bubble
                  }
                >
                  {paintProps.children}
                </LensClipPath>
              )}
          </>
        ) : (
          <>
            {paintProps.children}
            {/* Voronoi, Dynamic Highlighting & Indicators */}
            {(isTraversalType(props.mantisComponentType) ||
              (isDLMainType(props.mantisComponentType) &&
                props.mantisComponentType !== MantisComponentType.DLMain)) &&
              currentNode() && (
                <>
                  {/* Voronoi */}
                  <Show when={props.showVoronoi}>
                    <For each={Array.from(bubbleVoronoi().cellPolygons())}>
                      {(cell) => (
                        <polygon
                          points={cell
                            .map((point) => point.join(","))
                            .join(" ")}
                          stroke-width={1}
                          stroke="red"
                          fill-opacity={0}
                        />
                      )}
                    </For>
                  </Show>
                  {/* Dynamic Highlighting */}
                  <Show when={showHighlighting()}>
                    {/* Highlight Selected Node */}
                    {isPreviewType(props.mantisComponentType) ||
                    isAMTraversalType(props.mantisComponentType) ||
                    isDLMainType(props.mantisComponentType) ? (
                      <rect
                        stroke="green"
                        fill="none"
                        stroke-width={2}
                        x={prevNodeX()}
                        y={prevNodeY()}
                        width={prevNodeWidth()}
                        height={prevNodeHeight()}
                      />
                    ) : (
                      <rect
                        stroke="green"
                        fill="none"
                        stroke-width={2}
                        x={selNodeX()}
                        y={selNodeY()}
                        width={selNodeWidth()}
                        height={selNodeHeight()}
                      />
                    )}
                    {/* Highlight Related Nodes (HARDCODED IN `nodeRelations`) */}
                    <For
                      each={
                        nodeRelations().get(
                          scopeMap.getKey(
                            isPreviewType(props.mantisComponentType) ||
                              isAMTraversalType(props.mantisComponentType) ||
                              isDLMainType(props.mantisComponentType)
                              ? previewNodeId()
                              : currentNodeId()
                          ) ?? ""
                        ) ?? []
                      }
                    >
                      {(nodeName) => {
                        const nodeId = scopeMap.getValue(nodeName);
                        if (!nodeId || getNodeType(nodeId) === "Bluefish")
                          return;
                        const nodeBBox = getBbox(nodeId);
                        const nodeXY = calculateTransformedBboxXY(nodeId);
                        // Lines have width 0

                        return (
                          <>
                            <rect
                              x={nodeXY.x}
                              y={nodeXY.y}
                              width={Math.max(nodeBBox.width ?? 0, 1)}
                              height={Math.max(nodeBBox.height ?? 0, 1)}
                              fill-opacity={0}
                              stroke="blue"
                              stroke-width={2}
                            />
                          </>
                        );
                      }}
                    </For>
                  </Show>
                  {/* Indicators that point at neighbors */}
                  <Show when={isPreviewType(props.mantisComponentType)}>
                    <For
                      each={Array.from(
                        previewVoronoi().neighbors(currentNodePreviewIndex())
                      )}
                    >
                      {(neighborIndex) => {
                        // Look up the neighbor's node ID.
                        if (neighborIndex === undefined || neighborIndex < 0)
                          return;
                        const neighborNodeMidpoint = () =>
                          previewNodeData()[neighborIndex];
                        const neighborNodeId = neighborNodeMidpoint().nodeId;
                        // Determine whether or not to show the arrow.
                        const neighborBbox = getBbox(neighborNodeId);
                        const neighborXY =
                          calculateTransformedBboxXY(neighborNodeId);
                        const isConnector = () =>
                          getNodeType(neighborNodeId) === "Arrow" ||
                          getNodeType(neighborNodeId) === "Line";
                        const showArrow = () =>
                          isZoomed() &&
                          !viewBoxOverlaps(
                            `${magnificationX()} ${magnificationY()} ${actualWidth() / magnificationFactor()} ${actualHeight() / magnificationFactor()}`,
                            `${neighborXY.x} ${neighborXY.y} ${neighborBbox.width} ${neighborBbox.height}`,
                            0.2
                          );

                        // Determine the color of the arrow (orange if related, purple if not)

                        const arrowColor = () => {
                          if (isConnector()) return "blue";
                          if (
                            relatedNodes().includes(
                              scopeMap.getKey(neighborNodeId) ?? ""
                            )
                          )
                            return "orangered";
                          return "purple";
                        };

                        const targetPoint = {
                          x: neighborNodeMidpoint().cx,
                          y: neighborNodeMidpoint().cy,
                        };

                        return (
                          <Show when={showArrow()}>
                            <OffScreenArrow
                              straightenArrow
                              hideIcon={isConnector()}
                              targetPoint={targetPoint}
                              arrowheadColor={arrowColor()}
                              nodeId={neighborNodeId}
                              onClick={() => {
                                setMagnificationCenterX(
                                  neighborNodeMidpoint().cx
                                );
                                setMagnificationCenterY(
                                  neighborNodeMidpoint().cy
                                );
                                if (!mouseActive()) {
                                  setMouseX(neighborNodeMidpoint().cx);
                                  setMouseY(neighborNodeMidpoint().cy);
                                }
                              }}
                            />
                          </Show>
                        );
                      }}
                    </For>
                  </Show>
                </>
              )}
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
                      stroke="orangered"
                      strokeWidth={2}
                    />
                  ))}
            {/* Auto-Map Indicators */}
            {isAutoMapContext(mantisContext) &&
              (isAMTraversalType(props.mantisComponentType) ? (
                !isPointInViewBox(
                  mantisContext.selNodeCenter(),
                  magnificationViewBox()
                ) &&
                isZoomed() &&
                mantisContext.isAutoZoomed() && (
                  <OffScreenArrow
                    targetPoint={mantisContext.selNodeCenter()}
                    arrowheadColor="blue"
                    onClick={() => {
                      setMagnificationCenterX(mantisContext.selNodeCenter().x);
                      setMagnificationCenterY(mantisContext.selNodeCenter().y);
                      if (!mouseActive()) {
                        setMouseX(mantisContext.selNodeCenter().x);
                        setMouseY(mantisContext.selNodeCenter().y);
                      }
                    }}
                  />
                )
              ) : (
                <>
                  {mantisContext.isAutoZoomed() ? (
                    !isPointInViewBox(
                      getViewBoxCenter(mantisContext.mainViewBox()),
                      magnificationViewBox()
                    ) && (
                      <OffScreenArrow
                        targetPoint={getViewBoxCenter(
                          mantisContext.mainViewBox()
                        )}
                        arrowheadColor="orangered"
                      />
                    )
                  ) : (
                    <For each={mantisContext.allViewBoxes()}>
                      {(autoViewBox) => {
                        return (
                          <ViewBoxRect
                            viewBox={autoViewBox}
                            stroke="blue"
                            strokeWidth={2}
                          />
                        );
                      }}
                    </For>
                  )}
                </>
              ))}
            {/* Cursor Position */}
            {!isAMAutoType(props.mantisComponentType) &&
              props.mantisComponentType !== MantisComponentType.DLLens && (
                <circle
                  cx={mouseX()}
                  cy={mouseY()}
                  r={3}
                  fill={getCursorColor()}
                />
              )}
            {/* Crosshair fixed in the center of the screen */}
            {isDLMainType(props.mantisComponentType) && (
              <>
                <line
                  x1={gsapCenterX() - Math.min(gsapWidth(), gsapHeight()) / 15}
                  y1={gsapCenterY()}
                  x2={gsapCenterX() + Math.min(gsapWidth(), gsapHeight()) / 15}
                  y2={gsapCenterY()}
                  stroke="black"
                  stroke-width={5 / gsapMagnificationFactor()}
                />
                <line
                  x1={gsapCenterX()}
                  y1={gsapCenterY() - Math.min(gsapWidth(), gsapHeight()) / 15}
                  x2={gsapCenterX()}
                  y2={gsapCenterY() + Math.min(gsapWidth(), gsapHeight()) / 15}
                  stroke="black"
                  stroke-width={5 / gsapMagnificationFactor()}
                />
              </>
            )}
          </>
        )}
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
