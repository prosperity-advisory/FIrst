-- Populate footer disclosures with the full disclaimer text.
-- Only updates the disclosures array — all other footer settings untouched.

UPDATE site_settings
SET value = jsonb_set(
  value,
  '{disclosures}',
  '[
    {"text": "Prosperity Planning & Advisory, LLC is a California state-registered investment adviser. Registration does not imply a certain level of skill or training. Advisory services are provided by a registered investment adviser representative of the Firm and are offered only after entering into a written advisory agreement and receiving all required disclosures."},
    {"text": "Prosperity Planning and Advisory, LLC is a fee-only registered investment adviser and does not sell insurance products or receive insurance commissions. Insurance products, if discussed, are offered outside of the advisory relationship through a separate, non-advisory business. Clients are under no obligation to purchase any insurance products."},
    {"text": "Website Disclaimer"},
    {"text": "Information on this website is for general informational and educational purposes only and does not constitute individualized investment advice, a recommendation, or an offer to buy or sell any security. Past performance is not indicative of future results. Any planning strategies discussed are based on general principles and may not be suitable for all individuals. Investment strategies involve risk, including the potential loss of principal."},
    {"text": "Prosperity Planning and Advisory, LLC is a registered investment adviser in the State of California. Registration does not imply a certain level of skill or training. Services may not be available to persons in jurisdictions where we are not appropriately licensed or exempt."},
    {"text": "We do not provide tax or legal advice. Hyperlinks to third-party content are provided for convenience and do not imply endorsement; we are not responsible for the accuracy or content of third-party sites. For our current Form ADV or additional information, please contact us at help@prosperityadvisory.net or 888-427-5240."},
    {"text": "Where insurance or annuity strategies are referenced, such discussion is for educational or planning-context purposes only unless otherwise stated. Separately, Marcus Mann, in his individual capacity as a licensed insurance agent, may offer certain fixed insurance or annuity products outside the advisory relationship. Clients are under no obligation to purchase any such product through him, and any such transaction would be separate from the firm\u2019s advisory services."}
  ]'::jsonb
),
updated_at = now()
WHERE key = 'footer';
