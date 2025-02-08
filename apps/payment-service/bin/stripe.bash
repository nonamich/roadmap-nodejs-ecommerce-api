#!/usr/bin/env bash
DIRNAME=$(dirname "$0")

. "$DIRNAME/../.env"

docker run --add-host=host.docker.internal:host-gateway --rm stripe/stripe-cli --api-key $STRIPE_SECRET_KEY $@
