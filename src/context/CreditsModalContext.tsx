import React, { createContext, useContext, useEffect, useState } from "react";

export interface ICreditsModalContext {
    modalIsOpen: boolean;
    openAddCreditsModal: Function;
    closeAddCreditsModal: Function;
}

export const defaultState = {
    modalIsOpen: false,
    openAddCreditsModal: () => {},
    closeAddCreditsModal: () => {},
};

interface ChildrenProps {
    children: React.ReactNode;
}

// export const CreditsModalContext = createContext<ICreditsModalContext | null>(defaultState);
export const CreditsModalContext = createContext<ICreditsModalContext | null>(null);

export function useCreditsModalContext() {
    return useContext(CreditsModalContext);
}

const CreditsModalProvider: React.FC<ChildrenProps> = ({ children }) => {
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

    function openAddCreditsModal(): void {
        setModalIsOpen(true);
    }

    function closeAddCreditsModal(): void {
        setModalIsOpen(false);
    }

    return <CreditsModalContext.Provider value={{ modalIsOpen, openAddCreditsModal, closeAddCreditsModal }}>{children}</CreditsModalContext.Provider>;
};

export default CreditsModalProvider;
