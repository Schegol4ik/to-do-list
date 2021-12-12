import React, {useEffect, useMemo, useState} from 'react';
import './Main.scss'
import Completed from "../../Components/Completed/Completed";
import MyInput from "../../Ui/MyInput/MyInput";
import MyButton from "../../Ui/MyButton/MyButton";
import TaskList from "../../Components/TaskList/TaskList";
import {useFetching} from "../../hooks/useFetching";
import NoteService from "../../API/NotesService";
import copy, {CopyToClipboard} from 'react-copy-to-clipboard'


const Main = () => {

    const [tasks, setTasks] = useState([])
    const [valueNewTask, setValueNewTask] = useState('')
    const [validateInput, setValidateInput] = useState(false)
    const [editTask, setEditTask] = useState(false)
    const [selectedTask, setSelectedTask] = useState({})
    const [changeTitle, setChangeTitle] = useState({title: ''})
    const [completedTasks, setCompletedTasks] = useState([])
    const [arr, setArr] = useState(null)


    const [fetchPost, isPostsLoading, postError] = useFetching(async () => {
        const response = await NoteService.getALL()
        setTasks(response.data.filter(({completed}) => !completed))
        setArr(response.data.filter(({completed}) => completed))
    }) //Обработка получения данных

    useEffect(() => {
        fetchPost()
    }, [setTasks]) //получение заметок с back

    const createTask = () => {
        if (!valueNewTask) {
            setTimeout(() => setValidateInput(true))
            setTimeout(() => setValidateInput(false), 500)
        } else {
            let newTask = {
                userId: 2,
                id: tasks.length ? tasks.map(item => item.id).reduce((a, b) => a > b ? a : b) + 1 : 1,
                title: valueNewTask,
                completed: false
            }
            setTasks([...tasks, newTask])
            setValueNewTask('')
        }
    } //Создание заметки

    const removeTask = (task) => {
        setTasks(tasks.filter(t => t.id !== task.id))
    } //Удаление заметки

    const editingTask = (task) => {
        setEditTask(true)
        setChangeTitle(task.title)
        setSelectedTask(task)
    } //Подготовка к замене заметки

    const refreshTask = () => {
        if (!changeTitle) {
            setTimeout(() => setValidateInput(true))
            setTimeout(() => setValidateInput(false), 500)
        } else {
            setTasks(prev => ([
                ...prev.map(item => {
                    if (item.id === selectedTask.id) {
                        item.title = changeTitle
                    }
                    return item
                })
            ]))
            setSelectedTask('')
            setEditTask(false)
        }
    } //Изменение заметки

    const completedTask = (task) => {
        let newObj = {
            ...task,
            id: completedTasks.length
                ? completedTasks.map(item => item.id).reduce((a, b) => a > b ? a : b) + 1
                : 1,
            completed: !task.completed
        }
        setTasks(prev => ([
            ...prev.map(item => {
                if (item.id === task.id) {
                    item.completed = !item.completed
                }
                return item
            })
        ]))
        setArr(prev => [...prev, newObj])
        setTasks(tasks.filter(t => t.id !== task.id))
    } //Создание выполненных задач

    useEffect(() => {
        if (arr) {
            setCompletedTasks(arr.filter(({completed}) => completed))
        }
        if (tasks) {
            // setTasks(tasks.filter(t => t.completed !== tasks.completed))
        }
    }, [arr, tasks]) //Наполнение выполненных задач

    const returnCompletedTask = (task) => {
        let updateTask = {
            ...task,
            id: tasks.length ? tasks.map(item => item.id).reduce((a, b) => a > b ? a : b) + 1 : 1,
            completed: false
        }
        setTasks([...tasks, updateTask])
        setArr(completedTasks.filter(t => t.id !== task.id))
    } //Возвращаем выполненную задачу

    const removeCompletedTask = (task) => {
        setArr(completedTasks.filter(t => t.id !== task.id))
    } //Удаление выполненной заметки


    /*const removeTask = (task) => {
        axios.delete(`https://jsonplaceholder.typicode.com/todos/${task.id}`).then(response => {
            console.log(response.data)
        })
    }*/ // Удаление заметки с сервера

    /*const editingTask = (task) => {
        setEditTask(true)
        setChangeTitle(task.title)
        setSelectedTask(task)

    }
    const refreshTask = () => {
        let refreshTask = {
            ...selectedTask,
            title: changeTitle
        }
        axios.put(`https://jsonplaceholder.typicode.com/todos/${selectedTask.id}`, refreshTask,).then(response => {
            console.log(response.data)
        })
        setSelectedTask('')
        setEditTask(false)
    }*/ // Обновление заметки на сервере

    /*const createTask = () => {
    if (!valueNewTask) {
        setTimeout(() => setValidateInput(true))
        setTimeout(() => setValidateInput(false), 500)
    } else {
        let newTask = {
            userId: 2,
            title: valueNewTask,
            completed: false
        }
        axios.post('https://jsonplaceholder.typicode.com/todos', newTask)
            .then(response => {
                try {
                    setTasks([...tasks, response.data])

                } catch (e) {
                    console.log(e)
                }
            })
        setValueNewTask('')
    }
}*/ //Создание заметки на сервере

    return (
        <div className='wrapper__main'>
            <div className='wrapper__content'>
                <div>
                    <div className='header__content'>
                        <MyInput
                            style={(validateInput) ? {borderColor: 'red'} : {}}
                            value={(editTask) ? changeTitle : valueNewTask}
                            placeholder={(validateInput) ? '+ Add a task first' : '+ Add a task, press Enter to save'}
                            onChange={(editTask)
                                ? (e) => setChangeTitle(e.target.value)
                                : (e) => setValueNewTask(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    if (!editTask) {
                                        createTask()
                                    } else {
                                        refreshTask()
                                    }
                                }
                            }}
                        />
                        <MyButton onClick={(editTask) ? refreshTask : createTask}>{(editTask)
                            ? <span>Save</span>
                            : <span>Add</span>
                        }</MyButton>
                    </div>
                </div>
                <div className='total__main'>
                    Total: {tasks.length}
                </div>
                <div>
                    <TaskList tasks={tasks} isPostsLoading={isPostsLoading} postError={postError}
                              remove={removeTask} editingTask={editingTask} completedTask={completedTask}/>
                </div>
            </div>
            <div className='wrapper__content_completed'>
                <Completed completedTasks={completedTasks} returnTask={returnCompletedTask}
                           remove={removeCompletedTask}/>
            </div>
        </div>
    );
};

export default Main;