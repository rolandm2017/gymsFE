// https://www.w3schools.com/howto/howto_js_quotes_slideshow.asp
import React, { useState } from "react";
import { SEED_CITIES } from "../../util/cities";
import Dot from "./Dot";
import Slide from "./Slide";

import "./CityPicker.scss";

interface CityPickerProps {
    choiceReporter: Function;
}

const CityPicker: React.FC<CityPickerProps> = ({ choiceReporter }: CityPickerProps) => {
    const availableIndexes = SEED_CITIES.map((city, index) => index);
    const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);

    function plusSlides(n: number) {
        const newselectedCityIndex = selectedCityIndex + n;
        showSlides(newselectedCityIndex);
    }

    function currentSlide(n: number) {
        const newselectedCityIndex = selectedCityIndex + n;
        showSlides(newselectedCityIndex);
    }

    function showSlides(n: number) {
        const numberOfIndexes = availableIndexes.length - 1;
        const nIsGreaterThanNumberOfSlides = n > numberOfIndexes;
        if (nIsGreaterThanNumberOfSlides) {
            setSelectedCityIndex(0);
            choiceReporter(0);
            return;
        }
        const nIsBeforeFirstIndex = n < 0;
        if (nIsBeforeFirstIndex) {
            // reset to final slide
            setSelectedCityIndex(numberOfIndexes);
            choiceReporter(numberOfIndexes);
            return;
        }
        setSelectedCityIndex(n);
        choiceReporter(n);
    }

    return (
        <div className="w-72">
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

                {SEED_CITIES.map((city, index) => (
                    <Slide key={index} slideIndex={index} activeIndex={selectedCityIndex} slideText={city.cityName} />
                ))}

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

            {/* // <!-- Dots/bullets/indicators --> */}
            <div className="dot-container">
                {availableIndexes.map(index => {
                    return <Dot key={index} dotIndex={index} activeIndex={selectedCityIndex} changeCurrentSlide={currentSlide} />;
                })}
            </div>
        </div>
    );
};

export default CityPicker;
