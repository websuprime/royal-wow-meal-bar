# One container: the Fastify API also serves the built React app (FRONTEND_DIST).
FROM node:22-bookworm-slim AS frontend
WORKDIR /app/frontend
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM node:22-bookworm-slim AS server
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci
COPY server/ ./
RUN npm run build && npm prune --omit=dev

FROM node:22-bookworm-slim
WORKDIR /app/server
ENV NODE_ENV=production
ENV PORT=3001
ENV FRONTEND_DIST=/app/frontend/dist
COPY --from=server /app/server/package.json ./
COPY --from=server /app/server/node_modules ./node_modules
COPY --from=server /app/server/dist ./dist
COPY --from=frontend /app/frontend/dist /app/frontend/dist
RUN mkdir -p uploads/menu
EXPOSE 3001
CMD ["node", "dist/index.js"]
