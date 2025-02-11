import { ParentProps } from "solid-js";
import Bluefish from "../bluefish";
import {
  MantisComponentType,
  MantisProvider,
  MantisTraversalPattern,
} from "./mantis";

export const Preview = (
  props: ParentProps & { traversalPattern?: MantisTraversalPattern }
) => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <MantisProvider providerType="P">
        <Bluefish
          mantisComponentType={MantisComponentType.Preview}
          mantisTraversalPattern={props.traversalPattern}
          debug={true}
        >
          {props.children}
        </Bluefish>
      </MantisProvider>
    </div>
  );
};
