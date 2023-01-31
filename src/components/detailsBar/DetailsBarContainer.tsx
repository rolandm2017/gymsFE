import React, { useEffect, useState } from "react";
import { IHousing } from "../../interface/Housing.interface";
import DetailsBar from "./DetailsBar";

interface DetailsBarContainerProps {
    currentPage: number;
    apartments: IHousing[];
    activeIndex: number | null;
    setActive: Function;
}

const DetailsBarContainer: React.FC<DetailsBarContainerProps> = ({ apartments, currentPage, activeIndex, setActive }: DetailsBarContainerProps) => {
    const [currentlyDisplayed, setCurrentlyDisplayed] = useState<IHousing[]>([]);

    useEffect(() => {
        const endOfPg = (currentPage + 1) * 15;
        const current = apartments.slice(currentPage * 15, endOfPg);
        setCurrentlyDisplayed(current);
    }, [currentPage]);

    return (
        <div>
            {currentlyDisplayed.map((ap, i) => (
                <DetailsBar
                    key={i}
                    apartmentId={ap.housingId}
                    address={ap.address}
                    nearbyGyms={ap.nearbyGyms}
                    distanceToNearestGym={ap.distanceToNearestGym}
                    // url={ap.url}
                    detailNumber={i}
                    activeIndex={activeIndex}
                    setActive={setActive}
                />
            ))}
        </div>
    );
};
export default DetailsBarContainer;
