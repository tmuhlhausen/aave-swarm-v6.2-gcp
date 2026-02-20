# =============================================
# AAVE SWARM v6.2 — CPU-ONLY DOCKERFILE (FREE-TIER READY)
# Fixed Feb 20 2026 — handles missing Cargo.lock + edition2024
# =============================================

FROM rust:1.85 AS builder
WORKDIR /app

# === STEP 1: Copy Cargo files (Cargo.lock is OPTIONAL) ===
COPY Cargo.toml ./
COPY Cargo.lock* ./          # the * makes it optional — no error if missing

# === STEP 2: Create dummy source to cache dependencies ===
RUN mkdir -p src && \
    echo "fn main() { println!(\"dummy\"); }" > src/main.rs

# Build dependencies only (cached layer)
RUN cargo build --release

# === STEP 3: Remove dummy and copy real source ===
RUN rm -rf src

COPY . .

# Force pure CPU build (no CUDA)
ENV TORCH_CUDA_VERSION=""

# === FINAL BUILD ===
RUN cargo build --release

# =============================================
# Minimal runtime (no CUDA, ~80MB)
# =============================================
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    libssl3 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/target/release/swarm-agents /usr/local/bin/swarm-agents

EXPOSE 8080
CMD ["swarm-agents"]
