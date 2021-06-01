import React from "react";
import {Link} from "react-router-dom";

export const TaskTableRow = (props) => {
    const task = props.task
    return (
        <tr>
            <th scope="row">{task.id}</th>
            <td>{task.username}</td>
            <td>{task.email}</td>
            <td>{task.text}</td>
            <td>{task.status}</td>
            <td><Link className="btn btn-primary btn-sm" to={`/update-task/${task.id}`}>Update</Link></td>
        </tr>
    )
}