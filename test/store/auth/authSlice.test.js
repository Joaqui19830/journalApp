import { authSlice, chekingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixture";

describe('Pruebas en authSlice', () => {
    test('debe de regresar el estado inicial y llamarse "auth" ', () => {

        const state = authSlice.reducer(initialState, {});
        // console.log(state);
        expect(state).toEqual(initialState)
        expect(authSlice.name).toBe('auth');
    });

    test('debe de realizar la autenticacion', () => {

        const state = authSlice.reducer(initialState, login(demoUser));
        // console.log(state);
        expect(state).toEqual({
            status: 'authenticated', // not-authenticated, cheking, 'authenticated
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        });
    });

    test('debe de realizar el logout sin argumentos', () => {

        const state = authSlice.reducer(authenticatedState, logout());
        // console.log(state);
        expect(state).toEqual({
            status: 'not-authenticated', // not-authenticated, cheking, 'authenticated
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: undefined,
        });


    });

    test('debe de realizar el logout y mostrar un mensaje de error', () => {

        const errorMessage = 'Credenciales no son correctos'
        const state = authSlice.reducer(authenticatedState, logout({ errorMessage }));
        // console.log(state);
        expect(state).toEqual({
            status: 'not-authenticated', // not-authenticated, cheking, 'authenticated
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage,
        });
    });

    test('debe de cambiar el estado a cheking', () => {

        const state = authSlice.reducer(authenticatedState, chekingCredentials());
        expect(state.status).toBe('cheking');

    })

})