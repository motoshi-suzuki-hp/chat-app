package utils

import (
	"encoding/json"
	"net/http"
)

// 例: ヘルパー関数を定義
func RespondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}
