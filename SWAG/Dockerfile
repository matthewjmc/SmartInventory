FROM ghcr.io/linuxserver/swag

EXPOSE 80 443

RUN rm -rf /etc/nginx
COPY ./Config/nginx /etc/nginx

RUN rm /defaults/dns-conf/cloudflare.ini
COPY cloudflare.ini /defaults/dns-conf/cloudflare.ini