"use client"
import Link from "next/link"
import styled from "@emotion/styled"
import { breakpoints } from "@/styles/theme"

const Card = styled(Link)`
  display: block;
  width: 100%;
  padding: 2.5rem 2.75rem 2.25rem;
  border: 2px solid ${({ theme }) => theme.olive};
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.forest};
  background-image: radial-gradient(
    130% 150% at 100% 0%,
    ${({ theme }) => `${theme.olive}40`} 0%,
    transparent 62%
  );
  transition:
    border-color 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;

  &:hover {
    border-color: ${({ theme }) => theme.bronze};
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.4);
    transform: translateY(-3px);
  }

  /* no component selectors: @emotion/babel-plugin isn't wired up here */
  &:hover [data-read-more] {
    text-decoration: underline;
    text-underline-offset: 4px;
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

  ${breakpoints.mobile} {
    padding: 1.75rem 1.5rem;
  }
`

/* The eyebrow's rule runs to the card edge so the headline reads as the start
   of a column rather than a centered banner. */
const Eyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-family: var(--font-bebas), sans-serif;
  font-size: 1rem;
  letter-spacing: 0.22em;
  color: ${({ theme }) => theme.bronze};

  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => `${theme.bronze}55`};
  }
`

/* Headline and excerpt run as two columns so the feature uses the full measure
   instead of leaving the right half of the card empty. */
const Head = styled.div`
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: 2.5rem;
  margin-top: 1.5rem;

  ${breakpoints.mobile} {
    grid-template-columns: 1fr;
    gap: 1rem;
    margin-top: 1.25rem;
  }
`

const Title = styled.h3`
  font-size: 2.75rem;
  line-height: 1.08;
  color: ${({ theme }) => theme.cream};
  text-wrap: balance;

  ${breakpoints.mobile} {
    font-size: 2rem;
  }
`

const Excerpt = styled.p`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 1.0625rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.primaryText};
  opacity: 0.85;
  /* optical: drops the excerpt onto the headline's first baseline */
  margin-top: 0.4rem;

  ${breakpoints.mobile} {
    font-size: 1rem;
    margin-top: 0;
  }
`

/* Reads like the stat line on the back of a baseball card: labelled cells
   divided by hairlines, values in condensed caps with tabular figures. */
const StatLine = styled.div`
  display: grid;
  grid-template-columns: max-content max-content 1fr;
  border-top: 1px solid ${({ theme }) => `${theme.bronze}55`};
  margin-top: 2.5rem;
  padding-top: 1rem;

  ${breakpoints.mobile} {
    grid-template-columns: 1fr 1fr;
  }
`

const Stat = styled.div`
  padding-right: 1.75rem;

  ${({ $divider, theme }) =>
    $divider &&
    `
      border-left: 1px solid ${theme.bronze}55;
      padding-left: 1.75rem;
    `}

  ${breakpoints.mobile} {
    padding-right: 1rem;

    ${({ $divider }) => $divider && `padding-left: 1rem;`}

    /* the tag cell needs the full measure once the grid drops to two columns */
    ${({ $wide, theme }) =>
      $wide &&
      `
        grid-column: 1 / -1;
        border-left: none;
        border-top: 1px solid ${theme.bronze}55;
        margin-top: 0.85rem;
        padding-left: 0;
        padding-top: 0.85rem;
      `}
  }
`

const StatLabel = styled.div`
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.oliveText};
`

const StatValue = styled.div`
  font-family: var(--font-bebas), sans-serif;
  font-size: 1.5rem;
  line-height: 1.2;
  letter-spacing: 0.05em;
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.cream};
  margin-top: 0.2rem;
`

const ReadMore = styled.span`
  display: inline-block;
  font-family: var(--font-montserrat), sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.bronze};
  margin-top: 1.5rem;
`

export const FeaturedPost = ({ post, eyebrow = "Latest" }) => {
  const stats = [
    post.date && {
      label: "Published",
      value: <time dateTime={post.date}>{post.dateLabelShort}</time>,
    },
    { label: "Read time", value: `${post.readingTimeMinutes} min` },
    post.tags.length > 0 && {
      label: "Filed under",
      value: post.tags.join(" \u00b7 "),
      wide: true,
    },
  ].filter(Boolean)

  return (
    <Card href={`/blog/${post.slug}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Head>
        <Title>{post.title}</Title>
        <div>
          <Excerpt>{post.excerpt}</Excerpt>
          <ReadMore data-read-more>Read the post &rarr;</ReadMore>
        </div>
      </Head>
      <StatLine>
        {stats.map((stat, i) => (
          <Stat key={stat.label} $divider={i > 0} $wide={stat.wide}>
            <StatLabel>{stat.label}</StatLabel>
            <StatValue>{stat.value}</StatValue>
          </Stat>
        ))}
      </StatLine>
    </Card>
  )
}
