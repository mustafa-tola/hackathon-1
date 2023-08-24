"use client"
import React, { useState } from "react";
import Image from "next/image";
import { NavbarArray, NavbarItemType } from "../../utils/NavbarArrayAndTypes";
import Link from "next/link";
import { Search, ChevronDown, Menu, X } from "lucide-react";
import DropDown from "./subComponents/DropDown"
import Expand from "./subComponents/Expand";
import { useRouter } from "next/navigation";
import ContextWrapper from "@/global/Context";
import CartState from "./subComponents/CartState";

const Navbar = () => {
    const router = useRouter();
    const [isNavbarOpened, setIsNavbarOpened] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchCalledFunction = (e: any) => {
        if (e.key == "Enter" && e.keyCode == 13) {
            router.push(`/search/${searchQuery}`);
        }
    }
    return (
        <ContextWrapper>
            <div className="sticky top-0 backdrop-blur-lg bg-opacityDownColor z-20">
                <div className="py-6 flex justify-between items-center space-x-8">
                    <Link href="/" className="w-36 flex-shrink-0">
                        <Image width={500} height={500} src={"/logo.jpg"} alt={"Logo"} />
                    </Link>
                    <div className="hidden lg:flex justify-between items-center flex-1 w-full">
                        <ul className="flex space-x-4 font-medium text-lg text-purple-950">
                            {NavbarArray.map((item: NavbarItemType, index: number) => (
                                <li key={index} className="flex items-center gap-1 relative rounded-sm px-3 py-1 hover:bg-gray-100 cursor-pointer group">
                                    <Link className="hover:underline" href={item.href}>{item.label}</Link>
                                    {item.isDropDown ? <ChevronDown className="mt-1 rotate-180 group-hover:rotate-0 duration-300" size={15} /> : ""}
                                    {item.isDropDown && <div className="invisible group-hover:visible absolute left-0 top-8 mt-2 py-4 px-6 bg-gray-100 font-light min-w-[7rem]">
                                        <DropDown item={item} />
                                    </div>}
                                </li>
                            ))}
                        </ul>
                        <div className="border flex items-center text-gray-600 px-3 rounded-md">
                            <Search />
                            <input type="text" className="focus:outline-none pl-1 pr-5 py-1 w-80 flex-grow" placeholder="Search In Our Store" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} onKeyDown={handleSearchCalledFunction} />
                        </div>
                        {/* <div className="flex-shrink-0 relative w-11 h-11 bg-gray-300 rounded-full flex items-center justify-center">
                            <div className="w-4 h-4 absolute top-1 right-1 bg-red-400 rounded-full text-xs font-light flex justify-center items-center">{cartItemNumber}</div>
                            <ShoppingCart size={25} />
                        </div> */}
                        <CartState />
                    </div>
                    <div onClick={() => setIsNavbarOpened(!isNavbarOpened)}>
                        {isNavbarOpened ?
                            (
                                <div className="flex lg:hidden">
                                    <X size={30} />
                                </div>
                            )
                            :
                            (
                                <div className="flex lg:hidden">
                                    <Menu size={25} />
                                </div>
                            )
                        }
                    </div>
                    {isNavbarOpened && <MobileNavbar />}
                </div>
            </div>
        </ContextWrapper>
    )
}

const MobileNavbar = () => {
    return (
        <div className="w-full px-6 py-4 bg-gray-100">{
            NavbarArray.map((item: NavbarItemType, index: number) => (
                <Expand key={index} item={item} />
            ))
        }</div>
    )
}

export default Navbar;