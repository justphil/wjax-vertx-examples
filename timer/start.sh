#!/bin/bash
VERTX_OPTS="-Dhazelcast.version.check.enabled=false"
VERTX_OPTS="$VERTX_OPTS -Dcom.sun.management.jmxremote -Dvertx.management.jmx=true -Dhazelcast.jmx=true"
export VERTX_OPTS
vertx run Timer.java