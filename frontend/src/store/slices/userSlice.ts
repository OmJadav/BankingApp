import { getApi } from "@/apis/ApiRequest";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: string | null;
  name: string | null;
  email: string | null;
  users: object | null;
}

const initialState: UserState = {
  id: null,
  name: null,
  email: null,
  users: null,
};

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const data = await getApi("/users/getallusers");
      return data;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    clearUserData(state) {
      state.id = null;
      state.name = null;
      state.email = null;
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;
