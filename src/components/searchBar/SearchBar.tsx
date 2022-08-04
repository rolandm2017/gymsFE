import React from "react";
import Button from "../button/Button";
import Input from "../input/Input";

import "./SearchBar.scss";

const SearchBar: React.FC<{}> = () => {
    return (
        <div className="searchBarContainer w-full h-24 px-6 flex items-center">
            <div className="w-full flex justify-between">
                <div className="inputContainerLeft flex debug4">
                    <Input type="text" placeholder={"Address"} />
                    <Input type="text" placeholder={"City"} />
                </div>
                <div className="inputContainerRight w-full flex justify-end">
                    <div className=" pr-8 flex debug5">
                        <Input type="text" placeholder={"Min Distance"} />
                        <Input type="text" placeholder={"Max Distance"} />
                    </div>
                    <Button type="Opaque" text="Search" />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
