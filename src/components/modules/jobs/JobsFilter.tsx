import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router";

export default function JobsFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const location = searchParams.get("location") || "ALL";
  const jobType = searchParams.get("jobType") || "ALL";
  const experience = searchParams.get("recommendedExperienceLevel") || "ALL";

  // Debug current filter values
  console.log("Current Filters:", { location, jobType, experience });

  const updateFilter = (key: string, value: string) => {
    console.log(`Updating filter: ${key} = ${value}`);
    
    const params = new URLSearchParams(searchParams);

    if (value === "ALL") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.set("page", "1");
    setSearchParams(params);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("location");
    params.delete("jobType");
    params.delete("recommendedExperienceLevel");
    params.set("page", "1");
    setSearchParams(params);
  };

  return (
    <div className="w-full border border-muted rounded-md p-5 space-y-4 mb-5">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-lg">Filters</h1>
        <Button size="sm" variant="outline" onClick={clearFilters}>
          Clear
        </Button>
      </div>

      {/* Location */}
      <div>
        <Label>Location</Label>
        <Select value={location} onValueChange={(v) => updateFilter("location", v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Location</SelectLabel>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Dhaka">Dhaka</SelectItem>
              <SelectItem value="Chittagong">Chittagong</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Job Type */}
      <div>
        <Label>Job Type</Label>
        <Select value={jobType} onValueChange={(v) => updateFilter("jobType", v)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Job Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Job Type</SelectLabel>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="INTERNSHIP">Internship</SelectItem>
              <SelectItem value="PART_TIME">Part-Time</SelectItem>
              <SelectItem value="FULL_TIME">Full-Time</SelectItem>
              <SelectItem value="FREELANCE">Freelance</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Experience */}
      <div>
        <Label>Experience</Label>
        <Select
          value={experience}
          onValueChange={(v) =>
            updateFilter("recommendedExperienceLevel", v)
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Level</SelectLabel>
              <SelectItem value="ALL">All</SelectItem>
              <SelectItem value="FRESHER">Fresher</SelectItem>
              <SelectItem value="JUNIOR">Junior</SelectItem>
              <SelectItem value="MID">Mid</SelectItem>
              <SelectItem value="SENIOR">Senior</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
