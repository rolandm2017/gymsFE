import React from "react";
import Button from "../button/Button";
import Input from "../input/Input";

import "./SearchBar.scss";

const SearchBar: React.FC<{}> = () => {
    return (
        <div className="searchBarContainer h-24 px-6 flex items-center">
            <div className="w-auto flex justify-between">
                <div className="inputContainerLeft flex flex-col xl:flex-row">
                    <div className="pr-9">
                        <Input type="text" placeholder={"Address"} changeReporter={() => {}} />
                    </div>
                    <div>
                        <Input type="text" placeholder={"City"} changeReporter={() => {}} />
                    </div>
                </div>
                <div className="inputContainerRight w-full flex justify-end">
                    <div className=" pr-8 flex flex-col xl:flex-row">
                        {/* <div className="pr-8">
                            <Input type="text" placeholder={"Min Distance"} />
                        </div> */}
                        <div>
                            <Input type="text" placeholder={"Max Distance"} changeReporter={() => {}} />
                        </div>
                    </div>
                    <Button type="Opaque" text="Search" />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
