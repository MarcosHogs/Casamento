// components/RsvpForm.js
import { useState } from 'react'

export default function RsvpForm() {
  const [form, setForm] = useState({ nome: '', presenca: '', convidados: '', mensagem: '' })
  const [enviado, setEnviado] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aqui você pode integrar com Google Sheets, EmailJS, Supabase etc.
    console.log(form)
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="bg-blue-50 text-center p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold text-blue-900 mb-2">💌 Obrigado!</h2>
        <p className="text-blue-700">Sua presença foi confirmada com sucesso.</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-lg p-8 max-w-lg mx-auto flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold text-blue-800 mb-2 text-center">Confirme sua Presença</h2>

      <input
        type="text"
        name="nome"
        placeholder="Seu nome completo"
        value={form.nome}
        onChange={handleChange}
        required
        className="border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
      />

      <select
        name="presenca"
        value={form.presenca}
        onChange={handleChange}
        required
        className="border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
      >
        <option value="">Vai comparecer?</option>
        <option value="Sim">Sim</option>
        <option value="Não">Não</option>
      </select>

      <input
        type="number"
        name="convidados"
        placeholder="Número de acompanhantes"
        value={form.convidados}
        onChange={handleChange}
        min="0"
        className="border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        name="mensagem"
        placeholder="Mensagem para os noivos (opcional)"
        value={form.mensagem}
        onChange={handleChange}
        className="border border-blue-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
      >
        Enviar Confirmação
      </button>
    </form>
  )
}
