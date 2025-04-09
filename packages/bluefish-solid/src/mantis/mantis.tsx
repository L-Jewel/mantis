import {
  Accessor,
  Setter,
  ParentProps,
  createSignal,
  useContext,
  createContext,
} from "solid-js";

export enum MantisComponentType {
  MMMain,
  MMMiniMap,
  SSLeft,
  SSRight,
  AMPlanetsTraversal,
  AMPlanetsAuto,
  AMPulleyTraversal,
  AMPulleyAuto,
  AMPyTutorTraversal,
  AMPyTutorAuto,
  AMNetworkMapTraversal,
  AMNetworkMapAuto,
  LMain,
  LLens,
  Basic,
  PreviewPlanets,
  PreviewPythonTutor,
  PreviewPulley,
  PreviewNetworkMap,
  DLMain,
  DLPlanets,
  DLPythonTutor,
  DLPulley,
  DLNetworkMap,
  DLLens,
}
export enum MantisTraversalPattern {
  Bubble,
  Cursor,
  Joystick,
}

/**
 * @returns true if the component of type `type` is a part of the Split Screen
 * functionality.
 */
export function isSplitScreenType(type: MantisComponentType | undefined) {
  return (
    type === MantisComponentType.SSLeft || type === MantisComponentType.SSRight
  );
}
/**
 * @returns true if the component of type `type` is a part of the Auto Map
 * functionality and an automatically controlled (so non-traversal) screen.
 */
export function isAMAutoType(type: MantisComponentType | undefined) {
  return (
    type === MantisComponentType.AMPlanetsAuto ||
    type === MantisComponentType.AMPyTutorAuto ||
    type === MantisComponentType.AMPulleyAuto ||
    type === MantisComponentType.AMNetworkMapAuto
  );
}
/**
 * @returns true if the component of type `type` is a part of the Auto Map
 * functionality and a traversal screen.
 */
export function isAMTraversalType(type: MantisComponentType | undefined) {
  return (
    type === MantisComponentType.AMPlanetsTraversal ||
    type === MantisComponentType.AMPyTutorTraversal ||
    type === MantisComponentType.AMPulleyTraversal ||
    type === MantisComponentType.AMNetworkMapTraversal
  );
}
export function isDLMainType(type: MantisComponentType | undefined) {
  return (
    type === MantisComponentType.DLMain ||
    type === MantisComponentType.DLNetworkMap ||
    type === MantisComponentType.DLPulley ||
    type === MantisComponentType.DLPythonTutor ||
    type === MantisComponentType.DLPlanets
  );
}
/**
 * @returns true if the component of type `type` is a part of the Preview
 * functionality.
 */
export function isPreviewType(type: MantisComponentType | undefined) {
  return (
    type === MantisComponentType.PreviewPlanets ||
    type === MantisComponentType.PreviewPythonTutor ||
    type === MantisComponentType.PreviewPulley ||
    type === MantisComponentType.PreviewNetworkMap
  );
}
/**
 * Differentiate between components that users can use to traverse the diagram, and
 * components with other purposes (e.g. the mini-map).
 * @returns true if the component of type `type` is a component that users can use
 * to traverse the diagram.
 */
export function isTraversalType(type: MantisComponentType | undefined) {
  return (
    type === MantisComponentType.MMMain ||
    type === MantisComponentType.Basic ||
    isAMTraversalType(type) ||
    isSplitScreenType(type) ||
    isPreviewType(type)
  );
}
export function isDraggableType(type: MantisComponentType | undefined) {
  return (
    type === MantisComponentType.MMMiniMap || type === MantisComponentType.LLens
  );
}

export function isMiniMapContext(context: MantisState | undefined) {
  return context?.type === "MM";
}
export function isSplitScreenContext(context: MantisState | undefined) {
  return context?.type === "SS";
}
export function isMultiLensContext(context: MantisState | undefined) {
  return context?.type === "L";
}
export function isAutoMapContext(context: MantisState | undefined) {
  return context?.type === "AM";
}
export function isDockedLensContext(context: MantisState | undefined) {
  return context?.type === "DL";
}

