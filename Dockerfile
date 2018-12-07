FROM openjdk:8-jre-alpine
MAINTAINER Dmitrij David Padalino Montenero

VOLUME /tmp
EXPOSE 8080

ARG JAR_FILE
ADD target/${JAR_FILE} app.jar
ADD wrapper.sh wrapper.sh

RUN apk add --update bash && rm -rf /var/cache/apk/*
RUN bash -c 'chmod +x /wrapper.sh'
RUN bash -c 'touch /app.jar'

ENTRYPOINT ["/bin/bash", "/wrapper.sh"]