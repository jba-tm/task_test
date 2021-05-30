import React from "react";

export const TaskTableRow = (props) => {
    const task = props.task
    return (
        <tr>
            <th scope="row">{task.id}</th>
            <td>{task.username}</td>
            <td>{task.email}</td>
            <td>{task.text}</td>
            <td>{task.status}</td>
        </tr>
    )
}