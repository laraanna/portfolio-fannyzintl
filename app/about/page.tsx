import Image from "next/image";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl md:text-xl lg:text-2xl xl:text-3xl font-iowan mb-4">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  const services = [
    "Brand Strategy",
    "Concept Development",
    "GTM Strategy",
    "Comms Planning",
    "Content Frameworks",
    "Campaign Direction",
    "Growth operating Models",
    "Performance Marketing",
    "Business Development",
    "Leadership Guidance",
    "Feedback Sessions",
    "Innovation Roadmaps",
  ];

  return (
    <main className="mx-auto w-[95%] px-9 py-6 space-y-12">
      <section id="section-about" className="pb-8">
        <div className="relative group">
          <div className="flex items-end">
            <div className="mr-6">
              <SectionHeading>About</SectionHeading>
            </div>
            <div className="md:hidden pb-6">
              <Image
                src="/about/about-fannyzintl.jpg"
                alt="Portrait of Fanny Zintl"
                width={120}
                height={160}
                sizes="80px"
                className="w-auto h-auto"
                priority={false}
              />
            </div>
          </div>
          <p className="text-sm">I am a strategy director focused on helping brands grow through clear thinking and strong systems. My work connects brand, business and product to build momentum and turn complex challenges into frameworks that teams can actually use.</p>
          <p className="text-sm">I collaborate with companies in different ways: sometimes leading projects, sometimes plugging into existing teams, and sometimes acting as an external strategic partner.</p>
          <p className="text-sm">I&apos;m especially drawn to projects where brand and growth aren&apos;t separate conversations, whether that&apos;s helping an early venture find its footing or an established company looking for new momentum.</p>
          <div className="hidden md:block absolute top-0 right-0 w-[340px] opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out">
            <Image
              src="/about/about-fannyzintl.jpg"
              alt="Portrait of Fanny Zintl"
              width={680}
              height={900}
              sizes="340px"
              className="w-full h-auto"
              priority={false}
            />
          </div>
        </div>
      </section>
      <section id="section-quote" className="pb-8">
        <blockquote className="font-iowan italic text-center">--I design strategy and systems for growth--</blockquote>
      </section>
      <section id="section-approach" className="pb-32">
        <SectionHeading>Approach</SectionHeading>
        <p className="text-sm">I believe that strategy only works if it’s designed to move. I start by analyzing data and understanding what actually drives value for the brand, the business, and the motivation behind people buying it. Then I turn that into frameworks teams can use: how to decide, what to make, where to grow.</p>
        <p className="text-sm">Whether it’s a brand foundation, a market entry plan, or a full operating model, the goal is the same: build strategies that scale because they work in practice, not just in theory.</p>
      </section>
      <section id="section-services" className="pb-32">
        <SectionHeading>Services</SectionHeading>
       <div className="flex gap-[35px]">
        <div className="flex-1">
          {services.slice(0, 6).map((item, index) => (
            <div key={item} className={`py-4 text-xs border-b border-neutral-300 ${index === 0 ? 'border-t' : ''}`}>
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1">
          {services.slice(6, 12).map((item, index) => (
            <div key={item} className={`py-4 text-xs border-b border-neutral-300 ${index === 0 ? 'border-t' : ''}`}>
              {item}
            </div>
          ))}
        </div>
       </div>
      </section>
      <section id="section-contact">
        <SectionHeading>Contact</SectionHeading>
        <p className="text-sm mb-4">I work with brands and teams on projects of all sizes. If you’re looking for a strategic partner or are building something, send me a message. </p>
        <p className="text-sm">info.fannyzintl@gmail.com / <a href="https://www.linkedin.com/in/fannyzintl/" className="border-b border-black" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
      </section>
    </main>
  );
}


