import { ParentProps } from "solid-js";
import Bluefish from "../bluefish";
import { MantisProvider, MantisComponentType } from "./mantis";

export const MiniMap = (
  props: ParentProps & { enlargementFactor?: number }
) => {
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
