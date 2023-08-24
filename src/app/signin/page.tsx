import SignInForm from "@/components/views/SigninForm"
import ContextWrapper from "@/global/Context"

const SignIn = () => {
    return (
        <ContextWrapper>
            <SignInForm />
        </ContextWrapper>
    )
}