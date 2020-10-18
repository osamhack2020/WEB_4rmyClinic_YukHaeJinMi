package main

import (
	"fmt"
	"log"
	"net/http"

	// "database/sql"

	"github.com/osamhack2020/web_4rmyclinic_yukhaejinmi/client/server/env"
)

// type Service struct {
// 	db *sql.DB
// }

const (
	envPublicDir = "web"
	envStaticDir = "web/static"
	envIndexFile = "index.html"
)

func main() {
	env := env.GetAppEnv()
	port := fmt.Sprintf(":%s", env.PORT)
	fmt.Printf("PORT%s\n", port)

	mux := http.NewServeMux()

	rh := http.RedirectHandler("/", 307)
	craHandler := http.FileServer(http.Dir(envPublicDir))
	staticHandler := http.FileServer(http.Dir(envStaticDir))

	mux.Handle("/", craHandler)
	routes := []string{"/about", "/signin", "/signup", "/profile", "/counselors", "/counselor", "/posts", "/post"}
	for _, route := range routes {
		mux.Handle(route, rh)
	}
	mux.Handle("/static", staticHandler)

	log.Fatal(http.ListenAndServe(port, mux))
}
