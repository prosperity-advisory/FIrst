import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { componentRegistry } from '../lib/component-registry';
import { mapAboutAdviserProfile } from '../lib/content';

test('About adviser profile is registered with all editable fields and approved defaults', () => {
  const definition = componentRegistry.about_adviser_profile;
  const fieldNames = definition.fields.map((field) => field.name);

  assert.deepEqual(fieldNames, ['heading', 'subtitle', 'tagline', 'paragraphs', 'image', 'imageAlt']);
  assert.equal(definition.defaultContent?.heading, 'Meet Marcus, ChFC®');
  assert.equal(definition.defaultContent?.subtitle, 'Principal Adviser | Investment Adviser Representative');
  assert.equal(definition.defaultContent?.tagline, 'Professional Education. Real-World Experience. Personalized Guidance.');

  const paragraphs = definition.defaultContent?.paragraphs as { text: string }[];
  assert.equal(paragraphs.length, 8);
  assert.equal(paragraphs[0].text.startsWith('At Prosperity Planning & Advisory, you work directly with Marcus, ChFC®'), true);
  assert.equal(paragraphs[7].text.endsWith('without pressure or obligation.'), true);
  assert.equal(definition.defaultContent?.image, '/images/affordable/adviser.webp');
  assert.equal(definition.defaultContent?.imageAlt, 'Marcus, principal adviser at Prosperity Planning & Advisory.');
  assert.equal(existsSync(join(process.cwd(), 'public', 'images', 'affordable', 'adviser.webp')), true);
});

test('About profile registry exposes a prefilled image and editable paragraph array', () => {
  const definition = componentRegistry.about_adviser_profile;
  const paragraphsField = definition.fields.find((field) => field.name === 'paragraphs');
  const imageField = definition.fields.find((field) => field.name === 'image');
  const altField = definition.fields.find((field) => field.name === 'imageAlt');

  assert.equal(paragraphsField?.type, 'array');
  assert.equal(paragraphsField?.itemFields?.[0]?.type, 'textarea');
  assert.equal(imageField?.type, 'image');
  assert.equal(altField?.type, 'text');
});

test('About profile content is mapped from the CMS section fields', () => {
  const cmsSection = {
    heading: 'CMS heading',
    subtitle: 'CMS subtitle',
    tagline: 'CMS tagline',
    paragraphs: [{ text: 'CMS biography paragraph' }],
    image: '/media/cms-portrait.webp',
    imageAlt: 'CMS portrait alternative text',
  };

  assert.deepEqual(mapAboutAdviserProfile(cmsSection), {
    heading: 'CMS heading',
    subtitle: 'CMS subtitle',
    tagline: 'CMS tagline',
    paragraphs: ['CMS biography paragraph'],
    image: '/media/cms-portrait.webp',
    imageAlt: 'CMS portrait alternative text',
  });
  assert.equal(mapAboutAdviserProfile(null), null);
});

test('revised About service and text sections use existing editable generic fields', () => {
  const serviceFields = componentRegistry.about_services.fields;
  const serviceItems = serviceFields.find((field) => field.name === 'items');
  const textFields = componentRegistry.text_section.fields;

  assert.equal(serviceItems?.type, 'array');
  assert.equal(serviceItems?.itemFields?.[0]?.type, 'text');
  assert.deepEqual(textFields.filter((field) => ['heading', 'body'].includes(field.name)).map((field) => field.name), ['heading', 'body']);
});
