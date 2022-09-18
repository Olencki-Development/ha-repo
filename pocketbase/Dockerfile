ARG BUILD_FROM
FROM $BUILD_FROM

ARG POCKETBASE_VERSION=0.7.3

RUN apk add --no-cache \
    ca-certificates \
    unzip \
    wget \
    zip \
    zlib-dev

ADD https://github.com/pocketbase/pocketbase/releases/download/v${POCKETBASE_VERSION}/pocketbase_${POCKETBASE_VERSION}_linux_amd64.zip /app/pocketbase/pocketbase.zip
RUN unzip /app/pocketbase/pocketbase.zip -d /app/pocketbase
RUN chmod +x /app/pocketbase/pocketbase
RUN rm /app/pocketbase/pocketbase.zip

EXPOSE 8099

COPY scripts/ /app
RUN chmod a+x /app/scripts/run.sh

CMD [ "/app/scripts/run.sh" ]