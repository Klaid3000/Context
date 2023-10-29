import { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context';
import { EditingContext } from '../context';

function EditTodoForm({ todo }) {
	const [editingTodoText, setEditingTodoText] = useState(todo.title);
	const { updateTodo } = useContext(AppContext);
	const { finishEditing } = useContext(EditingContext);

	const handleSaveEditedTodo = () => {
		if (editingTodoText.trim() !== '') {
			updateTodo(todo.id, { title: editingTodoText });
			finishEditing();
		}
	};

	return (
		<div className="edit-todo">
			<input
				type="text"
				placeholder="Внесите изменения..."
				value={editingTodoText}
				onChange={(e) => setEditingTodoText(e.target.value)}
			/>
			<button onClick={handleSaveEditedTodo}>Сохранить изменения</button>
			<button onClick={finishEditing}>Отмена</button>
		</div>
	);
}

export default EditTodoForm;
