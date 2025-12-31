FROM node:18-alpine
# from the base image node 

WORKDIR /Ecommerce/backend/developer/payment_microservice
# working directory define 

COPY package*.json ./

RUN npm ci 
#clean install 

COPY . .
#copy all the file for the host to working directory 


CMD [ "npm", "start" ]
# cmd when container is on 
