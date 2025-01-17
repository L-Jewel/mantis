import { ParentProps } from "solid-js";
import Bluefish from "../bluefish";
import {
  MantisProvider,
  MantisComponentType,
  MantisTraversalPattern,
} from "./mantis";

export const MiniMap = (
  props: ParentProps & {
    traversalPattern?: MantisTraversalPattern;
  }
) => {
  /**
   * check how mini-map scales stuff wheee
   */
  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <MantisProvider providerType="MM">
        <Bluefish
          mantisComponentType={MantisComponentType.MMMain}
          mantisTraversalPattern={props.traversalPattern}
        >
          {props.children}
        </Bluefish>
        <Bluefish mantisComponentType={MantisComponentType.MMMiniMap}>
          {props.children}
        </Bluefish>
      </MantisProvider>
    </div>
  );
};
