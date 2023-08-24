"use client"
import ContextWrapper, { cartContext } from "@/global/Context";
import Link from "next/link";
import { useContext } from "react";
import SubComp from "./comp/SubComp";

const TopLabel = () => {
    return (
        <ContextWrapper>
            <div className="overflow-hidden py-2 border-b text-gray-100 bg-gray-800">
                <div className="px-4 max-w-7xl mx-auto flex justify-between">
                    <div><a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.herokuapp.com?font=Maven_Pro&weight=200&size=19&pause=1000&vCenter=true&width=435&lines=Here+to+provide+you+with+best+services;Sign+up+to+understand+our+deals;Signup+to+get+big+deals;Here+to+provide+you+with+best+services;Find+variety+of+different+products" alt="Typing SVG" /></a></div>
                    <SubComp />
                </div>
            </div>
        </ContextWrapper>
    )
}

export default TopLabel;

// [![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&width=435&lines=Sign+up+to+get+big+deals;Sign+up+to+understand+our+deals;Nice+to+meet+you;Here+to+provide+you+with+best+services;Find+variety+of+clothes)](https://git.io/typing-svg)
