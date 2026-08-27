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
import { sendEmail } from "@/util/sendEmail"
import { breakpoints, container } from "@/styles/theme"
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  margin-top: 3rem;
  width: 100%;
`

const StickerContainer = styled.div`
  display: inline-block;
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.oliveSurface},
    ${({ theme }) => theme.forest}
  );
  padding: 0 2rem;
  margin-bottom: 1.5rem;
  transform: rotate(-1deg);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25);
  border: none;
  color: ${({ theme }) => theme.cream};
`

const StickerText = styled.h2`
  font-weight: 600;
  font-size: 3.25rem;
  letter-spacing: 0.15rem;

  ${breakpoints.mobile} {
    font-size: 2.25rem;
    letter-spacing: 0.1rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${({ theme }) => theme.primaryText};
  margin-top: 1.25rem;
  text-align: center;
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
  border: 4px solid ${({ theme }) => `${theme.bronze}40`};
  border-radius: 10px;
  padding: 2rem;
`

const FormLabel = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryText};
  margin-bottom: 0.5rem;
`

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 2px solid ${({ theme }) => `${theme.bronze}40`};
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.primaryText};
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.bronze};
    box-shadow: 0 0 5px ${({ theme }) => theme.bronze};
  }

  &::placeholder {
    color: ${({ theme }) => `${theme.primaryText}80`};
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
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  padding: 0 1.5rem;
  outline: none;
  border: none;
  cursor: pointer;
  margin-top: 1rem;

  background: linear-gradient(
    to right,
    ${({ theme }) => theme.bronze},
    ${({ theme }) => theme.bronzeLight}
  );
  color: ${({ theme }) => theme.forest};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: linear-gradient(
      to right,
      ${({ theme }) => theme.bronzeLight},
      ${({ theme }) => theme.bronze}
    );
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
    transform: translateY(2px);
  }
`

const DetailsHeader = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const Title = styled.p`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryText};
`

const SubtitleText = styled.p`
  color: ${({ theme }) => `${theme.primaryText}90`};
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

  border: 2px solid ${({ theme }) => `${theme.bronze}40`};
  border-radius: 10px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  transition:
    box-shadow 0.3s ease,
    border 0.3s ease;
  &:hover {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
    transition: box-shadow 0.3s ease;
  }
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => `${theme.bronze}30`};
  color: ${({ theme }) => theme.bronze};
  height: 3rem;
  width: 3rem;
  border-radius: 8px;
`

const ContactValue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.325rem;
`

const ContactLabel = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.primaryText};
`

const ContactInfo = styled.p`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.primaryText};
  margin-bottom: 0;
`

const AvailabilityBadge = styled(SpotlightCard)`
  width: 100%;
  background: radial-gradient(
    circle at 25% 25%,
    ${({ theme }) => theme.oliveSurface},
    ${({ theme }) => theme.forest}
  );
  color: ${({ theme }) => theme.cream};
  border: 2px solid ${({ theme }) => theme.olive};
  padding: 1rem;
  border-radius: 5px;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
`

const StatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.125rem;
`

const StatusLabel = styled.p`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.cream};
  opacity: 0.8;
`

const StatusText = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.cream};
`

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
`

const Indicator = styled.div`
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.bronze};
  margin-right: 0.5rem;
  box-shadow: 0 0 10px ${({ theme }) => theme.bronze};

  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 5px ${({ theme }) => theme.bronze};
    }
    50% {
      transform: scale(1.2);
      box-shadow: 0 0 15px ${({ theme }) => theme.bronze};
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 5px ${({ theme }) => theme.bronze};
    }
  }

  animation: pulse 2s infinite;
`

const IndicatorText = styled.p`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.cream};
`

const Footer = styled.footer`
  text-align: center;
  width: 100%;
  padding: 2rem;
  color: ${(props) => props.theme.primaryText};
  font-size: 1rem;
  font-weight: 600;
  border-top: 3px solid ${(props) => `${props.theme.bronze}40`};
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
      <Header ref={headerRef}>
        <StickerContainer>
          <StickerText>Contact Me</StickerText>
        </StickerContainer>
        <Subtitle>Ready to build something awesome? Let&apos;s chat!</Subtitle>
      </Header>
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
