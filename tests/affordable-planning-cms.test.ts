import assert from 'node:assert/strict';
import test from 'node:test';
import { affordablePlanningContent } from '../content/affordable-planning';
import {
  affordablePlanningSectionTypes,
  createAffordablePlanningCmsFixture,
  isAffordablePlanningCmsTargetAllowed,
  mapAffordablePlanningCmsContent,
  resolveAffordablePlanningPageContent,
  simulateAffordablePlanningCmsSave,
} from '../content/affordable-planning-cms';
import { componentRegistry } from '../lib/component-registry';

test('local page content round-trips through existing CMS page/section fields', () => {
  const records = createAffordablePlanningCmsFixture();
  const mapped = mapAffordablePlanningCmsContent(records, affordablePlanningContent.meta);

  assert.deepEqual(mapped, affordablePlanningContent);
  assert.equal(records.length, 11); // Nine visual sections plus disclosures and illustration references.
  assert.deepEqual(records.map((record) => record.sort_order), records.map((_, index) => index));
  assert.ok(records.every((record) => record.is_visible));
});

test('production route fails closed when its CMS page is missing', () => {
  assert.equal(resolveAffordablePlanningPageContent('production', null, affordablePlanningContent), null);
});

test('production route fails closed when its CMS page is unpublished', () => {
  assert.equal(
    resolveAffordablePlanningPageContent(
      'production',
      { is_published: false, content: affordablePlanningContent },
      affordablePlanningContent,
    ),
    null,
  );
});

test('local development still uses fallback content when CMS page is unavailable', () => {
  assert.equal(
    resolveAffordablePlanningPageContent('development', null, affordablePlanningContent),
    affordablePlanningContent,
  );
});

test('representative mocked edits map to the local page preview without mutating source copy', () => {
  let records = createAffordablePlanningCmsFixture();
  const save = (type: typeof affordablePlanningSectionTypes[number], patch: Record<string, unknown>) => {
    const existing = records.find((record) => record.component_type === type)!.content;
    records = simulateAffordablePlanningCmsSave(records, type, { ...existing, ...patch });
  };

  save('affordable_planning_hero', { title: 'Mocked local headline', ctaHref: 'https://example.test/scheduling' });
  const packageContent = records.find((record) => record.component_type === 'affordable_planning_packages')!.content;
  const options = packageContent.options as Record<string, unknown>[];
  save('affordable_planning_packages', { options: [{ ...options[0], price: '$625' }, options[1]] });
  const faqContent = records.find((record) => record.component_type === 'affordable_planning_faq')!.content;
  const faqItems = faqContent.items as Record<string, unknown>[];
  save('affordable_planning_faq', { items: [{ ...faqItems[0], answer: 'Mocked local answer.' }, ...faqItems.slice(1)] });
  save('affordable_planning_disclosures', { advisory: 'Mocked local disclosure.' });
  save('affordable_planning_illustrations', { budgetSrc: '/mock/budget.webp' });

  const preview = mapAffordablePlanningCmsContent(records, {
    title: 'Mocked SEO title',
    meta_description: 'Mocked SEO description',
  });

  assert.equal(preview.hero.title, 'Mocked local headline');
  assert.equal(preview.hero.ctaHref, 'https://example.test/scheduling');
  assert.equal(preview.packages.options[0].price, '$625');
  assert.equal(preview.faqs.items[0].answer, 'Mocked local answer.');
  assert.equal(preview.disclosures.advisory, 'Mocked local disclosure.');
  assert.equal(preview.illustrations.budgetPreview.src, '/mock/budget.webp');
  assert.equal(preview.meta.title, 'Mocked SEO title');
  assert.equal(preview.meta.description, 'Mocked SEO description');
  assert.equal(affordablePlanningContent.hero.title, 'Financial Planning Isn’t Just for the Wealthy.');
  assert.equal(affordablePlanningContent.packages.options[0].price, '$600');
});

test('page-specific field registrations are additive and retain existing editor entries', () => {
  for (const type of affordablePlanningSectionTypes) {
    assert.ok(componentRegistry[type], `missing field definition for ${type}`);
    assert.ok(componentRegistry[type].fields.length > 0);
  }

  assert.equal(componentRegistry.hero.label, 'Hero Section');
  assert.ok(componentRegistry.hero.fields.some((field) => field.name === 'headline'));
  assert.ok(componentRegistry.faq_categories.fields.some((field) => field.name === 'categories'));
  assert.ok(componentRegistry.process_steps.fields.some((field) => field.name === 'steps'));
});

