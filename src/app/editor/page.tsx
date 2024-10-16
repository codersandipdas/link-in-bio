'use client';

import React, { useEffect, useState } from 'react';
import { CiText } from 'react-icons/ci';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import DragHandle from '@/components/dragHandle/DragHandle';
import { v4 as uuid } from 'uuid';
import { TbSocial } from 'react-icons/tb';
import { PiCursorClick } from 'react-icons/pi';
import { IoImageOutline } from 'react-icons/io5';
import { BsTextLeft } from 'react-icons/bs';
import { RxVideo } from 'react-icons/rx';
import { DroppedElement, Element } from '@/utils/types';
import OutputElement from '@/components/outputElement/OutputElement';
import RightSidebar from '@/components/editor/RightSidebar';
import Image from 'next/image';
import { controlType } from '@/utils/enums';

const initialElements: Element[] = [
  {
    id: 'heading',
    title: 'Heading',
    icon: <CiText />,
    controls: [
      {
        id: 'heading',
        type: controlType.TEXT,
        placeholder: 'Enter heading',
        label: 'Heading',
        defaultValue: 'Type your heading here',
      },
      {
        id: 'link',
        type: controlType.LINK,
        placeholder: 'Paste URL or type',
        label: 'Link',
        defaultValue: { link: '', openInNew: true },
      },
    ],
    secClasses: 'px-3',
    elClasses: 'text-xl',
  },
  {
    id: 'button',
    title: 'Button',
    icon: <PiCursorClick />,
    controls: [
      {
        id: 'btn_text',
        type: controlType.TEXT,
        placeholder: 'Enter heading',
        label: 'Text',
        defaultValue: 'Button Text',
      },
      {
        id: 'btn_link',
        type: controlType.LINK,
        placeholder: 'Paste URL or type',
        label: 'Link',
        defaultValue: { link: '#', openInNew: true },
      },
    ],
    secClasses: 'px-3',
    elClasses:
      'text-sm bg-primary px-4 py-2.5 rounded text-white text-center inline-block w-full text-center',
  },
  {
    id: 'image',
    title: 'Image',
    icon: <IoImageOutline />,
    controls: [],
  },
  {
    id: 'socials',
    title: 'Socials',
    icon: <TbSocial />,
    controls: [],
  },
  {
    id: 'textEditor',
    title: 'Text Editor',
    icon: <BsTextLeft />,
    controls: [],
  },
  {
    id: 'video',
    title: 'Video',
    icon: <RxVideo />,
    controls: [],
  },
];

const queryAttr = 'data-rfd-draggable-id';

