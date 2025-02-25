'use client';

// like zustand library

import { Agency, User } from '@prisma/client';
import { useContext, useEffect, useState } from 'react';
import { createContext } from 'vm';

interface ModalProviderProps {
  children: React.ReactNode;
}

export type ModalData = {
  user?: User;
  agency?: Agency;
};

type ModalContxtType = {
  data: ModalData;
  isOpen: boolean;
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => void;
  setClose: () => void;
};

export const ModalContext = createContext<ModalContxtType>({
  data: {},
  isOpen: false,
  setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => {},
  setClose: () => {},
});

const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setisOpen] = useState(false);
  const [data, setData] = useState<ModalData>({});
  const [showingModal, setShowingModal] = useState<React.ReactNode>(null);
  const [isMounted, setisMounted] = useState(false); // stop hydration

  useEffect(() => {
    setisMounted(true);
  }, []);

  const setOpen = async (
    modal: React.ReactNode,
    fetchData?: () => Promise<any>,
  ) => {
    if (modal) {
      setData(fetchData ? { ...data, ...(await fetchData()) } : {});
    }

    setShowingModal(modal);
    setisOpen(true);
  };

  const setClose = () => {
    setisOpen(false);
    setData({});
  };

  if (!isMounted) {
    return null;
  }

  return (
    <ModalContext.Provider value={{ data, setOpen, setClose, isOpen }}>
      {children}
      {showingModal}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useMoal must be used within the modal provider');
  }
  return context;
};
