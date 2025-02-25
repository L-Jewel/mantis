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
    showVoronoi?: boolean;
    showHighlighting?: boolean;
  }
) => {
  /**
   * check how mini-map scales stuff wheee
   */
  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <MantisProvider providerType="MM">
        <Bluefish
          mantisComponentType={MantisComponentType.MMMain}
          mantisTraversalPattern={props.traversalPattern}
          {...props}
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
