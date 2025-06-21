import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
    // Frontend Skills
    {name: "HTML/CSS", level: 90, category: "Frontend"},
    {name: "JavaScript", level: 80, category: "Frontend"},
    {name: "React.js", level: 90, category: "Frontend"},
    {name: "React Native", level: 75, category: "Frontend"},
    {name: "Tailwind CSS", level: 90, category: "Frontend"},
    {name: "Bootstrap CSS", level: 80, category: "Frontend"},

    // Backend Skills
    {name: "Node.js", level: 85, category: "Backend"},
    {name: "Express", level: 85, category: "Backend"},
    {name: "MongoDB", level: 90, category: "Backend"},
    {name: "Firebase", level: 70, category: "Backend"},

    // Tools and Technologies
    {name: "Git/GitHub", level: 75, category: "Tools"},
    {name: "Figma", level: 95, category: "Tools"},
    {name: "Adobe XD", level: 70, category: "Tools"},
    {name: "VS Code", level: 90, category: "Tools"},
    {name: "Android Studio", level: 80, category: "Tools"},
    {name: "PostMan", level: 70, category: "Tools"},

    // Additional Skills
    {name: "Kali Linux", level: 60, category: "Additional"},
];


const categories = ["All", "Frontend", "Backend", "Tools", "Additional"];


export const SkillsSection = () => {

    const [activeCategory, setActiveCategory] = useState("All");

    const filteredSkills = skills.filter(
        (skill) => activeCategory === "All" || skill.category === activeCategory
    );

    return (
        <section id="skills" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    My <span className="text-primary"> Skills </span>
                </h2>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category, key) => (
                        <button 
                            key={key}
                            onClick={() => setActiveCategory(category)}
                            className={cn(
                                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                                activeCategory === category ? "bg-primary text-primary-foreground"
                                : "bg-secondary/70 text-foreground hover:bg-secondary"
                            )}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:gridd-cols-3 gap-6">
                    {filteredSkills.map((skill, key) => (
                        <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover">
                            <div className="text-left mb-4">
                                <h3 className="font-semibold text-lg"> {skill.name} </h3>
                            </div>
                            <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                                <div 
                                    className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease_out]"
                                    style={{width: skill.level + "%"}}
                                />
                            </div>

                            <div className="text-right mt-1">
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );   
};






// export const SkillsSection = () => {
//     return (
//         <section id="skills" className="py-24 px-4 relative">
//             <div className="container mx-auto max-w-5xl">
//                 <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
//                     My <span className="text-primary"> Skills </span>
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//                     <div className="space-y-6">
//                         <h3 className="text-2xl font-semibold">Technical Skills</h3>
//                         <p className="text-muted-foreground">
//                             I have a diverse skill set that includes web development, mobile app development, and UI/UX design.
//                         </p>
//                         <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
//                             <li>JavaScript, React, Node.js</li>
//                             <li>React Native for mobile applications</li>
//                             <li>UI/UX design principles</li>
//                         </ul>
//                     </div>

//                     <div className="space-y-6">
//                         <h3 className="text-2xl font-semibold">Soft Skills</h3>
//                         <p className="text-muted-foreground">
//                             In addition to technical skills, I also possess strong soft skills that enhance my work.
//                         </p>
//                         <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
//                             <li>Effective communication and teamwork</li>
//                             <li>Problem-solving and critical thinking</li>
//                             <li>Adaptability and continuous learning</li>
//                         </ul>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );   
// };