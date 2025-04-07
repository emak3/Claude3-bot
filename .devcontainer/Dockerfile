FROM node:20

# 必要なツール（オプション）
RUN apt-get update && apt-get install -y \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
VOLUME ["/app/node_modules"]

CMD ["bash"]