interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

interface PublicUser {
  id: string;
  email: string;
  created_at: Date | string;
}

export function toPublicUser(user: UserRecord): PublicUser {
  return {
    id: user.id,
    email: user.email,
    created_at: user.createdAt
  };
}
