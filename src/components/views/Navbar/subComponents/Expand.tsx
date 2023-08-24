import { NavbarItemType } from "@/components/utils/NavbarArrayAndTypes"
import { ChevronDown } from "lucide-react";
import Link from "next/link"
import { FC, useState } from "react"

const Expand: FC<{ item: NavbarItemType }> = ({ item }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const [isTimeOut,setIsTimeOut] = useState<boolean>(false);
    
    const handleExpand = () => {
        setIsExpanded(!isExpanded);
        setTimeout(() => {
            setIsTimeOut(!isTimeOut);
        },200);
    }

    return (
        <li className={`${isExpanded ? "h-48" : "h-12"} list-none border duration-300`}>
            <div className="flex items-center justify-between hover:bg-gray-600 rounded-md duration-300 py-2 px-3" onClick={() => {handleExpand}}>
                <Link href={item.href}>{item.label}</Link>
                {item.isDropDown ? <ChevronDown className="mt-1 rotate-180 group-hover:rotate-0 duration-300" size={15} /> : ""}
            </div>
            <div className="flex flex-col space-y-1 mt-2">
                {isTimeOut && item.dropDownData?.map((subItem: NavbarItemType, index: number) => (
                    <Link key={index} href={subItem.href} className="hover:bg-gray-50 rounded-md py-1 px-5 duration-300 ">
                        {subItem.label}
                    </Link>
                ))}
            </div>
        </li>
    )
}

export default Expand