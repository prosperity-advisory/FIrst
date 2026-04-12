-- Add /disclosures page to the admin-editable pages table.
-- Creates one page row + one interior_hero section + one intro paragraphs_section
-- + one paragraphs_section per disclosure topic (each with heading + paragraphs).
-- Idempotent: uses ON CONFLICT on slug and replaces sections for the page.

do $$
declare
  v_page_id uuid;
begin
  -- Upsert the page row
  insert into pages (slug, title, meta_description, og_title, og_description, is_published, sort_order)
  values (
    'disclosures',
    'Disclosures - Prosperity Planning & Advisory',
    'Important disclosures regarding Prosperity Planning & Advisory, LLC''s advisory services, website content, investment risk, insurance activities, and conflicts of interest.',
    'Disclosures | Prosperity Planning & Advisory',
    'Important disclosures regarding the Firm''s advisory services, website content, investment risk, and conflicts of interest.',
    true,
    13
  )
  on conflict (slug) do update
    set title = excluded.title,
        meta_description = excluded.meta_description,
        og_title = excluded.og_title,
        og_description = excluded.og_description,
        updated_at = now()
  returning id into v_page_id;

  -- Clear any existing sections for this page so re-runs produce a clean layout
  delete from sections where page_id = v_page_id;

  -- Interior hero
  insert into sections (page_id, component_type, sort_order, content) values
  (v_page_id, 'interior_hero', 1, jsonb_build_object(
    'eyebrow', 'Important Disclosures',
    'headline', 'Disclosures',
    'subtitle', 'Regulatory and legal disclosures regarding our services and this website.',
    'backgroundImage', '/images/services google.jpg'
  ));

  -- Intro (no heading — rendered as plain paragraphs above the titled sections)
  insert into sections (page_id, component_type, sort_order, content) values
  (v_page_id, 'paragraphs_section', 2, jsonb_build_object(
    'heading', '',
    'paragraphs', jsonb_build_array(
      jsonb_build_object('text', 'Prosperity Planning & Advisory, LLC (the "Firm") is a California state-registered investment adviser. Registration as an investment adviser in the State of California does not imply a certain level of skill or training.'),
      jsonb_build_object('text', 'This page provides a summary of important information regarding the Firm''s services and the limitations of this website. For more detailed information, please refer to the Firm''s Form ADV, which is available upon request.')
    )
  ));

  -- Body sections (heading + paragraphs)
  insert into sections (page_id, component_type, sort_order, content) values
  (v_page_id, 'paragraphs_section', 3, jsonb_build_object(
    'heading', 'Website Content and No Client Relationship',
    'paragraphs', jsonb_build_array(
      jsonb_build_object('text', 'The content on this website is provided for general informational and educational purposes only. Nothing on this website is intended as, or should be construed as, individualized investment, legal, tax, or insurance advice.'),
      jsonb_build_object('text', 'Viewing this website, using its tools or resources, or contacting the Firm through this website does not create an advisory relationship with the Firm. Advisory services are provided only after the Firm and client enter into a written advisory agreement.'),
      jsonb_build_object('text', 'Communications sent through this website or via email should not be used to request, authorize, or effect securities transactions or account changes.')
    )
  )),
  (v_page_id, 'paragraphs_section', 4, jsonb_build_object(
    'heading', 'Advisory Services',
    'paragraphs', jsonb_build_array(
      jsonb_build_object('text', 'The Firm offers investment advisory and financial planning services, which may include portfolio management, retirement planning, education planning, budgeting and cash flow planning, and other financial planning services as described in the Firm''s Form ADV.'),
      jsonb_build_object('text', 'All services are subject to the terms of the applicable written agreement, suitability review, and regulatory requirements.')
    )
  )),
  (v_page_id, 'paragraphs_section', 5, jsonb_build_object(
    'heading', 'Investment Risk Disclosure',
    'paragraphs', jsonb_build_array(
      jsonb_build_object('text', 'All investing involves risk, including the possible loss of principal. Different types of investments involve varying degrees of risk. Past performance is not indicative of future results. No representation is being made that any strategy, recommendation, or investment will be profitable or will not result in loss.'),
      jsonb_build_object('text', 'Any references to asset allocations, model portfolios, planning concepts, investment strategies, or financial outcomes are for illustrative and educational purposes only and may not be appropriate for every individual.')
    )
  )),
  (v_page_id, 'paragraphs_section', 6, jsonb_build_object(
    'heading', 'No Guarantee of Accuracy or Completeness',
    'paragraphs', jsonb_build_array(
      jsonb_build_object('text', 'The Firm believes the information on this website is from reliable sources; however, the Firm does not warrant that any information is accurate, complete, current, or suitable for any particular purpose, including any forward-looking statements. Information on this website may change at any time without notice.')
    )
  )),
  (v_page_id, 'paragraphs_section', 7, jsonb_build_object(
    'heading', 'Separate Insurance Activities',
    'paragraphs', jsonb_build_array(
      jsonb_build_object('text', 'The Firm does not sell insurance products through the advisory relationship and does not receive insurance commissions as part of its advisory services.'),
      jsonb_build_object('text', 'Insurance products, if offered, are offered through a separate, non-advisory business. Separate compensation, including commissions, may be earned in that separate capacity. Any such activity is outside the scope of the Firm''s advisory relationship.'),
      jsonb_build_object('text', 'Advisory recommendations are made without regard to whether a client elects to purchase any insurance product.'),
      jsonb_build_object('text', 'Clients and prospective clients are under no obligation to purchase any insurance product. Any decision to purchase insurance is entirely voluntary and is not required in order to receive advisory or planning services from the Firm.')
    )
  )),
  (v_page_id, 'paragraphs_section', 8, jsonb_build_object(
    'heading', 'Conflicts of Interest and Freedom of Choice',
    'paragraphs', jsonb_build_array(
      jsonb_build_object('text', 'The Firm is committed to acting in the best interests of its clients and to providing full and fair disclosure of material facts and conflicts of interest. Material conflicts are disclosed in the Firm''s Form ADV.'),
      jsonb_build_object('text', 'Clients and prospective clients are under no obligation to act on any recommendation made by the Firm. If a person elects to act on a recommendation, that person is under no obligation to do so through the Firm or through any separate provider.'),
      jsonb_build_object('text', 'Clients are free to choose their own custodian, broker-dealer, insurance provider, attorney, accountant, tax professional, or other service provider, subject to the Firm''s service model and any applicable account requirements.')
    )
  )),
  (v_page_id, 'paragraphs_section', 9, jsonb_build_object(
    'heading', 'Form ADV Availability',
    'paragraphs', jsonb_build_array(
      jsonb_build_object('text', 'The Firm''s Form ADV Part 2A brochure and any applicable brochure supplements contain important information about the Firm''s services, fees, business practices, and conflicts of interest.'),
      jsonb_build_object('text', 'These disclosure documents are provided to clients at or before the time of entering into an advisory relationship and are offered annually thereafter in accordance with regulatory requirements. They are also available promptly upon request by contacting the Firm directly.')
    )
  )),
  (v_page_id, 'paragraphs_section', 10, jsonb_build_object(
    'heading', 'Third-Party Links',
    'paragraphs', jsonb_build_array(
      jsonb_build_object('text', 'This website may contain links to third-party websites or resources. Such links are provided for convenience only. The Firm does not control, endorse, or guarantee the accuracy, completeness, security, or privacy practices of third-party websites.'),
      jsonb_build_object('text', 'Third-party websites have their own terms and privacy policies, which users should review independently. Accessing a third-party website is at the user''s own risk.')
    )
  )),
  (v_page_id, 'paragraphs_section', 11, jsonb_build_object(
    'heading', 'No Tax or Legal Advice',
    'paragraphs', jsonb_build_array(
      jsonb_build_object('text', 'The Firm does not provide legal advice or tax advice, including tax-efficient investing guidance. Visitors and clients should consult their own qualified legal and tax professionals regarding their specific circumstances.')
    )
  )),
  (v_page_id, 'paragraphs_section', 12, jsonb_build_object(
    'heading', 'Jurisdictional Notice',
    'paragraphs', jsonb_build_array(
      jsonb_build_object('text', 'This website is intended only to provide general information regarding the Firm and its services. Nothing on this website should be interpreted as a solicitation or offer to provide advisory services in any jurisdiction where doing so would be unlawful or where the Firm is not properly registered or otherwise exempt from registration.')
    )
  )),
  (v_page_id, 'paragraphs_section', 13, jsonb_build_object(
    'heading', 'Privacy',
    'paragraphs', jsonb_build_array(
      jsonb_build_object('text', 'Please review the Firm''s Privacy Policy (linked in the website footer) for information about how personal information is collected, used, and protected.')
    )
  )),
  (v_page_id, 'paragraphs_section', 14, jsonb_build_object(
    'heading', 'Contact Information',
    'paragraphs', jsonb_build_array(
      jsonb_build_object('text', 'For questions regarding these disclosures or to request a copy of the Firm''s current Form ADV brochure materials, please contact the Firm using the contact information provided on this website. Requests will be fulfilled promptly.')
    )
  ));
end $$;
