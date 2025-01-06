import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Student } from "@/types/Client-types";
import { Button } from "@/components/ui/button";
import { useConnectionStore } from "@/stores/useConnectionStore";
import RequestCard from "@/components/connections/RequestCard";
import SuggestedFriends from "@/components/connections/SuggestedFriends";

const StudentsNetwork = () => {
  const [search, setSearch] = useState("");
  const {
    users,
    searchUsers,
    isLoading,
    error,
    suggestions,
    getSuggestedConnections,
  } = useConnectionStore();

  const handleSearch = (user: string) => {
    if (user.trim()) {
      searchUsers(user.trim());
    }
  };

  if (error) {
    <div className="flex items-center text-red-500 justify-center">
      Error: {error}
    </div>;
  }

  useEffect(() => {
    getSuggestedConnections();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          value={search}
          className="dark:text-white text-black "
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter Student Name, ID or Email"
        />
        <Button
          type="submit"
          onClick={() => handleSearch(search)}
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </div>
      <div>
        {users.length > 0 ? (
          <div className="w-fit flex flex-col gap-3 items-center">
            {users.map((user) => (
              <RequestCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          search.length > 0 && <p className="text-gray-500">No users found.</p>
        )}
      </div>

      <div className="w-full text-center mt-10  ">
        <h1 className="text-2xl dark:text-white text-black font-bold mb-4 ">
          Suggested Connections
        </h1>

        {suggestions?.map((suggestion: Student) => (
          <SuggestedFriends data={suggestion} key={suggestion.id} />
        ))}
      </div>
    </div>
  );
};

export default StudentsNetwork;
