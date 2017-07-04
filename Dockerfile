FROM node:8.1.2

ARG NODE_ENV=development

ENV appDir /var/www/app/current
ENV NODE_ENV  $NODE_ENV

# Set the work directory
RUN mkdir -p /var/www/app/current
WORKDIR ${appDir}

# Add our package.json and install *before* adding our application files
ADD package.json ./

RUN npm i

# Install pm2 *globally* so we can run our application
RUN npm i -g pm2 gulp

# Add application files
ADD . /var/www/app/current

RUN gulp scripts

# Dockerfile
# ...
#Expose the port
EXPOSE 3275

CMD ["gulp", "nodemon-server"]
# CMD ["pm2", "start", "processes.json", "--no-daemon"]
# the --no-daemon is a minor workaround to prevent the docker container from thinking pm2 has stopped running and ending itself

