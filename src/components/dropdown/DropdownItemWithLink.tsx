import React from "react";
import { Link } from "react-router-dom";

interface DropdownItemProps {
    text: string;
    location: string;
}

const DropdownItemWithLink: React.FC<DropdownItemProps> = ({ text, location }: DropdownItemProps) => {
    return (
        <Link to={location}>
            <div>
                <p>{text}</p>
            </div>
        </Link>
    );
};

export default DropdownItemWithLink;
