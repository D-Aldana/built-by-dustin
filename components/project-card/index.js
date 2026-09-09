import { forwardRef, useRef, useState, useEffect, useId } from "react"
import Image from "next/image"
import Link from "next/link"
import styled from "@emotion/styled"
import { gsap } from "gsap"
import { radius, elevation } from "@/styles/theme"
import { prefersReducedMotion } from "@/util/motion"

const CARD_HEIGHT = "460px"
const THUMB_HEIGHT = "160px"

const FlipCard = styled.div`
  perspective: 1400px;
  width: 100%;
  height: ${CARD_HEIGHT};

  &:hover [data-face],
  &:focus-within [data-face] {
    border-color: ${({ theme }) => theme.bronze};
    box-shadow: ${elevation.mid};
  }
`

const FlipInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`

const CardFace = styled.div`
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: ${radius.md};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease;
`

const CardFront = styled(CardFace)`
  background-color: ${({ theme }) => theme.surface};
`

/* The back used to flip from dark forest to a full bleed of bronze, which read
   as a flash. It is now one step up the same surface ladder, and the stat line
   below does the work of telling you the card turned over. */
const CardBack = styled(CardFace)`
  background-color: ${({ theme }) => theme.surfaceRaised};
  color: ${({ theme }) => theme.chalk};
  transform: rotateY(180deg);
  padding: 1.25rem;
  gap: 0.5rem;
`

/* The thumbnail is its own band now: no text sits on it, so the artwork no
   longer needs a scrim dimming it to two thirds. */
const Thumb = styled.div`
  position: relative;
  height: ${THUMB_HEIGHT};
  flex: none;
  background-color: ${({ theme, bg }) => bg || theme.surfaceRaised};
  border-bottom: 1px solid ${({ theme }) => theme.line};

  img {
    object-fit: ${({ fit }) => fit};
    object-position: center;
  }
`

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  padding: 1.15rem 1.15rem 1rem;
  gap: 0.6rem;
`

const Title = styled.h3`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.2;
  color: ${({ theme }) => theme.chalk};
  text-wrap: balance;
`

const DescriptionText = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.textMuted};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const SkillsList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  margin-top: auto;
  /* three pills plus a count fit one row at every card width, so reserving a
     single row keeps the actions on the same baseline across all cards. */
  min-height: 1.45rem;
`

const SkillPill = styled.span`
  background-color: ${({ theme }) => `${theme.bronze}1a`};
  border: 1px solid ${({ theme }) => `${theme.bronze}59`};
  color: ${({ theme }) => theme.bronze};
  padding: 0.1rem 0.45rem;
  border-radius: ${radius.sm};
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
`

/* Same metrics as a pill, but dashed and unfilled: clearly "more of these",
   not another technology. */
const SkillCount = styled(SkillPill)`
  background-color: transparent;
  border-style: dashed;
  color: ${({ theme }) => theme.textSubtle};
  border-color: ${({ theme }) => theme.lineStrong};
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding-top: 0.15rem;
  /* store badges are taller than a text link; reserving the taller height keeps
     the pill row on the same baseline whichever variant a card uses. */
  min-height: 2.375rem;
`

const PrimaryLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.bronze};
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    text-decoration-thickness: 2px;
  }
`

const ComingSoon = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textSubtle};
`

const DetailsButton = styled.button`
  flex: none;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  padding: 0.25rem 0.7rem;
  border-radius: ${radius.pill};
  cursor: pointer;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.lineStrong};
  color: ${({ theme }) => theme.textSubtle};
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.bronze};
    color: ${({ theme }) => theme.bronze};
  }
`

const StatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.75rem;
`

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: ${radius.sm};
  padding: 0.6rem 0.5rem;
`

const StatNumber = styled.span`
  font-family: var(--font-bebas), sans-serif;
  font-size: 1.6rem;
  letter-spacing: 0.03em;
  line-height: 1.1;
  color: ${({ theme }) => theme.bronze};
  font-variant-numeric: tabular-nums;
`

const StatLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.textSubtle};
  margin-top: 0.15rem;
  text-align: center;
  line-height: 1.3;
`

const TechText = styled.p`
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSubtle};
`

const BackSkills = styled(SkillsList)`
  margin-top: 0;
  align-content: flex-start;
  overflow: hidden;
`

const StoreBadges = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`

const StoreBadge = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
  opacity: 0.9;

  &:hover {
    transform: translateY(-2px);
    opacity: 1;
  }

  img {
    width: 2.25rem;
    height: 2.25rem;
    display: block;
  }
`

