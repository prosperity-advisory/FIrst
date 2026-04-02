// ============================================================================
// Component Type Registry
// Single source of truth for rendering components AND generating admin forms.
// Each key maps to a sections.component_type value in the database.
// ============================================================================

export type FieldType =
  | 'text'
  | 'textarea'
  | 'richtext'
  | 'image'
  | 'url'
  | 'boolean'
  | 'number'
  | 'array'
  | 'group';

export interface FieldDefinition {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  /** Help text shown below the field label */
  hint?: string;
  /** For type "array" — defines the shape of each item */
  itemFields?: FieldDefinition[];
  /** For type "group" — defines nested fields */
  fields?: FieldDefinition[];
}

export interface ComponentDefinition {
  label: string;
  description?: string;
  fields: FieldDefinition[];
}

export const componentRegistry: Record<string, ComponentDefinition> = {
  // ==========================================================================
  // HERO SECTIONS
  // ==========================================================================

  hero: {
    label: 'Hero Section',
    description: 'Full-width hero with headline, subheadline, and CTA. Used on homepage.',
    fields: [
      { name: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
      { name: 'headline', label: 'Headline', type: 'text', required: true },
      { name: 'subheadline', label: 'Subheadline', type: 'text' },
      { name: 'body', label: 'Body Text', type: 'textarea' },
      { name: 'ctaText', label: 'CTA Button Text', type: 'text' },
      { name: 'ctaHref', label: 'CTA Button Link', type: 'url' },
      { name: 'backgroundImage', label: 'Background Image', type: 'image', hint: 'Recommended: 1920x1080px, JPG, under 500KB' },
    ],
  },

  interior_hero: {
    label: 'Interior Hero',
    description: 'Shorter hero banner used on interior pages.',
    fields: [
      { name: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
      { name: 'headline', label: 'Headline', type: 'text', required: true },
      { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { name: 'ctaText', label: 'CTA Button Text', type: 'text' },
      { name: 'ctaHref', label: 'CTA Button Link', type: 'url' },
      { name: 'backgroundImage', label: 'Background Image', type: 'image', hint: 'Recommended: 1920x1080px, JPG, under 500KB' },
    ],
  },

  // ==========================================================================
  // HOME PAGE SECTIONS
  // ==========================================================================

  mission: {
    label: 'Mission Section',
    description: 'Company mission statement with trust badges. Used on homepage.',
    fields: [
      { name: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
      { name: 'headline', label: 'Headline', type: 'text', required: true },
      { name: 'body', label: 'Body Text', type: 'textarea', required: true },
      { name: 'image', label: 'Image', type: 'image', hint: 'Recommended: 800x600px, JPG' },
      { name: 'imageAlt', label: 'Image Alt Text', type: 'text' },
      {
        name: 'badges',
        label: 'Trust Badges',
        type: 'array',
        itemFields: [
          { name: 'icon', label: 'Icon Name', type: 'text' },
          { name: 'label', label: 'Badge Label', type: 'text', required: true },
        ],
      },
    ],
  },

  process_steps: {
    label: 'Process Steps',
    description: 'Six-step process overview with numbered circles. Used on homepage.',
    fields: [
      { name: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
      { name: 'headline', label: 'Headline', type: 'text', required: true },
      { name: 'subtitle', label: 'Subtitle', type: 'textarea' },
      { name: 'intro', label: 'Intro Paragraph', type: 'textarea' },
      {
        name: 'steps',
        label: 'Steps',
        type: 'array',
        itemFields: [
          { name: 'number', label: 'Step Number', type: 'number', required: true },
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea' },
        ],
      },
      { name: 'ctaText', label: 'CTA Button Text', type: 'text' },
      { name: 'ctaHref', label: 'CTA Button Link', type: 'url' },
      { name: 'bannerImage', label: 'Banner Image', type: 'image', hint: 'Recommended: 1200x480px, JPG, wide landscape format' },
      { name: 'bannerAlt', label: 'Banner Image Alt Text', type: 'text' },
    ],
  },

  services_grid: {
    label: 'Services Grid',
    description: 'Grid of service categories with nested service items. Used on homepage.',
    fields: [
      { name: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
      { name: 'headline', label: 'Headline', type: 'text', required: true },
      { name: 'body', label: 'Body Text', type: 'textarea' },
      { name: 'nextSteps', label: 'Next Steps Text', type: 'textarea' },
      {
        name: 'categories',
        label: 'Service Categories',
        type: 'array',
        itemFields: [
          { name: 'title', label: 'Category Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'href', label: 'Link URL', type: 'url' },
          {
            name: 'items',
            label: 'Service Items',
            type: 'array',
            itemFields: [
              { name: 'title', label: 'Item Title', type: 'text', required: true },
              { name: 'description', label: 'Item Description', type: 'textarea' },
            ],
          },
        ],
      },
    ],
  },

  business_owner_accordion: {
    label: 'Business Owner Accordion',
    description: 'Business owner & advanced planning section with nested accordion. Used on homepage.',
    fields: [
      { name: 'heading', label: 'Section Heading', type: 'text', required: true },
      { name: 'body', label: 'Intro Body', type: 'textarea' },
      { name: 'ctaText', label: 'CTA Button Text', type: 'text' },
      { name: 'ctaHref', label: 'CTA Button Link', type: 'url' },
      { name: 'learnMoreText', label: 'Learn More Link Text', type: 'text' },
      { name: 'learnMoreHref', label: 'Learn More Link URL', type: 'url' },
      {
        name: 'relevanceItems',
        label: 'Relevance Bullets',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Bullet Text', type: 'text', required: true },
        ],
      },
      {
        name: 'sections',
        label: 'Accordion Sections',
        type: 'array',
        itemFields: [
          { name: 'heading', label: 'Section Heading', type: 'text', required: true },
          { name: 'body', label: 'Section Body', type: 'textarea' },
          {
            name: 'subsections',
            label: 'Subsections',
            type: 'array',
            itemFields: [
              { name: 'heading', label: 'Subsection Heading', type: 'text', required: true },
              { name: 'body', label: 'Subsection Body', type: 'textarea' },
              {
                name: 'items',
                label: 'Bullet Items',
                type: 'array',
                itemFields: [
                  { name: 'text', label: 'Item Text', type: 'text', required: true },
                ],
              },
              {
                name: 'subsections',
                label: 'Nested Subsections',
                type: 'array',
                itemFields: [
                  { name: 'heading', label: 'Heading', type: 'text', required: true },
                  { name: 'body', label: 'Body', type: 'textarea' },
                  {
                    name: 'items',
                    label: 'Items',
                    type: 'array',
                    itemFields: [
                      { name: 'text', label: 'Item Text', type: 'text', required: true },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  contact_section: {
    label: 'Contact Section',
    description: 'Contact info with map image, phone, email, and address. Used on homepage and contact page.',
    fields: [
      { name: 'eyebrow', label: 'Eyebrow Text', type: 'text' },
      { name: 'headline', label: 'Headline', type: 'text', required: true },
      { name: 'ctaText', label: 'CTA Button Text', type: 'text' },
      { name: 'ctaHref', label: 'CTA Button Link', type: 'url' },
      { name: 'mapLabel', label: 'Map Label', type: 'text' },
      { name: 'mapSublabel', label: 'Map Sublabel', type: 'text' },
      { name: 'image', label: 'Map/Office Image', type: 'image', hint: 'Recommended: 800x600px, JPG' },
      { name: 'imageAlt', label: 'Image Alt Text', type: 'text' },
      {
        name: 'details',
        label: 'Contact Details',
        type: 'array',
        itemFields: [
          { name: 'icon', label: 'Icon Name', type: 'text' },
          { name: 'label', label: 'Label', type: 'text', required: true },
          { name: 'value', label: 'Value', type: 'text', required: true },
          { name: 'href', label: 'Link URL', type: 'url' },
        ],
      },
    ],
  },

  cta_band: {
    label: 'CTA Band',
    description: 'Full-width call-to-action banner. Defaults pulled from site_settings if fields are empty.',
    fields: [
      { name: 'headline', label: 'Headline', type: 'text' },
      { name: 'subtext', label: 'Subtext', type: 'textarea' },
      { name: 'ctaText', label: 'CTA Button Text', type: 'text' },
      { name: 'ctaHref', label: 'CTA Button Link', type: 'url' },
    ],
  },

  // ==========================================================================
  // SERVICES PAGE
  // ==========================================================================

  services_intro: {
    label: 'Services Intro',
    description: 'Introductory text block with explore links. Used on services page.',
    fields: [
      {
        name: 'paragraphs',
        label: 'Intro Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
      { name: 'ctaText', label: 'CTA Text', type: 'text' },
      { name: 'ctaHref', label: 'CTA Link', type: 'url' },
      { name: 'ctaPrefix', label: 'CTA Prefix Text', type: 'text' },
      { name: 'exploreHeading', label: 'Explore Heading', type: 'text' },
      { name: 'exploreBody', label: 'Explore Body', type: 'textarea' },
      { name: 'exploreNote', label: 'Explore Note', type: 'textarea' },
      {
        name: 'exploreLinks',
        label: 'Explore Links',
        type: 'array',
        itemFields: [
          { name: 'title', label: 'Link Title', type: 'text', required: true },
          { name: 'href', label: 'Link URL', type: 'url', required: true },
        ],
      },
    ],
  },

  service_accordion: {
    label: 'Service Accordion',
    description: 'Expandable service category sections with deeply nested subsections. Used on services page.',
    fields: [
      {
        name: 'sections',
        label: 'Service Sections',
        type: 'array',
        itemFields: [
          { name: 'id', label: 'Section ID (anchor)', type: 'text', required: true },
          { name: 'heading', label: 'Heading', type: 'text', required: true },
          { name: 'body', label: 'Body', type: 'textarea', required: true },
          { name: 'bodyExtra', label: 'Additional Body', type: 'textarea' },
          { name: 'bodyExtra2', label: 'Additional Body 2', type: 'textarea' },
          { name: 'relevanceHeading', label: 'Relevance Heading', type: 'text' },
          { name: 'relevanceIntro', label: 'Relevance Intro', type: 'textarea' },
          {
            name: 'relevanceItems',
            label: 'Relevance Items',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Item', type: 'text', required: true },
            ],
          },
          { name: 'whyHeading', label: 'Why Heading', type: 'text' },
          { name: 'whyIntro', label: 'Why Intro', type: 'textarea' },
          {
            name: 'whyItems',
            label: 'Why Items',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Item', type: 'text', required: true },
            ],
          },
          {
            name: 'subsections',
            label: 'Subsections',
            type: 'array',
            itemFields: [
              { name: 'heading', label: 'Heading', type: 'text', required: true },
              { name: 'body', label: 'Body', type: 'textarea' },
              { name: 'bodyExtra', label: 'Additional Body', type: 'textarea' },
              { name: 'bodyExtra2', label: 'Additional Body 2', type: 'textarea' },
              { name: 'ctaText', label: 'CTA Text', type: 'text' },
              { name: 'ctaHref', label: 'CTA Link', type: 'url' },
              { name: 'disclaimer', label: 'Disclaimer', type: 'textarea' },
              { name: 'listHeading', label: 'List Heading', type: 'text' },
              {
                name: 'items',
                label: 'Bullet Items',
                type: 'array',
                itemFields: [
                  { name: 'text', label: 'Item', type: 'text', required: true },
                ],
              },
              {
                name: 'subsections',
                label: 'Nested Subsections',
                type: 'array',
                itemFields: [
                  { name: 'heading', label: 'Heading', type: 'text', required: true },
                  { name: 'body', label: 'Body', type: 'textarea' },
                  {
                    name: 'items',
                    label: 'Items',
                    type: 'array',
                    itemFields: [
                      { name: 'text', label: 'Item', type: 'text', required: true },
                    ],
                  },
                  {
                    name: 'subsections',
                    label: 'Deep Nested Subsections',
                    type: 'array',
                    itemFields: [
                      { name: 'heading', label: 'Heading', type: 'text', required: true },
                      { name: 'body', label: 'Body', type: 'textarea' },
                      {
                        name: 'items',
                        label: 'Items',
                        type: 'array',
                        itemFields: [
                          { name: 'text', label: 'Item', type: 'text', required: true },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'disclaimers',
            label: 'Disclaimers',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Disclaimer', type: 'textarea', required: true },
            ],
          },
          { name: 'planningAreasHeading', label: 'Planning Areas Heading', type: 'text' },
          {
            name: 'planningAreas',
            label: 'Planning Areas',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Area', type: 'text', required: true },
            ],
          },
          { name: 'transition', label: 'Transition Text', type: 'textarea' },
        ],
      },
    ],
  },

  services_approach: {
    label: 'Services Approach',
    description: 'Closing approach section on services page.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      {
        name: 'paragraphs',
        label: 'Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
      { name: 'ctaHeading', label: 'CTA Heading', type: 'text' },
      { name: 'ctaBody', label: 'CTA Body', type: 'textarea' },
      { name: 'ctaText', label: 'CTA Button Text', type: 'text' },
      { name: 'ctaHref', label: 'CTA Button Link', type: 'url' },
    ],
  },

  disclosure: {
    label: 'Disclosure Text',
    description: 'Simple disclosure or compliance text block.',
    fields: [
      { name: 'text', label: 'Disclosure Text', type: 'richtext', required: true },
    ],
  },

  // ==========================================================================
  // PORTFOLIOS PAGE
  // ==========================================================================

  portfolio_cards: {
    label: 'Portfolio Cards',
    description: 'Grid of Prosperity Pathways portfolio cards.',
    fields: [
      { name: 'introBody', label: 'Intro Body', type: 'textarea' },
      { name: 'introDetail', label: 'Intro Detail', type: 'textarea' },
      {
        name: 'portfolios',
        label: 'Portfolios',
        type: 'array',
        itemFields: [
          { name: 'id', label: 'Portfolio ID', type: 'text', required: true },
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'summary', label: 'Summary', type: 'textarea', required: true },
          { name: 'goal', label: 'Goal', type: 'text' },
          { name: 'purpose', label: 'Purpose', type: 'textarea' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'tagline', label: 'Tagline', type: 'text' },
        ],
      },
    ],
  },

  text_section: {
    label: 'Text Section',
    description: 'Generic heading + body text block. Used for management, fiduciary, trusted partner, tailored, etc.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'body', label: 'Body', type: 'textarea', required: true },
      { name: 'detail', label: 'Additional Detail', type: 'textarea' },
    ],
  },

  foundation_section: {
    label: 'Foundation Section',
    description: 'Foundation principles with bullet list and CTA. Used on portfolios page.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      {
        name: 'items',
        label: 'Principle Items',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Item', type: 'text', required: true },
        ],
      },
      { name: 'body', label: 'Body', type: 'textarea' },
      { name: 'ctaText', label: 'CTA Text', type: 'text' },
      { name: 'ctaHref', label: 'CTA Link', type: 'url' },
    ],
  },

  disclosure_list: {
    label: 'Disclosure List',
    description: 'List of compliance/disclosure paragraphs.',
    fields: [
      {
        name: 'items',
        label: 'Disclosures',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Disclosure', type: 'textarea', required: true },
        ],
      },
    ],
  },

  // ==========================================================================
  // PLANNING PAGE
  // ==========================================================================

  service_cards: {
    label: 'Service Cards Grid',
    description: 'Grid of service offering cards with optional icons and CTAs. Used on planning and contact pages.',
    fields: [
      { name: 'heading', label: 'Section Heading', type: 'text' },
      { name: 'body', label: 'Section Body', type: 'textarea' },
      {
        name: 'cards',
        label: 'Service Cards',
        type: 'array',
        itemFields: [
          { name: 'icon', label: 'Icon Name', type: 'text' },
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'body', label: 'Body', type: 'textarea', required: true },
          { name: 'tagline', label: 'Tagline', type: 'text' },
          { name: 'ctaText', label: 'CTA Text', type: 'text' },
          { name: 'ctaHref', label: 'CTA Link', type: 'url' },
        ],
      },
    ],
  },

  client_portal: {
    label: 'Client Portal Section',
    description: 'Client portal description with feature list. Used on planning page.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'body', label: 'Body', type: 'textarea' },
      { name: 'accessHeading', label: 'Access Heading', type: 'text' },
      { name: 'accessBody', label: 'Access Body', type: 'textarea' },
      {
        name: 'features',
        label: 'Portal Features',
        type: 'array',
        itemFields: [
          { name: 'icon', label: 'Icon Name', type: 'text' },
          { name: 'title', label: 'Feature Title', type: 'text', required: true },
          { name: 'body', label: 'Feature Description', type: 'textarea', required: true },
        ],
      },
    ],
  },

  // ==========================================================================
  // ABOUT PAGE
  // ==========================================================================

  about_mission: {
    label: 'About Mission',
    description: 'Mission statement block. Used on about page.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'body', label: 'Body', type: 'richtext', required: true },
    ],
  },

  about_services: {
    label: 'About Services List',
    description: 'Service listing with intro, bullet list, and outro. Used on about page.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'body', label: 'Intro Body', type: 'textarea' },
      {
        name: 'items',
        label: 'Service Items',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Service Name', type: 'text', required: true },
        ],
      },
      { name: 'outro', label: 'Outro Text', type: 'textarea' },
    ],
  },

  feature_badges: {
    label: 'Feature Badges',
    description: 'Grid of feature badges with icons. Used on about page.',
    fields: [
      {
        name: 'features',
        label: 'Features',
        type: 'array',
        itemFields: [
          { name: 'icon', label: 'Icon Name', type: 'text' },
          { name: 'label', label: 'Feature Label', type: 'text', required: true },
        ],
      },
    ],
  },

  // ==========================================================================
  // CONTACT PAGE
  // ==========================================================================

  location_info: {
    label: 'Location Info',
    description: 'Location details with address and disclosures. Used on contact page.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'name', label: 'Location Name', type: 'text' },
      { name: 'address', label: 'Street Address', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'zip', label: 'ZIP Code', type: 'text' },
      { name: 'phone', label: 'Phone', type: 'text' },
      { name: 'email', label: 'Email', type: 'text' },
      {
        name: 'disclosures',
        label: 'Location Disclosures',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Disclosure', type: 'textarea', required: true },
        ],
      },
    ],
  },

  // ==========================================================================
  // WHO WE SERVE PAGE
  // ==========================================================================

  audience_intro: {
    label: 'Audience Intro',
    description: 'Intro text + hero body for who-we-serve page.',
    fields: [
      { name: 'heroBody', label: 'Hero Body Text', type: 'textarea' },
      { name: 'heading', label: 'Built Around You Heading', type: 'text' },
      { name: 'body', label: 'Built Around You Body', type: 'textarea' },
    ],
  },

  audience_overview: {
    label: 'Audience Quick Overview',
    description: 'Quick summary of audience types.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      {
        name: 'items',
        label: 'Overview Items',
        type: 'array',
        itemFields: [
          { name: 'label', label: 'Audience Label', type: 'text', required: true },
          { name: 'desc', label: 'Short Description', type: 'text', required: true },
        ],
      },
    ],
  },

  audience_profiles: {
    label: 'Audience Profiles',
    description: 'Detailed audience profile cards with planning areas.',
    fields: [
      {
        name: 'audiences',
        label: 'Audience Profiles',
        type: 'array',
        itemFields: [
          { name: 'id', label: 'Profile ID (anchor)', type: 'text', required: true },
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'intro', label: 'Intro', type: 'textarea', required: true },
          {
            name: 'focusedOn',
            label: 'Focused On Items',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Focus Area', type: 'text', required: true },
            ],
          },
          { name: 'howWeHelp', label: 'How We Help', type: 'textarea', required: true },
          {
            name: 'planningAreas',
            label: 'Planning Areas',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Area', type: 'text', required: true },
            ],
          },
          { name: 'ctaText', label: 'CTA Text', type: 'text' },
          { name: 'ctaHref', label: 'CTA Link', type: 'url' },
        ],
      },
    ],
  },

  two_column_text: {
    label: 'Two-Column Text',
    description: 'Section with heading + two body paragraphs. Used for tax-aware and no-one-category blocks.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'body1', label: 'Body Paragraph 1', type: 'textarea', required: true },
      { name: 'body2', label: 'Body Paragraph 2', type: 'textarea' },
    ],
  },

  connects_everything: {
    label: 'Connects Everything',
    description: 'Summary section with bullet list and footer text. Used on who-we-serve page.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'body', label: 'Body', type: 'textarea' },
      { name: 'subheading', label: 'Subheading', type: 'text' },
      {
        name: 'items',
        label: 'Items',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Item', type: 'text', required: true },
        ],
      },
      { name: 'footer', label: 'Footer Text', type: 'textarea' },
    ],
  },

  closing_cta: {
    label: 'Closing CTA Block',
    description: 'Page-ending CTA block with heading, body, and button.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'body', label: 'Body', type: 'textarea' },
      { name: 'body2', label: 'Additional Body', type: 'textarea' },
      { name: 'ctaText', label: 'CTA Text', type: 'text' },
      { name: 'ctaHref', label: 'CTA Link', type: 'url' },
    ],
  },

  // ==========================================================================
  // PROCESS PAGE
  // ==========================================================================

  why_it_matters: {
    label: 'Why It Matters',
    description: 'Section explaining why the process matters with bullet list.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'body', label: 'Body', type: 'textarea', required: true },
      { name: 'listHeading', label: 'List Heading', type: 'text' },
      {
        name: 'items',
        label: 'Benefit Items',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Item', type: 'text', required: true },
        ],
      },
      {
        name: 'paragraphs',
        label: 'Follow-up Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
    ],
  },

  roadmap_summary: {
    label: 'Roadmap Summary',
    description: 'Visual summary of the six-step roadmap with numbered items.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'subheading', label: 'Subheading', type: 'text' },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      {
        name: 'summary',
        label: 'Steps',
        type: 'array',
        itemFields: [
          { name: 'number', label: 'Step Number', type: 'number', required: true },
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
        ],
      },
    ],
  },

  detailed_steps: {
    label: 'Detailed Process Steps',
    description: 'Full six-step process detail with body paragraphs, bullets, and takeaways.',
    fields: [
      {
        name: 'steps',
        label: 'Steps',
        type: 'array',
        itemFields: [
          { name: 'number', label: 'Step Number', type: 'number', required: true },
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'subtitle', label: 'Subtitle', type: 'text' },
          {
            name: 'body',
            label: 'Body Paragraphs',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
            ],
          },
          { name: 'listHeading', label: 'List Heading', type: 'text' },
          {
            name: 'items',
            label: 'Focus Items',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Item', type: 'text', required: true },
            ],
          },
          { name: 'whyMatters', label: 'Why This Matters', type: 'textarea' },
          {
            name: 'whatYouLeaveWith',
            label: 'What You Leave With',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Item', type: 'text', required: true },
            ],
          },
          { name: 'cta', label: 'Step CTA Text', type: 'text' },
        ],
      },
    ],
  },

  bullet_list_section: {
    label: 'Bullet List Section',
    description: 'Heading + optional list heading + bullet items + optional footnote. Used for whoIsFor, whatItAddresses.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'listHeading', label: 'List Heading', type: 'text' },
      {
        name: 'items',
        label: 'Items',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Item', type: 'text', required: true },
        ],
      },
      { name: 'footnote', label: 'Footnote', type: 'textarea' },
    ],
  },

  titled_list_section: {
    label: 'Titled List Section',
    description: 'Heading + items with title/body pairs. Used for whatToExpect.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      {
        name: 'items',
        label: 'Items',
        type: 'array',
        itemFields: [
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'body', label: 'Body', type: 'textarea', required: true },
        ],
      },
    ],
  },

  paragraphs_section: {
    label: 'Paragraphs Section',
    description: 'Heading + multiple body paragraphs. Used for planningExperience.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      {
        name: 'paragraphs',
        label: 'Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
    ],
  },

  faq_accordion: {
    label: 'FAQ Accordion',
    description: 'Simple Q&A accordion. Used on process page.',
    fields: [
      { name: 'heading', label: 'Section Heading', type: 'text' },
      {
        name: 'questions',
        label: 'Questions',
        type: 'array',
        itemFields: [
          { name: 'question', label: 'Question', type: 'text', required: true },
          { name: 'answer', label: 'Answer', type: 'richtext', required: true },
        ],
      },
    ],
  },

  // ==========================================================================
  // FEES PAGE
  // ==========================================================================

  fee_sections: {
    label: 'Fee Sections',
    description: 'Structured fee/pricing sections with paragraphs, lists, and footnotes.',
    fields: [
      {
        name: 'sections',
        label: 'Fee Sections',
        type: 'array',
        itemFields: [
          { name: 'id', label: 'Section ID (anchor)', type: 'text', required: true },
          { name: 'heading', label: 'Heading', type: 'text', required: true },
          {
            name: 'paragraphs',
            label: 'Paragraphs',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
            ],
          },
          { name: 'listHeading', label: 'List Heading', type: 'text' },
          {
            name: 'items',
            label: 'List Items',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Item', type: 'text', required: true },
            ],
          },
          {
            name: 'footnotes',
            label: 'Footnotes',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Footnote', type: 'textarea', required: true },
            ],
          },
        ],
      },
    ],
  },

  // ==========================================================================
  // FAQS PAGE
  // ==========================================================================

  faq_categories: {
    label: 'FAQ Categories',
    description: 'Grouped FAQ categories, each with its own accordion of Q&A pairs.',
    fields: [
      {
        name: 'introParagraphs',
        label: 'Intro Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
      {
        name: 'categories',
        label: 'FAQ Categories',
        type: 'array',
        itemFields: [
          { name: 'heading', label: 'Category Heading', type: 'text', required: true },
          {
            name: 'questions',
            label: 'Questions',
            type: 'array',
            itemFields: [
              { name: 'question', label: 'Question', type: 'text', required: true },
              { name: 'answer', label: 'Answer', type: 'richtext', required: true },
            ],
          },
        ],
      },
      { name: 'disclosures', label: 'Disclosures Text', type: 'textarea' },
    ],
  },

  // ==========================================================================
  // RESOURCES PAGE
  // ==========================================================================

  resources_start_here: {
    label: 'Start Here Quick Reference',
    description: 'Quick reference guide with trigger/action links.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      {
        name: 'items',
        label: 'Quick Reference Items',
        type: 'array',
        itemFields: [
          { name: 'trigger', label: 'Trigger Question', type: 'text', required: true },
          { name: 'action', label: 'Action Text', type: 'text', required: true },
          { name: 'href', label: 'Link URL', type: 'url', required: true },
        ],
      },
    ],
  },

  resources_how_to_use: {
    label: 'How to Use Section',
    description: 'Usage instructions with bullet list and footnote.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      { name: 'listHeading', label: 'List Heading', type: 'text' },
      {
        name: 'items',
        label: 'Tips',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Tip', type: 'text', required: true },
        ],
      },
      { name: 'footnote', label: 'Footnote', type: 'textarea' },
    ],
  },

  calculator_groups: {
    label: 'Calculator Groups',
    description: 'Groups of financial calculators/tools with detailed descriptions.',
    fields: [
      { name: 'heading', label: 'Section Heading', type: 'text' },
      {
        name: 'groups',
        label: 'Calculator Groups',
        type: 'array',
        itemFields: [
          { name: 'id', label: 'Group ID (anchor)', type: 'text', required: true },
          { name: 'heading', label: 'Group Heading', type: 'text', required: true },
          {
            name: 'tools',
            label: 'Tools',
            type: 'array',
            itemFields: [
              { name: 'title', label: 'Tool Title', type: 'text', required: true },
              { name: 'href', label: 'Tool URL', type: 'url', required: true },
              { name: 'helpsWith', label: 'Helps With', type: 'text' },
              { name: 'whyMatters', label: 'Why It Matters', type: 'text' },
              { name: 'usedWhen', label: 'Used When', type: 'text' },
              { name: 'note', label: 'Disclaimer Note', type: 'textarea' },
            ],
          },
        ],
      },
    ],
  },

  resource_library: {
    label: 'Resource Library Topics',
    description: 'Grid of educational topic categories.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      {
        name: 'topics',
        label: 'Topics',
        type: 'array',
        itemFields: [
          { name: 'title', label: 'Topic Title', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea', required: true },
        ],
      },
    ],
  },

  downloadable_guides: {
    label: 'Downloadable Guides',
    description: 'List of upcoming downloadable guides.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      {
        name: 'items',
        label: 'Guide Items',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Guide Title', type: 'text', required: true },
        ],
      },
      { name: 'cta', label: 'CTA Text', type: 'text' },
    ],
  },

  video_list: {
    label: 'Video List',
    description: 'List of upcoming video topics.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      {
        name: 'items',
        label: 'Video Topics',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Video Title', type: 'text', required: true },
        ],
      },
    ],
  },

  resources_closing: {
    label: 'Resources Closing',
    description: 'Closing section with paragraphs and CTA.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      {
        name: 'paragraphs',
        label: 'Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
      { name: 'ctaText', label: 'CTA Text', type: 'text' },
      { name: 'ctaPrefix', label: 'CTA Prefix', type: 'text' },
      { name: 'ctaHref', label: 'CTA Link', type: 'url' },
    ],
  },

  // ==========================================================================
  // CASE STUDIES PAGE
  // ==========================================================================

  case_studies_intro: {
    label: 'Case Studies Intro',
    description: 'Multi-section intro area for case studies page.',
    fields: [
      {
        name: 'heroIntroParagraphs',
        label: 'Hero Intro Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
      { name: 'tagline', label: 'Tagline', type: 'text' },
      { name: 'whatYoullSeeHeading', label: 'What You\'ll See Heading', type: 'text' },
      {
        name: 'whatYoullSeeItems',
        label: 'What You\'ll See Items',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Item', type: 'text', required: true },
        ],
      },
      { name: 'introHeading', label: 'Intro Section Heading', type: 'text' },
      {
        name: 'introParagraphs',
        label: 'Intro Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
      { name: 'heroCta1Text', label: 'Hero Button 1 Text', type: 'text' },
      { name: 'heroCta1Href', label: 'Hero Button 1 Link', type: 'url' },
      { name: 'heroCta2Text', label: 'Hero Button 2 Text', type: 'text' },
      { name: 'heroCta2Href', label: 'Hero Button 2 Link', type: 'url' },
      { name: 'scenarioCtaText', label: 'Scenario CTA Button Text', type: 'text', hint: 'Button text shown at the end of each scenario category' },
      { name: 'whatDesignedHeading', label: 'What Designed To Show Heading', type: 'text' },
      {
        name: 'whatDesignedItems',
        label: 'What Designed To Show Items',
        type: 'array',
        itemFields: [
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'body', label: 'Body', type: 'textarea', required: true },
        ],
      },
    ],
  },

  case_studies_process: {
    label: 'Case Studies Planning Process',
    description: 'Planning process overview specific to case studies page.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'subtitle', label: 'Subtitle', type: 'text' },
      {
        name: 'paragraphs',
        label: 'Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
      {
        name: 'steps',
        label: 'Process Steps',
        type: 'array',
        itemFields: [
          { name: 'number', label: 'Step Number', type: 'number', required: true },
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'body', label: 'Body', type: 'textarea', required: true },
        ],
      },
    ],
  },

  scenarios_intro: {
    label: 'Scenarios Intro',
    description: 'Introduction to scenarios with how-to-use guide and quick links.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      {
        name: 'paragraphs',
        label: 'Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
      { name: 'illustrativeHeading', label: 'Illustrative Heading', type: 'text' },
      {
        name: 'illustrativeParagraphs',
        label: 'Illustrative Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
      { name: 'howToUseHeading', label: 'How To Use Heading', type: 'text' },
      {
        name: 'howToUseItems',
        label: 'How To Use Items',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Item', type: 'text', required: true },
        ],
      },
      { name: 'howToUseDisclaimer', label: 'How To Use Disclaimer', type: 'textarea' },
      {
        name: 'quickLinks',
        label: 'Quick Links',
        type: 'array',
        itemFields: [
          { name: 'label', label: 'Label', type: 'text', required: true },
          { name: 'href', label: 'Link URL', type: 'url', required: true },
        ],
      },
    ],
  },

  scenario_category: {
    label: 'Scenario Category',
    description: 'A category of planning scenarios with nested scenario accordions. One section per category.',
    fields: [
      { name: 'id', label: 'Category ID (anchor)', type: 'text', required: true },
      { name: 'title', label: 'Category Title', type: 'text', required: true },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      { name: 'introExtra', label: 'Additional Intro', type: 'textarea' },
      { name: 'ctaHeading', label: 'CTA Heading', type: 'text' },
      { name: 'ctaBody', label: 'CTA Body', type: 'textarea' },
      { name: 'ctaPrompt', label: 'CTA Prompt', type: 'text' },
      { name: 'ctaText', label: 'CTA Button Text', type: 'text' },
      {
        name: 'scenarios',
        label: 'Scenarios',
        type: 'array',
        itemFields: [
          { name: 'number', label: 'Scenario Number', type: 'number', required: true },
          { name: 'title', label: 'Title', type: 'text', required: true },
          { name: 'subtitle', label: 'Subtitle', type: 'text' },
          { name: 'subtitleExtra', label: 'Subtitle Extra', type: 'text' },
          { name: 'introBody', label: 'Intro Body', type: 'textarea' },
          { name: 'scenario', label: 'Scenario Description', type: 'richtext', required: true },
          {
            name: 'objectives',
            label: 'Objectives',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Objective', type: 'text', required: true },
            ],
          },
          {
            name: 'objectivesGroups',
            label: 'Objectives Groups',
            type: 'array',
            itemFields: [
              { name: 'heading', label: 'Group Heading', type: 'text', required: true },
              {
                name: 'items',
                label: 'Items',
                type: 'array',
                itemFields: [
                  { name: 'text', label: 'Item', type: 'text', required: true },
                ],
              },
            ],
          },
          {
            name: 'planningConsiderations',
            label: 'Planning Considerations',
            type: 'array',
            itemFields: [
              { name: 'heading', label: 'Heading', type: 'text', required: true },
              { name: 'body', label: 'Body', type: 'textarea' },
              {
                name: 'items',
                label: 'Items',
                type: 'array',
                itemFields: [
                  { name: 'text', label: 'Item', type: 'text', required: true },
                ],
              },
            ],
          },
          {
            name: 'howWeHelp',
            label: 'How We Help',
            type: 'group',
            fields: [
              { name: 'intro', label: 'Intro', type: 'textarea' },
              { name: 'body', label: 'Body', type: 'textarea' },
              { name: 'footer', label: 'Footer', type: 'textarea' },
              {
                name: 'steps',
                label: 'Steps',
                type: 'array',
                itemFields: [
                  { name: 'title', label: 'Title', type: 'text', required: true },
                  { name: 'body', label: 'Body', type: 'textarea', required: true },
                ],
              },
              {
                name: 'sections',
                label: 'Sections',
                type: 'array',
                itemFields: [
                  { name: 'heading', label: 'Heading', type: 'text', required: true },
                  { name: 'body', label: 'Body', type: 'textarea' },
                  {
                    name: 'items',
                    label: 'Items',
                    type: 'array',
                    itemFields: [
                      { name: 'text', label: 'Item', type: 'text', required: true },
                    ],
                  },
                ],
              },
              {
                name: 'items',
                label: 'Items',
                type: 'array',
                itemFields: [
                  { name: 'text', label: 'Item', type: 'text', required: true },
                ],
              },
            ],
          },
          {
            name: 'keyTakeaways',
            label: 'Key Takeaways',
            type: 'array',
            itemFields: [
              { name: 'text', label: 'Takeaway', type: 'text', required: true },
            ],
          },
          { name: 'keyTakeawaysFooter', label: 'Takeaways Footer', type: 'textarea' },
          {
            name: 'whyComplex',
            label: 'Why This Is Complex',
            type: 'group',
            fields: [
              { name: 'heading', label: 'Heading', type: 'text' },
              { name: 'body', label: 'Body', type: 'textarea' },
              {
                name: 'items',
                label: 'Items',
                type: 'array',
                itemFields: [
                  { name: 'text', label: 'Item', type: 'text', required: true },
                ],
              },
              { name: 'footer', label: 'Footer', type: 'textarea' },
            ],
          },
          {
            name: 'whatCanGoWrong',
            label: 'What Can Go Wrong',
            type: 'group',
            fields: [
              { name: 'heading', label: 'Heading', type: 'text' },
              { name: 'body', label: 'Body', type: 'textarea' },
              {
                name: 'items',
                label: 'Items',
                type: 'array',
                itemFields: [
                  { name: 'text', label: 'Item', type: 'text', required: true },
                ],
              },
            ],
          },
          {
            name: 'strategies',
            label: 'Strategies',
            type: 'array',
            itemFields: [
              { name: 'heading', label: 'Heading', type: 'text', required: true },
              { name: 'body', label: 'Body', type: 'textarea' },
              {
                name: 'items',
                label: 'Items',
                type: 'array',
                itemFields: [
                  { name: 'text', label: 'Item', type: 'text', required: true },
                ],
              },
            ],
          },
          {
            name: 'phasingExample',
            label: 'Phasing Example',
            type: 'group',
            fields: [
              { name: 'heading', label: 'Heading', type: 'text' },
              {
                name: 'items',
                label: 'Items',
                type: 'array',
                itemFields: [
                  { name: 'text', label: 'Item', type: 'text', required: true },
                ],
              },
            ],
          },
          {
            name: 'keyTradeoffs',
            label: 'Key Tradeoffs',
            type: 'group',
            fields: [
              { name: 'heading', label: 'Heading', type: 'text' },
              {
                name: 'items',
                label: 'Items',
                type: 'array',
                itemFields: [
                  { name: 'text', label: 'Item', type: 'text', required: true },
                ],
              },
            ],
          },
          { name: 'disclosure', label: 'Disclosure', type: 'textarea', required: true },
        ],
      },
    ],
  },

  // ==========================================================================
  // WELCOME / GENERIC CONTENT BLOCKS
  // ==========================================================================

  welcome: {
    label: 'Welcome Section',
    description: 'Simple heading + body welcome block. Used on homepage.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      { name: 'body', label: 'Body', type: 'richtext', required: true },
    ],
  },

  hero_body: {
    label: 'Hero Body Paragraphs',
    description: 'Additional body paragraphs displayed below hero. Used on process, resources pages.',
    fields: [
      {
        name: 'paragraphs',
        label: 'Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
      { name: 'ctaText', label: 'CTA Text', type: 'text' },
      { name: 'ctaPrefix', label: 'CTA Prefix', type: 'text' },
      { name: 'ctaHref', label: 'CTA Link', type: 'url' },
    ],
  },

  prosperity_insight: {
    label: 'Prosperity Insight',
    description: 'Prosperity insight narrative section.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      {
        name: 'paragraphs',
        label: 'Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
    ],
  },

  how_and_why: {
    label: 'How & Why Section',
    description: 'Explanation section with paragraphs, list, closing text, and CTA.',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text', required: true },
      {
        name: 'paragraphs',
        label: 'Paragraphs',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Paragraph', type: 'textarea', required: true },
        ],
      },
      { name: 'listHeading', label: 'List Heading', type: 'text' },
      {
        name: 'items',
        label: 'Items',
        type: 'array',
        itemFields: [
          { name: 'text', label: 'Item', type: 'text', required: true },
        ],
      },
      { name: 'closing', label: 'Closing Text', type: 'textarea' },
      { name: 'cta', label: 'CTA Text', type: 'text' },
    ],
  },
};

