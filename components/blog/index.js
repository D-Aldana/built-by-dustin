"use client"
import { forwardRef, useEffect } from "react"
import Link from "next/link"
import styled from "@emotion/styled"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PostList } from "@/components/post-list"
import { SectionHeading } from "@/components/section-heading"
import { container, radius } from "@/styles/theme"
import { prefersReducedMotion } from "@/util/motion"

gsap.registerPlugin(ScrollTrigger)

const Container = styled.div`
  ${container};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-block: 2rem;
  margin-top: 2rem;
  position: relative;
`

const Posts = styled.div`
  width: 100%;
  padding-block: 2rem;
`

const AllPostsLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: ${radius.pill};
  border: 1px solid ${({ theme }) => theme.lineStrong};
  padding: 0.55rem 1.75rem;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.chalk};
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease;

  &:hover {
    background-color: ${({ theme }) => theme.surface};
    border-color: ${({ theme }) => theme.bronze};
  }
`

export const Blog = forwardRef(({ posts = [], totalPosts = 0 }, ref) => {
  useEffect(() => {
    const el = ref?.current
    if (!el || prefersReducedMotion()) return

    gsap.fromTo(
      el,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 80%" },
      },
    )
  }, [ref])

  if (posts.length === 0) return null

  return (
    <Container ref={ref}>
      <SectionHeading
        title="From the Notebook"
        subtitle="Notes on what I'm building, breaking, and rethinking"
      />
      <Posts>
        <PostList posts={posts} />
      </Posts>
      {/* every post is already on this page until the archive holds more */}
      {totalPosts > posts.length && (
        <AllPostsLink href="/blog">
          Read all {totalPosts} posts &rarr;
        </AllPostsLink>
      )}
    </Container>
  )
})

Blog.displayName = "Blog"
