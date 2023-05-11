import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cookie from "js-cookie";

//create action

const csrfToken = cookie.get("csrftoken");

export const createUser = createAsyncThunk(
  "createUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "post",
        url: "http://139.59.236.50:8000/usercreate/",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
        },
      });
      console.log(...formData);
      // console.log(csrfToken)
      console.log(response);
      alert("User created successfully");
      return response.data;
    } catch (error) {
      alert("Operation failed");
      // console.log(csrfToken)
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
        url: "http://139.59.236.50:8000/createpage/",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
        },
      });
      console.log(...formData);
      // console.log(csrfToken)
      console.log(response);
      alert("Page created successfully");
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      alert("Operation failed");
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
        url: "http://139.59.236.50:8000/addproject/",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
        },
      });
      console.log(...formData);
      alert("Data created successfully");
      console.log(response);
      return response.data;
    } catch (error) {
      alert("Operation failed");
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
        url: "http://139.59.236.50:8000/addpromoted/",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
        },
      });
      console.log(...formData);
      console.log(response);
      alert("Data created successfully");
      return response.data;
    } catch (error) {
      alert("Operation failed");
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
        url: "http://139.59.236.50:8000/addproducts",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
        },
      });
      console.log(...formData);
      alert("Data created successfully");
      console.log(response);
      return response.data;
    } catch (error) {
      alert("Operation failed");
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
        url: "http://139.59.236.50:8000/addcategory",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
        },
      });
      console.log(...formData);
      alert("Data created successfully");
      console.log(response);
      return response.data;
    } catch (error) {
      alert("Operation failed");
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
        url: "http://139.59.236.50:8000/addlisting/",
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
        },
      });
      console.log(...formData);
      console.log(response);
      alert("Data created successfully");
      return response.data;
    } catch (error) {
      alert("Operation failed");
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
      const response = await axios({
        method: "get",
        url: "http://139.59.236.50:8000/user/",
        headers: {
          // "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      return response.data;
    } catch (error) {
      alert("Operation failed");
      console.log("Not submitting data");
      console.log(error);
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
        url: `http://139.59.236.50:8000/edituser/?id=${userId}`,
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
        },
      });
      console.log(userId);
      console.log(response);
      alert("Data updated successfully");
    } catch (error) {
      alert("Operation failed");
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
        url: `http://139.59.236.50:8000/editpage/?pagename=${title}`,
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
        },
      });
      console.log(response);
      alert("Data updated successfully");
    } catch (error) {
      alert("Operation failed");
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
        url: `http://139.59.236.50:8000/editproject/?proj_name=${title}`, // Change the End points
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
        },
      });
      console.log(response);
      alert("Data updated successfully");
    } catch (error) {
      alert("Operation failed");
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
        url: `http://139.59.236.50:8000/editproducts/?prod_name=${title}`, // Change the End points
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
        },
      });
      console.log(response);
      alert("Data updated successfully");
    } catch (error) {
      alert("Operation failed");
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
        url: `http://139.59.236.50:8000/editcategory/?prod_category=${title}`, // Change the End points
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
        },
      });
      console.log(response);
      alert("Data updated successfully");
    } catch (error) {
      alert("Operation failed");
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
        url: `http://139.59.236.50:8000/editlisting/?service=${title}`, // Change the End points
        data: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          // "X-CSRFToken": csrfToken,
        },
      });
      console.log(response);
      alert("Data updated successfully");
    } catch (error) {
      alert("Operation failed");
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
      const response = await axios.get(
        "http://139.59.236.50:8000/suspendedusers/"
      );
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
    const response = await axios.get("http://139.59.236.50:8000/members");
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
      const response = await axios.get("http://139.59.236.50:8000/pages/");
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
      const response = await axios.get("http://139.59.236.50:8000/projects/");
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
      const response = await axios.get(
        "http://139.59.236.50:8000/featuredprojects/"
      );
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
      const response = await axios.get("http://139.59.236.50:8000/products");
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
      const response = await axios.get(
        "http://139.59.236.50:8000/featuredproducts"
      );
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
      const response = await axios.get("http://139.59.236.50:8000/promotions/");
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
      const response = await axios.get("http://139.59.236.50:8000/purchases");
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
      const response = await axios.get("http://139.59.236.50:8000/reviews");
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
      const response = await axios.get("http://139.59.236.50:8000/support/");
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
      const response = await axios.get("http://139.59.236.50:8000/customers");
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
      const response = await axios.get(
        "http://139.59.236.50:8000/suspendedcustomers"
      );
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
      const response = await axios.get("http://139.59.236.50:8000/categories");
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
      const response = await axios.get("http://139.59.236.50:8000/listings/");
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
      const response = await axios.get("http://139.59.236.50:8000/deals");
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
      const response = await axios.get("http://139.59.236.50:8000/reviews");
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
      const response = await axios.get("http://139.59.236.50:8000/roles");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log("Not submitting data");
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete a user
export const DeleteUser = createAsyncThunk("DeleteUser", async (name) => {
  const response = await axios.delete(
    `http://139.59.236.50:8000/deleteuser/?name=${name}`
  );
  return response.data;
});

// Delete Suspended User
export const DeleteSuspendUser = createAsyncThunk(
  "DeleteSuspendUser",
  async (name) => {
    const response = await axios.delete(
      `http://139.59.236.50:8000/deleteuser/?name=${name}`
    );
    return response.data;
  }
);

// Delete a Relationship (NO API)
// export const DeleteRelationship = createAsyncThunk(
//   "DeleteRelationship",
//   async (pageid) => {
//     const response = await axios.delete(
//       `http://139.59.236.50:8000/deletepage/?id=${pageid}`
//     );
//     return response.data;
//   }
// );

// Delete A page
export const DeletePage = createAsyncThunk("DeletePage", async (pageid) => {
  const response = await axios.delete(
    `http://139.59.236.50:8000/deletepage/?id=${pageid}`
  );
  return response.data;
});

// Delete a Project and featured Project
export const DeleteProject = createAsyncThunk(
  "DeleteProject",
  async (pageid) => {
    const response = await axios.delete(
      `http://139.59.236.50:8000/deleteproject/?id=${pageid}`
    );
    return response.data;
  }
);

//HSM Delete a product
export const DeleteProduct = createAsyncThunk(
  "DeleteProduct",
  async (pageId) => {
    const response = await axios.delete(
      `http://139.59.236.50:8000/deleteproducts?id=${pageId}`
    );
    return response.data;
  }
);

//HSM Delete a Promotion (No API yet)
export const DeletePromotion = createAsyncThunk(
  "DeletePromotion",
  async (promotionId) => {
    const response = await axios.delete(
      `http://139.59.236.50:8000/deletepromoted?id=${promotionId}`
    );
    return response.data;
  }
);

//HSM Delete a Transaction (NO API yet)
export const DeleteTransaction = createAsyncThunk(
  "DeleteTransaction",
  async (pageId) => {
    const response = await axios.delete(
      `http://139.59.236.50:8000/deleteproducts?id=${pageId}`
    );
    return response.data;
  }
);

// HSM Delete review
export const DeleteReview = createAsyncThunk("DeleteReview", async (pageId) => {
  const response = await axios.delete(
    `http://139.59.236.50:8000/deletereview?id=${pageId}`
  );
  return response.data;
});

// MPM Delete a members
export const DeleteMember = createAsyncThunk("DeleteMember", async (id) => {
  const response = await axios.delete(
    `http://139.59.236.50:8000/deletecustomer?id=${id}`
  );
  return response.data;
});

// MPM Delete a category
export const DeleteCategory = createAsyncThunk(
  "DeleteCategory",
  async (catgid) => {
    const response = await axios.delete(
      `http://139.59.236.50:8000/deletecategory?catgid=${catgid}`
    );
    return response.data;
  }
);

// MPM Delete a listing
export const DeleteListing = createAsyncThunk(
  "DeleteListing",
  async (listId) => {
    const response = await axios.delete(
      `http://139.59.236.50:8000/deletelisting/?id=${listId}`
    );
    return response.data;
  }
);

// Delete Deal
export const DeleteDeal = createAsyncThunk("DeleteDeal", async (dealId) => {
  const response = await axios.delete(
    `http://139.59.236.50:8000/deletedeal?d_id=${dealId}`
  );
  return response.data;
});

// Delete a role
export const DeleteRole = createAsyncThunk("DeleteRole", async (username) => {
  const response = await axios.delete(
    `http://139.59.236.50:8000/deleterole?usrname=${username}`
  );
  return response.data;
});

// Delete Relationship
export const DeleteRelation = createAsyncThunk(
  "DeleteRelation",
  async (username) => {
    const response = await axios.delete(
      `http://139.59.236.50:8000/deletemember?usname=${username}`
    );
    return response.data;
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
    data: [],
  },
  reducers: {
    dummy: (state) => state,
  },
  extraReducers: (builder) => {
    builder

      // Delete a user
      .addCase(DeleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        // remove the deleted user from the state
        state.data = state.data.filter(
          (user) => user.username !== action.payload.username
        );
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete Suspended User
      .addCase(DeleteSuspendUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteSuspendUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.username !== action.payload.username
        );
      })
      .addCase(DeleteSuspendUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete a page
      .addCase(DeletePage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeletePage.fulfilled, (state, action) => {
        state.status = "succeeded";
        // remove the deleted user from the state
        state.data = state.data.filter(
          (user) => user.pageid !== action.payload.pageid
        );
      })
      .addCase(DeletePage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete Project
      .addCase(DeleteProject.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        // remove the deleted user from the state
        state.data = state.data.filter(
          (user) => user.pageid !== action.payload.pageid
        );
      })
      .addCase(DeleteProject.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete a product
      .addCase(DeleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        // remove the deleted user from the state
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete Promotion
      .addCase(DeletePromotion.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeletePromotion.fulfilled, (state, action) => {
        state.status = "succeeded";
        // remove the deleted user from the state
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeletePromotion.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })
      // Delete Relation
      .addCase(DeleteRelation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteRelation.fulfilled, (state, action) => {
        state.status = "succeeded";
        // remove the deleted user from the state
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteRelation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete a Member
      .addCase(DeleteMember.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteMember.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteMember.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete Category
      .addCase(DeleteCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete Listing
      .addCase(DeleteListing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteListing.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteListing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete Deal

      .addCase(DeleteDeal.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteDeal.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteDeal.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Delete a Role
      .addCase(DeleteRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(DeleteRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = state.data.filter(
          (user) => user.pageId !== action.payload.pageId
        );
      })
      .addCase(DeleteRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Something went wrong";
      })

      // Get All users Data
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
