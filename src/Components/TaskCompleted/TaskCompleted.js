import React, {useMemo, useState} from 'react';
import './TaskCompleted.scss'
import deleteTask from '../../images/deleteTask.png'

const TaskCompleted = ({task,returnTask, remove}) => {


    return (
        <div className='wrapper__task__completed'>
            <div className="completed__task">
                <input
                    onChange={() => returnTask(task)}
                    checked
                    type="checkbox"/>
               <span>{task.title}</span>
            </div>
            <div className='completed__task_function'>
            <img src={deleteTask} onClick={() => remove(task)}/>
            </div>
        </div>
    );
};

export default TaskCompleted;