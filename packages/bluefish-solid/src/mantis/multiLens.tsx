import { For, Index, ParentProps } from "solid-js";
import {
  isMultiLensContext,
  MantisComponentType,
  MantisProvider,
  MantisTraversalPattern,
  useMantisProvider,
} from "./mantis";
import Bluefish from "../bluefish";

const LensArray = (props: ParentProps) => {
  const mantisContext = useMantisProvider();
  const lensInfo = () =>
    isMultiLensContext(mantisContext) ? mantisContext.lensInfo() : [];

  return (
    <Index each={lensInfo()}>
      {(_, index) => {
        return (
          <Bluefish
            mantisComponentType={MantisComponentType.LLens}
            mantisId={index}
          >
            {props.children}
          </Bluefish>
        );
      }}
    </Index>
  );
};

export const MultiLens = (
  props: ParentProps & {
    traversalPattern?: MantisTraversalPattern;
  }
) => {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <MantisProvider providerType="L">
        <Bluefish
          mantisComponentType={MantisComponentType.LMain}
          mantisTraversalPattern={props.traversalPattern}
        >
          {props.children}
        </Bluefish>
        <LensArray>{props.children}</LensArray>
      </MantisProvider>
    </div>
  );
};
