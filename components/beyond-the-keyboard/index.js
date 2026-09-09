import { useRef, useEffect } from "react"
import Link from "next/link"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  FryingPanIcon,
  BoxingGlovesIcon,
  GuitarIcon,
  PawnIcon,
  MountainIcon,
  BookIcon,
} from "@/components/icons"
import { SpotlightCard } from "@/components/spotlight-card"
import { SectionHeading } from "@/components/section-heading"
import { breakpoints, radius } from "@/styles/theme"
import { prefersReducedMotion } from "@/util/motion"

gsap.registerPlugin(ScrollTrigger)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-block: 2rem;
`

const HobbyGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;
  width: 100%;
  margin-top: 3rem;

  ${breakpoints.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`

const HobbyCard = styled(SpotlightCard)`
  display: flex;
  flex-direction: column;
  gap: 0.325rem;
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: ${radius.md};
  padding: 1.5rem 1.25rem;
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

const HobbyTitle = styled.h4`
  font-size: 1.1875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.chalk};
  margin-top: 0.5rem;
`

const HobbyDesc = styled.p`
  font-size: 0.875rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textMuted};
  margin-top: 0.25rem;
`

export const BeyondTheKeyboard = () => {
  const containerRef = useRef(null)
  const theme = useTheme()

  useEffect(() => {
    const element = containerRef.current
    if (!element) return
    if (prefersReducedMotion()) return

    gsap.fromTo(
      element,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
        },
      },
    )
  }, [])

  return (
    <Container ref={containerRef}>
      <SectionHeading
        as="h3"
        small
        title="Beyond The Keyboard"
        subtitle="Hobbies and interests that keep me balanced and inspired"
      />
      <HobbyGrid>
        <HobbyCard>
          <FryingPanIcon animate width={50} height={50} color={theme.rust} />
          <HobbyTitle>Cooking</HobbyTitle>
          <HobbyDesc>
            Trying out new dishes and techniques to challenge myself in the
            kitchen
          </HobbyDesc>
        </HobbyCard>
        <HobbyCard>
          <BoxingGlovesIcon
            animate
            width={50}
            height={50}
            color={theme.olive}
          />
          <HobbyTitle>Kickboxing</HobbyTitle>
          <HobbyDesc>
            Keeping me in shape while training amateur competition
          </HobbyDesc>
        </HobbyCard>
        <HobbyCard>
          <GuitarIcon animate width={50} height={50} color={theme.rust} />
          <HobbyTitle>Music</HobbyTitle>
          <HobbyDesc>
            Expressing myself and sharpening my skills through playing and
            composing music
          </HobbyDesc>
        </HobbyCard>
        <HobbyCard>
          <PawnIcon animate width={40} height={40} color={theme.olive} />
          <HobbyTitle>Chess</HobbyTitle>
          <HobbyDesc>
            Strategizing and improving my critical thinking one move at a time.
            <Link
              href={process.env.NEXT_PUBLIC_CHESS_URL}
              passHref
              style={{ marginLeft: "0.5rem", color: theme.bronze }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Let&apos;s play!
            </Link>
          </HobbyDesc>
        </HobbyCard>
        <HobbyCard>
          <MountainIcon animate width={50} height={50} color={theme.rust} />
          <HobbyTitle>Hiking</HobbyTitle>
          <HobbyDesc>
            Exploring trails and mountains to stay active, enjoy nature, and
            recharge my mind
          </HobbyDesc>
        </HobbyCard>
        <HobbyCard>
          <BookIcon animate width={50} height={50} color={theme.olive} />
          <HobbyTitle>Reading</HobbyTitle>
          <HobbyDesc>
            Expanding my perspective through non-fiction and escaping into
            fantasy worlds for fun
          </HobbyDesc>
        </HobbyCard>
      </HobbyGrid>
    </Container>
  )
}
