FROM rust:1.80 as builder
WORKDIR /app
COPY . .
RUN cargo build --release --features gpu

FROM nvidia/cuda:12.4.1-runtime-ubuntu22.04
COPY --from=builder /app/target/release/swarm-agents /usr/local/bin/swarm-agents
CMD ["swarm-agents"]
