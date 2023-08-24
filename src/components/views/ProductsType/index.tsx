import Image from "next/image"

const ProductsType = () => {
    return (
        <div className="py-16 px-2 space-y-5">
            <div className="text-center border space-y-3">
                <p className="text-blue-800 text-sm">PROMOTIONS</p>
                <h3 className="text-2xl text-gray-900 font-bold">Our Promotions Events</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-5 px-6 text-gray-800">
                <div className="w-full flex flex-col md:flex-row col-span-2 bg-cat1 px-12 items-center justify-between">
                    <div className="max-w-[13rem] py-8">
                        <h4 className="text-3xl font-extrabold">
                            Get Upto 60% OFF
                        </h4>
                        <p className="text-xl">For the summer season</p>
                    </div>
                    <div className="w-64">
                        <Image width={1000} height={1000} alt={"Summer Season"} src={"https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fevent1.6f776995.png&w=640&q=75"} />
                    </div>
                </div>
                <div className="w-full row-span-1 md:row-span-2 h-full flex flex-col items-center row-span-2 mt-6 h-44 bg-cat3">
                    <div className="p-4 text-start">
                        <p>Flex Sweatshirt</p>
                        <p className="text-lg"><del>$100.00</del>&nbsp;&nbsp;&nbsp;<b className="no-underline text-lg"><ins>$75.00</ins></b></p>
                    </div>
                    <div className="w-64">
                        <Image width={1000} height={1000} alt={"Sweaters"} src={"https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fevent2.b5f201ac.png&w=640&q=75"} />
                    </div>
                </div>
                <div className="w-full row-span-1 md:row-span-2 h-full bg-cat4 flex flex-col md:flex-row items-center">
                    <div className="p-4">
                        <p>Flex Sweatshirt</p>
                        <p className="text-lg"><del>$225.00</del>&nbsp;&nbsp;&nbsp;<b className="no-underline text-lg"><ins>$190.00</ins></b></p>
                    </div>
                    <div className="w-64">
                        <Image width={1000} height={1000} alt={"Sweaters"} src={"https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fevent2.b5f201ac.png&w=640&q=75"} />
                    </div>
                </div>
                <div className="py-9 h-[13rem] text-white w-full h-28 col-auto md:col-span-2 bg-cat2 flex sm:flex-col justify-center items-center space-y-3">
                    <h3 className="text-white font-extrabold text-4xl">Get 30% Off</h3>
                    <p>USE PROMO CODE</p>
                    <button
                        aria-label={"Redirect user at Dine Weekend Sale"}
                        className={"py-1 px-8 text-xl font-medium bg-[#474747] rounded-lg tracking-widest"}
                    >DINOWEEKENDSALE</button>
                </div>
            </div>
        </div>
    )
}

export default ProductsType