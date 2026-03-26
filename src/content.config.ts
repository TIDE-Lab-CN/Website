import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { getValidDirectionIds } from './consts';
import { z } from "astro/zod";

const createBaseSchema = () => z.object({
    direction: z.enum(getValidDirectionIds()),
    tags: z.array(z.string()).default([]),
});

const createMemberSchema = () => {
    return createBaseSchema().extend({
        name: z.string(),
        role: z.enum(['faculty', 'student', 'alumni']),
        avatar: z.string().optional(),
        email: z.email().optional(),
        order: z.number().default(100),
    });
};

const createProjectSchema = () => {
    return createBaseSchema().extend({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        heroImage: z.string().optional(),
    });
};

export const collections = {
    members: defineCollection({
        loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/members" }),
        schema: createMemberSchema()
    }),
    projects: defineCollection({
        loader: glob({ pattern: "**/*.{md,mdx}", base: "./content/projects" }),
        schema: createProjectSchema()
    }),
};