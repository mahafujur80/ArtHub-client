import Link from 'next/link';
import React from 'react';
import Logo from '../Share/Logo';
import { DashboardDrawer } from './DashboardDrower';

const DashNavbar = () => {
    return (
        <div >
            <nav className="sticky top-0 z-40 w-full border-b border-separator  backdrop-blur-lg">
                <header className="flex h-16 items-center justify-between px-6">
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Logo />
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <ul>
                            <li><Link href="/">Home</Link></li>
                        </ul>
                        <div className=" md:hidden" >
                            <DashboardDrawer />
                        </div>
                    </div>
                </header>
            </nav>
        </div>
    );
};

export default DashNavbar;