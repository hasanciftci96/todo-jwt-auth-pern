export const baseURL =
    !process.env.NODE_ENV || process.env.NODE_ENV === "development"
        ? `http://localhost:7000`
        : `https://jwt-todo-backend.herokuapp.com`
