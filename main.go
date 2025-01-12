package main

import (
	"fmt"
	"log"
	"net/http"
	"sync"
)

var count int
var mutex = &sync.Mutex{}

// incrementCount is an http.HandlerFunc that increments the global count
// and writes the new count to the response
func incrementCount(w http.ResponseWriter, r *http.Request) {
	// log the request method and path to the console
	log.Printf("%s %s", r.Method, r.URL.Path)

	// browsers will fetch /favicon.ico and this will increment the count twice on every page load
	// this guard clause will ensure that the count is only incremented when the path is exactly "/"
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}

	// we use a mutex to ensure that the count is only incremented by one goroutine at a time, despite being global
	mutex.Lock()
	// defer will unlock the mutex after the function returns
	defer mutex.Unlock()
	count++
	fmt.Fprintf(w, "count: %d", count)
}

// program entrypoint
func main() {
	http.HandleFunc("/", incrementCount)
	http.ListenAndServe(":8080", nil)
}
