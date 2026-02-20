use std::sync::Arc;
use tokio::time::{sleep, Duration};
use log::info;

mod orchestrator;
mod agents;

#[tokio::main(flavor = "multi_thread", worker_threads = 16)]
async fn main() {
    env_logger::init();
    info!("🚀 Aave Swarm v6.2 starting in northamerica-northeast2 (Toronto)...");

    let orchestrator = Arc::new(orchestrator::SwarmOrchestrator::new().await);
    tokio::spawn(orchestrator.clone().run_control_loop());

    // Keep the main process alive
    loop {
        sleep(Duration::from_secs(60)).await;
    }
}
