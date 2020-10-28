FROM node:10 as web
WORKDIR /web
COPY ./react/build ./
RUN ls -al

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/configfile.template

COPY --from=web /web /usr/share/nginx/html

CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"