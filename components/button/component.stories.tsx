import { Story } from '@storybook/react/types-6-0';

import Icon from 'components/icon';

import CLOSE_SVG from 'svgs/close.svg';

import Button from './component';
import { ButtonProps } from './types';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['s', 'base', 'icon'],
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

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: <Icon icon={CLOSE_SVG} className="w-5 h-5 stroke-current" />,
  disabled: false,
  size: 'icon-base',
};
