ARG BUILD_FROM
FROM $BUILD_FROM

# Install requirements for add-on
RUN apk add --update npm

WORKDIR /app

# Copy data for add-on
COPY . /app

# Build produciton
RUN npm -v
RUN node -v
RUN npm install

RUN chmod a+x /app/scripts/run.sh

CMD [ "/app/scripts/run.sh" ]