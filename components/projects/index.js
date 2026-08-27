import { forwardRef, useRef, useEffect } from "react"
import styled from "@emotion/styled"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ProjectCard } from "@/components/project-card"
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
  opacity: 0.3;
  z-index: 0;
`

const Header = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.foreground};
  text-align: center;
  letter-spacing: 0.125rem;
  ${breakpoints.mobile} {
    font-size: 2rem;
    letter-spacing: 0.075rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.primaryText};
  margin-top: 0.5rem;
  opacity: 0.8;
  text-align: center;
  letter-spacing: 0.025rem;

  ${breakpoints.mobile} {
    font-size: 1rem;
    letter-spacing: 0.015rem;
  }
`

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: stretch;
  gap: 2rem;
  padding-block: 2rem;
  width: 100%;

  ${breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

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
      <Header>Featured Work</Header>
      <Subtitle>
        A mix of fun projects I&apos;ve worked on and a few still in progress
      </Subtitle>
      <ProjectGrid>
        <ProjectCard
          title="Coffee & Contracts"
          description="A marketing platform for real estate agents, with AI-generated captions, Instagram analytics, and a content-strategy calendar."
          link={process.env.NEXT_PUBLIC_COFFEE_CONTRACTS_URL}
          imgSrc={"/images/c-c-logo-stacked-black.svg"}
          thumbBg="#FEFAE0"
          skills={[
            "Next.js",
            "React",
            "Django",
            "PostgreSQL",
            "Claude AI",
            "Stripe",
            "Instagram API",
          ]}
          stats={[
            { num: "10K+", label: "Agents" },
            { num: "AI", label: "Captions" },
          ]}
        />
        <ProjectCard
          title="CareMobi"
          description="A platform that connects patients, families, and healthcare professionals to make managing care easier and more human."
          link={process.env.NEXT_PUBLIC_CAREMOBI_URL}
          imgSrc={`/images/caremobi.svg`}
          skills={[
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
          ]}
          stats={[
            { num: "3K+", label: "Users" },
            { num: "4.9", label: "Rating" },
          ]}
        />
        <ProjectCard
          title="Six"
          description="A social recommendation app built on lists of exactly six favorites, shared privately or discovered on a map."
          link={process.env.NEXT_PUBLIC_SIX_URL}
          imgSrc={"/images/six.png"}
          skills={[
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
          ]}
          stats={[
            { num: "6", label: "Picks Per List" },
            { num: "3", label: "Surfaces Shipped" },
          ]}
        />
        <ProjectCard
          title="Manna"
          description="A private, distraction-free space for Christians to pour out what they're carrying and receive a single Scripture verse in response."
          imgSrc={"/images/manna.png"}
          skills={[
            "React Native",
            "Expo",
            "TypeScript",
            "Supabase",
            "Claude AI",
          ]}
          stats={[
            { num: "1", label: "Verse / Session" },
            { num: "0", label: "Notifications" },
          ]}
          appStoreUrl={process.env.NEXT_PUBLIC_MANNA_IOS_URL}
          playStoreUrl={process.env.NEXT_PUBLIC_MANNA_ANDROID_URL}
        />
        <ProjectCard
          title="CODERS Database"
          description="A centralized database and API for Canadian Energy System modelling and research."
          link={process.env.NEXT_PUBLIC_CODERS_URL}
          imgSrc={"/images/coders.jpg"}
          imgFit="cover"
          skills={[
            "Python",
            "REST",
            "SQL",
            "MySQL",
            "Flask",
            "Data Visualization",
          ]}
          stats={[
            { num: "> 2m", label: "Data Points" },
            { num: "99.9%", label: "Uptime" },
          ]}
          linkText="Read about it"
        />
        <ProjectCard
          title="Rock-Paper-Scissors"
          description="Don't have a friend to play rock-paper-scissors with? Play against your computer using your webcam."
          link={process.env.NEXT_PUBLIC_RPS_URL}
          imgSrc={"/images/rps.png"}
          skills={["Python", "React", "TensorFlow", "Redis"]}
          stats={[
            { num: "1", label: "Humans" },
            { num: "0", label: "Computers" },
          ]}
        />
      </ProjectGrid>
    </Container>
  )
})

Projects.displayName = "Projects"
