import {
  AuthUserWithAgencySigebarOptionsSubAccounts,
  UserWithPermissionsAndSubAccounts,
} from '@/lib/types';
import { useModal } from '@/providers/modal-provider';
import { User } from '@clerk/nextjs/server';
import { SubAccount } from '@prisma/client';
import React, { useState } from 'react';
import { useToast } from '../ui/use-toast';
import { useRouter } from 'next/navigation';

type Props = {
  id: string | null;
  type: 'agecny' | 'subaccount';
  userData?: Partial<User>;
  subAccount?: SubAccount[];
};

const UserDetails = ({ id, type, userData, subAccount }: Props) => {
  const [subAccountPermisson, setSubAccountsPermission] =
    useState<UserWithPermissionsAndSubAccounts | null>(null);

  const { data, setClose } = useModal();
  const [roleState, setRoleState] = useState('');
  const [loadingPermissions, setLoadingPermissions] = useState(false);
  const [authUserData, setAuthUserData] =
    useState<AuthUserWithAgencySigebarOptionsSubAccounts>(null);

  const { toast } = useToast();
  const router = useRouter();

  //get authUserDetais
  

  return <div>userDetails</div>;
};

export default UserDetails;
