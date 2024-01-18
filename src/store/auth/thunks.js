import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { clearNotesLogout } from "../journal/journalSlice"
import { chekingCredentials, login, logout } from "./authSlice"

export const chekingAuthentication = (email, password) => {
    return async (dispatch) => {

        dispatch(chekingCredentials())


    }
}

export const startGoogleSignIn = () => {
    return async (dispatch) => {
        dispatch(chekingCredentials());

        const result = await signInWithGoogle();
        // console.log({ result });

        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
}


export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
    return async (dispatch) => {

        dispatch(chekingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName })
        // console.log(resp);

        if (!ok) return dispatch(logout({ errorMessage }));

        dispatch(login({ uid, photoURL, displayName, email }));

    }
}

export const startLoginWithEmailPasword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(chekingCredentials());

        const result = await loginWithEmailPassword({ email, password });
        // console.log(resp);

        if (!result.ok) return dispatch(logout(result));

        dispatch(login(result))

    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase();

        dispatch(clearNotesLogout())
        dispatch(logout())
    }
}

