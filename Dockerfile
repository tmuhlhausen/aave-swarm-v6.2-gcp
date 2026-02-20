# CPU-ONLY Dockerfile for Free-Tier GKE (e2-small)
FROM rust:1.80 AS builder
WORKDIR /app
COPY . .

# Force pure CPU build (prevents any CUDA download)
ENV TORCH_CUDA_VERSION=""

RUN cargo build --release

# Lightweight runtime image (no NVIDIA/CUDA needed)
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/release/swarm-agents /usr/local/bin/swarm-agents

CMD ["swarm-agents"]
