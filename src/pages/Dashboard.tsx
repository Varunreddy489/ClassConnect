import StatsCard from "@/components/StatsCard";
import { useStatsStore } from "@/stores/useStatsStore";
import { useEffect } from "react";

const Dashboard = () => {
  const { fetchStats, stats } = useStatsStore();

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const user = localStorage.getItem("user");
  const name = user ? JSON.parse(user).name : "User";

  return (
    <div className="min-h-screen bg-gradient-to-b dark:from-zinc-900 via-zinc-900 to-black dark:text-zinc-100 text-zinc-900  p-8">
      <div className="w-full  h-52 flex items-center justify-between bg-purple-500 rounded-md p-10">
        <div>
          <img
            src="/dashboard.jpg"
            className="w-48 h-44 rounded-md object-cover bg-purple-500 mix-blend-multiply"
            alt={`${name}'s profile`}
          />
        </div>
        <div>
          <span className="text-left  ">Welcome back,</span>
          <h1 className="xl:text-4xl font-bold md:text-2xl">{name}</h1>
        </div>
      </div>
      <div className="mt-4">
        <StatsCard data={stats} />
      </div>

      <div className="flex gap-4 mt-6">
        <button className="bg-purple-500 hover:bg-purple-600 dark:text-white py-2 px-4 rounded-md">
          Schedule Event
        </button>
        <button className="bg-violet-500 hover:bg-violet-600 dark:text-white py-2 px-4 rounded-md">
          Create Club
        </button>
        <button className="bg-emerald-500 hover:bg-emerald-600 dark:text-white py-2 px-4 rounded-md">
          View Connections
        </button>
        <button className="bg-orange-500 hover:bg-orange-600 dark:text-white py-2 px-4 rounded-md">
          Apply for Jobs
        </button>
      </div>

      <div className="bg-zinc-800/50 border-zinc-700/50 rounded-md p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <ul className="space-y-3">
          <li className="flex items-center justify-between">
            <span>Joined the 'Design Club'</span>
            <span className="text-sm text-zinc-400">2 days ago</span>
          </li>
          <li className="flex items-center justify-between">
            <span>Event 'Web Dev Workshop' scheduled</span>
            <span className="text-sm text-zinc-400">3 hours ago</span>
          </li>
        </ul>
      </div>

      <div className="bg-zinc-800/50 border-zinc-700/50 rounded-md p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
        <ul className="space-y-3">
          <li className="flex items-center justify-between">
            <span>Prepare for club presentation</span>
            <button className="text-emerald-500">Mark as Done</button>
          </li>
          <li className="flex items-center justify-between">
            <span>Review job applications</span>
            <button className="text-emerald-500">Mark as Done</button>
          </li>
        </ul>
      </div>

      <div className="bg-zinc-800/50 border-zinc-700/50 rounded-md p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Progress Tracker</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm">Clubs Created</p>
            <div className="relative h-3 w-full bg-zinc-700 rounded-full">
              <div className="absolute top-0 left-0 h-3 w-2/3 bg-violet-500 rounded-full"></div>
            </div>
            <span className="text-sm text-zinc-400">5/10</span>
          </div>
          <div>
            <p className="text-sm">Events Hosted</p>
            <div className="relative h-3 w-full bg-zinc-700 rounded-full">
              <div className="absolute top-0 left-0 h-3 w-3/5 bg-emerald-500 rounded-full"></div>
            </div>
            <span className="text-sm text-zinc-400">3/5</span>
          </div>
        </div>
      </div>
      <div className="bg-zinc-800/50 border-zinc-700/50 rounded-md p-6 mt-6">
        <h2 className="text-xl font-bold mb-4">Upcoming Events</h2>
        <ul className="space-y-3">
          <li>
            <p>Hackathon 2024</p>
            <span className="text-sm text-zinc-400">Dec 15, 2024</span>
          </li>
          <li>
            <p>UI/UX Workshop</p>
            <span className="text-sm text-zinc-400">Jan 10, 2025</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
