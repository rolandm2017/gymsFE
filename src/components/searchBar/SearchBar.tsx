import React from "react";
import Button from "../button/Button";
import Input from "../input/Input";

import "./SearchBar.scss";

const SearchBar: React.FC<{}> = () => {
    return (
        <div className="searchBarContainer w-full h-24 debug1">
            <div className="flex">
                <div className="flex">
                    <Input type="text" placeholder={"Address"} />
                    <Input type="text" placeholder={"City"} />
                </div>
                <div className="flex">
                    <Input type="text" placeholder={"Min Distance"} />
                    <Input type="text" placeholder={"Max Distance"} />
                    <Button type="Opaque" text="Search" />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
