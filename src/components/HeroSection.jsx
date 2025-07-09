import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { useInView } from "react-intersection-observer";

const TYPING_TEXT = "Harsh Sahu";
const TYPING_SPEED = 120; // ms per character
const ERASING_SPEED = 60; // ms per character
const DELAY_AFTER_TYPING = 1200; // ms before erasing


export const HeroSection = () => {

    const { ref, inView } = useInView({
        triggerOnce: false, // animate evrytime it comes into viewport
        threshold: 0.15,   // 15% of the section is visible
    });

    const [displayed, setDisplayed] = useState("");
    const [typing, setTyping] = useState(true);

    useEffect(() => {
        let timeout;
        if (typing) {
            if (displayed.length < TYPING_TEXT.length) {
                timeout = setTimeout(() => {
                    setDisplayed(TYPING_TEXT.slice(0, displayed.length + 1));
                }, TYPING_SPEED);
            } else {
                timeout = setTimeout(() => setTyping(false), DELAY_AFTER_TYPING);
            }
        } else {
            if (displayed.length > 0) {
                timeout = setTimeout(() => {
                    setDisplayed(TYPING_TEXT.slice(0, displayed.length - 1));
                }, ERASING_SPEED);
            } else {
                timeout = setTimeout(() => setTyping(true), 400);
            }
        }
        return () => clearTimeout(timeout);
    }, [displayed, typing]);

    return (
        <section id="hero"
            className="relative min-h-screen flex flex-col items-center justify-center px-4"
            ref={ref}
        >
            <div className="container max-w-4xl mx-auto text-center z-10">
                <div className="space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        <span className="opacity-0 animate-fade-in"> Hi, I'm </span>
                        {/* <span className="text-primary opacity-0 animate-fade-in-delay-1"> Harsh </span>
                        <span  className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2"> Sahu </span> */}
                        <span className="text-primary">
                            {displayed}
                            <span className="animate-pulse">|</span>
                        </span>
                    </h1>

                    {/* <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
                        BCA student specializing in Mobile Applications and Information Security, with hands-on experience in Full Stack Development.
                        Seeking a Full Stack Developer role to leverage my skills in creating dynamic applications.
                    </p> */}

                    <p className={`text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 ${inView ? "animate-fade-in-up-delay-3" : ""}`}>
                        BCA student specializing in Mobile Applications and Information Security, with hands-on experience in Full Stack Development.
                        Seeking a Full Stack Developer role to leverage my skills in creating dynamic applications.
                    </p>


                    {/* <div className="pt-4 opacity-0 animate-fade-in-delay-4"> */}
                    <div className={`pt-4 opacity-0 ${inView ? "animate-fade-in-up-delay-4" : ""}`}>
                        <a href="#projects" className="cosmic-button">
                            View My Work
                        </a>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 tansform -translate-x-1/2 flex flex-col items-center animate-bounce">
                <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
                <ArrowDown className="h-5 w-5 text-primary" />
            </div>
        </section>
    );
};