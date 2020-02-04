FROM node:12.13.1-slim

# Have `dumb-init` as PID 1
ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init

WORKDIR /app
COPY . .

# Install deps
RUN npm install --only=prod

# Setup user
RUN useradd -m cashstory --uid 1001 &&\
    chown -R cashstory:cashstory /app
USER cashstory

EXPOSE 3000

ENTRYPOINT ["dumb-init", "--"]
CMD npm run start
