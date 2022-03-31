import { Story } from '@storybook/react/types-6-0';

import Textarea from './component';
import { TextareaProps } from './types';

export default {
  title: 'Components/Forms/Textarea',
  component: Textarea,
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
    TextareaHTMLAttributes: {
      name: 'TextareaHTMLAttributes',
      description: 'https://www.w3schools.com/tags/tag_textarea.asp',
      table: {
        type: {
          summary: 'TextareaHTMLAttributes',
          detail: null,
        },
      },
      control: {
        disabled: true,
      },
    },
  },
};

const Template: Story<TextareaProps> = (args) => <Textarea {...args} />;

export const Default = Template.bind({});
Default.args = {
  theme: 'dark',
};
