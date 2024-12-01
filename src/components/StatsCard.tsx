import {
  Bell,
  BriefcaseBusiness,
  Cable,
  CalendarCheck,
  Club,
  UserPlus,
  Users,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface StatsCardProps {
  createdClubsCount: number;
  joinedClubsCount: number;
  connectionsCount: number;
  pendingConnectionsCount: number;
  unreadNotificationsCount: number;
}
const StatsCard = ({ data }: { data: StatsCardProps }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 ">
      <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-emerald-500/10 `}>
              <Cable className="size-6 text-emerald-500 " />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Total Connections </p>
              <p className="text-2xl font-bold">{data.connectionsCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-violet-500/10  `}>
              <Club className="size-6 text-violet-500 " />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Created Clubs</p>
              <p className="text-2xl font-bold">{data.createdClubsCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-sky-500/10 `}>
              <Users className="size-6 text-sky-500  " />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Club Member</p>
              <p className="text-2xl font-bold">{data.joinedClubsCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-orange-500/10  `}>
              <UserPlus className="size-6  " />
            </div>
            <div>
              <p className="text-sm text-zinc-400">Connection Requests</p>
              <p className="text-2xl font-bold">
                {data.pendingConnectionsCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-blue-500/10 `}>
              <Bell className="w-6 h-6 text-blue-500" />
            </div>

            <div>
              <p className="text-sm text-zinc-400">Pending Notifications</p>
              <p className="text-2xl font-bold">
                {data.unreadNotificationsCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-blue-500/10 `}>
              <BriefcaseBusiness className="w-6 h-6 text-blue-500" />
            </div>

            <div>
              <p className="text-sm text-zinc-400">Jobs Applied</p>
              <p className="text-2xl font-bold">
                {data.unreadNotificationsCount}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800/80 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-blue-500/10 `}>
              <CalendarCheck className="w-6 h-6 text-blue-500" />
            </div>

            <div>
              <p className="text-sm text-zinc-400">Events Scheduled</p>
              <p className="text-2xl font-bold">
                {/* {data.unreadNotificationsCount} */}3
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCard;
