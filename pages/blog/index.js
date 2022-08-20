import Head from "next/head";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { Loading } from "../../components/Loading/Loading";

const Blog = () => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen">
        <Loading />
      </div>
    );
  }
  if (status === "unauthenticated") {
    signIn();
  }
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <div className="min-h-screen text-center">
        <h1 className="text-3xl text-blue-700 my-5">Protected Page</h1>
        <p className="text-xl">
          You can view this page because you are signed in.
        </p>
      </div>
    </>
  );
};

export default Blog;
