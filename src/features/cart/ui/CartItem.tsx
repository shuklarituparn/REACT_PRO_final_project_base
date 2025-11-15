import React, { FC, memo, useCallback } from 'react';
import {Button} from '../../../shared/ui/Button';

export interface CartItemModel {
  id: string;
  title: string;
  quantity: number;
}

interface CartItemProps {
  item: CartItemModel;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
}

export const CartItem: FC<CartItemProps> = ({ item, onIncrease, onDecrease }) => {
  const handleIncrease = useCallback(() => onIncrease(item.id), [onIncrease, item.id]);
  const handleDecrease = useCallback(() => onDecrease(item.id), [onDecrease, item.id]);
  return (
    <div className="cart-item">
      <span>{item.title}</span>
      <Button onClick={handleDecrease}>-</Button>
      <span>{item.quantity}</span>
      <Button onClick={handleIncrease}>+</Button>
    </div>
  );
};

export default memo(CartItem);
