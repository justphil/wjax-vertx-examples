#!/bin/bash
VERTX_OPTS="-Dhazelcast.version.check.enabled=false"
VERTX_OPTS="$VERTX_OPTS -Dcom.sun.management.jmxremote -Dvertx.management.jmx=true -Dhazelcast.jmx=true"
export VERTX_OPTS
export VERTX_JUL_CONFIG=`pwd`/conf/logging.properties

vertx runmod bee42.com~mod-hello~0.0.1