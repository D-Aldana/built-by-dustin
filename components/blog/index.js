"use client"
import { forwardRef, useEffect } from "react"
import Link from "next/link"
import styled from "@emotion/styled"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { PostList } from "@/components/post-list"
import { breakpoints, container } from "@/styles/theme"
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

/* Matches the sticker headings the other sections use, so the blog reads as
   part of the page instead of a bolted-on feed. */
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  color: ${({ theme }) => theme.primaryText};
  opacity: 0.8;
  text-align: center;
  letter-spacing: 0.025rem;

  ${breakpoints.mobile} {
    font-size: 1rem;
    letter-spacing: 0.015rem;
  }
`

const Posts = styled.div`
  width: 100%;
  padding-block: 2rem;
`

const AllPostsLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 1.25rem;
  border: 1px solid ${({ theme }) => theme.oliveText};
  padding: 0.5rem 2rem;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.oliveText};
  transition:
    background-color 0.3s ease,
    color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.muted};
    color: ${({ theme }) => theme.cream};
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
      <Header>
        <StickerContainer>
          <StickerText>From the Notebook</StickerText>
        </StickerContainer>
        <Subtitle>
          Notes on what I&apos;m building, breaking, and rethinking
        </Subtitle>
      </Header>
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
