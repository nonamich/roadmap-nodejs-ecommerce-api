#!/usr/bin/env bash
DIRNAME=$(dirname "$0")
STRIPE="$DIRNAME/stripe.bash"

. "$DIRNAME/../.env"

$STRIPE listen --skip-verify --forward-to host.docker.internal:$PAYMENTS_WEB_PORT
