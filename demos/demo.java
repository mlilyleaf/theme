public class UserManager {
    // Java Demo - User Management System
    // This script demonstrates Java syntax highlighting in the Ravin theme

    private static final String API_ENDPOINT = "https://api.example.com";
    private final List<User> users;

    public UserManager() {
        this.users = new ArrayList<>();
    }

    /**
     * Add a new user to the manager
     * @param user User object to add
     * @throws IllegalArgumentException if user is null
     */
    public void addUser(User user) throws IllegalArgumentException {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null");
        }
        users.add(user);
    }

    /**
     * Get all active users
     * @return List of active users
     */
    public List<User> getActiveUsers() {
        return users.stream()
            .filter(User::isActive)
            .collect(Collectors.toList());
    }

    /**
     * Find user by ID
     * @param id User ID
     * @return Optional containing user if found
     */
    public Optional<User> findById(int id) {
        return users.stream()
            .filter(u -> u.getId() == id)
            .findFirst();
    }

    /**
     * Calculate user statistics
     * @return Maps of statistics
     */
    public Map<String, Object> getStatistics() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", users.size());
        stats.put("activeUsers", (int) users.stream().filter(User::isActive).count());
        stats.put("averageAge", users.stream()
            .mapToInt(User::getAge)
            .average()
            .orElse(0.0));
        return stats;
    }

    /**
     * Main method
     */
    public static void main(String[] args) {
        UserManager manager = new UserManager();

        // Add sample users
        manager.addUser(new User(1, "Alice", 28, true));
        manager.addUser(new User(2, "Bob", 35, false));
        manager.addUser(new User(3, "Charlie", 42, true));

        // Display statistics
        Map<String, Object> stats = manager.getStatistics();
        System.out.println("User Statistics: " + stats);

        // Display active users
        System.out.println("Active Users:");
        manager.getActiveUsers().forEach(System.out::println);
    }
}

/**
 * User data class
 */
class User {
    private final int id;
    private final String name;
    private final int age;
    private boolean active;

    public User(int id, String name, int age, boolean active) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.active = active;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public boolean isActive() { return active; }

    @Override
    public String toString() {
        return String.format("User{id=%d, name='%s', age=%d, active=%s}",
            id, name, age, active);
    }
}
