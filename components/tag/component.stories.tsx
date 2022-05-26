import { Story } from '@storybook/react/types-6-0';

import Tag from './component';
import type { TagProps } from './types';

export default {
  title: 'Components/Tag',
  component: Tag,
};

const Template: Story<TagProps> = (args) => <Tag {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Tag',
};
