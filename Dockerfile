FROM node:lts-alpine

WORKDIR /app

COPY ./dist .

EXPOSE 3000

# Start Nginx when the container launches
CMD ["node", "bundle.min.js"]
