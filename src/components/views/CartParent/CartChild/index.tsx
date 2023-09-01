"use client";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { cartContext } from "@/global/Context";
import { Trash2 } from "lucide-react";
import Image from "next/image"
import { FC, useContext, useEffect, useState } from "react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../../sanity/lib/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import BASE_PATH_FOR_API from "@/components/shared/BasePath";
import LoadingComp from "@/components/shared/LoadingComp";

const builder = imageUrlBuilder(client);

const urlFor = (source: any) => {
    return builder.image(source)
}

const errorNotification = (msg: string) => {
    toast(msg, {
        // duration: 4000,
        position: 'top-right',

        // Styling
        // style: {},
        // className: 'text-xl font-bold',

        // Custom Icon
        icon: '👏'

        // Change colors of success/error/loading icon
        // iconTheme: {
        //   primary: '#000',
        //   secondary: '#fff',
        // },

        // Aria
        // ariaProps: {
        //   role: 'status',
        //   'aria-live': 'polite',
    },
    );
}

const CartComp = async ({ allProductsOfStore }: { allProductsOfStore: Array<oneProductType> }) => {
    // let { state } = useContext(cartContext);
    const [allProductsForCart, setAllProductsForCart] = useState<Array<oneProductType> | []>([])
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [loadings, setLoadings] = useState<boolean>(false);
    // const [stateStorage, setStateStorage] = useState(undefined)
    // const [refresh,setRefresh] = useState(false)
    // setTimeout(() => {
    // setRefresh(true)
    // },5000)
    // state?.cart.forEach((element: {productId: string, quantity: number}) => {
    // for(let index = 0;index < allProductsOfStore.length; index++) {
    // const item:oneProductType = allProductsOfStore[index];
    // if(item._id == element.productId) {
    // setAllProductsForCart([...allProductsForCart,item])
    // }
    // }
    // })
    let { cartArray, userData, dispatch, loading, setLoading } = useContext(cartContext);
    let router = useRouter();
    const priceSubTotal = () => {
        let orignalToSend: number = 0;
        allProductsForCart && allProductsForCart.forEach((element: oneProductType) => {
            let subTotalPrice = element.quantity * element.price;
            orignalToSend = orignalToSend + subTotalPrice;
        });
        if (orignalToSend !== 0) {
            setTotalPrice(orignalToSend);
            router.refresh();
        }
    }
    // if (cartArray.length != 0) {
    //     priceSubTotal(1);
    // }
    useEffect(() => {
        if (cartArray.length) {
            let data = allProductsOfStore.filter((item: oneProductType) => {
                for (let index = 0; index < cartArray.length; index++) {
                    let element = cartArray[index];
                    if (element.product_id == item._id && element.user_id == userData.uuid) {
                        return true
                    }
                }
            })
            setAllProductsForCart(data)
        }
    }, [cartArray, allProductsForCart])
    useEffect(() => {
        if(allProductsForCart.length == 0) { setTotalPrice(0); }
        priceSubTotal();

    }, [allProductsForCart])
    const handleRemove = (product_id: string) => {
        if (userData) {
            let user_id = userData.uuid;
            dispatch("removeFromCart", { product_id, user_id })
        }
    }
    const handleDecrementByOne = async (product_id: string, price: any) => {
        let stableQuantity: number = 0;
        cartArray.forEach((item: any) => {
            if (item.product_id == product_id) {
                stableQuantity = item.quantity;
            }
        })
        if (stableQuantity - 1 <= 0) {
            errorNotification("Can not accept quantity lower than 1");
        }
        else {
            let returnedVal = await dispatch("updateCart", {
                product_id: product_id, quantity: stableQuantity - 1, user_id: userData.uuid, price: price
            })
            errorNotification("Decremented by One.");
        }
        priceSubTotal();
    }
    const handleIncrementByOne = async (product_id: string, price: any) => {
        let stableQuantity: number = 0;
        cartArray.forEach((item: any) => {
            if (item.product_id == product_id) {
                stableQuantity = item.quantity;
            }
        })
        await dispatch("updateCart", {
            product_id: product_id, quantity: stableQuantity + 1, user_id: userData.uuid, price: price
        })
        errorNotification("Incremented by One.");
    }
    const handleProcessCheckout = async () => {
        setLoadings(true);
        let linkOrg: any = await fetch(`${BASE_PATH_FOR_API}/api/checkout_sessions`, {
            method: "POST",
            body: JSON.stringify(allProductsForCart)
        });
        if (linkOrg) {
            let { link } = await linkOrg.json();
            window.location.href = link;
        }
        setLoadings(false);
    }
    return (
        <div className="py-10 px-4 md:px-10">
            <div className="py-6">
                <h1 className="font-semibold text-2xl text-gray-900">Shopping Cart</h1>
            </div>
            <div className="md:flex-col lg:flex-row flex gap-6">
                <div className="flex flex-col basis-[69%] gap-2">
                    {allProductsForCart ? allProductsForCart.map((item: oneProductType, index: number) => (
                        <div key={index} className="flex flex-shrink-0 gap-6">
                            <div className="w-[14rem]">
                                <Image className="rounded-xl" width={1000} height={1000} src={urlFor(item.image[0]).width(1000).height(1000).url()} alt={item.image[0].alt} />
                            </div>
                            <div className="space-y-1 md:space-y-3 w-full">
                                <div className="flex justify-between">
                                    <h2 className="text-lg md:text-2xl font-light text-gray-700">{item.productName}</h2>
                                    {loading ? <LoadingComp size={"w-10"} /> :
                                        <div className="cursor-pointer" onClick={() => handleRemove(item._id)}>
                                            <Trash2 size={28} />
                                        </div>}
                                </div>
                                <p className="text-gray-400 font-medium">{item.productTypes[1] ? item.productTypes[1] : "All"}</p>
                                <h3 className="text-sm md:text-base">Delivery Estimation</h3>
                                <h4 className="text-orange-400 font-semibold text-lg md:text-xl">5 Working Days</h4>
                                <div className="flex justify-between">
                                    <p className="font-semibold md:text-lg">{"$"}{item.price}</p>
                                    <div className={`flex gap-2 items-center text-lg ${loading ? 'opacity-25' : 'opacity-100'}`}>
                                        <button disabled={loading} onClick={() => handleDecrementByOne(item._id, item.price)} className="select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full bg-gray-200">
                                            -
                                        </button>
                                        <p>
                                            {cartArray.map((subItem: any) => {
                                                let matching = subItem.productId == item._id;
                                                let quantity = subItem.quantity;
                                                if (matching) {
                                                    return quantity;
                                                }
                                                else {
                                                    return "";
                                                }
                                            })}
                                        </p>
                                        <button disabled={loading} onClick={() => handleIncrementByOne(item._id, item.price)} className="border select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full"
                                        >
                                            +
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    )) : !userData ? (
                        <div className="text-center font-semibold text-gray-800 text-xl">Please login First</div>
                    ) :
                        arrayForLoading.map((index: number) => (
                            <div key={index} className="border border-blue-300 shadow rounded-md p-4 w-full mx-auto">
                                <div className="flex animate-pulse gap-4">
                                    <div className="bg-slate-200 rounded-lg h-32 w-4/12"></div>
                                    <div className="flex-1 space-y-6 py-1">
                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                                        </div>
                                        <div className="space-y-3">
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                            <div className="h-2 bg-slate-200 rounded"></div>
                                        </div>
                                        <div className="h-8 w-16 bg-slate-200 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
                <div className="basis-1/4 space-y-6 px-6">
                    <h6 className="font-semibold text-xl">Order Summary</h6>
                    <div className="flex justify-between">
                        <p className="text-lg font-light">Quantity: </p>
                        <p>{cartArray.length} Products</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-lg font-light">Subtotal: </p>
                        <p>${totalPrice}</p>
                    </div>
                    <button onClick={handleProcessCheckout} className="bg-gray-900 border-gray-500 text-white border px-4 py-2 w-full">{loadings ? "Loading..." : "Proceed to Checkout"}</button>
                </div>
            </div>
        </div>
    )
}

export default CartComp;

let arrayForLoading = [1, 2, 3, 4]