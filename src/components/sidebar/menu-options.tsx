'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  AgencySidebarOption,
  SubAccountSidebarOption,
  SubAccount,
} from '@prisma/client';
import { Sheet, SheetTrigger } from '../ui/sheet';

type Props = {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: any;
  details: any;
  user: any;
  id: string;
};

const MenuOptions = ({
  details,
  id,
  sidebarLogo,
  sidebarOpt,
  subAccounts,
  user,
  defaultOpen,
}: Props) => {
  const [isMounted, setIsMounted] = useState(false); // 解决 hydration 水合问题
  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen],
  );

  useEffect(() => {
    setIsMounted(true);
  });

  if (!isMounted) {
    return null;
  }
  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:!hidden flex"
      >
        <Button variant="outLine" size={'icon'}>
          <Menu /></Menu>
        </Button>
      </SheetTrigger>
    </Sheet>
  );
};

export default MenuOptions;
