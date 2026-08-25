import { forwardRef, useEffect, useRef } from "react"
import styled from "@emotion/styled"
import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTheme } from "@emotion/react"
import { Base } from "@/components/base"
import {
  EducationIcon,
  WorkIcon,
  BaseballIcon,
  TreesIcon,
  BulbIcon,
  CalendarIcon,
  InputIcon,
} from "@/components/icons"
import { SpotlightCard } from "@/components/spotlight-card"
import { breakpoints, container } from "@/styles/theme"

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin)

const Container = styled.div`
  ${container};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2rem 0 1rem;
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
  transform: rotate(2deg);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25);
  color: ${({ theme }) => theme.cream};
`

const StickerText = styled.h2`
  font-size: 3.25rem;
  font-weight: 600;
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

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
  margin-top: 1rem;
  min-height: 400px;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    background: ${({ theme }) => theme.olive};
    opacity: 0.6;
  }
`

const TimelineItem = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 3rem 0;
  gap: 6rem;
  flex-direction: ${(props) => (props.reverse ? "row-reverse" : "row")};
  ${breakpoints.mobile} {
    flex-direction: column-reverse;
    gap: 2rem;
    align-items: center;
  }
`

const TimelineOuterCircle = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background: ${({ theme }) => theme.forest};
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.olive};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

const TimelineInnerCircle = styled.div`
  width: 20px;
  height: 20px;
  background: ${({ theme }) => theme.bronze};
  border-radius: 50%;
  box-shadow: 0 0 10px ${({ theme }) => theme.bronze};
  animation: pulse 1s ease-in-out infinite;
  @keyframes pulse {
    0%,
    100% {
      box-shadow: 0 0 10px ${({ theme }) => theme.bronze};
    }
    50% {
      box-shadow: 0 0 20px ${({ theme }) => theme.bronze};
    }
  }
`

const TimelineCard = styled(SpotlightCard)`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.cardForeground};
  width: 100%;
  border: 4px solid ${({ theme }) => `${theme.bronze}40`};
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
  transition:
    box-shadow 0.3s ease,
    border 0.3s ease;
  &:hover {
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.3);
    border: 4px solid ${({ theme }) => `${theme.bronze}70`};
  }
  ${breakpoints.mobile} {
    width: 100%;
    transform: translateY(50px);
  }
`

const TimelineHeaderWrapper = styled.div`
  display: flex;
  gap: 1rem;
`
const TimelineHeaderIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => `${theme.bronze}30`};
  color: ${({ theme }) => theme.bronze};
  height: 3rem;
  width: 3rem;
  border-radius: 8px;
`
const TimelineHeaderTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const TimelineType = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.bronze};
  margin-bottom: 0.25rem;
`
const TimelineTitle = styled.p`
  font-size: 1.125rem;
  font-weight: 600;
`
const TimelineCompany = styled.p`
  font-size: 0.875rem;
`
const TimelineDescription = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  color: ${({ theme }) => theme.primaryColor};
  list-style-type: disc;
  font-size: 0.875rem;
  gap: 0.25rem;
`

const TimelineDateWrapper = styled.div`
  width: 100%;
  text-align: ${(props) => (props.reverse ? "right" : "left")};
  margin-top: 0.4rem;
  position: relative;

  ${breakpoints.mobile} {
    text-align: center;
    transform: translateY(48px);
  }
`
const TimelineDate = styled.span`
  padding: 0.4rem 0.75rem;
  background: linear-gradient(
    to left,
    ${({ theme }) => theme.bronze},
    ${({ theme }) => theme.bronzeLight}
  );
  border-radius: 1rem;
  color: ${({ theme }) => theme.forest};
  font-weight: 600;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.3);
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => `${theme.primaryColor}50`};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;

  ${breakpoints.mobile} {
    visibility: hidden;
  }
`

