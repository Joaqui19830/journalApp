
import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { chekingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { chekingAuthentication, startGoogleSignIn, startLoginWithEmailPasword, startLogout } from "../../../src/store/auth/thunks";
import { clearNotesLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from '../../fixtures/authFixture';


jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {

    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('debe de invocar el chekingCredentials', async () => {

        await chekingAuthentication()(dispatch);

        expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
    });

    test('startGoogleSignIn debe de llamar chekingCredentials y login - Exito', async () => {

        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue(loginData);

        // thunks
        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startGoogleSignIn debe de llamar chekingCredentials y logout - Error', async () => {

        const loginData = { ok: false, errorMessage: 'Un error en goolge' };
        await signInWithGoogle.mockResolvedValue(loginData);

        // thunks
        await startGoogleSignIn()(dispatch);
        expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
    });

    test('startLoginWithEmailPasword debe de llamar chekingCredentials y login - Exito', async () => {

        const loginData = { ok: true, ...demoUser };
        const formData = { email: demoUser.email, password: '123456' };

        await loginWithEmailPassword.mockResolvedValue(loginData)

        await startLoginWithEmailPasword(formData)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
        expect(dispatch).toHaveBeenCalledWith(login(loginData));
    });

    test('startLogout debe de llamar logoutFirebase, clearNotes y logout', async () => {

        await startLogout()(dispatch);
        expect(logoutFirebase).toHaveBeenCalled();
        expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
        expect(dispatch).toHaveBeenCalledWith(logout());
    })

})