import {
  Accessor,
  Setter,
  ParentProps,
  createSignal,
  useContext,
  createContext,
} from "solid-js";
import Bluefish from "./bluefish";

// MANTIS PROTOTYPES
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

const MantisProvider = (props: ParentProps) => {
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

const MiniMap = (props: ParentProps & { enlargementFactor?: number }) => {
  return (
    <MantisProvider>
      <Bluefish
        mantisComponentType={MantisComponentType.MMMain}
        enlargementFactor={props.enlargementFactor ?? 1}
      >
        {props.children}
      </Bluefish>
      <Bluefish
        mantisComponentType={MantisComponentType.MMMiniMap}
        enlargementFactor={(props.enlargementFactor ?? 1) / 2}
      >
        {props.children}
      </Bluefish>
    </MantisProvider>
  );
};

export default MiniMap;
