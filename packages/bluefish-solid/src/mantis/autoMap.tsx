import { ParentProps } from "solid-js";
import {
  MantisComponentType,
  MantisDiagram,
  MantisProvider,
  MantisTraversalPattern,
} from "./mantis";
import Bluefish, { MantisOverrides } from "../bluefish";

// Adds some CSS that fixes the split screen issue.
const styles = `
.mantis-auto-map > div:not(.mantis-am-divider) {
    max-width: 0;
    height: 0;
}
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const AutoMapDivider = (props: { flexDirection: "row" | "column" }) => {
  return (
    <div
      style={
        props.flexDirection === "column"
          ? { "border-bottom": ".2rem solid black", width: "100%" }
          : { "border-right": ".2rem solid black", height: "100%" }
      }
      class="mantis-am-divider"
    />
  );
};

export const AutoMap = (
  props: ParentProps & {
    traversalPattern?: MantisTraversalPattern;
    flexDirection: "row" | "column";
    diagram: MantisDiagram;
    showVoronoi?: boolean;
    showHighlighting?: boolean;
    parameterOverrides?: MantisOverrides;
  }
) => {
  /**
   * Instead of left and right, assign IDs and use a hash map
   * viewBox = (key) => `{viewBox}`
   * indicatorColor = (key) => `{color}`
   */

  const traversalType = () => {
    switch (props.diagram) {
      case "Planets":
        return MantisComponentType.AMPlanetsTraversal;
      case "Python-Tutor":
        return MantisComponentType.AMPyTutorTraversal;
      case "Pulley":
        return MantisComponentType.AMPulleyTraversal;
      case "Network-Map":
        return MantisComponentType.AMNetworkMapTraversal;
      case "Circuit":
        return MantisComponentType.AMCircuitTraversal;
    }
  };
  const autoType = () => {
    switch (props.diagram) {
      case "Planets":
        return MantisComponentType.AMPlanetsAuto;
      case "Python-Tutor":
        return MantisComponentType.AMPyTutorAuto;
      case "Pulley":
        return MantisComponentType.AMPulleyAuto;
      case "Network-Map":
        return MantisComponentType.AMNetworkMapAuto;
      case "Circuit":
        return MantisComponentType.AMCircuitAuto;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        "flex-direction": props.flexDirection,
      }}
      class="mantis-auto-map"
    >
      <MantisProvider providerType="AM">
        <Bluefish
          mantisComponentType={traversalType()}
          mantisTraversalPattern={props.traversalPattern}
          {...props}
        >
          {props.children}
        </Bluefish>
        <AutoMapDivider flexDirection={props.flexDirection} />
        <Bluefish
          mantisComponentType={autoType()}
          mantisTraversalPattern={props.traversalPattern}
          {...props}
        >
          {props.children}
        </Bluefish>
      </MantisProvider>
    </div>
  );
};
