import { oneProductType, responseType } from "@/components/utils/ProductsDataArrayAndType";
import Card from "@/components/views/Card";
import { FC } from "react";

async function fetchAllProductsData() {
    let response: Response = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products" && productTypes[0] == "Female"]`, {
        next: {
            revalidate: 60
        }
    })
    if (!response.ok) {
        throw new Error("Failed to fetch");
    }
    return response.json();
}

const Male = async ({ params }: { params: { mtype: string } }) => {
    let res: responseType = await fetchAllProductsData();
    let originalDataSortedOfParams = res.result.filter((items: oneProductType) => items.productTypes[1] == params.mtype)
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >{res.result.map((item: oneProductType, index: number) => (
            <Card key={index} singleProductData={item} />
        ))}</div>
    )
}

export default Male;