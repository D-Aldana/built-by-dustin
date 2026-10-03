import { forwardRef, useEffect } from "react"
import Link from "next/link"
import styled from "@emotion/styled"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ProjectCard } from "@/components/project-card"
import { SectionHeading } from "@/components/section-heading"
import { breakpoints, container } from "@/styles/theme"
import { prefersReducedMotion } from "@/util/motion"

gsap.registerPlugin(ScrollTrigger)

const Container = styled.div`
  ${container};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-block: 2rem;
  margin-top: 2rem;
  position: relative;
`

const WaveBackground = styled.div`
  position: absolute;
  top: bottom;
  left: 0;
  width: 100%;
  height: 100%;
  background: url("/images/wave.svg");
  background-size: 300px auto;
  background-repeat: repeat-x;
  background-position: 0% 10%;
  opacity: 0.12;
  z-index: 0;
`

const Group = styled.section`
  width: 100%;
  padding-top: 2.5rem;
  position: relative;
`

const GroupLabel = styled.h3`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSubtle};

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.line};
  }
`

/* Flex rather than grid so a row that isn't full yet centers instead of
   leaving an empty slot on the right. */
const ProjectRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding-top: 1.5rem;
  width: 100%;

  > * {
    flex: 0 1 calc((100% - 4rem) / 3);
  }

  ${breakpoints.tablet} {
    > * {
      flex-basis: calc((100% - 2rem) / 2);
    }
  }

  @media (max-width: 640px) {
    > * {
      flex-basis: 100%;
    }
  }
`

const MoreList = styled.ul`
  list-style: none;
  padding-top: 0.5rem;
`

const MoreItem = styled.li`
  display: grid;
  grid-template-columns: 12rem 1fr auto;
  align-items: baseline;
  gap: 0.35rem 1.5rem;
  padding-block: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.line};

  @media (max-width: 640px) {
    grid-template-columns: 1fr auto;
  }
`

const MoreTitle = styled.span`
  font-family: var(--font-montserrat), sans-serif;
  font-weight: 700;
  color: ${({ theme }) => theme.chalk};
`

const MoreDescription = styled.div`
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.textMuted};

  @media (max-width: 640px) {
    grid-column: 1 / -1;
    grid-row: 2;
  }
`

const MoreTech = styled.span`
  display: block;
  margin-top: 0.2rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.textSubtle};
`

const MoreLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ theme }) => theme.bronze};
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    text-decoration-thickness: 2px;
  }
`

const clientProjects = [
  {
    title: "Coffee & Contracts",
    description:
      "A marketing platform for real estate agents, with AI-generated captions, Instagram analytics, and a content-strategy calendar.",
    link: process.env.NEXT_PUBLIC_COFFEE_CONTRACTS_URL,
    imgSrc: "/images/c-c-logo-stacked-black.svg",
    thumbBg: "#FEFAE0",
    skills: [
      "Next.js",
      "React",
      "Django",
      "PostgreSQL",
      "Claude AI",
      "Stripe",
      "Instagram API",
    ],
    stats: [
      { num: "10K+", label: "Agents" },
      { num: "AI", label: "Captions" },
    ],
  },
  {
    title: "CareMobi",
    description:
      "A platform that connects patients, families, and healthcare professionals to make managing care easier and more human.",
    link: process.env.NEXT_PUBLIC_CAREMOBI_URL,
    imgSrc: "/images/caremobi.svg",
    skills: [
      "Next.js",
      "Django",
      "React Native",
      "Expo",
      "React",
      "PostgreSQL",
      "AWS S3",
      "Heroku",
      "Docker",
      "Firebase",
    ],
    stats: [
      { num: "3K+", label: "Users" },
      { num: "4.9", label: "Rating" },
    ],
  },
  {
    title: "Six",
    description:
      "A social recommendation app built on lists of exactly six favorites, shared privately or discovered on a map.",
    link: process.env.NEXT_PUBLIC_SIX_URL,
    imgSrc: "/images/six.png",
    skills: [
      "React Native",
      "Next.js",
      "Django Ninja",
      "React",
      "Expo",
      "PostgreSQL",
      "PostGIS",
      "Celery",
      "OpenAI API",
      "PostHog",
    ],
    stats: [
      { num: "6", label: "Picks Per List" },
      { num: "3", label: "Surfaces Shipped" },
    ],
  },
]

