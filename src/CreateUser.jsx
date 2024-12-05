import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const CreateUser = () => {
  const { rid } = useParams();
  const { register, handleSubmit, setValue } = useForm();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (rid !== "add") {
      const getUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/getUsersDetails/${rid}`);
          if (response.data) {
            setUser(response.data);
            // Set form values after data is received
            setValue("name", response.data[0].name || "shehbaz");
            setValue("email", response.data[0].email);
            setValue("status", response.data[0].status);
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to fetch user data");
        }
      };

      getUserDetails();
    }
  }, [rid, setValue]);

  const submit = async (data) => {
    const formData = { ...data, rid };
    try {
      const response = await axios.post('http://localhost:8000/api/CreateUser', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data) {
        toast.success(response.data?.message);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error submitting the form");
    }
  };

  return (
    <>
      <ToastContainer />
      <section className="bg-white">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form onSubmit={handleSubmit(submit)} className="w-full max-w-md">
            <div className="mb-3 w-fit px-4 py-1 rounded-md bg-violet-500">
              <Link to="/" className="text-white">
                Back
              </Link>
            </div>
            <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
              Enter User Details
            </h1>

            <div className="relative flex items-center mt-8">
              <input
                type="text"
                {...register("name", { required: true })}
                className="block w-96 py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Name"
              />
            </div>

            <div className="relative flex items-center mt-8">
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Invalid email format",
                  },
                })}
                className="block w-96 py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
              />
            </div>

            <div className="relative flex items-center mt-4">
              {rid !== "add" && (
                <select
                  {...register("status")}
                  className="block w-96 py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                >
                  <option value="" disabled>Select Status</option>
                  <option value="1" selected={user?.status === "1"}>Active</option>
                  <option value="0" selected={user?.status === "0"}>Inactive</option>
                </select>
              )}
            </div>

            <div className="relative flex items-center mt-4">
              <input
                type="password"
                {...register("password", { required: true })}
                className="block w-96 px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
            </div>

            <div className="mt-6">
              <button className="w-96 px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-violet-500 focus:outline-none">
                {rid === "add" ? "Submit" : "Update"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CreateUser;
