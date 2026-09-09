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
import { SectionHeading } from "@/components/section-heading"
import { breakpoints, container, radius, elevation } from "@/styles/theme"

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

const Header = styled(SectionHeading)`
  margin: 2rem 0 1rem;
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
    width: 1px;
    background-color: ${({ theme }) => theme.lineStrong};
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
  width: 26px;
  height: 26px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.lineStrong};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`

const TimelineInnerCircle = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ theme }) => theme.bronze};
  border-radius: 50%;
`

const TimelineCard = styled(SpotlightCard)`
  background-color: ${({ theme }) => theme.surface};
  color: ${({ theme }) => theme.cardForeground};
  width: 100%;
  border: 1px solid ${({ theme }) => theme.line};
  border-radius: ${radius.md};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: border-color 0.3s ease;
  &:hover {
    border-color: ${({ theme }) => theme.bronze};
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
  background-color: ${({ theme }) => `${theme.bronze}1a`};
  color: ${({ theme }) => theme.bronze};
  height: 2.75rem;
  width: 2.75rem;
  flex: none;
  border-radius: ${radius.sm};
`
const TimelineHeaderTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const TimelineType = styled.span`
  font-family: var(--font-bebas), sans-serif;
  font-size: 0.875rem;
  letter-spacing: 0.16em;
  color: ${({ theme }) => theme.bronze};
  margin-bottom: 0.25rem;
`
const TimelineTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.chalk};
`
const TimelineCompany = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.textMuted};
`
const TimelineDescription = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.25rem 0 0 1.15rem;
  color: ${({ theme }) => theme.textMuted};
  list-style-type: disc;
  font-size: 0.875rem;
  line-height: 1.65;
  gap: 0.5rem;

  li::marker {
    color: ${({ theme }) => theme.textSubtle};
  }
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
  display: inline-block;
  padding: 0.35rem 0.85rem;
  background-color: ${({ theme }) => theme.bronze};
  border-radius: ${radius.pill};
  color: ${({ theme }) => theme.forest};
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  box-shadow: ${elevation.low};
`

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
        "Coffee & Contracts: built the platform's Anthropic Claude integration — model routing, prompt caching, structured JSON output — powering an AI caption generator for agents; also shipped Instagram analytics, a content calendar, and tiered membership billing",
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
      <Header
        ref={headerRef}
        title="My Journey"
        subtitle="A timeline of my experiences and milestones throughout my career"
      />
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
                    color={theme.lineStrong}
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
