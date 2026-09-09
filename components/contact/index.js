import { forwardRef, useRef, useEffect, useState } from "react"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { useTheme } from "@emotion/react"
import { useForm } from "react-hook-form"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SpotlightCard } from "@/components/spotlight-card"
import {
  HomePlateIcon,
  ContactEnvelope,
  LocationIcon,
  AirplaneIcon,
} from "@/components/icons"
import { SectionHeading } from "@/components/section-heading"
import { sendEmail } from "@/util/sendEmail"
import { breakpoints, container, radius, elevation } from "@/styles/theme"
import { prefersReducedMotion } from "@/util/motion"

gsap.registerPlugin(ScrollTrigger)

const Container = styled.div`
  ${container};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-block: 1rem;
  gap: 1rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
`

const Header = styled(SectionHeading)`
  margin-top: 3rem;
  margin-bottom: 1rem;
`

const ContactContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
  gap: 6rem;

  ${breakpoints.mobile} {
    flex-direction: column;
    gap: 2rem;
  }
`

const ContactDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.5rem;
`

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: ${radius.md};
  padding: 2rem;
`

const FormLabel = styled.label`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSubtle};
  margin-bottom: 0.5rem;
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.6rem 0.75rem;
  background-color: ${({ theme }) => theme.background};
  border: 1px solid ${({ theme }) => theme.lineStrong};
  border-radius: ${radius.sm};
  font-family: var(--font-montserrat), sans-serif;
  font-size: 1rem;
  margin-bottom: 1.25rem;
  color: ${({ theme }) => theme.chalk};
  transition: border-color 0.2s ease;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.bronze};
  }

  &::placeholder {
    color: ${({ theme }) => theme.textSubtle};
  }
`

export const SubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  white-space: nowrap;
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.2s ease;
  height: 2.75rem;
  width: 100%;
  border-radius: ${radius.pill};
  padding: 0 1.5rem;
  outline: none;
  border: none;
  cursor: pointer;
  margin-top: 0.5rem;

  background-color: ${({ theme }) => theme.bronze};
  color: ${({ theme }) => theme.forest};
  box-shadow: ${elevation.low};

  &:hover {
    background-color: ${({ theme }) => theme.bronzeLight};
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 3px
      ${({ theme }) => theme.ring || "rgba(255,255,255,0.4)"};
  }

  &:active {
    transform: translateY(1px);
  }
`

const DetailsHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Title = styled.h3`
  font-size: 1.375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.chalk};
`

const SubtitleText = styled.p`
  line-height: 1.7;
  color: ${({ theme }) => theme.textMuted};
`

const ContactCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
  justify-content: space-around;
`

const ContactCard = styled(SpotlightCard)`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;

  background-color: ${({ theme }) => theme.surface};
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: ${radius.md};
  transition: border-color 0.3s ease;
  &:hover {
    border-color: ${({ theme }) => theme.bronze};
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => `${theme.bronze}1a`};
  color: ${({ theme }) => theme.bronze};
  height: 2.75rem;
  width: 2.75rem;
  flex: none;
  border-radius: ${radius.sm};
`

const ContactValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.325rem;
`

const ContactLabel = styled.p`
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSubtle};
`

const ContactInfo = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.chalk};
`

const AvailabilityBadge = styled(SpotlightCard)`
  width: 100%;
  background-color: ${({ theme }) => theme.surfaceRaised};
  color: ${({ theme }) => theme.chalk};
  border: 1px solid ${({ theme }) => theme.line};
  border-left: 3px solid ${({ theme }) => theme.bronze};
  padding: 1.125rem 1.25rem;
  border-radius: ${radius.md};
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.125rem;
`

const StatusLabel = styled.p`
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.textSubtle};
`

const StatusText = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.chalk};
`

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
`

/* The one thing on the page that is genuinely live, so it is the one thing
   that moves on its own. */
const Indicator = styled.div`
  height: 0.5rem;
  width: 0.5rem;
  flex: none;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.bronze};
  margin-right: 0.5rem;

  @keyframes availabilityPulse {
    0%,
    100% {
      opacity: 0.45;
    }
    50% {
      opacity: 1;
    }
  }

  animation: availabilityPulse 2.4s ease-in-out infinite;
`

const IndicatorText = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ theme }) => theme.textMuted};
`

