import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Send, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
// import { useState } from "react";

export const ContactSection = () => {

    const {toast} = useToast();

    // const [isSubmitting, setIsSubmitting] = useState(false);

    // const handleSubmit = (e) => {

    //     e.preventDefault();

    //     setIsSubmitting(true);

    //     setTimeout(() => {
    //         toast({
    //             title: "Message sent!",
    //             description: "Thank you for reaching out! I will get back to you as soon as possible.",
    //         });
    //         setIsSubmitting(false);
    //     }, 1500);
    // };

    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mbb-4 text-center">
                    Get In <span className="text-primary">Touch</span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 maxx-w-2xl mx-auto">
                    If you have any questions or would like to learn more about our services, please don't hesitate to reach out. I am here to help you with your development needs.
                </p>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-12"> */}
                <div className="flex justify-center">
                    <div className="space-y-8">
                    {/* <div className="space-y-8 flex flex-col items-center justify-center h-full"> */}
                    {/* <div className="col-span-full flex flex-col items-center justify-center space-y-8"> if I want to keep grid column for form to use in future */}
                        <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>

                        <div className="space-y-6 justify-center">
                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Mail className="h-6 w-6 text-primary"/>
                                </div>

                                <div>
                                    <h4 className="font-medium">Email</h4>
                                    <a 
                                        href="mailto:harshsahu180407@gmail.com"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        harshsahu180407@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <Phone className="h-6 w-6 text-primary"/>
                                </div>

                                <div>
                                    <h4 className="font-medium">Phone</h4>
                                    <a 
                                        href="tel:+919098352698"
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        +91 9098352698
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary"/>
                                </div>

                                <div>
                                    <h4 className="font-medium">Location</h4>
                                    <a 
                                        className="text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        Raipur, Chhattisgarh, India
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <h4 className="font-medium mb-4">Connect With Me</h4>
                            <div className="flex space-x-4 justify-center">
                                <a href="https://www.linkedin.com/in/harsh-sahu-b11650257/" target="_blank">
                                    <Linkedin />
                                </a>
                                {/* <a href="" target="_blank">
                                    <Twitter />
                                </a> */}
                                <a href="https://www.instagram.com/harshusah2/" target="_blank">
                                    <Instagram />
                                </a>
                                {/* <a href="" target="_blank">
                                    <Facebook />
                                </a> */}
                            </div>
                        </div>
                    </div>

                    {/* <div className="bg-card p-8 rounded-lg shadow-xs" onSubmit={handleSubmit}>
                        <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>

                        <form className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2"> Your Name </label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    name="name" 
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                    placeholder="Enter your name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2"> Your Email </label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email" 
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium mb-2"> Your Message </label>
                                <textarea 
                                    id="message" 
                                    name="message" 
                                    required
                                    className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                                    placeholder="Enter your message here"
                                />
                            </div>

                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className={cn("cosmic-button w-full flex items-center justify-center gap-2",

                                )}
                            >
                                {isSubmitting ? "Sending..." : "Send Message"}
                                <Send size={16}/>
                            </button>
                        </form>
                    </div> */}
                </div>
            </div>
        </section>
    );
};