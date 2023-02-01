import React, { useState } from "react";
import { IHousing } from "../../interface/Housing.interface";
import { IDemoHousing } from "../../interface/DemoHousing.interface";
import ApartmentSlide from "./ApartmentSlide";
import Dot from "../cityPicker/Dot";

interface ApartmentsCarouselProps {
    apartments: IDemoHousing[];
    choiceReporter: Function;
}

const ApartmentsCarousel: React.FC<ApartmentsCarouselProps> = ({ apartments, choiceReporter }: ApartmentsCarouselProps) => {
    const availableIndexes = [...Array(apartments.length < 20 ? apartments.length : 20).keys()];
    const [selectedApartmentIndex, setSelectedApartmentIndex] = useState<number>(1);

    function plusSlides(n: number) {
        const newselectedCityIndex = selectedApartmentIndex + n;
        showSlides(newselectedCityIndex);
    }

    function currentSlide(n: number) {
        const newselectedCityIndex = selectedApartmentIndex + n;
        showSlides(newselectedCityIndex);
    }

    function showSlides(n: number) {
        const numberOfIndexes = availableIndexes.length;
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
        <div className="w-72 h-40 border-2 border-red-400">
            {/* <!-- Slideshow container --> */}
            <div className="slideshow-container">
                <span
                    className="prev"
                    onClick={() => {
                        plusSlides(-1);
                    }}
                >
                    &#10094;
                </span>
                {/* //   <!-- Full-width slides --> */}

                {apartments.map((apartment: IDemoHousing, index: number) => {
                    return (
                        <ApartmentSlide
                            key={index}
                            slideIndex={index}
                            activeIndex={selectedApartmentIndex}
                            nearbyGym={apartment.nearbyGym}
                            distanceToGym={apartment.distanceToNearestGym}
                        />
                    );
                })}

                {/* <!-- Next/prev buttons --> */}

                <span
                    className="next"
                    onClick={() => {
                        plusSlides(1);
                    }}
                >
                    &#10095;
                </span>
            </div>
        </div>
    );
};
export default ApartmentsCarousel;
