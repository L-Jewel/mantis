import { ParentProps } from "solid-js";
import Bluefish from "../bluefish";
import {
  MantisComponentType,
  MantisProvider,
  MantisTraversalPattern,
} from "./mantis";

export const Preview = (
  props: ParentProps & {
    traversalPattern?: MantisTraversalPattern;
    diagram: "Planets" | "Python-Tutor";
    showVoronoi?: boolean;
    showHighlighting?: boolean;
  }
) => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MantisProvider providerType="P">
        <Bluefish
          mantisComponentType={
            props.diagram === "Planets"
              ? MantisComponentType.PreviewPlanets
              : MantisComponentType.PreviewPythonTutor
          }
          mantisTraversalPattern={props.traversalPattern}
          {...props}
        >
          {props.children}
        </Bluefish>
      </MantisProvider>
    </div>
  );
};
