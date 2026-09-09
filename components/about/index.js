import { forwardRef, useRef, useEffect } from "react"
import Image from "next/image"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { breakpoints, container, radius, elevation } from "@/styles/theme"
import { Base } from "@/components/base"
import { SectionHeading } from "@/components/section-heading"
import { SpotlightCard } from "@/components/spotlight-card"
import { ImageFolder } from "@/components/image-folder"
import { BeyondTheKeyboard } from "@/components/beyond-the-keyboard"
import { MyStory as myStoryContent } from "@/util/consts"
import { prefersReducedMotion } from "@/util/motion"

gsap.registerPlugin(ScrollTrigger)

const WaveBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
  opacity: 0.12;

  background-image:
    url("/images/wave.svg"), url("/images/wave.svg"), url("/images/wave.svg"),
    url("/images/wave.svg");

  background-repeat: repeat-x, repeat-x, repeat-x, repeat-x;

  background-size:
    300px auto,
    350px auto,
    300px auto,
    350px auto;

  background-position:
    0% 5%,
    0% 30%,
    0% 55%,
    0% 75%;
`

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

const Header = styled(SectionHeading)`
  margin-top: 2rem;
  margin-bottom: 1rem;
`

const ContentGrid = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  column-gap: 3rem;
  row-gap: 1.5rem;
  grid-template-columns: 1fr 1fr;
  padding: 2rem;

  grid-template-rows: repeat(7, 1fr);

  color: ${({ theme }) => theme.primaryText};

  grid-template-areas:
    "photo myStory"
    "photo myStory"
    "photo myStory"
    "photo myStory"
    "photo myStory"
    "photo myStory"
    "photo funFacts"
    "stats funFacts"
    "stats funFacts";

  ${breakpoints.mobile} {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "photo"
      "myStory"
      "stats"
      "funFacts";
    height: auto;
    padding: 0.25rem;
  }
`

const ImageContainer = styled.div`
  grid-area: photo;
  width: 100%;
  height: 650px;
  position: relative;
  border-radius: ${radius.lg};
  padding: 5px;
  background-color: ${({ theme }) => theme.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.lineStrong};
  box-shadow: ${elevation.mid};
  z-index: 1;
`

const AccentRule = styled.div`
  width: 2.25rem;
  height: 2px;
  border-radius: ${radius.pill};
  background-color: ${({ theme }) => theme.bronze};
`

const CardTitle = styled.h3`
  font-size: ${(props) => (props.small ? "1.25rem" : "1.4rem")};
  font-weight: 600;
`

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
`

const MyStory = styled(SpotlightCard)`
  grid-area: myStory;
  border-radius: ${radius.lg};
  border: 1px solid ${({ theme }) => theme.line};
  background-color: ${({ theme }) => theme.surface};
  padding: 2rem;
`

const StoryText = styled.div`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.75;
  color: ${({ theme }) => theme.primaryText};
`

const StatsContainer = styled(SpotlightCard)`
  grid-area: stats;
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: ${radius.lg};
  padding: 2rem;
  color: ${({ theme }) => theme.chalk};
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  ${breakpoints.mobile} {
    grid-template-columns: 1fr;
  }
`

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.surfaceRaised};
  padding: 0.75rem 0.5rem;
  border-radius: ${radius.md};
  border: 1px solid ${({ theme }) => theme.line};
  transition: border-color 0.3s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.bronze};
  }
`

const StatNumber = styled.p`
  font-family: var(--font-bebas), sans-serif;
  font-size: 2.25rem;
  line-height: 1.1;
  letter-spacing: 0.03em;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.bronze};
`

const StatDesc = styled.p`
  font-size: 0.9375rem;
  text-align: center;
  color: ${({ theme }) => theme.textMuted};
`

const FunFacts = styled(SpotlightCard)`
  grid-area: funFacts;
  border-radius: ${radius.lg};
  border: 1px solid ${({ theme }) => theme.line};
  background-color: ${({ theme }) => theme.surface};
  padding: 2rem;
  display: flex;
  flex-direction: column;
`

const FactsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${breakpoints.mobile} {
    grid-template-columns: 1fr;
  }
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0.75rem;
  flex: 1;
`

const FactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: ${radius.sm};
  background-color: ${({ theme }) => theme.surfaceRaised};
  height: 100%;
  padding: 0.75rem;
`

const FactText = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.textMuted};
`

const FolderContainer = styled(ImageFolder)`
  position: absolute;
  bottom: -1rem;
  right: -1rem;
  z-index: 2;

  ${breakpoints.mobile} {
    right: 1.5rem;
  }
