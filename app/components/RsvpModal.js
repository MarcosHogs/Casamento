"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Gift, CheckCircle2 } from "lucide-react"

export default function RsvpModal({ selectedGifts = [] }) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    guests: "1",
    message: "",
    pix: false
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Save to Database
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          selectedGifts
        })
      })
    } catch (error) {
      console.error('Error saving RSVP:', error)
      // Continue to WhatsApp even if DB fails
    }

    // Format message for WhatsApp
    // Using Unicode escapes to avoid encoding issues
    let text = `Olá! Aqui é *${formData.name}* \uD83D\uDC4B\n`
    text += `Estou confirmando minha presença! \uD83E\uDD35\uD83D\uDC70\n\n`
    text += `\uD83D\uDC65 *Total de pessoas:* ${formData.guests}\n`

    if (selectedGifts.length > 0) {
      text += `\uD83C\uDF81 *Presentes escolhidos:*\n`
      selectedGifts.forEach(gift => {
        text += `- ${gift.name}\n`
      })
      text += `\n`
    }

    if (formData.message) {
      text += `\uD83D\uDC8C *Mensagem:* ${formData.message}\n\n`
    }

    if (formData.pix) {
      text += `\uD83D\uDCB8 Vou fazer um Pix!\n\n`
    }

    text += `Mal posso esperar pelo grande dia! \u2728`

    // Replace with actual phone number
    const phoneNumber = "5582982235028"
    // Use api.whatsapp.com for better compatibility
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(text)}`, "_blank")
    setOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-weddingBlue-600 hover:bg-weddingBlue-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg flex items-center gap-2"
      >
        Confirmar Presença
        {selectedGifts.length > 0 && (
          <span className="bg-white text-weddingBlue-600 text-xs py-1 px-2 rounded-full">
            {selectedGifts.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-weddingBlue-100 dark:border-slate-700 flex flex-col max-h-[90vh]"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex justify-between items-center bg-weddingBlue-600 dark:bg-slate-800 text-white px-6 py-4 shrink-0">
                <h2 className="text-lg font-semibold font-sans">
                  Confirmar Presença
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                >
                  <X size={24} />
                </button>
              </div>

              {/* FORM */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Selected Gifts Summary */}
                  {selectedGifts.length > 0 && (
                    <div className="bg-weddingBlue-50 dark:bg-slate-800 p-4 rounded-xl border border-weddingBlue-100 dark:border-slate-700">
                      <h3 className="text-sm font-bold text-weddingBlue-800 dark:text-weddingBlue-200 mb-2 flex items-center gap-2">
                        <Gift size={16} />
                        Presentes Selecionados ({selectedGifts.length})
                      </h3>
                      <ul className="space-y-1">
                        {selectedGifts.map((gift, idx) => (
                          <li key={idx} className="text-sm text-weddingBlue-600 dark:text-weddingBlue-300 flex items-start gap-2">
                            <CheckCircle2 size={14} className="mt-1 shrink-0" />
                            <span className="line-clamp-1">{gift.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-weddingBlue-700 dark:text-weddingBlue-200 mb-1">
                        Seu Nome Completo
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-weddingBlue-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-weddingBlue-900 dark:text-white focus:ring-2 focus:ring-weddingBlue-500 outline-none transition-all"
                        placeholder="Ex: Maria Silva"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-weddingBlue-700 dark:text-weddingBlue-200 mb-1">
                        Total de Convidados (incluindo você)
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-weddingBlue-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-weddingBlue-900 dark:text-white focus:ring-2 focus:ring-weddingBlue-500 outline-none transition-all"
                      >
                        {[1, 2, 3, 4, 5, 6].map(num => (
                          <option key={num} value={num}>{num} {num === 1 ? 'Pessoa' : 'Pessoas'}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-weddingBlue-700 dark:text-weddingBlue-200 mb-1">
                        Mensagem para os Noivos (Opcional)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-3 rounded-xl border border-weddingBlue-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-weddingBlue-900 dark:text-white focus:ring-2 focus:ring-weddingBlue-500 outline-none transition-all resize-none"
                        placeholder="Deixe uma mensagem de carinho..."
                      />
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-weddingBlue-50 dark:bg-slate-800 rounded-xl border border-weddingBlue-100 dark:border-slate-700 cursor-pointer" onClick={() => setFormData(prev => ({ ...prev, pix: !prev.pix }))}>
                      <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${formData.pix ? 'bg-weddingBlue-500 border-weddingBlue-500' : 'border-weddingBlue-300 dark:border-slate-500'}`}>
                        {formData.pix && <CheckCircle2 size={16} className="text-white" />}
                      </div>
                      <span className="text-sm font-medium text-weddingBlue-800 dark:text-weddingBlue-200 select-none">
                        Pretendo fazer um Pix como presente
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-lg"
                  >
                    <Send size={20} />
                    Enviar Confirmação no WhatsApp
                  </button>

                  <p className="text-xs text-center text-weddingBlue-500 dark:text-weddingBlue-400">
                    Ao clicar, você será redirecionado para o WhatsApp para enviar a mensagem.
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
