"use client"

import { useState, useRef, useEffect } from "react"
import { gifts } from "../data/gifts"
import { Copy, Check, Search, Gift as GiftIcon, CreditCard, CheckCircle2, Lock } from "lucide-react"

export default function GiftList({ selectedGifts = [], toggleGift }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [visibleCount, setVisibleCount] = useState(9)
  const [takenGifts, setTakenGifts] = useState([])
  const pixRef = useRef(null)

  useEffect(() => {
    const fetchTakenGifts = async () => {
      try {
        const res = await fetch('/api/rsvp')
        const data = await res.json()
        if (data.gifts) {
          setTakenGifts(data.gifts)
        }
      } catch (error) {
        console.error('Error fetching taken gifts:', error)
      }
    }
    fetchTakenGifts()
  }, [])

  const filteredGifts = gifts.filter((gift) =>
    gift.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-12">
      <PixSection pixRef={pixRef} />

      <div className="space-y-8">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {filteredGifts.length > 0 ? (
          <>
            <GiftGrid
              gifts={filteredGifts.slice(0, visibleCount)}
              selectedGifts={selectedGifts}
              takenGifts={takenGifts}
              toggleGift={toggleGift}
            />

            {visibleCount < filteredGifts.length && (
              <LoadMoreButton onClick={() => setVisibleCount(prev => prev + 9)} />
            )}
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  )
}

function PixSection({ pixRef }) {
  const [copied, setCopied] = useState(false)
  const pixKey = "82982235028"

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={pixRef} className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-weddingBlue-800 to-weddingBlue-900 text-white shadow-2xl p-8 md:p-12 max-w-3xl mx-auto animate-fade-up">
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-weddingBlue-400/20 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <div className="p-3 bg-white/10 rounded-full backdrop-blur-md border border-white/20">
          <CreditCard className="w-8 h-8 text-weddingBlue-100" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold font-script tracking-wide">Presenteie via Pix</h3>
          <p className="text-weddingBlue-100 max-w-md mx-auto text-sm md:text-base">
            A forma mais prática e segura de nos presentear. Sua contribuição nos ajuda a construir nosso sonho!
          </p>
        </div>

        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 flex items-center gap-2">
          <code className="flex-1 text-center font-mono text-lg md:text-xl text-white tracking-wider truncate px-4">
            {pixKey}
          </code>
          <button
            onClick={handleCopy}
            className="p-3 rounded-xl bg-white text-weddingBlue-900 hover:bg-weddingBlue-50 transition-colors font-medium flex items-center gap-2 shadow-lg"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            <span className="hidden md:inline">{copied ? "Copiado!" : "Copiar"}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-5xl mx-auto px-4">
      <h3 className="text-2xl font-bold text-weddingBlue-900 dark:text-weddingBlue-50 flex items-center gap-2">
        <GiftIcon className="w-6 h-6 text-weddingBlue-500" />
        Sugestões de Presentes
      </h3>

      <div className="relative w-full md:w-72 group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-weddingBlue-400 group-focus-within:text-weddingBlue-600 transition-colors" />
        </div>
        <input
          type="text"
          placeholder="Buscar presente..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-3 py-2.5 border border-weddingBlue-200 dark:border-slate-700 rounded-xl leading-5 bg-white dark:bg-slate-800 text-weddingBlue-900 dark:text-weddingBlue-100 placeholder-weddingBlue-400 focus:outline-none focus:ring-2 focus:ring-weddingBlue-500 focus:border-transparent transition-all shadow-sm"
        />
      </div>
    </div>
  )
}

function GiftGrid({ gifts, selectedGifts, takenGifts, toggleGift }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto px-4">
      {gifts.map((item, idx) => (
        <GiftCard
          key={idx}
          item={item}
          isSelected={selectedGifts.some((g) => g.name === item.name)}
          isTaken={takenGifts.includes(item.name)}
          toggleGift={toggleGift}
        />
      ))}
    </div>
  )
}

function GiftCard({ item, isSelected, isTaken, toggleGift }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={`group bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border transition-all duration-300 hover:-translate-y-1 flex flex-col ${isSelected
        ? "border-weddingBlue-500 ring-2 ring-weddingBlue-500 ring-offset-2 dark:ring-offset-slate-900"
        : "border-weddingBlue-100 dark:border-slate-700"
        } ${isTaken ? "opacity-75 grayscale" : ""}`}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-weddingBlue-50 dark:bg-slate-900">
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-weddingBlue-100 dark:bg-slate-800" />
        )}
        <img
          src={item.img}
          alt={item.name}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${loaded ? "opacity-100" : "opacity-0"
            }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-6">
          <p className="text-white font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            {item.desc}
          </p>
        </div>
        {isSelected && (
          <div className="absolute top-4 right-4 bg-weddingBlue-500 text-white p-2 rounded-full shadow-lg animate-fade-in">
            <CheckCircle2 size={20} />
          </div>
        )}
        {isTaken && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]">
            <div className="bg-white/90 text-weddingBlue-900 px-4 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">
              <Lock size={16} />
              Já Escolhido
            </div>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h4 className="font-bold text-weddingBlue-900 dark:text-weddingBlue-50 text-lg mb-2 line-clamp-2">
          {item.name}
        </h4>
        <div className="mt-auto pt-4">
          <button
            disabled={isTaken}
            onClick={() => toggleGift && toggleGift(item)}
            className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${isTaken
                ? "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                : isSelected
                  ? "bg-weddingBlue-600 text-white hover:bg-weddingBlue-700"
                  : "bg-weddingBlue-50 dark:bg-slate-700 hover:bg-weddingBlue-100 dark:hover:bg-slate-600 text-weddingBlue-700 dark:text-weddingBlue-200 group-hover:bg-weddingBlue-600 group-hover:text-white dark:group-hover:bg-weddingBlue-600 dark:group-hover:text-white"
              }`}
          >
            {isTaken ? <Lock size={18} /> : <GiftIcon size={18} />}
            {isTaken ? "Indisponível" : isSelected ? "Selecionado" : "Presentear"}
          </button>
        </div>
      </div>
    </div>
  )
}

function LoadMoreButton({ onClick }) {
  return (
    <div className="flex justify-center pt-8">
      <button
        onClick={onClick}
        className="bg-white dark:bg-slate-800 text-weddingBlue-600 dark:text-weddingBlue-300 border border-weddingBlue-200 dark:border-slate-700 px-8 py-3 rounded-full font-semibold hover:bg-weddingBlue-50 dark:hover:bg-slate-700 transition-colors shadow-sm hover:shadow-md"
      >
        Ver mais presentes
      </button>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <p className="text-weddingBlue-500 dark:text-weddingBlue-400 text-lg">
        Nenhum presente encontrado com esse nome.
      </p>
    </div>
  )
}
