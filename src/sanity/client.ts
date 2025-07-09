// src/sanity/client.ts
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: '5pwi3cp3',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-07-08',
});
