import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    value: string
    onChange:(newTitle:string)=>void
}
export const EditableSpan = ({value,onChange}: PropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditModeHandler = () => {
        setEditMode(!editMode)
    }
    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        onChange(e.currentTarget.value)
    }
    return (
        <>
            {
                editMode
                    ? <input
                        value={title}
                        onBlur={activateEditModeHandler}
                        autoFocus
                        onChange={changeTitleHandler}
                    />
                    : <span onDoubleClick={activateEditModeHandler}>{value}</span>
            }
        </>
    )
};

