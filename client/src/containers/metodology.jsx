import React from 'react';

import { Header } from '../components/header';
import { LeftNavbar } from '../components/leftNavbar';
import { Customization } from '../components/customization';

export const Metodology = () => {
    return (
        <>
            <Header />
            <div className="flexWrapper">
                <LeftNavbar />
                <Customization />
            </div>
        </>
    );
}