# === CPU-ONLY Dockerfile for Free-Tier GKE (e2-small) ===
FROM rust:1.80 AS builder
WORKDIR /app
COPY . .

# Build CPU-only — no CUDA, no GPU feature
RUN cargo build --release

# Lightweight runtime (no NVIDIA base image needed)
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/release/swarm-agents /usr/local/bin/swarm-agents

CMD ["swarm-agents"]
