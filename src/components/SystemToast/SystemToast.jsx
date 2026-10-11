import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SystemToast({ show }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!show) return;
    setVisible(true);
    const id = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(id);
  }, [show]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          className="glass fixed bottom-4 right-4 z-50 px-4 py-2 font-mono text-xs text-cyan-os"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          ● SYSTEM ONLINE
        </motion.div>
      )}
    </AnimatePresence>
  );
}
