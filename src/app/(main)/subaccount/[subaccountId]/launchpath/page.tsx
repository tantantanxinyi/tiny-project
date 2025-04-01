import BlurPage from '@/components/global/blur-page';
import { db } from '@/lib/db';
import React from 'react';

type Props = {
  searchParams: {
    state: string;
    code: string;
  };
  params: {
    subaccountId: string;
  };
};

const LaunchPad = async ({ params, searchParams }: Props) => {
  const subaccountDetails = await db.subAccount.findUnique({
    where: {
      id: params.subaccountId,
    },
  });

  if (!subaccountDetails) {
    return;
  }
  const allDetailsExist =
    subaccountDetails.address &&
    subaccountDetails.subAccountLogo &&
    subaccountDetails.city &&
    subaccountDetails.companyEmail &&
    subaccountDetails.companyPhone &&
    subaccountDetails.country &&
    subaccountDetails.name &&
    subaccountDetails.state;

  // WIP:  write up stripe

  return <BlurPage>launchPad</BlurPage>;
};

export default LaunchPad;
