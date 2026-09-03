// 🎨 Wowsuite Design System - Main Export Entry

// Styles & Tokens
import './styles/tokens.css';

// Contexts & Themes
export { ThemeProvider, useThemeContext } from './contexts/ThemeContext';
export { useTheme } from './contexts/useTheme';
export { ThemeSwitcher } from './components/ThemeSwitcher';

// Universal Core UI Primitives
export { Button } from './components/ui/button';
export type { ButtonProps } from './components/ui/button';

export { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card';

export { Input } from './components/ui/input';
export type { InputProps } from './components/ui/input';

export { Textarea } from './components/ui/textarea';
export type { TextareaProps } from './components/ui/textarea';

export { Slider } from './components/ui/slider';
export type { SliderProps } from './components/ui/slider';

export { Select } from './components/ui/select';
export type { SelectProps, SelectOption } from './components/ui/select';

export { MultiSelect } from './components/ui/multiselect';
export type { MultiSelectProps, MultiSelectOption } from './components/ui/multiselect';

export { Switch } from './components/ui/switch';
export type { SwitchProps } from './components/ui/switch';

export { Checkbox } from './components/ui/checkbox';
export type { CheckboxProps } from './components/ui/checkbox';

export { SimpleTable } from './components/ui/simple-table';
export type { SimpleTableProps, SimpleTableColumn } from './components/ui/simple-table';

export { AdvanceTable } from './components/ui/advance-table';
export type { AdvanceTableProps, AdvanceTableColumn } from './components/ui/advance-table';

export { HorizontalTabs } from './components/ui/horizontal-tabs';
export type { HorizontalTabsProps, TabItem } from './components/ui/horizontal-tabs';

export { VerticalTabs } from './components/ui/vertical-tabs';
export type { VerticalTabsProps, VerticalTabItem } from './components/ui/vertical-tabs';

export { NotificationDropdown } from './components/ui/notification-dropdown';
export type { NotificationDropdownProps, NotificationItem } from './components/ui/notification-dropdown';

export { Badge } from './components/ui/badge';
export type { BadgeProps } from './components/ui/badge';

export { Accordion } from './components/ui/accordion';
export type { AccordionProps, AccordionItem } from './components/ui/accordion';

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './components/ui/dialog';

// Chat & Stream Components
export { CodeBlock } from './components/Chat/CodeBlock';
export type { CodeBlockProps } from './components/Chat/CodeBlock';

export { ThinkingProcessAccordion } from './components/Chat/ThinkingProcessAccordion';
export type { ThinkingProcessAccordionProps } from './components/Chat/ThinkingProcessAccordion';

export { MessageVersionSwitcher } from './components/Chat/MessageVersionSwitcher';
export type { MessageVersionSwitcherProps } from './components/Chat/MessageVersionSwitcher';

export { AttachmentList } from './components/Chat/AttachmentList';
export type { AttachmentListProps, FileAttachment } from './components/Chat/AttachmentList';

export { CommandPopover } from './components/Chat/CommandPopover';
export type { CommandPopoverProps, CommandItem } from './components/Chat/CommandPopover';

// Modals & Panels
export { SettingsDialog } from './components/Modals/SettingsDialog';
export type { SettingsDialogProps } from './components/Modals/SettingsDialog';

export { AgentCreatorDialog } from './components/Modals/AgentCreatorDialog';
export type { AgentCreatorDialogProps } from './components/Modals/AgentCreatorDialog';

export { WowloopNavItem } from './components/Nav/WowloopNavItem';
export type { WowloopNavItemProps } from './components/Nav/WowloopNavItem';

export { WowloopSidePanel } from './components/SidePanel/WowloopSidePanel';

// Full Application Presets
export { LibreChatPage } from './components/Chat/LibreChatPage';
export { LibreChatHeader } from './components/Chat/LibreChatHeader';
export { LibreChatNav } from './components/Chat/LibreChatNav';
export { LibreChatMessages } from './components/Chat/LibreChatMessages';
export type { ChatMessage } from './components/Chat/LibreChatMessages';
export { LibreChatInput } from './components/Chat/LibreChatInput';
export { DesignLibraryPage } from './components/DesignLibrary/DesignLibraryPage';
