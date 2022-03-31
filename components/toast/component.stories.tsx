import { Story } from '@storybook/react/types-6-0';

import Toast from './component';
import type { ToastProps } from './types';

export default {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {},
};

const Template: Story<ToastProps> = (args: ToastProps) => {
  const { level } = args;

  return <Toast key={level} {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  content: 'Source name',
  level: 'success',
};
