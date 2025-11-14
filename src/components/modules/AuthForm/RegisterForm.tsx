/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import toast from "react-hot-toast";
import Password from "@/components/ui/Password";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "@/components/ui/multi-select";

const passwordRegex =
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>\\/?])(?=.*\d).{8,}$/;

const registerSchema = z
    .object({
        fullName: z.string().min(3, "Full name must be at least 3 characters"),
        email: z.string().email(),
        password: z
            .string()
            .min(8, { error: "Password must be minimum 8 characters" })
            .regex(passwordRegex, {
                message:
                    "Password must contain uppercase, special char & number",
            }),
        confirmPassword: z.string().min(8, { error: "Confirm Password too short" }),
        educationLevel: z.string().min(2, "Required"),
        experienceLevel: z.enum(["FRESHER", "JUNIOR", "MID", "SENIOR"]),
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
    })
    .refine((d) => d.password === d.confirmPassword, {
        message: "Password does not match",
        path: ["confirmPassword"],
    });

export function RegisterForm() {
    const [register] = useRegisterMutation();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            educationLevel: "",
            experienceLevel: "FRESHER",
            careerTrack: [],
            skills: [],
        },
    });

    const onSubmit = async (data: z.infer<typeof registerSchema>) => {
        try {
            const result = await register(data).unwrap();
            console.log(result);
            if (result.success) {
                toast.success("Account created successfully!");
            }
            navigate("/");
        } catch (error: any) {
            console.log(error);
            toast.error(error.data.message);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-center">Create your CareerCraft account</h1>

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
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* EMAIL */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="john@career.com" {...field} />
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
                                    <Input placeholder="BSc in CSE, Diploma, HSC..." {...field} />
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
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select experience level" />
                                    </SelectTrigger>
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

                    {/* CAREER TRACK MULTI SELECT */}
                    <FormField
                        control={form.control}
                        name="careerTrack"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Career Track</FormLabel>
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
                                    selected={field.value}
                                    onChange={field.onChange}
                                />
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
                                        placeholder="HTML, CSS, JS, React..."
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.value.split(",").map((s) => s.trim())
                                            )
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* PASSWORD */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Password {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* CONFIRM PASSWORD */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Password {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">Register</Button>
                </form>
            </Form>

            <p className="text-sm text-center">
                Already have an account?{" "}
                <Link to="/login" className="underline">Login</Link>
            </p>
        </div>
    );
}
