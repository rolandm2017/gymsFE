import React from "react";

const TitleBar: React.FC<{}> = () => {
    return (
        <div className="debug1 h-12 mt-5 flex items-center bg-white">
            <div className="w-full px-7 flex justify-between items-center">
                <div>
                    <h5>Apartment Name</h5>
                </div>
                <div>
                    <h5>Apartment Address</h5>
                </div>
                <div>
                    <h5>Nearest Gym</h5>
                </div>
                <div>
                    <h5>Distance</h5>
                </div>
                <div>
                    <h5>Walk Duration</h5>
                </div>
                <div>
                    <h5>Apartment Link</h5>
                </div>
            </div>
        </div>
    );
};

export default TitleBar;
