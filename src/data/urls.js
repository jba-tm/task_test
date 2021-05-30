import {AuthDataTypes} from "./store/auth/types";
import {TaskDataTypes} from "./store/task/types";

const protocol = process.env.REACT_APP_SERVER_PROTOCOL
const hostname = process.env.REACT_APP_SERVER_HOST_NAME
const port = process.env.REACT_APP_SERVER_PORT

export const RestUrls = {
    [AuthDataTypes.AUTH]: `${protocol}://${hostname}:${port}/api/login/`,
    [TaskDataTypes.TASKS]: `${protocol}://${hostname}:${port}/api/?developer=anerg`,
    [TaskDataTypes.TASK_CREATE]: `${protocol}://${hostname}:${port}/api/create/`,
    [TaskDataTypes.TASK_UPDATE]: `${protocol}://${hostname}:${port}/api/edit/`,
}
