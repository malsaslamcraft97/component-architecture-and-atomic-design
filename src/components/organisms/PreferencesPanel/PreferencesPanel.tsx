import styled from '@emotion/styled';
import { Badge } from '../../atoms/Badge';
import { Button } from '../../atoms/Button';
import { TextInput } from '../../atoms/TextInput';
import { Dropdown } from '../../headless/Dropdown';
import { Modal } from '../../headless/Modal';

const Panel = styled.section`
  background: ${({ theme }) => theme.color.surface};
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: grid;
  gap: ${({ theme }) => theme.space[5]};
  max-width: 44rem;
  padding: ${({ theme }) => theme.space[6]};
`;

const Header = styled.div`
  align-items: start;
  display: flex;
  gap: ${({ theme }) => theme.space[4]};
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.font.size.xl};
  line-height: ${({ theme }) => theme.font.lineHeight.tight};
  margin: 0 0 ${({ theme }) => theme.space[1]};
`;

const Description = styled.p`
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]};
`;

const DialogTitle = styled.h2`
  margin: 0 0 ${({ theme }) => theme.space[2]};
`;

const DialogText = styled.p`
  color: ${({ theme }) => theme.color.textMuted};
  margin: 0 0 ${({ theme }) => theme.space[5]};
`;

export function PreferencesPanel() {
  return (
    <Panel aria-labelledby="preferences-title">
      <Header>
        <div>
          <Title id="preferences-title">Design system profile</Title>
          <Description>Organism example composed from atoms, molecules, and headless primitives.</Description>
        </div>
        <Badge tone="success">AA ready</Badge>
      </Header>

      <TextInput label="Workspace name" defaultValue="Foundations Lab" hint="Used in examples and generated docs." />

      <Actions>
        <Dropdown.Root>
          <Dropdown.Trigger>Theme</Dropdown.Trigger>
          <Dropdown.Content aria-label="Theme options">
            <Dropdown.Item>Light</Dropdown.Item>
            <Dropdown.Item>High contrast</Dropdown.Item>
            <Dropdown.Item disabled>System sync</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown.Root>

        <Modal.Root>
          <Modal.Trigger>Preview modal</Modal.Trigger>
          <Modal.Content aria-labelledby="preview-modal-title">
            <DialogTitle id="preview-modal-title">Headless modal</DialogTitle>
            <DialogText>
              The modal owns accessibility behavior while the consuming product keeps control of layout and content.
            </DialogText>
            <Modal.Close>Done</Modal.Close>
          </Modal.Content>
        </Modal.Root>

        <Button>Save preferences</Button>
      </Actions>
    </Panel>
  );
}
