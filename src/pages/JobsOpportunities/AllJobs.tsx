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
import { Eye, Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useGetAllJobsQuery } from "@/redux/features/jobs/jobs.api";
import { Link, useSearchParams } from "react-router";
import Navbar from "@/components/modules/common/Navbar";
import { Button } from "@/components/ui/button";

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

    return (
        <div>
            <Navbar />
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
                            <Link to={`/`}>
                                <Button>Job Post</Button>
                            </Link>
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
                                <TableHead>Details</TableHead>
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
                                        <TableCell>
                                            <Link
                                                to={`/jobs/${job._id}`}
                                                className="text-blue-600 hover:text-blue-800"
                                            >
                                                <Eye className="w-5 h-5 cursor-pointer" />
                                            </Link>
                                        </TableCell>
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
        </div>
    );
};

export default AllJobs;


