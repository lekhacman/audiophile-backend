FROM node:lts-alpine

WORKDIR /app

ENV REDIS_HOST=audiophile-redis-1
ENV STORAGE_PATH=storage

COPY ./dist .

EXPOSE 3000

# Start Nginx when the container launches
CMD ["node", "bundle.min.js"]
