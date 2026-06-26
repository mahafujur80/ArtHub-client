'use client';

import { useState } from "react";
import { Link, Button, Dropdown, Label, Avatar } from "@heroui/react";
import Logo from "./Logo";
import { LuLogOut, LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { NavDropdown } from "./NavDropdown";
import toast from "react-hot-toast";


export default function NavBar() {
    const { data: session } = authClient.useSession()
    const user = session?.user;


    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathName = usePathname();


    const handleLogout = async () => {
        await authClient.signOut()
        toast.success("You have been logged out successfully")
        router.push("/");
    };

    if(pathName.includes('dashboard')){ 
        return
    }

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="mx-auto flex h-16  items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="no-underline"><Logo /></Link>
                    </div>
                </div>
                <div className="hidden md:flex items-center gap-10">
                    <ul className="items-center gap-4 flex">
                        <li>
                            <Link href="/" className={`${pathName === '/' ? "text-white  bg-orange-500 hover:text-white" : ''}  no-underline font-medium py-2 px-4 hover:text-orange-500`}>Home</Link>
                        </li>
                        <li>
                            <Link href="/artwork" className={`${pathName === '/artwork' ? "text-white  bg-orange-500 hover:text-white" : ''}  no-underline font-medium py-2 px-4 hover:text-orange-500`}>
                                Browse Artworks
                            </Link>
                        </li>
                    </ul>

                    {
                        user?.id ? <NavDropdown user={user} /> :
                            <div className=" items-center gap-4 flex">
                                <Link href="/login" className="no-underline font-medium"> <Button variant="outline">Login</Button></Link>
                                <Link href="/signup" className="no-underline" > <Button className=" text-white bg-orange-500 hover:ob-orange-600">Sign Up</Button> </Link>
                            </div>
                    }
                </div>

                {/* menu button */}
                <button
                    className="md:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {
                        isMenuOpen ? <IoClose size={24} /> : <LuMenu size={24} />
                    }
                </button>
            </header>

            {/* mobile menu */}
            {
                isMenuOpen && (
                    <div className="border-t border-separator md:hidden">
                        <div className="flex flex-col gap-2 p-4">
                            <Link href="/" className={` ${pathName === '/' ? "text-white  bg-orange-500" : ''}   w-full no-underline block p-2 font-medium`}>Home</Link>
                            <Link href="/artwork" className={` ${pathName === '/artwork' ? "text-white  bg-orange-500" : ''}  w-full no-underline block p-2 font-medium`}>Browse Artworks</Link>
                        </div>
                        {
                            user ? <div className='p-4'>
                                <Dropdown >
                                    <div className="px-3 pt-3 pb-1">
                                        <div className="flex items-center gap-2">
                                            <Avatar size="md">
                                                <Avatar.Image
                                                    alt="Jane"
                                                    src={user?.image}
                                                />
                                                <Avatar.Fallback delayMs={600}>{user?.name[0].toUpperCase()}</Avatar.Fallback>
                                            </Avatar>
                                            <div className="flex flex-col gap-0">
                                                <p className="text-sm leading-5 font-medium">{user?.name}</p>
                                                <p className="text-xs leading-none text-muted">{user?.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <Dropdown.Menu>
                                        <Dropdown.Item id="dashboard" textValue="Dashboard">
                                            <Link href={`/dashboard/${user?.role}`} ><Label>Dashboard</Label></Link>
                                        </Dropdown.Item>
                                        <Dropdown.Item id="logout" textValue="Logout" variant="danger">
                                            <div onClick={handleLogout} className="flex w-full items-center justify-between gap-2">
                                                <Label>Log Out</Label>
                                                <LuLogOut className="size-3.5 text-danger" />
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>

                                </Dropdown>
                            </div>

                                :

                             <div className="flex items-center gap-4 ">
                                    <Button variant="outline" className="w-full"><Link href="#" className="no-underline font-medium">Login</Link></Button>
                                    <Button className="w-full bg-orange-500 hover:bg-orange-600"><Link href="#" className="no-underline font-medium text-white">Sign Up</Link></Button>
                             </div>
                        }


                    </div>
                )
            }
        </nav >
    );
}