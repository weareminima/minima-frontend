import { Story } from '@storybook/react/types-6-0';

import Select from './component';
import type { SelectProps } from './types';

export default {
  title: 'Components/Forms/Select',
  component: Select,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: ['dark', 'light'],
      },
    },
    state: {
      control: {
        type: 'select',
        options: ['valid', 'error', 'none'],
      },
    },
    onSelect: {
      table: {
        disable: true,
      },
    },
    initialValues: {
      table: {
        disable: true,
      },
    },
  },
};

const Template: Story<SelectProps> = (args) => (
  <div className="relative">
    <Select {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  theme: 'dark',
  size: 'base',
  maxHeight: 300,
  status: 'none',
  prefix: 'FILTER BY:',
  placeholder: 'Select Scenario',
  options: [
    { label: 'Scenario 1', value: 'scenario-1' },
    { label: 'Scenario 2', value: 'scenario-2' },
    { label: 'Scenario 3', value: 'scenario-3', disabled: true },
    { label: 'Scenario 4', value: 'scenario-4' },
    { label: 'Scenario 5', value: 'scenario-5' },
    { label: 'Scenario 6', value: 'scenario-6' },
    { label: 'Scenario 7', value: 'scenario-7' },
    { label: 'Scenario 8', value: 'scenario-8' },
    { label: 'Scenario 9', value: 'scenario-9' },
    { label: 'Scenario 10', value: 'scenario-10' },
    { label: 'Scenario 11', value: 'scenario-11' },
    { label: 'Scenario 12', value: 'scenario-12' },
    { label: 'Scenario 13', value: 'scenario-13' },
    { label: 'Scenario 14', value: 'scenario-14' },
    { label: 'Scenario 15', value: 'scenario-15' },
    { label: 'Scenario 16', value: 'scenario-16' },
    { label: 'Scenario 17', value: 'scenario-17' },
    { label: 'Scenario 18', value: 'scenario-18' },
  ],
  initialSelected: ['scenario-1', 'scenario-2', 'scenario-4'],
  disabled: false,
  multiple: true,
  searchable: false,
  clearSelectionActive: true,
  clearSelectionLabel: 'Clear Selection',
  batchSelectionActive: true,
  batchSelectionLabel: 'Select all',
  onChange: (option) => console.info(option),
};
