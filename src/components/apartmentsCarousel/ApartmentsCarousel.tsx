import React, { useState } from "react";
import { IHousing } from "../../interface/Housing.interface";

interface ApartmentsCarouselProps {
    apartments: IHousing[];
    choiceReporter: Function;
}

const ApartmentsCarousel: React.FC<ApartmentsCarouselProps> = ({ apartments, choiceReporter }: ApartmentsCarouselProps) => {
    const availableIndexes = apartments.length < 20 ? apartments.length : 20;
    const [selectedApartmentIndex, setSelectedApartmentIndex] = useState<number>(0);

    function plusSlides(n: number) {
        const newselectedCityIndex = selectedApartmentIndex + n;
        showSlides(newselectedCityIndex);
    }

    function currentSlide(n: number) {
        const newselectedCityIndex = selectedApartmentIndex + n;
        showSlides(newselectedCityIndex);
    }

    function showSlides(n: number) {
        const numberOfIndexes = availableIndexes;
        const nIsGreaterThanNumberOfSlides = n > numberOfIndexes;
        if (nIsGreaterThanNumberOfSlides) {
            setSelectedApartmentIndex(0);
            choiceReporter(0);
            return;
        }
        const nIsBeforeFirstIndex = n < 0;
        if (nIsBeforeFirstIndex) {
            // reset to final slide
            setSelectedApartmentIndex(numberOfIndexes);
            choiceReporter(numberOfIndexes);
            return;
        }
        setSelectedApartmentIndex(n);
        choiceReporter(n);
    }

    return (
        <div>
            {apartments.map((ap: IHousing) => {
                return <div>1</div>;
            })}
        </div>
    );
};
export default ApartmentsCarousel;
