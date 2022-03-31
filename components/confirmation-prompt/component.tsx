import { FC } from 'react';

import classnames from 'classnames';

import Button from 'components/button';
import Icon from 'components/icon';
import Modal from 'components/modal';

import type { ConfirmationPromptProps } from './types';

export const ConfirmationPrompt: FC<ConfirmationPromptProps> = ({
  title,
  description,
  open,
  dismissible = true,
  icon,
  onDismiss,
  onAccept,
  onRefuse,
}: ConfirmationPromptProps) => (
  <Modal open={open} title={title} size="narrow" dismissable={dismissible} onDismiss={onDismiss}>
    <div className="px-8 py-4">
      <div className="mt-8 text-xl font-medium text-gray-800 leading-1 sm:mt-0 sm:pr-32 font-heading">
        {title}
      </div>
      <p className="mt-4 text-sm text-gray-400 sm:pr-32">{description}</p>
      <div
        className={classnames({
          'flex justify-start items-end': true,
          'mt-10 sm:mt-12': !icon && !description,
          'mt-8': !icon && !!description,
          'mt-10 sm:mt-1': !!icon && !description,
          'mt-8 sm:-mt-2': !!icon && !!description,
        })}
      >
        <Button theme="secondary" size="base" className="flex-shrink-0 mr-5" onClick={onRefuse}>
          No
        </Button>
        <Button theme="primary" size="base" className="flex-shrink-0 sm:mr-5" onClick={onAccept}>
          Yes
        </Button>

        {icon && (
          <Icon icon={icon} className="hidden ml-auto sm:block flex-shrink-1 flex-grow-1 w-36" />
        )}
      </div>
    </div>
  </Modal>
);

export default ConfirmationPrompt;
