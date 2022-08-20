import React, { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Loading } from "../../components/Loading/Loading";
import StarRatings from "react-star-ratings";
import { signIn, useSession } from "next-auth/react";

const IMG_API = "https://image.tmdb.org/t/p/w500/";

const fetchMoives = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&page=1`
  );
  return res.json();
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("movies", fetchMoives);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const Moives = (props) => {
  const { status } = useSession();

  const { isLoading, error, isError } = useQuery(["movies"], fetchMoives);
  if (isLoading) return <Loading />;
  if (isError) return <span>Error: {error.message}</span>;

  if (status === "unauthenticated") {
    signIn();
  }

  let { results } = props?.dehydratedState?.queries[0]?.state?.data;

  return (
    <>
      <div>
        <div className="container mx-auto px-10 md:px-20 min-h-screen mt-4">
          <div className="flex justify-center items-center flex-wrap	">
            {results?.slice(0, 15).map((movie) => {
              return (
                <div
                  key={movie?.id}
                  className="px-2 w-72 sm:w-6/12 md:w-72 xl:w-1/5  mb-4"
                >
                  <div className=" bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <img
                      className="rounded-t-lg  w-full h-80 border-b"
                      src={`${IMG_API}${movie?.poster_path}`}
                      alt={movie?.title}
                    />

                    <div className="p-5">
                      <h5 className="mb-2 text-xl truncate font-bold tracking-tight text-gray-900 dark:text-white">
                        {movie?.title}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        <b>Rated:</b> {movie?.vote_average}
                      </p>
                      <StarRatings
                        rating={movie?.vote_average}
                        starRatedColor="gold"
                        numberOfStars={10}
                        name="rating"
                        starDimension="16px"
                        starSpacing="1px"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Moives;
