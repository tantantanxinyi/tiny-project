import { db } from '@/lib/db';
import { subBusinessDays } from 'date-fns';
import React from 'react';
import DataTable from './data-table';
import { Plus } from 'lucide-react';
import { currentUser } from '@clerk/nextjs/server';
import { columns } from './column';

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
  return (
    <DataTable
      actionButtonText={
        <>
          <Plus size={15}></Plus>
        </>
      }
      modalChildren
      filterValue="name"
      columns={columns}
      data={teamMembers}
    ></DataTable>
  );
};

export default TeamPage;
