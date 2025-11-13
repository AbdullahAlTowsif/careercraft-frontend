/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select";
import { useGetAllJobsQuery } from "@/redux/features/jobs/jobs.api";
import { useSearchParams } from "react-router";

const AllJobs = () => {
    const [searchParams] = useSearchParams();

    // Correct Params
    const location = searchParams.get("location") || "";
    const jobType = searchParams.get("jobType") || "";
    const recommendedExperienceLevel = searchParams.get("recommendedExperienceLevel") || "";

    // Call API with correct parameter names
    const { data, isLoading, isError } = useGetAllJobsQuery({ location, jobType, recommendedExperienceLevel });

    console.log("Jobs API Response:", data?.data?.data);

    const [searchTerm, setSearchTerm] = useState("");

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin w-6 h-6 text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-red-500 text-center font-medium mt-6">
                Failed to load Jobs
            </div>
        );
    }

    // Client-side search on job title & company
    const filteredJobs = data?.data?.data?.filter((job: any) => {
        const text = searchTerm.toLowerCase();
        return (
            job.jobTitle.toLowerCase().includes(text) ||
            job.company.toLowerCase().includes(text)
        );
    });

    console.log("filtered jobs", filteredJobs);

    //   // Update URL Params
    // const updateFilter = (key: string, value: string) => {
    //     if (value) searchParams.set(key, value);
    //     else searchParams.delete(key);

    //     setSearchParams(searchParams);
    // };

    return (
        <Card className="p-4">
            <CardContent>
                {/* Filters Section: Search + Dropdowns */}
                <div className="flex flex-col md:flex-row gap-4 mb-4 justify-between">
                    {/* Search Input */}
                    <div className="relative w-full md:w-1/3">
                        <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                        <Input
                            type="text"
                            placeholder="Search by job title or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-8"
                        />
                    </div>

                    <div className="flex flex-wrap gap-4">
                        {/* Location Filter */}
                        {/* <Select
              value={location}
              onValueChange={(value) => updateFilter("location", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Dhaka">Dhaka</SelectItem>
                <SelectItem value="Chittagong">Chittagong</SelectItem>
              </SelectContent>
            </Select> */}

                        {/* Job Type Filter */}
                        {/* <Select
              value={jobType}
              onValueChange={(value) => updateFilter("jobType", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="INTERNSHIP">Internship</SelectItem>
                <SelectItem value="PART_TIME">Part-Time</SelectItem>
                <SelectItem value="FULL_TIME">Full-Time</SelectItem>
                <SelectItem value="FREELANCE">Freelance</SelectItem>
              </SelectContent>
            </Select> */}

                        {/* Experience Filter */}
                        {/* <Select
              value={recommendedExperienceLevel}
              onValueChange={(value) =>
                updateFilter("recommendedExperienceLevel", value)
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="FRESHER">Fresher</SelectItem>
                <SelectItem value="JUNIOR">Junior</SelectItem>
                <SelectItem value="MID">Mid</SelectItem>
                <SelectItem value="SENIOR">Senior</SelectItem>
              </SelectContent>
            </Select> */}
                    </div>
                </div>

                {/* Jobs Table */}
                <Table>
                    <TableCaption>A list of job opportunities</TableCaption>

                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Job Title</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Job Type</TableHead>
                            <TableHead>Experience Level</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((job: any, index: number) => (
                                <TableRow key={job._id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{job.jobTitle}</TableCell>
                                    <TableCell>{job.company}</TableCell>
                                    <TableCell>{job.location}</TableCell>
                                    <TableCell>{job.jobType}</TableCell>
                                    <TableCell>{job.recommendedExperienceLevel}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center text-gray-500 py-4">
                                    No jobs found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default AllJobs;


