import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postApi, getApi } from "@/apis/ApiRequest";

interface UserState {
  users: object; // For multiple users' data
  user: object | null; // For logged-in single user
  loading: boolean;
  isUserAuthenticated: boolean;
}

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
    setUsers(state, action: PayloadAction<object>) {
      state.users = action.payload;
    },
    setUser(state, action: PayloadAction<object>) {
      state.user = action.payload;
      state.isUserAuthenticated = true;
      state.loading = false;
    },
    clearUserData(state) {
      state.user = null;
      state.isUserAuthenticated = false;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
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
    dispatch(setLoading());
    try {
      const response = await postApi("auth/signup", userData);
      dispatch(setUser(response.data));
    } catch (err: any) {}
  };

export const loginUser =
  (credentials: { email: string; password: string }) =>
  async (dispatch: any) => {
    dispatch(setLoading());
    try {
      const response = await postApi("auth/login", credentials);
      dispatch(setUser(response.data));
    } catch (err: any) {}
  };

export const logoutUser = () => async (dispatch: any) => {
  dispatch(setLoading());
  try {
    await postApi("/auth/logout", "");
    dispatch(clearUserData());
  } catch (err: any) {}
};

export const fetchAllUsers = () => async (dispatch: any) => {
  dispatch(setLoading());
  try {
    const response = await getApi("/users/getallusers");
    dispatch(setUsers(response.data));
  } catch (err: any) {}
};

export const { setUsers, setUser, clearUserData, setLoading } =
  authSlice.actions;
export default authSlice.reducer;
