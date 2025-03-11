import { Index, ParentProps } from "solid-js";
import {
  isMultiLensContext,
  MantisComponentType,
  MantisProvider,
  MantisTraversalPattern,
  useMantisProvider,
} from "./mantis";
import Bluefish, { MantisOverrides } from "../bluefish";

const LensArray = (
  props: ParentProps & { traversalPattern?: MantisTraversalPattern }
) => {
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
            mantisTraversalPattern={props.traversalPattern}
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
    parameterOverrides?: MantisOverrides;
  }
) => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <MantisProvider providerType="L">
        <Bluefish
          mantisComponentType={MantisComponentType.LMain}
          mantisTraversalPattern={props.traversalPattern}
        >
          {props.children}
        </Bluefish>
        <LensArray {...props}>{props.children}</LensArray>
      </MantisProvider>
    </div>
  );
};
