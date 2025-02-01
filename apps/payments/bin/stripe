#!/usr/bin/env bash
DIRNAME=$(dirname "$0")

. "$DIRNAME/../.env"

docker run --rm stripe/stripe-cli --api-key $STRIPE_SECRET_KEY $@
