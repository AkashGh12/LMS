import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { getUserData, updateProfile } from '../../Redux/Slices/AuthSlice';
import { useNavigate} from 'react-router-dom';
import HomeLayout from '../../Layout/HomeLayout';
import { BsPersonCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { AiOutlineArrowLeft } from 'react-icons/ai';

function EditProfile() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        previewImage: "",
        fullName: "",
        avatar: undefined,
        userId: useSelector((state) => state?.auth?.data?._id)
    });

    function handleImageUpload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage
                })
            })
        }
    }

    function handleInputChanges(e) {
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        console.log(data);
        if(!data.fullName || !data.avatar) {
            toast.error("All fields are mandatory");
            return;
        }
        if(data.fullName.length < 5) {
            toast.error("Name cannot be of less than 5 characters");
            return;
        }
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);
        console.log(formData.entries().next())
        console.log(formData.entries().next())
        await dispatch(updateProfile([data.userId, formData]));

        await dispatch(getUserData());

        navigate("/user/profile");
    }

    return (
        <HomeLayout>
            <div className=' flex items-center justify-center h-[100vh]'>
                <form
                onSubmit={onFormSubmit}
                className=' flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 shadow-[0_0_10px_black]'
                action="">
                    <h1 className=' text-center text-2xl font-semibold'> Edit Profile</h1>
                    <label className=' cursor-pointer' htmlFor='image_uploads'>
                        {data.previewImage ? (
                            <img src={data.previewImage} 
                            className=' w-28 h-28 rounded-full m-auto' />
                        ):(
                            <BsPersonCircle className=' w-28 h-28 rounded-full m-auto'/>
                        )

                        }

                    </label>
                    <input 
                    type="file"
                    onChange={handleImageUpload}
                    className='hidden'
                    id='image_uploads'
                    name='image_uploads'
                    accept='.jpg,.jpeg,.png' />

                    <div className=' flex flex-col gap-1'>
                        <label htmlFor="fullName" className='text-lg font-semibold'>Full Name</label>
                        <input 
                        type="text"
                        required
                        name='fullName'
                        id='fullName'
                        placeholder='Enter Your Name'
                        className='bg-transparent px-2 py-1 border'
                        value={data.fullName}
                        onChange={handleInputChanges} />

                    </div>
                    <button type='submit' className=" w-full bg-transparent p-2 rounded-sm hover:bg-slate-700 border border-[#FF6A3D] mt-2 transition-all ease-in-out text-center">Update Profile
                    </button>
                    <Link to={"/user/profile"}>
                        <p className=' link text-accent cursor-pointer flex items-center justify-center w-full'> 
                        <AiOutlineArrowLeft/>Go back to profile</p>
                    </Link>

                </form>
            </div>
        </HomeLayout>
    )
}

export default EditProfile
