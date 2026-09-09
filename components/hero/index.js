import Link from "next/link"
import { useState } from "react"
import styled from "@emotion/styled"
import { useTheme } from "@emotion/react"
import { motion } from "framer-motion"
import {
  HomePlateIcon,
  EnvelopeIcon,
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  ChevronDownIcon,
  BookIcon,
} from "@/components/icons"
import { RotatingText as BaseRotatingText } from "@/components/rotating-text"
import { breakpoints, radius, elevation, duskWash } from "@/styles/theme"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100svh;
  position: relative;
  background-color: ${({ theme }) => theme.background};
  background-image: ${duskWash};
  color: ${({ theme }) => theme.primaryText};
`

const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 1.5rem;
  margin: 0 4.5rem;
  width: 100%;
  gap: 1.25rem;

  ${breakpoints.mobile} {
    margin: 0;
  }
`

const FlippedIconWrapper = styled.div`
  transform: scaleY(-1);
  cursor: pointer;
  margin-bottom: 0.25rem;

  ${breakpoints.mobile} {
    margin-top: 0.5rem;
  }
`

const Name = styled.h1`
  font-size: 4.5rem;
  font-weight: 600;
  line-height: 1.05;
  text-align: center;
  color: ${({ theme }) => theme.foreground};

  ${breakpoints.mobile} {
    font-size: 2.75rem;
  }
`

/* The one bright element on the page: chalk on the dirt, the way a line is
   laid down on a field. Section headings echo it in a quieter key. */
const StickerContainer = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.cream};
  padding: 0.6rem 2rem 0.5rem;
  margin-bottom: 1.5rem;
  transform: rotate(-1.25deg);
  border-radius: ${radius.sm};
  box-shadow: ${elevation.mid};
  color: ${({ theme }) => theme.forest};
`

const StickerText = styled.p`
  font-family: var(--font-bebas) !important;
  font-size: 1.85rem;
  letter-spacing: 0.16em;

  ${breakpoints.mobile} {
    font-size: 1.5rem;
  }
`

const Caption = styled.p`
  font-size: 1.1875rem;
  font-weight: 400;
  line-height: 1.7;
  max-width: 40rem;
  text-align: center;
  padding: 0 1.5rem;
  color: ${({ theme }) => theme.textMuted};

  ${breakpoints.mobile} {
    font-size: 1.0625rem;
  }
`

const RotatingTextWrapper = styled(BaseRotatingText)`
  display: inline-block;
  font-weight: 600;
  color: ${({ theme }) => theme.bronze};
  vertical-align: baseline;
  width: 7ch;
`

const CTAContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`

/* Bronze is the page's only accent, so it marks the one action worth taking
   first. Everything beside it is an outline. */
const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: ${radius.pill};
  border: 1px solid
    ${({ theme, primary }) => (primary ? theme.bronze : theme.lineStrong)};
  padding: 0.55rem 1.75rem;
  background-color: ${({ theme, primary }) =>
    primary ? theme.bronze : "transparent"};
  color: ${({ theme, primary }) => (primary ? theme.forest : theme.chalk)};
  font-weight: 600;
  cursor: pointer;
  box-shadow: ${({ primary }) => (primary ? elevation.low : "none")};
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease;

  &:hover {
    background-color: ${({ theme, primary }) =>
      primary ? theme.bronzeLight : theme.surface};
    border-color: ${({ theme }) => theme.bronze};
  }

  &:active {
    transform: translateY(1px);
  }

  svg {
    transform: translateY(-0.09rem);
  }
`

const ButtonText = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
`

const SocialsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  color: ${({ theme }) => theme.textSubtle};
  margin-top: 2.5rem;
`

const SocialLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    color: ${({ color }) => color};
  }
`

const ContinueButton = styled.button`
  margin-top: 1rem;
  cursor: pointer;
  padding: 1rem 4rem;
`

export const Hero = ({
  onContinue,
  onClickProjects,
  onClickBlog,
  onClickContact,
}) => {
  const theme = useTheme()
  const [envOpen, setEnvOpen] = useState(false)
  const [pageTurned, setPageTurned] = useState(false)

  return (
    <Container>
      <HeroContainer>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FlippedIconWrapper>
            <HomePlateIcon width={100} height={100} />
          </FlippedIconWrapper>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <Name>Dustin Aldana</Name>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <StickerContainer>
            <StickerText>FULL-STACK DEVELOPER</StickerText>
          </StickerContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          <Caption>
            Creating digital{" "}
            <RotatingTextWrapper
              texts={["solutions", "products", "odysseys"]}
              splitBy="characters"
              staggerFrom="last"
              initial={{ y: "-120%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.025}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={3000}
            />{" "}
            with a mix of logic, art, and a love for building cool stuff.
          </Caption>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <CTAContainer>
            <Button
              primary
              onMouseEnter={() => setEnvOpen(true)}
              onMouseLeave={() => setEnvOpen(false)}
              onClick={onClickContact}
            >
              <EnvelopeIcon width={20} height={20} open={envOpen} />
              <ButtonText>Get in Touch</ButtonText>
            </Button>
            <Button onClick={onClickProjects}>
              <ButtonText>View Projects</ButtonText>
            </Button>
            {/* the blog section unmounts when there are no posts, so the
                button only shows when there is somewhere to scroll to */}
            {onClickBlog && (
              <Button
                onMouseEnter={() => setPageTurned(true)}
                onMouseLeave={() => setPageTurned(false)}
                onFocus={() => setPageTurned(true)}
                onBlur={() => setPageTurned(false)}
                onClick={onClickBlog}
              >
                <BookIcon width={20} height={20} turnPage={pageTurned} />
                <ButtonText>Read the Blog</ButtonText>
              </Button>
            )}
          </CTAContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.5 }}
        >
          <SocialsContainer>
            <SocialLink
              href={process.env.NEXT_PUBLIC_GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              color={theme.github}
            >
              <GithubIcon width={32} height={32} delay={0.75} duration={1} />
            </SocialLink>
            <SocialLink
              href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              color={theme.linkedin}
            >
              <LinkedinIcon width={32} height={32} delay={0.75} duration={1} />
            </SocialLink>
            <SocialLink
              href={process.env.NEXT_PUBLIC_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              color={theme.instagram}
            >
              <InstagramIcon width={32} height={32} delay={0.75} duration={1} />
            </SocialLink>
          </SocialsContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.35 }}
        >
          <ContinueButton onClick={onContinue}>
            <ChevronDownIcon color={theme.textSubtle} width={32} height={32} />
          </ContinueButton>
        </motion.div>
      </HeroContainer>
    </Container>
  )
}
