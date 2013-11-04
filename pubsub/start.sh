#!/bin/bash
VERTX_OPTS="-Dhazelcast.version.check.enabled=false"
VERTX_OPTS="$VERTX_OPTS -Dcom.sun.management.jmxremote -Dvertx.management.jmx=true -Dhazelcast.jmx=true"
export VERTX_OPTS

mkdir log
nohup bash -c "exec 'vertx' 'run' 'pubsub_server.js' -conf conf/conf1.json -cluster &> log/s1.log" &> /dev/null &
 
nohup bash -c "exec 'vertx' 'run' 'pubsub_server.js' -conf conf/conf2.json -cluster &> log/s2.log" &> /dev/null &
