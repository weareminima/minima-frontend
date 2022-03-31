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
        options: ['xs', 's', 'base', 'l', 'xl'],
      },
    },
    theme: {
      control: {
        type: 'select',
        options: ['primary', 'primary-alt', 'secondary', 'secondary-alt', 'white', 'danger'],
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

export const FullWidth = Template.bind({});
FullWidth.args = {
  children: 'Button',
  disabled: false,
  className: 'w-full',
};

export const WithNextLinkProps = Template.bind({});
WithNextLinkProps.args = {
  anchorLinkProps: { shallow: true, as: 'next-link-anchor' },
  children: 'Button',
  href: '/',
};
