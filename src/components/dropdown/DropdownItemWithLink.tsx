import React from "react";
import { Link } from "react-router-dom";

interface DropdownItemWithLinkProps {
    text: string;
    location: string;
}

const DropdownItemWithLink: React.FC<DropdownItemWithLinkProps> = ({ text, location }: DropdownItemWithLinkProps) => {
    return (
        <Link to={location}>
            <div>
                <p>{text}</p>
            </div>
        </Link>
    );
};

export default DropdownItemWithLink;
