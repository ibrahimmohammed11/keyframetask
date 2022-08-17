import React, { Fragment, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Error = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);
  return (
    <Fragment>
      <div className="flex justify-center items-center flex-col min-h-screen">
        <h2 className="text-lg">Page not found</h2>
        <Link href="/">
          <a className="mt-4 text-white bg-blue-700 rounded-lg text-sm px-7 py-2">
            Go Home
          </a>
        </Link>
      </div>
    </Fragment>
  );
};

export default Error;
