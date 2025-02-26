'use client';

// like zustand library

import { Agency, User } from '@prisma/client';
import { useContext, useEffect, useState, createContext } from 'react';

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

const ModalContext = createContext<ModalContxtType | undefined>(undefined);

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
    throw new Error('useModal must be used within the modal provider');
  }
  return context;
};

export default ModalProvider;
