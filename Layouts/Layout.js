import React, { Fragment, useState } from "react";
import Head from "next/head";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <Fragment>
      <Head>
        <meta name="description" content="keyframe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Fragment>
  );
}
