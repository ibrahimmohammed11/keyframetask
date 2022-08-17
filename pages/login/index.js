import React from "react";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import login from "../../public/draw2.svg";
import Image from "next/image";

const Login = () => {
  return (
    <>
      <div className="min-h-screen">
        <section>
          <div className="container px-6 py-12">
            <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
              <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                <Image src={login} className="w-full" alt="login" />
              </div>
              <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                <h3 className="text-center my-3 text-xl	text-blue-600 lg:text-3xl">
                  Login
                </h3>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={yup.object().shape({
                    email: yup.string().required().email(),
                    password: yup
                      .string()
                      .required("Please Enter your password"),
                    //   .matches(
                    //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                    //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
                    //   ),
                  })}
                  onSubmit={(values, { setSubmitting, resetForm }) => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    resetForm();
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <div className="mb-6">
                        <Field
                          type="email"
                          name="email"
                          className="form-control block w-full px-4 py-2 text-xl text-gray-700 bg-white border border-solid border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                          placeholder="Email address"
                        />
                      </div>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-600 p-2 mt-1"
                      />
                      <div className="mb-6">
                        <Field
                          type="password"
                          name="password"
                          className="form-control block w-full px-4 py-2 text-xl text-gray-700 bg-white border border-solid border-gray-300 rounded focus:border-blue-600 focus:outline-none"
                          placeholder="Password"
                        />
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-600 p-2 mt-1"
                      />

                      <div className="mt-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-block px-7 py-3 bg-blue-600 text-white uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg w-full"
                        >
                          Log In
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Login;
