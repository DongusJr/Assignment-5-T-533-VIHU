# First we want to build on an image the includes the environment we need to build
# and run our code, we can use 'node:alpine':
FROM node:alpine
# Now set the working directory to /app:
WORKDIR /app
# Let's make sure all our dependencies are available
# copy package.json, package-lock.json into the current working directory:
COPY package*.json ./
# Now we need the rest of our application code, copy your entire folder into the
# image working directory:

COPY . .

EXPOSE 3000
# You should also create a .dockerignore file to improve build performance and
# keep unwanted files out of your container.
# Created .dockerignore
# Now we want to build our application code. HINT: To run package.json scripts, we
# can use `npm run {script}`
RUN npm install
RUN npm run prisma:init
RUN npm run build
# Lastly we need to run the application when the container starts, set the command
# as npm run start:
CMD ["npm", "run", "start"]