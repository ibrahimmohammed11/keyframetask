import React, { Fragment } from "react";
import { BallTriangle } from "react-loader-spinner";

export const Loading = () => {
  return (
    <Fragment>
      <div className="flex justify-center items-center min-h-screen">
        <BallTriangle
          height="50"
          width="50"
          color="#3b82f6"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        />
      </div>
    </Fragment>
  );
};
