import React from "react";

const TitleBar: React.FC<{}> = () => {
    return (
        <div className="h-12 mt-5 flex items-center bg-white">
            <div className="w-full px-3 sm:px-7 grid grid-cols-9 md:grid-cols-12">
                <div className="col-span-3 w-full flex justify-center">
                    <h5 className="mx-0 px-0 w-fit">Apartment Address</h5>
                </div>
                {/* // todo: get nearest gym URL and Name from google places api */}
                {/* <div className="w-1/6 hidden sm:flex flex justify-start">
                    <h5>Nearest Gym</h5>
                </div> */}
                <div className="col-span-3 w-full hidden md:flex justify-center">
                    <h5>Distance To Gym</h5>
                </div>
                <div className="col-span-3 w-full flex justify-center">
                    <h5>Walk Duration</h5>
                </div>
                <div className="col-span-3 w-full flex justify-center">
                    <h5 className="hidden sm:block">Actions</h5>
                </div>
            </div>
        </div>
    );
};

export default TitleBar;
