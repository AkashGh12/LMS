import React, { useState } from 'react'
import HomeLayout from '../Layout/HomeLayout'
import toast from 'react-hot-toast';
import axiosInstance from '../Helpers/axiosInstance';
import { isEmail, isValidPassword} from '../Helpers/regexMatcher';

function ContactUs() {

    const [userInput , setUserInput] = useState({
        name:"",
        email:"",
        message:""
    });

    function handleInputChange(e){
        const {name,value} = e.target;
        console.log(name,value);
        setUserInput({
            ...userInput,
            [name]:value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.email || !userInput.name || !userInput.message){
            toast.error("All fields are mandetory")
            return;
        }

        // checking valid email
    if (!isEmail(userInput.email)) {
        toast.error("Invalid email id");
        return;
      }
      // checking password validation
      if (!isValidPassword(userInput.password)) {
        toast.error(
          "Password should be 6 - 16 character long with atleast a number and special character"
        );
        return;
      }

      try {
        const response = axiosInstance.post('/contact',userInput);
        toast.promise(response,{
            loading:'Sending your message',
            success:"Form submited successfully.",
            error:'Failed to submit the form'
        })
        const contactResponse = await response;
        if (contactResponse?.data?.success) {
            setUserInput({
                name:"",
                email:"",
                message:""
            });

        } 
    }   catch (error) {
        toast.error("Operation Failed")
    }
    }

    return (
        <HomeLayout>
            <div className=' flex items-center justify-center h-[100vh]'>
                <form onSubmit={onFormSubmit} noValidate
                 className='flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]'>
                    <h1 className=' text-3xl font-semibold mb-4'>
                        Contact Form
                    </h1>
                    <div className=' flex flex-col w-full gap-1'>
                        <label htmlFor="name" className=' text-xl font-semibold'>
                            Name
                        </label>
                        <input
                        className=' bg-transparent  px-2 py-1 rounded-sm text-[#FF6A3D]'
                        id='name'
                        name='name'
                        placeholder='Enter your name' 
                        type="text" 
                        onChange={handleInputChange}
                        value={userInput.name}/>
                        
                    </div>

                    <div className=' flex flex-col w-full gap-1'>
                        <label htmlFor="email" className=' text-xl font-semibold'>
                            Email
                        </label>
                        <input
                        className=' bg-transparent  px-2 py-1 rounded-sm text-[#FF6A3D]'
                        id='email'
                        name='email'
                        placeholder='Enter your EmailId' 
                        type="text"
                        onChange={handleInputChange} 
                        value={userInput.email}/>
                    </div>

                    <div className=' flex flex-col w-full gap-1'>
                        <label htmlFor="message" className=' text-xl font-semibold'>
                            Message
                        </label>
                        <textarea
                        className=' bg-transparent  px-2 py-1 rounded-sm text-[#FF6A3D] resize-none h-40'
                        id='message'
                        name='message'
                        placeholder='Enter your Thoughts' 
                        type="text"
                        onChange={handleInputChange} 
                        value={userInput.message}/>
                    </div>

                    <button type='submit'
                    className=' border border-orange-500 w-full p-2  hover:bg-gray-800 transition-all ease-in-out rounded-md'>
                        Submit
                    </button>

                </form>
            </div>
            
        </HomeLayout>
    )
}

export default ContactUs
