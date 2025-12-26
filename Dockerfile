# ---- build stage ----
FROM docker.io/oven/bun:1.3.5-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
ENV HUSKY=0
COPY package.json bun.lock* ./
# `bun install` runs lifecycle scripts (including our `prepare` script). Ensure the
# script exists in the image before installing dependencies.
COPY scripts/ ./scripts/
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

# ---- run stage ----
FROM docker.io/oven/bun:1.3.5-alpine
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HUSKY=0
ENV PORT=3000
WORKDIR /app

# Runtime utilities needed by healthcheck
RUN apk add --no-cache curl

# Only runtime deps
COPY --from=build /app/package.json /app/bun.lock* ./
# Same rationale as build stage: keep `scripts/prepare-husky.js` available so the
# `prepare` script doesn't fail during install.
COPY --from=build /app/scripts ./scripts
RUN bun install --frozen-lockfile --production

# App artifacts
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/next.config.js ./

# Next.js may write runtime caches (e.g. Image Optimization) under `.next/cache`.
# Ensure the non-root runtime user can write there.
RUN mkdir -p /app/.next/cache/images && chown -R bun:bun /app/.next

USER bun
EXPOSE 3000

# Basic healthcheck (works for Podman or Docker)
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s CMD curl -fsS http://localhost:3000/ || exit 1

CMD ["bun", "run", "start"]