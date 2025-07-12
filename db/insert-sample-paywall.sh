#!/usr/bin/env bash

# Load environment variables
source ../.env

# Help message
if [[ $# -ne 1 ]]; then
  echo ""
  echo "Usage: $0 <client_uuid>"
  echo ""
  echo "Example:"
  echo "  $0 123e4567-e89b-12d3-a456-426614174000"
  echo ""
  exit 1
fi

CLIENT_UUID=$1

# Static Stripe placeholders (optional for now)
STRIPE_CUSTOMER_ID="cus_SAMPLE123"
STRIPE_SUBSCRIPTION_ID="sub_SAMPLE123"
STRIPE_METADATA='{}'

echo "🧪 Inserting paywall record for client_uuid: $CLIENT_UUID"

psql "$DIRECT_CONNECT_URL" <<EOF
INSERT INTO private.ckn_paywall (
  paywall_client_uuid,
  paywall_package_green_remaining,
  paywall_package_yellow_remaining,
  paywall_stripe_customer_id,
  paywall_stripe_subscription_id,
  paywall_stripe_metadata,
  paywall_version,
  paywall_updated_at,
  paywall_created_at
) VALUES (
  '$CLIENT_UUID',
  500,
  500,
  '$STRIPE_CUSTOMER_ID',
  '$STRIPE_SUBSCRIPTION_ID',
  '$STRIPE_METADATA'::jsonb,
  1,
  NOW(),
  NOW()
)
ON CONFLICT (paywall_client_uuid) DO UPDATE
SET paywall_package_green_remaining = 500,
    paywall_package_yellow_remaining = 500,
    paywall_stripe_customer_id = EXCLUDED.paywall_stripe_customer_id,
    paywall_stripe_subscription_id = EXCLUDED.paywall_stripe_subscription_id,
    paywall_stripe_metadata = EXCLUDED.paywall_stripe_metadata,
    paywall_version = private.ckn_paywall.paywall_version + 1,
    paywall_updated_at = NOW();
EOF

if [[ $? -eq 0 ]]; then
  echo "✅ SUCCESS: Inserted/updated paywall record for $CLIENT_UUID"
else
  echo "❌ ERROR: Failed to insert/update paywall record"
fi
