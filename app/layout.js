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
  alternatives: {
    canonical: "https://www.builtbydustin.com",
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
    "Skills",
    "About Me",
    "Contact",
    "Software Engineer",
    "Frontend",
    "Backend",
    "Full-Stack",
    "Web Applications",
    "Programming",
    "Tech Enthusiast",
    "Coding",
    "Development",
    "Next.js",
    "CSS",
    "HTML",
    "TypeScript",
    "GitHub",
    "LinkedIn",
    "Resume",
    "Tech Portfolio",
    "Python",
    "Django",
    "APIs",
    "UI/UX",
    "Responsive Design",
    "Open Source",
    "Tech Blog",
    "Cloud Computing",
    "AWS",
    "Native",
    "Mobile Development",
    "React Native",
  ],
  openGraph: {
    title: "Dustin Aldana | Full-Stack Development",
    description:
      "Dustin Aldana — Full-stack developer crafting thoughtful apps with personality. Explore my projects, skills, and story behind the code.",
    url: "https://www.builtbydustin.com",
    siteName: "Dustin Aldana Portfolio",
    locale: "en_US",
    type: "website",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head lang="en">
        <link rel="icon" href="/images/icon.png" />
      </head>
      <body
        className={`${fraunces.variable} ${montserrat.variable} ${bebas.variable}`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  )
}
