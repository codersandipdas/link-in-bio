'use client';

import { DroppedElement } from '@/utils/types';
import clsx from 'clsx';
import React from 'react';

type Props = {
  element: DroppedElement;
};

const Heading: React.FC<Props> = ({ element }) => {
  return (
    <h2 className={clsx(element.elClasses || '', element.secClasses || '')}>
      {element?.data?.heading || ''}
    </h2>
  );
};

export default Heading;
