use axum::extract::ws::{Message, WebSocket, WebSocketUpgrade};
use axum::response::IntoResponse;
use std::sync::Arc;
use tokio::sync::broadcast;

pub async fn ws_handler(ws: WebSocketUpgrade, tx: Arc<broadcast::Sender<String>>) -> impl IntoResponse {
    ws.on_upgrade(|socket| handle_socket(socket, tx))
}

async fn handle_socket(mut socket: WebSocket, tx: Arc<broadcast::Sender<String>>) {
    let mut rx = tx.subscribe();
    loop {
        tokio::select! {
            msg = rx.recv() => {
                if let Ok(msg) = msg {
                    let _ = socket.send(Message::Text(msg)).await;
                }
            }
            _ = socket.recv() => break,
        }
    }
}
