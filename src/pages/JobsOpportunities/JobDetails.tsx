import { Link, useParams } from "react-router";
import { useGetSingleJobQuery } from "@/redux/features/jobs/jobs.api";
import { Loader2, CalendarDays, MapPin, Briefcase, CheckCircle, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/modules/common/Navbar";

export default function JobDetails() {
  const { jobId } = useParams();
  console.log(jobId);
  const { data, isLoading } = useGetSingleJobQuery(jobId);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const job = data?.data;

  if (!job) {
    return <div className="text-center text-gray-500 mt-10">Job not found</div>;
  }

  return (
    <div>
      <Navbar />

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        
        {/* Back Button */}
        <Link to="/jobs">
          <Button variant="outline" className="mb-3 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Button>
        </Link>

        {/* Top Section */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold">{job.jobTitle}</h1>
              <p className="text-lg text-gray-600">{job.company}</p>

              <div className="flex flex-wrap gap-4 mt-3 text-gray-700">
                
                {/* Location */}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  {job.location} {job.isRemote && "(Remote Available)"}
                </div>

                {/* Job Type */}
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  {job.jobType}
                </div>

                {/* Experience */}
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  {job.recommendedExperienceLevel}
                </div>
              </div>

              {/* Salary */}
              <div className="mt-3">
                <p className="font-semibold text-gray-700">Salary Range:</p>
                <p className="text-gray-800">
                  {job.salaryRange.min} - {job.salaryRange.max} {job.salaryRange.currency}
                </p>
              </div>

              {/* Deadline */}
              <div className="flex items-center gap-2 mt-2 text-gray-700">
                <CalendarDays className="w-4 h-4 text-primary" />
                Application Deadline:{" "}
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </div>

              {/* Apply Button */}
              <a href={job.applicationUrl} target="_blank" rel="noreferrer">
                <Button className="mt-4 w-full">Apply Now</Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Description */}
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">Job Description</h2>
            <p className="text-gray-700 leading-relaxed">{job.description}</p>
          </CardContent>
        </Card>

        {/* Required Skills */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.requiredSkills.map((skill: string) => (
                <Badge key={skill} variant="outline" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Responsibilities */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3">Responsibilities</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {job.responsibilities.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Qualifications */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3">Qualifications</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {job.qualifications.map((item: string, idx: number) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Career Track */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-3">Career Track</h2>
            <div className="flex flex-wrap gap-2">
              {job.careerTrack.map((track: string, idx: number) => (
                <Badge key={idx} variant="secondary">
                  {track}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
