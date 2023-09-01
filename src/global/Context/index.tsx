"use client"
import { FC, ReactNode, createContext, useContext, useEffect, useReducer, useState } from "react";
import { cartReducer } from "../Reducer";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import BASE_PATH_FOR_API from "@/components/shared/BasePath";

export const cartContext = createContext<any>(null);

interface indexForError {
    [key: string]: string
}

const ContextWrapper = ({ children }: { children: ReactNode }) => {
    // let router = useRouter();
    const [userData, setUserData] = useState<any>()
    // const cartInitializer = {
    // cart: []
    // }
    // const [state, dispatch] = useReducer(cartReducer, cartInitializer);
    const [loading, setLoading] = useState(false);
    const [errorByUserCredentials, setErrorByUserCredentials] = useState({});
    const [cartArray, setCartArray] = useState<any>([]);
    const [errorsOfFirebase, setErrorsOfFirebase] = useState({
        key: "",
        errorMessage: ""
    });
    // useEffect(() => {
    // let cart = localStorage.getItem("cart") as string;
    // if (cart === null) {
    // localStorage.setItem("cart", JSON.stringify(state.cart));
    // }
    // else {
    // cartInitializer.cart = JSON.parse(cart);
    // }
    // })
    let user = auth.currentUser;
    useEffect(() => {
        onAuthStateChanged(auth, (user: any) => {
            if (user) {
                setUserData({
                    displayName: user.displayName,
                    email: user.email,
                    uuid: user.uid,
                    photoUrl: user.photoUrl,
                    emailVerified: user.emailVerified
                })
                // router.push("/")
            }
            else {
                setUserData(null)
            }
        })
    })
    let provider = new GoogleAuthProvider();
    function signUpViaGoogle() {
        setLoading(true)
        return signInWithPopup(auth, provider).then((userData: any) => {
            if (userData) {
                setUserData({
                    displayName: userData.user.displayName,
                    email: userData.user.email,
                    uuid: userData.user.uid,
                    photoUrl: userData.user.photoUrl,
                    emailVerified: userData.user.emailVerified
                })
            }
            setLoading(false)
        })
        .catch((err) => {
            let error = err.code.split("/");
                error = error[error.length - 1];
                setErrorsOfFirebase({
                    key: "signup",
                    errorMessage: error
                })
                setLoading(false)
        })
        
    }
    function signUpUser(email: string, password: string) {
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password).then((res: any) => {
            setLoading(false);
            // router.push("/")
        })
            .catch((err: any) => {
                // setErrorByUserCredentials({
                //     "signUpError": "Error occured with signup via email and password",

                // })
                let error = err.code.split("/");
                error = error[error.length - 1];
                setErrorsOfFirebase({
                    key: "signup",
                    errorMessage: error
                })
                setLoading(false)
            })

    }
    function signInUser(email: string, password: string) {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password).then((res: any) => {
            setLoading(false);
        })
            .catch((err: any) => {
                // alert("error: "+err.code.split("/"))
                let error = err.code.split("/");
                error = error[error.length - 1]
                setErrorsOfFirebase({
                    key: "signin",
                    errorMessage: error
                })
                setErrorByUserCredentials({
                    "signInError": "Error occured with signin via email and password",

                })
                setLoading(false)
            })
    }
    function logout() {
        setLoading(true);
        signOut(auth);
        setLoading(false);
        window.location.reload();
    }
    // useEffect(() => {
    // localStorage.setItem("cart", JSON.stringify(state.cart));
    // }, [state.cart])
    const sendEmailVerificationCode = () => {
        setLoading(true);
        if (user) {
            sendEmailVerification(user).then((res: any) => {
                window.location.href = "/";
            })
            setLoading(false);
        }
    }
    const updateUsernamePhoto = (userName: string, photoURL: string) => {
        setLoading(true)
        if (user) {
            updateProfile(user, {
                displayName: "",
                photoURL: ""
            })
                .then(() => {
                    setLoading(false)
                })
                .catch((err) => {
                    setLoading(false)
                })
        }
    }
    const fetchApiForAllCartItems = async () => {
        if (userData) {
            let res = await fetch(`/api/cart?user_id=${userData.uuid}`)
            if (!res.ok) {
                throw new Error("Failed to fetch")
            }
            let dataToReturn = await res.json();
            await setCartArray((prev: any) => dataToReturn.allCartData);
            if (dataToReturn) {
                return true;
            }
        }
    }
    useEffect(() => {
        fetchApiForAllCartItems()
    }, [])
    const dispatch = async (payload: string, data: any) => {
        if (payload == "addToCart") {
            await fetch(`/api/cart`, {
                method: "POST",
                body: JSON.stringify(data)
            })
        }
        else if (payload == "removeFromCart") {
            let dataa = await fetch(`/api/cart?product_id=${data.product_id}&user_id=${data.user_id}`, {
                method: "DELETE",
            })
            let NotData = await dataa.json();
        }
        else if (payload == "updateCart") {
            setLoading(true);
            let dataa = await fetch(`/api/cart`, {
                method: "PUT",
                body: JSON.stringify(data)
            })
            let NotData = await dataa.json();
            setLoading(false);
        }
        let resp = await fetchApiForAllCartItems();
        if (resp) {
            return "success";
        }
        else {
            return "unsuccess";
        }
    }
    return (
        <cartContext.Provider value={{ cartArray, dispatch, userData, signUpUser, signUpViaGoogle, signInUser, logout, loading, sendEmailVerificationCode, setLoading,errorsOfFirebase, updateUsernamePhoto }}>{children}</cartContext.Provider>
    )
}
export default ContextWrapper;