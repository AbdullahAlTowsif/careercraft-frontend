import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import heroImg from "../../../assets/images/1.jpeg"
import { Link } from "react-router";

export const Hero = () => {
  return (
    <section className="w-full bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-black py-20">
      <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">

        {/* LEFT TEXT */}
        <div className="space-y-6">
          <span className="text-blue-600 font-semibold tracking-wide">
            Empowering Youth • SDG 8
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
            Build Your Career Path with{" "}
            <span className="text-blue-600">CareerCraft</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            Discover jobs, track your skills, and access personalized learning
            resources to shape your future. Designed for students, freshers, and job seekers.
          </p>

          {/* FEATURES */}
          <div className="space-y-3">
            {[
              "Explore Student & Entry-Level Jobs",
              "Get Tailored Skill-Based Recommendations",
              "Access Learning Resources to Upgrade Yourself"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="text-blue-600 h-5 w-5" />
                <span className="text-gray-700 dark:text-gray-300">{item}</span>
              </div>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Link to={'/register'} className="flex items-center"> Get Started <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>

            <Button variant="outline" size="lg">
              <Link to={'/jobs'} className="flex items-center"> Browse Jobs <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
          </div>
        </div>

        {/* RIGHT IMAGE / ILLUSTRATION */}
        <div className="flex justify-center">
          <img
            src={heroImg}
            alt="Career Growth"
            className="w-full max-w-md drop-shadow-xl dark:brightness-90"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
