-- Convert footer disclosures from plain strings to {text} objects.
-- This ONLY touches the disclosures array format — all other footer
-- settings (linkGroups, companyName, etc.) are left untouched.
--
-- Before: "disclosures": ["paragraph 1", "paragraph 2", ...]
-- After:  "disclosures": [{"text": "paragraph 1"}, {"text": "paragraph 2"}, ...]
--
-- Safe to run multiple times — if disclosures are already objects, nothing changes.

UPDATE site_settings
SET value = jsonb_set(
  value,
  '{disclosures}',
  (
    SELECT coalesce(
      jsonb_agg(
        CASE
          -- Already an object with a "text" key → keep as-is
          WHEN jsonb_typeof(elem) = 'object' THEN elem
          -- Plain string → wrap in {"text": ...}
          WHEN jsonb_typeof(elem) = 'string' THEN jsonb_build_object('text', elem #>> '{}')
          ELSE elem
        END
        ORDER BY idx
      ),
      '[]'::jsonb
    )
    FROM jsonb_array_elements(value -> 'disclosures') WITH ORDINALITY AS t(elem, idx)
  )
),
updated_at = now()
WHERE key = 'footer'
  AND value ? 'disclosures'
  AND jsonb_array_length(value -> 'disclosures') > 0;
