# ==============================================================================
# BotRoom Marketing & SEO Website - Production Dockerfile for Coolify
# Optimized for restricted/filtered internet environments (Iran servers):
# - Zero runtime or build-time calls to Google Fonts (Vazirmatn is bundled locally)
# - Zero apk add calls inside Alpine (uses built-in Node 20 fetch for HEALTHCHECK)
# - Supports overriding NODE_IMAGE and NPM_REGISTRY via Coolify Build Arguments
# ==============================================================================

ARG NODE_IMAGE=node:20-alpine
ARG NPM_REGISTRY=https://registry.npmjs.org

# ------------------------------------------------------------------------------
# Stage 1: Install dependencies
# ------------------------------------------------------------------------------
FROM ${NODE_IMAGE} AS deps
ARG NPM_REGISTRY
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json package-lock.json* .npmrc* ./

RUN npm config set registry "${NPM_REGISTRY}" && \
    npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000 && \
    if [ -f package-lock.json ]; then \
      npm ci --no-audit --no-fund; \
    else \
      npm install --no-audit --no-fund; \
    fi

# ------------------------------------------------------------------------------
# Stage 2: Build Next.js standalone bundle
# ------------------------------------------------------------------------------
FROM ${NODE_IMAGE} AS builder
WORKDIR /app

ARG NEXT_PUBLIC_SITE_URL=https://botroom.ir
ARG NEXT_PUBLIC_APP_URL=https://app.botroom.ir

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# ------------------------------------------------------------------------------
# Stage 3: Minimal production runner
# ------------------------------------------------------------------------------
FROM ${NODE_IMAGE} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then((r)=>{if(!r.ok)process.exit(1)}).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
