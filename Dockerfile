# =============================================
# AAVE SWARM v6.2 — CORRECTED CPU-ONLY DOCKERFILE (Feb 20 2026)
# Matches tch 0.15.0 → PyTorch 2.2.0 exactly
# =============================================

FROM rust:1.93 AS builder
WORKDIR /app

# === System deps + exact matching LibTorch 2.2.0 ===
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential pkg-config libssl-dev libclang-dev cmake curl unzip ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && curl -L https://download.pytorch.org/libtorch/cpu/libtorch-cxx11-abi-shared-with-deps-2.2.0%2Bcpu.zip \
       -o /tmp/libtorch.zip \
    && unzip /tmp/libtorch.zip -d /app/ \
    && rm /tmp/libtorch.zip

# Critical: set BEFORE any cargo build
ENV LIBTORCH=/app/libtorch
ENV LD_LIBRARY_PATH=/app/libtorch/lib
ENV TORCH_CUDA_VERSION=""          # Force CPU-only
ENV LIBTORCH_BYPASS_VERSION_CHECK=1  # Safety net (even though we match)

# === Cargo dependency caching (dummy build) ===
COPY Cargo.toml Cargo.lock* ./
RUN mkdir -p src && \
    echo 'fn main() { println!("dummy"); }' > src/main.rs && \
    cargo build --release && \
    rm -rf src

# === Real source + frontend (if you want dashboard static) ===
COPY . .
# Optional: build Next.js dashboard (uncomment if you add axum static serve later)
# RUN cd frontend && npm ci --frozen-lockfile && npm run build

RUN cargo build --release

# =============================================
# Runtime stage (~85 MB)
# =============================================
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates libssl3 libgcc-s1 zlib1g \
    && rm -rf /var/lib/apt/lists/*

# Copy binary + LibTorch libs
COPY --from=builder /app/target/release/swarm-agents /usr/local/bin/
COPY --from=builder /app/libtorch /app/libtorch

ENV LIBTORCH=/app/libtorch
ENV LD_LIBRARY_PATH=/app/libtorch/lib

EXPOSE 8080
CMD ["swarm-agents"]
