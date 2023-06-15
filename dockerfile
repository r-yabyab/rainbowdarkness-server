FROM node:bullseye

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

RUN value=$(aws ssm get-parameter --name "/rainbow/mong_uri" --with-decryption --query "Parameter.Value" --output text --region us-west-2)

RUN export MONG_URI=$value

#CMD ["node", "index.js"]
CMD bash -c 'value=$(aws ssm get-parameter --name "/rainbow/mong_uri" --with-decryption --query "Parameter.Value" --output text --region us-west-2) && export MONG_URI=$value && node index.js'