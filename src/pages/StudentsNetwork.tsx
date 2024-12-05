import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import RequestCard from "@/components/RequestCard";
import SuggestedFriends from "@/components/SuggestedFriends";
import { useConnectionStore } from "@/stores/useConnectionStore";
import { Student } from "@/types/Client-types";

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

  error && (
    <div className="flex items-center text-red-500 justify-center">
      Error: {error}
    </div>
  );

  useEffect(() => {
    getSuggestedConnections();
  }, []);

  console.log(suggestions);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="search"
          value={search}
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

      {users.length > 0 ? (
        <div className="w-fit flex flex-col gap-3 items-center">
          {users.map((user) => (
            <RequestCard key={user.id} user={user} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No users found.</p>
      )}
      {suggestions?.map((suggestion: Student) => (
        <SuggestedFriends data={suggestion} key={suggestion.id} />
      ))}
    </div>
  );
};

export default StudentsNetwork;