test('missing and hidden records use local fallback copy and image references', () => {
  const records = createAffordablePlanningCmsFixture();
  const hiddenHero = records.find((record) => record.component_type === 'affordable_planning_hero')!;
  hiddenHero.is_visible = false;
  const preview = mapAffordablePlanningCmsContent(records, {});

  assert.equal(preview.hero.title, affordablePlanningContent.hero.title);
  assert.equal(preview.hero.image.src, '/images/affordable/family-planning.webp');
  assert.equal(preview.prosperity.image, '/images/affordable/adviser.webp');
  assert.equal(preview.packages.options[1].image?.src, '/images/affordable/business-owner.webp');
});

test('blank and legacy illustration references resolve to packaged page assets', () => {
  const records = createAffordablePlanningCmsFixture();
  const hero = records.find((record) => record.component_type === 'affordable_planning_hero')!;
  hero.content.imageSrc = '';
  const packages = records.find((record) => record.component_type === 'affordable_planning_packages')!;
  const options = packages.content.options as Record<string, unknown>[];
  options[1].imageSrc = '';
  const adviser = records.find((record) => record.component_type === 'affordable_planning_adviser')!;
  adviser.content.imageSrc = '';
  const illustrations = records.find((record) => record.component_type === 'affordable_planning_illustrations')!;
  illustrations.content.planCoverSrc = '/api/affordable-preview/plan-page-01.webp';

  const mapped = mapAffordablePlanningCmsContent(records);
  assert.equal(mapped.hero.image.src, '/images/affordable/family-planning.webp');
  assert.equal(mapped.packages.options[1].image?.src, '/images/affordable/business-owner.webp');
  assert.equal(mapped.prosperity.image, '/images/affordable/adviser.webp');
  assert.equal(mapped.illustrations.planPages[0].src, '/images/affordable/plan-page-01.webp');
});

test('legacy illustration CMS records preserve their live images in the expanded gallery', () => {
  const records = createAffordablePlanningCmsFixture();
  const section = records.find((record) => record.component_type === 'affordable_planning_illustrations')!;
  delete section.content.galleryItems;
  section.content.planCoverSrc = 'https://media.example.test/live-cover.webp';
  section.content.planCoverAlt = 'Live cover alt';
  section.content.financialOverviewSrc = 'https://media.example.test/live-overview.webp';
  section.content.roadmapSrc = 'https://media.example.test/live-roadmap.webp';
  section.content.budgetSrc = 'https://media.example.test/live-budget.webp';

  const mapped = mapAffordablePlanningCmsContent(records);
  assert.equal(mapped.illustrations.gallery.items.length, 7);
  assert.equal(mapped.illustrations.gallery.items[0].src, 'https://media.example.test/live-cover.webp');
  assert.equal(mapped.illustrations.gallery.items[0].alt, 'Live cover alt');
  assert.equal(mapped.illustrations.gallery.items[2].src, 'https://media.example.test/live-overview.webp');
  assert.equal(mapped.illustrations.gallery.items[4].src, 'https://media.example.test/live-roadmap.webp');
  assert.equal(mapped.illustrations.gallery.items[5].src, 'https://media.example.test/live-budget.webp');
});

test('local CMS reads reject the production Supabase project and allow isolated targets only', () => {
  assert.equal(
    isAffordablePlanningCmsTargetAllowed('isolated', 'https://ealafgyzpvgphdkhtqkv.supabase.co', 'development', 'ealafgyzpvgphdkhtqkv'),
    false,
  );
  assert.equal(
    isAffordablePlanningCmsTargetAllowed('isolated', 'http://127.0.0.1:54321', 'development', 'local'),
    true,
  );
  assert.equal(
    isAffordablePlanningCmsTargetAllowed('isolated', 'https://test-project.supabase.co', 'development', 'test-project'),
    true,
  );
  assert.equal(
    isAffordablePlanningCmsTargetAllowed('isolated', 'https://test-project.supabase.co', 'development', 'different-project'),
    false,
  );
  assert.equal(
    isAffordablePlanningCmsTargetAllowed('isolated', 'https://test-project.supabase.co', 'production', 'test-project'),
    false,
  );
});
