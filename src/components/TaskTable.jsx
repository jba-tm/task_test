import React from "react";
import {TaskTableRow} from "./TaskTableRow"

const thead = [
    '#',
    'Username',
    'e-mail',
    'Test',
    'Status',
    'Action'
];

export const TaskTable = ({tasks}) => {
    return (
        <table className="table table-hover">
            <thead>
            <tr>
                {thead.map((item,i)=><th key={i} scope="col">{item}</th>)}
            </tr>
            </thead>
            <tbody>
                {tasks.map((task, i)=><TaskTableRow key={i} task={task}/>)}
            </tbody>
        </table>
    )
}
