import BASE_PATH_FOR_API from "@/components/shared/BasePath";
import AllProductsComponent from "@/components/views/AllProducts";

async function fetchAllProductData() {
    let res = await fetch(`${BASE_PATH_FOR_API}/api/products?start=0&end=14`)
    if (!res.ok) {
        console.log("Failed to fetch")
    }
    return res.json()
}

const Products = async () => {
    const ProductData = await fetchAllProductData();
    return (
        <AllProductsComponent ProductData={ProductData} />
    )
}

export default Products;