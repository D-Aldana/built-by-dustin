import { forwardRef, useRef, useImperativeHandle } from "react"
import "./spotlight-card.css"

export const SpotlightCard = forwardRef(
  (
    { children, className = "", spotlightColor = "rgba(221, 161, 94, 0.1)" },
    ref,
  ) => {
    const divRef = useRef(null)

    useImperativeHandle(ref, () => divRef.current)

    const handleMouseMove = (e) => {
      const rect = divRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      divRef.current.style.setProperty("--mouse-x", `${x}px`)
      divRef.current.style.setProperty("--mouse-y", `${y}px`)
      divRef.current.style.setProperty("--spotlight-color", spotlightColor)
    }

    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        className={`card-spotlight ${className}`}
      >
        {children}
      </div>
    )
  },
)
SpotlightCard.displayName = "SpotlightCard"
export default SpotlightCard
