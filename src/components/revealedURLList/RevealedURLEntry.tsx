import React from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";

interface RevealedURLProps {
    addr: string;
    url: string;
}

const RevealedURLEntry: React.FC<RevealedURLProps> = ({ addr, url }: RevealedURLProps) => {
    return (
        <div className="w-full mt-3 py-2 pl-3 h-12 grid grid-cols-6 bg-white rounded-lg">
            <div className="col-span-4">
                <div className="flex items-center h-full">
                    <p className="text-left  whitespace-nowrap text-ellipsis overflow-hidden">{addr}</p>
                </div>
            </div>
            <div className="col-span-2">
                <div className="w-full flex justify-center">
                    {/* <Link to={url}> */}
                    <a href={url} target="_blank" rel="noreferrer">
                        <Button type="Opaque" size="Small" text="Visit URL" />
                    </a>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    );
};
export default RevealedURLEntry;
