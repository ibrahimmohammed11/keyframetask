import Head from "next/head";
import { dehydrate, QueryClient, useInfiniteQuery } from "react-query";
import { Loading } from "../../components/Loading/Loading";
import { signIn, useSession } from "next-auth/react";

const fetchUsers = async ({ pageParam = 1 }) => {
  const res = await fetch(
    `https://randomuser.me/api/?page=${pageParam}&results=10`
  );
  return res.json();
};

export async function getServerSideProps() {
  // fetch data to cache it on serve
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("users", fetchUsers);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Users() {
  const { status } = useSession();

  const {
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery(["users"], fetchUsers, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.info.page + 1;
    },
  });
  if (isLoading) return <Loading />;
  if (isError) return <span>Error: {error.message}</span>;

  if (status === "unauthenticated") {
    signIn();
  }
  return (
    <>
      <Head>
        <title>users</title>
      </Head>
      <div className="container mx-auto px-10 md:px-20 min-h-screen mt-4">
        <div className="flex justify-center items-center flex-wrap	">
          {data?.pages?.map((page) =>
            page?.results?.map((user, key) => {
              return (
                <div
                  key={key}
                  className="px-2 w-72 sm:w-6/12 md:w-72 xl:w-1/5  mb-4"
                >
                  <div className=" bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                    <img
                      className="rounded-t-lg  w-full h-52"
                      src={user.picture.large}
                      alt="img"
                    />

                    <div className="p-5">
                      <h5 className="mb-2 text-xl truncate font-bold tracking-tight text-gray-900 dark:text-white">
                        {user.name.first} {user.name.last}
                      </h5>

                      <p className="mb-3 text-md truncate font-normal text-gray-700 dark:text-gray-400">
                        {user?.email}
                      </p>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        <b>Gender:</b> {user?.gender}
                      </p>
                      <p className="mb-3 font-normal truncate text-gray-700 dark:text-gray-400">
                        <b>City:</b> {user?.location?.city}
                      </p>
                      <p className="mb-3 font-normal truncate text-gray-700 dark:text-gray-400">
                        <b>Country:</b> {user?.location?.country}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className="flex justify-center mb-3">
        <button
          className="bg-blue-500 px-6 py-2 text-white block mt-4 rounded-md cursor-pointer text-md"
          onClick={fetchNextPage}
        >
          Load More
        </button>
      </div>
      {/* <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div> */}
    </>
  );
}
