import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//create action

export const createUser = createAsyncThunk(
  "createUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/usercreate/",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      console.log(...formData);
      console.log(response);

      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const createNewPage = createAsyncThunk(
  "createNewPage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/createpage/",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      console.log(...formData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewShowcase = createAsyncThunk(
  "addNewShowcase",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/addproject/",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      console.log(...formData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewPromotion = createAsyncThunk(
  "addNewPromotion",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/addpromoted/",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      console.log(...formData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewProduct = createAsyncThunk(
  "addNewProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/addproducts/",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      console.log(...formData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "addNewCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/addcategory",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      console.log(...formData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewListing = createAsyncThunk(
  "addNewListing",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "/addlisting/",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      console.log(...formData);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  "getUser",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/user");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (value, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`API_CALL${value}`).json();
      //   console.log(formData)
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ formData, userId }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/edituser/?id=${userId}`,
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      console.log(userId);
      console.log(response);
    } catch (error) {
      console.log(userId);
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePage = createAsyncThunk(
  "updatePage",
  async ({ formData, title }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/editpage/?pagename=${title}`,
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      console.log(response);
    } catch (error) {
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateShowcase = createAsyncThunk(
  "updateShowcase",
  async ({ formData, title }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/editproject/?proj_name=${title}`, // Change the End points
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      console.log(response);
    } catch (error) {
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProject = createAsyncThunk(
  "updateProject",
  async ({ formData, title }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/editproducts/?prod_name=${title}`, // Change the End points
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      console.log(response);
    } catch (error) {
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "updateCategory",
  async ({ formData, title }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/editcategory/?prod_category=${title}`, // Change the End points
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      console.log(response);
    } catch (error) {
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateListing = createAsyncThunk(
  "updateListing",
  async ({ formData, title }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "put",
        url: `/editlisting/?service=${title}`, // Change the End points
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      });
      console.log(response);
    } catch (error) {
      console.log("Not submitting data");
      return rejectWithValue(error.response.data);
    }
  }
);

// Suspended Users
export const suspendUsers = createAsyncThunk(
  "suspendUsers",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/suspendedusers");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

//CRM
export const CRM = createAsyncThunk("CRM", async (_, { rejectWithValue }) => {
  console.log("hello");
  try {
    const response = await axios.get("/members");
    console.log(response);
    return response.data;
  } catch (error) {
    console.log("Not submitting data");
    console.log(error);
    return rejectWithValue(error.response.data);
  }
});

// Content Management ALl Pages
export const allPages = createAsyncThunk(
  "allPages",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/pages");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// PSM All projects
export const allProjects = createAsyncThunk(
  "allProjects",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/projects");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// PSM Featured Product
export const featuredProjects = createAsyncThunk(
  "featuredProjects",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/featuredprojects");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// HSM Product List
export const HSM_allProduct = createAsyncThunk(
  "HSM_allProduct",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/products");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// HSM Featured Product
export const HSM_featuredProduct = createAsyncThunk(
  "HSM_featuredProduct",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/featuredproducts");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// HSM Promotion
export const HSM_promotion = createAsyncThunk(
  "HSM_promotion",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/promotions");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// HSM Transaction and Purchase
export const HSM_transaction = createAsyncThunk(
  "HSM_transaction",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/purchases");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// HSM Review magement
export const HSM_review = createAsyncThunk(
  "HSM_review",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/reviews");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// HSM HElp desk
export const HSM_helpdesk = createAsyncThunk(
  "HSM_helpdesk",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/support");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// MPM all members
export const MPM_allmembers = createAsyncThunk(
  "MPM_allmembers",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/customers");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// MPM suspended Users
export const MPM_suspended = createAsyncThunk(
  "MPM_suspended",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/suspendedcustomers");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// MPM category
export const MPM_category = createAsyncThunk(
  "MPM_category",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/categories");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// MPM Listing
export const MPM_listing = createAsyncThunk(
  "MPM_listing",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/listings");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// MPM All chats
export const MPM_allchats = createAsyncThunk(
  "MPM_allchats",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/deals");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// MPM review
export const MPM_review = createAsyncThunk(
  "MPM_review",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/reviews");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Permission and role management
export const RoleManagement = createAsyncThunk(
  "RoleManagement",
  async (_, { rejectWithValue }) => {
    console.log("hello");
    try {
      const response = await axios.get("/roles");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userDetails = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    suspendUsers: [],
    crm: [],
    allpages: [],
    allprojects: [],
    featuredproj: [],
    hsm_allproducts: [],
    hsm_featuredproducts: [],
    hsm_promotion: [],
    hsm_transaction: [],
    hsm_review: [],
    hsm_helpdesk: [],
    mpm_allmembers: [],
    mpm_suspended: [],
    mpm_category: [],
    mpm_listing: [],
    mpm_allchats: [],
    mpm_review: [],
    role: [],
    loading: false,
    error: null,
  },
  reducers: {
    dummy: (state) => state,
  },
  extraReducers: (builder) => {
    builder

      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Suspended Users
      .addCase(suspendUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(suspendUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.suspendUsers = action.payload;
      })
      .addCase(suspendUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // CRM
      .addCase(CRM.pending, (state) => {
        state.loading = true;
      })
      .addCase(CRM.fulfilled, (state, action) => {
        state.loading = false;
        state.crm = action.payload;
      })
      .addCase(CRM.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // All Pages
      .addCase(allPages.pending, (state) => {
        state.loading = true;
      })
      .addCase(allPages.fulfilled, (state, action) => {
        state.loading = false;
        state.allpages = action.payload;
      })
      .addCase(allPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // PSM Project list
      .addCase(allProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(allProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.allprojects = action.payload;
      })
      .addCase(allProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // PSM Featured Projects
      .addCase(featuredProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(featuredProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.featuredproj = action.payload;
      })
      .addCase(featuredProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // HSM Product List
      .addCase(HSM_allProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_allProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_allproducts = action.payload;
      })
      .addCase(HSM_allProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // HSM Featured Product
      .addCase(HSM_featuredProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_featuredProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_featuredproducts = action.payload;
      })
      .addCase(HSM_featuredProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // HSM Promotion Management
      .addCase(HSM_promotion.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_promotion.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_promotion = action.payload;
      })
      .addCase(HSM_promotion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // HSM Transaction and Purchase
      .addCase(HSM_transaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_transaction.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_transaction = action.payload;
      })
      .addCase(HSM_transaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // HSM Review magement
      .addCase(HSM_review.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_review.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_review = action.payload;
      })
      .addCase(HSM_review.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // HSM HElp desk
      .addCase(HSM_helpdesk.pending, (state) => {
        state.loading = true;
      })
      .addCase(HSM_helpdesk.fulfilled, (state, action) => {
        state.loading = false;
        state.hsm_helpdesk = action.payload;
      })
      .addCase(HSM_helpdesk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // MPM all members
      .addCase(MPM_allmembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(MPM_allmembers.fulfilled, (state, action) => {
        state.loading = false;
        state.mpm_allmembers = action.payload;
      })
      .addCase(MPM_allmembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // MPM suspended Users
      .addCase(MPM_suspended.pending, (state) => {
        state.loading = true;
      })
      .addCase(MPM_suspended.fulfilled, (state, action) => {
        state.loading = false;
        state.mpm_suspended = action.payload;
      })
      .addCase(MPM_suspended.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // MPM category
      .addCase(MPM_category.pending, (state) => {
        state.loading = true;
      })
      .addCase(MPM_category.fulfilled, (state, action) => {
        state.loading = false;
        state.mpm_category = action.payload;
      })
      .addCase(MPM_category.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // MPM Listing
      .addCase(MPM_listing.pending, (state) => {
        state.loading = true;
      })
      .addCase(MPM_listing.fulfilled, (state, action) => {
        state.loading = false;
        state.mpm_listing = action.payload;
      })
      .addCase(MPM_listing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // MPM All chats
      .addCase(MPM_allchats.pending, (state) => {
        state.loading = true;
      })
      .addCase(MPM_allchats.fulfilled, (state, action) => {
        state.loading = false;
        state.mpm_allchats = action.payload;
      })
      .addCase(MPM_allchats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // MPM review
      .addCase(MPM_review.pending, (state) => {
        state.loading = true;
      })
      .addCase(MPM_review.fulfilled, (state, action) => {
        state.loading = false;
        state.mpm_review = action.payload;
      })
      .addCase(MPM_review.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })

      // Permission and role management
      .addCase(RoleManagement.pending, (state) => {
        state.loading = true;
      })
      .addCase(RoleManagement.fulfilled, (state, action) => {
        state.loading = false;
        state.role = action.payload;
      })
      .addCase(RoleManagement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      });
  },
});

export default userDetails.reducer;
