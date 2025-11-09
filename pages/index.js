import Head from 'next/head'
import Countdown from '../components/Countdown'
import Map from '../components/Map'
import RsvpModal from '../components/RsvpModal'

export default function Home() {
  const weddingISO = '2025-12-20T17:00:00-03:00'

  return (
    <div className="p-5 min-h-screen bg-gradient-to-b from-blue-50 to-white text-blue-900 flex flex-col font-[var(--font-poppins)]">
      <Head>
        <title>Simone & Marcos — Nosso Casamento</title>
        <meta
          name="description"
          content="Simone e Marcos - Casamento 20 de dezembro, Igreja Matriz São Vicente de Paulo, Maceió"
        />
      </Head>

      {/* HEADER */}
      <header className="py-14 text-center bg-gradient-to-b from-blue-100 to-transparent">
        <h1 className="text-5xl md:text-6xl font-bold text-blue-800 font-[var(--font-great-vibes)] drop-shadow-sm">
          Simone & Marcos
        </h1>
        <p className="mt-4 text-blue-700 italic text-lg max-w-xl mx-auto">
          Nossa maior alegria é ter você celebrando esse momento tão especial conosco
        </p>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 container mx-auto px-6 md:px-0 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">

        {/* CARD: Cerimônia */}
        <section className="bg-white rounded-3xl shadow-md p-8 hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center gap-2">
            💒 Cerimônia
          </h2>
          <p className="text-blue-700 font-medium">Igreja Matriz São Vicente de Paulo</p>
          <p className="text-blue-700 mb-6">
            R. Quarenta e Nove, s/n - Cidade Universitária, Maceió - AL, 57073-000
          </p>
          <div className="overflow-hidden rounded-2xl border border-blue-100 shadow-inner">
            <Map />
          </div>
        </section>

        {/* CARD: Contagem Regressiva */}
        <section className="bg-gradient-to-br from-blue-100 via-white to-blue-50 rounded-3xl shadow-md p-8 flex flex-col justify-center items-center text-center hover:shadow-xl transition duration-300">
          <h2 className="text-2xl font-semibold text-blue-900 mb-4">⏳ Contagem Regressiva</h2>
          <Countdown targetDateISO={weddingISO} />
          <p className="mt-4 text-sm text-blue-700 italic">
            Cerimônia: <strong>20 de dezembro de 2025 às 17:00</strong>
          </p>
        </section>

        {/* CARD: Lista de Presentes */}
        <section className="bg-white rounded-3xl shadow-md p-10 md:col-span-2 hover:shadow-xl transition duration-300 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-6">🎁 Lista de Presentes</h2>
          <p className="text-blue-700 mb-4">
            Nossa maior alegria é ter você celebrando esse momento tão especial conosco!
          </p>
          <p className="text-blue-700 mb-6">
            Mas, se desejar nos presentear de forma simbólica, criamos cotas para nossa lua de mel.
            Cada contribuição será um pedacinho dessa viagem inesquecível que estamos prestes a viver juntos.
          </p>
          <div className="bg-blue-50 rounded-xl p-5 shadow-inner inline-block mb-6">
            <div className="font-semibold text-blue-900 text-lg">💳 Chave Pix</div>
            <div className="text-blue-700 text-base mt-1">(82) 98223-5028</div>
          </div>
          <p className="text-blue-600 italic">
            Sua presença é o que mais importa, mas se quiser participar desse sonho de alguma forma,
            ficaremos imensamente felizes!
          </p>
        </section>

        {/* CARD: RSVP */}
        <section className="md:col-span-2 flex flex-col items-center justify-center mt-4">
          <RsvpModal />
          <p className="mt-3 text-sm text-blue-700 text-center">
            Clique para confirmar presença — o formulário abrirá aqui mesmo 💙
          </p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="text-center py-6 text-blue-600 text-sm bg-gradient-to-t from-blue-50 to-transparent">
        Feito com ❤️ por Simone & Marcos
      </footer>
    </div>
  )
}
