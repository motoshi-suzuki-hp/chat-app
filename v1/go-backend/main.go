package main

import (
	// "log"
	"net/http"
	"github.com/gorilla/mux"
	"go-backend/handlers"
	"github.com/rs/cors" 
)


func main() {
	r := mux.NewRouter()

	// ルートを登録
	handlers.RegisterRoutes(r)
	// handlers.RegisterScraperRoutes(r)

	// CORS設定
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"}, // ReactアプリのURL
		AllowedMethods:   []string{"GET", "POST"},
		AllowedHeaders:   []string{"Content-Type"},
		AllowCredentials: true,
	})

	// ハンドラーをラップ
	handler := c.Handler(r)

	http.ListenAndServe(":8080", handler)
}