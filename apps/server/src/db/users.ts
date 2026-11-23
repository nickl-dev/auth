export interface User {
  id: string;
  email: string;
  password_hash: string;
  created_at: Date | string;
}

export interface CreateUserInput {
  email: string;
  password_hash: string;
}

export const users: User[] = [
  // {
  //   id: "7b1e4c52-3a9d-4f60-9c1e-2d8a5f3b6e01",
  //   email: "alice@example.com",
  //   password_hash:
  //     "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy",
  //   created_at: "2026-01-15T09:30:00.000Z"
  // },
  // {
  //   id: "c3d9a1f7-5b24-4e88-8a0f-6e1b7c9d4a22",
  //   email: "bob@example.com",
  //   password_hash:
  //     "$2b$10$wE9sKq1vYhT3mZr5uPjN0.Lx4cV8bF2aQdG7iHnOtU6yRzS1kXe3C",
  //   created_at: "2026-02-03T14:12:45.000Z"
  // },
  // {
  //   id: "f08e2b6d-9c13-4a57-b3d4-1a5e8c7f9b33",
  //   email: "carol@example.com",
  //   password_hash:
  //     "$2b$10$Zt7XhB4nKp2VqW9eRmL5uOa1YcJ6dFgS3iHxN8bTvQeU0wMzA2kPy",
  //   created_at: "2026-03-21T18:45:10.000Z"
  // }
];
