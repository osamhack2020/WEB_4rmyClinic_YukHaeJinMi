package env

import (
	"fmt"
	"os"
)

// Env for static server
type Env struct {
	PORT string
}

// GetAppEnv from server
func GetAppEnv() Env {
	return Env{
		PORT: getLocalEnv("PORT"),
	}
}

func getLocalEnv(key string) string {
	val, exists := os.LookupEnv(key)
	if !exists {
		panic(fmt.Errorf("Environment var not provided: %s", key))
	}
	return val
}
