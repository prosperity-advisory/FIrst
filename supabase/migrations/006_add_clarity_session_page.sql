-- ============================================================================
-- Migration 006: Clarity Session landing page (/clarity-session)
-- Creates one page row + 9 sections (split hero, audience cards, why list,
-- two detail blocks, scenarios grid, services overview, process steps,
-- faq accordion, final cta).
-- Idempotent: upserts page by slug and replaces all sections on re-run.
-- Image URLs are the local /images/... paths; the companion
-- supabase/apply-006-clarity-session.ts script uploads the images to Supabase
-- Storage and overwrites these with public URLs.
-- ============================================================================

do $$
declare
  v_page_id uuid;
begin
  insert into pages (slug, title, meta_description, og_title, og_description, is_published, sort_order)
  values (
    'clarity-session',
    'Financial Clarity Session — Planning-First Guidance for Business Owners & Pre-Retirees',
    'Schedule a complimentary Clarity Session to evaluate tax-aware strategies, retirement readiness, and risk alignment with a fiduciary, planning-first approach.',
    'Financial Clarity Session | Prosperity Planning & Advisory',
    'Planning-first guidance for business owners and pre-retirees. Evaluate strategies before making the next financial decision.',
    true,
    14
  )
  on conflict (slug) do update
    set title = excluded.title,
        meta_description = excluded.meta_description,
        og_title = excluded.og_title,
        og_description = excluded.og_description,
        updated_at = now()
  returning id into v_page_id;

  delete from sections where page_id = v_page_id;

  -- 1. Split hero
  insert into sections (page_id, component_type, sort_order, content) values
  (v_page_id, 'clarity_split_hero', 1, jsonb_build_object(
    'eyebrow', 'A Planning-First Conversation',
    'headline', 'Clarity Before Your Next Financial Decision',
    'subheadline', 'Financial planning for business owners and pre-retirees who want to evaluate tax-aware strategies, retirement readiness, and risk alignment with a clear, structured approach.',
    'ctaText', 'Schedule Your Complimentary Clarity Session',
    'ctaHref', '',
    'ctaMicrocopy', 'Introductory session to evaluate fit and general planning considerations. No obligation. No personalized advice provided.',
    'qualificationLine', 'Best suited for individuals and business owners seeking thoughtful, planning-first guidance—not quick product recommendations.',
    'secondaryLinkText', 'Explore Planning Scenarios',
    'secondaryLinkHref', '#scenarios',
    'image', '/images/Hero Image.png',
    'imageAlt', 'Advisor and client reviewing a financial plan together',
    'trustItems', jsonb_build_array(
      jsonb_build_object('text', 'Fiduciary Guidance'),
      jsonb_build_object('text', 'Clear Process & Next Steps'),
      jsonb_build_object('text', 'Tax-Aware Planning Approach'),
      jsonb_build_object('text', 'Personalized Strategies')
    )
  ));

  -- 2. Audience cards
  insert into sections (page_id, component_type, sort_order, content) values
  (v_page_id, 'clarity_audience_cards', 2, jsonb_build_object(
    'eyebrow', 'Who We Help',
    'headline', 'Choose the planning path that fits where you are today',
    'subheadline', '',
    'cards', jsonb_build_array(
      jsonb_build_object(
        'label', 'For Business Owners',
        'title', 'Business Owners Seeking Tax-Efficient Planning',
        'body', '',
        'bullets', jsonb_build_array(
          jsonb_build_object('text', 'Evaluate retirement plan strategies for higher-income years'),
          jsonb_build_object('text', 'Explore SEP IRA, Solo 401(k), profit-sharing, and defined benefit structures'),
          jsonb_build_object('text', 'Align business decisions with long-term personal goals'),
          jsonb_build_object('text', 'Coordinate planning with CPA and legal professionals')
        ),
        'anchorId', 'business-owners',
        'linkText', 'Learn More'
      ),
      jsonb_build_object(
        'label', 'For Pre-Retirees',
        'title', 'Pre-Retirees Seeking Retirement Clarity',
        'body', 'Evaluating retirement income strategies, including education on annuity options and other income approaches, to help clients better understand tradeoffs around income stability, liquidity, and long-term flexibility.',
        'bullets', jsonb_build_array(
          jsonb_build_object('text', '401(k) rollover consultation before retirement or job transition'),
          jsonb_build_object('text', 'Backdoor Roth IRA education and tax-aware retirement planning'),
          jsonb_build_object('text', 'Risk alignment based on timeline and income needs'),
          jsonb_build_object('text', 'Retirement strategy focused on income, taxes, and sustainability')
        ),
        'anchorId', 'pre-retirees',
        'linkText', 'Learn More'
      )
    )
  ));

  -- 3. Why Prosperity list
  insert into sections (page_id, component_type, sort_order, content) values
  (v_page_id, 'clarity_why_list', 3, jsonb_build_object(
    'eyebrow', 'Why Clients Choose Prosperity',
    'headline', 'Why clients come here before making major financial decisions',
    'subheadline', 'Most people come in with uncertainty—not a clear plan. Here''s how we approach that differently.',
    'items', jsonb_build_array(
      jsonb_build_object('title', 'Fiduciary Standard', 'body', 'Focused on your best interest in every recommendation.'),
      jsonb_build_object('title', 'Defined Planning Process', 'body', 'You always know exactly what happens next.'),
      jsonb_build_object('title', 'Tax-Aware Planning', 'body', 'Integrated into every decision, not treated as an afterthought.'),
      jsonb_build_object('title', 'Planning Before Implementation', 'body', 'Strategy comes first—product decisions follow, not lead.'),
      jsonb_build_object('title', 'Personalized Recommendations', 'body', 'Based on your situation, not a one-size-fits-all template.')
    )
  ));

  -- 4. Business owner detail block
  insert into sections (page_id, component_type, sort_order, content) values
  (v_page_id, 'clarity_detail_block', 4, jsonb_build_object(
    'anchorId', 'business-owners',
    'eyebrow', 'For Business Owners',
    'headline', 'Tax-aware planning for business owners who need more than generic advice',
    'intro', 'When income increases and business complexity grows, financial decisions become more interconnected.',
    'groups', jsonb_build_array(
      jsonb_build_object(
        'heading', 'Retirement Plan Strategy',
        'bullets', jsonb_build_array(
          jsonb_build_object('text', 'Compare SEP IRA, Solo 401(k), profit-sharing, and defined benefit options'),
          jsonb_build_object('text', 'Evaluate higher-deduction retirement strategies'),
          jsonb_build_object('text', 'Explore advanced retirement plan structures for higher contribution potential')
        )
      ),
      jsonb_build_object(
        'heading', 'Tax & Business Planning Considerations',
        'bullets', jsonb_build_array(
          jsonb_build_object('text', 'Navigate fluctuating income and tax exposure'),
          jsonb_build_object('text', 'Evaluate succession and long-term exit planning'),
          jsonb_build_object('text', 'Evaluate capital gains planning strategies in coordination with your tax professional, particularly around business sales, real estate, or concentrated investments'),
          jsonb_build_object('text', 'Coordinate strategies with CPA and legal professionals')
        )
      )
    ),
    'closing', 'We help you evaluate planning options that may be appropriate for your situation and coordinate decisions so your strategy is not handled in silos.',
    'notes', jsonb_build_array(
      jsonb_build_object('text', 'Planning strategies discussed are evaluated in coordination with your tax and legal professionals where appropriate.'),
      jsonb_build_object('text', 'Not all strategies are appropriate for every situation and may involve varying levels of complexity, risk, or cost.')
    ),
    'ctaText', 'Schedule Your Complimentary Clarity Session',
    'ctaHref', '',
    'image', '/images/Business owner section image.png',
    'imageAlt', 'Business owner reviewing tax-aware planning options with an advisor',
    'imageSide', 'right'
  ));

  -- 5. Pre-retiree detail block
  insert into sections (page_id, component_type, sort_order, content) values
  (v_page_id, 'clarity_detail_block', 5, jsonb_build_object(
    'anchorId', 'pre-retirees',
    'eyebrow', 'For Pre-Retirees',
    'headline', 'Retirement planning for people who want alignment before making the wrong move',
    'intro', 'Retirement is about timing, taxes, income, and risk—not just investments.',
    'groups', jsonb_build_array(
      jsonb_build_object(
        'heading', '',
        'bullets', jsonb_build_array(
          jsonb_build_object('text', 'Unsure if your current portfolio matches your timeline'),
          jsonb_build_object('text', 'Need clarity before rolling over retirement accounts'),
          jsonb_build_object('text', 'Want to understand Roth and backdoor Roth strategies'),
          jsonb_build_object('text', 'Concerned about taking too much risk too late'),
          jsonb_build_object('text', 'Want coordination between income, taxes, and investments'),
          jsonb_build_object('text', 'Looking to avoid costly mistakes during retirement transitions')
        )
      )
    ),
    'closing', 'We help you evaluate your current position and align your strategy with your retirement goals and comfort with risk.',
    'notes', jsonb_build_array(
      jsonb_build_object('text', 'All planning decisions remain yours, and we aim to provide clarity to support informed decision-making.')
    ),
    'ctaText', 'Schedule Your Complimentary Clarity Session',
    'ctaHref', '',
    'image', '/images/Pre retire Section Image.png',
    'imageAlt', 'Couple reviewing retirement planning strategy with a fiduciary advisor',
    'imageSide', 'left'
  ));

  -- 6. Planning scenarios dark grid
  insert into sections (page_id, component_type, sort_order, content) values
  (v_page_id, 'clarity_scenarios_grid', 6, jsonb_build_object(
    'eyebrow', 'Explore Planning Scenarios',
    'headline', 'Preview how strategies may apply to your situation',
    'subheadline', 'Preview how different strategies may apply to your situation before making decisions.',
    'body', 'These scenarios help you ask better questions before making important financial decisions.',
    'scenarios', jsonb_build_array(
      jsonb_build_object('title', 'Tax-efficient retirement plan comparisons', 'body', 'Side-by-side comparisons of SEP IRA, Solo 401(k), profit-sharing, and defined benefit structures.'),
      jsonb_build_object('title', '401(k) rollover vs. staying in plan', 'body', 'Evaluate tradeoffs around fees, investment options, and creditor protection before a rollover.'),
      jsonb_build_object('title', 'Roth vs. traditional strategies', 'body', 'Explore when each approach may be appropriate across different income and tax bracket scenarios.'),
      jsonb_build_object('title', 'Risk reduction and portfolio alignment', 'body', 'Align risk exposure with retirement timeline, income needs, and comfort with volatility.'),
      jsonb_build_object('title', 'Business owner planning comparisons', 'body', 'Coordinate personal and business-side decisions around contributions, income, and succession.')
    ),
    'footnote', 'These examples are educational starting points—not one-size-fits-all solutions.',
    'disclaimer', 'These examples are for educational purposes only and are not personalized recommendations.',
    'ctaText', 'Explore Planning Scenarios',
    'ctaHref', '/case-studies',
    'image', '/images/Planning scenarios sections image.png',
    'imageAlt', 'Planning scenarios visualized'
  ));

  -- 7. Services overview
  insert into sections (page_id, component_type, sort_order, content) values
  (v_page_id, 'clarity_services_overview', 7, jsonb_build_object(
    'eyebrow', 'Services Overview',
    'headline', 'Comprehensive Financial Planning Services',
    'services', jsonb_build_array(
      jsonb_build_object('title', 'Retirement Planning', 'body', 'Coordinate income, taxes, and long-term strategy.'),
      jsonb_build_object('title', 'Tax-Aware Planning', 'body', 'Evaluate strategies to improve after-tax outcomes.'),
      jsonb_build_object('title', 'Investment & Portfolio Alignment', 'body', 'Align risk with your timeline and goals.'),
      jsonb_build_object('title', 'Business Owner Planning', 'body', 'Support retirement and strategic planning decisions.'),
      jsonb_build_object('title', 'Risk Management Planning', 'body', 'Evaluate protection strategies and exposures.')
    ),
    'linkText', 'View All Services',
    'linkHref', '/services'
  ));

  -- 8. Process steps
  insert into sections (page_id, component_type, sort_order, content) values
  (v_page_id, 'clarity_process_steps', 8, jsonb_build_object(
    'eyebrow', 'After You Book',
    'headline', 'What happens after you book',
    'subheadline', 'Best for individuals and business owners seeking structured financial clarity.',
    'steps', jsonb_build_array(
      jsonb_build_object('title', 'Schedule & Confirmation', 'body', 'You receive a calendar invite and confirmation details.'),
      jsonb_build_object('title', 'Pre-Meeting Preparation', 'body', 'Short questionnaire to focus the conversation.'),
      jsonb_build_object('title', 'Initial Consultation', 'body', '15–30 minutes, virtual or phone. We discuss your goals and planning priorities.'),
      jsonb_build_object('title', 'Next Steps Clarity', 'body', 'You leave with a clearer understanding of your next financial priorities and what comes next.')
    ),
    'note', 'This is a focused planning conversation—not a sales presentation.',
    'filterNote', 'Not ideal for those looking for quick product recommendations without a structured planning discussion.',
    'scopeNote', 'The initial clarity session is an introductory conversation designed to evaluate fit and general planning considerations.'
  ));

  -- 9. FAQ (reuses existing faq_accordion component)
  insert into sections (page_id, component_type, sort_order, content) values
  (v_page_id, 'faq_accordion', 9, jsonb_build_object(
    'heading', 'Frequently Asked Questions',
    'questions', jsonb_build_array(
      jsonb_build_object('question', 'Do I need to be ready to become a client?', 'answer', 'No. This conversation is to determine fit and clarify next steps.'),
      jsonb_build_object('question', 'What happens after the consultation if there''s a fit?', 'answer', 'You''ll understand the recommended next step and what moving forward would look like.'),
      jsonb_build_object('question', 'What should I prepare?', 'answer', 'Basic financial information and your key questions.'),
      jsonb_build_object('question', 'Do you provide tax or legal advice?', 'answer', 'We provide planning guidance and coordinate with your professionals where appropriate.'),
      jsonb_build_object('question', 'How long is the meeting?', 'answer', 'Typically 15–30 minutes depending on your situation.'),
      jsonb_build_object('question', 'Will I be sold anything?', 'answer', 'No. The goal is clarity and fit—not product sales.')
    )
  ));

  -- 10. Final CTA
  insert into sections (page_id, component_type, sort_order, content) values
  (v_page_id, 'clarity_final_cta', 10, jsonb_build_object(
    'eyebrow', 'Next Step',
    'headline', 'Make your next financial decision with more clarity',
    'subheadline', 'Schedule a consultation to evaluate your next steps with a structured approach.',
    'ctaText', 'Schedule Your Complimentary Clarity Session',
    'ctaHref', '',
    'secondaryLinks', jsonb_build_array(
      jsonb_build_object('text', 'Explore Planning Scenarios', 'href', '/case-studies'),
      jsonb_build_object('text', 'View All Services', 'href', '/services')
    ),
    'subtext', 'You''ll receive a confirmation, calendar invite, and brief pre-meeting questions so the conversation is productive from the start.',
    'noObligationNote', 'There is no obligation to move forward after the initial conversation.',
    'urgencyNote', 'We keep a limited number of consultations available each week to maintain a focused experience.'
  ));
end $$;
