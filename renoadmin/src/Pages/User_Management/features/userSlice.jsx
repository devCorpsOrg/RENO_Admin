import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//create action

export const createUser = createAsyncThunk("createUser", async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/usercreate/", formData);
      console.log(formData)
      return response.data;
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const getUser = createAsyncThunk("getUser", async ({ rejectWithValue }) => {
    try {
      const response = await axios.get("API_CALL").json();
    //   console.log(formData)
      return response.data;
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const deleteUser = createAsyncThunk("deleteUser", async (value, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`API_CALL${value}`).json();
    //   console.log(formData)
      return response.data;
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const updateUser = createAsyncThunk("updateUser", async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`API_CALL${formData.id}`, formData).json();
    //   console.log(formData)
      return response.data;
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const userDetails = createSlice({
    name: "userDetail",
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(createUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload);
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })



            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = (action.payload);
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })



            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                const {value} = action.payload;

                // if(id){
                //   state.users = state.users.filter((ele)=>ele.id!==id);
                // }
                console.log("deleted", action.payload);
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })


            .addCase(updateUser.pending, (state) => {
              state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = state.users.map((ele)=>
                    ele.id===action.payload.id ? action.payload : ele
                )
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
    },
})

export default userDetails.reducer;