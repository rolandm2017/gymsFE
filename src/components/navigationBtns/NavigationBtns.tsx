import React from "react";
import Button from "../button/Button";

const NavigationBtns: React.FC<{}> = () => {
    return (
        <div className="flex">
            <div className="mr-4">
                <Button type={"Transparent"} text={"Back"} />
            </div>
            <div>
                <Button type={"Opaque"} text={"Next"} />
            </div>
        </div>
    );
};

export default NavigationBtns;
