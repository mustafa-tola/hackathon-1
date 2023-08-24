"use client"
import SignupComp from "@/components/views/Signup"
import ContextWrapper from "@/global/Context"
import { useRouter } from "next/navigation"

const Signup = () => {
    let {asPath}:any = useRouter()
    return (
        <ContextWrapper>
        <SignupComp />
        </ContextWrapper>
    )
}