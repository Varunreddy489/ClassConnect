// import axios from "axios";
import { MoveRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

import Navbar from "@/components/Navbar";
import { ClubTypes } from "@/types/Client-types";
import { axiosInstance } from "@/lib/axios";
import ClubCard from "@/components/Clubs/ClubCard";
import { Button } from "@/components/ui/button";
import FeaturesCard from "@/components/FeaturesCard";
import { Link } from "react-router-dom";

const features = [
  {
    image:
      "https://alumni.ucdavis.edu/sites/g/files/dgvnsk11386/files/styles/sf_landscape_16x9/public/media/images/connect%20with%20faculty.jpeg?h=a1e1a043&itok=SAmi0Pah",
    icon: "📚",
    text: "Connect with Classmates and Professors",
    description:
      "Engage with your peers and faculty to foster meaningful relationships and enhance your learning experience.",
  },
  {
    image: "https://study.com/cimages/multimages/16/study_group.jpeg",
    icon: "📅",
    text: "Discover and Join Clubs and Events",
    description:
      "Explore various clubs and activities on campus to meet new people and pursue your interests.",
  },
  {
    image:
      "https://www.valtech.com/4aa5fd/globalassets/15-uk/02-images/04-insights/post-it-notes-1284667_1920.jpg?width=1600&height=720&mode=crop&format=jpg",
    icon: "📱",
    text: "Access Resources and Notes",
    description:
      "Utilize a wealth of study materials and notes to support your academic journey.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToDFYULOlBn4rEqCPBxvS8fOe38HQkRLGAhg&s",
    icon: "📝",
    text: "Ask Questions and Get Answers",
    description:
      "Post your questions and get answers from classmates and professors to clarify your doubts.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRxH9mNOvRMX5hCuU8V_wpsUHvdaW5tfEIpQ&s",
    icon: "📅",
    text: "Event Calendar",
    description:
      "Stay informed about upcoming events and important deadlines to manage your time effectively.",
  },
  {
    image:
      "https://cdn.prod.website-files.com/60ffdd9e3c66d71b667eba0b/65f1c9c9d2fbf46b0ff33b92_Community%20Engagement%20Platforms_Hero.png",
    icon: "📝",
    text: "Community-Driven and Collaborative Platform",
    description:
      "Collaborate with fellow students on projects and initiatives for a richer learning experience.",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT75xBy5vhIeMYbRRsLka8VmRkLWaq73Ai6wQ&s",
    icon: "📝",
    text: "Community Support and Resources",
    description:
      "Access various resources provided by the community to enhance your educational experience.",
  },
  {
    image: "https://study.com/cimages/multimages/16/study_group.jpeg",
    icon: "📝",
    text: "Feedback and Suggestions System",
    description:
      "Provide your insights and suggestions to help improve the platform for everyone.",
  },
];

const LandingPage = () => {
  const fetchClubs = async () => {
    try {
      const response = await axiosInstance.get("/club", {
        withCredentials: true,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("error in fetchClubs:", error);
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["clubs"],
    queryFn: fetchClubs,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading clubs: {error.message}</div>;
  }

  return (
    <div className=" px-4  ">
      <Navbar />
      <br />
      {/* Banner Image */}
      <div
        className="flex justify-center items-center h-96 w-full max-w-6xl mx-auto p-8 rounded-xl bg-cover bg-center shadow-lg"
        style={{ backgroundImage: "url('/1.webp')" }}
      >
        <div className="text-left text-white flex flex-col justify-center h-full space-y-6 bg-black bg-opacity-50 p-8 rounded-lg">
          <div className="space-y-2">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              College Connections
            </h1>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              made simple
            </h1>
            <span className="text-xl mt-4 block">
              Connect, Learn, and Grow together
            </span>
          </div>
          <div>
            <Link to="/login">
              <Button
                variant={"secondary"}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out rounded-lg"
              >
                <span>Get Started</span>
                <MoveRight className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Key Features Image */}
      <div className="mt-10  ">
        <h1 className="text-5xl font-bold italic text-center  ">Features</h1>

        <div className="flex flex-wrap justify-center -4 space-y-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg shadow-md m-4 w-80 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <FeaturesCard feature={feature} />
            </div>
          ))}
        </div>
      </div>

      {/* Clubs */}

      <div className="mt-10">
        <h1 className="text-5xl font-bold italic text-center">Clubs</h1>

        <div className="flex flex-wrap justify-center space-y-4">
          {data?.map((club: ClubTypes) => (
            <div
              key={club.id}
              className="p-6 rounded-lg shadow-md m-4 w-80 transition-transform transform hover:scale-105 hover:shadow-lg"
            >
              <ClubCard club={club} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
