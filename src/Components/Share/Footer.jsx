'use client';

import Link from "next/link";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaGithub,
    FaYoutube,
} from "react-icons/fa";
import Logo from "./Logo";
import { usePathname } from "next/navigation";

export default function Footer() {

    // no access in dashboard
    const pathName = usePathname();
    if(pathName.includes('dashboard')){ 
        return
    }

    return (
        <footer className="bg-black text-white  border-t border-white/10">
            <div className="container mx-auto px-6 py-10">

                {/* TOP GRID */}
                <div className="grid gap-12 md:grid-cols-3">

                    {/* LEFT - COMPANY + SOCIAL */}
                    <div>
                        <Logo></Logo>

                        <p className="mt-4 text-sm text-white/70 leading-relaxed">
                            Discover and collect original artworks from talented artists
                            around the world. A simple and secure marketplace for creativity.
                        </p>


                    </div>

                    {/* MIDDLE - QUICK LINKS */}
                    <div className="grid grid-cols-2 gap-10">

                        <div>
                            <h3 className="text-lg font-semibold text-orange-500 mb-4">
                                Quick Links
                            </h3>

                            <ul className="space-y-2 text-sm text-white/70">
                                <li><Link href="#" className="hover:text-orange-500">About Us</Link></li>
                                <li><Link href="#" className="hover:text-orange-500">Careers</Link></li>
                                <li><Link href="#" className="hover:text-orange-500">Blog</Link></li>
                                <li><Link href="#" className="hover:text-orange-500">Contact</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-orange-500 mb-4">
                                Follow Us
                            </h3>

                            <ul className="flex flex-col gap-3 text-white/80">
                                <li>
                                    <Link href="#" className="flex items-center gap-2 hover:text-orange-500 transition">
                                        <FaFacebookF /> Facebook
                                    </Link>
                                </li>

                                <li>
                                    <Link href="#" className="flex items-center gap-2 hover:text-orange-500 transition">
                                        <FaTwitter /> Twitter
                                    </Link>
                                </li>

                                <li>
                                    <Link href="#" className="flex items-center gap-2 hover:text-orange-500 transition">
                                        <FaInstagram /> Instagram
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="flex items-center gap-2 hover:text-orange-500 transition">
                                        <FaGithub /> GitHub
                                    </Link>
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* RIGHT - NEWSLETTER */}
                    <div>
                        <h3 className="text-lg font-semibold text-orange-500 mb-4">
                            Newsletter
                        </h3>

                        <p className="text-sm text-white/70 mb-4">
                            Get updates about new artworks and artists.
                        </p>

                        <div className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 rounded-lg bg-white/10 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-orange-500"
                            />

                            <button className="bg-orange-500 text-black py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                                Subscribe
                            </button>
                        </div>
                    </div>

                </div>

                {/* DIVIDER */}
                <div className="my-5 border-t border-white/10"></div>

                {/* BOTTOM */}
                <div className="flex  items-center justify-center text-sm text-white/60 ">
                    <p>
                        © {new Date().getFullYear()} ArtHub. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}