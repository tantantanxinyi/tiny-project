import Unauthorized from '@/components/unauthorized';
import { getAuthUserDetails, verifyAndAcceptInvitation } from '@/lib/queries';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  // from stripe
  searchParams: {
    state: string;
    code: string;
  };
};

// to check if the user has been verified and accepted
const SubAccountMainPage = async ({ searchParams }: Props) => {
  const agencyId = await verifyAndAcceptInvitation();

  if (!agencyId) {
    return <Unauthorized />;
  }

  const user = await getAuthUserDetails();

  if (!user) {
    return;
  }

  const getFirstSubaccountWithAccess = user.Permissions.find(
    permission => (permission.access = true),
  );

  if (searchParams.state) {
    const statePath = searchParams.state.split('___')[0];
    const stateSubaccountId = searchParams.state.split('___')[1];
    if (!stateSubaccountId) {
      return <Unauthorized></Unauthorized>;
    }

    return redirect(
      `/subaccount/${stateSubaccountId}/${statePath}?code=${searchParams.code}`,
    );
  }

  if (getFirstSubaccountWithAccess) {
    return redirect(`/subaccount/${getFirstSubaccountWithAccess.subAccountId}`);
  }
  return <Unauthorized></Unauthorized>;
};

export default SubAccountMainPage;
