import React from "react";
import Button from "../button/Button";
import Input from "../input/Input";

import "./SearchBar.scss";

const SearchBar: React.FC<{}> = () => {
    return (
        <div className="searchBarContainer w-full h-24 px-6 flex items-center">
            <div className="w-full flex justify-between">
                <div className="inputContainerLeft flex">
                    <div className="pr-9">
                        <Input type="text" placeholder={"Address"} />
                    </div>
                    <div>
                        <Input type="text" placeholder={"City"} />
                    </div>
                </div>
                <div className="inputContainerRight w-full flex justify-end">
                    <div className="pr-8 flex">
                        <div className="pr-8">
                            <Input type="text" placeholder={"Min Distance"} />
                        </div>
                        <div>
                            <Input type="text" placeholder={"Max Distance"} />
                        </div>
                    </div>
                    <Button type="Opaque" text="Search" />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
