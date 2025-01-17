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
  LMain,
  LLens,
}

export enum MantisTraversalPattern {
  Bubble,
  Cursor,
}

/**
 * @returns true if the component of type `type` is a part of the Split Screen
 * functionality.
 */
export function isSplitScreenType(type: MantisComponentType) {
  return (
    type === MantisComponentType.SSLeft || type === MantisComponentType.SSRight
  );
}

/**
 * Differentiate between components that users can use to traverse the diagram, and
 * components with other purposes (e.g. the mini-map).
 * @returns true if the component of type `type` is a component that users can use
 * to traverse the diagram.
 */
export function isTraversalType(type: MantisComponentType) {
  return type === MantisComponentType.MMMain || isSplitScreenType(type);
}

export function isMiniMapContext(context: MantisState | undefined) {
  return context?.type === "MM";
}

export function isSplitScreenContext(context: MantisState | undefined) {
  return context?.type === "SS";
}

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
  | { type: "L" };

const MantisContext = createContext<MantisState>();

export const MantisProvider = (
  props: ParentProps & { providerType: "MM" | "SS" | "L" }
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
    providerState = {
      type: "L",
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
