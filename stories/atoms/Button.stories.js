import { Button } from '../../src';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button,
  args: {
    children: 'Button'
   },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary = {
  args: {
    type: 'primary',
    children: 'Primary'
  },
};

export const Secondary = {
  args: {
    type: 'secondary',
    children: 'Secondary'
  },
};
export const Tertiary = {
  args: {
    type: 'tertiary',
    children: 'Tertiary'
  },
};

export const Quaternary = {
  args: {
    type: 'quaternary',
    children: 'Quaternary'
  },
};

export const Quinary = {
  args: {
    type: 'quinary',
    children: 'Quinary'
  },
};

export const Large = {
  args: {
    size: 'large',
    children: 'Button'
  },
};

export const Small = {
  args: {
    size: 'small',
    children: 'Button'
  },
};

export const Warning = {
  args: {
    type: 'quinary',
    children: 'Delete now',
    backgroundColor: 'red',
  }
};
