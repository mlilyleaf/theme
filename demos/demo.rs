// Rust Demo - Data Structure and Methods
// This script demonstrates Rust syntax highlighting in the Ravin theme

use std::collections::HashMap;

/// Represents a person record
#[derive(Debug, Clone)]
struct Person {
    id: u32,
    name: String,
    email: String,
    age: u8,
}

impl Person {
    /// Create a new person
    fn new(id: u32, name: String, email: String, age: u8) -> Self {
        Person { id, name, email, age }
    }

    /// Get person's display name
    fn display_name(&self) -> String {
        format!("{} ({})", self.name, self.email)
    }

    /// Check if person is an adult
    fn is_adult(&self) -> bool {
        self.age >= 18
    }
}

/// Manages a collection of people
struct PersonManager {
    people: HashMap<u32, Person>,
    next_id: u32,
}

impl PersonManager {
    /// Create a new manager
    fn new() -> Self {
        PersonManager {
            people: HashMap::new(),
            next_id: 1,
        }
    }

    /// Add a person to the manager
    fn add_person(&mut self, name: String, email: String, age: u8) -> u32 {
        let id = self.next_id;
        self.next_id += 1;
        
        let person = Person::new(id, name, email, age);
        self.people.insert(id, person);
        id
    }

    /// Get a person by ID
    fn get_person(&self, id: u32) -> Option<&Person> {
        self.people.get(&id)
    }

    /// Get all adults
    fn get_adults(&self) -> Vec<&Person> {
        self.people
            .values()
            .filter(|p| p.is_adult())
            .collect()
    }

    /// Calculate average age
    fn average_age(&self) -> f32 {
        if self.people.is_empty() {
            return 0.0;
        }

        let total_age: u32 = self.people.values().map(|p| p.age as u32).sum();
        total_age as f32 / self.people.len() as f32
    }
}

fn main() {
    // Create manager and add people
    let mut manager = PersonManager::new();
    
    manager.add_person("Alice Smith".to_string(), "alice@example.com".to_string(), 28);
    manager.add_person("Bob Johnson".to_string(), "bob@example.com".to_string(), 35);
    manager.add_person("Charlie Brown".to_string(), "charlie@example.com".to_string(), 17);
    manager.add_person("Diana Prince".to_string(), "diana@example.com".to_string(), 42);

    // Display statistics
    println!("=== Person Manager Statistics ===");
    println!("Total people: {}", manager.people.len());
    println!("Average age: {:.1}", manager.average_age());
    
    // Display adults
    println!("\nAdults:");
    for person in manager.get_adults() {
        println!("  - {}", person.display_name());
    }

    // Display specific person
    if let Some(person) = manager.get_person(1) {
        println!("\nPerson 1: {:?}", person);
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_person_adult() {
        let person = Person::new(1, "Test".to_string(), "test@example.com".to_string(), 25);
        assert!(person.is_adult());
    }

    #[test]
    fn test_person_minor() {
        let person = Person::new(2, "Teen".to_string(), "teen@example.com".to_string(), 15);
        assert!(!person.is_adult());
    }
}
