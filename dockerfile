#for debian EC2 instance
FROM node:bullseye

#downloads awscli so it can set the .env parameters in the container
RUN apt-get update && apt-get install -y awscli

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

#CMD ["node", "index.js"]

#Sets .env vars before running the app. Parameter store secured by IAM roles, idk why it needs encryption
CMD bash -c 'value=$(aws ssm get-parameter --name "/rainbow/mong_uri" --with-decryption --query "Parameter.Value" --output text --region us-west-2) && export MONG_URI=$value && node index.js'