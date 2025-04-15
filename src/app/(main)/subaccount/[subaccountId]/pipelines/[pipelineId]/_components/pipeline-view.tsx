'use client';

import {
  LaneDetail,
  PipelineDetailsWithLanesCardsTagsTickets,
} from '@/lib/types';
import { Lane, Ticket } from '@prisma/client';
import React from 'react';

type Props = {
  lanes: LaneDetail[];
  pipelineId: string;
  subaccountId: string;
  pipelineDetails: PipelineDetailsWithLanesCardsTagsTickets;
  updateLanesOrder: (lanes: Lane[]) => Promise<void>;
  updateTicketsOrder: (tickets: Ticket[]) => Promise<void>;
};

// kanban board itself
const pipelineView = (props: Props) => {
  return <div>pipelineView</div>;
};

export default pipelineView;
