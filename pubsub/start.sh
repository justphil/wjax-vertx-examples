#!/bin/bash
export VERTX_OPTS="-Dhazelcast.version.check.enabled=false"

nohup bash -c "exec 'vertx' 'run' 'pubsub_server.js' -conf conf/conf1.json -cluster &> log/s1.log" &> /dev/null &
 
nohup bash -c "exec 'vertx' 'run' 'pubsub_server.js' -conf conf/conf2.json -cluster &> log/s2.log" &> /dev/null &
