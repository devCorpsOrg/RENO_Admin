import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//create action

export const createUser = createAsyncThunk("createUser", async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/usercreate/",
        data:  formData  ,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      console.log(...formData)
      console.log(response)

      return response.data;
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });

export const createNewPage = createAsyncThunk("createNewPage", async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/createpage/",
        data:  formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      console.log(...formData)
      console.log(response)
      return response.data;
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const addNewShowcase = createAsyncThunk("addNewShowcase", async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/addproject/",
        data:  formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      console.log(...formData)
      console.log(response)
      return response.data;
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const addNewPromotion = createAsyncThunk("addNewPromotion", async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/addpromoted/",
        data:  formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      console.log(...formData)
      console.log(response)
      return response.data;
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const addNewProduct = createAsyncThunk("addNewProduct", async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/addproducts/",
        data:  formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      console.log(...formData)
      console.log(response)
      return response.data;
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const addNewCategory = createAsyncThunk("addNewCategory", async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/addcategory",
        data:  formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      console.log(...formData)
      console.log(response)
      return response.data;
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const addNewListing = createAsyncThunk("addNewListing", async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/addlisting/",
        data:  formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      console.log(...formData)
      console.log(response)
      return response.data;
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const getUser = createAsyncThunk("getUser", async (_,{ rejectWithValue }) => {
  console.log("hello")
    try {
      const response = await axios.get("/user");
      console.log(response)
      return response.data;
    } catch (error) {
        console.log("Not submitting data");
        console.log(error)
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


export const updateUser = createAsyncThunk("updateUser", async ({formData, userId}, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/edituser/?id=${userId}`,
        data:  formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      console.log(userId);
      console.log(response);
    } catch (error) {
      console.log(userId);
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const updatePage = createAsyncThunk("updatePage", async ({formData, title}, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/editpage/?pagename=${title}`,
        data:  formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      console.log(response);
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const updateShowcase = createAsyncThunk("updateShowcase", async ({formData, title}, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/editproject/?proj_name=${title}`,  // Change the End points
        data:  formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      console.log(response);
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const updateProject = createAsyncThunk("updateProject", async ({formData, title}, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/editproducts/?prod_name=${title}`,  // Change the End points
        data:  formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      console.log(response);
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const updateCategory = createAsyncThunk("updateCategory", async ({formData, title}, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/editcategory/?prod_category=${title}`,  // Change the End points
        data:  formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      console.log(response);
    } catch (error) {
        console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  });


export const updateListing = createAsyncThunk("updateListing", async ({formData, title}, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/editlisting/?service=${title}`,  // Change the End points
        data:  formData,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      console.log(response);
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
      dummy: (state) => state,
    },
    extraReducers: (builder) => {
        builder
    //         .addCase(createUser.pending, (state) => {
    //             state.loading = true;
    //         })
    //         .addCase(createUser.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.users.push(action.payload);
    //         })
    //         .addCase(createUser.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload.message;
    //         })



            .addCase(getUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = (action.payload);
            })
            .addCase(getUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message;
            });



    //         .addCase(deleteUser.pending, (state) => {
    //             state.loading = true;
    //         })
    //         .addCase(deleteUser.fulfilled, (state, action) => {
    //             state.loading = false;
    //             const {value} = action.payload;

    //             // if(id){
    //             //   state.users = state.users.filter((ele)=>ele.id!==id);
    //             // }
    //             console.log("deleted", action.payload);
    //         })
    //         .addCase(deleteUser.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload.message;
    //         })


    //         .addCase(updateUser.pending, (state) => {
    //           state.loading = true;
    //         })
    //         .addCase(updateUser.fulfilled, (state, action) => {
    //             state.loading = false;
    //             state.users = state.users.map((ele)=>
    //                 ele.id===action.payload.id ? action.payload : ele
    //             )
    //         })
    //         .addCase(updateUser.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload.message;
    //         })
    },
})

export default userDetails.reducer;