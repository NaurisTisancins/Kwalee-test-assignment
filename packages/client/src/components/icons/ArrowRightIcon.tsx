import React, { FC } from 'react';

interface Props {
  color?: string;
  width?: string;
  height?: string;
}

export const ArrowRightIcon: FC<Props> = ({
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
        d='M10.6667 8L6.88798 4L5.99999 4.94L8.88438 8L5.99999 11.06L6.88798 12L10.6667 8Z'
        fill={color}
      />
    </svg>
  );
};
