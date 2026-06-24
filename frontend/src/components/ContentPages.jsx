import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiUser } from 'react-icons/fi';
import { HOME_THEME as T } from '../utils/constants';

export function formatPostDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function ContentCard({ post, basePath }) {
  return (
    <Link
      to={`${basePath}/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
      style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.06)' }}
    >
      <div className="relative h-44 bg-gray-100 overflow-hidden">
        {post.cover_image_url ? (
          <img
            src={post.cover_image_url}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-white text-sm font-semibold px-4 text-center"
            style={{ background: T.gradientRed }}
          >
            Vision International
          </div>
        )}
        {post.is_featured && (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase text-white"
            style={{ background: T.red }}
          >
            Featured
          </span>
        )}
        {post.category && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-gray-700">
            {post.category}
          </span>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
          <span className="flex items-center gap-1"><FiCalendar size={12} /> {formatPostDate(post.published_at || post.created_at)}</span>
          <span className="flex items-center gap-1"><FiUser size={12} /> {post.author}</span>
        </div>
        <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[#A50000] transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed flex-1 line-clamp-3">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1 text-sm font-semibold mt-4" style={{ color: T.red }}>
          Read more <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ContentListHero({ badge, title, highlight, subtitle }) {
  return (
    <section className="pt-32 pb-12 text-white" style={{ background: T.gradientHero }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-4 border border-white/15"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          {badge}
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {title} <span style={{ color: T.red }}>{highlight}</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">{subtitle}</p>
      </div>
    </section>
  );
}

export function renderBody(body) {
  return body.split('\n\n').map((block, i) => {
    const trimmed = block.trim();
    if (!trimmed) return null;
    if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      return (
        <h3 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-2">
          {trimmed.replace(/\*\*/g, '')}
        </h3>
      );
    }
    if (trimmed.startsWith('|')) {
      return (
        <pre key={i} className="overflow-x-auto text-sm bg-gray-50 rounded-xl p-4 my-4 border border-gray-100 text-gray-700">
          {trimmed}
        </pre>
      );
    }
    const html = trimmed
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br />');
    return (
      <p
        key={i}
        className="text-gray-600 leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  });
}
