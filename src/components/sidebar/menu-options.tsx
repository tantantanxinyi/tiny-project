'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  AgencySidebarOption,
  SubAccountSidebarOption,
  SubAccount,
  Agency,
} from '@prisma/client';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import {
  ChevronDown,
  ChevronsUpDown,
  Menu,
  PlusCircleIcon,
} from 'lucide-react';
import clsx from 'clsx';
import { AspectRatio } from '../ui/aspect-ratio';
import Image from 'next/image';
import { Popover, PopoverTrigger } from '../ui/popover';
import Compass from '../icons/compass';
import { PopoverContent } from '@radix-ui/react-popover';
import { Command } from '../ui/command';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import Link from 'next/link';
import { sub } from 'date-fns';
import { useModal } from '../../providers/modal-provider';
import CustomModal from '../global/custom-modal';
import SubAccountDetails from '../forms/subaccount-details';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { icons } from '../../lib/constant';

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
  // setOpen
  const { setOpen } = useModal();
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
        <Button variant="outline" size={'icon'}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX={true}
        side={'left'}
        className={clsx(
          'bg-background/80 backdrop-blur-xl fixed top-0 border-r-[1px] p-6',
          {
            'hidden md:inline-block z-0 w-[300px]': defaultOpen,
            'inline-block md:hidden z-[100] w-full': !defaultOpen,
          },
        )}
      >
        <div>
          <AspectRatio ratio={16 / 5}>
            <Image
              src={sidebarLogo}
              alt="Sidebar Logo"
              fill
              className="rounded-md object-contain"
            />
          </AspectRatio>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="w-full my-4 flex items-center justify-between py-8"
                variant="ghost"
              >
                <div className="flex items-center text-left gap-2">
                  <Compass />
                  <div className="flex flex-col">
                    {details.name}
                    <span className="text-muted-foreground">
                      {details.address}
                    </span>
                  </div>
                </div>
                <div>
                  <ChevronsUpDown size={16} className="text-muted-foreground" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 h-80 mt-4 z-[200]">
              {
                <Command className="rounded-lg">
                  <CommandInput placeholder="Search Accoounts..." />
                  <CommandList className="pb-16">
                    <CommandEmpty>No result found</CommandEmpty>
                    {(user.role === 'AGENCY_OWNER' ||
                      user?.role === 'AGENCY_ADMIN') &&
                      user?.Agency && (
                        <CommandGroup heading="Agency">
                          <CommandItem
                            className="!bg-transparent my-2 
                          text-primary border-[1px]
                           border-border p-2 rounded-md 
                           hover:!bg-muted cursor-pointer transiton-all"
                          >
                            {defaultOpen ? (
                              <Link
                                href={`/agency/${user?.Agency?.id}`}
                                className="flex gap-4 w-full h-full"
                              >
                                <div className="relative w-16">
                                  <Image
                                    src={user?.Agency?.agencyLogo}
                                    alt="Agency Logo"
                                    fill
                                    className="rounded-md object-contain"
                                  ></Image>
                                </div>
                                <div className="flex flex-col flex-1">
                                  {user?.Agency?.name}
                                  <span className="text-muted-foreground">
                                    {user?.Agency?.address}
                                  </span>
                                </div>
                              </Link>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={`/agency/${user?.Agency?.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-16">
                                    <Image
                                      src={user?.Agency?.agencyLogo}
                                      alt="Agency Logo"
                                      fill
                                      className="rounded-md object-contain"
                                    ></Image>
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    {user?.Agency?.name}
                                    <span className="text-muted-foreground">
                                      {user?.Agency?.address}
                                    </span>
                                  </div>
                                </Link>
                              </SheetClose>
                            )}
                          </CommandItem>
                        </CommandGroup>
                      )}
                    <CommandGroup heading="Accounts">
                      {!!subAccounts
                        ? subAccounts.map(subaccount => (
                            <CommandItem key={subaccount.id}>
                              {defaultOpen ? (
                                <Link
                                  href={`/subaccount/${subaccount.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-16">
                                    <Image
                                      src={subaccount.subAccountLogo}
                                      alt="subaccount Logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    {subaccount.name}
                                    <span className="text-muted-foreground">
                                      {subaccount.address}
                                    </span>
                                  </div>
                                </Link>
                              ) : (
                                <SheetClose asChild>
                                  <Link
                                    href={`/subaccount/${subaccount.id}`}
                                    className="flex gap-4 w-full h-full"
                                  >
                                    <div className="relative w-16">
                                      <Image
                                        src={subaccount.subAccountLogo}
                                        alt="subaccount Logo"
                                        fill
                                        className="rounded-md object-contain"
                                      />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                      {subaccount.name}
                                      <span className="text-muted-foreground">
                                        {subaccount.address}
                                      </span>
                                    </div>
                                  </Link>
                                </SheetClose>
                              )}
                            </CommandItem>
                          ))
                        : 'No Accounts'}
                    </CommandGroup>
                  </CommandList>
                  {(user?.role === 'AGENCY_OWNER' ||
                    user?.role === 'AGECNY_ADMIN') && (
                    <SheetClose>
                      <Button
                        className="w-full flex gap-2"
                        onClick={() => {
                          setOpen(
                            <CustomModal
                              title="Create A Subaccount"
                              subheading="You can switch between your agency account and the subaccount from the sidebar"
                            >
                              <SubAccountDetails
                                agencyDetails={user?.Agency as Agency}
                                userId={user?.id as string}
                                userName={user?.name}
                              />
                            </CustomModal>,
                          );
                        }}
                      >
                        <PlusCircleIcon size={15} />
                        Create Sub Account
                      </Button>
                    </SheetClose>
                  )}
                </Command>
              }
            </PopoverContent>
          </Popover>
          <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
          <Separator className="mb-4"></Separator>
          <nav className="relative">
            <Command className="rounded-lg overflow-visible bg-transparent">
              <CommandInput placeholder="Search..."></CommandInput>
              <CommandList className="py-4 pb-16 overflow-visible">
                <CommandEmpty>No Result Found</CommandEmpty>
                <CommandGroup className="overflow-visible">
                  {sidebarOpt.map(sidebarOptions => {
                    let val;
                    const result = icons.find(
                      icon => icon.value === sidebarOptions.icon,
                    );
                    if (result) {
                      val = <result.path></result.path>;
                    }
                    return (
                      <CommandItem
                        key={sidebarOptions.id}
                        className="md:w-[320px]-full"
                      >
                        <Link
                          href={sidebarOptions.link}
                          className="flex items-center gap-2 hover:bg-transparent rounded-md transition-all md:w-full w-[320px]"
                        >
                          {val}
                          <span>{sidebarOptions.name}</span>
                        </Link>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
