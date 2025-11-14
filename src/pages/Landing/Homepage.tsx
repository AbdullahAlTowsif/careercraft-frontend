import FAQ from "@/components/modules/home/FAQ";
import Hero from "@/components/modules/home/Hero";
import JobSection from "@/components/modules/home/JobSection";

const Homepage = () => {
    return (
        <div>
            <Hero></Hero>
            <JobSection />
            <FAQ />
        </div>
    );
};

export default Homepage;