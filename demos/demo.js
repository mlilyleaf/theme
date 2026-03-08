// JavaScript Demo - API Client
// This script demonstrates JavaScript syntax highlighting in the Ravin theme

const API_BASE_URL = 'https://api.example.com';
const TIMEOUT = 5000;

/**
 * Fetch user data from the API
 * @param {number} userId - The user ID
 * @returns {Promise<Object>} User data
 */
async function fetchUser(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
      timeout: TIMEOUT,
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error.message);
    throw error;
  }
}

/**
 * Process user data and generate statistics
 * @param {Array<Object>} users - Array of user objects
 * @returns {Object} Statistics summary
 */
function analyzeUsers(users) {
  const stats = {
    total: users.length,
    active: users.filter(u => u.is_active).length,
    avgAge: 0,
    groups: {},
  };

  let totalAge = 0;
  users.forEach(user => {
    totalAge += user.age;
    const group = user.department || 'unassigned';
    stats.groups[group] = (stats.groups[group] || 0) + 1;
  });

  stats.avgAge = Math.round(totalAge / users.length);
  return stats;
}

// Main execution
(async () => {
  try {
    const userId = 42;
    console.log(`Fetching user ${userId}...`);
    const user = await fetchUser(userId);
    console.log('User data:', user);
  } catch (error) {
    process.exit(1);
  }
})();