export const Timeline = forwardRef((props, ref) => {
  const theme = useTheme()
  const baseRef = useRef(null)
  const headerRef = useRef(null)
  const cardRefs = useRef([])
  const dateRefs = useRef([])

  const items = [
    {
      type: "Work",
      title: "Full-Stack Software Developer",
      company: "Input Logic",
      date: "Oct 2024 - Aug 2026",
      icon: WorkIcon,
      bigIcon: InputIcon,
      desc: [
        "Shipped features end-to-end across 6+ client products with Django/DRF, Next.js/React, and Expo/React Native, embedded with each client's team",
        "Coffee & Contracts: built an Instagram analytics suite, content calendar, tiered membership billing, and a page builder for real estate agents",
        "CareMobi & Aliviado (NYU Nursing): built mobile and web health-logging tools, care-team invites and role-based access, biometric login, and tiered entitlements",
        "Six: built the mobile app, web dashboard, and API from zero, including engagement analytics, team hierarchies, and PostHog product analytics",
        "Input Cowork: implemented Stripe billing for subscriptions, day passes, card management, and invoicing",
        "Leveraged an AI agent platform (Harbour) to automate Jira ticket triage and implementation via chained agents wired into Slack, cutting time from ticket to first draft",
      ],
    },
    {
      type: "Work",
      title: "Software Engineer",
      company: "Celayix Software",
      date: "May 2022 - Aug 2023",
      icon: WorkIcon,
      bigIcon: CalendarIcon,
      desc: [
        "Led the automated testing team in the implementation of an automated test suite using Selenium",
        "Built a CI/CD pipeline for quicker feedback on code deployments using PyTest parallelization and TeamCity",
        "Wrote technical documentation for the entire test suite and test planning",
      ],
    },
    {
      type: "Work",
      title: "Research Assistant",
      company: "Institute for Integrated Energy Systems (IESVic)",
      date: "Jan 2021 - Aug 2021",
      icon: WorkIcon,
      bigIcon: BulbIcon,
      desc: [
        "Designed and built a robust SQL database for the Canadian energy systems grid",
        "Launched a containerized Flask REST API on UVic cloud computing services",
        "Developed dynamic data visualizations using Python Bokeh",
        "Had work documented and published in Energy Systems Review Volume 44",
      ],
    },
    {
      type: "Education",
      title: "Bachelor of Software Engineering",
      company: "University of Victoria",
      date: "Sep 2019 - Aug 2023",
      icon: EducationIcon,
      bigIcon: TreesIcon,
      desc: [
        "Completed 4 semesters of full-time co-op placements",
        "Gained hands-on experience in software development fundamentals, system design, and teamwork",
        "Survived through countless group projects, assignments, and exams",
      ],
    },
    {
      type: "Education",
      title: "Fundamentals of Engineering Certificate",
      company: "Vancouver Island University",
      date: "Sep 2017 - Apr 2019",
      icon: EducationIcon,
      bigIcon: BaseballIcon,
      desc: [
        "Completed first computer science course and discovered a strong passion for programming",
        "Led a team whose design project won the student popularity award in engineering",
        "Balanced varsity baseball with school",
      ],
    },
  ]

  useEffect(() => {
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

        cardRefs.current.forEach((card, index) => {
          if (card) {
            gsap.from(card, {
              y: isDesktop ? 0 : 20,
              x: isDesktop ? (index % 2 === 0 ? -100 : 100) : 0,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            })
          }
        })

        dateRefs.current.forEach((date, index) => {
          if (date) {
            gsap.from(date, {
              y: isDesktop ? 0 : 20,
              x: isDesktop ? (index % 2 === 0 ? 100 : -100) : 0,
              opacity: 0,
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: date,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            })
          }
        })
      },
    )

    return () => mm.revert()
  }, [])

  return (
    <Container ref={ref}>
      <Base title="3RD" ref={baseRef} />
      <Header ref={headerRef}>
        <StickerContainer>
          <StickerText>My Journey</StickerText>
        </StickerContainer>
        <Subtitle>
          A timeline of my experiences and milestones throughout my career
        </Subtitle>
      </Header>
      <TimelineContainer>
        {items.map((item, i) => (
          <TimelineItem key={i} reverse={i % 2 === 1}>
            <TimelineCard ref={(el) => (cardRefs.current[i] = el)}>
              <TimelineHeaderWrapper>
                <TimelineHeaderIconWrapper>
                  <item.icon />
                </TimelineHeaderIconWrapper>
                <TimelineHeaderTextWrapper>
                  <TimelineType>{item.type}</TimelineType>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineCompany>{item.company}</TimelineCompany>
                </TimelineHeaderTextWrapper>
              </TimelineHeaderWrapper>
              <TimelineDescription>
                {item.desc.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </TimelineDescription>
            </TimelineCard>
            <TimelineOuterCircle>
              <TimelineInnerCircle />
            </TimelineOuterCircle>
            <TimelineDateWrapper
              reverse={i % 2 === 1}
              ref={(el) => (dateRefs.current[i] = el)}
            >
              <TimelineDate>{item.date}</TimelineDate>
              {item.bigIcon && (
                <IconWrapper>
                  <item.bigIcon
                    height={180}
                    width={180}
                    color={`${theme.olive}40`}
                  />
                </IconWrapper>
              )}
            </TimelineDateWrapper>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </Container>
  )
})

Timeline.displayName = "Timeline"
