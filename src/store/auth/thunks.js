import { signInWithGoogle } from "../../firebase/providers"
import { chekingCredentials } from "./authSlice"

export const chekingAuthentication = (email, password) => {
    return async (dispatch) => {

        dispatch(chekingCredentials())


    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(chekingCredentials());

        const result = await signInWithGoogle();
        console.log({ result });
    }
}