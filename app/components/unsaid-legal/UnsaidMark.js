export default function UnsaidMark({
  className,
  "aria-hidden": ariaHidden = true,
}) {
  return (
    <svg
      className={className}
      aria-hidden={ariaHidden}
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Unsaid symbol</title>
      <g transform="translate(-6 2.5)">
        <path
          fill="#416B59"
          d="M58,106 L58,132 A70 70 0 0 0 198,132 L198,88 A25.0 25.0 0 0 1 205.02,70.63 A15.00 15.00 0 0 0 183.44,49.79 A55.0 55.0 0 0 0 168,88 L168,132 A40 40 0 0 1 88,132 L88,106 A15.0 15.0 0 0 0 58,106 Z"
        />
        <path
          fill="#C68F70"
          d="M151.00,80.00 A21.00 21.00 0 1 0 109.00,80.00 A21.00 21.00 0 1 0 151.00,80.00 Z"
        />
      </g>
    </svg>
  )
}
