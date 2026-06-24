import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiUser } from 'react-icons/fi';
import { fetchNews, fetchNewsArticle, fetchBlog, fetchBlogPost } from '../services/api';
import { ContentCard, ContentListHero, formatPostDate, renderBody } from '../components/ContentPages';
import { HOME_THEME as T } from '../utils/constants';

function ContentList({ type }) {
  const isBlog = type === 'blog';
  const fetchList = isBlog ? fetchBlog : fetchNews;
  const basePath = isBlog ? '/blog' : '/news';
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchList()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [type]);

  const featured = posts.find((p) => p.is_featured);
  const rest = posts.filter((p) => p.id !== featured?.id);

  return (
    <main>
      <ContentListHero
        badge={isBlog ? 'Insights & Guides' : 'Latest Updates'}
        title={isBlog ? 'Our' : 'News &'}
        highlight={isBlog ? 'Blog' : 'Articles'}
        subtitle={
          isBlog
            ? 'Expert tips on study abroad planning, test prep, visas, and student success.'
            : 'Stay informed with the latest study abroad news, visa updates, and destination announcements.'
        }
      />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-center text-gray-500 py-20">Loading...</p>
          ) : !posts.length ? (
            <p className="text-center text-gray-500 py-20">No posts published yet. Check back soon.</p>
          ) : (
            <>
              {featured && (
                <Link
                  to={`${basePath}/${featured.slug}`}
                  className="block mb-10 rounded-3xl overflow-hidden border border-gray-100 bg-white group hover:shadow-xl transition-shadow"
                  style={{ boxShadow: '0 8px 32px rgba(165,0,0,0.08)' }}
                >
                  <div className="grid md:grid-cols-2">
                    <div className="h-56 md:h-auto min-h-[220px] bg-gray-100">
                      {featured.cover_image_url ? (
                        <img src={featured.cover_image_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white font-bold" style={{ background: T.gradientRed }}>
                          Featured
                        </div>
                      )}
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <span className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: T.red }}>Featured</span>
                      <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#A50000]">{featured.title}</h2>
                      <p className="text-gray-500 mb-4">{featured.excerpt}</p>
                      <span className="text-sm font-semibold" style={{ color: T.red }}>Read article →</span>
                    </div>
                  </div>
                </Link>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((post) => (
                  <ContentCard key={post.id} post={post} basePath={basePath} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}

function ContentDetail({ type }) {
  const isBlog = type === 'blog';
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const listPath = isBlog ? '/blog' : '/news';
  const listLabel = isBlog ? 'Blog' : 'News & Articles';

  useEffect(() => {
    const fetcher = isBlog ? fetchBlogPost : fetchNewsArticle;
    fetcher(slug)
      .then(setPost)
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug, type]);

  if (loading) {
    return <main className="min-h-screen flex items-center justify-center text-gray-500 pt-32">Loading...</main>;
  }

  if (!post) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center text-gray-500 pt-32 gap-4">
        <p>Article not found.</p>
        <Link to={listPath} className="font-semibold" style={{ color: T.red }}>← Back to {listLabel}</Link>
      </main>
    );
  }

  return (
    <main>
      <section className="pt-32 lg:pt-36 pb-10 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link to={listPath} className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#A50000] mb-6">
            <FiArrowLeft /> Back to {listLabel}
          </Link>
          {post.category && (
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4" style={{ background: T.redSoft, color: T.red }}>
              {post.category}
            </span>
          )}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5"><FiUser /> {post.author}</span>
            <span className="flex items-center gap-1.5"><FiCalendar /> {formatPostDate(post.published_at || post.created_at)}</span>
          </div>
        </div>
      </section>

      {post.cover_image_url && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-2 mb-10">
          <img src={post.cover_image_url} alt="" className="w-full rounded-2xl shadow-lg max-h-[420px] object-cover" />
        </div>
      )}

      <article className="max-w-3xl mx-auto px-4 sm:px-6 pb-20">
        {post.excerpt && (
          <p className="text-lg text-gray-600 font-medium mb-8 leading-relaxed border-l-4 pl-4" style={{ borderColor: T.red }}>
            {post.excerpt}
          </p>
        )}
        <div className="prose prose-gray max-w-none">{renderBody(post.body)}</div>
      </article>
    </main>
  );
}

export function NewsListPage() {
  return <ContentList type="news" />;
}

export function NewsDetailPage() {
  return <ContentDetail type="news" />;
}

export function BlogListPage() {
  return <ContentList type="blog" />;
}

export function BlogDetailPage() {
  return <ContentDetail type="blog" />;
}
