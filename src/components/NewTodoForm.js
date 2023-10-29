import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context';

function NewTodoForm() {
	const { addTodo } = useContext(AppContext);
	const [newTodoText, setNewTodoText] = useState('');

	const handleAddTodo = () => {
		if (newTodoText.trim() !== '') {
			addTodo(newTodoText);
			setNewTodoText('');
		}
	};

	return (
		<div className="add-todo">
			<input
				type="text"
				placeholder="Новая задача..."
				value={newTodoText}
				onChange={(e) => setNewTodoText(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						handleAddTodo();
					}
				}}
			/>
			<button onClick={handleAddTodo}>Добавить</button>
		</div>
	);
}

export default NewTodoForm;
