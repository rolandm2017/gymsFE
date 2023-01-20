import React from "react";
import Button from "../button/Button";

interface NavigationBtnProps {
    currentPage: number;
    currentCity: string;
    totalPages: number;
    changePgHandler: Function;
    resetActive: Function;
}

const NavigationBtns: React.FC<NavigationBtnProps> = ({ currentPage, currentCity, totalPages, changePgHandler, resetActive }) => {
    return (
        <div className="flex">
            <div
                onClick={() => {
                    console.log("new pg:", currentPage - 1);
                    if (currentPage > 1) {
                        changePgHandler(currentCity, currentPage - 1);
                        resetActive(null);
                    }
                }}
                className="mr-4"
            >
                {currentPage === 1 ? <Button type={"Transparent"} text={"Back"} /> : <Button type={"Opaque"} text={"Back"} />}
            </div>
            <div
                onClick={() => {
                    console.log("new pg:", currentPage + 1);
                    if (currentPage < totalPages) {
                        changePgHandler(currentCity, currentPage + 1);
                        resetActive(null);
                    }
                }}
            >
                <Button type={"Opaque"} text={"Next"} />
            </div>
        </div>
    );
};

export default NavigationBtns;
