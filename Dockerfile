# =============================================
# AAVE SWARM v6.2 — CPU-ONLY DOCKERFILE (FREE-TIER READY)
# Updated Feb 20 2026 — uses Rust 1.85+ for edition2024 support
# =============================================

FROM rust:1.85 AS builder
WORKDIR /app

# Copy only dependency files first (better caching)
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -rf src

# Now copy full source
COPY . .

# Force pure CPU build
ENV TORCH_CUDA_VERSION=""

# Build the actual binary
RUN cargo build --release

# =============================================
# Minimal runtime image (no CUDA, ~80MB final size)
# =============================================
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/release/swarm-agents /usr/local/bin/swarm-agents

EXPOSE 8080
CMD ["swarm-agents"]
