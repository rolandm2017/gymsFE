import React from "react";
import { IHousing } from "../../interface/Housing.interface";

interface PageNumberProps {
    currentPage: number;
    totalPages: number;
}

const PageNumber: React.FC<PageNumberProps> = ({ currentPage, totalPages }) => {
    console.log(currentPage, totalPages, "10rm");
    return (
        <div>
            <p>
                Page {currentPage} of {totalPages}
            </p>
        </div>
    );
};

export default PageNumber;
