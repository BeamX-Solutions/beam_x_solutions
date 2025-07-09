// src/sanity/queries.ts
export const getAllPostsQuery = `*[_type == "post"]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "author": author->name,
  "category": category->title,
  "image": mainImage.asset->url
} | order(publishedAt desc)`;

export const getPostBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  body,
  "author": author->name,
  "category": category->title,
  "image": mainImage.asset->url
}`;
