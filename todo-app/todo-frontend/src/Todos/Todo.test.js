import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Todo from './Todo'

test('Todo test', () => {
    const todo = {
        text: 'test',
        done: false,
        _id: '620e160257a1a26357b6ae25'
    }

    const onClickDelete = jest.fn();
    const onClickComplete = jest.fn();

    const component = render(
        <Todo todo={todo} onClickDelete={onClickDelete} onClickComplete={onClickComplete} />
    )

    const todoCon = component.container

    expect(todoCon).toHaveTextContent("test")
});
