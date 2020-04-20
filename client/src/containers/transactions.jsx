import React from 'react';

import { Header } from '../components/header';
import { Transaction } from '../components/transaction';
import { LeftNavbar } from '../components/leftNavbar';

export const Transactions = () => {
    return (
        <>
            <Header />
            <div className="flexWrapper">
                <LeftNavbar />
                <Transaction />
            </div>
        </>
    );
}