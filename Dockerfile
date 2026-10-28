FROM node:26.12.1-bookworm-slim AS frontend
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates && update-ca-certificates && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM python:3.13.10-slim-bookworm AS api
RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates curl && update-ca-certificates && rm -rf /var/lib/apt/lists/*
RUN curl -LsSf https://astral.sh/uv/install.sh | sh
ENV PATH="/root/.local/bin:$PATH"
WORKDIR /app
COPY api/pyproject.toml api/uv.lock ./api/
RUN uv sync --project api --locked --no-dev
COPY api ./api
COPY data ./data
EXPOSE 8000
CMD ["uv", "run", "--project", "api", "uvicorn", "api.main:app", "--host", "0.0.0.0", "--port", "8000"]
