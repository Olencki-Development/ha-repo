ARG BUILD_FROM
FROM $BUILD_FROM

# Install requirements for add-on
RUN add --update nodejs nodejs-npm

WORKDIR /app

# Copy data for add-on
COPY . /
RUN chmod a+x /scripts/run.sh

CMD [ "/scripts/run.sh" ]