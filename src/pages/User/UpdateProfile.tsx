/* eslint-disable react-hooks/incompatible-library */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";

import { MultiSelect } from "@/components/ui/multi-select";
import { useUserUpdateProfileMutation } from "@/redux/features/user/user.api";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useNavigate } from "react-router";

// 🎯 1. Zod Schema (Same style as register form)
const formSchema = z.object({
    fullName: z.string().min(3).max(50).optional(),
    educationLevel: z.string().optional(),
    department: z.string().optional(),

    experienceLevel: z.enum(["FRESHER", "JUNIOR", "MID", "SENIOR"]),

    experienceDescription: z.string().max(1000).optional(),

    careerTrack: z
        .array(
            z.enum([
                "WEB_DEVELOPMENT",
                "APP_DEVELOPMENT",
                "DIGITAL_MARKETING",
                "GAME_DEVELOPMENT",
                "DATA_ANALYST",
                "SQA",
                "CYBER_SECURITY",
                "UI_UX_DESIGN",
                "DATA_SCIENCE",
                "MACHINE_LEARNING",
                "OTHERS",
            ])
        )
        .min(1, "Select at least one track"),

    skills: z.array(z.string()).optional(),

    cvText: z.string().max(5000).optional(),

    phone: z
        .string()
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
            message: "Phone must be +8801XXXXXXXXX or 01XXXXXXXXX",
        })
        .optional(),

    picture: z.string().url().optional(),
    address: z.string().max(200).optional(),
});

export default function UpdateProfile() {
    const navigate = useNavigate();
    const { data: userInfo, isLoading: userLoading } = useUserInfoQuery(undefined);
    const [updateUser, { isLoading }] = useUserUpdateProfileMutation();

    // 🎯 3. Form Setup
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            educationLevel: "",
            department: "",
            experienceLevel: "FRESHER",
            experienceDescription: "",
            careerTrack: [],
            skills: [],
            cvText: "",
            phone: "",
            picture: "",
            address: "",
        },
    });

    // 🎯 Reset form when user data is loaded
    useEffect(() => {
        if (userInfo?.data) {
            form.reset({
                fullName: userInfo.data.fullName || "",
                educationLevel: userInfo.data.educationLevel || "",
                department: userInfo.data.department || "",
                experienceLevel: userInfo.data.experienceLevel || "FRESHER",
                experienceDescription: userInfo.data.experienceDescription || "",
                careerTrack: userInfo.data.careerTrack || [],
                skills: userInfo.data.skills || [],
                cvText: userInfo.data.cvText || "",
                phone: userInfo.data.phone || "",
                picture: userInfo.data.picture || "",
                address: userInfo.data.address || "",
            });
        }
    }, [userInfo, form]);

    // 🎯 4. Submit Handler
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log("Submitting data:", data);
        try {
            const result = await updateUser({
                id: userInfo?.data?._id,
                payload: data,
            }).unwrap();

            console.log("Update successful:", result);
            toast.success("Profile updated successfully!");
            navigate("/")
        } catch (error: any) {
            console.error("Update error:", error);
            toast.error(error?.data?.message || "Something went wrong");
        }
    };

    // Show loading while user data is being fetched
    if (userLoading) {
        return (
            <div className="max-w-3xl mx-auto py-10 flex justify-center items-center">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="ml-2">Loading your profile...</span>
            </div>
        );
    }

    // 🎯 5. UI Form (Same style as Register form)
    return (
        <div className="max-w-3xl mx-auto py-10">
            <h1 className="text-2xl font-bold text-center mb-6">
                Update Your Profile
            </h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    {/* FULL NAME */}
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="John Doe" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* EDUCATION LEVEL */}
                    <FormField
                        control={form.control}
                        name="educationLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Education Level</FormLabel>
                                <FormControl>
                                    <Input placeholder="BSc in CSE, Diploma..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* DEPARTMENT */}
                    <FormField
                        control={form.control}
                        name="department"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Department</FormLabel>
                                <FormControl>
                                    <Input placeholder="Department name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* EXPERIENCE LEVEL */}
                    <FormField
                        control={form.control}
                        name="experienceLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Experience Level</FormLabel>
                                <Select 
                                    value={field.value} 
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select experience level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="FRESHER">Fresher</SelectItem>
                                        <SelectItem value="JUNIOR">Junior</SelectItem>
                                        <SelectItem value="MID">Mid</SelectItem>
                                        <SelectItem value="SENIOR">Senior</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* EXPERIENCE DESCRIPTION */}
                    <FormField
                        control={form.control}
                        name="experienceDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Experience Description</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        rows={3} 
                                        placeholder="Describe your experience..." 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* MULTI SELECT — CAREER TRACK */}
                    <FormField
                        control={form.control}
                        name="careerTrack"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Career Track</FormLabel>
                                <FormControl>
                                    <MultiSelect
                                        options={[
                                            "WEB_DEVELOPMENT",
                                            "APP_DEVELOPMENT",
                                            "DIGITAL_MARKETING",
                                            "GAME_DEVELOPMENT",
                                            "DATA_ANALYST",
                                            "SQA",
                                            "CYBER_SECURITY",
                                            "UI_UX_DESIGN",
                                            "DATA_SCIENCE",
                                            "MACHINE_LEARNING",
                                            "OTHERS",
                                        ]}
                                        selected={field.value || []}
                                        onChange={(values) => field.onChange(values)}
                                        placeholder="Select your preferred career tracks"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* SKILLS */}
                    <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Skills (comma separated)</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="React, Node, Tailwind, JavaScript..."
                                        value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* PHONE */}
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input placeholder="+8801XXXXXXXXX or 01XXXXXXXXX" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* PICTURE URL */}
                    <FormField
                        control={form.control}
                        name="picture"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Profile Picture URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://example.com/photo.jpg" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* ADDRESS */}
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your complete address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* CV TEXT */}
                    <FormField
                        control={form.control}
                        name="cvText"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CV Summary</FormLabel>
                                <FormControl>
                                    <Textarea 
                                        rows={5} 
                                        placeholder="Write your CV summary, experience, education, etc..." 
                                        {...field} 
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* SUBMIT BUTTON */}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                Updating Profile...
                            </>
                        ) : (
                            "Update Profile"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}