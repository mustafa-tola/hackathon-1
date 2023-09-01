import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { client } from "../../../../sanity/lib/client";
import Card from "@/components/views/Card";

const fetchAllProductsForSearch = async () => {
    let response = await client.fetch(`*[_type == 'products']`)
    return response;
}

const Search = async ({ params }: { params: { query: string } }) => {
    let slug = params.query;
    let data = await fetchAllProductsForSearch();
    let dataToMap = data.filter((item: oneProductType) => {
        if(((item.productName).toLowerCase()).indexOf(slug.toLowerCase()) >= 0) {
            return true;
        }
        return false;
    });
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >{dataToMap.length > 0 ? dataToMap.map((item: oneProductType, index: number) => (
            <Card key={index} singleProductData={item} />
        )) : <h1>No Products Found!</h1>}

        </div>
    )
}

export default Search;