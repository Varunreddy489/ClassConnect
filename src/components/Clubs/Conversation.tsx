import { UserClubsResponse } from "@/types/Client-types";

const Conversation = ({ data }: { data: UserClubsResponse }) => {
  return (
    <div
      className={`flex gap-2 items-center text-black dark:text-white hover:bg-sky-500 rounded p-2
				 py-1 cursor-pointer mb-4 `}
    >
      <div className={`avatar`}>
        <div className="w-8 md:w-12 rounded-full">
          {data.profilePic === null ? (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Element_Desktop_1.10.1_Linux_Yaru_%28cropped%29.png"
              alt={`${data.name}`}
            />
          ) : (
            <img
              src={`http://localhost:5000/images/${data.profilePic}`}
              alt={`${data.name}`}
            />
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
          <p className="font-bold dark:text-gray-200 text-sm md:text-md">
            {data.name}
          </p>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1" />
    </div>
  );
};

export default Conversation;
