-- Add italic "note" field under two homepage service cards:
--   - Investment & Retirement Planning
--   - Estate & Legacy Planning
-- Client-required compliance notes rendered beneath the matching cards.
--
-- Rewrites the `categories` array of the home page's services_grid section,
-- injecting a `note` key into the two matching entries (matched by title)
-- and leaving all others untouched. Idempotent — safe to re-run.

update sections
set content = jsonb_set(
  content,
  '{categories}',
  (
    select coalesce(jsonb_agg(
      case
        when cat->>'title' = 'Investment & Retirement Planning'
          then cat || jsonb_build_object(
            'note',
            'Insurance products and strategies are discussed for educational purposes and may be implemented outside of the advisory relationship where applicable.'
          )
        when cat->>'title' = 'Estate & Legacy Planning'
          then cat || jsonb_build_object(
            'note',
            'Prosperity Planning & Advisory provides estate planning guidance and coordination but does not provide legal or tax advice. Estate documents are prepared in coordination with third-party legal providers. Clients are encouraged to consult with a qualified attorney regarding their specific situation.'
          )
        else cat
      end
    ), '[]'::jsonb)
    from jsonb_array_elements(content->'categories') as cat
  )
),
updated_at = now()
where component_type = 'services_grid'
  and page_id = (select id from pages where slug = '');
