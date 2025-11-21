const BASE_URL = "https://dummyjson.com";
async function getTodos() {
    const response = await fetch(`${BASE_URL}/todos`);
    const data = await response.json();
    return data.todos;
}
async function getTodo(id) {
    const response = await fetch(`${BASE_URL}/todos/${id}`);
    const data = await response.json();
    return data;
}
(async () => {
    const todos = await getTodos();
    console.log("Tous les todos:", todos.slice(0, 3));
    const todo = await getTodo(1);
    console.log("Todo #1:", todo);
})();
