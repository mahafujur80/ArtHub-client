import { DashboardDrawer } from '@/Components/Dashboard/DashboardDrower';
import Sidebar from '@/Components/Dashboard/DashboardSideNav';
import DashNavbar from '@/Components/Dashboard/DashNavbar';
import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen overflow-hidden">
            <div className="shrink-0">
                <Sidebar />
            </div>

            <div className="flex flex-1 flex-col">
                <DashNavbar />

                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;