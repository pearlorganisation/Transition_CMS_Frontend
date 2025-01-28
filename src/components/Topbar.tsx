'use client';
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "../../public/img/logo.png";

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Team", path: "/team" },
    { name: "Impact", path: "/impact" },
    { name: "Insights", path: "/insight" },
];

export default function Topbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const isActive = (path: string) => path === pathname;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`navbar w-full max-w-full py-9 top-0 left-0 right-0 transition-colors duration-300 ${isScrolled ? 'bg-white shadow' : 'bg-transparent'}`}>
            <div className="navbar-start px-5">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.path}
                                    className={isActive(link.path) ? "active" : ""}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link href="/contact" className="btn btn-secondary text-black btn-sm mt-2">Contact Us</Link>
                        </li>
                    </ul>
                </div>
                <Link href="/" className="btn btn-ghost max-h-6">
                    <Image
                        className="dark:invert h-6 w-auto"
                        src={logo}
                        alt="Transition VC logo"
                        width={180}
                        height={38}
                        priority
                    />
                </Link>
            </div>
            <div className="navbar-end px-7 gap-3 hidden lg:flex lg:ml-48 ">
                <div role="tablist" aria-label="Main Tabs" className="tabs tabs-lg tabs-bordered gap-3 font-semibold">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.path}
                            role="tab"
                            aria-selected={isActive(link.path)}
                            className={isActive(link.path) ? "tab tab-active px-0 mx-[1.25rem]" : "tab px-0 mx-[1.25rem]"}
                            style={{ borderColor: isActive(link.path) ? "#12BAAA" : "transparent" }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <Link href="/contact" className="btn btn-secondary text-black btn-xs sm:btn-sm md:btn-md lg:btn-lg place-self-start grow max-w-52">Contact Us</Link>
            </div>
        </div>
    );
}