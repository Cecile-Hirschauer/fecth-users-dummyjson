import {z} from 'zod';

const BASE_URL = "https://dummyjson.com";

async function listDummy<T>(endpoint: string, schema: z.ZodType<T>): Promise<T[]> {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();
    return z.array(schema).parse(data[endpoint]);
}

const TodoSchema = z.object({
    id: z.number(),
    todo: z.string(),
    completed: z.boolean(),
    userId: z.number(),
});

type Todo = z.infer<typeof TodoSchema>;

const ProductSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    price: z.number(),
    category: z.string(),
});

type Product = z.infer<typeof ProductSchema>;

const QuoteSchema = z.object({
    id: z.number(),
    quote: z.string(),
    author: z.string(),
});

type Quote = z.infer<typeof QuoteSchema>;

const DummyUserSchema = z.object({
    id: z.number(),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string(),
});

type DummyUser = z.infer<typeof DummyUserSchema>;

(async () => {
  try {
    const todos = await listDummy("todos", TodoSchema);
    console.log("✅ Todos valides:", todos.slice(0, 2));
  } catch (error) {
    console.log("❌ Validation échouée:", error);
  }
  try {
    const products = await listDummy("products", ProductSchema);
    console.log("✅ Todos valides:", products.slice(0, 2));
  } catch (error) {
    console.log("❌ Validation échouée:", error);
  }
  try {
    const dummyUsers = await listDummy("users", DummyUserSchema);
    console.log("✅ Todos valides:", dummyUsers.slice(0, 2));
  } catch (error) {
    console.log("❌ Validation échouée:", error);
  }
})();
