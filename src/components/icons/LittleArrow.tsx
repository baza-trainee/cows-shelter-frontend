const LittleArrow = ({ hovered }: { hovered?: boolean }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1411_456)">
        <path
          d="M5 12H19"
          stroke={!hovered ? '#FDFDFF' : '#FEE41F'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 18L19 12"
          stroke={!hovered ? '#FDFDFF' : '#FEE41F'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13 6L19 12"
          stroke={!hovered ? '#FDFDFF' : '#FEE41F'}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1411_456">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LittleArrow;
