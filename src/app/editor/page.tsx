import React from 'react';
import { CiText } from 'react-icons/ci';

const elements = [
  {
    id: '1',
  },
  {
    id: '2',
  },
  {
    id: '3',
  },
  {
    id: '4',
  },
  {
    id: '5',
  },
  {
    id: '6',
  },
  {
    id: '7',
  },
  {
    id: '8',
  },
];

const Editor = () => {
  return (
    <div className='h-screen flex flex-col overflow-hidden'>
      <header className='shrink-0 h-[60px] p-4 border-b border-slate-800'>
        Header
      </header>
      <main className='flex-1 flex overflow-hidden'>
        <aside className='w-[300px] shrink-0 border-r bg-[#1f2124] border-slate-800 overflow-x-hidden overflow-y-auto'>
          <div className='p-4'>
            <h2 className='font-semibold'>Elements</h2>
            <div className='font-semibold sticky top-0 bg-[#1f2124] py-3'>
              <input
                className='w-full rounded py-2 px-3 text-xs font-normal border border-white/15 focus:border-white focus:outline-none bg-transparent'
                placeholder='Search elements...'
              />
            </div>
            <div className='grid grid-cols-2 gap-4 mt-2 text-white/80'>
              {elements.map((element) => (
                <button
                  key={element.id}
                  className='p-4 rounded border border-white/20 flex flex-col items-center gap-2 hover:bg-white/10 transition-all'
                >
                  <CiText size={30} />
                  <p className='text-xs'>Heading</p>
                </button>
              ))}
              {elements.map((element) => (
                <button
                  key={element.id}
                  className='p-4 rounded border border-white/20 flex flex-col items-center gap-2 hover:bg-white/10 transition-all'
                >
                  <CiText size={30} />
                  <p className='text-xs'>Heading</p>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className='flex-1 p-4'>Editor</div>

        <aside className='p-4 w-[300px] border-l border-slate-800 bg-[#1f2124]'>
          Right sidebar
        </aside>
      </main>
    </div>
  );
};

export default Editor;
