import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RsvpModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* BOTÃO PRINCIPAL */}
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition"
      >
        Confirmar Presença 💙
      </button>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* HEADER DO MODAL */}
              <div className="flex justify-between items-center bg-blue-600 text-white px-6 py-4">
                <h2 className="text-lg font-semibold">
                  Confirmação de Presença — Simone & Marcos
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white hover:text-blue-100 text-2xl leading-none"
                >
                  ✕
                </button>
              </div>

              {/* CONTEÚDO */}
              <div className="p-4 md:p-6 bg-blue-50">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSf30AgFfRllEldH6xevlOpKXtNbL7PRwz7JtNSbWtA4j4EINA/viewform?embedded=true"
                  width="100%"
                  height="800"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  className="rounded-xl shadow-inner"
                >
                  Carregando…
                </iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
