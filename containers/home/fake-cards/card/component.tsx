import {
  FC,
} from 'react';

interface FakeCardProps {
  id: string;
}

export const FakeCard: FC<FakeCardProps> = ({
  id,
}: FakeCardProps) => {
  return (
    <div
      key={id}
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
};

export default FakeCard;
