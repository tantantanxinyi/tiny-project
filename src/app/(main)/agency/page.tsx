import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries';
import { currentUser } from '@clerk/nextjs/server';
import { Plan } from '@prisma/client';
import { renderToHTML } from 'next/dist/server/render';
import { redirect } from 'next/navigation';

import React from 'react';

const Page = async ({
  searchParams,
}: {
  searchParams: { plan: Plan; state: string; code: string };
}) => {
  // const authUser = await currentUser();
  // if (!authUser) return redirect('/sign-in');

  const agencyId = await verifyAndAcceptInvitation();

  // get users details
  const user = await getAuthUserDetails();
  //check sub  account => give access to another people
  if (agencyId) {
    if (user?.role === 'SUBACCOUNT_GUEST' || user?.role === 'SUBACCOUNT_USER') {
      return redirect('/subaccount');
    } else if (user?.role === 'AGENCY_OWNER' || user?.role === 'AGENCY_ADMIN') {
      // check searchParams from  the param
      if (searchParams.plan) {
        return redirect(
          `/agency/${agencyId}/billing?plan=${searchParams.plan}`,
        );
      }
      if (searchParams.state) {
        const statePath = searchParams.state.split('__')[0];
        const stateAgencyId = searchParams.state.split('___')[1];
        if (!stateAgencyId) return <div>Not authorized</div>;
        return redirect(
          `/agency/${stateAgencyId}/${statePath}?code=${searchParams.code}`, // confirm that everything is successful
        );
      } else return redirect(`/agency/${agencyId}`);
    } else {
      return <div>Not authorized</div>;
    }
  }
  const authuser = await currentUser(); // everything is failed, we need to do something is allowing to create a new agencyt
  return (
    <div className="flex justify-center items-center mt-4">
      <div className="max-w-[850px] border-[1px] p-4 rounded-xl">
        <h1 className="text-4xl">create an angency</h1>
      </div>
    </div>
  );
};

export default Page;
