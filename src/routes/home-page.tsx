import { Sparkles } from "lucide-react";
import Marquee from "react-fast-marquee";

import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import { MarqueImg } from "@/components/marquee-img";
import { Link } from "react-router";

export const HomePage = () => {
  return (
    <div className="flex-col w-full pb-24 gradient-bg">
      <Container>
        <div className="my-12 animate-fade-in">
          <h2 className="text-4xl text-center md:text-left md:text-7xl font-bold leading-tight">
            <span className="gradient-primary bg-clip-text text-transparent font-extrabold md:text-9xl">
              AI Superpower
            </span>
            <span className="text-muted-foreground font-extrabold block md:inline">
              - A better way to
            </span>
            <br />
            <span className="text-foreground">
              improve your interview chances and skills
            </span>
          </h2>

          <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto md:mx-0 animate-slide-up">
            Boost your interview skills and increase your success rate with
            AI-driven insights. Discover a smarter way to prepare, practice, and
            stand out.
          </p>
        </div>

        <div className="flex w-full items-center justify-evenly md:px-12 md:py-20 md:items-center md:justify-end gap-16 animate-slide-up">
          <div className="text-center hover-lift p-4 rounded-lg">
            <p className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              250k+
            </p>
            <span className="block text-xl text-muted-foreground font-medium">
              Offers Received
            </span>
          </div>
          <div className="text-center hover-lift p-4 rounded-lg">
            <p className="text-4xl font-bold gradient-primary bg-clip-text text-transparent">
              1.2M+
            </p>
            <span className="block text-xl text-muted-foreground font-medium">
              Interviews Aced
            </span>
          </div>
        </div>

        {/* image section */}
        <div className="w-full mt-8 rounded-2xl gradient-card h-[480px] overflow-hidden relative animate-scale-in hover-lift">
          <img
            src="/img/hero.jpg"
            alt="AI Interview Platform"
            className="w-full h-full object-cover"
          />

          <div className="absolute top-6 left-6 px-6 py-3 rounded-xl glass-effect backdrop-blur-md">
            <span className="font-semibold text-foreground">Interviews Copilot&copy;</span>
          </div>

          <div className="hidden md:block absolute w-96 bottom-6 right-6 px-6 py-4 rounded-xl glass-effect backdrop-blur-md animate-fade-in">
            <h2 className="text-foreground font-bold text-xl mb-2">Developer</h2>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Take your coding interviews to the next level with AI-powered
              practice questions, real-time feedback, and personalized insights.
            </p>

            <Link to={"/generate"} classNgradient-primaryame="w-full">
              <Button className="w-full  hover:shadow-lg transition-all duration-300 hover-glow">
                Generate <Sparkles className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>

      {/* marquee section */}
      <div className="w-full my-16 animate-fade-in">
        <div className="py-8 glass-effect-dark rounded-2xl mx-4 md:mx-8">
          <Marquee pauseOnHover speed={40}>
            <MarqueImg img="/img/logo/firebase.png" />
            <MarqueImg img="/img/logo/meet.png" />
            <MarqueImg img="/img/logo/zoom.png" />
            <MarqueImg img="/img/logo/firebase.png" />
            <MarqueImg img="/img/logo/microsoft.png" />
            <MarqueImg img="/img/logo/meet.png" />
            <MarqueImg img="/img/logo/tailwindcss.png" />
            <MarqueImg img="/img/logo/microsoft.png" />
          </Marquee>
        </div>
      </div>

      <Container className="py-12 space-y-12 animate-slide-up">
        <h2 className="tracking-wide text-2xl text-foreground font-bold text-center max-w-4xl mx-auto leading-relaxed">
          Unleash your potential with personalized AI insights and targeted
          interview practice.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-3 hover-lift">
            <img
              src="/img/office.jpg"
              alt="Office workspace"
              className="w-full max-h-96 rounded-2xl object-cover shadow-lg"
            />
          </div>

          <div className="col-span-1 md:col-span-2 gap-8 max-h-96 min-h-96 w-full flex flex-col items-center justify-center text-center p-6 gradient-card rounded-2xl">
            <p className="text-center text-muted-foreground text-lg leading-relaxed mb-8">
              Transform the way you prepare, gain confidence, and boost your
              chances of landing your dream job. Let AI be your edge in
              today&apos;s competitive job market.
            </p>

            <Link to={"/generate"} className="w-full">
              <Button className="w-3/4 gradient-primary hover:shadow-lg transition-all duration-300 hover-glow text-lg py-3">
                Generate <Sparkles className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};