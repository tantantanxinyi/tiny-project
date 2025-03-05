import { NotificationWithUser } from '@/lib/types';
import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = {
  notifications: NotificationWithUser | [];
  role?: string;
  className?: string;
  subAccountId: string;
};

const InfoBar = ({ notifications, role, className, subAccountId }: Props) => {
  const [allNotifications, setAllNotifications] = useState(notifications);
  const [showAll, setShowAll] = useState(true);
  return (
    <>
      <div
        className={twMerge(
          'fixed z-[20] md:left-[300px] left-0 right-0 top-0 p-4 bg-background/80 backdrop-blur-md flex  gap-4 items-center border-b-[1px] ',
          className,
        )}
      ></div>
    </>
  );
};

export default InfoBar;
