use axum::{extract::Json, routing::post, Router};
use serde_json::Value;
use socketioxide::{extract::SocketRef, SocketIo};
use std::sync::Arc;
use tower::ServiceBuilder;
use tower_http::cors::{Any, CorsLayer}; // Correctly import CORS middleware
use tracing::info;
use tracing_subscriber::FmtSubscriber;

pub async fn start_server() -> Result<(), Box<dyn std::error::Error>> {
    // Initialize tracing for logging
    tracing::subscriber::set_global_default(FmtSubscriber::default())?;

    // Create the Socket.IO layer and shared instance
    let (layer, io) = SocketIo::new_layer();
    let io = Arc::new(io);

    // Register a handler for the default namespace
    io.clone().ns("/", |s: SocketRef| {
        info!("Socket.IO connected: {:?} {:?}", s.ns(), s.id);
    });

    // Clone `io` for use in the POST handler
    let io_for_post = io.clone();

    // Define CORS middleware and wrap it with ServiceBuilder
    let cors = CorsLayer::new()
        .allow_origin(Any) // Allow all origins (use a specific origin in production)
        .allow_methods(Any) // Allow all methods (GET, POST, etc.)
        .allow_headers(Any); // Allow all headers

    // This code is used to integrates other tower layers before or after Socket.IO such as CORS
    let layer = ServiceBuilder::new()
        .layer(cors.clone()) // Enable CORS policy
        .layer(layer); // Mount Socket.IO

    // Create the Axum application
    let app = Router::new()
        .route(
            "/",
            post(move |Json(payload): Json<Value>| {
                let io = io_for_post.clone();
                async move {
                    // Emit the payload to all connected clients
                    io.emit("newdata", &payload.to_string()).await.ok();
                    "Message emitted to clients"
                }
            }),
        )
        .layer(cors)
        .layer(layer); // Add CORS middleware

    info!("Starting server on 0.0.0.0:3000");

    // Bind and run the server
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();

    Ok(())
}
