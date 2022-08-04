import React from "react";

const TitleBar: React.FC<{}> = () => {
    return (
        <div className="debug1 h-12">
            <div className="flex">
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
