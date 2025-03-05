import React from 'react';
import {
  getNotificationAndUser,
  verifyAndAcceptInvitation,
} from '@/lib/queries';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Unauthorized from '@/components/unauthorized';
import Sidebar from '@/components/sidebar';
import BlurPage from '@/components/global/blur-page';
import InfoBar from '@/components/global/infobar';

type Props = {
  children: React.ReactNode;
  params: {
    agencyId: string;
  };
};
const layout = async ({ children, params }: Props) => {
  const agencyId = await verifyAndAcceptInvitation();
  const user = await currentUser();
  console.log(agencyId, user);
  if (!user) {
    return redirect('/');
  }

  if (!agencyId) {
    return redirect('/agency');
  }

  if (
    user.privateMetadata.role !== 'AGENCY_OWNER' &&
    user.privateMetadata.role !== 'AGENCY_ADMIN'
  ) {
    return <Unauthorized />;
  }

  let allNoti: any = [];
  const notifications = await getNotificationAndUser(agencyId);
  if (notifications) {
    allNoti = notifications;
  }

  return (
    <div className="h-screen overflow-hidden">
      <Sidebar id={params.agencyId} type="agency"></Sidebar>

      <div className="md:pl-[300px]">
        <div className="relative">
          <InfoBar></InfoBar>
          <BlurPage>{children}</BlurPage>
        </div>
      </div>
    </div>
  );
};

export default layout;