// ==========================================================================
// SITE SETTINGS REGISTRIES
// ==========================================================================

/** Field definitions for the "header" site_settings entry */
export const headerSettingsFields: FieldDefinition[] = [
  {
    name: 'navItems',
    label: 'Navigation Items',
    type: 'array',
    itemFields: [
      { name: 'label', label: 'Label', type: 'text', required: true },
      { name: 'href', label: 'Link URL', type: 'url', required: true },
      { name: 'short', label: 'Short Label (mobile)', type: 'text' },
      {
        name: 'children',
        label: 'Dropdown Items',
        type: 'array',
        itemFields: [
          { name: 'label', label: 'Label', type: 'text', required: true },
          { name: 'href', label: 'Link URL', type: 'url', required: true },
        ],
      },
    ],
  },
  { name: 'ctaText', label: 'CTA Button Text (Desktop)', type: 'text' },
  { name: 'ctaMobileText', label: 'CTA Button Text (Mobile)', type: 'text' },
];

/** Field definitions for the "footer" site_settings entry */
export const footerSettingsFields: FieldDefinition[] = [
  { name: 'companyName', label: 'Company Name', type: 'text', required: true },
  { name: 'description', label: 'Company Description', type: 'textarea' },
  {
    name: 'linkGroups',
    label: 'Footer Link Groups',
    type: 'array',
    itemFields: [
      { name: 'heading', label: 'Group Heading', type: 'text', required: true },
      {
        name: 'links',
        label: 'Links',
        type: 'array',
        itemFields: [
          { name: 'label', label: 'Label', type: 'text', required: true },
          { name: 'href', label: 'Link URL', type: 'url', required: true },
        ],
      },
    ],
  },
  {
    name: 'disclosures',
    label: 'Legal Disclaimers',
    type: 'array',
    itemFields: [
      { name: 'text', label: 'Disclaimer Paragraph', type: 'textarea', required: true },
    ],
  },
  { name: 'insuranceDisclaimer', label: 'Insurance Disclaimer', type: 'textarea' },
  { name: 'privacyPolicyHref', label: 'Privacy Policy URL', type: 'url' },
];

