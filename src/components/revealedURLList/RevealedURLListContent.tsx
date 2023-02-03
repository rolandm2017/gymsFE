import React, { useEffect, useState } from "react";
import { useAddRevealedURLAPI, useGetRevealedURLsAPI } from "../../api/revealURLAPI";
import { useRevealedURLs } from "../../context/RevealedURLContext";
import { IHousingWithUrl } from "../../interface/Housing.interface";
import RevealedURLEntry from "./RevealedURLEntry";

const RevealedURLListContent: React.FC<{}> = ({}) => {
    const { addRevealedUrlIsLoading } = useAddRevealedURLAPI();

    const { revealedURLsContext } = useRevealedURLs();

    return (
        <div className="w-full p-3">
            <div className="h-12 grid grid-cols-6 bg-blue-200 rounded-lg">
                <div className="col-span-4">
                    <div className="h-full flex justify-center items-center">
                        <h4>Address</h4>
                    </div>
                </div>
                <div className="col-span-2">
                    <div className="h-full flex justify-center items-center">
                        <h4 className="ml-0">URL</h4>
                    </div>
                </div>
            </div>
            {revealedURLsContext.length > 0
                ? revealedURLsContext.map((housing: IHousingWithUrl) => {
                      if (housing.address === undefined || housing.url === undefined) {
                          console.log("Failed to load crucial detail");
                      }
                      return (
                          <RevealedURLEntry
                              key={housing.housingId}
                              addr={housing.address ? housing.address : "Failed to load"}
                              url={housing.url ? housing.url : "Failed to load"}
                          />
                      );
                  })
                : null}
            {addRevealedUrlIsLoading ? (
                <div className="w-full mt-3 py-2 pl-3 h-12 flex justify-center items-center bg-white rounded-lg">
                    <p>Loading...</p>
                </div>
            ) : null}
        </div>
    );
};
export default RevealedURLListContent;
