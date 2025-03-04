import { ParentProps } from "solid-js";
import {
  MantisComponentType,
  MantisProvider,
  MantisTraversalPattern,
} from "./mantis";
import Bluefish from "../bluefish";
import "./splitScreen.css";

const SplitScreenDivider = (props: { flexDirection: "row" | "column" }) => {
  return (
    <div
      style={
        props.flexDirection === "column"
          ? { "border-bottom": ".2rem solid black", width: "100%" }
          : { "border-right": ".2rem solid black", height: "100%" }
      }
      class="mantis-ss-divider"
    />
  );
};

export const SplitScreen = (
  props: ParentProps & {
    traversalPattern?: MantisTraversalPattern;
    flexDirection: "row" | "column";
    showVoronoi?: boolean;
    showHighlighting?: boolean;
  }
) => {
  /**
   * Instead of left and right, assign IDs and use a hash map
   * viewBox = (key) => `{viewBox}`
   * indicatorColor = (key) => `{color}`
   */

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        "flex-direction": props.flexDirection,
      }}
      class="mantis-split-screen"
    >
      <MantisProvider providerType="SS">
        <Bluefish
          mantisComponentType={MantisComponentType.SSLeft}
          mantisTraversalPattern={props.traversalPattern}
          {...props}
        >
          {props.children}
        </Bluefish>
        <SplitScreenDivider flexDirection={props.flexDirection} />
        <Bluefish
          mantisComponentType={MantisComponentType.SSRight}
          mantisTraversalPattern={props.traversalPattern}
          {...props}
        >
          {props.children}
        </Bluefish>
      </MantisProvider>
    </div>
  );
};
