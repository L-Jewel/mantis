import { createEffect, Index, ParentProps } from "solid-js";
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
    showVoronoi?: boolean;
    showHighlighting?: boolean;
  }
) => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <MantisProvider providerType="L">
        <Bluefish
          mantisComponentType={MantisComponentType.LMain}
          mantisTraversalPattern={props.traversalPattern}
          {...props}
        >
          {props.children}
        </Bluefish>
        <LensArray>{props.children}</LensArray>
      </MantisProvider>
    </div>
  );
};
