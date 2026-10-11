import { useRef, useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import profile from "../../data/profile";

const ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = (import.meta.env.VITE_WEB3FORMS_KEY || "").trim();


if (import.meta.env.DEV) {
  console.info(
    ACCESS_KEY
    
  );
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY = { name: "", email: "", message: "", botcheck: "" };

function validate(v) {
  const e = {};
  if (v.name.trim().length < 2) e.name = "Please enter your name.";
  if (!EMAIL_RE.test(v.email.trim())) e.email = "Please enter a valid email address.";
  if (v.message.trim().length < 10) e.message = "Please write at least 10 characters.";
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); 
  const [detail, setDetail] = useState(""); 
  const formRef = useRef(null);

  const set = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    const errs = validate(values);
    setErrors(errs);
    const firstBad = Object.keys(errs)[0];
    if (firstBad) { formRef.current?.elements[firstBad]?.focus(); return; }

    if (values.botcheck) { setStatus("success"); setValues(EMPTY); return; }

    const name = values.name.trim(), email = values.email.trim(), message = values.message.trim();

    if (!ACCESS_KEY) {
      const subject = encodeURIComponent(`Portfolio message from ${name}`);
      const body = encodeURIComponent(`${message}\n\n${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY, name, email, message,
          subject: `New portfolio message from ${name}`,
          from_name: "Portfolio contact form",
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) { setStatus("success"); setValues(EMPTY); setDetail(""); }
      else {
        console.error("[contact form] Web3Forms rejected the message:", res.status, data);
        setDetail(data?.message || `Error ${res.status}`);
        setStatus("error");
      }
    } catch (err) {
      console.error("[contact form] Could not reach Web3Forms (offline, or blocked by an ad-blocker/firewall):", err);
      setDetail("Could not reach the email service. Check your internet connection or turn off ad-blockers for this site.");
      setStatus("error");
    }
  };

  const sending = status === "sending";
  const err = (f) => (errors[f] ? { "aria-invalid": true, "aria-describedby": `${f}-err` } : {});
  const Err = ({ f }) => errors[f] ? <p id={`${f}-err`} className="mt-1.5 text-sm text-rose-300">{errors[f]}</p> : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium">Name</label>
        <input id="name" name="name" type="text" autoComplete="name" maxLength={80} value={values.name} onChange={set("name")} className="field" placeholder="Your name" {...err("name")} />
        <Err f="name" />
      </div>
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" maxLength={120} value={values.email} onChange={set("email")} className="field" placeholder="you@example.com" {...err("email")} />
        <Err f="email" />
      </div>
      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium">Message</label>
        <textarea id="message" name="message" rows={5} maxLength={2000} value={values.message} onChange={set("message")} className="field resize-y" placeholder="Tell me about your idea or opportunity..." {...err("message")} />
        <Err f="message" />
      </div>

      {/* Honeypot (hidden from people and screen readers) */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>Leave this empty<input type="text" name="botcheck" tabIndex={-1} autoComplete="off" value={values.botcheck} onChange={set("botcheck")} /></label>
      </div>

      {import.meta.env.DEV && !ACCESS_KEY && (
        <p className="rounded-lg border border-dashed border-cyan-os/40 bg-cyan-os/5 p-3 text-xs leading-5 text-cyan-os">
          
        </p>
      )}

      <button type="submit" disabled={sending} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
        {sending ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending...</> : <>[ SEND MESSAGE ] <Send size={16} aria-hidden="true" /></>}
      </button>

      <div role="status" aria-live="polite" className="min-h-[1.5rem] text-sm">
        {status === "success" && <p className="flex items-start gap-2 text-cyan-os"><CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" /> Message sent. Thank you, I'll get back to you soon.</p>}
        {status === "mailto" && (
          <p className="text-muted">
            Trying to open your email app. If nothing opens, please email me directly at{" "}
            <a className="text-cyan-os underline" href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>
        )}
        {status === "error" && (
          <p className="flex items-start gap-2 text-rose-300"><AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>Sorry, that didn't send. Please try again, or email me directly at <a className="underline" href={`mailto:${profile.email}`}>{profile.email}</a>.
              {import.meta.env.DEV && detail && <span className="mt-1 block text-xs opacity-80">Reason (dev only): {detail}</span>}</span>
          </p>
        )}
      </div>
    </form>
  );
}
