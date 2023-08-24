import { NextRequest, NextResponse } from "next/server";
import { SanityClient } from "sanity";
import imageUrlBuilder from "@sanity/image-url";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";

export async function GET(request: NextRequest) {
    const originalData: Array<oneProductType> = [];
    const url = request.nextUrl.searchParams;
    let response: Response = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products"]`, {
        next: {
            revalidate: 60
        }
    })
    let dataFromApi = await response.json()
    originalData.push(...dataFromApi.result);
    if (url.has("start") || url.has("end")) {
        if (originalData[Number(url.get("start"))]) {
            let productArray = originalData.slice(Number(url.get("start")), Number(url.get("end")))
            return NextResponse.json({ productArray })
        }
        return NextResponse.json({ productArray: "Not found" })
    }
    return NextResponse.json({ originalData })
}