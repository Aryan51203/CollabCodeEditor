package api

import (
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
)

func SayHelloWorld(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello, World!"))
}

type CrossOriginServer struct{}

func (s *CrossOriginServer) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	log.Println(req.Header.Get("Origin"))
	log.Println(req.Method)

	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", origin)
		rw.Header().Set("Access-Control-Allow-Credentials", "true")
		rw.Header().Set("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE, OPTIONS")
		rw.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding")
	}
	if req.Method == "OPTIONS" {
		return
	}

	server, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}

	server.On("connection", func(so socketio.Socket) {
		log.Println("on connection")
		so.On("disconnection", func() {
			log.Println("on disconnect")
		})
	})

	server.On("error", func(so socketio.Socket, err error) {
		log.Println("error:", err)
	})

	mux := http.NewServeMux()
	mux.Handle("/socket.io", server)
	mux.HandleFunc("/", SayHelloWorld)

	mux.ServeHTTP(rw, req)
}

////

func Start() {
	log.Println("listening on :5000")
	http.ListenAndServe(":5000", &CrossOriginServer{})
}
