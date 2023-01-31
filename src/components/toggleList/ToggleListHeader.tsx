import React from "react";
import { DashboardTypeToggleEnum } from "../../enum/dashboardTypeToggle.enum";

interface ToggleListHeaderProps {
    favesOrRevealedURLs: DashboardTypeToggleEnum.revealedURLs | DashboardTypeToggleEnum.favorites;
    toggleHandler: Function;
}

const ToggleListHeader: React.FC<ToggleListHeaderProps> = ({ favesOrRevealedURLs, toggleHandler }: ToggleListHeaderProps) => {
    return (
        <div className="w-full flex z-10 h-16 absolute top-0 flex justify-center">
            <div className="flex w-4/6 h-16 rounded-xl">
                <div
                    className={`px-2 w-full flex justify-center items-center rounded-tl-lg rounded-bl-lg ${
                        favesOrRevealedURLs === "favorites" ? "bg-blue-200" : "bg-zinc-200"
                    }`}
                    onClick={() => {
                        toggleHandler("favorites");
                    }}
                >
                    <h3 className="text-lg">Favorites</h3>
                </div>
                <div
                    className={`px-2 w-full flex justify-center items-center rounded-tr-lg rounded-br-lg ${
                        favesOrRevealedURLs === "revealedURLs" ? "bg-blue-200" : "bg-zinc-200"
                    }`}
                    onClick={() => {
                        toggleHandler("revealedURLs");
                    }}
                >
                    <h3 className="text-lg">Revealed URLs</h3>
                </div>
            </div>
        </div>
    );
};
export default ToggleListHeader;
