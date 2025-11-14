/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ExternalLink } from "lucide-react";
import Navbar from "@/components/modules/common/Navbar";
import { useGetAllResourceQuery } from "@/redux/features/resource/resource.api";

export default function AllResources() {
  const { data, isLoading, isError } = useGetAllResourceQuery(undefined);
  console.log(data);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );

  if (isError)
    return <p className="text-center text-red-500">Failed to load resources.</p>;

  const resources = data?.data || [];

  return (
    <div>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-8">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-5">Learning Resources</h1>

            <Table>
              <TableCaption>List of recommended learning resources</TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Platform</TableHead>
                  <TableHead>Related Skills</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>Visit</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {resources.length > 0 ? (
                  resources.map((res: any, index: number) => (
                    <TableRow key={res._id}>
                      <TableCell>{index + 1}</TableCell>

                      {/* Title */}
                      <TableCell className="font-medium">{res.title}</TableCell>

                      {/* Platform */}
                      <TableCell>{res.platform}</TableCell>

                      {/* Related Skills */}
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {res.relatedSkills.map((skill: string) => (
                            <Badge key={skill} variant="outline">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>

                      {/* Cost Indicator */}
                      <TableCell>
                        {res.cost?.toLowerCase() === "free" ? (
                          <Badge className="bg-green-600 hover:bg-green-700">FREE</Badge>
                        ) : (
                          <Badge className="bg-blue-600 hover:bg-blue-700">PAID</Badge>
                        )}
                      </TableCell>

                      {/* URL */}
                      <TableCell>
                        <a
                          href={res.url}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          Visit <ExternalLink className="w-4 h-4" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4 text-gray-500">
                      No resources found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
