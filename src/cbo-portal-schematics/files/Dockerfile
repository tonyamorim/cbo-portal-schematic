FROM docker.binarios.intranet.bb.com.br/bb/dev/dev-nginx-metrics:1.0.0

USER 0
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist/ /usr/share/nginx/html/ 
COPY docker-start.sh /root/docker-start.sh
RUN chmod +x /root/docker-start.sh &&\
    chmod 777 /root &&\
    chmod 777 /var/cache/nginx
USER 1001
