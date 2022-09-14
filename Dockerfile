ARG BUILD_FROM
FROM $BUILD_FROM

# Install requirements for add-on
RUN apn add --update npm

WORKDIR /app

# Copy data for add-on
COPY . /
RUN chmod a+x /scripts/run.sh

CMD [ "/scripts/run.sh" ]