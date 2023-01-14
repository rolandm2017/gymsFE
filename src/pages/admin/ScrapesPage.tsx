import React, { useEffect, useState } from "react";
//
import PageBase from "../PageBase";
import { IHousing } from "../../interface/Housing.interface";
import Button from "../../components/button/Button";
import { useGetAllBatchNumsAPI, useGetHousingByLocationAPI, useGetTaskMarkersByBatchNumAPI, useHealthCheckAPI } from "../../api/adminAPI";
import { ITask } from "../../interface/Task.interface";
import AdminMap from "../../components/map/AdminApartmentsMap";

import "./ScrapesPage.scss";
import TitledDropdown from "../../components/titledDropdown/TitledDropdown";
import AdminApartmentsMap from "../../components/map/AdminApartmentsMap";
import TitledDropdownWithButtons from "../../components/titledDropdownWithButtons/TitledDropdownWithButtons";
import { SEED_CITIES } from "../../util/cities";

const ScrapesPage: React.FC<{}> = props => {
    // responses from server
    const [apartments, setApartments] = useState<IHousing[]>([]);
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [batchNums, setBatchNums] = useState<number[]>([]);
    // inputs
    const [provider, setProvider] = useState<string>("rentCanada");
    const [cityId, setCityId] = useState<number>(6);
    const [activeBatchNum, setActiveBatchNum] = useState<number | undefined>(undefined);
    const [activeTaskId, setActiveTaskId] = useState<number | undefined>(undefined);
    const [activeCityIndex, setActiveCityIndex] = useState<number | undefined>(undefined);
    const [longitude, setLongitude] = useState<number>(0);
    const [latitude, setLatitude] = useState<number>(0);
    const [zoom, setZoom] = useState<number>(10);
    const [qualified, setQualified] = useState<IHousing[]>([]);
    const [showApartments, setShowApartments] = useState<boolean>(false);
    const [showTaskMarkers, setShowTaskMarkers] = useState<boolean>(false);

    const { taskMarkersForBatchNum, runGetTaskMarkersByBatchNum, getTaskMarkerByBatchNumErr, getTaskMarkersIsLoaded, loadedBatchNum } =
        useGetTaskMarkersByBatchNumAPI();

    const { housingByLocation, runGetHousingByLocation, getHousingByLocationErr, loaded } = useGetHousingByLocationAPI();

    useEffect(() => {
        if (getTaskMarkersIsLoaded && loadedBatchNum === activeBatchNum) {
            setTasks(taskMarkersForBatchNum);
        }
        if (activeBatchNum) {
            runGetTaskMarkersByBatchNum(activeBatchNum);
        }
    }, [activeBatchNum]);

    useEffect(() => {
        const fetchHousingData = async () => {
            // runGetHousingByLocation("Montreal");
            // FIXME
        };
        fetchHousingData();
    }, [cityId, longitude, latitude, zoom]);

    const justApartmentTaskIds: (string | number)[] = Array.from(
        new Set(
            apartments
                .map(a => a.taskId)
                .sort(function (a, b) {
                    return a - b;
                }),
        ),
    );
    justApartmentTaskIds.unshift("all");
    const justApartmentBatchNums: (string | number)[] = Array.from(new Set(apartments.map(a => (a.batchId ? a.batchId : "null"))));
    justApartmentBatchNums.unshift("all");

    useEffect(() => {
        // display scraped data filtered by activeTaskId
        console.log(apartments, activeTaskId, "64rm");
        const x = Array.from(new Set(apartments.map(ap => ap.lat)));
        console.log(x.length, "number of unique apartments, 66rm");

        if (apartments.length === 0) return;
        if (activeTaskId === undefined) {
            setQualified(apartments);
        } else {
            console.log(typeof activeTaskId, "69rm");
            const apartmentsWithMatchingTaskId = apartments.filter(ap => ap.taskId === activeTaskId);
            console.log(apartmentsWithMatchingTaskId, "matching task id 70rm");
            setQualified(apartmentsWithMatchingTaskId);
        }
    }, [apartments, activeTaskId]);

    useEffect(() => {
        // center map on selected city
    }, [activeCityIndex]);

    return (
        <PageBase>
            <div>
                <div id="mapAndOptionsContainer" className="flex w-full ">
                    <div className="w-full mr-4">
                        <AdminApartmentsMap
                            qualified={qualified}
                            activeApartment={null}
                            activeTaskId={activeTaskId}
                            center={[
                                SEED_CITIES[activeCityIndex ? activeCityIndex : 0].centerLat,
                                SEED_CITIES[activeCityIndex ? activeCityIndex : 0].centerLong,
                            ]}
                            tasks={tasks}
                            showApartments={showApartments}
                            showTaskMarkers={showTaskMarkers}
                        />
                    </div>
                    <div id="optionsDropdowns">
                        <TitledDropdownWithButtons
                            title="Apartments by Task Id"
                            options={justApartmentTaskIds}
                            valueReporter={setActiveTaskId}
                            activeOption={activeTaskId}
                        />
                        <TitledDropdownWithButtons
                            title="Apartments by Batch Number"
                            options={justApartmentBatchNums}
                            valueReporter={setActiveBatchNum}
                            activeOption={activeBatchNum}
                        />
                        <TitledDropdown
                            title="City"
                            options={SEED_CITIES}
                            valueReporter={setActiveCityIndex}
                            activeOption={activeCityIndex}
                            usesCities={true}
                        />
                    </div>
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
                            setShowTaskMarkers(!showTaskMarkers);
                        }}
                    >
                        {showTaskMarkers ? <Button type={"Opaque"} text={"Task Markers"} /> : <Button type={"Transparent"} text={"Task Markers"} />}
                    </div>
                </div>
            </div>
        </PageBase>
    );
};

export default ScrapesPage;
