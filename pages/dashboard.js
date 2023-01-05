import { useState, useEffect } from "react";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    async function LoadDashboardData() {
      const response = await fetch("http://localhost:4000/dashboard");
      const data = await response.json();
      setIsLoading(false);
      setDashboardData(data);
    }

    LoadDashboardData();
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      <h1>Dashboard</h1>
      <div>
        <p>Posts: {dashboardData.posts}</p>
        <p>Likes: {dashboardData.likes}</p>
        <p>Followers: {dashboardData.followers}</p>
        <p>Following: {dashboardData.following}</p>
      </div>
    </>
  );
}

export default Dashboard;
