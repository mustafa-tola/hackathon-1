import SignupComp from "@/components/views/Signup"
import ContextWrapper from "@/global/Context"

const Signup = () => {
    return (
        <ContextWrapper>
        <SignupComp />
        </ContextWrapper>
    )
}

export default Signup;