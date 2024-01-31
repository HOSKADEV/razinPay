type IconProps = React.HTMLAttributes<SVGElement>;

export const Images = {
  heroBannerRight: (props: IconProps) => (
    <svg
      width="474"
      height="655"
      viewBox="0 0 474 655"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g style={{ mixBlendMode: "multiply" }}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M474 264.163C474 82.7827 340.906 -64.7651 176.821 -64.7651L177.034 -65L167.481 -64.7651C134.579 -63.5903 102.527 -59.3612 71.3229 -52.7827C29.5056 -43.8546 0 -4.14831 0 42.8414V45.4258C0 75.4992 11.0381 101.579 32.0529 120.609C53.0676 139.64 78.1155 146.689 104.862 141.05C126.938 136.351 149.651 133.297 173 132.592L177.034 132.357C242.625 132.357 295.905 191.329 295.905 263.928C295.905 334.883 245.172 392.68 181.704 395.499C80.2382 399.963 0 492.298 0 604.604V655H178.095V630.213C178.095 610.007 191.893 593.091 209.936 590.976C358.525 572.885 474 433.561 474 264.163Z"
          fill="#000066"
        />
      </g>
    </svg>
  ),
  heroBannerLeft: (props: IconProps) => (
    <svg
      width="495"
      height="496"
      viewBox="0 0 495 496"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g style={{ mixBlendMode: "soft-light" }}>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M397.956 0H396.451L397.204 0.405999H395.323C175.281 7.71382 0 202.183 0 439.687V496H193.712V439.687C193.712 314.642 285.866 212.739 400.965 209.491C453.248 207.867 495 161.584 495 104.745C495 46.6889 451.368 0 397.956 0Z"
          fill="url(#paint0_linear_1_824)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_1_824"
          x1="504.5"
          y1="23.5"
          x2="247.5"
          y2="496"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  ),
};
