FROM node:10.15.3-alpine
WORKDIR /back
ENV PATH /back/node_modules/.bin:$PATH
COPY package.json /back/package.json
RUN npm install prisma -g --silent
COPY . /back
RUN prisma generate
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g
RUN npm install --silent
CMD ["./script.sh"]