import { Briefcase, Code, User } from "lucide-react";
import { useInView } from "react-intersection-observer";

export const AboutSection = () => {

    const { ref, inView } = useInView({
        triggerOnce: false, // animate evrytime it comes into viewport
        threshold: 0.15,   // 15% of the section is visible
    });

    return (
        <section 
            id="about" 
            ref={ref} 
            className="py-24 px-4 relative"
        >

            <div className="container mx-auto max-w-5xl">
                {/* <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 "> */}
                <h2 className={`text-3xl md:text-4xl font-bold text-center mb-12 opacity-0 ${inView ? "animate-fade-in-up" : ""}`}>
                    About <span className="text-primary"> Me </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h3 className={`text-2xl font-semibold opacity-0 ${inView ? "animate-fade-in-up-delay-1" : ""}`}>
                            Passionate Web & Mobile Application Developer
                        </h3>

                        <p className={`text-muted-foreground opacity-0 ${inView ? "animate-fade-in-up-delay-2" : ""}`}>
                            With over 3 years of experience, I specialize in creating dynamic and responsive web applications using the MERN stack.
                        </p>

                        <p className={`text-muted-foreground opacity-0 ${inView ? "animate-fade-in-up-delay-3" : ""}`}>
                            My expertise extends to mobile app development with React Native, allowing me to build cross-platform applications that deliver seamless user experiences.
                        </p>

                        <div className={`flex flex-col sm:flex-row gap-4 pt-4 justify-center opacity-0 ${inView ? "animate-fade-in-up-delay-4" : ""}`}>
                            <a href="#contact" className="cosmic-button">
                                Get in Touch 
                            </a>

                            <a 
                                href="CV/Harsh_RESUME.pdf" 
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                            >
                                Download CV
                            </a>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                        <div className={`gradient-border p-6 card-hover opacity-0 ${inView ? "animate-fade-in-up-delay-1" : ""}`}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Code className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> Web & Application Development </h4>
                                    <p className="text-muted-foreground">
                                        Creating responsive web and mobile applications with modern
                                        frameworks & tools.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={`gradient-border p-6 card-hover opacity-0 ${inView ? "animate-fade-in-up-delay-2" : ""}`}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <User className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> UI/UX Design </h4>
                                    <p className="text-muted-foreground">
                                        Designing intuitive and user-friendly interfaces that enhance user experiences.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className={`gradient-border p-6 card-hover opacity-0 ${inView ? "animate-fade-in-up-delay-3" : ""}`}>
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Briefcase className="h-6 w-6 text-primary" />
                                </div>
                                <div className="text-left">
                                    <h4 className="font-semibold text-lg"> Project Management </h4>
                                    <p className="text-muted-foreground">
                                        Managing projects from conception to deployment with agile methodologies, ensuring timely delivery and quality.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};