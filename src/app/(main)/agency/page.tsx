import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

import React from 'react';

const Page = async () => {
  console.log(currentUser, 33);
  // const authUser = await currentUser();
  // if (!authUser) return redirect('/sign-in');

  const agencyId = await verifyAndAcceptInvitation();
  console.log(agencyId, 44);

  // get users details
  const user = await getAuthUserDetails();

  return <div>Agency</div>;
};

export default Page;
