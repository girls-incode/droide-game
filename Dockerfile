### Build ###
FROM node:14.18.3-slim as build

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . ./
RUN npm run build

### Integration ###
FROM node:14.18.3-slim as integration

WORKDIR /app

COPY --from=build /app/dist/ /app/dist/
COPY --from=build /app/.env.integration /app/.env.integration
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 8888
CMD npm run start:integration

### Production ###
FROM node:14.18.3-slim as production

WORKDIR /app

COPY --from=build /app/dist/ /app/dist/
COPY --from=build /app/.env.production /app/.env.production
COPY --from=build /app/package.json /app/package.json
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 8888
CMD npm run start:production
