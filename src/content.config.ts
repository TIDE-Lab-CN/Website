import type { SchemaContext } from 'astro/content/config';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';
import { getValidDirectionIds } from './consts';

const createBaseSchema = () =>
  z.object({
    direction: z.enum(getValidDirectionIds()),
    tags: z.array(z.string()).default([]),
  });

const createMemberSchema = ({ image }: SchemaContext) => {
  return createBaseSchema().extend({
    name: z.string(),
    role: z.enum(['faculty', 'student', 'alumni']),
    avatar: image().optional().or(z.string().optional()),
    email: z.email().optional(),
    order: z.number().default(100),
  });
};

const createProjectSchema = ({ image }: SchemaContext) => {
  return createBaseSchema().extend({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    heroImage: image().optional().or(z.string().optional()),
  });
};

export const collections = {
  members: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './content/members' }),
    schema: createMemberSchema,
  }),
  projects: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './content/projects' }),
    schema: createProjectSchema,
  }),
};
