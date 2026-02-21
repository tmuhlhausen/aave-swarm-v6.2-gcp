use rand::Rng;
use serde::Serialize;

#[derive(Clone, Serialize)]
pub struct Agent {
    pub id: u32,
    pub profit: f64,
    pub status: String,
}

pub fn get_agents() -> Vec<Agent> {
    let mut rng = rand::thread_rng();
    vec![
        Agent { id: 0, profit: rng.gen_range(-500.0..3000.0), status: if rng.gen_bool(0.8) { "ACTIVE".into() } else { "IDLE".into() } },
        Agent { id: 1, profit: rng.gen_range(-500.0..3000.0), status: if rng.gen_bool(0.8) { "ACTIVE".into() } else { "IDLE".into() } },
        Agent { id: 2, profit: rng.gen_range(-500.0..3000.0), status: if rng.gen_bool(0.8) { "ACTIVE".into() } else { "IDLE".into() } },
        Agent { id: 3, profit: rng.gen_range(-500.0..3000.0), status: if rng.gen_bool(0.8) { "ACTIVE".into() } else { "IDLE".into() } },
        Agent { id: 4, profit: rng.gen_range(-500.0..3000.0), status: if rng.gen_bool(0.8) { "ACTIVE".into() } else { "IDLE".into() } },
    ]
}
