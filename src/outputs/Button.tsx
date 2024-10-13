'use client';

import { DroppedElement } from '@/utils/types';
import React from 'react';

type Props = {
  element: DroppedElement;
};

const Button: React.FC<Props> = ({ element }) => {
  return (
    <div className={element.secClasses || ''}>
      <a
        href={element.data.btn_link.link}
        target={element.data.btn_link.openInNew ? '_blank' : '_self'}
        className={element.elClasses || ''}
      >
        {element?.data?.btn_text || 'Button Text'}
      </a>
    </div>
  );
};

export default Button;
