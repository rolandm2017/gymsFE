import React from "react";

interface RevealedURLProps {
    addr: string;
    url: string;
}

const RevealedURLEntry: React.FC<RevealedURLProps> = ({ addr, url }: RevealedURLProps) => {
    return (
        <div className="w-full mt-3 py-2 pl-3 h-12 grid grid-cols-6 bg-white rounded-lg">
            <div className="col-span-3">
                <p className="text-left">{addr}</p>
            </div>
            <div className="col-span-3">
                <a href={url}>{url}</a>
            </div>
        </div>
    );
};
export default RevealedURLEntry;
