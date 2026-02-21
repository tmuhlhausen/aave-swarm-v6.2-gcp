# Builder stage
FROM rust:1.93 AS builder
WORKDIR /app

# System deps + libtorch (CPU 2.4.1)
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential pkg-config libssl-dev libclang-dev cmake curl unzip ca-certificates \
    && rm -rf /var/lib/apt/lists/* \
    && curl -L https://download.pytorch.org/libtorch/cpu/libtorch-cxx11-abi-shared-with-deps-2.4.1%2Bcpu.zip -o /tmp/libtorch.zip \
    && unzip /tmp/libtorch.zip -d /app/ && rm /tmp/libtorch.zip

ENV LIBTORCH=/app/libtorch
ENV LD_LIBRARY_PATH=${LIBTORCH}/lib:$LD_LIBRARY_PATH

COPY Cargo.toml Cargo.lock* ./
RUN mkdir -p src && echo 'fn main(){}' > src/main.rs && cargo build --release && rm -rf src

COPY . .
# Frontend build
COPY frontend/ ./frontend/
RUN cd frontend && npm ci --frozen-lockfile && npm run build

RUN cargo build --release

# Runtime
FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates libssl3 libgcc-s1 zlib1g && rm -rf /var/lib/apt/lists/*
COPY --from=builder /app/target/release/swarm-agents /usr/local/bin/
COPY --from=builder /app/frontend/.next /app/frontend/.next  # static serve if you add axum later
COPY --from=builder /app/libtorch /app/libtorch
ENV LD_LIBRARY_PATH=/app/libtorch/lib
EXPOSE 8080
CMD ["swarm-agents"]
