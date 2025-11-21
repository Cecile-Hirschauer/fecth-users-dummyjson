type Todo = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
};

type TodosResponse = {
    todos: Todo[];
    total: number;
    skip: number;
    limit: number;
};

const BASE_URL = "https://dummyjson.com";

async function getTodos(): Promise<Todo[]> {
    const response = await fetch(`${BASE_URL}/todos`);
    const data: TodosResponse = await response.json();
    return data.todos;
}

async function getTodo(id: number): Promise<Todo> {
    const response = await fetch(`${BASE_URL}/todos/${id}`);
    const data: Todo = await response.json();
    return data;
}

(async () => {
    const todos = await getTodos();
    console.log("Tous les todos:", todos.slice(0, 3));

    const todo = await getTodo(1);
    console.log("Todo #1:", todo);
})();
