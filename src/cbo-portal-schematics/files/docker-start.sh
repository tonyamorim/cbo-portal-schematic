#!/bin/bash
echo 'Iniciando nginx';
nginx -g "daemon off;" &

sleep 3;
# https://unix.stackexchange.com/questions/146756/forward-sigterm-to-child-in-bash
prep_term()
{
    unset term_child_pid
    unset term_kill_needed
    trap 'handle_term' TERM INT
}

handle_term()
{
    if [ "${term_child_pid}" ]; then
        kill -TERM "${term_child_pid}" 2>/dev/null
    else
        term_kill_needed="yes"
    fi
}

wait_term()
{
    term_child_pid=$!
    if [ "${term_kill_needed}" ]; then
        kill -TERM "${term_child_pid}" 2>/dev/null 
    fi
    wait ${term_child_pid}
    trap - TERM INT
    wait ${term_child_pid}
}


echo 'Iniciando nginx-prometheus-exporter';
prep_term
/usr/local/bin/nginx-prometheus-exporter \
    -nginx.retries 5 \
    -nginx.scrape-uri http://127.0.0.1:8080/status &
wait_term