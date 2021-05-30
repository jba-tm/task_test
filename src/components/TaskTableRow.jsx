import React from "react";
import {useHistory} from "react-router-dom";

export const TaskTableRow = (props) => {
    const task = props.task
    const handleClick = (data)=>{
        useHistory.push(`/update-task/${data.id}`)
    }

    return (
        <tr>
            <th scope="row">{task.id}</th>
            <td>{task.username}</td>
            <td>{task.email}</td>
            <td>{task.text}</td>
            <td>{task.status}</td>
            <td><button className="btn btn-primary btn-sm" onClick={event => handleClick(task)}>Update</button></td>
        </tr>
    )
}