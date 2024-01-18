const { render, screen, fireEvent } = require("@testing-library/react");
const { LoginPage } = require("../../../src/auth/pages/LoginPage");
const { Provider } = require("react-redux");
const { configureStore } = require("@reduxjs/toolkit");
const { authSlice } = require("../../../src/store/auth/authSlice");
const { MemoryRouter } = require("react-router-dom");
const { notAuthenticatedState } = require("../../fixtures/authFixture");
const { startGoogleSignIn } = require("../../../src/store/auth/thunks");

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock("../../../src/store/auth/thunks", () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmailPasword: ({ email, password }) => {
    return () => mockStartLoginWithEmailPassword({ email, password });
  },
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe("Pruebas en el <LoginPage/>", () => {
  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrar el componente correctamene", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText("Login").length).toBeGreaterThanOrEqual(1);
  });

  test("boton de Google debe de llamar el startGoogleSignIn", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    //   screen.debug()
    const googleBtn = screen.getByLabelText("google-btn");
    // console.log(googleBtn);
    fireEvent.click(googleBtn);
    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test("submit debe de llamar el startLoginWithEmailPassword", () => {
    const email = "joaquin@google.com";
    const password = "123456";

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole("textbox", { name: "Correo" });
    fireEvent.change(emailField, { target: { name: "email", value: email } });

    const passwordField = screen.getByTestId("password");
    fireEvent.change(passwordField, {
      target: { name: "password", value: password },
    });
    const loginForm = screen.getByLabelText("submit-form");
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
      email: email,
      password: password,
    });
  });
});
