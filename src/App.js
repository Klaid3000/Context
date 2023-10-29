import { useState } from 'react';
import SearchAndSort from './components/SearchAndSort';
import NewTodoForm from './components/NewTodoForm';
import TodoItem from './components/TodoItem';
import EditTodoForm from './components/EditTodoForm';
import './App.css';
import useTodos from './hooks/useTodos';
import useEditing from './hooks/useEditing';
import { AppContext } from './context';
import { EditingContext } from './context';

function App() {
	const todosData = useTodos();
	const todosEditing = useEditing();
	const [searchText, setSearchText] = useState('');
	const [sortAlphabetically, setSortAlphabetically] = useState(false);

	const handleSearch = (event) => {
		setSearchText(event.target.value);
	};

	const toggleSort = () => {
		setSortAlphabetically(!sortAlphabetically);
	};

	const sortedTodos = [...todosData.todos];
	if (sortAlphabetically) {
		sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
	}

	const filteredTodos = sortedTodos.filter((todo) =>
		todo.title.toLowerCase().includes(searchText.toLowerCase()),
	);

	return (
		<AppContext.Provider value={todosData}>
			<div className="App">
				<div className="container">
					<h1>Список задач</h1>
					<SearchAndSort
						searchText={searchText}
						handleSearch={handleSearch}
						sortAlphabetically={sortAlphabetically}
						toggleSort={toggleSort}
					/>
					<EditingContext.Provider value={todosEditing}>
						<NewTodoForm />
						<ul>
							{filteredTodos.map((todo) => (
								<TodoItem key={todo.id} todo={todo} />
							))}
						</ul>
						{todosEditing.editingTodoId !== null && (
							<EditTodoForm
								todo={todosData.todos.find(
									(todo) => todo.id === todosEditing.editingTodoId,
								)}
							/>
						)}
					</EditingContext.Provider>
				</div>
			</div>
		</AppContext.Provider>
	);
}

export default App;
