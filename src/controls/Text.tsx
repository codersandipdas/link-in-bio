import React from 'react';

type Props = {
  placeholder: string;
};

const Text: React.FC<Props> = ({ placeholder }) => {
  return (
    <textarea
      placeholder={placeholder}
      rows={4}
      className='px-2 py-1.5 rounded border border-white/15 bg-transparent focus:border-white/50 focus:outline-none'
    />
  );
};

export default Text;
