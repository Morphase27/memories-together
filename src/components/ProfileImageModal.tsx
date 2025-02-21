
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
}

const ProfileImageModal = ({ isOpen, onClose, imageSrc }: ProfileImageModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
        <div className="w-full aspect-square">
          <img
            src={imageSrc}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileImageModal;
