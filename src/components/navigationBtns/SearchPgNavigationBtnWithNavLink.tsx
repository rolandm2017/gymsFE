import React from "react";
import { Link } from "react-router-dom";
import Button from "../button/Button";

interface SearchPgNavigationBtnWithNavLinkProps {
    currentPage: number;
    nextPgURL: string;
    prevPageURL: string;
}

const SearchPgNavigationBtnsWithNavLink: React.FC<SearchPgNavigationBtnWithNavLinkProps> = ({ currentPage, nextPgURL, prevPageURL }) => {
    console.log(currentPage, nextPgURL, prevPageURL, "urls 12rm");
    return (
        <div className="flex">
            {currentPage === 1 ? (
                <div onClick={() => {}} className="mr-4">
                    <Button type={"Transparent"} text={"Back"} />
                </div>
            ) : (
                <Link to={prevPageURL}>
                    <div onClick={() => {}} className="mr-4">
                        <Button type={"Opaque"} text={"Back"} />
                    </div>
                </Link>
            )}
            <Link to={nextPgURL}>
                <div>
                    <Button type={"Opaque"} text={"Next"} />
                </div>
            </Link>
        </div>
    );
};

export default SearchPgNavigationBtnsWithNavLink;
