FROM mhart/alpine-node:10.15.3 as builder

# install git, aws-cli
RUN apk --no-cache add git ca-certificates rsync \
    python py-pip py-setuptools groff less && \
    pip --no-cache-dir install awscli

# install PRX aws-secrets scripts
RUN git clone -o github https://github.com/PRX/aws-secrets
RUN cp ./aws-secrets/bin/* /usr/local/bin

ENV APP_HOME /app
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

ADD ./package.json ./
ADD ./package-lock.json ./
RUN npm install

ADD . ./
RUN npm run build:storybook

FROM mhart/alpine-node:10.15.3 as test
WORKDIR /app
COPY --from=builder /app .
RUN [ "npm", "run-script", "ci" ]

FROM nginx:alpine as server
LABEL maintainer="PRX <sysadmin@prx.org>"
LABEL org.prx.app="yes"
COPY --from=builder /app/storybook-static /usr/share/nginx/html
