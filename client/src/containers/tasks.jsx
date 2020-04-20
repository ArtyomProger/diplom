import React from 'react';

import { Header } from '../components/header';
import { LeftNavbar } from '../components/leftNavbar';
import { TasksComponent } from '../components/tasksComponent';

export const Tasks = () => {
    return (
        <>
            <Header />
            <div className="flexWrapper">
                <LeftNavbar />
                <TasksComponent />
            </div>
        </>
    );
}
