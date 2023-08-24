import { ShoppingCart } from "lucide-react";
import { heroGirlImg } from "../../assets";
import Image from "next/image"
const Hero = () => {
    const btnText = "Start \n Shopping";
    return (
        <div className="py-5 flex justify-between items-center px-2">
            <div className="space-y-6 max-w-sm">
                <button aria-label="redirect the user to sale page" className="rounded-md bg-primaryWhite text-blue-700 font-medium px-3 py-1">Sale 70%</button>
                <h3 className="text-4xl md:text-6xl text-gray-800 font-bold">An Industrial Take on Streetwear</h3>
                <p className="text-gray-700">Any one can beat you but no one can beat your outfit as long as you wear Dine Outfits</p>
                <button aria-label="redirect the user to sale page" className="flex gap-3 items-center rounded-sm text-lg ring-1 ring-slate-800 bg-gray-800 w-32 py-3 px-5 text-white font-semibold py-3 px-5">
                    <ShoppingCart size={24} />

                    <p className="whitepsace-pre leading-5">
                        {btnText}
                    </p>
                </button>
                <div className="flex gap-4">
                    <div className="w-14 md:w-28">
                        <Image width={100} height={100} src={"https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFeatured1.66abddd4.png&w=256&q=75"} alt={"Bazaar"} />
                    </div>
                    <div className="w-14 md:w-28">
                        <Image width={100} height={100} src={"https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFeatured2.247cd605.png&w=256&q=75"} alt={"Baztel"} />
                    </div>
                    <div className="w-14 md:w-28">
                        <Image width={100} height={100} src={"https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFeatured3.6076521d.png&w=256&q=75"} alt={"Versace"} />
                    </div>
                    <div className="w-14 md:w-28">
                        <Image width={100} height={100} src={"https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFeatured1.66abddd4.png&w=256&q=75"} alt={"In Style"} />
                    </div>
                </div>
            </div>
            <div className="hidden md:flex bg-primaryWhite rounded-full">
                <Image src={heroGirlImg} alt={"Hero Image"} />
            </div>
        </div>
    )
}

export default Hero;