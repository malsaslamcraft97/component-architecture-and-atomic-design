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
import styled from '@emotion/styled';

interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement>;
  registerItem: (node: HTMLButtonElement | null) => void;
  focusItem: (direction: 1 | -1) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown components must be rendered inside Dropdown.Root');
  }
  return context;
}

export function useDropdown() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}

function Root({ children, open: controlledOpen, onOpenChange }: { children: ReactNode; open?: boolean; onOpenChange?: (open: boolean) => void }) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemsRef = useRef<HTMLButtonElement[]>([]);
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

  const registerItem = useCallback((node: HTMLButtonElement | null) => {
    if (!node) return;
    if (!itemsRef.current.includes(node)) {
      itemsRef.current.push(node);
    }
  }, []);

  const focusItem = useCallback((direction: 1 | -1) => {
    const items = itemsRef.current.filter((item) => !item.disabled);
    const activeIndex = items.findIndex((item) => item === document.activeElement);
    const nextIndex = activeIndex === -1 ? 0 : (activeIndex + direction + items.length) % items.length;
    items[nextIndex]?.focus();
  }, []);

  useEffect(() => {
    if (!open) {
      itemsRef.current = [];
    }
  }, [open]);

  const value = useMemo(() => ({ open, setOpen, triggerRef, registerItem, focusItem }), [open, setOpen, registerItem, focusItem]);

  return (
    <DropdownContext.Provider value={value}>
      <RootContainer>{children}</RootContainer>
    </DropdownContext.Provider>
  );
}

const RootContainer = styled.div`
  display: inline-block;
  position: relative;
`;

const TriggerButton = styled.button`
  align-items: center;
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  display: inline-flex;
  font-weight: ${({ theme }) => theme.font.weight.semibold};
  gap: ${({ theme }) => theme.space[2]};
  min-height: 2.5rem;
  padding: 0 ${({ theme }) => theme.space[3]};

  &:focus-visible {
    box-shadow: ${({ theme }) => theme.shadow.focus};
    outline: none;
  }
`;

function Trigger({ children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen, triggerRef } = useDropdownContext();

  return (
    <TriggerButton
      ref={triggerRef}
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      onClick={() => setOpen(!open)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          setOpen(true);
        }
      }}
      {...props}
    >
      {children}
    </TriggerButton>
  );
}

const ContentBox = styled.div`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.floating};
  display: grid;
  gap: ${({ theme }) => theme.space[1]};
  margin-top: ${({ theme }) => theme.space[2]};
  min-width: 12rem;
  padding: ${({ theme }) => theme.space[2]};
  position: absolute;
  z-index: 20;
`;

function Content({ children, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { open, setOpen, triggerRef, focusItem } = useDropdownContext();

  useEffect(() => {
    if (open) {
      window.setTimeout(() => focusItem(1), 0);
    }
  }, [focusItem, open]);

  if (!open) return null;

  return (
    <ContentBox
      role="menu"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          setOpen(false);
          triggerRef.current?.focus();
        }
        if (event.key === 'ArrowDown') {
          event.preventDefault();
          focusItem(1);
        }
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          focusItem(-1);
        }
      }}
      {...props}
    >
      {children}
    </ContentBox>
  );
}

const ItemButton = styled.button`
  background: transparent;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.color.text};
  cursor: pointer;
  min-height: 2.25rem;
  padding: 0 ${({ theme }) => theme.space[3]};
  text-align: left;

  &:focus-visible,
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.color.brand.subtle};
    outline: none;
  }

  &:disabled {
    color: ${({ theme }) => theme.color.textMuted};
    cursor: not-allowed;
  }
`;

function Item({ children, onClick, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen, registerItem, triggerRef } = useDropdownContext();

  return (
    <ItemButton
      ref={registerItem}
      role="menuitem"
      type="button"
      onClick={(event) => {
        onClick?.(event);
        setOpen(false);
        triggerRef.current?.focus();
      }}
      {...props}
    >
      {children}
    </ItemButton>
  );
}

export const Dropdown = { Root, Trigger, Content, Item };
