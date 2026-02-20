# =============================================
# AAVE SWARM v6.2 — CPU-ONLY DOCKERFILE (FREE-TIER READY)
# FINAL FIXED VERSION — Feb 20 2026
# Uses Rust 1.93 (current stable) + robust Cargo.lock handling
# =============================================

FROM rust:1.93 AS builder
WORKDIR /app

# Copy Cargo files (Cargo.lock is optional — no error if missing)
COPY Cargo.toml ./
COPY Cargo.lock* ./

# Create dummy source to cache dependencies only
RUN mkdir -p src && \
    echo "fn main() { println!(\"dummy\"); }" > src/main.rs

# Build dependencies (cached layer)
RUN cargo build --release

# Remove dummy source
RUN rm -rf src

# Copy real source code
COPY . .

# Force pure CPU build (no CUDA)
ENV TORCH_CUDA_VERSION=""

# Final build
RUN cargo build --release

# =============================================
# Minimal runtime (~80MB, no NVIDIA)
# =============================================
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/release/swarm-agents /usr/local/bin/swarm-agents

EXPOSE 8080
CMD ["swarm-agents"]
