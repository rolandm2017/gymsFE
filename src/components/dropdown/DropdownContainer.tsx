import React, { ReactNode, useRef, useEffect } from "react";

interface DropdownContainerProps {
    isOpen: boolean;
    topDisplacement: number | undefined;
    leftDisplacement: number | undefined;
    width: number;
    children: ReactNode;
}

const DropdownContainer: React.FC<DropdownContainerProps> = ({
    isOpen,
    topDisplacement,
    leftDisplacement,
    width,
    children,
}: DropdownContainerProps) => {
    return (
        <div
            className={`${isOpen ? "" : "hidden"} p-2 absolute bg-white border-2 rounded-lg`}
            style={{ top: topDisplacement, left: leftDisplacement, width }}
        >
            {children}
        </div>
    );
};

export default DropdownContainer;
