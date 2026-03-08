// TypeScript Demo - User Management Service
// This script demonstrates TypeScript syntax highlighting in the Ravin theme

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
  createdAt: Date;
}

interface UserInput {
  name: string;
  email: string;
}

class UserService {
  private users: Map<number, User> = new Map();
  private nextId: number = 1;

  /**
   * Create a new user
   * @param input User creation input
   * @returns Created user
   */
  createUser(input: UserInput): User {
    const user: User = {
      id: this.nextId++,
      name: input.name,
      email: input.email,
      isActive: true,
      createdAt: new Date(),
    };

    this.users.set(user.id, user);
    return user;
  }

  /**
   * Get user by ID
   * @param id User ID
   * @returns User object or undefined
   */
  getUser(id: number): User | undefined {
    return this.users.get(id);
  }

  /**
   * Update user
   * @param id User ID
   * @param updates Partial user updates
   * @returns Updated user
   */
  updateUser(id: number, updates: Partial<User>): User {
    const user = this.getUser(id);
    if (!user) {
      throw new Error(`User ${id} not found`);
    }

    Object.assign(user, updates);
    return user;
  }

  /**
   * Get all active users
   * @returns Array of active users
   */
  getActiveUsers(): User[] {
    return Array.from(this.users.values()).filter(u => u.isActive);
  }

  /**
   * Delete user
   * @param id User ID
   */
  deleteUser(id: number): void {
    this.users.delete(id);
  }
}

// Usage example
const service = new UserService();
const newUser = service.createUser({
  name: 'John Doe',
  email: 'john@example.com',
});

console.log('Created user:', newUser);
const activeUsers = service.getActiveUsers();
console.log(`Active users: ${activeUsers.length}`);
