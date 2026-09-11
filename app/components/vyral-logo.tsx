import Link from 'next/link'

export function VyralLogo({
  href = '/',
  dark = false,
  compact = false,
}: {
  href?: string
  dark?: boolean
  compact?: boolean
}) {
  return (
    <Link href={href} aria-label="VYRAL home" className="group inline-flex items-center gap-3">
      <span
        aria-hidden="true"
        className={`grid h-9 w-9 shrink-0 place-items-center transition-transform duration-300 group-hover:-rotate-3 ${
          dark ? 'bg-white text-[#111113]' : 'bg-[#111113] text-white'
        }`}
      >
        <span className="font-display text-lg font-semibold leading-none tracking-[-.08em]">V</span>
      </span>
      <span
        className={`font-display font-semibold leading-none tracking-[-.05em] ${
          compact ? 'text-2xl' : 'text-[25px]'
        } ${dark ? 'text-white' : 'text-[#111113]'}`}
      >
        VYRAL
      </span>
    </Link>
  )
}
