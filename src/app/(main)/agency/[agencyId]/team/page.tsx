import { db } from '@/lib/db';
import { subBusinessDays } from 'date-fns';
import React from 'react';
import DataTable from './data-table';
import { Plus } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';
import { columns } from './column';
import SendInvitation from '@/components/forms/send-invitation';
import AgencyDetails from '@/components/forms/agency-details';

type Props = {
  params: {
    agencyId: string;
  };
};

const TeamPage = async ({ params }: Props) => {
  const authUser = await currentUser();
  const teamMembers = await db.user.findMany({
    where: {
      Agency: {
        id: params.agencyId,
      },
    },
    include: {
      Agency: { include: { SubAccount: true } },
      Permissions: { include: { SubAccount: true } },
    },
  });

  if (!authUser) return;

  const agencyDetails = await db.agency.findUnique({
    where: {
      id: params.agencyId,
    },
    include: {
      SubAccount: true,
    },
  });

  if (!agencyDetails) return;
  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15}></Plus>
          Add
        </>
      }
      modalChildren={
        <SendInvitation agencyId={agencyDetails.id}></SendInvitation>
      }
      filterValue="name"
      columns={columns}
      data={teamMembers}
    ></DataTable>
  );
};

export default TeamPage;
