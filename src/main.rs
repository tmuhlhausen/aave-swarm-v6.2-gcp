mod ws;   // we'll create this next

use axum::{routing::get, Router};
use std::sync::Arc;
use tokio::sync::broadcast;

#[tokio::main]
async fn main() {
    let (tx, _rx) = broadcast::channel::<String>(100);
    let tx = Arc::new(tx);

    // === LIVE DATA BROADCAST (every 2 seconds) ===
    let tx_clone = tx.clone();
    tokio::spawn(async move {
        loop {
            let live_data = serde_json::json!({
                "timestamp": chrono::Utc::now().timestamp(),
                "agents": [
                    {"id": 0, "profit": 2847.33, "status": "ACTIVE"},
                    {"id": 1, "profit": -124.50, "status": "IDLE"},
                    {"id": 2, "profit": 912.75, "status": "ACTIVE"},
                    {"id": 3, "profit": 45.20, "status": "ACTIVE"},
                    {"id": 4, "profit": -678.90, "status": "IDLE"}
                ],
                "synergy": 96.4
            }).to_string();

            let _ = tx_clone.send(live_data);
            tokio::time::sleep(tokio::time::Duration::from_secs(2)).await;
        }
    });

    let app = Router::new()
        .route("/ws", get(move |ws| ws::ws_handler(ws, tx.clone())))
        .route("/", get(|| async { "Aave Swarm WebSocket Ready 🚀" }));

    println!("🚀 Swarm + WebSocket running on :8080");
    axum::Server::bind(&"0.0.0.0:8080".parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
