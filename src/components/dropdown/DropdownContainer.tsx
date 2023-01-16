import React, { ReactNode, useRef, useEffect } from "react";

import "./Dropdown.scss";

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
        <div className="fullScreenRegardless absolute">
            <div className="w-full h-full absolute z-30 bg-black"></div>
            <div
                className={`${isOpen ? "" : "hidden"} p-2 absolute bg-white border-2 rounded-lg z-40`}
                style={{ top: topDisplacement, left: leftDisplacement, width }}
            >
                {children}
            </div>
        </div>
    );
};

export default DropdownContainer;
