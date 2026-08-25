"use client"
import styled from "@emotion/styled"
import { FeaturedPost } from "@/components/featured-post"
import { PostCard } from "@/components/post-card"
import { breakpoints } from "@/styles/theme"

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
`

/* The card grid only fills its rows at certain counts, so the column count
   follows the number of posts instead of always reaching for three. */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${({ $columns }) => $columns}, 1fr);
  align-items: stretch;
  gap: 2rem;
  width: 100%;

  ${breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`

/* One post reads as an announcement, two as a pair, three as a row. Past that
   the newest post leads and the rest become the archive behind it. */
export const PostList = ({ posts = [] }) => {
  if (posts.length === 0) return null

  if (posts.length === 1) return <FeaturedPost post={posts[0]} />

  if (posts.length === 2) {
    return (
      <Grid $columns={2}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} roomy />
        ))}
      </Grid>
    )
  }

  if (posts.length === 3) {
    return (
      <Grid $columns={3}>
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </Grid>
    )
  }

  const [lead, ...rest] = posts

  return (
    <Stack>
      <FeaturedPost post={lead} />
      <Grid $columns={3}>
        {rest.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </Grid>
    </Stack>
  )
}
