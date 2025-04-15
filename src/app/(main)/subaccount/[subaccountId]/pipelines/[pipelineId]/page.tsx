import { db } from '@/lib/db';
import { getLanesWithTicketAndTags, getPipelineDetails } from '@/lib/queries';
import { LaneDetail } from '@/lib/types';
import { redirect } from 'next/navigation';
import React from 'react';
import PipelineInfoBar from './_components/pipeline-inforbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PipelineSettings from './_components/pipeline-settings';

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

  return (
    <Tabs defaultValue="view" className="w-full">
      <TabsList className="bg-transparent border-b-2 h-16 w-full justify-between mb-4">
        <PipelineInfoBar
          subAccountId={params.subaccountId}
          pipelines={pipelines}
          pipelineId={params.pipelineId}
        />
        <div>
          <TabsTrigger value="view" className="!bg-transparent w-40">
            Pipeline View
          </TabsTrigger>
          <TabsTrigger value="setting" className="!bg-transparent w-40">
            Setting
          </TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="view">
        {/* <PipelineView lanes={lanes} /> */}
      </TabsContent>
      <TabsContent value="setting">
        <PipelineSettings
          pipelineId={params.pipelineId}
          pipelines={pipelines}
          subaccountId={params.subaccountId}
        />
      </TabsContent>
    </Tabs>
  );
};

export default PipelinePage;
