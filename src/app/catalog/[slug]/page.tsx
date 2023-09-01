"use client"
import BASE_PATH_FOR_API from "@/components/shared/BasePath";
import { oneProductType, responseType } from "@/components/utils/ProductsDataArrayAndType";
import ProductDetail from "@/components/views/ProductDetail";
import ContextWrapper from "@/global/Context";
import { Metadata } from "next";
import { FC } from "react";

export async function generateMetadata(
    { params }: { params: { slug: string } }
) {
    // read route params
    const slug = params.slug

    // fetch data
    const product = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products"]`).then((res: any) => res.json())

    const titleToSet:oneProductType = product.result.find((item: oneProductType) => item.slug.current === slug)
    return {
        title: titleToSet.productName,
        description: titleToSet.description
    }
}

const fetchPreviewData = async (slug: string) => {
    let res = await fetch(`https://19f7v5q3.api.sanity.io/v2023-07-25/data/query/production?query=*%5B_type+%3D%3D+%22products%22+%26%26+slug.current+%3D%3D+%27flex-sweatshirt%27%5D`)
    return res.json()
}


export async function generateStaticParams() {
    let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products"]`).then((res: any) => res.json())
    return res.result.map((item: oneProductType) => { slug: item.slug })
}



const Catalog: FC<{ params: { slug: string } }> = async ({ params }) => {
    console.log()
    let Data: responseType = await fetchPreviewData(params.slug)
    return (
        <ContextWrapper>
            <ProductDetail item={Data.result[0]} />
        </ContextWrapper>
    )
}

export default Catalog; 
