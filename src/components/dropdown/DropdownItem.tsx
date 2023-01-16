import React from "react";

interface DropdownItemProps {
    text: string;
    onClickAction: Function;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ text, onClickAction }: DropdownItemProps) => {
    return (
        <div
            onClick={() => {
                onClickAction();
            }}
        >
            <p>{text}</p>
        </div>
    );
};

export default DropdownItem;
