import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function CourseDescription() {
  const { state } = useLocation();

  const navigate= useNavigate();

  const { role, data } = useSelector((state) => state.auth);
  return (
    <div className="min-h-[100vh] pt-12 px-20 flex flex-col items-center justify-center text-white">
      <div className="grid grid-cols-2 gap-10 relative">
        <div className=" space-y-5">
          <img
            className="w-full h-64"
            src={state?.thumbnail?.secure_url}
            alt="Thumbnail"
          />
          <div className="space-y-4">
            <div className="flex  flex-col items-center justify-center text-xl">
              <p className="font-semibold ">
                <span className="text-yellow-500 font-bold">
                  Total Lectures : { " "}
                </span>
                {state?.numberOfLectures}
              </p>

              <p className="font-semibold ">
                <span className="text-yellow-500 font-bold">
                  Lecturer : { " "}
                </span>
                {state?.createdBy}
              </p>
            </div>
            {role === "ADMIN" || data?.subscription?.status === "active" || "created" ? (
              <button onClick={()=>navigate('/course/displaylecture',{state:{...state}})} className="bg-yellow-500 text-xl rounded-md font-bold p-5 py-3 w-full hover:bg-yellow-400 transition-all ease-in-out">
                Watch Lecture
              </button>
            ) : (
              <button onClick={()=>navigate('/checkout')} className="bg-yellow-500 text-xl rounded-md font-bold p-5 py-3 w-full hover:bg-yellow-400 transition-all ease-in-out">
                Subscribe
              </button>
            )}
          </div>
        </div>

        <div className=" space-y-5 text-xl">
                <h1 className=" text-3xl font-bold text-yellow-500 mb-5 text-center">
                    {state?.title}
                </h1>
                <p className="text-yellow-500 "> Course Description</p>
                <p>{state?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseDescription;