const Editor: React.FC = () => {
  const [droppedElements, setDroppedElements] = useState<DroppedElement[]>([]);
  const [placeholderProps, setPlaceholderProps] = useState<any>({});
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedElement, setSelectedElement] = useState<DroppedElement | null>(
    null
  );
  const [selectedWidget, setSelectedWidget] = useState<Element | null>(null);

  const onDragEnd = (result: any) => {
    setPlaceholderProps({});
    setIsDragging(false);

    if (!result.destination) return;

    if (result.source.droppableId === 'items') {
      const element: Element = initialElements.find(
        (el) => el.id === result.draggableId
      ) as Element;

      const data: any = {};
      for (const control of element?.controls || []) {
        data[control.id] = control.defaultValue;
      }

      const newElement: DroppedElement = {
        id: uuid(),
        elType: result.draggableId,
        controls: element.controls || [],
        secClasses: element.secClasses || '',
        elClasses: element.elClasses || '',
        data: data || {},
      };

      const updatedElements = [...droppedElements];
      updatedElements.splice(result.destination.index, 0, newElement);
      setDroppedElements(updatedElements);
      setSelectedElement(newElement);
    } else {
      const reorderedElements = [...droppedElements];
      const [movedElement] = reorderedElements.splice(result.source.index, 1);
      reorderedElements.splice(result.destination.index, 0, movedElement);
      setDroppedElements(reorderedElements);
    }
  };

  const onDragUpdate = (update: any) => {
    const element: DroppedElement = droppedElements.find(
      (el) => el.id === update.draggableId
    ) as DroppedElement;
    setSelectedElement(element);

    setIsDragging(true);

    if (!update.destination || update.source.droppableId === 'items') {
      return;
    }
    const draggableId = update.draggableId;
    const initialIndex = update.source.index;
    const destinationIndex = update.destination.index;

    const domQuery = `[${queryAttr}='${draggableId}']`;
    const draggedDOM: any = document.querySelector(domQuery);

    if (!draggedDOM) {
      return;
    }
    const { clientHeight, clientWidth } = draggedDOM;

    const arr = [...draggedDOM.parentNode.children];
    if (initialIndex < destinationIndex) {
      arr.splice(initialIndex, 1);
    }

    const clientY =
      parseFloat(window.getComputedStyle(draggedDOM.parentNode).paddingTop) +
      arr.slice(0, destinationIndex).reduce((total, curr) => {
        const style = curr.currentStyle || window.getComputedStyle(curr);
        const marginBottom = parseFloat(style.marginBottom);
        return total + curr.clientHeight + marginBottom;
      }, 0);

    setPlaceholderProps({
      clientHeight,
      clientWidth,
      clientY,
      clientX: parseFloat(
        window.getComputedStyle(draggedDOM.parentNode).paddingLeft
      ),
    });
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
    return {
      userSelect: 'none',
      padding: '1rem',
      margin: '0 0 1px 0',
      ...draggableStyle,
    };
  };

  const handleDataChange = (changedId: string, data: any) => {
    try {
      const newData = [...droppedElements];

      const index = newData.findIndex((el) => el.id === selectedElement?.id);
      if (index < 0) return;

      newData[index].data[changedId] = data;
      setDroppedElements(newData);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    const editorEl =
      initialElements.find((el) => el.id === selectedElement?.elType) || null;
    setSelectedWidget(editorEl);
  }, [selectedElement]);

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragUpdate={onDragUpdate}>
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
                    {initialElements.map((element, index) => (
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
                              className='!p-0'
                            >
                              <div className='p-4 rounded border bg-[#1f2124] border-white/20 flex flex-col items-center gap-2 hover:bg-white/10 transition-all'>
                                <span className='text-2xl'>{element.icon}</span>
                                <p className='text-xs'>{element.title}</p>
                              </div>
                            </div>
                            {snapshot.isDragging && (
                              <div className='p-4 rounded border bg-[#1f2124] border-white/20 flex flex-col items-center gap-2 hover:bg-white/10 !transform-none'>
                                <span className='text-2xl'>{element.icon}</span>
                                <p className='text-xs'>{element.title}</p>
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

          <div className='flex-1 p-4 flex items-center justify-center text-black overflow-hidden'>
            <div className='h-full bg-white aspect-[9/19] iphone-case'>
              <div className='flex flex-col h-full overflow-hidden bg-white rounded-3xl'>
                <Image
                  src='/assets/images/statusbar.png'
                  alt='statusbar'
                  quality={100}
                  width={400}
                  height={20}
                  className='w-full select-none'
                />
                <Droppable droppableId='elements'>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className='flex-1 Kiosk h-full overflow-x-hidden overflow-y-auto relative'
                    >
                      {droppedElements.map((element, index) => (
                        <Draggable
                          key={element.id}
                          draggableId={element.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              //   {...provided.dragHandleProps}
                              style={getItemStyle(
                                false,
                                provided.draggableProps.style
                              )}
                              className='!p-0 frame-elements'
                            >
                              <DragHandle
                                dragHandleProps={provided.dragHandleProps}
                                selectedElementId={
                                  selectedElement?.id as string
                                }
                                element={element}
                                isDragging={isDragging}
                                onSelect={(element) =>
                                  setSelectedElement(element)
                                }
                                onDelete={(elType) =>
                                  console.log('deleted elType', elType)
                                }
                              >
                                <OutputElement element={element} />
                              </DragHandle>
                            </div>
                          )}
                        </Draggable>
                      ))}

                      {provided.placeholder}

                      {droppedElements.length === 0 && !isDragging ? (
                        <div className='h-full flex flex-col p-4 justify-center items-center'>
                          <p className='text-base text-slate-400'>
                            Drop elements here!
                          </p>
                        </div>
                      ) : (
                        <></>
                      )}

                      <div
                        id='custom-placeholder'
                        style={{
                          position: 'absolute',
                          top: placeholderProps.clientY,
                          left: 0,
                          height: placeholderProps.clientHeight,
                          background: '#F2542D30',
                          width: '100%',
                        }}
                      />
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>

          <aside className='shrink-0 w-[300px] border-l border-slate-800 bg-[#1f2124]'>
            <RightSidebar
              widget={selectedWidget}
              element={selectedElement}
              onDataChange={(changedId, data) =>
                handleDataChange(changedId, data)
              }
            />
          </aside>
        </main>
      </div>
    </DragDropContext>
  );
};

export default Editor;
