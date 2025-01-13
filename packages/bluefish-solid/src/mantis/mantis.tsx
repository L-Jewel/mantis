import {
  Accessor,
  Setter,
  ParentProps,
  createSignal,
  useContext,
  createContext,
  createEffect,
} from "solid-js";

export enum MantisComponentType {
  MMMain,
  MMMiniMap,
  SSLeft,
  SSRight,
}

export function isSplitScreenType(type: MantisComponentType) {
  return (
    type === MantisComponentType.SSLeft || type === MantisComponentType.SSRight
  );
}

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
    };

const MantisContext = createContext<MantisState>();

export const MantisProvider = (
  props: ParentProps & { providerType: "MM" | "SS" }
) => {
  let providerState: MantisState | undefined;
  createEffect(() => {
    if (props.providerType === "MM") {
      const [viewBBox, setViewBBox] = createSignal(`0 0 0 0`);
      const [isDragging, setIsDragging] = createSignal(false);
      providerState = {
        type: "MM",
        viewBBox,
        setViewBBox,
        isDragging,
        setIsDragging,
      };
    } else {
      const [leftViewBBox, setLeftViewBBox] = createSignal(`0 0 0 0`);
      const [rightViewBBox, setRightViewBBox] = createSignal(`0 0 0 0`);
      providerState = {
        type: "SS",
        leftViewBBox,
        setLeftViewBBox,
        rightViewBBox,
        setRightViewBBox,
      };
    }
  });

  return (
    <MantisContext.Provider value={providerState}>
      {props.children}
    </MantisContext.Provider>
  );
};

export function useMantisProvider() {
  return useContext(MantisContext);
}
