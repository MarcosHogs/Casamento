"use client"

import Head from "next/head"
import { useState } from "react"
import { MapPin, Gift, Calendar, Heart, Music, Camera } from "lucide-react"
import Countdown from "./components/Countdown"
import Map from "./components/Map"
import RsvpModal from "./components/RsvpModal"
import GiftList from "./components/GiftList"
import ThemeToggle from "./components/ThemeToggle"

export default function Home() {
  const weddingISO = "2025-12-20T17:00:00-03:00"
  const [selectedGifts, setSelectedGifts] = useState([])

  const toggleGift = (gift) => {
    setSelectedGifts((prev) => {
      const exists = prev.find((g) => g.name === gift.name)
      if (exists) {
        return prev.filter((g) => g.name !== gift.name)
      } else {
        return [...prev, gift]
      }
    })
  }

  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Head>
        <title>Simone & Marcos — Nosso Casamento</title>
        <meta
          name="description"
          content="Simone e Marcos - Casamento 20 de dezembro, Igreja Matriz São Vicente de Paulo, Maceió"
        />
      </Head>

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto">
          {/* Logo or Home Link could go here */}
        </div>
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative h-screen flex flex-col justify-center items-center text-center p-6 overflow-hidden">
        {/* Background Image Placeholder - You should replace this with a real image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 dark:opacity-10 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-weddingBlue-50/50 to-weddingBlue-50 dark:via-slate-900/50 dark:to-slate-900 pointer-events-none" />

        <div className="relative z-10 animate-fade-up space-y-6 max-w-4xl mx-auto">
          <p className="text-xl md:text-2xl text-weddingBlue-600 dark:text-weddingBlue-300 tracking-[0.2em] uppercase">
            Vamos nos casar!
          </p>
          <h1 className="text-7xl md:text-9xl font-script text-weddingBlue-800 dark:text-weddingBlue-100 drop-shadow-sm">
            Simone & Marcos
          </h1>
          <p className="text-lg md:text-xl text-weddingBlue-700 dark:text-weddingBlue-200 max-w-lg mx-auto font-light">
            "O amor é paciente, o amor é bondoso. Tudo sofre, tudo crê, tudo espera, tudo suporta."
          </p>

          <div className="pt-10">
            <Countdown targetDateISO={weddingISO} />
          </div>

          <div className="pt-8 text-weddingBlue-800 dark:text-weddingBlue-200 font-medium">
            20 de Dezembro de 2025 • Maceió, AL
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 container mx-auto px-4 md:px-0 max-w-5xl space-y-24 mb-24 relative z-10">

        {/* OUR STORY / TIMELINE */}
        <section className="text-center space-y-12">
          <SectionTitle icon={<Heart className="w-6 h-6" />} title="Nossa História" />
          <div className="grid md:grid-cols-3 gap-8">
            <StoryCard
              year="2018"
              title="O Primeiro Encontro"
              desc="Nos conhecemos em um café no centro da cidade. Um olhar tímido e um sorriso mudaram tudo."
            />
            <StoryCard
              year="2021"
              title="O Pedido"
              desc="Sob a luz do luar na praia de Pajuçara, ele fez a pergunta mais importante de nossas vidas."
            />
            <StoryCard
              year="2025"
              title="O Grande Dia"
              desc="Agora, estamos prontos para escrever o próximo capítulo da nossa história ao lado de vocês."
            />
          </div>
        </section>

        {/* CEREMONY & LOCATION */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <SectionTitle icon={<MapPin className="w-6 h-6" />} title="Cerimônia & Festa" align="left" />
            <div className="glass-card p-8 space-y-4">
              <h3 className="text-2xl font-bold text-weddingBlue-800 dark:text-weddingBlue-100">
                Igreja Matriz São Vicente de Paulo
              </h3>
              <p className="text-weddingBlue-700 dark:text-weddingBlue-200">
                R. Quarenta e Nove, s/n - Cidade Universitária<br />
                Maceió - AL, 57073-000
              </p>
              <div className="flex items-center gap-2 text-sm font-medium text-weddingBlue-600 dark:text-weddingBlue-300">
                <Calendar className="w-4 h-4" />
                <span>20 de Dezembro de 2025 às 17:00</span>
              </div>
              <p className="text-sm text-weddingBlue-600 dark:text-weddingBlue-400 italic">
                A recepção será realizada no salão de festas ao lado da igreja logo após a cerimônia.
              </p>
            </div>
          </div>
          <div className="h-[400px] rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-700">
            <Map />
          </div>
        </section>

        {/* GIFT LIST */}
        <section className="space-y-12">
          <SectionTitle icon={<Gift className="w-6 h-6" />} title="Lista de Presentes" />
          <p className="text-center text-weddingBlue-700 dark:text-weddingBlue-200 max-w-2xl mx-auto">
            Sua presença é o nosso maior presente! Mas se quiser nos mimar, ficaremos muito felizes com qualquer contribuição para nossa lua de mel ou nossa casa nova.
          </p>
          <GiftList selectedGifts={selectedGifts} toggleGift={toggleGift} />
        </section>

        {/* RSVP */}
        <section className="text-center space-y-8 py-12 bg-weddingBlue-100/50 dark:bg-slate-800/50 rounded-[3rem]">
          <SectionTitle icon={<Camera className="w-6 h-6" />} title="Confirme sua Presença" />
          <p className="text-weddingBlue-700 dark:text-weddingBlue-200 max-w-lg mx-auto">
            Por favor, confirme sua presença até o dia 01 de Dezembro de 2025 para que possamos organizar tudo com carinho.
          </p>
          <div className="flex justify-center">
            <RsvpModal selectedGifts={selectedGifts} />
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="text-center py-12 text-weddingBlue-600 dark:text-weddingBlue-400 text-sm bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-weddingBlue-100 dark:border-slate-800">
        <p className="mb-2">Feito com ❤️ por Simone & Marcos</p>
        <p className="text-xs opacity-70">© 2025 Todos os direitos reservados</p>
      </footer>
    </div>
  )
}

function SectionTitle({ icon, title, align = "center" }) {
  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center" : "items-start"}`}>
      <div className="p-3 rounded-full bg-weddingBlue-100 dark:bg-slate-800 text-weddingBlue-600 dark:text-weddingBlue-300">
        {icon}
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-weddingBlue-900 dark:text-weddingBlue-50 font-script">
        {title}
      </h2>
    </div>
  )
}

function StoryCard({ year, title, desc }) {
  return (
    <div className="glass-card p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300">
      <span className="text-5xl font-script text-weddingBlue-200 dark:text-slate-700 mb-4">{year}</span>
      <h3 className="text-xl font-bold text-weddingBlue-800 dark:text-weddingBlue-100 mb-2">{title}</h3>
      <p className="text-weddingBlue-600 dark:text-weddingBlue-300 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}
