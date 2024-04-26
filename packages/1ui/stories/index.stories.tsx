import { Meta } from '@storybook/react';
import type { StoryFn } from '@storybook/react';

export default {
  title: '1ui: Intuition Component Library',
} as Meta;

const Template: StoryFn = () => (
  <div className="flex justify-center">
    <div className="flex flex-col items-center space-y-8 my-10">
      <h2 className="text-5xl text-center">1ui: Intuition Component Library</h2>
      <p className="text-base text-center mb-5">
        Use the sidebar to navigate to each component's Story.
      </p>
    </div>
  </div>
);

export const IntuitionComponentLibrary = Template.bind({});
