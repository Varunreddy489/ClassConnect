import StatsCard from "@/components/StatsCard";
import { useStatsStore } from "@/stores/useStatsStore";
import { useEffect } from "react";

const Dashboard = () => {
  const { fetchStats, stats } = useStatsStore();

  useEffect(() => {
    fetchStats();
  }, []);

  const user = localStorage.getItem("user");
  const name = user ? JSON.parse(user).name : null;

  console.log(stats);
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900to-black text-zinc-100 p-8 ">
      <h1 className="text-center text-3xl font-bold mb-5 ">
        {" "}
        {name}`s Dashboard{" "}
      </h1>
      <div>
        <StatsCard data={stats} />
      </div>
    </div>
  );
};

export default Dashboard;
