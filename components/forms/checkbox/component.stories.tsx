import { Story } from '@storybook/react/types-6-0';

import Checkbox from './component';
import { CheckboxProps } from './types';

export default {
  title: 'Components/Forms/Checkbox',
  component: Checkbox,
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
      description: 'https://www.w3schools.com/tags/tag_textarea.asp',
      table: {
        type: {
          summary: 'InputHTMLAttributes',
          detail: null,
        },
      },
      control: {
        disabled: true,
      },
    },
  },
};

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
  theme: 'dark',
};
