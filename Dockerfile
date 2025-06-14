# Builder image
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .


# Final image
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app /app

EXPOSE 8080

CMD ["node", "index.js"]