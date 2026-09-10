import { forwardRef, useRef, useEffect } from "react"
import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger)

export const SparklesIcon = forwardRef((props, ref) => {
  const {
    color = "currentColor",
    width = 24,
    height = 24,
    duration = 2,
    delay = 0,
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
      className="lucide lucide-sparkles"
      aria-hidden="true"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
      <path d="M20 3v4"></path>
      <path d="M22 5h-4"></path>
      <path d="M4 17v2"></path>
      <path d="M6 18H4"></path>
    </svg>
  )
})

SparklesIcon.displayName = "SparklesIcon"
