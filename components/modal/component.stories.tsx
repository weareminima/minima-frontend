import { useState } from 'react';

import { Story } from '@storybook/react/types-6-0';

import Button from 'components/button';

import Modal, { ModalProps } from './index';

export default {
  title: 'Components/Modal2',
  component: Modal,
  parameters: { actions: { argTypesRegex: '^on.*' } },
  argTypes: {
    open: {
      control: {
        disable: true,
      },
    },
    onDismiss: {
      control: {
        disable: true,
      },
    },
  },
};

const Template: Story<ModalProps> = ({ ...args }: ModalProps) => {
  const [openXS, setOpenXS] = useState(false);
  const [openS, setOpenS] = useState(false);
  const [openDefault, setOpenDefault] = useState(false);
  const [openL, setOpenL] = useState(false);
  const [openXL, setOpenXL] = useState(false);

  const [openDismissable, setOpenDismissable] = useState(false);
  const [openNotDismissable, setOpenNotDismissable] = useState(false);

  const [openScrollable, setOpenScrollable] = useState(false);
  const [openScrollable2, setOpenScrollable2] = useState(false);

  return (
    <div className="space-y-10">
      <div className="space-y-2.5">
        <h2 className="text-white">Sizes</h2>
        <div className="flex space-x-5">
          <Button theme="primary" size="base" onClick={() => setOpenXS(true)}>
            XS
          </Button>

          <Modal
            {...args}
            size="xs"
            open={openXS}
            onOpenChange={(o) => {
              setOpenXS(o);
            }}
          />

          <Button theme="primary" size="base" onClick={() => setOpenS(true)}>
            S
          </Button>

          <Modal
            {...args}
            size="s"
            open={openS}
            onOpenChange={(o) => {
              setOpenS(o);
            }}
          />

          <Button theme="primary" size="base" onClick={() => setOpenDefault(true)}>
            Default
          </Button>

          <Modal
            {...args}
            size="default"
            open={openDefault}
            onOpenChange={(o) => {
              setOpenDefault(o);
            }}
          />

          <Button theme="primary" size="base" onClick={() => setOpenL(true)}>
            L
          </Button>

          <Modal
            {...args}
            size="l"
            open={openL}
            onOpenChange={(o) => {
              setOpenL(o);
            }}
          />

          <Button theme="primary" size="base" onClick={() => setOpenXL(true)}>
            XL
          </Button>

          <Modal
            {...args}
            size="xl"
            open={openXL}
            onOpenChange={(o) => {
              setOpenXL(o);
            }}
          />
        </div>
      </div>
      <div className="space-y-2.5">
        <h2 className="text-white">Dismissable</h2>
        <div className="flex space-x-5">
          <Button theme="primary" size="base" onClick={() => setOpenDismissable(true)}>
            Dismissable
          </Button>

          <Modal
            {...args}
            size="xs"
            open={openDismissable}
            onOpenChange={(o) => {
              setOpenDismissable(o);
            }}
          />

          <Button theme="primary" size="base" onClick={() => setOpenNotDismissable(true)}>
            Not Dismissable
          </Button>

          <Modal
            {...args}
            size="xs"
            open={openNotDismissable}
            dismissable={false}
            onOpenChange={(o) => {
              setOpenNotDismissable(o);
            }}
          />
        </div>
      </div>
      <div className="space-y-2.5">
        <h2 className="text-white">Scrollable</h2>
        <div className="flex space-x-5">
          <Button theme="primary" size="base" onClick={() => setOpenScrollable(true)}>
            Scrollable
          </Button>

          <Modal
            {...args}
            size="default"
            open={openScrollable}
            onOpenChange={(o) => {
              setOpenScrollable(o);
            }}
          >
            <div className="flex flex-col py-10 space-y-5 overflow-auto grow">
              <h1 className="px-10 text-xl font-medium">Modal content</h1>
              <div className="px-10 grow">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu
                  imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex.
                  Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed ac
                  iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                </p>
              </div>
            </div>
          </Modal>

          <Button theme="primary" size="base" onClick={() => setOpenScrollable2(true)}>
            Scrollable fixed header
          </Button>

          <Modal
            {...args}
            size="default"
            open={openScrollable2}
            onOpenChange={(o) => {
              setOpenScrollable2(o);
            }}
          >
            <div className="flex flex-col py-10 overflow-hidden grow">
              <h1 className="px-10 text-xl font-medium">Modal content</h1>
              <div className="relative flex flex-col overflow-hidden grow">
                <div className="absolute left-0 z-10 w-full h-5 pointer-events-none -top-1 bg-gradient-to-b from-white via-white" />
                <div className="flex flex-col px-10 py-5 overflow-x-hidden overflow-y-auto grow">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est,
                    eu imperdiet elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla
                    ex. Quisque consectetur diam in massa egestas, vitae posuere magna semper. Sed
                    ac iaculis purus, at pretium tellus. Duis non commodo lorem, non tincidunt ex.
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 z-10 w-full h-5 pointer-events-none bg-gradient-to-t from-white via-white" />
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export const Default: Story<ModalProps> = Template.bind({});
Default.args = {
  title: 'Modal component',
  dismissable: true,
  children: (
    <div className="p-10">
      <h1 className="mb-5 text-xl font-medium">Modal content</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean at sodales est, eu imperdiet
        elit. Suspendisse eget diam accumsan, lacinia odio nec, fringilla ex. Quisque consectetur
        diam in massa egestas, vitae posuere magna semper. Sed ac iaculis purus, at pretium tellus.
        Duis non commodo lorem, non tincidunt ex.
      </p>
    </div>
  ),
};
