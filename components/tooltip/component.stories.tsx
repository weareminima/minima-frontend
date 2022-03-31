import { Story } from '@storybook/react/types-6-0';

import Tooltip from './component';
import type { TooltipProps } from './types';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {},
};

const Template: Story<TooltipProps> = (args: TooltipProps) => (
  <p className="text-white">
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit
    {' '}
    <Tooltip
      {...args}
      arrow
      content={(
        <div className="px-2 py-1 text-gray-500 bg-white rounded">
          <span>Tooltip</span>
        </div>
      )}
    >
      <span className="text-blue-500 underline">HOVER ME!</span>
    </Tooltip>
    {' '}
    quisquam explicabo iure nihil, eveniet dolorum at hic voluptatem in maxime enim a aspernatur?
    {' '}
    <Tooltip
      {...args}
      arrow
      trigger="click"
      placement="bottom-end"
      content={(
        <div className="p-5 text-gray-500 bg-white rounded">
          <h2 className="text-lg text-blue-500">Title</h2>
          <p>This is a content. We could have whateveryouwant</p>
        </div>
      )}
    >
      <span className="text-blue-500 underline">CLICK ME!</span>
    </Tooltip>
    {' '}
    doloremque iusto! Sunt, dignissimos sint.
  </p>
);

export const Default = Template.bind({});

Default.args = {
  children: <span className="text-blue-500">Source name</span>,
  content: (
    <div className="p-5">
      <h2 className="text-lg text-blue-500">Title</h2>
      <p>This is a content. We could have whateveryouwant</p>
    </div>
  ),
};
