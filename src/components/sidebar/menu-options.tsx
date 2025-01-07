'use client';

import React from 'react';
import {
  AgencySidebarOption,
  SubAccountSidebarOption,
  SubAccount,
} from '@prisma/client';

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
  return <div>MenuOptions</div>;
};

export default MenuOptions;
