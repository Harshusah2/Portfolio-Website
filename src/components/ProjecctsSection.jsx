import { ExternalLink, Github, ArrowRight } from "lucide-react"

const projects = [
    {
        id: 1,
        title: "Marvelous Web App",
        description: "A music streaming web app that lets users search for and listen to music by converting YouTube videos into audio using video links. Built with React.js, Tailwind CSS, Node.js, Express, MongoDB, and YouTube Data API.",
        image: "projects/Marvelous.png",
        tags: ["React.js", "Tailwind.css", "Node.js", "Express", "MongoDB"],
        demoURL: "#",
        githubURL: "https://github.com/Harshusah2/Marvelous-Music-Web-Player",
    },

    {
        id: 2,
        title: "Shopper Web App",
        description: "An e-commerce web app for clothing where users can add or remove items from their cart and browse by category. Built with React.js, CSS, Node.js, Express, and MongoDB for a seamless shopping experience.",
        image: "projects/Shopper_ECommerce.png",
        tags: ["React.js", "Node.js", "Express", "MongoDB", "CSS"],
        demoURL: "#",
        githubURL: "https://github.com/Harshusah2/ECommerce-Site",
    },

    {
        id: 3,
        title: "NewsMagzine Web App",
        description: "A news web app that allows users to read the latest international news by category and visit full articles. Built using React.js, Bootstrap CSS, and News API for up-to-date and categorized news content.",
        image: "projects/NewsMagzine.png",
        tags: ["React.js", "Bootstrap.css", "Intergrated with News API"],
        demoURL: "#",
        githubURL: "https://github.com/Harshusah2/news-magzine",
    },
];

export const ProjectsSection = () => {
    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 texxt-center">
                    Featured <span className="text-primary"> Projects </span>
                </h2>

                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    Below are some of my featured projects that I've worked on. You can click on the images.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                    {projects.map((project, key) => (
                        <div key={key} className="group bg-card rounded-lg overflow-hidden tshadow-xs card-hover">
                            <div className="h-48 overflow-hidden">
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span className="px-2 py-1 text-xs border font-medium rounded-full bg-secondary text-secondary-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl mb-1 font-semibold">{project.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4">
                                    {project.description}
                                </p>

                                <div className="flex justify-between items-center">
                                    <div className="flex space-x-3">
                                        {/* button for link to the project demo */}
                                        {/* <a 
                                            href={project.demoURL} 
                                            target="_blank"
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                        >
                                            <ExternalLink size={20} />
                                        </a> */}

                                        {/* button for link to the project github */}
                                        <a 
                                            href={project.githubURL} 
                                            target="_blank"
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                        >
                                            <Github size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <a 
                        href="https://github.com/Harshusah2"
                        className="cosmic-button w-fit flex items-center mx-auto gap-2"
                        target="_blank"
                    >
                        Check My Github <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
};