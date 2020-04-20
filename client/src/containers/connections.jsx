import React from 'react';

import { Header } from '../components/header';
import { Connection } from '../components/connection';
import { LeftNavbar } from '../components/leftNavbar';

export const Connections = () => {
    return (
        <>
            <Header />
            <div className="flexWrapper">
                <LeftNavbar />
                <Connection />
            </div>
        </>
    );
}