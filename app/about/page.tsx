import Image from "next/image";

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
    <main className="mx-auto max-w-6xl p-6 space-y-12">
      <section id="section-about" className="border-b border-neutral-200 pb-8">
        <div className="relative group">
          <div className="pr-[380px]">
            <h1 className="text-3xl font-semibold">About</h1>
            <p>I am a strategy director focused on helping brands grow through clear thinking and strong systems. My work connects brand, business and product to build momentum and turn complex challenges into frameworks that teams can actually use.</p>
            <p>I collaborate with companies in different ways: sometimes leading projects, sometimes plugging into existing teams, and sometimes acting as an external strategic partner.</p>
            <p>I’m especially drawn to projects where brand and growth aren’t separate conversations, whether that’s helping an early venture find its footing or an established company looking for new momentum.</p>
          </div>
          <div className="absolute top-0 right-0 w-[340px] opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out">
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
      <section id="section-quote" className="border-b border-neutral-200 pb-8">
        <blockquote>--I design strategy and systems for growth--</blockquote>
      </section>
      <section id="section-approach" className="border-b border-neutral-200 pb-8">
        <h2 className="text-2xl font-semibold">Approach</h2>
        <p>I believe that strategy only works if it’s designed to move. I start by analyzing data and understanding what actually drives value for the brand, the business, and the motivation behind people buying it. Then I turn that into frameworks teams can use: how to decide, what to make, where to grow.</p>
        <p>Whether it’s a brand foundation, a market entry plan, or a full operating model, the goal is the same: build strategies that scale because they work in practice, not just in theory.</p>
      </section>
      <section id="section-services" className="border-b border-neutral-200 pb-8">
        <h2 className="text-2xl font-semibold">Services</h2>
       <div className="flex gap-[50px]">
         <div className="flex-1">
           {services.slice(0, 6).map((item) => (
             <div key={item} className="border-t border-neutral-200 py-4">
               {item}
             </div>
           ))}
         </div>
         <div className="flex-1">
           {services.slice(6, 12).map((item) => (
             <div key={item} className="border-t border-neutral-200 py-4">
               {item}
             </div>
           ))}
         </div>
       </div>
      </section>
      <section id="section-contact">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p>I work with brands and teams on projects of all sizes. If you’re looking for a strategic partner or are building something, send me a message. </p>
        <p>info.fannyzintl@gmail.com / <a href="https://www.linkedin.com/in/fannyzintl/" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
      </section>
    </main>
  );
}


