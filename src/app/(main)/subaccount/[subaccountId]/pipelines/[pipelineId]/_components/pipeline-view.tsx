'use client';

import LaneForm from '@/components/forms/lane-form';
import CustomModal from '@/components/global/custom-modal';
import { Button } from '@/components/ui/button';
import {
  LaneDetail,
  PipelineDetailsWithLanesCardsTagsTickets,
} from '@/lib/types';
import { useModal } from '@/providers/modal-provider';
import { Lane, Ticket } from '@prisma/client';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

type Props = {
  lanes: LaneDetail[];
  pipelineId: string;
  subaccountId: string;
  pipelineDetails: PipelineDetailsWithLanesCardsTagsTickets;
  updateLanesOrder: (lanes: Lane[]) => Promise<void>;
  updateTicketsOrder: (tickets: Ticket[]) => Promise<void>;
};

// kanban board itself
const pipelineView = ({
  lanes,
  pipelineId,
  subaccountId,
  pipelineDetails,
  updateLanesOrder,
  updateTicketsOrder,
}: Props) => {
  const { setOpen } = useModal();
  const router = useRouter();

  const [allLanes, setAllLanes] = useState<LaneDetail[]>();

  const handleAddLane = () => {
    setOpen(
      <CustomModal
        title=" Create A Lane"
        subheading="Lanes allow you to group tickets"
      >
        <LaneForm pipelineId={pipelineId} />
      </CustomModal>,
    );
  };

  useEffect(() => {
    setAllLanes(lanes);
  }, [lanes]);

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="bg-white/60 dark:bg-background/60 rounded-xl p-4 use-automation-zoom-in">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">{pipelineDetails?.name}</h1>
          <Button className="flex items-center gap-4" onClick={handleAddLane}>
            <Plus size={15} />
            Create Lane
          </Button>
        </div>
        <Droppable
          droppableId="lanes"
          type="lane"
          direction="horizontal"
          key="lanes"
        >
          {provided => (
            <div
              className="flex item-center gap-x-2 overflow-scroll"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <div className="flex mt-4">
                {allLanes?.map(lane => (
                  <PipeLineLane></PipeLineLane>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default pipelineView;
