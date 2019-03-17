# Use an official Node runtime as a parent image
FROM node:8.11.2

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
ADD ./.nuxt /app/.nuxt
ADD ./build /app/build
ADD ./package-lock.json /app
ADD ./package.json /app
ADD ./TalkingPuppetDB.db /app

# run the build using nuxt
RUN npm i --only=prod

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variable
ENV NODE_ENV production
ENV HOST 0.0.0.0
ENV PORT 80
ENV dbFile /app/TalkingPuppetDB.db

# Run app.py when the container launches
CMD ["node", "build/main.js"]
