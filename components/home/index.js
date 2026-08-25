"use client"
import { useState, useRef, useEffect } from "react"
import { ThemeProvider } from "@emotion/react"
import { MotionConfig } from "framer-motion"
import styled from "@emotion/styled"
import { theme } from "@/styles/theme"
import { prefersReducedMotion } from "@/util/motion"
import {
  Hero,
  About,
  SkillsArsenal,
  Projects,
  Blog,
  Timeline,
  ContactMe,
} from "@/components"

const Main = styled.main`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.background};
  position: relative;
  padding-bottom: 1rem;
  position: relative;

  p {
    font-family: var(--font-montserrat);
  }
`

export const Home = ({ posts = [], totalPosts = 0 }) => {
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const projectsRef = useRef(null)
  const blogRef = useRef(null)
  const timelineRef = useRef(null)
  const contactRef = useRef(null)
  const [mounted, setMounted] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const currentTheme = isDarkMode ? theme.dark : theme.light

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const scrollTo = (sectionRef) => () => {
    sectionRef.current?.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
  }

  return (
    <ThemeProvider theme={currentTheme}>
      <MotionConfig reducedMotion="user">
        <Main>
          {/* <button
          style={{
            position: "fixed",
            top: "1rem",
            right: "1rem",
            zIndex: 1000,
            backgroundColor: currentTheme.bronze,
          }}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          Toggle Theme
        </button> */}
          <Hero
            onContinue={scrollTo(aboutRef)}
            onClickProjects={scrollTo(projectsRef)}
            onClickBlog={posts.length > 0 ? scrollTo(blogRef) : null}
            onClickContact={scrollTo(contactRef)}
          />
          <About ref={aboutRef} />
          <SkillsArsenal ref={skillsRef} />
          <Projects ref={projectsRef} />
          <Blog ref={blogRef} posts={posts} totalPosts={totalPosts} />
          <Timeline ref={timelineRef} />
          <ContactMe ref={contactRef} />
        </Main>
      </MotionConfig>
    </ThemeProvider>
  )
}
