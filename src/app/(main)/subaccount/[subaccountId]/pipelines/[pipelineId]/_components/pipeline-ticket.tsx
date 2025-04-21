import { TicketWithTags } from '@/lib/types';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import React, { Dispatch, SetStateAction } from 'react';
import { Draggable } from 'react-beautiful-dnd';

type Props = {
  setAllTickets: Dispatch<SetStateAction<TicketWithTags>>;
  ticket: TicketWithTags[0];
  subaccountId: string;
  allTickets: TicketWithTags;
  index: number;
};

const PipelineTicket = ({
  setAllTickets,
  ticket,
  subaccountId,
  allTickets,
  index,
}: Props) => {
  return (
    <Draggable draggableId={ticket.id.toString()} index={index}>
      {(provided, snapshot) => {
        if (snapshot.isDragging) {
          const offset = { x: 300, y: 20 };
          //@ts-ignore
          const x = provided.draggableProps.style?.left - offset.x;
          //@ts-ignore
          const y = provided.draggableProps.style?.top - offset.y;
          //@ts-ignore
          provided.draggableProps.style = {
            ...provided.draggableProps.style,
            top: y,
            left: x,
          };
        }
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <AlertDialog>
              
            </AlertDialog>
          </div>
        );
      }}
    </Draggable>
  );
};

export default PipelineTicket;
