import React from 'react';

import { Header } from '../components/header';
import { Customer } from '../components/customer';
import { LeftNavbar } from '../components/leftNavbar';

export const Customers = () => {
    return (
        <>
            <Header />
            <div className="flexWrapper">
                <LeftNavbar />
                <Customer />
            </div>
        </>
    );
}