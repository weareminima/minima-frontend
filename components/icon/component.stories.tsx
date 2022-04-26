import { Story } from '@storybook/react/types-6-0';

import DOWNLOAD_SVG from 'svgs/cursor.svg';

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
  icon: DOWNLOAD_SVG,
};
