import React, { useEffect, useState } from "react";
//
import PageBase from "../PageBase";
import Button from "../../components/button/Button";
import { useDeleteAllTasksAPI, useGetAllBatchNumsAPI, useGetTaskMarkersByBatchNumAndCityIdAPI } from "../../api/adminAPI";
import { ITask } from "../../interface/Task.interface";

import "./TaskMarkerPage.scss";
import TitledDropdown from "../../components/titledDropdown/TitledDropdown";
import AdminTasksMap from "../../components/map/AdminTasksMap";
import TitledDropdownWithButtons from "../../components/titledDropdown/TitledDropdownWithButtons";
import { SEED_CITIES } from "../../util/cities";
import AsAdmin from "../../components/hoc/AsAdmin";
import WithAuthentication from "../../components/hoc/WithAuth";
import TitledCityDropdown from "../../components/titledDropdown/TitledCitiesDropdown";
import ExpanderButton from "../../components/button/ExpanderButton";
import { adminCitiesDropdownOptions } from "../../util/adminCitiesDropdownOptions";
import { ICity } from "../../interface/City.interface";
import { getCorrespondingIndex } from "../../util/adminStuff/getCorrespondingIndex";

const TaskMarkerPage: React.FC<{}> = props => {
    // responses from server
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [availableBatchNumbers, setAvailableBatchNumbers] = useState<number[]>([]);
    // inputs
    const [activeBatchNum, setActiveBatchNum] = useState<number>(1); // default 1st batch
    const [activeCityId, setActiveCityId] = useState<number>(6); // default montreal
    const [mapCenter, setMapCenter] = useState<number[]>([]);
    const [activeProvider, setActiveProvider] = useState("all");

    const { runDeleteAllTasks } = useDeleteAllTasksAPI();

    const { batchNums, getAllBatchNumsErr, batchNumsIsLoaded } = useGetAllBatchNumsAPI();

    const {
        taskMarkersForBatchNumAndCityId,
        runGetTaskMarkersByParameters,
        getTaskMarkerByBatchNumErr,
        getTaskMarkersIsLoaded,
        loadedBatchNum,
        loadedCityName,
        loadedProvider,
    } = useGetTaskMarkersByBatchNumAndCityIdAPI();

    useEffect(() => {
        // load the batch markers for the start batch num
        const correspondingCityOption: ICity = adminCitiesDropdownOptions[activeCityId];
        // could be "all" also
        const correspondingCityOptionTitle = correspondingCityOption.cityName;

        runGetTaskMarkersByParameters(activeBatchNum, correspondingCityOptionTitle, activeProvider);
    }, []);

    useEffect(() => {
        if (batchNumsIsLoaded && batchNums) {
            setAvailableBatchNumbers(batchNums);
        }
    }, [batchNumsIsLoaded, availableBatchNumbers.length, batchNums]);

    useEffect(() => {
        // re-center city on city when city changes
        const longLatOfCity = [SEED_CITIES[activeCityId].centerLong, SEED_CITIES[activeCityId].centerLat];
        setMapCenter(longLatOfCity);
    }, [activeCityId]);

    useEffect(() => {
        // load task markers when the loaded batch num changes
        const loadWhateverIsLoaded = activeBatchNum === undefined;
        const newTaskMarkersAreLoaded =
            activeBatchNum === loadedBatchNum && activeCityId === getCorrespondingIndex(loadedCityName) && activeProvider === loadedProvider;
        console.log(activeBatchNum, loadedBatchNum, "50rm");
        console.log(taskMarkersForBatchNumAndCityId, "51rm");
        if (newTaskMarkersAreLoaded || loadWhateverIsLoaded) {
            setTasks(taskMarkersForBatchNumAndCityId);
        }
    }, [activeBatchNum, loadedBatchNum, taskMarkersForBatchNumAndCityId]);

    useEffect(() => {
        const activeBatchNumIsSet = activeBatchNum !== undefined;
        // "if anything on the page doesn't match what's been loaded, update what is loaded to match the page"
        const timeToGetNewTaskMarkers =
            activeBatchNum !== loadedBatchNum || activeCityId !== getCorrespondingIndex(loadedCityName) || activeProvider !== loadedProvider;
        console.log(activeBatchNumIsSet, timeToGetNewTaskMarkers, "69rm");
        if (activeBatchNumIsSet && timeToGetNewTaskMarkers) {
            const correspondingCityOption: ICity = adminCitiesDropdownOptions[activeCityId];
            // could be "all" also
            const correspondingCityOptionTitle = correspondingCityOption.cityName;

            runGetTaskMarkersByParameters(activeBatchNum, correspondingCityOptionTitle, activeProvider);
        }
    }, [activeBatchNum, loadedBatchNum, taskMarkersForBatchNumAndCityId, runGetTaskMarkersByParameters, activeCityId, activeProvider]);

    return (
        <PageBase>
            <div>
                <div id="mapAndOptionsContainer" className="flex w-full ">
                    <div className="w-full mr-4">
                        <AdminTasksMap
                            tasks={tasks}
                            center={[
                                // SEED_CITIES[activeCityIndex ? activeCityIndex : 0].centerLat,
                                // SEED_CITIES[activeCityIndex ? activeCityIndex : 0].centerLong,
                                mapCenter[0],
                                mapCenter[1],
                            ]}
                        />
                    </div>
                    <div id="optionsDropdowns">
                        <TitledDropdownWithButtons
                            title="Batch Number"
                            options={availableBatchNumbers}
                            valueReporter={setActiveBatchNum}
                            activeOption={activeBatchNum}
                        />
                        <TitledCityDropdown
                            title="City"
                            options={adminCitiesDropdownOptions}
                            valueReporter={setActiveCityId}
                            activeOption={activeCityId}
                        />
                        <TitledDropdown
                            title="Provider"
                            options={["all", "rentCanada", "rentFaster", "rentSeeker"]}
                            valueReporter={setActiveProvider}
                            activeOption={activeProvider}
                        />
                        <div className="mt-24">
                            <ExpanderButton text="Delete" type="Opaque" onClickHandler={runDeleteAllTasks} />
                        </div>
                    </div>
                </div>
                <div id="underMapContainer" className="flex justify-between mt-3">
                    <div className="">
                        <Button type={"Transparent"} text={"Refresh"} />
                    </div>

                    <div className="">
                        <Button type={"Transparent"} text={"Inspect"} onClickHandler={() => {}} />
                    </div>
                </div>
            </div>
        </PageBase>
    );
};

export default WithAuthentication(AsAdmin(TaskMarkerPage));
