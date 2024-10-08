import React, { ReactNode, useRef, useEffect } from "react";

import "./Dropdown.scss";

interface DropdownContainerProps {
    isOpen: boolean;
    topDisplacement: number | undefined;
    leftDisplacement: number | undefined;
    width: number;
    closeDropdown: Function;
    children: ReactNode;
}

const DropdownContainer: React.FC<DropdownContainerProps> = ({
    isOpen,
    topDisplacement,
    leftDisplacement,
    width,
    closeDropdown,
    children,
}: DropdownContainerProps) => {
    return (
        <div className={`absolute ${isOpen ? "fullScreenRegardless" : ""} `}>
            <div
                className="w-full h-full absolute z-30 bg-transparent"
                onClick={() => {
                    closeDropdown();
                }}
            >
                {/* // dropdown click target */}
            </div>
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
