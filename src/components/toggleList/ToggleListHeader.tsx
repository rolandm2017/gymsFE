import React from "react";

interface ToggleListHeaderProps {
    favesOrRevealedURLs: "favorites" | "revealedURLs";
}

const ToggleListHeader: React.FC<ToggleListHeaderProps> = ({ favesOrRevealedURLs }: ToggleListHeaderProps) => {
    return (
        <div className="w-full flex z-10 h-16 absolute top-0">
            <div className="w-1/6">{/* // spacer */}</div>
            <div className="flex w-4/6 h-16">
                <div className={`w-full flex justify-center items-center ${favesOrRevealedURLs === "favorites" ? "bg-blue-300" : "bg-zinc-200"}`}>
                    <h3 className="text-xl">Favorites</h3>
                </div>
                <div className={`w-full flex justify-center items-center ${favesOrRevealedURLs === "revealedURLs" ? "bg-blue-300" : "bg-zinc-200"}`}>
                    <h3 className="text-xl">Revealed URLs</h3>
                </div>
            </div>
            <div className="w-1/6">{/* // spacer */}</div>
        </div>
    );
};
export default ToggleListHeader;
