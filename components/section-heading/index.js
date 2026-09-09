"use client"
import { forwardRef } from "react"
import styled from "@emotion/styled"
import { breakpoints, radius, elevation } from "@/styles/theme"

/* Every section headline was its own copy of the same gradient sticker, each
   tilted a different way. One plate, one tilt, no gradient — and it shares its
   material with the base markers, so headings and bases read as the same kind
   of object laid on the field. */
const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const Plate = styled.div`
  display: inline-block;
  padding: ${({ small }) => (small ? "0.35rem 1.5rem" : "0.5rem 2rem")};
  transform: rotate(-1.25deg);
  border-radius: ${radius.sm};
  background-color: ${({ theme }) => theme.surfaceRaised};
  border: 1px solid ${({ theme }) => theme.lineStrong};
  box-shadow: ${elevation.low};
  color: ${({ theme }) => theme.chalk};
`

const Title = styled.h2`
  font-size: ${({ small }) => (small ? "1.875rem" : "2.75rem")};
  font-weight: 600;
  line-height: 1.15;
  text-align: center;

  ${breakpoints.mobile} {
    font-size: ${({ small }) => (small ? "1.5rem" : "2rem")};
  }
`

const Subtitle = styled.p`
  font-size: 1.0625rem;
  line-height: 1.6;
  max-width: 38rem;
  color: ${({ theme }) => theme.textMuted};
  margin-top: 1.125rem;
  text-align: center;

  ${breakpoints.mobile} {
    font-size: 1rem;
  }
`

export const SectionHeading = forwardRef(
  ({ title, subtitle, as = "h2", small = false, className }, ref) => (
    <Wrapper className={className} ref={ref}>
      <Plate small={small}>
        <Title as={as} small={small}>
          {title}
        </Title>
      </Plate>
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </Wrapper>
  ),
)

SectionHeading.displayName = "SectionHeading"
