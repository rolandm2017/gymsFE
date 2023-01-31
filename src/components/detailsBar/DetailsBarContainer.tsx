import React, { useEffect, useState } from "react";
import { IHousing } from "../../interface/Housing.interface";
import DetailsBar from "./DetailsBar";

interface DetailsBarContainerProps {
    currentPage: number;
    apartments: IHousing[];
    activeIndex: number | null;
    setActiveIndex: Function;
}

const DetailsBarContainer: React.FC<DetailsBarContainerProps> = ({
    apartments,
    currentPage,
    activeIndex,
    setActiveIndex,
}: DetailsBarContainerProps) => {
    const [currentlyDisplayed, setCurrentlyDisplayed] = useState<IHousing[]>([]);

    useEffect(() => {
        console.log(currentPage, "16rm");
        const startOfPg = (currentPage - 1) * 15;
        const endOfPg = currentPage * 15;
        const current = apartments.slice(startOfPg, endOfPg);
        console.log(apartments, current, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa 18rm");
        setCurrentlyDisplayed(current);
    }, [apartments, currentPage]);
    console.log(currentlyDisplayed, "20rm");

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
                    setActiveIndex={setActiveIndex}
                />
            ))}
        </div>
    );
};
export default DetailsBarContainer;
