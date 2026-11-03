import { Fraunces, Montserrat, Bebas_Neue } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

/* Playfair's hairlines shimmered against the dark ground at display sizes.
   Fraunces carries the same warmth with far less stroke contrast; SOFT rounds
   the terminals and opsz keeps the small sizes from going spindly. */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600"],
})

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
})

export const metadata = {
  title: "Dustin Aldana | Full-Stack Developer",
  description:
    "Dustin Aldana — Full-stack developer crafting thoughtful apps with personality. Explore my projects, skills, and story behind the code.",
  alternates: {
    canonical: "https://www.builtbydustin.dev",
  },
  icons: {
    icon: "/images/icon.png",
  },
  keywords: [
    "Dustin Aldana",
    "Full-Stack Developer",
    "Web Developer",
    "JavaScript",
    "React",
    "Node.js",
    "Portfolio",
    "Projects",
    "Software Engineer",
    "Frontend",
    "Backend",
    "Next.js",
    "TypeScript",
    "GitHub",
    "LinkedIn",
  ],
  openGraph: {
    title: "Dustin Aldana | Full-Stack Development",
    description:
      "Dustin Aldana — Full-stack developer crafting thoughtful apps with personality. Explore my projects, skills, and story behind the code.",
    url: "https://www.builtbydustin.dev",
    siteName: "Dustin Aldana Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.builtbydustin.dev/images/headshot.jpg",
        width: 1200,
        height: 900,
        alt: "Dustin Aldana",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dustin Aldana | Full-Stack Development",
    description:
      "Dustin Aldana — Full-stack developer crafting thoughtful apps with personality. Explore my projects, skills, and story behind the code.",
    images: ["https://www.builtbydustin.dev/images/headshot.jpg"],
  },
}

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Dustin Aldana",
  url: "https://www.builtbydustin.dev",
  jobTitle: "Full-Stack Developer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Victoria",
    addressRegion: "BC",
    addressCountry: "CA",
  },
  sameAs: [
    "https://github.com/d-aldana",
    "https://www.linkedin.com/in/dj-aldana/",
    "https://www.instagram.com/dj_aldana32/",
  ],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head lang="en">
        <link rel="icon" href="/images/icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${fraunces.variable} ${montserrat.variable} ${bebas.variable}`}
      >
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Analytics />
        {children}
      </body>
    </html>
  )
}
