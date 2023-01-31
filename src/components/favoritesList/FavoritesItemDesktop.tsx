import React, { useContext } from "react";
import { useAuth } from "../../context/AuthContext";
import { CreditsModalContext, ICreditsModalContext } from "../../context/CreditsModalContext";
import Button from "../button/Button";
import Garbage from "../../assets/waste.png";
import Visit from "../../assets/visit.png";
import { calculateWalkTimeInMinutes, getMetersFromKM } from "../../util/calcWalkTime";

interface FavoritesItemProps {
    address: string;
    distanceToGym: number; // pythagoras long, lat difference
    removeFavorite: Function;
    hasBeenRevealed: boolean;
    runRevealUrl: Function;
}

const FavoritesItemDesktop: React.FC<FavoritesItemProps> = ({
    address,
    distanceToGym,
    removeFavorite,
    hasBeenRevealed,
    runRevealUrl,
}: FavoritesItemProps) => {
    const { outOfCredits } = useAuth();
    const { openAddCreditsModal } = useContext(CreditsModalContext) as ICreditsModalContext;

    const walkTimeFraction = calculateWalkTimeInMinutes(distanceToGym);

    const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

    // hidden md:grid
    return (
        <div className="mt-3 py-2 pl-2 h-24 md:h-12 hidden md:grid grid-cols-8 md:grid-cols-6 bg-white rounded-lg">
            <div className="col-span-6 flex flex-col md:flex-row border-2 border-black">
                <div className="w-full h-1/2 md:h-full pl-1 border-2 border-red-400">
                    <div className="h-full flex items-center">
                        <p className="text-left whitespace-nowrap text-ellipsis	overflow-hidden">{address}</p>
                    </div>
                </div>
                <div className="h-1/2 md:h-full flex justify-center items-center border-2 border-red-400">
                    <p>{getMetersFromKM(distanceToGym)} minute walk </p>
                </div>
            </div>
            <div className="col-span-2 flex flex-col md:flex-row border-2 border-green-600">
                <div
                    className="col-span-1"
                    onClick={() => {
                        removeFavorite();
                    }}
                >
                    <div className="hidden sm:block">
                        <Button type="Opaque" text="Remove" size="Small" />
                    </div>
                    <div className="h-full block sm:hidden flex items-center">
                        {/* // show trash icon on mobile to save space */}
                        <img src={Garbage} alt="trash" width={15} height={15} />
                    </div>
                </div>
                <div
                    className="col-span-1"
                    onClick={() => {
                        if (outOfCredits) {
                            openAddCreditsModal();
                            return;
                        }
                        runRevealUrl();
                    }}
                >
                    {hasBeenRevealed ? <Button type="GreyedOut" text="Loaded" size="Small" /> : <Button type="Opaque" text="Get URL" size="Small" />}
                </div>
            </div>
        </div>
    );
};
export default FavoritesItemDesktop;
