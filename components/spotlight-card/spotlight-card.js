import { forwardRef } from "react"

export const SpotlightCard = forwardRef(({ children, className = "" }, ref) => {
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
})
SpotlightCard.displayName = "SpotlightCard"
export default SpotlightCard
