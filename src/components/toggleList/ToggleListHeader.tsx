import React from "react";
import { DashboardTypeToggleEnum } from "../../enum/dashboardTypeToggle.enum";

interface ToggleListHeaderProps {
    favesOrRevealedURLs: DashboardTypeToggleEnum.revealedURLs | DashboardTypeToggleEnum.favorites;
    toggleHandler: Function;
}

const ToggleListHeader: React.FC<ToggleListHeaderProps> = ({ favesOrRevealedURLs, toggleHandler }: ToggleListHeaderProps) => {
    return (
        <div className="w-full flex z-10 h-16 absolute top-0">
            <div className="w-1/6">{/* // spacer */}</div>
            <div className="flex w-4/6 h-16 rounded-xl">
                <div
                    className={`w-full flex justify-center items-center rounded-tl-lg rounded-bl-lg ${
                        favesOrRevealedURLs === "favorites" ? "bg-blue-200" : "bg-zinc-200"
                    }`}
                    onClick={() => {
                        toggleHandler("favorites");
                    }}
                >
                    <h3 className="text-xl">Favorites</h3>
                </div>
                <div
                    className={`w-full flex justify-center items-center rounded-tr-lg rounded-br-lg ${
                        favesOrRevealedURLs === "revealedURLs" ? "bg-blue-200" : "bg-zinc-200"
                    }`}
                    onClick={() => {
                        toggleHandler("revealedURLs");
                    }}
                >
                    <h3 className="text-xl">Revealed URLs</h3>
                </div>
            </div>
            <div className="w-1/6">{/* // spacer */}</div>
        </div>
    );
};
export default ToggleListHeader;
