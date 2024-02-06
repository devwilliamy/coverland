type ReviewPercentCircleProps = {
  percent: string;
};

export function ReviewPercentCircle({ percent }: ReviewPercentCircleProps) {
  return (
    <div className="relative z-10  h-[75px] w-[75px] lg:h-[135px] lg:w-[135px]">
      <svg
        width="137"
        height="135"
        viewBox="0 0 137 135"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 h-[75px] w-[75px] lg:h-[135px] lg:w-[135px]"
      >
        <path
          d="M136.039 67.2705C136.039 104.449 105.898 134.617 68.6023 134.926C31.063 135.236 0.128084 104.846 0.000385799 67.5047C-0.0913973 40.1034 16.2021 16.4612 39.6906 5.75157C43.4657 4.02881 47.9112 6.00164 49.2001 9.93143C50.2935 13.2698 48.7173 16.9137 45.5088 18.3745C27.0285 26.8017 14.1549 45.2876 13.9634 66.7863C13.7 96.2239 37.6394 120.616 67.2295 121.037C97.4421 121.47 122.08 97.2321 122.08 67.2705C122.08 39.6549 101.149 16.9058 74.213 13.8493C70.6853 13.4484 68.0236 10.4832 68.0236 6.95432C68.0236 2.84194 71.6032 -0.417001 75.7135 0.0434587C109.657 3.84225 136.043 32.4939 136.043 67.2745L136.039 67.2705Z"
          fill="#1D8044"
        />
      </svg>
      <p className="absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2 transform text-2xl font-black text-green-700 lg:text-4xl">
        {percent}
      </p>
    </div>
  );
}
