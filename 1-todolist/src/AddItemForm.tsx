import React, {ChangeEvent, useState} from 'react';
import {Button} from "./Button";
import styles from './Todolist.module.css'

type TodolistPropsType = {
    addItem: (title: string) => void,
}

export const AddItemForm: React.FC<TodolistPropsType> = ({addItem}) => {

    const [error, setError] = useState<string | null>(null)
    const [title, setTitle] = useState('')

    const addItemHandler = () => {
        if (title.trim()) {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: any) => {
        setError(null)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <div>
                <div>
                    <input
                        className={error ? styles.error : ''}
                        value={title}
                        onChange={onChangeHandler}
                        onKeyUp={onKeyPressHandler}/>
                    {error && <div className={styles.errorMessage}>{error}</div>}
                    <Button title={'+'} callback={addItemHandler}/>
                </div>
            </div>
        </div>
    );
};


