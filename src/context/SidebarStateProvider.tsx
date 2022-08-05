import React, { createContext } from "react";

export interface ISidebarContext {
    isOpen: boolean;
    toggleIsOpen: Function;
}

export const defaultState = {
    isOpen: false,
};

interface ChildrenProps {
    children: React.ReactNode;
}

export const SidebarStateContext = createContext<ISidebarContext | null>(null);

const SidebarStateProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return <SidebarStateContext.Provider value={{ isOpen: isOpen, toggleIsOpen: setIsOpen }}>{children}</SidebarStateContext.Provider>;
};

export default SidebarStateProvider;
