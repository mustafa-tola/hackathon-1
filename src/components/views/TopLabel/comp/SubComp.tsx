import { cartContext } from "@/global/Context";
import Link from "next/link";
import { useContext, useState } from "react";
import Image from "next/image"
import { X } from "lucide-react";

const SubComp = () => {
    let { userData, logout, sendEmailVerificationCode, updateUsernamePhoto,loading } = useContext(cartContext);
    const [isSideProfileOpen, setIsSideProfileOpen] = useState(false);
    const [isUserEditingName, setIsUserEditingName] = useState(false);
    const [nameOf,setNameOf] = useState("");
    let name = userData?.displayName;
    const handleEditName = () => {
        updateUsernamePhoto(nameOf);
        setIsUserEditingName(false);
        window.location.reload();
    }
    return (
        <div className="overflow-hidden">
            {userData ?
                <div onClick={() => setIsSideProfileOpen(true)} className="md:mr-0 mr-4 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center bg-white text-gray-700">
                    {userData.photoUrl ? <Image className="object-cover" width={300} height={300} src={userData.photoUrl} alt={userData.displayName} /> : userData.displayName ? <p className="text-sm">{userData.displayName.slice(0, 1)}</p> : <p className="text-sm">N</p>}
                </div> :
                <div className="flex gap-2">
                    <Link href={"/signup"} className="bg-gray-900 text-white px-3 py-1">Sign Up</Link>
                    <Link href={"/signin"} className="border-purple-800 text-white border px-3 py-1">Sign In</Link>
                </div>
            }
            <div className={`${isSideProfileOpen ? "visible translate-y-0" : "invisible translate-y-full"} duration-500 py-4 px-4 w-72 md:w-80 bg-gray-800 h-full absolute right-0 top-0 bottom-0 z-30`}>
                <div className="flex justify-between py-2 items-center">
                    <h6 className="font-semibold text-xl">Profile</h6>
                    <div className="cursor-pointer" onClick={() => setIsSideProfileOpen(false)}>
                        <X />
                    </div>
                </div>
                {userData && (
                    <div className="text-center py-2 text-gray-200">
                        {loading && <div>Loading</div>}
                        {isUserEditingName && (<div className="flex">
                            <input value={nameOf} onChange={(e) => setNameOf(e.target.value)} className="w-full outline-gray-300 rounded-l-md hover:outline-purple-600" />
                            <button onClick={handleEditName} className="rounded-r-md py-1 rounded-lg py-1 px-2 bg-purple-600">Done</button>
                        </div>)}
                        <h3 className="text-xl font-semibold"><b>Name:</b> {name ? name : "Not Setted"}</h3>
                        {!name && (
                            <button className="underline text-blue-600 text-sm" onClick={() => setIsUserEditingName(true)}>
                                Edit Name
                            </button>
                        )}
                        <h4 className="text-xl font-semibold"><b>Email:</b> {userData.email}</h4>
                        <p className="text-sm"><b>Is Email Verified:</b> ${userData.emailVerified ? "Verified" : "Unverified"}</p>
                        <button className="underline text-blue-600 text-sm" onClick={sendEmailVerificationCode}>
                            Verify Email
                        </button>
                        <p className="my-2 font-xs text-red-600 font-light">Please check your inbox after clicking Verify Email</p>
                        <p className="my-2 font-xs text-red-600 font-light">If changes do not reflect, Please refresh</p>
                        <button className="w-full rounded-lg border p-2" onClick={logout}>
                            Log out
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SubComp