export const ProjectCard = forwardRef(
  (
    {
      title,
      description,
      link = null,
      linkText = "Learn more",
      appStoreUrl = null,
      playStoreUrl = null,
      imgSrc = null,
      imgFit = "contain",
      thumbBg = null,
      skills = [],
      stats = [],
    },
    ref,
  ) => {
    const innerRef = useRef(null)
    const [flipped, setFlipped] = useState(false)
    const backId = useId()

    useEffect(() => {
      const el = innerRef.current
      if (!el) return

      gsap.killTweensOf(el)

      if (prefersReducedMotion()) {
        gsap.set(el, { rotationY: flipped ? 180 : 0 })
        return
      }

      // slight overshoot, then settle
      const target = flipped ? 180 : 0
      const overshoot = flipped ? 195 : -15
      gsap
        .timeline()
        .to(el, { rotationY: overshoot, duration: 0.4, ease: "power2.out" })
        .to(el, { rotationY: target, duration: 0.45, ease: "power2.inOut" })
    }, [flipped])

    const renderLink = () => {
      if (appStoreUrl || playStoreUrl) {
        return (
          <StoreBadges>
            {appStoreUrl && (
              <StoreBadge
                href={appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} on the App Store`}
              >
                <Image
                  src="/images/app-store-icon.svg"
                  width={36}
                  height={36}
                  alt=""
                />
              </StoreBadge>
            )}
            {playStoreUrl && (
              <StoreBadge
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title} on Google Play`}
              >
                <Image
                  src="/images/google-play-icon.svg"
                  width={36}
                  height={36}
                  alt=""
                />
              </StoreBadge>
            )}
          </StoreBadges>
        )
      }
      if (link) {
        return (
          <PrimaryLink
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${linkText}: ${title}`}
          >
            {linkText} &rarr;
          </PrimaryLink>
        )
      }
      return <ComingSoon>Coming soon</ComingSoon>
    }

    const toggle = () => setFlipped((f) => !f)

    const detailsButton = (back) => (
      <DetailsButton
        type="button"
        onClick={toggle}
        aria-expanded={flipped}
        aria-controls={backId}
        aria-label={`${flipped ? "Hide" : "Show"} details for ${title}`}
      >
        {back ? "Back" : "Details"}
      </DetailsButton>
    )

    const shown = skills.slice(0, 3)
    const remaining = skills.length - shown.length

    return (
      <FlipCard ref={ref}>
        <FlipInner ref={innerRef}>
          {/* whichever face is turned away is removed from the tab order, so
              keyboard users never land on a link they cannot see. */}
          <CardFront
            data-face
            inert={flipped ? true : undefined}
            aria-hidden={flipped}
          >
            <Thumb fit={imgFit} bg={thumbBg}>
              {imgSrc && (
                <Image
                  src={imgSrc}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                  alt={`${title} project artwork`}
                />
              )}
            </Thumb>
            <Body>
              <Title>{title}</Title>
              <DescriptionText>{description}</DescriptionText>
              <SkillsList>
                {shown.map((skill) => (
                  <SkillPill key={skill}>{skill}</SkillPill>
                ))}
                {remaining > 0 && (
                  <SkillCount
                    aria-label={`${remaining} more technologies, shown on the back`}
                  >
                    +{remaining}
                  </SkillCount>
                )}
              </SkillsList>
              <Actions>
                {renderLink()}
                {detailsButton(false)}
              </Actions>
            </Body>
          </CardFront>

          <CardBack
            data-face
            id={backId}
            inert={flipped ? undefined : true}
            aria-hidden={!flipped}
          >
            <Title>{title}</Title>
            {stats.length > 0 && (
              <StatsContainer>
                {stats.map((stat) => (
                  <Stat key={stat.label}>
                    <StatNumber>{stat.num}</StatNumber>
                    <StatLabel>{stat.label}</StatLabel>
                  </Stat>
                ))}
              </StatsContainer>
            )}
            <TechText>Built with</TechText>
            <BackSkills>
              {skills.map((skill) => (
                <SkillPill key={skill}>{skill}</SkillPill>
              ))}
            </BackSkills>
            <Actions style={{ marginTop: "auto" }}>
              {renderLink()}
              {detailsButton(true)}
            </Actions>
          </CardBack>
        </FlipInner>
      </FlipCard>
    )
  },
)

ProjectCard.displayName = "ProjectCard"
