// package routes

// import (
// 	"github.com/gorilla/mux"
// 	"go-backend/handlers" // Replace "your-package-path" with the actual package path
// )

// func RegisterRoutes(r *mux.Router) {
// 	handlers.RegisterRoutes(r)
// }



package routes

import (
	"net/http"
	"github.com/gorilla/mux"
	"go-backend/handlers"
)

func RegisterRoutes(r *mux.Router) {
	// メインページ
	r.HandleFunc("/", mainPageHandler).Methods("GET")

	// トークページ
	r.HandleFunc("/chat", chatPageHandler).Methods("GET")

	// 管理ページ
	r.HandleFunc("/admin", adminPageHandler).Methods("GET")

	// 設定ページ
	r.HandleFunc("/settings", settingsPageHandler).Methods("GET")

	// その他のハンドラを登録
	handlers.RegisterRoutes(r)
}

func mainPageHandler(w http.ResponseWriter, r *http.Request) {
	// メインページの処理
	http.ServeFile(w, r, "static/main.html") // メインページのHTMLファイルを提供
}

func chatPageHandler(w http.ResponseWriter, r *http.Request) {
	// トークページの処理
	http.ServeFile(w, r, "static/chat.html") // トークページのHTMLファイルを提供
}

func adminPageHandler(w http.ResponseWriter, r *http.Request) {
	// 管理ページの処理
	http.ServeFile(w, r, "static/admin.html") // 管理ページのHTMLファイルを提供
}

func settingsPageHandler(w http.ResponseWriter, r *http.Request) {
	// 設定ページの処理
	http.ServeFile(w, r, "static/settings.html") // 設定ページのHTMLファイルを提供
}
