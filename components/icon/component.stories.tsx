import { Story } from '@storybook/react/types-6-0';

import CLOSE_SVG from 'svgs/close.svg';

import Icon from './component';
import { IconProps } from './types';

export default {
  title: 'Components/Icon',
  component: Icon,
};

const Template: Story<IconProps> = (args) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: 'w-5 h-5 text-blue-500',
  icon: CLOSE_SVG,
};
