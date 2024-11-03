import { Button } from "@/components/ui/button";
import { axiosInstance } from "@/lib/axios";

const Jobs = () => {
  const fetchJobs = async () => {
    // const options = {
    //   method: "GET",
    //   url: "https://linkedin-data-api.p.rapidapi.com/get-job-details",
    //   params: { id: "3738360408" },
    //   headers: {
    //     "x-rapidapi-key": "3f0198e386msh7d10af15b`576650p1ab73djsn94d26797f183",
    //     "x-rapidapi-host": "linkedin-data-api.p.rapidapi.com",
    //   },
    // };

    // try {
    //   const response = await axiosInstance.request(options);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }



    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/estimated-salary',
      // params: {
      //   job_title: 'Java Developer',
      //   location: 'New-York, NY, USA',
      //   radius: '100'
      // },
      headers: {
        'x-rapidapi-key': '3f0198e386msh7d10af15b576650p1ab73djsn94d26797f183',
        'x-rapidapi-host': 'jsearch.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axiosInstance.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
      <Button onClick={fetchJobs}>Jobs</Button>
    </div>
  );
};

export default Jobs;
