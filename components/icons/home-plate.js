import { forwardRef, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin"

gsap.registerPlugin(DrawSVGPlugin)

export const HomePlateIcon = forwardRef(
  ({ width = 150, height = 150 }, ref) => {
    const plateRef = useRef(null)

    const plateTimeline = gsap.timeline({ defaults: { ease: "power2.inOut" } })
    const onClickPlate = () => {
      plateTimeline.to(plateRef.current, { rotationY: "+=720", duration: 0.75 })
    }

    useEffect(() => {
      if (!plateRef.current) return

      const currentPlateRef = plateRef.current
      const paths = currentPlateRef.querySelectorAll("path")
      gsap.fromTo(
        paths,
        { drawSVG: "0% 40%" },
        {
          drawSVG: "100% 140%",
          duration: 2,
          ease: "linear",
          repeat: -1,
        },
      )

      const handleMouseEnter = () => {
        gsap.to(currentPlateRef, {
          scale: 1.25,
          duration: 0.75,
          ease: "power2.out",
        })
      }
      const handleMouseLeave = () => {
        gsap.to(currentPlateRef, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
        })
      }

      currentPlateRef.addEventListener("mouseenter", handleMouseEnter)
      currentPlateRef.addEventListener("mouseleave", handleMouseLeave)

      return () => {
        currentPlateRef.removeEventListener("mouseenter", handleMouseEnter)
        currentPlateRef.removeEventListener("mouseleave", handleMouseLeave)
      }
    }, [])

    return (
      <svg
        ref={plateRef}
        width={width}
        height={height}
        viewBox="0 0 100.9 89.757706"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        onClick={onClickPlate}
      >
        <defs>
          <linearGradient id="linearGradient16">
            <stop
              style={{ stopColor: "#f0ddc7", stopOpacity: 1 }}
              offset="0.00165563"
            />
            <stop style={{ stopColor: "#fefae0", stopOpacity: 1 }} offset="1" />
          </linearGradient>

          <linearGradient id="swatch15">
            <stop
              style={{ stopColor: "currentColor", stopOpacity: 1 }}
              offset="0"
            />
          </linearGradient>

          <linearGradient
            href="#swatch15"
            id="linearGradient15"
            x1="53.799999"
            y1="159.63693"
            x2="156.2"
            y2="159.63693"
            gradientUnits="userSpaceOnUse"
          />

          <linearGradient
            href="#linearGradient16"
            id="linearGradient18"
            gradientUnits="userSpaceOnUse"
            x1="102.32563"
            y1="210.65355"
            x2="107.67437"
            y2="108.59356"
          />
        </defs>

        <g transform="translate(-54.55,-114.55001)">
          <path
            className="home-plate-path"
            style={{
              fill: "url(#linearGradient18)",
              fillRule: "evenodd",
              stroke: "url(#linearGradient15)",
              strokeWidth: 3,
              strokeLinecap: "round",
              strokeLinejoin: "bevel",
              strokeOpacity: 1,
              paintOrder: "stroke fill markers",
            }}
            d="M 55.000001,115 H 155 v 50 L 105,203.95271 55.000001,165 Z"
          />
        </g>
      </svg>
    )
  },
)

HomePlateIcon.displayName = "HomePlateIcon"