const personalProjects = [
  {
    title: "Manna",
    description:
      "A private, distraction-free space for Christians to pour out what they're carrying and receive a single Scripture verse in response.",
    imgSrc: "/images/manna-banner.png",
    imgFit: "cover",
    thumbBg: "#FFFCF5",
    skills: ["React Native", "Expo", "TypeScript", "Supabase", "Claude AI"],
    stats: [
      { num: "1", label: "Verse / Session" },
      { num: "0", label: "Notifications" },
    ],
    appStoreUrl: process.env.NEXT_PUBLIC_MANNA_IOS_URL,
    playStoreUrl: process.env.NEXT_PUBLIC_MANNA_ANDROID_URL,
  },
  {
    title: "Blundr",
    description:
      "A chess coach that runs my last 20 Chess.com games through Stockfish and turns the patterns in my mistakes into a short study plan.",
    link: "/blog/building-blundr-to-improve-my-chess",
    linkText: "Read the story",
    imgSrc: "/images/blundr.png",
    imgFit: "cover",
    thumbBg: "#EEF2E8",
    skills: [
      "Python",
      "FastAPI",
      "Stockfish",
      "React",
      "TypeScript",
      "python-chess",
    ],
    stats: [
      { num: "20", label: "Games Per Report" },
      { num: "4", label: "Skills Scored" },
    ],
  },
]

const moreProjects = [
  {
    title: "CODERS Database",
    description:
      "A centralized database and API for Canadian energy system modelling and research.",
    tech: "Python, Flask, MySQL, REST",
    link: process.env.NEXT_PUBLIC_CODERS_URL,
    linkText: "Read about it",
  },
  {
    title: "Rock-Paper-Scissors",
    description:
      "Play rock-paper-scissors against your computer using your webcam.",
    tech: "Python, React, TensorFlow, Redis",
    link: process.env.NEXT_PUBLIC_RPS_URL,
    linkText: "View",
  },
]

export const Projects = forwardRef((props, ref) => {
  useEffect(() => {
    const container = ref.current
    if (!container) return
    if (prefersReducedMotion()) return

    gsap.fromTo(
      container,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.4,
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
        },
      },
    )
  }, [ref])

  return (
    <Container ref={ref}>
      <WaveBackground />
      <SectionHeading
        title="Featured Work"
        subtitle="Platforms I've helped build for clients, and the things I build for myself"
      />
      <Group aria-labelledby="client-work">
        <GroupLabel id="client-work">Client Work</GroupLabel>
        <ProjectRow>
          {clientProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </ProjectRow>
      </Group>
      <Group aria-labelledby="personal-projects">
        <GroupLabel id="personal-projects">Personal Projects</GroupLabel>
        <ProjectRow>
          {personalProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </ProjectRow>
      </Group>
      <Group aria-labelledby="more-projects">
        <GroupLabel id="more-projects">More Projects</GroupLabel>
        <MoreList>
          {moreProjects.map((project) => (
            <MoreItem key={project.title}>
              <MoreTitle>{project.title}</MoreTitle>
              <MoreDescription>
                {project.description}
                <MoreTech>{project.tech}</MoreTech>
              </MoreDescription>
              {project.link && (
                <MoreLink
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.linkText}: ${project.title}`}
                >
                  {project.linkText} &rarr;
                </MoreLink>
              )}
            </MoreItem>
          ))}
        </MoreList>
      </Group>
    </Container>
  )
})

Projects.displayName = "Projects"
