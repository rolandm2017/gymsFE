// https://www.w3schools.com/howto/howto_js_quotes_slideshow.asp
import React, { useState } from "react";
import { SEED_CITIES } from "../../util/cities";
import Dot from "./Dot";
import Slide from "./Slide";

import "./CityPicker.scss";

const CityPicker: React.FC<{}> = () => {
    const availableIndexes = SEED_CITIES.map((city, index) => index);
    const [selectedCityIndex, setSelectedCityIndex] = useState<number>(0);
    const [slideIndex, setSlideIndex] = useState<number>(0);
    const [activeSlide, setActiveSlide] = useState<number>(0);
    const [activeDot, setActiveDot] = useState<number>(0);

    // showSlides(slideIndex);

    function plusSlides(n: number) {
        const newSlideIndex = slideIndex + n;
        showSlides(newSlideIndex);
    }

    function currentSlide(n: number) {
        const newSlideIndex = slideIndex + n;
        showSlides(newSlideIndex);
    }

    function showSlides(n: number) {
        const numberOfIndexes = availableIndexes.length - 1;
        const nIsGreaterThanNumberOfSlides = n > numberOfIndexes;
        if (nIsGreaterThanNumberOfSlides) {
            setSlideIndex(0);
            return;
        }
        const nIsBeforeFirstIndex = n < 0;
        if (nIsBeforeFirstIndex) {
            // reset to final slide
            setSlideIndex(numberOfIndexes);
            return;
        }
        setSlideIndex(n);
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
                    <Slide key={index} slideIndex={index} activeIndex={slideIndex} slideText={city.cityName} />
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
                    return <Dot key={index} dotIndex={index} activeIndex={slideIndex} changeCurrentSlide={currentSlide} />;
                })}
            </div>
        </div>
    );
};

export default CityPicker;
