import {
  createContext,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { createPortal } from 'react-dom';
import styled from '@emotion/styled';

interface ModalContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be rendered inside Modal.Root');
  }
  return context;
}

export function useModal() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}

function Root({ children, open: controlledOpen, onOpenChange }: { children: ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      onOpenChange?.(nextOpen);
      if (controlledOpen === undefined) {
        setUncontrolledOpen(nextOpen);
      }
    },
    [controlledOpen, onOpenChange]
  );

  const value = useMemo(() => ({ open, setOpen }), [open, setOpen]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

const TriggerButton = styled.button`
  align-items: center;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  display: inline-flex;
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  min-height: 2.5rem;
  padding: 0 ${({ theme }) => theme.space[3]};

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.shadow.focus};
    outline: none;
  }
`;

function Trigger({ children, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useModalContext();

  return (
    <TriggerButton
      type="button"
      onClick={(event) => {
        onClick?.(event);
        setOpen(true);
      }}
      {...props}
    >
      {children}
    </TriggerButton>
  );
}

const Backdrop = styled.div`
  align-items: center;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  inset: 0;
  justify-content: center;
  padding: ${({ theme }) => theme.space[4]};
  position: fixed;
  z-index: 50;
`;

const Dialog = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.floating};
  color: ${({ theme }) => theme.color.text};
  max-width: 32rem;
  padding: ${({ theme }) => theme.space[6]};
  width: min(100%, 32rem);

  &:focus {
    outline: none;
  }
`;

function Content({ children, 'aria-labelledby': labelledBy, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen } = useModalContext();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.setTimeout(() => dialogRef.current?.focus(), 0);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open, setOpen]);

  if (!open) return null;

  return createPortal(
    <Backdrop onMouseDown={() => setOpen(false)}>
      <Dialog
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
        {...props}
      >
        {children}
      </Dialog>
    </Backdrop>,
    document.body
  );
}

const CloseButton = styled.button`
  background: ${({ theme }) => theme.color.brand.bg};
  border: 0;
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.brand.text};
  cursor: pointer;
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  min-height: 2.5rem;
  padding: 0 ${({ theme }) => theme.space[4]};

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.shadow.focus};
    outline: none;
  }
`;

function Close({ children = 'Close', onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useModalContext();

  return (
    <CloseButton
      type="button"
      onClick={(event) => {
        onClick?.(event);
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </CloseButton>
  );
}

export const Modal = { Root, Trigger, Content, Close };
