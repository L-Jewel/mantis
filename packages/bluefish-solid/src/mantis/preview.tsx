import { ParentProps } from "solid-js";
import Bluefish, { MantisOverrides } from "../bluefish";
import {
  MantisComponentType,
  MantisProvider,
  MantisTraversalPattern,
} from "./mantis";

export const Preview = (
  props: ParentProps & {
    traversalPattern?: MantisTraversalPattern;
    diagram: "Planets" | "Python-Tutor" | "Pulley";
    showVoronoi?: boolean;
    showHighlighting?: boolean;
    parameterOverrides?: MantisOverrides;
  }
) => {
  const previewComponentType = () => {
    switch (props.diagram) {
      case "Planets":
        return MantisComponentType.PreviewPlanets;
      case "Python-Tutor":
        return MantisComponentType.PreviewPythonTutor;
      case "Pulley":
        return MantisComponentType.PreviewPulley;
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MantisProvider providerType="P">
        <Bluefish
          mantisComponentType={previewComponentType()}
          mantisTraversalPattern={props.traversalPattern}
          {...props}
        >
          {props.children}
        </Bluefish>
      </MantisProvider>
    </div>
  );
};
