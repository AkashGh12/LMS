import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState={
    courseData:[]
}



export const getAllCourses = createAsyncThunk("/course/get", async () => {
    try {
        const response = axiosInstance.get("/courses");
        toast.promise(response, {
            loading: "loading course data...",
            success: "Courses loaded successfully",
            error: "Failed to get the courses",
        });

        return (await response).data.courses;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});


export const deleteCourses = createAsyncThunk("/course/get", async (id) => {
    try {
        const response = axiosInstance.delete(`/courses/${id}`);
        toast.promise(response, {
            loading: "Deleting course data...",
            success: "Course deleted successfully",
            error: "Failed to delete the courses",
        });

        return (await response).data.courses;
    } catch(error) {
        toast.error(error?.response?.data?.message);
    }
});




export const createNewCourse = createAsyncThunk("/course/create", async (data) => {
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append('description', data?.description);
        formData.append('category', data?.category);
        formData.append('createdBy', data?.createdBy);
        formData.append('thumbnail', data?.thumbnail);

        const response = axiosInstance.post("/courses", formData);

        // Assuming toast.promise returns a promise, you can await it
         toast.promise(response, {
            loading: 'Creating New Course...',
            success: 'Course Created',
            error: "There was a problem creating your course, please try again."
        });
        console.log('course created 2');

        return response.data; // Return the data from the Axios response
    } catch (error) {
        toast.error(error?.response?.data?.message);
        throw error; // Rethrow the error so that Redux Toolkit can handle it
    }
});


const courseSlice= createSlice({
    name:"courses",
    initialState,
    reducers:{},
    extraReducers:(builder) =>{
        builder.addCase(getAllCourses.fulfilled,(state,action) =>{
            if(action.payload){
                console.log(action.payload);
                state.courseData=[...action.payload]
            }
        })

    }
})

export default courseSlice.reducer;