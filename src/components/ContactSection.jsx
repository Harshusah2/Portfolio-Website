import { Github, Instagram, Linkedin, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const useForm = (init) => {
  const [values, setValues] = useState(init);
  const handleChange = (e) => setValues((p) => ({ ...p, [e.target.name]: e.target.value }));
  const reset = () => setValues(init);
  return [values, handleChange, reset];
};

const INFO = [
  { icon: Mail,   label: "Email",    value: "harshsahu180407@gmail.com", href: "mailto:harshsahu180407@gmail.com", color: "#6C63FF" },
  { icon: Phone,  label: "Phone",    value: "+91 9098352698",             href: "tel:+919098352698",               color: "#00D4FF" },
  { icon: MapPin, label: "Location", value: "Raipur, Chhattisgarh, India", href: null,                             color: "#A855F7" },
];

const SOCIALS = [
  { icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/in/harsh-sahu-b11650257/", color: "#0A66C2" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/harshusah2/",              color: "#E1306C" },
  { icon: Github,    label: "GitHub",    href: "https://github.com/Harshusah2",                       color: "#6C63FF" },
];

export const ContactSection = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [values, handleChange, reset]   = useForm({ name: "", email: "", message: "" });

  const anim = (d = "") => `opacity-0 ${inView ? `animate-fade-in-up${d ? `-delay-${d}` : ""}` : ""}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res  = await fetch(`${API}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      toast({ title: "✅ Message sent!", description: "I'll get back to you within 24 hours." });
      reset();
    } catch (err) {
      toast({ title: "❌ Failed to send", description: err.message, variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  const panelStyle = {
    borderRadius: "1.5rem",
    background: "var(--c-bg-card)",
    border: "1px solid var(--c-border)",
    backdropFilter: "blur(20px)",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase",
    color: "var(--c-text-subtle)", marginBottom: "0.5rem", fontFamily: "'Space Grotesk', sans-serif",
  };

  const inputStyle = {
    width: "100%", padding: "0.75rem 1rem", borderRadius: "0.75rem",
    border: "1px solid var(--c-border)",
    background: "var(--c-input-bg)",
    color: "var(--c-text)",
    fontSize: "0.875rem", fontFamily: "'Space Grotesk', sans-serif", outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };
  const onFocusCss = { borderColor: "rgba(108,99,255,0.7)", boxShadow: "0 0 18px rgba(108,99,255,0.2)" };
  const onBlurCss  = { borderColor: "var(--c-border)", boxShadow: "" };

  return (
    <section id="contact" ref={ref} className="relative py-28 px-4 overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(108,99,255,0.07) 0%, transparent 70%)" }} />
      <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.5), transparent)" }} />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className={`text-center mb-16 ${anim()}`}>
          <span className="section-badge">Let&apos;s Talk</span>
          <h2 className="font-black" style={{ fontFamily: "'Archivo', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "var(--c-text)" }}>
            Get In{" "}
            <span style={{ background: "linear-gradient(135deg, #6C63FF, #00D4FF)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Touch
            </span>
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-sm leading-relaxed" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}>
            Have a project in mind, a question, or just want to say hi? My inbox is always open — I&apos;ll reply within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left — contact info */}
          <div className={`p-8 relative overflow-hidden ${anim("1")}`} style={panelStyle}>
            <span aria-hidden className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(108,99,255,0.1), transparent 70%)", filter: "blur(20px)" }} />
            <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Archivo', sans-serif", color: "var(--c-text)" }}>Contact Information</h3>
            <p className="text-sm mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}>Prefer to reach out directly? Here are the best ways.</p>
            <ul className="space-y-6">
              {INFO.map(({ icon: Icon, label, value, href, color }, i) => (
                <li key={label} className={`flex items-center gap-4 opacity-0 ${inView ? `animate-fade-in-up-delay-${i + 2}` : ""}`}>
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = `${color}28`; e.currentTarget.style.boxShadow = `0 0 20px ${color}28`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = `${color}15`; e.currentTarget.style.boxShadow = ""; }}
                  >
                    <Icon size={20} style={{ color }} />
                  </div>
                  <div className="text-left">
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--c-text-subtle)" }}>{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium transition-colors" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text)" }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = color; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = "var(--c-text)"; }}
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text)" }}>{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="my-8 h-px" style={{ background: "var(--c-border)" }} />

            <div className={`opacity-0 ${inView ? "animate-fade-in-up-delay-5" : ""}`}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--c-text-subtle)", marginBottom: "1rem" }}>Connect With Me</p>
              <div className="flex gap-3">
                {SOCIALS.map(({ icon: Icon, label, href, color }) => (
                  <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300"
                    style={{ border: "1px solid var(--c-border)", color: "var(--c-text-muted)", background: "rgba(108,99,255,0.06)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = color; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 0 20px ${color}55`; e.currentTarget.style.transform = "translateY(-3px) scale(1.1)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(108,99,255,0.06)"; e.currentTarget.style.color = "var(--c-text-muted)"; e.currentTarget.style.borderColor = "var(--c-border)"; e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = ""; }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className={`p-8 ${anim("2")}`} style={panelStyle}>
            <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Archivo', sans-serif", color: "var(--c-text)" }}>Send a Message</h3>
            <p className="text-sm mb-8" style={{ fontFamily: "'Space Grotesk', sans-serif", color: "var(--c-text-muted)" }}>Fill in the form and I&apos;ll get back to you.</p>

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {[
                { id: "contact-name",  name: "name",  type: "text",  label: "Your Name",  placeholder: "John Doe",         delay: "3" },
                { id: "contact-email", name: "email", type: "email", label: "Your Email", placeholder: "john@example.com", delay: "4" },
              ].map(({ id, name, type, label, placeholder, delay }) => (
                <div key={id} className={`opacity-0 ${inView ? `animate-fade-in-up-delay-${delay}` : ""}`}>
                  <label htmlFor={id} style={labelStyle}>{label}</label>
                  <input id={id} name={name} type={type} required value={values[name]} onChange={handleChange} placeholder={placeholder} style={inputStyle}
                    onFocus={(e) => Object.assign(e.currentTarget.style, onFocusCss)}
                    onBlur={(e) => Object.assign(e.currentTarget.style, onBlurCss)}
                  />
                </div>
              ))}

              <div className={`opacity-0 ${inView ? "animate-fade-in-up-delay-5" : ""}`}>
                <label htmlFor="contact-message" style={labelStyle}>Your Message</label>
                <textarea id="contact-message" name="message" required rows={5} value={values.message} onChange={handleChange}
                  placeholder="Hi Harsh, I'd love to work with you on…" style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => Object.assign(e.currentTarget.style, onFocusCss)}
                  onBlur={(e) => Object.assign(e.currentTarget.style, onBlurCss)}
                />
              </div>

              <div className={`opacity-0 ${inView ? "animate-fade-in-up-delay-5" : ""}`}>
                <button type="submit" disabled={isSubmitting} className="cosmic-button w-full justify-center py-3 font-semibold" style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? "not-allowed" : "pointer" }}>
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending…</> : <><Send size={16} /> Send Message</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};