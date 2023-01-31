import React from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";

interface SearchPgNavigationBtnWithNavLinkProps {
    currentPage: number;
    // currentCity: string;
    // totalPages: number;
    nextPgURL: string;
    prevPageURL: string;
    // resetActive: Function;
}

const SearchPgNavigationBtnsWithNavLink: React.FC<SearchPgNavigationBtnWithNavLinkProps> = ({
    currentPage,
    // currentCity,
    // totalPages,
    nextPgURL,
    prevPageURL,
    // resetActive,
}) => {
    return (
        <div className="flex">
            <div
                onClick={() => {
                    // console.log("new pg:", currentPage - 1);
                    // if (currentPage > 1) {
                    //     changePgHandler(currentCity, currentPage - 1);
                    //     resetActive(null);
                    // }
                }}
                className="mr-4"
            >
                {currentPage === 1 ? (
                    <Button type={"Transparent"} text={"Back"} />
                ) : (
                    <Link to={prevPageURL}>
                        <Button type={"Opaque"} text={"Back"} />
                    </Link>
                )}
            </div>
            <div
            // onClick={() => {
            //     console.log("new pg:", currentPage + 1);
            //     if (currentPage < totalPages) {
            //         changePgHandler(currentCity, currentPage + 1);
            //         resetActive(null);
            //     }
            // }}
            >
                <Link to={nextPgURL}>
                    <Button type={"Opaque"} text={"Next"} />
                </Link>
            </div>
        </div>
    );
};

export default SearchPgNavigationBtnsWithNavLink;
