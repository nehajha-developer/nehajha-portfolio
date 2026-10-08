// ✏️ EDIT: one object per project.
// RULES: leave live/github as "" if it does not exist (the button hides itself).
// Only list features and claims that are true for your project.
// `caseStudy` powers the detail modal (Step 8). Fill what you can, leave the rest as "".
const emptyCase = { problem: "", solution: "", architecture: "", contribution: "", challenges: "", learned: "", future: "" };

const projects = [
  {
    id: "sparkle-store",
    number: "01",
    name: "Sparkle Store",
    summary: "A full-stack luxury jewellery e-commerce platform built with the MERN stack.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS", "JWT", "Cloudinary"],
    features: ["Authentication", "Product catalogue", "Search", "Filtering", "Cart", "Orders", "Admin dashboard", "Role-based access", "OTP/email verification", "Password reset"],
    live: "",    // ✏️ EDIT
    github: "",  // ✏️ EDIT
    image: "",   // ✏️ EDIT: screenshot in /public/projects/, then "/projects/sparkle.png"
    caseStudy: emptyCase,
  },
  {
    id: "unisign",
    number: "02",
    name: "UniSign",
    summary: "An educational platform designed to support deaf and mute students through Indian Sign Language based learning.",
    stack: ["React"], // ✏️ EDIT: list your real stack
    features: ["Educational lessons", "ISL learning", "Quizzes", "Vocabulary", "Practice"], // ✏️ EDIT: remove anything not built
    live: "",
    github: "",
    image: "",
    caseStudy: emptyCase,
  },
  {
    id: "shopnest",
    number: "03",
    name: "ShopNest",
    summary: "A modern React shopping experience focused on state management, product browsing and cart functionality.",
    stack: ["React", "Redux Toolkit", "Tailwind CSS", "Fake Store API"],
    features: ["Product catalogue", "Product details", "Cart", "State management", "Responsive UI"],
    live: "",
    github: "",
    image: "",
    caseStudy: emptyCase,
  },
];

export default projects;
