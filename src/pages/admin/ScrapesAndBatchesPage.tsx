import React, { useEffect, useState } from "react";
//
import PageBase from "../PageBase";
import Map from "../../components/map/Map";
import { IHousing } from "../../interface/Housing.interface";
import { ILatLong } from "../../interface/LatLong.interface";
import Button from "../../components/button/Button";
import { getBatchesAdmin, housingHealthCheck, queryAllScrapesAdmin, queryScrapesAdmin } from "../../api/queries/AdminQueries";

const ScrapesAndBatchesPage: React.FC<{}> = props => {
    console.log("5rm");

    // responses
    const [apartments, setApartments] = useState<IHousing[]>([]);
    const [batchMarkers, setBatchMarkers] = useState<ILatLong[]>([]);
    // inputs
    const [provider, setProvider] = useState<string>("rentCanada");
    const [cityId, setCityId] = useState<number>(6);
    const [batchNum, setBatchNum] = useState<number>(0);
    const [displayMode, setDisplayMode] = useState<string>("batch");
    const [longitude, setLongitude] = useState<number>(0);
    const [latitude, setLatitude] = useState<number>(0);
    const [zoom, setZoom] = useState<number>(10);

    useEffect(() => {
        housingHealthCheck();
        const fetchData = async () => {
            const results = await getBatchesAdmin(provider, batchNum);
            console.log(results, "25rm");
            setBatchMarkers(results);
        };
        fetchData();
    }, [batchNum, displayMode]);

    useEffect(() => {
        const fetchData = async () => {
            const results = await queryAllScrapesAdmin();
            console.log(results, "38rm");
            setApartments(results);
        };
        fetchData();
    }, [cityId, longitude, latitude, zoom]);

    return (
        <PageBase>
            <div>
                foo
                <div>
                    <div>Admin Panel Tabs</div>
                    <div>
                        <div>Batches & Scrapes</div>
                        <div>User Activity</div>
                    </div>
                </div>
                <div>
                    {apartments && apartments.length > 0 ? (
                        <Map qualifiedFromCurrentPage={apartments} activeApartment={null} center={[apartments[0].lat, apartments[0].long]} />
                    ) : null}
                </div>
                <div>
                    <div>
                        <Button type={"Transparent"} text={"Refresh"} />
                    </div>

                    <div
                        onClick={() => {
                            console.log("foo");
                            console.log(apartments, "67rm");
                        }}
                    >
                        <Button type={"Transparent"} text={"Inspect"} onClickHandler={() => {}} />
                    </div>
                </div>
            </div>
        </PageBase>
    );
};

export default ScrapesAndBatchesPage;
