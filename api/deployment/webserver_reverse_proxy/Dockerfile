FROM nginx
LABEL MAINTAINER="Robert Vidar Bjarnason <robert@citizens.is>"

RUN echo 'version 1.2'

ENV HOME /root
#CMD ["/sbin/my_init"]

ADD nginx.conf /etc/nginx/nginx.conf

COPY ./self_signed/fullchain.pem /root/bundle.pem
COPY ./self_signed/privkey.pem /root/private.pem

EXPOSE 443