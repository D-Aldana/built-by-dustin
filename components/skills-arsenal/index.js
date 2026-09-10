import { forwardRef, useRef, useEffect } from "react"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Base } from "@/components/base"
import { SpotlightCard } from "@/components/spotlight-card"
import {
  FrontendIcon,
  BackendIcon,
  DesignIcon,
  RocketIcon,
  SparklesIcon,
} from "@/components/icons"
import { SectionHeading } from "@/components/section-heading"
import { breakpoints, container, radius } from "@/styles/theme"
import { prefersReducedMotion } from "@/util/motion"

gsap.registerPlugin(ScrollTrigger)

const Container = styled.div`
  ${container};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 1rem;
  position: relative;
  overflow: hidden;
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
  background-position: 0% 40%;
  opacity: 0.12;
  z-index: 0;
`

const Header = styled(SectionHeading)`
  margin-top: 3rem;
  margin-bottom: 1rem;
`

const SkillsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 2rem;
  width: 100%;

  /* three cards per row, with the last two centered underneath */
  > * {
    grid-column: span 2;
  }

  > *:nth-last-of-type(2) {
    grid-column: 2 / span 2;
  }

  ${breakpoints.mobile} {
    grid-template-columns: 1fr;
    gap: 1.5rem;

    > *,
    > *:nth-last-of-type(2) {
      grid-column: auto;
    }
  }
`

const SkillCard = styled(SpotlightCard)`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.5rem 1.25rem;
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: ${radius.md};
  gap: 0.75rem;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.bronze};
  }

  @media (prefers-reduced-motion: reduce) {
    &:hover {
      transform: none;
    }
  }
`

const SkillsTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.chalk};
  margin-top: 0.5rem;
`

const SkillsList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-wrap: wrap;
`

const SkillPill = styled.span`
  background-color: ${({ theme }) => `${theme.bronze}1a`};
  border: 1px solid ${({ theme }) => `${theme.bronze}59`};
  color: ${({ theme }) => theme.bronze};
  padding: 0.15rem 0.5rem;
  border-radius: ${radius.sm};
  font-size: 0.75rem;
  font-weight: 600;
`

export const SkillsArsenal = forwardRef((props, ref) => {
  const theme = useTheme()
  const baseRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!baseRef.current || !containerRef.current) return
    if (prefersReducedMotion()) return

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      },
    )
    gsap.fromTo(
      baseRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      },
    )
  }, [baseRef, containerRef])

  return (
    <Container ref={containerRef}>
      <WaveBackground />
      <Base title="2ND" ref={baseRef} />
      <Header
        title="Skills Arsenal"
        subtitle="A well-rounded toolkit for building modern web applications"
      />
      <SkillsGrid>
        <SkillCard>
          <FrontendIcon
            width={48}
            height={48}
            color={theme.rust}
            delay={0.15}
          />
          <SkillsTitle>Frontend</SkillsTitle>
          <SkillsList>
            <SkillPill>React</SkillPill>
            <SkillPill>React Native</SkillPill>
            <SkillPill>Next.js</SkillPill>
            <SkillPill>Expo</SkillPill>
            <SkillPill>Javascript/Typescript</SkillPill>
            <SkillPill>Tailwind CSS</SkillPill>
            <SkillPill>GSAP</SkillPill>
            <SkillPill>Framer Motion</SkillPill>
          </SkillsList>
        </SkillCard>
        <SkillCard>
          <BackendIcon width={48} height={48} color={theme.rust} delay={0.35} />
          <SkillsTitle>Backend</SkillsTitle>
          <SkillsList>
            <SkillPill>Python</SkillPill>
            <SkillPill>Django</SkillPill>
            <SkillPill>Django REST Framework</SkillPill>
            <SkillPill>Flask</SkillPill>
            <SkillPill>Node.js</SkillPill>
            <SkillPill>PostgreSQL</SkillPill>
            <SkillPill>Supabase</SkillPill>
            <SkillPill>MongoDB</SkillPill>
            <SkillPill>Express.js</SkillPill>
            <SkillPill>Redis</SkillPill>
          </SkillsList>
        </SkillCard>
        <SkillCard>
          <SparklesIcon
            width={48}
            height={48}
            color={theme.rust}
            delay={0.55}
          />
          <SkillsTitle>AI Tools</SkillsTitle>
          <SkillsList>
            <SkillPill>Claude API</SkillPill>
            <SkillPill>Claude Code</SkillPill>
            <SkillPill>Model Routing</SkillPill>
            <SkillPill>Prompt Caching</SkillPill>
            <SkillPill>Structured Outputs</SkillPill>
            <SkillPill>Agent Workflows</SkillPill>
          </SkillsList>
        </SkillCard>
        <SkillCard>
          <RocketIcon width={48} height={48} color={theme.rust} delay={0.75} />
          <SkillsTitle>Tools</SkillsTitle>
          <SkillsList>
            <SkillPill>Git</SkillPill>
            <SkillPill>Docker</SkillPill>
            <SkillPill>AWS S3</SkillPill>
            <SkillPill>Jira</SkillPill>
            <SkillPill>Heroku</SkillPill>
            <SkillPill>Stripe</SkillPill>
            <SkillPill>Vercel</SkillPill>
            <SkillPill>Posthog</SkillPill>
          </SkillsList>
        </SkillCard>
        <SkillCard>
          <DesignIcon width={48} height={48} color={theme.rust} delay={0.95} />
          <SkillsTitle>Design</SkillsTitle>
          <SkillsList>
            <SkillPill>Figma</SkillPill>
            <SkillPill>UI/UX</SkillPill>
            <SkillPill>Animation</SkillPill>
            <SkillPill>Responsive Design</SkillPill>
            <SkillPill>Accessibility</SkillPill>
          </SkillsList>
        </SkillCard>
      </SkillsGrid>
    </Container>
  )
})

SkillsArsenal.displayName = "SkillsArsenal"
