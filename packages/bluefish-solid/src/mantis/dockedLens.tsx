import { ParentProps } from "solid-js";
import {
  MantisComponentType,
  MantisDiagram,
  MantisProvider,
  MantisTraversalPattern,
} from "./mantis";
import Bluefish, { MantisOverrides } from "../bluefish";

// Adds some CSS that fixes the split screen issue.
// TODO: The space ratio along the main axis is hardcoded to 1:2. Allow the user to change.
const styles = `
.mantis-docked-lens > div:not(.mantis-dl-divider) {
  max-width: 0;
  height: 0;
}
.mantis-docked-lens > svg:first-of-type {
  flex: 1;
}
.mantis-docked-lens > svg:last-of-type {
  flex: 2;
}
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const DockedLensDivider = (props: { flexDirection: "row" | "column" }) => {
  return (
    <div
      style={
        props.flexDirection === "column"
          ? { "border-bottom": ".2rem solid black", width: "100%" }
          : { "border-right": ".2rem solid black", height: "100%" }
      }
      class="mantis-dl-divider"
    />
  );
};

export const DockedLens = (
  props: ParentProps & {
    diagram?: MantisDiagram;
    traversalPattern?: MantisTraversalPattern;
    showVoronoi?: boolean;
    showHighlighting?: boolean;
    parameterOverrides?: MantisOverrides;
  }
) => {
  const mainType = () => {
    switch (props.diagram) {
      case "Python-Tutor":
        return MantisComponentType.DLPythonTutor;
      case "Pulley":
        return MantisComponentType.DLPulley;
      case "Network-Map":
        return MantisComponentType.DLNetworkMap;
      case "Planets":
        return MantisComponentType.DLPlanets;
      case "Circuit":
        return MantisComponentType.DLCircuit;
      default:
        return MantisComponentType.DLMain;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        "flex-direction": "column",
      }}
      class="mantis-docked-lens"
    >
      <MantisProvider providerType="DL">
        <Bluefish
          mantisComponentType={MantisComponentType.DLLens}
          mantisTraversalPattern={props.traversalPattern}
          {...props}
        >
          {props.children}
        </Bluefish>
        <DockedLensDivider flexDirection="column" />
        <Bluefish
          mantisComponentType={mainType()}
          mantisTraversalPattern={props.traversalPattern}
          {...props}
        >
          {props.children}
        </Bluefish>
      </MantisProvider>
    </div>
  );
};
