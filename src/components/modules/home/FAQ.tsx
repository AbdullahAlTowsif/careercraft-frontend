import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-5">
      <h2 className="text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>

      <Accordion type="single" collapsible className="space-y-4">

        {/* PART 1 QUESTIONS */}
        <AccordionItem value="item-1">
          <AccordionTrigger>
            What is the goal of the CareerCraft platform?
          </AccordionTrigger>
          <AccordionContent>
            CareerCraft helps youth discover suitable jobs, match their skills
            with opportunities, improve weak areas, and build a personalized
            career growth plan—aligned with the SDG-8 goal of promoting decent work.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>
            How does the job matching system work?
          </AccordionTrigger>
          <AccordionContent>
            We compare your profile skills, experience level, and preferred
            career track with each job’s requirements. Using weighted logic, the
            system generates a match score (0–100%) and highlights matched
            skills, missing skills, and recommended platforms to apply.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>
            How does the platform recommend learning resources?
          </AccordionTrigger>
          <AccordionContent>
            For every missing or weak skill, CareerCraft suggests curated
            resources such as YouTube playlists, free/paid courses, documentation,
            and local training programs. Each resource includes platform, cost,
            URL, and related skills.
          </AccordionContent>
        </AccordionItem>

        {/* PART 2 QUESTIONS */}
        <AccordionItem value="item-4">
          <AccordionTrigger>
            What is AI-powered skill extraction?
          </AccordionTrigger>
          <AccordionContent>
            Users can upload a CV or paste text, and our AI/NLP system extracts
            key skills, tools, technologies, and possible job roles—displayed as
            editable tags to improve profile accuracy.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger>
            What is the Skill Gap Analysis feature?
          </AccordionTrigger>
          <AccordionContent>
            Skill Gap Analysis compares your profile with job requirements and
            shows missing or weak skills. It also recommends resources to help
            you close these gaps and become job-ready faster.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger>
            What is the AI-generated Career Roadmap?
          </AccordionTrigger>
          <AccordionContent>
            Based on your skills, target role, and preferred timeline, our AI
            creates a custom roadmap with phases, learning steps, technologies,
            and small projects. You can save it in the app or download it as PDF.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger>
            What is CareerBot and how can it help?
          </AccordionTrigger>
          <AccordionContent>
            CareerBot is your personal mentor assistant. It answers questions
            like “What jobs match my skills?”, “How do I become a backend
            developer?”, and “How can I prepare for internships?” It provides
            suggestions—not guaranteed outcomes—based on real career pathways.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-8">
          <AccordionTrigger>
            Can I create or download my CV from CareerCraft?
          </AccordionTrigger>
          <AccordionContent>
            Yes! CareerCraft can generate a professional CV using your profile
            data. You can also get AI-suggested summaries, project bullet points,
            and improvement tips for LinkedIn and personal portfolios.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-9">
          <AccordionTrigger>
            Is this platform free to use?
          </AccordionTrigger>
          <AccordionContent>
            Yes, the core features are free. Some external learning resources
            may be paid depending on the provider (Udemy, Coursera, etc.).
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-10">
          <AccordionTrigger>
            How accurate are AI recommendations?
          </AccordionTrigger>
          <AccordionContent>
            We use transparent, explainable AI. Recommendations are based on
            your real profile data, job requirements, and open-source tools.
            While helpful, they should be considered guidance, not guarantees.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
