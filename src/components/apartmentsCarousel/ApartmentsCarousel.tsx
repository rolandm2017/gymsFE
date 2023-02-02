import React, { useState } from "react";
import { IHousing } from "../../interface/Housing.interface";
import { IDemoHousing } from "../../interface/DemoHousing.interface";
import ApartmentSlide from "./ApartmentSlide";
import Dot from "../cityPicker/Dot";

interface ApartmentsCarouselProps {
    apartments: IDemoHousing[];
    activeMapMarkerApartmentIdSetter: Function;
}

const ApartmentsCarousel: React.FC<ApartmentsCarouselProps> = ({ apartments, activeMapMarkerApartmentIdSetter }: ApartmentsCarouselProps) => {
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
        const newHightlightId = apartments[selectedApartmentIndex].housingId;
        console.log("New highlight id:", newHightlightId, "30rm");
        if (nIsGreaterThanNumberOfSlides) {
            setSelectedApartmentIndex(0);
            activeMapMarkerApartmentIdSetter(newHightlightId);
            return;
        }
        const nIsBeforeFirstIndex = n < 0;
        if (nIsBeforeFirstIndex) {
            // reset to final slide
            setSelectedApartmentIndex(numberOfIndexes);
            activeMapMarkerApartmentIdSetter(newHightlightId);
            return;
        }
        setSelectedApartmentIndex(n);
        activeMapMarkerApartmentIdSetter(newHightlightId);
    }

    return (
        <div className="w-full h-48  relative flex justify-center items-center ">
            {/* <!-- Slideshow container --> */}
            <div>
                <span
                    className="prev z-30"
                    onClick={() => {
                        plusSlides(-1);
                    }}
                >
                    &#10094;
                </span>
            </div>
            <div className="h-full mx-14 w-full relative bg-white">
                {/* //   <!-- Full-width slides --> */}

                {apartments.map((apartment: IDemoHousing, index: number) => {
                    return (
                        <ApartmentSlide
                            key={index}
                            apartmentId={apartment.housingId}
                            slideIndex={index}
                            activeIndex={selectedApartmentIndex}
                            nearbyGym={apartment.nearbyGym}
                            distanceToGym={apartment.distanceToNearestGym}
                        />
                    );
                })}
            </div>
            <div>
                {/* <!-- Next/prev buttons --> */}

                <span
                    className="next z-30"
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
