import { DM_Sans, DM_Serif_Display } from "next/font/google"
import UnsaidMark from "./UnsaidMark"
import styles from "./unsaid-legal.module.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
})

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-dm-serif",
})

export default function UnsaidLegal({
  eyebrow,
  title,
  meta,
  lede,
  children,
  contact,
}) {
  return (
    <main className={`${dmSans.variable} ${dmSerif.variable} ${styles.root}`}>
      <div className={styles.container}>
        <header className={styles.hero}>
          <UnsaidMark className={styles.watermark} />
          <UnsaidMark className={styles.crest} />
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 className={styles.title}>{title}</h1>
          {meta && <p className={styles.meta}>{meta}</p>}
        </header>

        <span className={styles.divider} aria-hidden="true" />

        {lede && <p className={styles.lede}>{lede}</p>}

        <article className={styles.body}>{children}</article>

        {contact && <section className={styles.contact}>{contact}</section>}
      </div>
    </main>
  )
}
