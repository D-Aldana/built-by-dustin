import { forwardRef, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { prefersReducedMotion } from "@/util/motion"

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

export const RocketIcon = forwardRef((props, ref) => {
  const {
    color = "currentColor",
    width = 24,
    height = 24,
    duration = 2,
    delay = 0,
    fly = false,
  } = props

  const iconRef = useRef(null)

  useEffect(() => {
    const element = iconRef.current
    if (!element) return
    const paths = element.querySelectorAll("path")

    gsap.fromTo(
      paths,
      { drawSVG: "0%" },
      {
        drawSVG: "100%",
        duration: duration,
        ease: "power3.out",
        delay: delay,
        scrollTrigger: {
          trigger: iconRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      },
    )
  }, [duration, delay])

  useEffect(() => {
    const element = iconRef.current
    if (!fly || !element || prefersReducedMotion()) return

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 2,
      delay: delay + duration,
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play pause resume pause",
      },
    })

    tl.to(element, {
      x: 160,
      y: -160,
      opacity: 0,
      duration: 1.1,
      ease: "power2.in",
    })
      .set(element, { x: -160, y: 160 })
      .to(element, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: "power2.out",
      })

    return () => tl.kill()
  }, [fly, delay, duration])

  return (
    <svg
      ref={iconRef}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-rocket"
      aria-hidden="true"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
    </svg>
  )
})

RocketIcon.displayName = "RocketIcon"
