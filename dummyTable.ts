import { z } from 'zod';

const BASE_URL = "https://dummyjson.com";

async function listDummy<T>(endpoint: string, schema: z.ZodType<T>): Promise<T[]> {
    const response = await fetch(`${BASE_URL}/${endpoint}`);
    const data = await response.json();
    return z.array(schema).parse(data[endpoint]);
}

function renderMarkdownTable<T extends Record<string, unknown>>(
    data: T[],
    columns?: (keyof T)[]
): string {
    if (data.length === 0) return "";

    const cols = columns ?? (Object.keys(data[0]) as (keyof T)[]);

    const header = `| ${cols.join(" | ")} |`;
    const separator = `| ${cols.map(() => "---").join(" | ")} |`;
    const rows = data.map(row =>
        `| ${cols.map(col => String(row[col])).join(" | ")} |`
    );

    return [header, separator, ...rows].join("\n");
}

const TodoSchema = z.object({
    id: z.number(),
    todo: z.string(),
    completed: z.boolean(),
    userId: z.number(),
});

const ProductSchema = z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    category: z.string(),
});

type Todo = z.infer<typeof TodoSchema>;
type Product = z.infer<typeof ProductSchema>;

(async () => {
    const todos = await listDummy("todos", TodoSchema);
    console.log("=== TODOS ===");
    console.log(renderMarkdownTable(todos.slice(0, 5), ["id", "todo", "completed"]));

    const products = await listDummy("products", ProductSchema);
    console.log("\n=== PRODUCTS ===");
    console.log(renderMarkdownTable(products.slice(0, 5), ["id", "title", "price"]));
})();
