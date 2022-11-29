import React, { FC } from 'react';

interface Props {
  color?: string;
  width?: string;
  height?: string;
}

export const ArrowLeftIcon: FC<Props> = ({
  color = '#212121',
  width = '100%',
  height = '100%',
}: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M5.33331 8L9.11199 12L9.99998 11.06L7.11559 8L9.99998 4.94L9.11199 4L5.33331 8Z'
        fill={color}
      />
    </svg>
  );
};
