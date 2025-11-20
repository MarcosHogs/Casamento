export default function RsvpButton({ formLink }) {
  const href = formLink || '#'
  return (
    <a
      href={href}
      target={href === '#' ? '_self' : '_blank'}
      rel="noreferrer"
      className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
    >
      Confirmar Presença
    </a>
  )
}
