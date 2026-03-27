import type { SchemaContext } from 'astro/content/config';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const defaultOrder = 100;

function createFacultySchema({ image }: SchemaContext) {
  return z.object({
    name: z.string(),
    avatar: image(),
    email: z.email().optional(),
    order: z.number().default(defaultOrder),
  });
}

function createStudentSchema({ image }: SchemaContext) {
  return z.object({
    name: z.string(),
    avatar: image(),
    email: z.email().optional(),
    order: z.number().default(defaultOrder),
    year: z.number(),
    major: z.string(),
  });
}

function createAlumniSchema({ image }: SchemaContext) {
  return z.object({
    name: z.string(),
    avatar: image(),
    email: z.email().optional(),
    order: z.number().default(defaultOrder),
    year: z.number(),
    destination: z.string(),
  });
}

function createActivitiesSchema(_: SchemaContext) {
  return z.object({
    title: z.string(),
    date: z.coerce.date(),
  });
}

export const collections = {
  faculty: defineCollection({
    loader: glob({ pattern: '**/index.md', base: './src/content/members/faculty' }),
    schema: createFacultySchema,
  }),
  student: defineCollection({
    loader: glob({ pattern: '**/index.md', base: './src/content/members/student' }),
    schema: createStudentSchema,
  }),
  alumni: defineCollection({
    loader: glob({ pattern: '**/index.md', base: './src/content/members/alumni' }),
    schema: createAlumniSchema,
  }),
  activities: defineCollection({
    loader: glob({ pattern: '**/index.md', base: './src/content/activities/news' }),
    schema: createActivitiesSchema,
  }),
};
