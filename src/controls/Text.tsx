'use client';

import React, { useState } from 'react';

type Props = {
  placeholder: string;
  data: string;
  onChange: (data: string) => void;
};

const Text: React.FC<Props> = ({ placeholder, data, onChange }) => {
  const [val, setVal] = useState<string>(data);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVal(e.target.value);
    onChange(e.target.value);
  };

  return (
    <textarea
      placeholder={placeholder}
      rows={4}
      className='px-2 py-1.5 rounded border border-white/15 bg-transparent focus:border-white/50 focus:outline-none'
      value={val}
      onChange={handleChange}
    />
  );
};

export default Text;
