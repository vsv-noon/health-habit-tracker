export type ModalProps = {
  isOpen: boolean;
  customClassName?: string;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
};
