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
}
export type MantisState = {
  viewBBox: Accessor<string>;
  setViewBBox: Setter<string>;
  isDragging: Accessor<boolean>;
  setIsDragging: Setter<boolean>;
};

const MantisContext = createContext<MantisState>();

export const MantisProvider = (props: ParentProps) => {
  const [viewBBox, setViewBBox] = createSignal(`0 0 0 0`);
  const [isDragging, setIsDragging] = createSignal(false);
  const providerState = {
    viewBBox,
    setViewBBox,
    isDragging,
    setIsDragging,
  };
  return (
    <MantisContext.Provider value={providerState}>
      {props.children}
    </MantisContext.Provider>
  );
};

export function useMantisProvider() {
  return useContext(MantisContext);
}
