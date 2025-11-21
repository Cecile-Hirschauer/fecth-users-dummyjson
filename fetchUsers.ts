interface Users {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    phone: string;
    username: string;
    image: string;
}

interface UsersResponse {
    users: Users[];
    total: number;
    skip: number;
    limit: number;
}

const fetchUsers = async (): Promise<UsersResponse> => {
    const response = await fetch("https://dummyjson.com/users");

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    return response.json();
};

const userClient = {
    getAll: fetchUsers,

    getById: async (id: number): Promise<User> => {
        const response = await fetch(`https://dummyjson.com/users/${id}`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json();
    },

    search: async (query: string): Promise<UsersResponse> => {
        const response = await fetch(`https://dummyjson.com/users/search?q=${query}`);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        return response.json();
    }
};

(async () => {
    try {
        const user = await userClient.getById(1);
        console.log(user);
    } catch (error) {
        console.error("Erreur:", error);
    }
})();