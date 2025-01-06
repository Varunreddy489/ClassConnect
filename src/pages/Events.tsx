import CreateEvents from "@/components/CreateEvents";
import EventCard from "@/components/EventCard";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDown } from "lucide-react";

const Events = () => {
  console.log(Date.now());
  return (
    <div className="  p-8">
      <div>
        <SearchBar />
      </div>
      <div className="flex justify-between  ">
        <div>
          <Tabs defaultValue="upcoming" className="w-[400px] bg-transparent  ">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">past</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <EventCard />
              </div>
            </TabsContent>
            <TabsContent value="past">Change your past here.</TabsContent>
          </Tabs>
        </div>
        <div className="flex space-x-3">
          <Button className="text-center">
            Sort By <ChevronDown />
          </Button>
          <CreateEvents />
        </div>
      </div>
    </div>
  );
};

export default Events;