/** Field definitions for the "company" site_settings entry */
export const companySettingsFields: FieldDefinition[] = [
  { name: 'name', label: 'Company Name', type: 'text', required: true },
  { name: 'phone', label: 'Phone Number', type: 'text' },
  { name: 'email', label: 'Email Address', type: 'text' },
  {
    name: 'address',
    label: 'Address',
    type: 'group',
    fields: [
      { name: 'street', label: 'Street', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'zip', label: 'ZIP Code', type: 'text' },
      { name: 'country', label: 'Country', type: 'text' },
    ],
  },
  { name: 'calendlyUrl', label: 'Calendly URL', type: 'url' },
  { name: 'logoUrl', label: 'Logo URL', type: 'image', hint: 'Recommended: 430x465px, PNG with transparent background' },
];

/** Field definitions for the "cta_band_defaults" site_settings entry */
export const ctaBandDefaultsFields: FieldDefinition[] = [
  { name: 'headline', label: 'Default Headline', type: 'text' },
  { name: 'subtext', label: 'Default Subtext', type: 'textarea' },
  { name: 'ctaText', label: 'Default CTA Button Text', type: 'text' },
  { name: 'ctaHref', label: 'Default CTA Link', type: 'url' },
];

/** Map site_settings keys to their field definitions */
export const siteSettingsRegistry: Record<string, { label: string; fields: FieldDefinition[] }> = {
  company: { label: 'Company Information', fields: companySettingsFields },
  header: { label: 'Header / Navigation', fields: headerSettingsFields },
  footer: { label: 'Footer', fields: footerSettingsFields },
  cta_band_defaults: { label: 'CTA Band Defaults', fields: ctaBandDefaultsFields },
};
