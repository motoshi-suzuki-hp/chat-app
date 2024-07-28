package routes

import (
	"github.com/gorilla/mux"
	"go-backend/handlers" // Replace "your-package-path" with the actual package path
)

func RegisterRoutes(r *mux.Router) {
	handlers.RegisterRoutes(r)
}
