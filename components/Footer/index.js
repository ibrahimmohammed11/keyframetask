import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaGoogle } from "react-icons/fa";
import keyframe from "../../public/keyframe.png";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className=" border-t">
        <div className="pt-1">
          <div className="flex justify-center items-center my-4">
            <span className="mr-9">
              <FaFacebookF />
            </span>
            <span className="mr-9">
              <FaTwitter />
            </span>
            <span className="mr-9">
              <FaInstagram />
            </span>
            <span className="mr-9">
              <FaGoogle />
            </span>
          </div>
        </div>

        <div className="p-4 flex flex justify-center items-center">
          <span className="mr-2">© 2022 Copyright:</span>
          <a
            href="https://keyframe-eg.com/"
            target="_blank"
            className="flex justify-center"
          >
            <Image src={keyframe} alt="keyframe" width={20} height={20} />
            <span className="ml-2">Keyframe</span>
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
