import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import Button from '../components/Button';
import CTASection from '../components/CTASection';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  console.log('Slug:', slug); // Debug: Log the slug
  const post = blogPosts.find((p) => p.slug === slug);
  console.log('Post:', post); // Debug: Log the post object

  if (!post) {
    return (
      <section className="section bg-white min-h-screen pt-28">
        <div className="container-custom mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Blog Post Not Found</h2>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog">
            <Button variant="primary">Back to Blog</Button>
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | BeamX Solutions Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:url" content={`https://beamxsolutions.com/blog/${post.slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <section className="section bg-white min-h-screen pt-28">
        <div className="container-custom mx-auto px-4 sm:px-6">
          <article className="max-w-3xl mx-auto">
            <header className="mb-8">
              <Link
                to="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
                aria-label="Back to blog"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Blog
              </Link>
              <div className="relative h-64 md:h-80 overflow-hidden rounded-lg mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 text-white bg-blue-600 text-xs font-medium px-2 py-1 rounded">
                  {post.category}
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4">{post.title}</h1>
              <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {post.readTime}
                </div>
              </div>
            </header>
            <div className="prose prose-lg max-w-none mb-12 text-gray-800">
              {post.fullContent}
            </div>
            <hr className="my-8" />
            <section className="mb-12">
              <h2 className="text-xl font-semibold mb-4">About the Author</h2>
              <p className="mb-2">
                <strong>{post.authorDetails.name}</strong>
              </p>
              <p className="mb-2">
                <a
                  href={post.authorDetails.website}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {post.authorDetails.website}
                </a>
              </p>
              <p>{post.authorDetails.description}</p>
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4">Leave a Comment</h2>
              <form className="max-w-lg mx-auto space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                    Comment *
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 text-sm"
                    required
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 text-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                    Website
                  </label>
                  <input
                    type="url"
                    id="website"
                    name="website"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 text-sm"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="save"
                    name="save"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="save" className="ml-2 block text-sm text-gray-700">
                    Save my name, email, and website in this browser for the next time I comment.
                  </label>
                </div>
                <Button type="submit" variant="primary" className="text-sm">
                  Submit
                </Button>
              </form>
            </section>
            <hr className="my-8" />
            <p className="text-sm text-gray-500 text-center">
              BeamX Solutions (2025) All rights reserved
            </p>
          </article>
        </div>
      </section>
      <CTASection
        title="Ready to Transform Your Data Strategy?"
        subtitle="Let's discuss how we can help you unlock the full potential of your data."
        primaryButtonText="Get Started"
        primaryButtonHref="/contact"
        secondaryButtonText="Explore Services"
        secondaryButtonHref="/services"
      />
    </>
  );
};

export default BlogPostPage;