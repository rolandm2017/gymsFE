import React, { useEffect, useState } from "react";
//
import PageBase from "../PageBase";
import { IHousing } from "../../interface/Housing.interface";
import Button from "../../components/button/Button";
import {
    getAllBatchesAdmin,
    getAllBatchNumsAdmin,
    getApartmentsByLocationAdmin,
    getTaskMarkersByBatchNumAdmin,
    housingHealthCheck,
} from "../../api/queries/AdminQueries";
import { ITask } from "../../interface/Task.interface";
import AdminMap from "../../components/map/AdminApartmentsMap";

import "./TaskMarkerPage.scss";
import TitledDropdown from "../../components/titledDropdown/TitledDropdown";
import AdminTasksMap from "../../components/map/AdminTasksMap";
import TitledDropdownWithButtons from "../../components/titledDropdownWithButtons/TitledDropdownWithButtons";
import { SEED_CITIES } from "../../util/cities";

const TaskMarkerPage: React.FC<{}> = props => {
    // responses from server
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [batchNumbers, setBatchNumbers] = useState<number[]>([]);
    // inputs
    const [cityId, setCityId] = useState<number>(6);
    const [activeBatchNum, setActiveBatchNum] = useState<number>(0);
    const [activeCityId, setActiveCityId] = useState<number | undefined>(undefined);
    // const [longitude, setLongitude] = useState<number>(0);
    // const [latitude, setLatitude] = useState<number>(0);
    // const [zoom, setZoom] = useState<number>(10);

    useEffect(() => {
        const fetchAllBatchNums = async () => {
            const batchNumsFromServer = await getAllBatchNumsAdmin();
            console.log(batchNumsFromServer, "29rm");
            setBatchNumbers(batchNumsFromServer);
        };
        fetchAllBatchNums();
    }, []);

    useEffect(() => {
        console.log("here 42rm");
        const fetchBatchData = async () => {
            // const results = await getBatchesAdmin(provider, batchNum);
            console.log("getting task markers for batch num " + activeBatchNum, "44rm");
            const tasks = await getTaskMarkersByBatchNumAdmin(1);
            console.log("taskMarkers: ", tasks, "25rm");
            setTasks(tasks);
        };
        fetchBatchData();
    }, [activeBatchNum]);

    return (
        <PageBase>
            <div>
                <div id="mapAndOptionsContainer" className="flex w-full ">
                    <div className="w-full mr-4">
                        {tasks && tasks.length > 0 ? <AdminTasksMap tasks={tasks} center={[tasks[0].lat, tasks[0].long]} /> : null}
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
                            valueReporter={setActiveCityId}
                            activeOption={activeCityId}
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

export default TaskMarkerPage;
