import {
  FC,
} from 'react';

import cx from 'classnames';

interface AnswerProps {
  text: string;
}

export const Answer: FC<AnswerProps> = ({
  text,
}: AnswerProps) => {
  return (
    <div className="flex justify-end">
      <div
        className={cx({
          'inline-flex items-center rounded-3xl h-10 px-4 max-w-full overflow-hidden whitespace-nowrap border border-dark/10 text-sm': true,
        })}
        style={{
          borderRadius: '24px 24px 4px 24px',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default Answer;