`

export const About = forwardRef((props, ref) => {
  const theme = useTheme()

  const baseRef = useRef(null)
  const headerRef = useRef(null)
  const photoRef = useRef(null)
  const statsRef = useRef(null)
  const storyRef = useRef(null)
  const factsRef = useRef(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1024px)",
      },
      (context) => {
        const { isDesktop, isMobile } = context.conditions

        if (baseRef.current) {
          gsap.from(baseRef.current, {
            x: isDesktop ? 50 : 20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: baseRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          })
        }

        if (headerRef.current) {
          gsap.from(headerRef.current, {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          })
        }

        if (photoRef.current) {
          gsap.from(photoRef.current, {
            x: isDesktop ? -100 : 0,
            y: isDesktop ? 0 : 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: photoRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          })
        }

        if (storyRef.current) {
          gsap.from(storyRef.current, {
            x: isDesktop ? 100 : 0,
            y: isDesktop ? 0 : 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: storyRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          })
        }

        if (statsRef.current) {
          gsap.from(statsRef.current, {
            y: isDesktop ? 0 : 20,
            x: isDesktop ? -100 : 0,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          })
        }

        if (factsRef.current) {
          gsap.from(factsRef.current, {
            y: isDesktop ? 0 : 20,
            x: isDesktop ? 100 : 0,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: factsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          })
        }
      },
    )

    return () => mm.revert() // cleanup
  }, [])

  return (
    <Container ref={ref}>
      <WaveBackground />
      <Base title="1ST" ref={baseRef} />
      <Header
        ref={headerRef}
        title="About Me"
        subtitle="Beyond the code: who I am when I'm not building applications"
      />
      <ContentGrid>
        <ImageContainer ref={photoRef}>
          <Image
            src="/images/hiking.jpg"
            alt="Dustin outdoors with a hiking pack, forested hills behind him"
            fill
            sizes="(max-width: 1024px) 100vw, 560px"
            style={{
              objectFit: "cover",
              objectPosition: "top",
              padding: "5px",
              borderRadius: "1.5rem",
            }}
          />
          <FolderContainer
            color={theme.bronze}
            size={1}
            items={[
              "/images/europe.jpg",
              "/images/potato.jpg",
              "/images/baseball.jpg",
            ]}
            title="dustin.zip"
          />
        </ImageContainer>
        <MyStory ref={storyRef}>
          <CardHeader>
            <AccentRule />
            <CardTitle>My Story</CardTitle>
          </CardHeader>
          <StoryText>{myStoryContent.content}</StoryText>
        </MyStory>

        <StatsContainer ref={statsRef}>
          <CardHeader>
            <AccentRule />
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <StatsGrid>
            <Stat>
              <StatNumber>4+</StatNumber>
              <StatDesc>Years of coding 💻</StatDesc>
            </Stat>
            <Stat>
              <StatNumber>6</StatNumber>
              <StatDesc>Apps live in production 🚀</StatDesc>
            </Stat>
            <Stat>
              <StatNumber>32</StatNumber>
              <StatDesc>Estimated open tabs 🧠</StatDesc>
            </Stat>
            <Stat>
              <StatNumber>0</StatNumber>
              <StatDesc>Merge conflicts (this week) 😅</StatDesc>
            </Stat>
          </StatsGrid>
        </StatsContainer>
        <FunFacts ref={factsRef}>
          <CardHeader>
            <AccentRule />
            <CardTitle small>Fun Facts</CardTitle>
          </CardHeader>
          <FactsGrid>
            <FactItem>
              ⚾<FactText>Have 7 career home runs</FactText>
            </FactItem>
            <FactItem>
              ✈️<FactText>Visited 10 countries</FactText>
            </FactItem>
            <FactItem>
              🎥
              <FactText>
                Have a YouTube video with over 1.8 million views
              </FactText>
            </FactItem>
            <FactItem>
              🌎
              <FactText>
                Know every country, its flag, and where it is on the map
              </FactText>
            </FactItem>
            <FactItem>
              🪂
              <FactText>Skydived at 13,000 feet in Bologna, Italy</FactText>
            </FactItem>
            <FactItem>
              🎷
              <FactText>
                Played saxophone at a famous jazz club in Havana, Cuba
              </FactText>
            </FactItem>
          </FactsGrid>
        </FunFacts>
      </ContentGrid>
      <BeyondTheKeyboard />
    </Container>
  )
})

About.displayName = "About"
