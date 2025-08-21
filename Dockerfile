# ---- build stage ----
FROM node:20-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package*.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---- run stage ----
FROM node:20-alpine
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
WORKDIR /app

# Only runtime deps
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev --no-audit --no-fund

# App artifacts
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./

USER node
EXPOSE 3000

# Basic healthcheck (works for Podman or Docker)
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s CMD wget -qO- http://localhost:3000/ || exit 1

CMD ["npm","start"]