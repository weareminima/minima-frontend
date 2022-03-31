import { Story } from '@storybook/react/types-6-0';

import Input from './component';
import type { InputProps } from './types';

export default {
  title: 'Components/Forms/Input',
  component: Input,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    theme: {
      control: {
        type: 'select',
        options: ['dark', 'light'],
      },
    },
    status: {
      control: {
        type: 'select',
        options: ['none', 'valid', 'error', 'disabled'],
      },
    },
    InputHTMLAttributes: {
      name: 'InputHTMLAttributes',
      description: 'https://www.w3schools.com/tags/tag_input.asp',
      table: {
        type: {
          summary: 'InputHTMLAttributes',
        },
      },
      control: {
        disabled: true,
      },
    },
  },
};

const Template: Story<InputProps> = (args) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  theme: 'dark',
};
