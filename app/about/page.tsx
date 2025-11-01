import Image from "next/image";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-4xl md:text-5xl xl:text-6xl font-iowan mb-4 lg:mb-10">
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
    <main className="mx-auto w-[95%] px-9 pt-[120px] pb-6 space-y-12">
      <section id="section-about" className="pb-8 md:pb-20 md:mt-12">
        <div className="relative group flex gap-6">
          <div className="md:w-[70%] lg:w-[40%]">
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
            <p className="text-sm/4.5 xl:text-lg/6 mb-4">I am a strategy director focused on helping brands grow through clear thinking and strong systems. My work connects brand, business and product to build momentum and turn complex challenges into frameworks that teams can actually use.</p>
            <p className="text-sm/4.5 xl:text-lg/6 mb-4">I collaborate with companies in different ways: sometimes leading projects, sometimes plugging into existing teams, and sometimes acting as an external strategic partner.</p>
            <p className="text-sm/4.5 xl:text-lg/6 mb-4">I&apos;m especially drawn to projects where brand and growth aren&apos;t separate conversations, whether that&apos;s helping an early venture find its footing or an established company looking for new momentum.</p>
          </div>
          <div className="hidden md:flex md:w-[25%] items-center justify-end">
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out">
              <Image
                src="/about/about-fannyzintl.jpg"
                alt="Portrait of Fanny Zintl"
                width={680}
                height={900}
                sizes="25vw"
                className="w-auto h-auto max-h-[400px]"
                priority={false}
              />
            </div>
          </div>
        </div>
      </section>
      <section id="section-quote" className="pb-8 lg:pb-34">
        <blockquote className="font-iowan italic text-center text-base lg:text-2_5xl lg:pr-120">--I design strategy and systems for growth--</blockquote>
      </section>
      <section id="section-approach" className="pb-32 md:pb-40 md:max-w-[70%] lg:max-w-[55%] xl:max-w-[40%] md:ml-[30%] lg:ml-[45%] ">
        <SectionHeading>Approach</SectionHeading>
        <p className="text-sm/4.5 xl:text-lg/6 mb-4">I believe that strategy only works if it&apos;s designed to move. I start by analyzing data and understanding what actually drives value for the brand, the business, and the motivation behind people buying it. Then I turn that into frameworks teams can use: how to decide, what to make, where to grow.</p>
        <p className="text-sm/4.5 xl:text-lg/6 mb-4">Whether it&apos;s a brand foundation, a market entry plan, or a full operating model, the goal is the same: build strategies that scale because they work in practice, not just in theory.</p>
      </section>
      <section id="section-services" className="pb-32 xl:pb-70 md:max-w-[70%] xl:max-w-[50%]">
        <SectionHeading>Services</SectionHeading>
       <div className="flex gap-[25px]">
        <div className="flex-1">
          {services.slice(0, 6).map((item, index) => (
            <div key={item} className={`py-3 text-[0.68rem] md:text-sm xl:text-xl border-b border-neutral-300 lg:max-w-[200px] xl:max-w-[300px] ${index === 0 ? 'border-t' : ''}`}>
              {item}
            </div>
          ))}
        </div>
        <div className="flex-1">
          {services.slice(6, 12).map((item, index) => (
            <div key={item} className={`py-3 text-[0.68rem] md:text-sm xl:text-xl border-b border-neutral-300 lg:max-w-[220px] xl:max-w-[300px] ${index === 0 ? 'border-t' : ''}`}>
              {item}
            </div>
          ))}
        </div>
       </div>
      </section>
      <section id="section-contact" className="md:max-w-[70%] lg:max-w-[40%] md:ml-[15%] lg:ml-[30%]">
        <SectionHeading>Contact</SectionHeading>
        <p className="text-sm/4.5 xl:text-lg mb-4">I work with brands and teams on projects of all sizes. If you’re looking for a strategic partner or are building something, send me a message. </p>
        <p className="text-sm/4.5 xl:text-lg">info.fannyzintl@gmail.com / <a href="https://www.linkedin.com/in/fanny-zintl-ab183ba7/" target="_blank" className="border-b border-black" rel="noopener noreferrer">LinkedIn</a></p>
      </section>
    </main>
  );
}


