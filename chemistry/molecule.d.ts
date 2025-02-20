export type MoleculeProps = {
    chemicalFormula: string;
    ariaLabel: string;
};
export declare const Molecule: (props: Omit<MoleculeProps, "name"> & {
    name?: import('..').Id;
}) => import("solid-js").JSX.Element;
//# sourceMappingURL=molecule.d.ts.map