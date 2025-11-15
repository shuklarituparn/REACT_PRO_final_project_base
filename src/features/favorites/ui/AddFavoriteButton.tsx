import React, { FC, useState } from 'react';
import { startTransition } from 'react';
import { Button } from '../../../shared/ui/Button';

async function addFavorite(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

interface AddFavoriteButtonProps {
  productId: string;
}

export const AddFavoriteButton: FC<AddFavoriteButtonProps> = ({ productId }) => {
  const [optimisticState, setOptimistic] = useState(false);

  const handleAdd = () => {
    setOptimistic(true);
    startTransition(() => {
      addFavorite(productId).then(() => {
        setOptimistic(false);
      });
    });
  };

  return (
      <Button onClick={handleAdd} disabled={optimisticState}>
        {optimisticState ? 'Добавляется…' : 'В избранное'}
      </Button>
  );
};

