'use client';
import { useModal } from '@/providers/modal-provider';
import { Button } from '../ui/button';
import React from 'react';
import CustomModal from '../global/custom-modal';
import UploadMediaForm from '../forms/upload-media';

type Props = {
  subaccountId: string;
};

const MediaUploadButton = ({ subaccountId }: Props) => {
  const { isOpen, setOpen, setClose } = useModal();
  return (
    <Button
      onClick={() => {
        setOpen(
          <CustomModal
            title="Upload Media"
            subheading="upload a file to your media bucket"
          >
            <UploadMediaForm subaccountId={subaccountId}></UploadMediaForm>
          </CustomModal>,
        );
      }}
    >
      Upload
    </Button>
  );
};

export default MediaUploadButton;
