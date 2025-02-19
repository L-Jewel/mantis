import {
  Component,
  JSX,
  For as ForJSX,
  Accessor,
  Index as IndexJSX,
  Show as ShowJSX,
  Switch as SwitchJSX,
  Match as MatchJSX,
} from "solid-js";
import h from "solid-js/h";

import {
  Align as AlignJSX,
  Arrow as ArrowJSX,
  Background as BackgroundJSX,
  Blob as BlobJSX,
  Bluefish as BluefishJSX,
  Circle as CircleJSX,
  StackV as StackVJSX,
  Distribute as DistributeJSX,
  Group as GroupJSX,
  Image as ImageJSX,
  Layout as LayoutJSX,
  LayoutFunction as LayoutFunctionJSX,
  Line as LineJSX,
  Rect as RectJSX,
  Ref as RefJSX,
  StackH as StackHJSX,
  Text as TextJSX,
  Path as PathJSX,
  withBluefish as withBluefishJSX,
  ArrowProps,
  BackgroundProps,
  WithBluefishProps,
  Id,
} from "bluefish-solid";

export type ExpandableNode = Node & {
  [key: string]: any;
};
export type HyperScriptReturn = () => ExpandableNode | ExpandableNode[];

export type Child = JSX.Element | HyperScriptReturn;

/* control flow components */
export function For<T extends readonly any[], U extends Child>(
  props: {
    each: T | undefined | null | false;
    fallback?: Child;
  },
  children: (item: T[number], index: Accessor<number>) => U
): HyperScriptReturn {
  return h(ForJSX, props, children);
}

export function Index<T extends readonly any[], U extends Child>(
  props: {
    each: T | undefined | null | false;
    fallback?: Child;
  },
  children: (item: Accessor<T[number]>, index: number) => U
): HyperScriptReturn {
  return h(IndexJSX, props, children);
}

type RequiredParameter<T> = T extends () => unknown ? never : T;
export function Show<T, TRenderFunction extends (item: Accessor<NonNullable<T>>) => Child>(
  props: {
    when: T | undefined | null | false;
    keyed?: false;
    fallback?: Child;
  },
  children: Child | RequiredParameter<TRenderFunction>
): HyperScriptReturn;
export function Show<T, TRenderFunction extends (item: NonNullable<T>) => Child>(
  props: {
    when: T | undefined | null | false;
    keyed: true;
    fallback?: Child;
  },
  children: Child | RequiredParameter<TRenderFunction>
): HyperScriptReturn;
export function Show<T, TRenderFunction extends (item: NonNullable<T> | Accessor<NonNullable<T>>) => Child>(
  props: {
    when: T | undefined | null | false;
    keyed?: boolean;
    fallback?: Child;
  },
  children: Child | RequiredParameter<TRenderFunction>
): HyperScriptReturn {
  return h(ShowJSX, props, children);
}

export function Switch(props: { fallback?: Child }, children: Child): HyperScriptReturn {
  return h(SwitchJSX, props, children);
}

export function Match<T, TRenderFunction extends (item: Accessor<NonNullable<T>>) => Child>(
  props: {
    when: T | undefined | null | false;
    keyed?: false;
  },
  children: Child | RequiredParameter<TRenderFunction>
): HyperScriptReturn;
export function Match<T, TRenderFunction extends (item: NonNullable<T>) => Child>(
  props: {
    when: T | undefined | null | false;
    keyed: true;
  },
  children: Child | RequiredParameter<TRenderFunction>
): HyperScriptReturn;
export function Match<T, TRenderFunction extends (item: NonNullable<T> | Accessor<NonNullable<T>>) => Child>(
  props: {
    when: T | undefined | null | false;
    keyed?: boolean;
  },
  children: Child | RequiredParameter<TRenderFunction>
): HyperScriptReturn {
  return h(MatchJSX, props, children);
}

/* bluefish components */
export type HyperScriptComponent<P> = {
  (props: P, children: Child | Child[]): HyperScriptReturn;
  // (props: P, ...children: Child[]): HyperScriptReturn;
  (children: Child | Child[]): HyperScriptReturn;
  // (...children: Child[]): HyperScriptReturn;
  // (children: Child[]): HyperScriptReturn;
};

export type HyperScriptComponentOneChild<P> = {
  (props: P, children: Child): HyperScriptReturn;
  (children: Child): HyperScriptReturn;
};

export type HyperScriptComponentNoChildren<P> = {
  (props?: P): HyperScriptReturn;
};

export function component<P>(fn: Component<P>): HyperScriptComponent<P> {
  return (...args: any[]) => {
    return h(fn, ...args);
  };
}

export function componentOneChild<P>(fn: Component<P>): HyperScriptComponentOneChild<P> {
  return (...args: any[]) => {
    return h(fn, ...args);
  };
}

export function componentNoChildren<P>(fn: Component<P>): HyperScriptComponentNoChildren<P> {
  return (...args: any[]) => {
    return h(fn, ...args);
  };
}

export function withBluefish(WrappedComponent: Component) {
  return component(withBluefishJSX(WrappedComponent));
}

export const Bluefish = component(BluefishJSX);

// NB: I'm not sure if I want to combine Bluefish into the render function. It's more convenient for
// the typical case, so I'll do it for now.

import { render as solidRender, MountableElement } from "solid-js/web";

export const render = (code: () => Child | Child[], element: MountableElement) => {
  return solidRender(() => Bluefish({}, code() as Child[]) as unknown as JSX.Element, element);
};

export { createName } from "bluefish-solid";

export const Align = component(AlignJSX);
// NB: type annotation required b/c of transitive perfect-arrows dependency
export const Arrow = component<Omit<ArrowProps, "name"> & { name?: Id }>(ArrowJSX);

type HyperScriptBackgroundProps = WithBluefishProps<
  Omit<BackgroundProps, "background" | "name"> & {
    background?: () => HyperScriptReturn;
    name?: Id;
  }
>;

export const Background = component(BackgroundJSX) as unknown as HyperScriptComponent<HyperScriptBackgroundProps>;
export const Blob = component(BlobJSX);
export const Circle = componentNoChildren(CircleJSX);
export const StackV = component(StackVJSX);
export const Distribute = component(DistributeJSX);
export const Group = component(GroupJSX);
export const Image = componentNoChildren(ImageJSX);
export const Layout = component(LayoutJSX);
export const LayoutFunction = component(LayoutFunctionJSX);
export const Line = component(LineJSX);
export const Rect = componentNoChildren(RectJSX);
export const Ref = componentNoChildren(RefJSX);
export const StackH = component(StackHJSX);
export const Text = component(TextJSX);
export const Path = componentNoChildren(PathJSX);
