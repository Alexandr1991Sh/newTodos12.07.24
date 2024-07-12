import React from 'react';

type ButtonPropsType = {
    title: string
    callback?:()=>void
    className?:string
}

export const Button = ({title, callback,className}: ButtonPropsType) => {
    return (
        <button className={className} onClick={callback}>{title}</button>
    );
};
