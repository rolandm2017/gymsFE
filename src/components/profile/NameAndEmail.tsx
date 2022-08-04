import React from "react";

import "./NameAndEmail.scss";

interface NameAndEmailProps {
    name: string;
    email: string;
}

const NameAndEmail: React.FC<NameAndEmailProps> = ({ name, email }) => {
    return (
        <div className="h-full pl-2 flex flex-col items-start justify-center">
            <div className="flex justify-start">
                <p className="nameText">{name}</p>
            </div>
            <div className="flex justify-start">
                <p className="emailText">{email}</p>
            </div>
        </div>
    );
};

export default NameAndEmail;
