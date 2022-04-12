import { Story } from '@storybook/react/types-6-0';

import Mouse from './component';
import type { MouseProps } from './types';

export default {
  title: 'Components/Mouse',
  component: Mouse,
};

const Template: Story<MouseProps> = (args) => <Mouse {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: 'w-5 h-5 text-blue-500',
  visible: true,
};
