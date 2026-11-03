"use client"
import Link from "next/link"
import styled from "@emotion/styled"
import { AppTheme } from "@/components/theme-provider"
import { HomePlateIcon } from "@/components/icons"
import { breakpoints, radius, elevation, duskWash } from "@/styles/theme"

const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100svh;
  text-align: center;
  padding: 2rem 1.5rem;
  gap: 1.25rem;
  background-color: ${({ theme }) => theme.background};
  background-image: ${duskWash};
  color: ${({ theme }) => theme.primaryText};
`

const StickerContainer = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => theme.cream};
  padding: 0.5rem 1.5rem;
  margin-top: 0.5rem;
  transform: rotate(-1.25deg);
  border-radius: ${radius.sm};
  box-shadow: ${elevation.mid};
  color: ${({ theme }) => theme.forest};
`

const StickerText = styled.p`
  font-family: var(--font-bebas) !important;
  font-size: 1.5rem;
  letter-spacing: 0.16em;
`

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.15;

  ${breakpoints.mobile} {
    font-size: 2rem;
  }
`

const Caption = styled.p`
  font-size: 1.0625rem;
  line-height: 1.7;
  max-width: 32rem;
  color: ${({ theme }) => theme.textMuted};
`

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  border-radius: ${radius.pill};
  border: 1px solid ${({ theme }) => theme.bronze};
  padding: 0.55rem 1.75rem;
  background-color: ${({ theme }) => theme.bronze};
  color: ${({ theme }) => theme.forest};
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: ${elevation.low};
  transition: background-color 0.25s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    background-color: ${({ theme }) => theme.bronzeLight};
  }
`

export default function NotFound() {
  return (
    <AppTheme>
      <Page id="main-content">
        <HomePlateIcon width={90} height={90} />
        <StickerContainer>
          <StickerText>FOUL BALL</StickerText>
        </StickerContainer>
        <Title>This page struck out</Title>
        <Caption>
          The page you&apos;re looking for doesn&apos;t exist, or it moved.
          Let&apos;s get you back to home plate.
        </Caption>
        <HomeLink href="/">Back to home</HomeLink>
      </Page>
    </AppTheme>
  )
}
