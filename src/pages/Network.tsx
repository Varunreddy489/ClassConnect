import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Clubs from "./Clubs";
import StudentsNetwork from "./StudentsNetwork";

const Network = () => {
  return (
    <div className=" text-zinc-100 p-8">
      <Tabs defaultValue="students" className="text-xl"> 
        <TabsList>
          <TabsTrigger className="text-xl" value="clubs">
            Clubs
          </TabsTrigger>
          <hr className="p-1" />
          <TabsTrigger value="students" className="text-xl">
            Students
          </TabsTrigger>
        </TabsList>
        <TabsContent className="" value="clubs">
          <Clubs />
        </TabsContent>
        <TabsContent value="students">
          <StudentsNetwork />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Network;
