// Go Demo - HTTP Server with Request Handler
// This script demonstrates Go syntax highlighting in the Ravin theme

package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

const (
	ServerPort = ":8080"
	Timeout    = 30 * time.Second
)

// Response represents an API response
type Response struct {
	Status    int       `json:"status"`
	Message   string    `json:"message"`
	Timestamp time.Time `json:"timestamp"`
	Data      any       `json:"data,omitempty"`
}

// User represents a user record
type User struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	Email     string `json:"email"`
	CreatedAt time.Time `json:"created_at"`
}

// UserHandler handles user-related requests
func UserHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	switch r.Method {
	case http.MethodGet:
		handleGetUsers(w, r)
	case http.MethodPost:
		handleCreateUser(w, r)
	default:
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}

// handleGetUsers retrieves all users
func handleGetUsers(w http.ResponseWriter, r *http.Request) {
	users := []User{
		{ID: 1, Name: "Alice", Email: "alice@example.com", CreatedAt: time.Now()},
		{ID: 2, Name: "Bob", Email: "bob@example.com", CreatedAt: time.Now()},
		{ID: 3, Name: "Charlie", Email: "charlie@example.com", CreatedAt: time.Now()},
	}

	response := Response{
		Status:    http.StatusOK,
		Message:   "Users retrieved successfully",
		Timestamp: time.Now(),
		Data:      users,
	}

	json.NewEncoder(w).Encode(response)
}

// handleCreateUser creates a new user
func handleCreateUser(w http.ResponseWriter, r *http.Request) {
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		response := Response{
			Status:    http.StatusBadRequest,
			Message:   "Invalid request body",
			Timestamp: time.Now(),
		}
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(response)
		return
	}

	user.ID = 4
	user.CreatedAt = time.Now()

	response := Response{
		Status:    http.StatusCreated,
		Message:   "User created successfully",
		Timestamp: time.Now(),
		Data:      user,
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(response)
}

// main starts the HTTP server
func main() {
	fmt.Printf("Starting server on %s\n", ServerPort)

	http.HandleFunc("/users", UserHandler)
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, `{"status":"healthy"}`)
	})

	server := &http.Server{
		Addr:         ServerPort,
		Handler:      http.DefaultServeMux,
		ReadTimeout:  Timeout,
		WriteTimeout: Timeout,
	}

	if err := server.ListenAndServe(); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}
