import { forwardRef, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/util/motion"

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

const BLADE = "M12 9C10.9 6.6 11.3 3.6 12 2c.7 1.6 1.1 4.6 0 7z"

export const WindTurbineIcon = forwardRef((props, ref) => {
  const {
    color = "currentColor",
    width = 24,
    height = 24,
    duration = 2,
    delay = 0,
    spin = false,
  } = props

  const iconRef = useRef(null)
  const bladesRef = useRef(null)

  useEffect(() => {
    const element = iconRef.current
    if (!element) return

    gsap.fromTo(
      element.querySelectorAll("path, circle"),
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration: duration,
        ease: "power3.out",
        delay: delay,
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      },
    )
  }, [duration, delay])

  useEffect(() => {
    const element = iconRef.current
    const blades = bladesRef.current
    if (!spin || !element || !blades || prefersReducedMotion()) return

    const tween = gsap.to(blades, {
      rotation: 360,
      svgOrigin: "12 9",
      duration: 6,
      ease: "none",
      repeat: -1,
      delay: delay + duration,
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play pause resume pause",
      },
    })

    return () => tween.kill()
  }, [spin, delay, duration])

  return (
    <svg
      ref={iconRef}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 10.5V22" />
      <path d="M8.5 22h7" />
      <g ref={bladesRef}>
        <path d={BLADE} />
        <path d={BLADE} transform="rotate(120 12 9)" />
        <path d={BLADE} transform="rotate(240 12 9)" />
      </g>
      <circle cx="12" cy="9" r="1.5" />
    </svg>
  )
})

WindTurbineIcon.displayName = "WindTurbineIcon"
