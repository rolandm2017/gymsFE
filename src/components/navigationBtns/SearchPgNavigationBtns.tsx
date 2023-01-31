import React from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import Button from "../button/Button";

interface SearchPgNavigationBtnProps {
    currentPage: number;
    nextPgURL: string;
    prevPageURL: string;
    reportGoForward: Function;
    reportGoBack: Function;
}

const SearchPgNavigationBtns: React.FC<SearchPgNavigationBtnProps> = ({
    currentPage,
    nextPgURL,
    prevPageURL,
    reportGoForward,
    reportGoBack,
}: SearchPgNavigationBtnProps) => {
    console.log(currentPage, nextPgURL, prevPageURL, "urls 12rm");
    const navigate = useNavigate();

    return (
        <div className="flex">
            {currentPage === 1 ? (
                <div onClick={() => {}} className="mr-4">
                    {/* // note how this one does nothing -- we are on page 1, "back" is the void! */}
                    <Button type={"Transparent"} text={"Back"} />
                </div>
            ) : (
                <div
                    onClick={() => {
                        console.log("navigating to " + prevPageURL + " 22rm");
                        reportGoBack();
                        navigate(prevPageURL);
                    }}
                    className="mr-4"
                >
                    <Button type={"Opaque"} text={"Back"} />
                </div>
            )}
            <div
                onClick={() => {
                    console.log("navigating to " + nextPgURL + " 39rm");
                    reportGoForward();
                    navigate(nextPgURL);
                }}
            >
                <Button type={"Opaque"} text={"Next"} />
            </div>
        </div>
    );
};

export default SearchPgNavigationBtns;
