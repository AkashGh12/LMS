import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";
import { isEmail, isValidPassword } from "../Helpers/regexMatcher";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: "",
  });

  function handleUserInput(e) {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  }

  function getImage(event) {
    event.preventDefault();
    // getting the image
    const uploadedImage = event.target.files[0];

    if (uploadedImage) {
      setSignupData({
        ...signupData,
        avatar: uploadedImage,
      });
      const fileReader = new FileReader();
      fileReader.readAsDataURL(uploadedImage);
      fileReader.addEventListener("load", function () {
        setPreviewImage(this.result);
      });
    }
  }

  async function createNewAccount(event) {
    event.preventDefault();
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.fullName ||
      !signupData.avatar
    ) {
      toast.error("Please fill all the details");
      return;
    }

    // checking name field length
    if (signupData.fullName.length < 5) {
      toast.error("Name should be atleast of 5 characters");
      return;
    }
    // checking valid email
    if (!isEmail(signupData.email)) {
      toast.error("Invalid email id");
      return;
    }
    // checking password validation
    if (!isValidPassword(signupData.password)) {
      toast.error(
        "Password should be 6 - 16 character long with atleast a number and special character"
      );
      return;
    }

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    // dispatch create account action
    const response = await dispatch(createAccount(formData));
    if (response?.payload?.success) {
      navigate("/");
    }
    

    setSignupData({
      fullName: "",
      email: "",
      password: "",
      avatar: "",
    });
    setPreviewImage("");
  }

  return (
    <HomeLayout>
      <div className="flex overflow-auto items-center justify-center h-[100vh] p-1">
        <form
          noValidate
          onSubmit={createNewAccount}
          className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-2xl"
        >
          <h2 className="text-xl text-center font-bold">Want to Sign Up? </h2>

          <label htmlFor="image_uploads" className=" cursor-pointer">
            {previewImage ? (
              <img
                src={previewImage}
                className=" w-24 h-24 rounded-full m-auto"
              />
            ) : (
              <BsPersonCircle className=" w-24 h-24 rounded-full m-auto" />
            )}
          </label>
          <input
            onChange={getImage}
            className="hidden"
            type="file"
            id="image_uploads"
            accept=".jpg,.png,.jpeg,.svg"
          />

          <div className=" flex flex-col gap-1">
            <label htmlFor="fullname" className=" font-semibold">
              UserName
            </label>
            <input
              type="Username"  // or remove the type attribute
              required
              name="fullName"
              id="fullName"
              placeholder="Enter Your Username"
              autoComplete="Username"
              className="bg-transparent px-2 py-1 text-[#FF6A3D]"
              onChange={handleUserInput}
              value={signupData.fullName}
            />
          </div>

          <div className=" flex flex-col gap-1">
            <label htmlFor="email" className=" font-semibold">
              Email
            </label>
            <input
              type="email"
              required
              name="email"
              id="email"
              placeholder="Enter Your Email"
              autoComplete="email"
              className="bg-transparent px-2 py-1  text-[#FF6A3D]"
              onChange={handleUserInput}
              value={signupData.email}
            />
          </div>

          <div className=" flex flex-col gap-1">
            <label htmlFor="email" className=" font-semibold">
              Password
            </label>
            <input
              type="password"
              required
              name="password"
              id="password"
              placeholder="Enter Your Password"
              autoComplete="password"
              className="bg-transparent px-2 py-1  text-[#FF6A3D]"
              onChange={handleUserInput}
              value={signupData.password}
            />
          </div>

          <button
            className=" bg-slate-600 p-2 rounded-sm hover:bg-slate-500 hover:text-[#FF6A3D] mt-2"
            type="submit"
          >
            Create Account
          </button>

          <p className="text-center mt-1">
            Already have an account?{" "}
            <Link to="/login" className=" cursor-pointer text-[#FF6A3D]">
              Login{" "}
            </Link>
          </p>
        </form>
      </div>
    </HomeLayout>
  );
}

export default Signup;
