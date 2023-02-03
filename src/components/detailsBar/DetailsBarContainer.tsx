import React, { useEffect, useState } from "react";
import { IHousing } from "../../interface/Housing.interface";
import DetailsBar from "./DetailsBar";

interface DetailsBarContainerProps {
    currentPage: number;
    apartments: IHousing[];
    activeIndexForHighlight: number | null;
    setActiveIndexForHighlight: Function;
}

const DetailsBarContainer: React.FC<DetailsBarContainerProps> = ({
    apartments,
    currentPage,
    activeIndexForHighlight,
    setActiveIndexForHighlight,
}: DetailsBarContainerProps) => {
    const [currentlyDisplayed, setCurrentlyDisplayed] = useState<IHousing[]>([]);

    useEffect(() => {
        const startOfPg = (currentPage - 1) * 15;
        const endOfPg = currentPage * 15;
        const current = apartments.slice(startOfPg, endOfPg);
        setCurrentlyDisplayed(current);
    }, [apartments, currentPage]);

    return (
        <div>
            {apartments.map((ap, i) => (
                <DetailsBar
                    key={i}
                    apartmentId={ap.housingId}
                    address={ap.address}
                    nearbyGyms={ap.nearbyGyms}
                    distanceToNearestGym={ap.distanceToNearestGym}
                    // url={ap.url}
                    detailNumber={i}
                    activeIndex={activeIndexForHighlight}
                    setActiveIndex={setActiveIndexForHighlight}
                />
            ))}
        </div>
    );
};
export default DetailsBarContainer;
