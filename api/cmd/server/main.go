package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"api/internal/handlers"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8081"
	}

	server := &http.Server{
		Addr:              ":" + port,
		Handler:           handlers.NewMux(),
		ReadHeaderTimeout: 5 * time.Second,
	}

	log.Printf("Go API running on %s", server.Addr)
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		log.Fatal(err)
	}
}

