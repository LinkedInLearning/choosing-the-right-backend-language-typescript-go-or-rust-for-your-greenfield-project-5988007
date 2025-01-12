run: build
	./target/release/weather 38 -77

build:
	cargo build --release

PHONY: run build