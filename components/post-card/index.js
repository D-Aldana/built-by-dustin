"use client"
import { forwardRef } from "react"
import Link from "next/link"
import styled from "@emotion/styled"
import { breakpoints } from "@/styles/theme"

/* styled(Component) forwards every prop, so the layout flag is filtered out
   before it reaches the anchor. */
const Card = styled(Link, {
  shouldForwardProp: (prop) => prop !== "$roomy",
})`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  height: 100%;
  padding: ${({ $roomy }) => ($roomy ? "1.75rem 2rem" : "1.25rem")};
  border: 2px solid ${({ theme }) => theme.olive};
  border-radius: 0.75rem;
  background-color: ${({ theme }) => theme.forest};
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.bronze};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
    transform: translateY(-3px);
  }

  /* no component selectors: @emotion/babel-plugin isn't wired up here */
  &:hover [data-read-more] {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.bronze};
    outline-offset: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &:hover {
      transform: none;
    }
  }
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.oliveText};
`

const Dot = styled.span`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: currentColor;
`

const Title = styled.h3`
  font-family: var(--font-montserrat), sans-serif;
  font-size: ${({ $roomy }) => ($roomy ? "1.45rem" : "1.25rem")};
  font-weight: 700;
  line-height: 1.25;
  color: ${({ theme }) => theme.cream};
  text-wrap: balance;

  ${breakpoints.mobile} {
    font-size: 1.15rem;
  }
`

const Excerpt = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.primaryText};
  opacity: 0.85;
  display: -webkit-box;
  -webkit-line-clamp: ${({ $roomy }) => ($roomy ? 4 : 3)};
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: auto;
  padding-top: 0.4rem;
`

const Tag = styled.span`
  background-color: ${({ theme }) => `${theme.bronze}1f`};
  border: 1px solid ${({ theme }) => `${theme.bronze}70`};
  color: ${({ theme }) => theme.bronze};
  padding: 0.1rem 0.45rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
`

const ReadMore = styled.span`
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme }) => theme.bronze};
`

const MAX_TAGS = 3

export const PostCard = forwardRef(({ post, roomy = false }, ref) => {
  const tags = post.tags.slice(0, MAX_TAGS)

  return (
    <Card ref={ref} href={`/blog/${post.slug}`} $roomy={roomy}>
      <Meta>
        {post.date && <time dateTime={post.date}>{post.dateLabel}</time>}
        <Dot aria-hidden />
        <span>{post.readingTimeMinutes} min read</span>
      </Meta>
      <Title $roomy={roomy}>{post.title}</Title>
      <Excerpt $roomy={roomy}>{post.excerpt}</Excerpt>
      <Tags>
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
      <ReadMore data-read-more>Read post &rarr;</ReadMore>
    </Card>
  )
})

PostCard.displayName = "PostCard"
