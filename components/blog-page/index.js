"use client"
import Link from "next/link"
import styled from "@emotion/styled"
import { PostList } from "@/components/post-list"
import { breakpoints, container, duskWash } from "@/styles/theme"

const Page = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100svh;
  /* same low sun as the hero, so the whole site is lit once from one place */
  background-color: ${({ theme }) => theme.background};
  background-image: ${duskWash};
  padding-block: 3rem 5rem;
`

const Inner = styled.div`
  ${container};
  display: flex;
  flex-direction: column;
`

const BackLink = styled(Link)`
  align-self: flex-start;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.textSubtle};

  &:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`

/* The archive size is real information on an index page, and it is the one
   line that has to change as the shelf fills up. */
const Count = styled.div`
  font-family: var(--font-bebas), sans-serif;
  font-size: 1.125rem;
  letter-spacing: 0.22em;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.bronze};
  margin-top: 2.5rem;
`

const Title = styled.h1`
  font-size: 3.25rem;
  font-weight: 600;
  line-height: 1.1;
  color: ${({ theme }) => theme.foreground};
  margin-top: 0.5rem;

  ${breakpoints.mobile} {
    font-size: 2.25rem;
  }
`

const Subtitle = styled.p`
  font-size: 1.125rem;
  max-width: 44rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.textMuted};
  margin-top: 0.75rem;

  ${breakpoints.mobile} {
    font-size: 1rem;
  }
`

const Posts = styled.div`
  margin-top: 3rem;
`

const Empty = styled.p`
  margin-top: 3rem;
  color: ${({ theme }) => theme.textMuted};
`

export const BlogPage = ({ posts = [] }) => (
  <Page>
    <Inner>
      <BackLink href="/">&larr; Back home</BackLink>
      {posts.length > 0 && (
        <Count>
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </Count>
      )}
      <Title>Writing</Title>
      <Subtitle>
        Long-form notes on the things I build — what worked, what I deleted, and
        the lessons that only show up after shipping.
      </Subtitle>
      {posts.length === 0 ? (
        <Empty>Nothing published yet. First post is in the works.</Empty>
      ) : (
        <Posts>
          <PostList posts={posts} />
        </Posts>
      )}
    </Inner>
  </Page>
)
