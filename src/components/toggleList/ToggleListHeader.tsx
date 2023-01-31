import React from "react";

interface ToggleListHeaderProps {
    favesOrRevealedURLs: "favorites" | "revealedURLs";
}

const ToggleListHeader: React.FC<ToggleListHeaderProps> = ({ favesOrRevealedURLs }: ToggleListHeaderProps) => {
    return (
        <div className="flex z-10">
            <div className="w-1/6">{/* // spacer */}</div>
            <div>
                <div>
                    <h3 className="text-xl">Favorites</h3>
                </div>
                <div>
                    <h3 className="text-xl">Revealed URLs</h3>
                </div>
            </div>
            <div className="w-1/6">{/* // spacer */}</div>
        </div>
    );
};
export default ToggleListHeader;
