import React, {useState} from 'react';
import './Task.scss'
import editTask from '../../images/editTask.png'
import copyTaskIcon from '../../images/copyTask.png'
import deleteTask from '../../images/deleteTask.png'
import {CopyToClipboard} from "react-copy-to-clipboard";

const Task = ({task, remove,editingTask,completedTask}) => {

    return (
        <div className='wrapper__task'>
            <div className="content__task">
                <input
                    onChange={() => completedTask(task)}
                    type="checkbox"/>
               <span>{task.title}</span>
            </div>
            <div className="functions__task">
                <img src={editTask} onClick={() => editingTask(task)}/>
                <CopyToClipboard text={task.title}>
                <img src={copyTaskIcon}/>
                </CopyToClipboard>
                <img src={deleteTask} onClick={() => remove(task)}/>
            </div>
        </div>
    );
};

export default Task;