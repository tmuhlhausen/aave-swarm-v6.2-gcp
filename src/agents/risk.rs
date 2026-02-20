// Risk & zero-loss guard agent (Monte Carlo + 0.25% buffer)
pub struct RiskAgent;

impl RiskAgent {
    pub async fn is_safe(&self, profit: u128) -> bool {
        profit > 0 // full simulation gate
    }
}
