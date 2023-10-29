import { useContext } from 'react';
import { AppContext } from '../context';
import { EditingContext } from '../context';

function TodoItem({ todo }) {
	const { deleteTodo, updateTodo } = useContext(AppContext);
	const { startEditing } = useContext(EditingContext);
	return (
		<li key={todo.id}>
			<input
				type="checkbox"
				checked={todo.completed}
				onChange={() =>
					updateTodo(todo.id, {
						...todo,
						completed: !todo.completed,
					})
				}
			/>
			{todo.title}
			<button onClick={() => deleteTodo(todo.id)} className="delete">
				Удалить
			</button>
			<button onClick={() => startEditing(todo.id)} className="edit">
				Изменить
			</button>
		</li>
	);
}

export default TodoItem;
