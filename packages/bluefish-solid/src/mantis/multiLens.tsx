import { ParentProps } from "solid-js";
import {
  MantisComponentType,
  MantisProvider,
  MantisTraversalPattern,
} from "./mantis";
import Bluefish from "../bluefish";

export const MultiLens = (
  props: ParentProps & {
    traversalPattern?: MantisTraversalPattern;
  }
) => {
  return (
    <MantisProvider providerType="L">
      <Bluefish
        mantisComponentType={MantisComponentType.LMain}
        mantisTraversalPattern={props.traversalPattern}
      >
        {props.children}
      </Bluefish>
      <Bluefish mantisComponentType={MantisComponentType.LLens}>
        {props.children}
      </Bluefish>
    </MantisProvider>
  );
};
