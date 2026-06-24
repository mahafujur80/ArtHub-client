import Link from 'next/link';
import React from 'react';
import Logo from '../Share/Logo';
import { DashboardDrawer } from './DashboardDrower';
import { Button } from '@heroui/react';
import { MdHome } from 'react-icons/md';

const DashNavbar = () => {
    return (
        <div >
            <nav className="sticky top-0 z-40 w-full border-b border-separator  backdrop-blur-lg">
                <header className="flex h-16 items-center justify-between px-10">
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <Logo />
                        </Link>
                    </div>
                    <div className="flex items-center ">
                        <Link href="/">
                        <Button className="flex padding-none bg-white items-center gap-2 text-md md:text-lg font-medium text-gray-500 transition-all duration-200 hover:text-orange-500">
                        <MdHome/>
                        Home
                        </Button>
                        </Link>
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