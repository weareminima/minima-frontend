import { Story } from '@storybook/react/types-6-0';

import Button from './component';
import { ButtonProps } from './types';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['s', 'base'],
      },
    },
    theme: {
      control: {
        type: 'select',
        options: ['primary', 'primary-alt', 'clean'],
      },
    },
  },
};

const Template: Story<ButtonProps> = ({ children, ...args }: ButtonProps) => (
  <Button {...args}>{children}</Button>
);

export const Default = Template.bind({});
Default.args = {
  children: 'Button',
  disabled: false,
};
