# rainbowdarkness-server

Server to handle requests between https://rainbowdarkness.com and MongoDB.

User data consists of time entered and number. POST limited to 24 hours per IP address, however, dynamic IP addresses can avoid the limit. 

Contains a bunch of MongoDB pipelines to handle GET requests.