export type LLensInfo = { x: number; y: number; magnification: number };
export type MantisState =
  | {
      type: "MM";
      viewBBox: Accessor<string>;
      setViewBBox: Setter<string>;
      isDragging: Accessor<boolean>;
      setIsDragging: Setter<boolean>;
    }
  | {
      type: "SS";
      leftViewBBox: Accessor<string>;
      setLeftViewBBox: Setter<string>;
      rightViewBBox: Accessor<string>;
      setRightViewBBox: Setter<string>;
    }
  | {
      type: "L";
      lensInfo: Accessor<LLensInfo[]>;
      updateLensInfo: Setter<LLensInfo[]>;
    }
  | { type: "P" }
  | { type: "B" }
  | {
      type: "AM";
      selNodeCenter: Accessor<{ x: number; y: number }>;
      setSelNodeCenter: Setter<{ x: number; y: number }>;
      zoomLevel: Accessor<number>;
      setZoomLevel: Setter<number>;
      mainViewBox: Accessor<string>;
      setMainViewBox: Setter<string>;
      isAutoZoomed: Accessor<boolean>;
      setIsAutoZoomed: Setter<boolean>;
      allViewBoxes: Accessor<string[]>;
      setAllViewBoxes: Setter<string[]>;
    }
  | {
      type: "DL";
      mouseCenter: Accessor<{ x: number; y: number }>;
      setMouseCenter: Setter<{ x: number; y: number }>;
      dockedLensZoom: Accessor<number>;
      setDockedLensZoom: Setter<number>;
    };

const MantisContext = createContext<MantisState>();

export const MantisProvider = (
  props: ParentProps & {
    providerType: "MM" | "SS" | "L" | "P" | "B" | "AM" | "DL";
  }
) => {
  let providerState: MantisState | undefined;

  if (props.providerType === "MM") {
    // MINI-MAP
    const [viewBBox, setViewBBox] = createSignal(`0 0 0 0`);
    const [isDragging, setIsDragging] = createSignal(false);
    providerState = {
      type: "MM",
      viewBBox,
      setViewBBox,
      isDragging,
      setIsDragging,
    };
  } else if (props.providerType === "SS") {
    // SPLIT-SCREEN
    const [leftViewBBox, setLeftViewBBox] = createSignal(`0 0 0 0`);
    const [rightViewBBox, setRightViewBBox] = createSignal(`0 0 0 0`);
    providerState = {
      type: "SS",
      leftViewBBox,
      setLeftViewBBox,
      rightViewBBox,
      setRightViewBBox,
    };
  } else if (props.providerType === "L") {
    // MULTI-LENS
    const [lensInfo, updateLensInfo] = createSignal<LLensInfo[]>([]);
    providerState = {
      type: "L",
      lensInfo,
      updateLensInfo,
    };
  } else if (props.providerType === "P") {
    // PREVIEW
    providerState = { type: "P" };
  } else if (props.providerType === "B") {
    // BASIC
    providerState = { type: "B" };
  } else if (props.providerType === "AM") {
    // AUTO-MAP
    const [selNodeCenter, setSelNodeCenter] = createSignal({ x: 0, y: 0 });
    const [zoomLevel, setZoomLevel] = createSignal(1);
    const [mainViewBox, setMainViewBox] = createSignal(`0 0 0 0`);
    const [isAutoZoomed, setIsAutoZoomed] = createSignal(true);
    const [allViewBoxes, setAllViewBoxes] = createSignal<string[]>([]);
    providerState = {
      type: "AM",
      selNodeCenter,
      setSelNodeCenter,
      zoomLevel,
      setZoomLevel,
      mainViewBox,
      setMainViewBox,
      isAutoZoomed,
      setIsAutoZoomed,
      allViewBoxes,
      setAllViewBoxes,
    };
  } else if (props.providerType === "DL") {
    // DOCKED LENS
    const [mouseCenter, setMouseCenter] = createSignal({ x: 0, y: 0 });
    const [dockedLensZoom, setDockedLensZoom] = createSignal(2);

    providerState = {
      type: "DL",
      mouseCenter,
      setMouseCenter,
      dockedLensZoom,
      setDockedLensZoom,
    };
  }

  return (
    <MantisContext.Provider value={providerState}>
      {props.children}
    </MantisContext.Provider>
  );
};

export function useMantisProvider() {
  return useContext(MantisContext);
}
