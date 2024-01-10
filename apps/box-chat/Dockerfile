FROM node:alpine As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g @nestjs/cli

RUN npm install -g pnpm

RUN pnpm fetch --prod

RUN pnpm install

COPY . .

RUN pnpm run build

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

RUN npm install -g pnpm

RUN pnpm fetch --prod

RUN pnpm install --prod

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/boxChat/main.js"]