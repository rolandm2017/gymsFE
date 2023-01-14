// import axios from "axios";

// import { adminToken } from "../context/AuthContext";

// const baseUrl = process.env.REACT_APP_BACKEND_ADDR;

// const headers = {
//     Authorization: `Bearer ${adminToken}`,
// };

// // this.router.get("/batches/all", authorize([Role.Admin]), this.getAllBatchNumbers.bind(this));
// //this.router.get("/task-queue/all", authorize([Role.Admin]), this.getAllTasks.bind(this));
// //this.router.get("/housing/by-location", authorize([Role.Admin]), this.getApartmentsByLocation.bind(this));
// // /task-queue/markers-by-batch-num
// //this.router.get("/housing/by-city-id-and-batch-num", authorize([Role.Admin]), this.getApartmentsByCityIdAndBatchNum.bind(this));
// //// user stuff
// //this.router.post("/user/ban", authorize([Role.Admin]), this.banUser.bind(this));
// //this.router.post("/user/make-admin", this.makeAdmin.bind(this));

// export async function getAllBatchNumsAdmin() {
//     const path = "/admin/batches/all";
//     const response = await axios.get(baseUrl + path, { headers });
//     const { data } = response;
//     console.log(data);
//     return data.batchNums;
// }

// export async function getAllTasksAdmin(provider: string, batchNum: number) {
//     const path = "/admin/task-queue/all";
//     const response = await axios.get(baseUrl + path, { params: { provider, batchNum }, headers });
//     const { data } = response;
//     console.log(data);
//     return data;
// }

// export async function getTaskMarkersByBatchNumAdmin(batchNum: number) {
//     const path = "/admin/task-queue/tasks-by-batch-num";
//     const response = await axios.get(baseUrl + path, { params: { batchNum }, headers });
//     const { data } = response;
//     console.log(data);
//     return data.tasks;
// }

// export async function getApartmentsByLocationAdmin(cityName: string) {
//     const path = "/admin/housing/by-location";
//     const response = await axios.get(baseUrl + path, { params: { cityName }, headers });
//     const { data } = response;
//     console.log(data);
//     return data.apartments;
// }

// export async function getApartmentsByCityIdAndBatchNum(cityId: number, batchNum: number) {
//     const path = "/admin/housing/by-city-id-and-batch-num";
//     const response = await axios.get(baseUrl + path, { params: { cityId, batchNum }, headers });
//     const { data } = response;
//     console.log(data);
//     return data.apartments;
// }

// // this.router.get("/housing/by-location", authorize([Role.Admin]), this.getApartmentsByLocation.bind(this));
// // this.router.get("/housing/by-city-id-and-batch-num", authorize([Role.Admin]), this.getApartmentsByCityIdAndBatchNum.bind(this));

// // export async function getAllHousingAdmin() {
// //     const path = "/admin/housing/all";
// //     const response = await axios.get(baseUrl + path, { headers });
// //     const { data } = response;
// //     return data.apartments;
// // }

// export async function getAllBatchesAdmin() {
//     const path = "/admin/task-queue/all";
//     const response = await axios.get(baseUrl + path, { headers });
//     const { data } = response;
//     return data.tasks;
// }

// export async function housingHealthCheck() {
//     const path = "/task-queue/health-check";
//     console.log(baseUrl + path, "22rm");
//     const response = await axios.get(baseUrl + path);
//     const { data } = response;
//     console.log(data);
// }
