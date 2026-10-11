import shopnest from "../assets/shopnest.png";
import SparkleStore from "../assets/SparkleStore.png";
import Unisign from "../assets/Unisign.png";
const projects = [
  {
    id: "sparkle-store",
    number: "01",
    name: "Sparkle Store",
    summary:
      "A full-stack jewellery e-commerce platform built with MongoDB, Express.js, React.js and Node.js.",
    device: "browser",
    stack: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "Redux Toolkit",
      "Tailwind CSS",
      "JWT",
    ],
    features: [
      "JWT authentication",
      "Product management",
      "Cart",
      "Order management",
      "Admin dashboard for inventory and orders",
      "Responsive UI",
      "Redux Toolkit state management",
    ],
    architecture: ["React client", "Express REST API", "MongoDB"],
    live: "", 
    github: "https://github.com/nehajha-developer/sparkle_store", 
    image: SparkleStore, 
    caseStudy: {
      problem: "",
      solution:
        "A full-stack MERN platform with JWT authentication, product management, cart and order management, and an admin dashboard for inventory and orders.",
      contribution:
        "Personal project. Built the full stack: REST APIs, JWT authentication, a responsive Tailwind CSS interface, Redux Toolkit state management and the admin dashboard.",
      challenges: "",
      learned: "",
      future: "IN-PROGRESS: Add authentication, payment gateway integration and order tracking features.",
    },
  },
  {
    id: "unisign",
    number: "02",
    name: "UniSign",
    summary:
      "An inclusive EdTech mobile application supporting deaf and mute students through sign-based educational content. SSIP grant-funded, with Proof of Concept approved by the Government of Gujarat.",
    device: "phone",

    stack: ["Figma", "Blender"], 
    features: [
      "Sign-based educational content",
      "Accessible UI designed in Figma",
      "3D educational models made in Blender",
      "SSIP grant-funded",
      "PoC approved by the Government of Gujarat",
    ],

    image: Unisign,
    caseStudy: {
      problem:
        "To broaden access to education for deaf and mute students, who face challenges with traditional learning methods.",
      solution:
        "An EdTech mobile application delivering sign-based educational content for deaf and mute students. Funded by an SSIP grant, with Proof of Concept approval from the Government of Gujarat.",
      contribution:
        "Designed the accessible UI in Figma and created the 3D educational models in Blender.",
      github: "https://github.com/nehajha-developer",
      live: "",
      challenges: "",
      learned: "",
      future: "",
    },
  },
  {
    id: "shopnest",
    number: "03",
    name: "ShopNest",
    summary:
      "A modern e-commerce frontend with product listing, cart management and order summary, built with React, Redux Toolkit and Tailwind CSS.",
    device: "browser",
    stack: ["React", "Redux Toolkit", "Tailwind CSS", "Fake Store API"],
    features: [
      "Product listing",
      "Cart management",
      "Order summary",
      "Global state with Redux Toolkit",
      "Fake Store API integration",
      "Fully responsive UI",
      "Reusable component architecture",
    ],
    architecture: ["React UI", "Redux Toolkit store", "Fake Store API"],
    live: "",
    github: "https://github.com/nehajha-developer/SHOPNEST",
    image: shopnest,
    caseStudy: {
      problem: "",
      solution:
        "A responsive React storefront with product listing, cart management and an order summary, using Redux Toolkit for global state and the Fake Store API for product data.",
      contribution:
        "Designed and built the interface and state management, focusing on performance and reusable components.",
      challenges: "",
      learned: "",
      future: "",
    },
  },
];

export default projects;
