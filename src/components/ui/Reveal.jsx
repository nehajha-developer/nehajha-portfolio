import { motion } from "framer-motion";

// Fades content up once when it scrolls into view. Pass as="li" etc. for list items.
export default function Reveal({
  children,
  delay = 0,
  className = "",
  as = "div",
}) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </Tag>
  );
}
