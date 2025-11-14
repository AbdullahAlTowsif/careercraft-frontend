/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Briefcase } from "lucide-react";
import { Link } from "react-router";
import { useGetAllJobsQuery } from "@/redux/features/jobs/jobs.api";
import { Loader2 } from "lucide-react";

const JobSection = () => {
    const { data, isLoading, isError } = useGetAllJobsQuery({});
    
    // Take only first 6 jobs
    const jobs = data?.data?.data?.slice(0, 6) || [];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin w-8 h-8 text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-red-500 text-center font-medium py-8">
                Failed to load jobs
            </div>
        );
    }

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Featured Job Opportunities
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover your next career move with our handpicked selection of exciting job opportunities
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job: any) => (
                        <Card key={job._id} className="hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start mb-2">
                                    <CardTitle className="text-xl font-semibold line-clamp-2">
                                        {job.jobTitle}
                                    </CardTitle>
                                    <Badge variant="secondary" className="ml-2 whitespace-nowrap">
                                        {job.jobType}
                                    </Badge>
                                </div>
                                
                                <div className="flex items-center text-gray-600 mb-2">
                                    <Building className="w-4 h-4 mr-2" />
                                    <span className="font-medium">{job.company}</span>
                                </div>
                            </CardHeader>

                            <CardContent className="pt-0">
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600">
                                        <MapPin className="w-4 h-4 mr-2" />
                                        <span>{job.location}</span>
                                    </div>
                                    
                                    <div className="flex items-center text-sm text-gray-600">
                                        <Briefcase className="w-4 h-4 mr-2" />
                                        <span>{job.recommendedExperienceLevel}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <Link to={`/jobs/${job._id}`} className="flex-1 mr-2">
                                        <Button className="w-full" size="sm">
                                            View Details
                                        </Button>
                                    </Link>
                                    {/* <Link to={`/apply/${job._id}`} className="flex-1 ml-2">
                                        <Button variant="outline" className="w-full" size="sm">
                                            Apply Now
                                        </Button>
                                    </Link> */}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {jobs.length > 0 && (
                    <div className="text-center mt-8">
                        <Link to="/jobs">
                            <Button variant="outline" size="lg">
                                View All Job Opportunities
                            </Button>
                        </Link>
                    </div>
                )}

                {jobs.length === 0 && (
                    <div className="text-center py-12">
                        <Building className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-xl font-semibold text-gray-600 mb-2">
                            No jobs available at the moment
                        </h3>
                        <p className="text-gray-500">
                            Check back later for new job opportunities
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default JobSection;