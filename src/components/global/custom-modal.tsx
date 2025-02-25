'use client';
import { useModal } from '@/providers/modal-provider';
import React from 'react';
import { Dialog, DialogHeader } from '../ui/dialog';
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@radix-ui/react-dialog';

type Props = {
  title: string;
  subheading: string;
  children: React.ReactNode;
  defaultOpen: boolean;
};

const customModal = ({ children, defaultOpen, subheading, title }: Props) => {
  const { isOepn, setClose } = useModal();
  return (
    <Dialog open={isOepn || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="overflow-scroll md:max-h-[700px] md:h-fit h-screen bg-card">
        <DialogHeader className="pt-8 text-left">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default customModal;
