import React, { useEffect, useState } from "react";
//
import PageBase from "../PageBase";
import { IHousing } from "../../interface/Housing.interface";
import Button from "../../components/button/Button";
import { getAllBatchesAdmin, getApartmentsByLocationAdmin, housingHealthCheck } from "../../api/queries/AdminQueries";
import { IBatchMarker } from "../../interface/BatchMarker.interface";
import AdminMap from "../../components/map/AdminMap";

import "./ScrapesAndBatchesPage.scss";

const ScrapesAndBatchesPage: React.FC<{}> = props => {
    // responses
    const [apartments, setApartments] = useState<IHousing[]>([]);
    const [batchMarkers, setBatchMarkers] = useState<IBatchMarker[]>([]);
    // inputs
    const [provider, setProvider] = useState<string>("rentCanada");
    const [cityId, setCityId] = useState<number>(6);
    const [batchNum, setBatchNum] = useState<number>(0);
    const [displayMode, setDisplayMode] = useState<string>("batch");
    const [longitude, setLongitude] = useState<number>(0);
    const [latitude, setLatitude] = useState<number>(0);
    const [zoom, setZoom] = useState<number>(10);
    const [showApartments, setShowApartments] = useState<boolean>(true);
    const [showBatchMarkers, setshowBatchMarkers] = useState<boolean>(true);

    useEffect(() => {
        housingHealthCheck();
        const fetchBatchData = async () => {
            // const results = await getBatchesAdmin(provider, batchNum);
            const results = await getAllBatchesAdmin();
            console.log("batches: ", results, "25rm");
            setBatchMarkers(results);
        };
        fetchBatchData();
    }, [batchNum, displayMode]);

    useEffect(() => {
        const fetchHousingData = async () => {
            const results = await getApartmentsByLocationAdmin("Montreal");
            console.log(results, "38rm");
            setApartments(results);
        };
        fetchHousingData();
    }, [cityId, longitude, latitude, zoom]);

    return (
        <PageBase>
            <div>
                <div id="mapAndOptionsContainer" className="flex w-full ">
                    <div className="w-full mr-4">
                        {apartments && apartments.length > 0 ? (
                            <AdminMap
                                qualifiedFromCurrentPage={apartments}
                                activeApartment={null}
                                center={[apartments[0].lat, apartments[0].long]}
                                batchMarkersData={batchMarkers}
                                showApartments={showApartments}
                                showBatchMarkers={showBatchMarkers}
                            />
                        ) : null}
                    </div>
                    <div id="optionsDropdowns"></div>
                </div>
                <div id="underMapContainer" className="flex justify-between mt-3">
                    <div className="">
                        <Button type={"Transparent"} text={"Refresh"} />
                    </div>

                    <div
                        className=""
                        onClick={() => {
                            console.log("foo");
                            console.log(apartments, "67rm");
                        }}
                    >
                        <Button type={"Transparent"} text={"Inspect"} onClickHandler={() => {}} />
                    </div>
                    <div
                        className=""
                        onClick={() => {
                            setShowApartments(!showApartments);
                        }}
                    >
                        {showApartments ? <Button type={"Opaque"} text={"Apartments"} /> : <Button type={"Transparent"} text={"Apartments"} />}
                    </div>
                    <div
                        className=""
                        onClick={() => {
                            setshowBatchMarkers(!showBatchMarkers);
                        }}
                    >
                        {showBatchMarkers ? (
                            <Button type={"Opaque"} text={"Batch Markers"} />
                        ) : (
                            <Button type={"Transparent"} text={"Batch Markers"} />
                        )}
                    </div>
                </div>
            </div>
        </PageBase>
    );
};

export default ScrapesAndBatchesPage;
