import React from 'react';
import Task from "../Task/Task";

const TaskList = ({tasks, isPostsLoading, postError, remove, editingTask, completedTask}) => {
    if (postError) {
        return (
            <div>
                <h2 style={{color: '#FF6363'}}>Error</h2>
            </div>
        )
    }

    if (isPostsLoading) {
        return (
            <h2>Load !</h2>
        )
    }


    return (
        <div>
            <h2>To do ({tasks.length})</h2>
            {
                tasks.map((task, index) => <Task key={task.id} task={task} remove={remove}
                                                 editingTask={editingTask} completedTask={completedTask}/>)
            }

        </div>
    );
};

export default TaskList;