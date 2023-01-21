import React from "react";
import { useGetRevealedURLsAPI } from "../../api/revealURLAPI";
import { IHousingWithUrl } from "../../interface/Housing.interface";
import RevealedURLEntry from "./RevealedURLEntry";

const RevealedURLList: React.FC<{}> = ({}) => {
    const { revealedURLs, runUpdateRevealedURLs } = useGetRevealedURLsAPI();
    console.log(revealedURLs, "8rm");
    return (
        <div className="w-full sm:w-1/2 p-3 ">
            <div className="w-full">
                <h3>Revealed URLs</h3>
            </div>
            <div className="h-12 grid grid-cols-6 bg-blue-200 rounded-lg">
                <div className="col-span-3">
                    <div className="h-full flex justify-center items-center">
                        <h4>Address</h4>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="h-full flex justify-center items-center">
                        <h4 className="ml-0">URL</h4>
                    </div>
                </div>
            </div>
            {revealedURLs
                ? revealedURLs.map((housing: IHousingWithUrl) => {
                      if (housing.address === undefined || housing.url === undefined) {
                          throw Error("Failed to load crucial detail");
                      }
                      return <RevealedURLEntry addr={housing.address} url={housing.url ? housing.url : "Failed to load"} />;
                  })
                : null}
        </div>
    );
};
export default RevealedURLList;
