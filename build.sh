sudo deno compile --target x86_64-unknown-linux-gnu --allow-read --allow-env --allow-write --allow-run --allow-net --output ./dist/uicolors-x86_linux ./src/index.ts
sudo deno compile --target x86_64-pc-windows-msvc --allow-read --allow-env --allow-write --allow-run --allow-net --output ./dist/uicolors-x86_windows ./src/index.ts
sudo deno compile --target x86_64-apple-darwin --allow-read --allow-env --allow-write --allow-run --allow-net --output ./dist/uicolors-x86_apple ./src/index.ts
sudo deno compile --target aarch64-apple-darwin --allow-read --allow-env --allow-write --allow-run --allow-net --output ./dist/uicolors-aarch64 ./src/index.ts