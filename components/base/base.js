import { forwardRef } from "react"
import styled from "@emotion/styled"
import { breakpoints, radius, elevation } from "@/styles/theme"

/* Scrolling the page is a trip around the bases: home plate opens the hero,
   these mark first, second and third, and home plate closes above the footer.
   Chalk outline rather than a filled block, so the marker reads as a line laid
   on the field instead of a sticker dropped on top of it. */
const Diamond = styled.div`
  width: 3.25rem;
  height: 3.25rem;
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(45deg);
  border-radius: ${radius.sm};
  background-color: ${({ theme }) => theme.surfaceRaised};
  border: 2px solid ${({ theme }) => theme.lineStrong};
  box-shadow: ${elevation.low};

  /* On narrow screens it sits in the flow above the section heading, where it
     cannot collide with the centred title. */
  position: relative;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;

  ${breakpoints.desktop} {
    position: absolute;
    top: 2rem;
    right: 3rem;
    z-index: 2;
    width: 4.25rem;
    height: 4.25rem;
    margin: 0;
  }
`

const Title = styled.span`
  transform: rotate(-45deg);
  font-family: var(--font-bebas), sans-serif;
  font-size: 0.9375rem;
  letter-spacing: 0.12em;
  color: ${({ theme }) => theme.bronze};
  text-align: center;

  ${breakpoints.desktop} {
    font-size: 1.125rem;
  }
`

export const Base = forwardRef(({ title }, ref) => {
  return (
    <Diamond ref={ref} aria-hidden>
      <Title>{title}</Title>
    </Diamond>
  )
})
Base.displayName = "Base"
