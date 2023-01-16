import React, { ReactNode } from "react";

interface DropdownContainerProps {
    children: ReactNode;
}

const DropdownContainer: React.FC<DropdownContainerProps> = ({ children }: DropdownContainerProps) => {
    return <div>{children}</div>;
};

export default DropdownContainer;
