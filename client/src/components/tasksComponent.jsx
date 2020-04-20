import React from 'react';
import './tasksComponent.css';
import { TasksEl } from './tasksEl';

export const TasksComponent = () => {
    return (
        <div className="tasksComponent_wrapper">
            <TasksEl
                title="Надо сделать"
                bgcolor="#2D9CDB" />
            <TasksEl
                title="В процессе"
                bgcolor="#2AD7D0" />
            <TasksEl
                title="Сделано"
                bgcolor="#3E488B" />
        </div>
    );
}