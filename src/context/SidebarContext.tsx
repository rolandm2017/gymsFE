import React, { createContext, useEffect } from "react";

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
    const [isOpen, setIsOpen] = React.useState<boolean>(getSidebarState());

    function getSidebarState(): boolean {
        const isPresent = window.localStorage.getItem("ANG_SIDEBAR_STATE");
        if (isPresent === null) {
            return false;
        }
        if (isPresent === "true") {
            return true;
        }
        if (isPresent === "false") {
            return false;
        }
        return false;
    }

    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            window.localStorage.setItem("ANG_SIDEBAR_STATE", isOpen.toString());
        });
    }, [isOpen]);

    return <SidebarStateContext.Provider value={{ isOpen: isOpen, toggleIsOpen: setIsOpen }}>{children}</SidebarStateContext.Provider>;
};

export default SidebarStateProvider;
