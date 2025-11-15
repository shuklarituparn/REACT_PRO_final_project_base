import React, { useState } from 'react';
import { Input } from '../../../shared/ui/Input';
import { Button } from '../../../shared/ui/Button';

async function submitComment(previous: string | null, formData: FormData): Promise<string | null> {
    const comment = formData.get('comment') as string;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return comment ? `Комментарий отправлен: ${comment}` : null;
}

export const AddCommentForm: React.FC = () => {
    const [message, setMessage] = useState<string | null>(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsPending(true);

        const formData = new FormData(event.currentTarget);
        const result = await submitComment(message, formData);

        setMessage(result);
        setIsPending(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            {message && <p>{message}</p>}
            <Input name="comment" placeholder="Введите комментарий" />
            <Button type="submit" disabled={isPending}>
                {isPending ? 'Отправка…' : 'Отправить'}
            </Button>
        </form>
    );
};

