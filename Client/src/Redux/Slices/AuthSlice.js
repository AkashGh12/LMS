import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import  axiosInstance  from "../../Helpers/axiosInstance"



const initialState={
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {} 
};


// export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
//     try {
//         const response = await axiosInstance.post("user/register", data);
//         const promise = new Promise((resolve, reject) => {
//             toast.promise(promise, {
//                 loading: "Wait! creating your account",
//                 success: (data) => {
//                     resolve(data?.data?.message);
//                 },
//                 error: (error) => {
//                     reject(error);
//                     toast.error(error?.response?.data?.message);
//                 },
//             });
//         });
//         return await response.data; // Return the response data directly
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//         throw error; // Re-throw the error to propagate it
//     }
// });




// export const login = createAsyncThunk("/auth/login", async (data) => {
//     try {
//         const res = await axiosInstance.post("user/login", data);
//         // Use toast.promise with promises in success and error callbacks
//         const successPromise = new Promise((resolve) => {
//             resolve(data?.data?.message);
//         });
//         const errorPromise = new Promise((_, reject) => {
//             reject("Failed to log in");
//         });
//         toast.promise(successPromise, {
//             loading: "Wait! Authentication in progress...",
//             success:  data?.data?.message,
//             error: "Failed to log in"
//         });
//         return await res.data; // Return the response data directly
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//         throw error; // Re-throw the error to propagate it
//     }
// });







// export const logout = createAsyncThunk("/auth/logout", async () => {
//     try {
//         const res = await axiosInstance.post("user/logout");
//         const logoutMessage = res.data.message || "Failed to log out"; // Use the actual message or a default one
//         const logoutPromise = toast.promise(logoutMessage, {
//             loading: "Wait! Logout in progress...",
//             success: "Logout successful",
//             error: "Failed to log out"
//         });
//         return await logoutPromise; // Return the promise from toast.promise
//     } catch (error) {
//         toast.error(error?.response?.data?.message);
//         throw error; // Re-throw the error to propagate it
//     }
// });


export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
      const response = await axiosInstance.post("user/register", data);
      const message = response.data.message;
      toast.success(message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  });
  
  export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
      const response = await axiosInstance.post("user/login", data);
      const message = response.data.message;
      toast.success(message);
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  });
  
  export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
      await axiosInstance.post("user/logout");
      localStorage.clear();
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  });

  export const updateProfile = createAsyncThunk("/user/update/profile", async (data) => {
    try {
        const res = axiosInstance.put(`user/update/${data[0]}`, data[1]);
        toast.promise(res, {
            loading: "Wait! profile update in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to update profile"
        });
        return (await res).data;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("user/me");
        return (await res).data;
    } catch(error) {
        toast.error(error.message);
    }
})


  


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder
        .addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.user?.role);
            state.isLoggedIn= true;
            state.data= action?.payload?.user;
            state.role= action?.payload?.user?.role;
        })
        .addCase(logout.fulfilled,(state,action)=>{
            localStorage.clear();
            state.data={};
            state.isLoggedIn=false;
            state.role="";
        })
        .addCase(getUserData.fulfilled, (state, action) => {
          if(!action?.payload?.user) return;
          localStorage.setItem("data", JSON.stringify(action?.payload?.user));
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("role", action?.payload?.user?.role);
          state.isLoggedIn = true;
          state.data = action?.payload?.user;
          state.role = action?.payload?.user?.role
      });
    }
});

export const {} = authSlice.actions;
export default authSlice.reducer;