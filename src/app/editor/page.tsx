'use client';

import React from 'react';
import { CiText } from 'react-icons/ci';
import { DeviceFrameset } from 'react-device-frameset';
import 'react-device-frameset/styles/marvel-devices.min.css';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: 'none',
    padding: '1rem',
    margin: '0 0 1px 0',
    ...draggableStyle,
  });

  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
              <Droppable droppableId='items' isDropDisabled={true}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    className='grid grid-cols-2 gap-4 mt-2 text-white/80'
                  >
                    {elements.map((element, index) => (
                      <Draggable
                        key={element.id}
                        draggableId={element.id}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <>
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                              className='!p-0 transition-none'
                            >
                              <div
                                key={element.id}
                                className='p-4 rounded border border-white/20 flex flex-col items-center gap-2 hover:bg-white/10 transition-all'
                              >
                                <CiText size={30} />
                                <p className='text-xs'>Heading {index} </p>
                              </div>
                            </div>

                            {snapshot.isDragging && (
                              <div
                                key={element.id}
                                className='p-4 rounded border border-white/20 flex flex-col items-center gap-2 hover:bg-white/10 transition-all'
                              >
                                <CiText size={30} />
                                <p className='text-xs'>Heading</p>
                              </div>
                            )}
                          </>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </aside>

          <div className='flex-1 p-4 flex items-center justify-center text-black'>
            <DeviceFrameset device='iPhone X' color='gold' zoom={0.75}>
              <div className='h-[30px]'></div>
              <div className='h-[30px]'>Hello world</div>
              <Droppable droppableId='elements' isDropDisabled={true}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={'Kiosk h-[300px]'}
                  >
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DeviceFrameset>
          </div>

          <aside className='p-4 w-[300px] border-l border-slate-800 bg-[#1f2124]'>
            Right sidebar
          </aside>
        </main>
      </div>
    </DragDropContext>
  );
};

export default Editor;
