package handlers

import (
	"encoding/json"
	"net/http"
	"sync"

	"github.com/gorilla/mux"
)

type Message struct {
	ID      int    `json:"id"`
	Content string `json:"content"`
	Type    string `json:"type"` // "text", "image", "video", "audio"など
}

var messages []Message



type BlogPost struct {
	Title string `json:"title"`
	Date  string `json:"date"`
	Image string `json:"image"`
}

var blogPosts []BlogPost

var mu sync.Mutex

// 初期メッセージの追加
func init() {
	messages = []Message{
		{ID: 1, Content: "ようこそ！これは初期メッセージです。", Type: "text"},
		{ID: 2, Content: "/initImage.png", Type: "image"}, // 初期画像のパス
	}

	blogPosts = []BlogPost{
		{Title: "夏はまだ始まったばかりなのに", Date: "2024/07/26 18:34", Image: "https://www.nogizaka46.com/files/46/diary/n46/MEMBER/moblog/202407/mobTI31Jg.jpg"},
		{Title: "貴方の今に閃きたい", Date: "2024/07/06 20:55", Image: "https://www.nogizaka46.com/files/46/diary/n46/MEMBER/moblog/202407/mobdTyNID.jpg"},
		{Title: "生まれ変わる", Date: "2024/06/14 19:03", Image: "https://www.nogizaka46.com/files/46/diary/n46/MEMBER/moblog/202406/mobw3nbPi.jpg"},
		{Title: "ロック", Date: "2024/06/09 16:13", Image: "https://www.nogizaka46.com/files/46/diary/n46/MEMBER/moblog/202406/mobcCLQyk.jpg"},
		{Title: "何度だって", Date: "2024/05/31 20:11", Image: "https://www.nogizaka46.com/files/46/diary/n46/MEMBER/moblog/202405/mobaAB2Hu.jpg"},
		{Title: "夢で逢いましょう", Date: "2024/05/26 15:09", Image: "https://www.nogizaka46.com/files/46/diary/n46/MEMBER/moblog/202405/mobe6JbQX.jpg"},
		{Title: "写メ😸", Date: "2024/05/10 20:02", Image: "https://www.nogizaka46.com/files/46/diary/n46/MEMBER/moblog/202405/mobE0Qv60.jpg"},
		{Title: "カラオケ行こ", Date: "2024/04/14 21:04", Image: "https://www.nogizaka46.com/files/46/diary/n46/MEMBER/moblog/202404/mobjiQ3OV.jpg"},
		// 追加のサンプルデータ
	}
}

// メッセージを取得するハンドラー
func GetMessages(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	mu.Lock()
	defer mu.Unlock()
	json.NewEncoder(w).Encode(messages)
}

// メッセージを保存するハンドラー
func CreateMessage(w http.ResponseWriter, r *http.Request) {
	var msg Message
	err := json.NewDecoder(r.Body).Decode(&msg)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	mu.Lock()
	msg.ID = len(messages) + 1
	messages = append(messages, msg)
	mu.Unlock()
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(msg)
}

// ブログ投稿を取得するハンドラー
func GetBlogPosts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	mu.Lock()
	defer mu.Unlock()
	json.NewEncoder(w).Encode(blogPosts)
}

func RegisterRoutes(r *mux.Router) {
	r.HandleFunc("/api/messages", GetMessages).Methods("GET")
	r.HandleFunc("/api/messages", CreateMessage).Methods("POST")

	r.HandleFunc("/api/blogposts", GetBlogPosts).Methods("GET")

}
