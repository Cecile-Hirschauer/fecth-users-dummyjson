type Column = {
    type: string;
    name: string;
};

type CellRenderer = (value: any, columnName: any) => string;

function renderMarkdownTable(columns: Column[], rows: any[], cellRenderer: CellRenderer): string {
    if (columns.length === 0) {
        return "";
    }

    const headers = columns.map((col) => col.name).join(" | ");
    const separator = columns.map(() => "---").join(" | ");
    const dataRows = rows.map((row) => {
        return columns
            .map((col, index) => {
                const value = row[col.name];
                return cellRenderer(value, col.name);
            })
            .join(" | ");
    });

    // Assemblage final
    return [headers, separator, ...dataRows].join("\n");
}

// Exemple d'utilisation
const columns = [
    {type: "int4", name: "id"},
    {type: "text", name: "title"},
];

type MyRow = {
    id: number;
    title: string;
};

const rows: MyRow[] = [
    {id: 1, title: "Bonjour"},
    {id: 2, title: "Au revoir"},
];

const result = renderMarkdownTable(columns, rows, (value, columnName) => {
    // Exemple : formater les IDs avec un préfixe
    if (columnName === "id") {
        return `#${value}`;
    }
    // Exemple : mettre les titres en majuscules
    if (columnName === "title") {
        return `"${value}"`;
    }
    return value.toString();
});

console.log(result);