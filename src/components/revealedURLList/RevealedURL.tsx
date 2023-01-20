import React from "react";

interface RevealedURLProps {
    addr: string;
    url: string;
}

const RevealedURL: React.FC<RevealedURLProps> = ({ addr, url }: RevealedURLProps) => {
    return (
        <div className="flex">
            <div>
                <p>{addr}</p>
            </div>
            <div>
                <a href={url}>{url}</a>
            </div>
        </div>
    );
};
export default RevealedURL;
