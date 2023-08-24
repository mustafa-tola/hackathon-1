import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
interface typeOfData {
    price: string;
    name: string,
    quantity: number
}
let originalData: Array<typeOfData> = [
    {
        price: "price_1NiBppLkYDBRNNinSBvNNOsv",
        name: "Flex Sweatshirt",
        quantity: 1
    },
    {
        price: "price_1NiKvaLkYDBRNNinvOQkg6zZ",
        name: "Imperial Alpaca Hoodie",
        quantity: 1
    },
    {
        price: "price_1NiKjVLkYDBRNNinCmktjuFm",
        name: "Cameryn Sash Tie Dress",
        quantity: 1
    },
    {
        price: "price_1NiKhoLkYDBRNNintYAYD519",
        name: "Flex Sweatpants",
        quantity: 1
    },
    {
        price: "price_1NiKxrLkYDBRNNinXVYQudZi",
        name: "Flex Push Button Bomber",
        quantity: 1
    }
]
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
export const POST = async (req: NextRequest) => {
    let cartItemsArray = await req.json();
    try {
        let line_item = originalData.filter((item: typeOfData) => {
            for (let index = 0; index < cartItemsArray.length; index++) {
                const element: oneProductType = cartItemsArray[index];
                if (element.productName == item.name) {
                    return true
                }
            }
        })
        let itemsToSend = line_item.map((item: typeOfData) => {
            return {
                price: item.price,
                quantity: item.quantity
            }
        })
        let session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: "price_1NiKxrLkYDBRNNinXVYQudZi",
                    quantity: 1
                },
            ],
            mode: "payment",
            success_url: `${req.nextUrl.origin}/?success=true`,
            cancel_url: `${req.nextUrl.origin}/?success=false`
        })
        return NextResponse.json({ link: session.url })
    } catch (error) {
        return NextResponse.json({ error });
    }
}