const BASE_URL = "https://dummyjson.com";

async function listDummy<T>(endpoint: string): Promise<T[]> {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();
    return data[endpoint] as T[];
}

type Todo = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
};

type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    category: string;
};

type Quote = {
    id: number;
    quote: string;
    author: string;
};

type DummyUser = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

(async () => {
    const todos = await listDummy<Todo>('todos');
    console.log("Todos:", todos.slice(0, 2));

    const products = await listDummy<Product>('products');
    console.log("Products:", products.slice(0, 2));

    const quotes = await listDummy<Quote>('quotes');
    console.log("Quotes:", quotes.slice(0, 2));

    const users = await listDummy<DummyUser>('users');
    console.log("Users:", users.slice(0, 2));
})();
