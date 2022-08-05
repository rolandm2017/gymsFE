import React from "react";

const TitleBar: React.FC<{}> = () => {
    return (
        <div className="h-12 mt-5 flex items-center bg-white">
            <div className="w-full px-7 flex justify-between items-center">
                <div className="w-1/6 hidden xl:flex justify-start">
                    <h5>Apartment Name</h5>
                </div>
                <div className="w-1/6 flex justify-start">
                    <h5>Apartment Address</h5>
                </div>
                <div className="w-1/6 hidden sm:flex flex justify-start">
                    <h5>Nearest Gym</h5>
                </div>
                <div className="w-1/6 hidden xl:flex justify-start">
                    <h5>Distance</h5>
                </div>
                <div className="w-1/6 flex justify-start">
                    <h5>Walk Duration</h5>
                </div>
                <div className="w-1/6 flex justify-start">
                    <h5>Apartment Link</h5>
                </div>
            </div>
        </div>
    );
};

export default TitleBar;
