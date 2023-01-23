import React from "react";

interface DropdownItemProps {
    text: string;
    onClickAction: Function;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ text, onClickAction }: DropdownItemProps) => {
    return (
        <div
            className="hover:bg-sky-100"
            onClick={() => {
                onClickAction();
            }}
        >
            <p className="text-left pl-1">{text}</p>
        </div>
    );
};

export default DropdownItem;
