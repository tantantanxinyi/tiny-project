'use client';

import { useRouter } from 'next/navigation';
import {
  getSubaccountDetails,
  saveActivityLogsNotification,
  deleteSubAccount,
} from '@/lib/queries';
import React from 'react';

type Props = {
  subaccountId: string;
};

const DeleteButton = ({ subaccountId }: Props) => {
  const router = useRouter();
  return (
    <div
      onClick={async () => {
        const response = await getSubaccountDetails(subaccountId);
        await saveActivityLogsNotification({
          agencyId: undefined,
          description: `Deleted a subaccount | ${response?.name}`,
          subaccountId,
        });
        await deleteSubAccount(subaccountId);
        router.refresh();
      }}
    >
      Delete Sub Account
      </div>
  );
};

export default DeleteButton;
