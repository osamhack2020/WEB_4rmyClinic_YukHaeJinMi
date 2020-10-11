package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/osamhack2020/web_4rmyclinic_yukhaejinmi/clientStaticServer/server/env"
)

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

	reactAppHandler := http.FileServer(http.Dir(envPublicDir))
	rh := http.RedirectHandler("/", 307)
	staticHandler := http.FileServer(http.Dir(envStaticDir))

	mux.Handle("/", reactAppHandler)

	routers := []string{"/about", "/signin", "/signup", "/profile", "/counselors", "/mypage", "/csabout"}
	for _, route := range routers {
		mux.Handle(route, rh)
	}
	mux.Handle("/static", staticHandler)

	log.Fatal(http.ListenAndServe(port, mux))
}
