import React, { useEffect, useState } from "react";
//
import PageBase from "../PageBase";
import Button from "../../components/button/Button";
import { useGetAllBatchNumsAPI, useGetTaskMarkersByBatchNumAPI } from "../../api/adminAPI";
import { ITask } from "../../interface/Task.interface";

import "./TaskMarkerPage.scss";
import TitledDropdown from "../../components/titledDropdown/TitledDropdown";
import AdminTasksMap from "../../components/map/AdminTasksMap";
import TitledDropdownWithButtons from "../../components/titledDropdownWithButtons/TitledDropdownWithButtons";
import { SEED_CITIES } from "../../util/cities";
import AsAdmin from "../../components/hoc/AsAdmin";
import WithAuthentication from "../../components/hoc/WithAuth";

const TaskMarkerPage: React.FC<{}> = props => {
    // responses from server
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [batchNumbers, setBatchNumbers] = useState<number[]>([]);
    // inputs
    const [cityId, setCityId] = useState<number>(6); // FIXME: city id should come from hardcoded enum or enum-esque thing
    const [activeBatchNum, setActiveBatchNum] = useState<number | undefined>(undefined);
    const [activeCityIndex, setActiveCityIndex] = useState<number | undefined>(undefined);

    const { batchNums, getAllBatchNumsErr, batchNumsIsLoaded } = useGetAllBatchNumsAPI();
    const { taskMarkersForBatchNum, runGetTaskMarkersByBatchNum, getTaskMarkerByBatchNumErr, getTaskMarkersIsLoaded, loadedBatchNum } =
        useGetTaskMarkersByBatchNumAPI();

    useEffect(() => {
        if (batchNumsIsLoaded && batchNums.length !== 0) {
            setBatchNumbers(batchNums);
        }
    }, [batchNumsIsLoaded, batchNumbers.length, batchNums]);

    useEffect(() => {
        const activeBatchNumIsSet = activeBatchNum !== undefined;
        const timeToGetNewTaskMarkers = activeBatchNum !== loadedBatchNum;
        if (activeBatchNumIsSet && timeToGetNewTaskMarkers) {
            runGetTaskMarkersByBatchNum(activeBatchNum);
        }
        const newTaskMarkersAreLoaded = activeBatchNum === loadedBatchNum;
        if (newTaskMarkersAreLoaded) {
            setTasks(taskMarkersForBatchNum);
        }
    }, [activeBatchNum, loadedBatchNum, taskMarkersForBatchNum, runGetTaskMarkersByBatchNum]);

    return (
        <PageBase>
            <div>
                <div id="mapAndOptionsContainer" className="flex w-full ">
                    <div className="w-full mr-4">
                        <AdminTasksMap
                            tasks={tasks}
                            center={[
                                SEED_CITIES[activeCityIndex ? activeCityIndex : 0].centerLat,
                                SEED_CITIES[activeCityIndex ? activeCityIndex : 0].centerLong,
                            ]}
                        />
                    </div>
                    <div id="optionsDropdowns">
                        <TitledDropdownWithButtons
                            title="Batch Number"
                            options={batchNumbers}
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

                    <div className="">
                        <Button type={"Transparent"} text={"Inspect"} onClickHandler={() => {}} />
                    </div>
                </div>
            </div>
        </PageBase>
    );
};

export default WithAuthentication(AsAdmin(TaskMarkerPage));
