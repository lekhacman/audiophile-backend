FROM node:lts-alpine

WORKDIR /app

ENV REDIS_HOST=redis

COPY ./dist .

EXPOSE 3000

# Start Nginx when the container launches
CMD ["node", "bundle.min.js"]
