package main

import (
	"log"
	"myapp/middleware"
	"myapp/routes"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Load environment variables
	if os.Getenv("NODE_ENV") != "production" {
		if err := godotenv.Load(); err != nil {
			log.Fatal("Error loading .env file")
		}
	}

	// Get the port from environment variables, default to 3000
	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	// Create a new Echo instance
	e := echo.New()

	// Middleware for CORS and JSON parsing
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"}, // Update with specific origins as needed
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	// Static files middleware (for serving files from "public" folder)
	e.Static("/public", "public")

	// Register routes
	routes.RegisterRoutes(e)

	// Error handler middleware
	e.HTTPErrorHandler = middleware.ErrorHandler

	// Start server
	log.Printf("Running on port %s", port)
	if err := e.Start(":" + port); err != nil {
		log.Fatal(err)
	}
}
