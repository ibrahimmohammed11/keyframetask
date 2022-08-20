import React, { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "react-query";
import { Loading } from "../../components/Loading/Loading";
import StarRatings from "react-star-ratings";
import { signIn, useSession } from "next-auth/react";

const IMG_API = "https://image.tmdb.org/t/p/w500/";

const fetchMoives = async (page) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=f1aca93e54807386df3f6972a5c33b50&language=en-US&page=${page}`
  );
  return res.json();
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("moivespagi", fetchMoives);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

const MoivesPagi = () => {
  const [page, setPage] = useState(1);
  const { status } = useSession();

  const { isLoading, error, data, isError } = useQuery(
    ["moivespagi", page],
    () => fetchMoives(page),
    { keepPreviousData: true }
  );
  if (isLoading) return <Loading />;
  if (isError) return <span>Error: {error.message}</span>;

  if (status === "unauthenticated") {
    signIn();
  }
  return (
    <>
      <div>
        <div className="container mx-auto px-10 md:px-20 min-h-screen mt-4">
          <div className="flex justify-center items-center flex-wrap	">
            {data?.results?.map((item, index) => {
              return (
                <div
                  key={index}
                  className="px-2 w-72 sm:w-6/12 md:w-72 xl:w-1/5  mb-4"
                >
                  <div className=" bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <img
                      className="rounded-t-lg  w-full h-80 border-b"
                      src={`${IMG_API}${item.poster_path}`}
                      alt={item.title}
                    />

                    <div className="p-5">
                      <h5 className="mb-2 text-xl truncate font-bold tracking-tight text-gray-900 dark:text-white">
                        {item.title}
                      </h5>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        <b>Rated:</b> {item.vote_average}
                      </p>
                      <StarRatings
                        rating={item.vote_average}
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
        <div className="flex justify-center mb-3">
          <button
            className="disabled:opacity-25 mr-2 bg-blue-500 text-white block p-2 rounded-md cursor-pointer text-sm"
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
          >
            Previous Page
          </button>
          <button
            className="disabled:opacity-25 bg-blue-500 text-white block p-2 rounded-md cursor-pointer text-sm"
            disabled={page >= data?.total_pages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next Page
          </button>
        </div>
      </div>
    </>
  );
};

export default MoivesPagi;
