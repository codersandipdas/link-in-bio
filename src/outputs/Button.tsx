'use client';

import { DroppedElement } from '@/utils/types';
import React from 'react';

type Props = {
  element: DroppedElement;
};

const Button: React.FC<Props> = ({ element }) => {
  return (
    <div className={element.secClasses || ''}>
      <button className={element.elClasses || ''}>
        {element?.data?.btn_text || 'Button Text'}
      </button>
    </div>
  );
};

export default Button;
