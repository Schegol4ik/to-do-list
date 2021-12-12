import React, {useMemo} from 'react';
import './Completed.scss'
import TaskCompleted from "../TaskCompleted/TaskCompleted";

const Completed = ({completedTasks, returnTask, remove}) => {

    return (
        <div className='wrapper__completed'>
            <h2>Completed ({completedTasks.length})</h2>
            {(completedTasks === undefined)
                ? <span></span>
                : completedTasks.map((task, index) => <TaskCompleted  key={task.id} task={task}
                                                                      remove={remove} returnTask={returnTask}/>)
            }
        </div>
    );
};

export default Completed;