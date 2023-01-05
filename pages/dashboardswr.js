import useSWR from "swr";

const fetcher = (url) => fetch(url).then((resp) => resp.json());

function DashboardSWR() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:4000/dashboard",
    fetcher
  );

  if (error) {
    return <h1>Something went wrong!</h1>;
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <p>Posts: {data.posts}</p>
      <p>Likes: {data.likes}</p>
      <p>Followers: {data.followers}</p>
      <p>Following: {data.following}</p>
    </div>
  );
}

export default DashboardSWR;
