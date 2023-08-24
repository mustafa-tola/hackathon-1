import { cartTable, db } from "@/lib/drizzle"
import { and, eq } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server"

export const GET = async () => {
    try {
        let allCartData = await db.select().from(cartTable)
        return NextResponse.json({
            allCartData
        })
    }
    catch (error) {
        return NextResponse.json({
            error
        })
    }
}

export const POST = async (req: NextRequest) => {
    let request = await req.json();
    try {
        if (request.product_id && request.quantity && request.user_id && request.price) {
            let response = await db.insert(cartTable).values(request).returning();
            return NextResponse.json(response);
        }
        else {
            throw Error("Please put product_id,quantity,user_id")
        }
    } catch (error) {
        return NextResponse.json({
            error
        })
    }
}

export const PUT = async (req: NextRequest) => {
    let request = await req.json();
    try {
        let response = await db.update(cartTable).set(request).where(and(eq(cartTable.product_id, request.product_id),eq(cartTable.user_id,request.user_id))).returning()
        return NextResponse.json(response)
    }
    catch (error) {
        return NextResponse.json({
            error
        })
    }
}

export const DELETE = async (req: NextRequest) => {
    let url = req.nextUrl.searchParams;
    try {
        if (url.has("product_id") && url.has("user_id")) {
            let response = db.delete(cartTable).where(and(eq(cartTable.product_id, (url.get("product_id") as string)),eq(cartTable.product_id, (url.get("product_id") as string)))).returning()
            return NextResponse.json({ response })
        }
    }
    catch (error) {
        return NextResponse.json({
            error
        })
    }
}