"use Client";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { OrbitingCircles } from "./ui/OrbitingCircles";
import Icons from "../global/icons";
import Container from "../global/container";

const Hero = () => {
  const clikhandler = () => {
    redirect("#pricing");
  };
  return (
    <div className="relative flex flex-col items-center justify-center w-full py-20">
      <div className="absolute flex lg:hidden size-40 rounded-full bg-blue-500 blur-[10rem] top-0 left-1/2 -translate-x-1/2 -z-10"></div>

      <div className="flex flex-col items-center justify-center gap-y-8 relative">
        <Container className="hidden lg:flex absolute inset-0 top-0 mb-auto flex-col items-center justify-center w-full min-h-screen -z-10">
          <OrbitingCircles speed={0.5} radius={300}>
            <Icons.circle1 className="size-4 text-foreground/70" />
            <Icons.circle2 className="size-1 text-foreground/80" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.25} radius={400}>
            <Icons.circle2 className="size-1 text-foreground/50" />
            <Icons.circle1 className="size-4 text-foreground/60" />
            <Icons.circle2 className="size-1 text-foreground/90" />
          </OrbitingCircles>
          <OrbitingCircles speed={0.1} radius={500}>
            <Icons.circle2 className="size-1 text-foreground/50" />
            <Icons.circle2 className="size-1 text-foreground/90" />
            <Icons.circle1 className="size-4 text-foreground/60" />
            <Icons.circle2 className="size-1 text-foreground/90" />
          </OrbitingCircles>
        </Container>

        <div className="flex flex-col items-center justify-center text-center gap-y-4 bg-background/0">
          <Container className="relative  overflow-hidden">
            <button
              className="group relative grid overflow-hidden rounded-full px-2 py-1 shadow-[0_1000px_0_0_hsl(0_0%_15%)_inset] transition-colors duration-200 mx-auto"
              onClick={clikhandler}
            >
              <span>
                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
              </span>
              <span className="backdrop absolute inset-[1px] rounded-full bg-background transition-colors duration-200 group-hover:bg-neutral-800" />
            
              <span className="z-10 py-0.5 text-sm flex items-center">
                
                <span className="px-2 py-[0.5px] h-[18px] tracking-wide flex items-center justify-center rounded-full bg-gradient-to-r from-orange-400 to-orange-600 text-[9px] font-medium mr-2 ">
                  Entertiment 2.0
                </span>
                  <Link href={"#pricing"}> 
                Introducing mntdigital </Link> <ArrowRightIcon className="w-4 ml-2" />
               
              </span>
              
            </button>
          </Container>
          <Container delay={0.15}>
            <h1 className="text-4xl md:text-4xl lg:text-7xl font-bold text-center !leading-tight max-w-4xl mx-auto">
              PREMIUM TV CHANNELS MOVIES AND MORE
            </h1>
          </Container>
          <Container delay={0.2}>
            <p className="max-w-xl px-2 mx-auto mt-2 text-base lg:text-lg text-center text-muted-foreground">
              Enjoy premium sports, live pay-per-view events, and the newest
              movie releases in high quality—all from the comfort of your
              screen.
            </p>
          </Container>
          <Container delay={0.25} className="z-20">
            <div className="flex items-center justify-center mt-6 gap-x-4">
              <Link href="/free-trial" className="flex items-center gap-2 group">
                <Button size="lg">
                  Start Free Trial
                  <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-all duration-300" />
                </Button>
              </Link>
            </div>
          </Container>
          <Container delay={0.3} className="relative">
            <div className="relative rounded-xl lg:rounded-[32px] border border-border p-2 backdrop-blur-lg mt-10 max-w-6xl mx-auto">
              <div className="absolute top-1/8 left-1/2 -z-10 bg-gradient-to-r from-orange-500 to-orange-600 w-1/2 lg:w-3/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[4rem] lg:blur-[10rem] animate-image-glow"></div>
              <div className="hidden lg:block absolute -top-1/8 left-1/2 -z-20 bg-orange-600 w-1/4 -translate-x-1/2 h-1/4 -translate-y-1/2 inset-0 blur-[10rem] animate-image-glow"></div>

              <div className="rounded-lg lg:rounded-[22px] border border-border bg-background">
                <Image
                  src="/assets/holo-screen.jpg"
                  alt="sports Broadcasting: Live Football Match Streaming"
                  width={1920}
                  height={580}
                  className="rounded-lg lg:rounded-[20px]"
                />
              </div>
            </div>
            <div className="bg-gradient-to-t from-background to-transparent absolute bottom-0 inset-x-0 w-full h-1/2"></div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Hero;
