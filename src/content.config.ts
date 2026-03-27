import type { SchemaContext } from 'astro/content/config';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const defaultOrder = 100;

const createFacultySchema = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    avatar: image().optional(),
    email: z.email().optional(),
    order: z.number().default(defaultOrder),
  });

const createStudentSchema = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    avatar: image().optional(),
    email: z.email().optional(),
    order: z.number().default(defaultOrder),
    year: z.number(),
    major: z.string(),
  });

const createAlumniSchema = ({ image }: SchemaContext) =>
  z.object({
    name: z.string(),
    avatar: image().optional(),
    email: z.email().optional(),
    order: z.number().default(defaultOrder),
    year: z.number(),
    destination: z.string(),
  });

export const collections = {
  faculty: defineCollection({
    loader: glob({ pattern: '**/index.md', base: './content/members/faculty' }),
    schema: createFacultySchema,
  }),
  student: defineCollection({
    loader: glob({ pattern: '**/index.md', base: './content/members/student' }),
    schema: createStudentSchema,
  }),
  alumni: defineCollection({
    loader: glob({ pattern: '**/index.md', base: './content/members/alumni' }),
    schema: createAlumniSchema,
  }),
  projects: defineCollection({
    loader: glob({ pattern: '**/index.md', base: './content/projects' }),
    schema: ({ image }: SchemaContext) =>
      z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        heroImage: image().optional(),
        tags: z.array(z.string()).default([]),
      }),
  }),
};
