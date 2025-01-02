import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postApi, getApi } from "@/apis/ApiRequest";

interface User {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  dateOfBirth?: string;
  ssn?: string;
}

interface Users {
  [key: string]: User;
}

interface UserState {
  users: Users;
  user: User | null;
  loading: boolean;
  isUserAuthenticated: boolean;
}
// interface UserState {
//   users: object; // For multiple users' data
//   user: object | null; // For logged-in single user
//   loading: boolean;
//   isUserAuthenticated: boolean;
// }

const initialState: UserState = {
  users: {}, // Initialize as empty object
  user: null, //  (no logged-in user by default)
  loading: false,
  isUserAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requestSignup(state) {
      state.loading = true;
      state.isUserAuthenticated = false;
    },
    successSignup(state, action: PayloadAction<User>) {
      state.loading = false;
      state.isUserAuthenticated = false;
      state.user = action.payload;
    },
    requestLogin(state) {
      state.loading = true;
      state.isUserAuthenticated = false;
      state.user = null;
    },
    successLogin(state, action: PayloadAction<User>) {
      state.loading = false;
      state.isUserAuthenticated = true;
      state.user = action.payload;
    },
    requestFetchUser(state) {
      state.loading = true;
      state.isUserAuthenticated = false;
      state.user = null;
    },
    successFetchUser(state, action: PayloadAction<User>) {
      state.loading = false;
      state.isUserAuthenticated = true;
      state.user = action.payload;
    },
    // requestFetchAllUser(state) {
    //   state.loading = true;
    //   state.isUserAuthenticated = false;
    //   state.users = null;
    // },
    successFetchAllUser(state, action: PayloadAction<Users>) {
      state.loading = false;
      state.isUserAuthenticated = true;
      state.users = action.payload;
    },
    successLogout(state) {
      state.loading = false;
      state.isUserAuthenticated = false;
      state.user = null;
    },
    clearUserData(state) {
      state.user = null;
      state.isUserAuthenticated = false;
      state.loading = false;
    },
  },
});

export const signupUser =
  (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    address: string;
    city: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
  }) =>
  async (dispatch: any) => {
    dispatch(requestSignup());
    try {
      const response = await postApi("auth/signup", userData);
      dispatch(successSignup(response.data));
    } catch (err: any) {}
  };

export const loginUser =
  (credentials: { email: string; password: string }) =>
  async (dispatch: any) => {
    dispatch(requestLogin());
    try {
      const response = await postApi("auth/login", credentials);
      dispatch(successLogin(response.data));
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (err: any) {}
  };

export const logoutUser = () => async (dispatch: any) => {
  try {
    await postApi("auth/logout", undefined);
    dispatch(successLogout());
    dispatch(clearUserData());
    localStorage?.clear();
  } catch (err: any) {}
};

export const loggedInUser = () => async (dispatch: any) => {
  dispatch(requestFetchUser());
  try {
    const response = await getApi("users/profile");
    dispatch(successFetchUser(response.data));
  } catch (err: any) {}
};

export const fetchAllUsers = () => async (dispatch: any) => {
  // dispatch(requestFetchAllUser());
  try {
    const response = await getApi("/users/getallusers");
    dispatch(successFetchAllUser(response.data));
  } catch (err: any) {}
};

export const {
  requestSignup,
  successSignup,
  requestLogin,
  successLogin,
  requestFetchUser,
  successFetchUser,
  // requestFetchAllUser,
  successFetchAllUser,
  successLogout,
  clearUserData,
} = authSlice.actions;
export default authSlice.reducer;
