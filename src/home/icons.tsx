import type { ReactNode } from 'react';

const Icon = ({ children }: { children: ReactNode }) => (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    {children}
  </svg>
);

export const ArrowIcon = () => (
  <Icon>
    <path d="M7 4l6 6-6 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </Icon>
);

export const SearchIcon = () => (
  <Icon>
    <path d="M14 14l4 4M8.5 15a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13z" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
  </Icon>
);

export const GridIcon = () => (
  <Icon>
    <path d="M3 3h6v6H3zM11 3h6v6h-6zM3 11h6v6H3zM11 11h6v6h-6z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
  </Icon>
);

export const SparkIcon = () => (
  <Icon>
    <path d="M10 2l1.7 5.2L17 9l-5.3 1.8L10 16l-1.7-5.2L3 9l5.3-1.8L10 2z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.8" />
  </Icon>
);

export const LayersIcon = () => (
  <Icon>
    <path d="M10 2.5 17 6l-7 3.5L3 6l7-3.5zM4.5 9l5.5 2.75L15.5 9M4.5 12l5.5 2.75L15.5 12" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" />
  </Icon>
);
