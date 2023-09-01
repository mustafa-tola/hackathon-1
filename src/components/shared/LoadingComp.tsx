import Image from "next/image";
import { FC } from "react";
import { Preloader } from "../assets";

const LoadingComp:FC<{size: string}> = ({size}) => {
    return (
        <div className={`${size}`}>
            <Image src={Preloader} alt="Loader"/>
        </div>
    )
}
export default LoadingComp;