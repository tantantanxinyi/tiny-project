import { useModal } from '@/providers/modal-provider';
import { Button } from '@tremor/react';
import React from 'react';
import CustomModal from '../global/custom-modal';
import UploadMediaForm from '../forms/upload-media';

type Props = {
  subaacountId: string;
};

const MediaUploadButton = ({ subaacountId }: Props) => {
  const { isOpen, setOpen, setClose } = useModal();
  return (
    <Button
      onClick={() => {
        setOpen(
          <CustomModal
            title="Upload Media"
            subheading="upload a file to your media bucket"
          >
            <UploadMediaForm subaccount={subaacountId}></UploadMediaForm>
          </CustomModal>,
        );
      }}
    >
      upload-buttons
    </Button>
  );
};

export default MediaUploadButton;