const Footer = styled.footer`
  text-align: center;
  width: 100%;
  padding: 2rem;
  color: ${({ theme }) => theme.textSubtle};
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.875rem;
  border-top: 1px solid ${({ theme }) => theme.line};
  margin-top: 2rem;
`

export const ContactMe = forwardRef((props, ref) => {
  const theme = useTheme()
  const headerRef = useRef(null)
  const leftSideRef = useRef(null)
  const rightSideRef = useRef(null)
  const baseRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isMobile: "(max-width: 1023px)",
      },
      (context) => {
        const { isDesktop } = context.conditions

        if (headerRef.current) {
          gsap.from(headerRef.current, {
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
          })
        }

        if (leftSideRef.current) {
          gsap.from(leftSideRef.current, {
            scrollTrigger: {
              trigger: leftSideRef.current,
              start: "top 80%",
            },
            opacity: 0,
            x: isDesktop ? -100 : 0,
            y: isDesktop ? 0 : 20,
            duration: 0.6,
            ease: "power3.out",
          })
        }

        if (rightSideRef.current) {
          gsap.from(rightSideRef.current, {
            scrollTrigger: {
              trigger: rightSideRef.current,
              start: "top 80%",
            },
            opacity: 0,
            x: isDesktop ? 100 : 0,
            y: isDesktop ? 0 : 20,
            duration: 0.6,
            ease: "power3.out",
          })
        }

        if (baseRef.current) {
          gsap.from(baseRef.current, {
            scrollTrigger: {
              trigger: baseRef.current,
              start: "top 80%",
            },
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
          })
        }
      },
    )

    return () => {
      mm.revert()
    }
  }, [])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      await sendEmail(data)
      reset()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container ref={ref}>
      <Header
        ref={headerRef}
        title="Contact Me"
        subtitle="Ready to build something awesome? Let's chat!"
      />
      <ContactContent>
        <ContactDetails ref={leftSideRef}>
          <DetailsHeader>
            <Title>Get in Touch</Title>
            <SubtitleText>
              Whether you have a project in mind, want to collaborate, or just
              want to say hi, I&apos;d love to hear from you. Let&apos;s make
              something great together!
            </SubtitleText>
          </DetailsHeader>
          <ContactCards>
            <ContactCard>
              <IconWrapper>
                <ContactEnvelope color={theme.bronze} width={20} height={20} />
              </IconWrapper>
              <ContactValue>
                <ContactLabel>Email</ContactLabel>
                <ContactInfo>{process.env.NEXT_PUBLIC_EMAIL}</ContactInfo>
              </ContactValue>
            </ContactCard>
            <ContactCard>
              <IconWrapper>
                <LocationIcon color={theme.bronze} width={20} height={20} />
              </IconWrapper>
              <ContactValue>
                <ContactLabel>Location</ContactLabel>
                <ContactInfo>{process.env.NEXT_PUBLIC_LOCATION}</ContactInfo>
              </ContactValue>
            </ContactCard>
          </ContactCards>
          <AvailabilityBadge>
            <StatusWrapper>
              <StatusLabel>Availability Status</StatusLabel>
              <StatusText>Open for opportunities</StatusText>
            </StatusWrapper>
            <StatusIndicator>
              <Indicator />
              <IndicatorText>Available</IndicatorText>
            </StatusIndicator>
          </AvailabilityBadge>
        </ContactDetails>
        <ContactForm ref={rightSideRef} onSubmit={handleSubmit(onSubmit)}>
          <FormLabel htmlFor="name">Your Name</FormLabel>
          <FormInput
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
          />

          <FormLabel htmlFor="email">Email Address</FormLabel>
          <FormInput
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid",
              },
            })}
          />

          <FormLabel htmlFor="message">Message</FormLabel>
          <FormInput
            as="textarea"
            id="message"
            rows={4}
            placeholder="Your message here..."
            {...register("message", { required: "Message is required" })}
          />

          <SubmitButton type="submit" disabled={isSubmitting}>
            <AirplaneIcon width={18} height={18} />
            {isSubmitting ? "Sending..." : "Send Message"}
          </SubmitButton>
        </ContactForm>
      </ContactContent>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ cursor: "pointer" }}
      >
        <HomePlateIcon width={100} height={100} ref={baseRef} />
      </motion.div>

      <Footer>
        &copy; {new Date().getFullYear()} Dustin Aldana. All rights reserved.
      </Footer>
    </Container>
  )
})

ContactMe.displayName = "ContactMe"
