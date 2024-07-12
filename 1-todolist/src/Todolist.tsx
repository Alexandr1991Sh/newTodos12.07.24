import React, {ChangeEvent, KeyboardEventHandler, useRef, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import styles from './Todolist.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
    title: string,
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    todolistId: string
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (
    {
        title,
        tasks,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        todolistId,
        removeTodolist,
        updateTask,
        updateTodolist
    }) => {

    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [buttonName, setButtonName] = useState<FilterValuesType>('all')

    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            addTask(taskTitle.trim(), todolistId)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: any) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask(taskTitle, todolistId)
        }
    }
    const changeTaskStatusHandler = (taskId: string, e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(taskId, e.currentTarget.checked, todolistId)
    }
    const changeFilterTaskHandler = (value: FilterValuesType) => {
        changeFilter(value, todolistId)
        setButtonName(value)
    }
    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }
    const addTaskCallback = (title: string) => {
        addTask(title, todolistId)
    }
    const changeTodolistTitleHandler = (title: string) => {
        updateTodolist(todolistId, title)
    }
    return (
        <div>
            <div>
                {/*<h3>{title}</h3>*/}
                <h3><EditableSpan value={title} onChange={changeTodolistTitleHandler}/></h3>
                <Button title={'x'} callback={removeTodolistHandler}/>
                {/*<div>*/}
                {/*    <input className={error ? styles.error : ''} onChange={onChangeHandler}*/}
                {/*           onKeyUp={onKeyPressHandler}/>*/}
                {/*    {error && <div className={styles.errorMessage}>{error}</div>}*/}
                {/*    <Button title={'+'} callback={addTaskHandler}/>*/}
                {/*</div>*/}
                <AddItemForm addItem={addTaskCallback}/>
                <ul>
                    {
                        tasks.length ? tasks.map(task => {
                                const changeTaskTitleHandler = (title: string) => {
                                    updateTask(todolistId, task.id, title)
                                }
                                return (
                                    <li key={task.id} className={task.isDone ? styles.isDone : ''}>
                                        <input
                                            type="checkbox"
                                            checked={task.isDone}
                                            onChange={(e) => changeTaskStatusHandler(task.id, e)}
                                        />
                                        {/*<span>{task.title}</span>*/}
                                        <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>
                                        <Button title={'x'} callback={() => removeTask(task.id, todolistId)}/>
                                    </li>
                                )
                            })
                            : 'Тасок нет'
                    }
                </ul>
                <div>
                    <Button className={buttonName === 'all' ? styles.activeFilter : ''} title={'All'}
                            callback={() => changeFilterTaskHandler('all',)}/>
                    <Button className={buttonName === 'active' ? styles.activeFilter : ''} title={'Active'}
                            callback={() => changeFilterTaskHandler('active')}/>
                    <Button className={buttonName === 'completed' ? styles.activeFilter : ''} title={'Completed'}
                            callback={() => changeFilterTaskHandler('completed')}/>
                </div>
            </div>
        </div>
    );
};


