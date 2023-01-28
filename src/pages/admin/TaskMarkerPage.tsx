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
import { adminCitiesDropdownOptions } from "../../util/adminStuff/adminCitiesDropdownOptions";
// import { adminCitiesDropdownOptions } from "../../util/adminCitiesDropdownOptions";
import { ICity } from "../../interface/City.interface";
// import { getCorrespondingIndex } from "../../util/adminStuff/getCorrespondingIndex";
import { getCorrespondingCityName } from "../../util/adminStuff/getCorresponding";
import { getCorrespondingBatchNum } from "../../util/adminStuff/getCorresponding";

const TaskMarkerPage: React.FC<{}> = props => {
    // responses from server
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [availableBatchNumbers, setAvailableBatchNumbers] = useState<number[]>([]);
    // inputs
    const [activeBatchNumIndex, setActiveBatchNumIndex] = useState<number>(1); // default 1st batch
    const [activeCityId, setActiveCityId] = useState<number>(0); // default montreal
    const [mapCenter, setMapCenter] = useState<number[]>([]);
    const [activeProvider, setActiveProvider] = useState("all");

    const { runDeleteAllTasks } = useDeleteAllTasksAPI();

    const { batchNums, getAllBatchNumsErr, batchNumsIsLoaded } = useGetAllBatchNumsAPI();

    const {
        taskMarkersForBatchNumAndCityId,
        runGetTaskMarkersByParameters,
        getTaskMarkerByBatchNumErr,
        getTaskMarkersIsLoading,
        loadedBatchNum,
        loadedCityName,
        loadedProvider,
    } = useGetTaskMarkersByBatchNumAndCityIdAPI();

    useEffect(() => {
        // load the batch markers for the start batch num
        const correspondingCityOption: ICity = adminCitiesDropdownOptions[activeCityId];
        // could be "all" also
        const correspondingCityOptionTitle = correspondingCityOption.cityName;
        const activeBatchNumWasUpdated = getCorrespondingBatchNum(activeBatchNumIndex, availableBatchNumbers) !== loadedBatchNum;
        const activeCityWasUpdated = getCorrespondingCityName(activeCityId) !== loadedCityName;
        const activeProviderWasUpdated = activeProvider !== loadedProvider;
        if (activeBatchNumWasUpdated || activeCityWasUpdated || activeProviderWasUpdated) {
            const correspondingBatchNum = getCorrespondingBatchNum(activeBatchNumIndex, availableBatchNumbers); //
            console.log(activeBatchNumIndex, availableBatchNumbers, correspondingBatchNum, "87rm");
            runGetTaskMarkersByParameters(correspondingBatchNum, correspondingCityOptionTitle, activeProvider);
        }
    }, [
        activeBatchNumIndex,
        activeCityId,
        activeProvider,
        runGetTaskMarkersByParameters,
        getTaskMarkersIsLoading,
        loadedBatchNum,
        loadedCityName,
        loadedProvider,
        availableBatchNumbers,
    ]);

    useEffect(() => {
        if (batchNums) {
            setAvailableBatchNumbers(batchNums);
        }
    }, [batchNums]);

    useEffect(() => {
        // re-center city on city when city changes
        const activeCity = adminCitiesDropdownOptions[activeCityId];
        console.log(activeCityId, activeCity, "72rm");
        const longLatOfCity = [activeCity.centerLong, activeCity.centerLat];
        console.log("centered map on", activeCity.cityName);
        setMapCenter(longLatOfCity);
    }, [activeCityId]);

    useEffect(() => {
        // load task markers when the loaded batch num changes
        setTasks(taskMarkersForBatchNumAndCityId);
    }, [taskMarkersForBatchNumAndCityId]);

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
                            valueReporter={setActiveBatchNumIndex}
                            activeOption={availableBatchNumbers[activeBatchNumIndex]}
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
