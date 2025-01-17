import { ParentProps } from "solid-js";
import {
  MantisComponentType,
  MantisProvider,
  MantisTraversalPattern,
} from "./mantis";
import Bluefish from "../bluefish";

export const SplitScreen = (
  props: ParentProps & {
    traversalPattern?: MantisTraversalPattern;
    flexDirection: "row" | "column";
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
        width: "100vw",
        height: "100vh",
        "flex-direction": props.flexDirection,
      }}
    >
      <MantisProvider providerType="SS">
        <Bluefish
          mantisComponentType={MantisComponentType.SSLeft}
          mantisTraversalPattern={props.traversalPattern}
        >
          {props.children}
        </Bluefish>
        <Bluefish
          mantisComponentType={MantisComponentType.SSRight}
          mantisTraversalPattern={props.traversalPattern}
        >
          {props.children}
        </Bluefish>
      </MantisProvider>
    </div>
  );
};
