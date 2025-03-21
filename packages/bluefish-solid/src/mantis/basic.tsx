import { ParentProps } from "solid-js";
import {
  MantisComponentType,
  MantisProvider,
  MantisTraversalPattern,
} from "./mantis";
import Bluefish, { MantisOverrides } from "../bluefish";

export const Basic = (
  props: ParentProps & {
    traversalPattern?: MantisTraversalPattern;
    showVoronoi?: boolean;
    showHighlighting?: boolean;
    parameterOverrides?: MantisOverrides;
  }
) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <MantisProvider providerType="B">
        <Bluefish
          mantisComponentType={MantisComponentType.Basic}
          mantisTraversalPattern={props.traversalPattern}
          {...props}
        >
          {props.children}
        </Bluefish>
      </MantisProvider>
    </div>
  );
};
