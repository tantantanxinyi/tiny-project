import { db } from '@/lib/db';
import { getPipelineDetails } from '@/lib/queries';
import { LaneDetail } from '@/lib/types';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: {
    subaccountId: string;
    pipelineId: string;
  };
};

const PipelinePage = async ({ params }: Props) => {
  const pipelineDetails = await getPipelineDetails(params.pipelineId);
  if (!pipelineDetails) {
    return redirect(`/subaccount/${params.subaccountId}/pipelines`);
  }

  const pipelines = await db.pipeline.findMany({
    where: { subAccountId: params.subaccountId },
  });

  // pipeline is kanban board, lane is each column

  const lanes = (await getLanesWithTicketAndTags(
    params.pipelineId,
  )) as LaneDetail[];

  return <div>PipelinePage</div>;
};

export default PipelinePage;
