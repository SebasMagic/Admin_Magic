import { useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidePanelProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: number;
}

export function SidePanel({ open, onClose, title, children, width = 480 }: SidePanelProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            data-testid="side-panel-overlay"
          />
          <motion.div
            className="fixed top-0 right-0 h-full z-50 flex flex-col overflow-hidden"
            style={{ width, background: "#111111", borderLeft: "1px solid #004c1e" }}
            initial={{ x: width }}
            animate={{ x: 0 }}
            exit={{ x: width }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            data-testid="side-panel"
          >
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #004c1e" }}>
              <h3 className="text-base font-semibold text-white">{title}</h3>
              <button onClick={onClose} className="text-[#9ca3af] hover:text-white transition-colors" data-testid="side-panel-close">
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-auto px-6 py-5">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
