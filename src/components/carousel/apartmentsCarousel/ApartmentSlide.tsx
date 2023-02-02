import React from "react";
import { useDemoAddFavoriteAPI } from "../../../api/favoritesAPI";
import { IAssociation } from "../../../interface/Association.interface";
import { IGym } from "../../../interface/Gym.interface";
import { walkTimeInMinutes, walkTimeInSeconds, calculateWalkTimeInMinutes, walkTimeInMinutesForDemo } from "../../../util/calcWalkTime";
import Button from "../../button/Button";
import useWindowSize from "../../../util/useWindowSize";

interface ApartmentSlideProps {
    distanceToGym: number;
    apartmentId: number;
    nearbyGym: IGym;
    slideIndex: number;
    activeIndex: number;
}

const ApartmentSlide: React.FC<ApartmentSlideProps> = ({ distanceToGym, apartmentId, nearbyGym, slideIndex, activeIndex }: ApartmentSlideProps) => {
    const [width, height] = useWindowSize();

    function determineClasses() {
        if (width > 640 && slideIndex === activeIndex - 1) return "slide block bg-white";
        if (width > 640 && slideIndex === activeIndex + 1) return "slide block bg-white";
        if (slideIndex === activeIndex) return "slide block bg-white";
        else return "slide hidden"; // tailwind classnames;
    }

    const { runAddDemoFavorite, success } = useDemoAddFavoriteAPI();

    const nearestGymName = nearbyGym.name;

    const walkTimeFraction = calculateWalkTimeInMinutes(distanceToGym);

    function clipIfLongerThanNChars(text: string, chars: number): string {
        // Function Health Club Downtown Vancouver => Function Health Club Downt...
        if (text.length < chars) return text;
        return text.slice(0, chars) + "...";
    }

    return (
        <div className={` ${determineClasses()} h-full w-full sm:w-1/3 flex items-center`}>
            <div className="h-5/6 w-full shadow-xl rounded-xl border-4 border-zinc-100">
                <div className="h-full w-full pl-3 pr-3 pt-2 pb-2 text-left ">
                    <p>
                        Address: <span className="blueText">Hidden</span>
                    </p>
                    {/* // todo: calculate walk time */}
                    <p className="text-sm">
                        {" "}
                        <span className="font-bold">{walkTimeInMinutesForDemo(walkTimeFraction)} walk</span> {width > 640 ? "to a gym" : ""}
                    </p>
                    {/* <p className="">{distanceToGym} walk to a gym</p> */}
                    <p className="text-base mt-1">
                        <span className="underline">Nearest Gym</span>:
                    </p>
                    <p className="text-base whitespace-nowrap text-ellipsis	overflow-hidden">{clipIfLongerThanNChars(nearestGymName, 23)}</p>
                    <div className="mt-2">
                        {success ? (
                            <Button type="GreyedOut" text="Saved!" />
                        ) : (
                            <Button
                                type="Opaque"
                                text="Favorite"
                                onClickHandler={() => {
                                    runAddDemoFavorite(apartmentId);
                                }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ApartmentSlide;
