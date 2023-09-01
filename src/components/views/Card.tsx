import Image from "next/image"
import { FC } from "react";
import { oneProductType } from "../utils/ProductsDataArrayAndType";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../sanity/lib/client";
import PortableText from "react-portable-text"
import Link from "next/link";

const builder = imageUrlBuilder(client);

const urlFor = (source: any) => {
    return builder.image(source)
}

const Card: FC<{ singleProductData: oneProductType }> = ({ singleProductData }) => {
    console.log("Image: ",singleProductData.slug.current);
    return (
        <Link href={`/catalog/${singleProductData.slug.current}`}>
            <div className="border-4 max-w-sm min-w-[24rem] space-y-3.5 select-none hover:scale-110 duration-300">
                <div className="relative w-full">
                    <div className="absolute inset-0 z-10" />
                    <Image src={urlFor(singleProductData.image[0]).width(1000).height(1000).url()} alt={singleProductData.image[0].alt} width={1000} height={1000} />
                </div>
                <div className="space-y-2 text-gray-800 font-semibold text-lg select-none">
                    <h6>{singleProductData.productName}</h6>
                    <h6>
                        <PortableText className="text-sm font-medium" content={singleProductData.description} />
                    </h6>
                    <h6>${singleProductData.price}</h6>
                </div>
            </div>
        </Link>
    )
}

export default Card;