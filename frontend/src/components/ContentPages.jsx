import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCalendar, FiChevronDown, FiUser } from 'react-icons/fi';
import { HOME_THEME as T } from '../utils/constants';
import { resolveMediaUrl } from '../utils/mediaUrl';

export function formatPostDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function ContentCard({ post, basePath }) {
  const coverSrc = resolveMediaUrl(post.cover_image_url, { streaming: false });
  return (
    <Link
      to={`${basePath}/${post.slug}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lg"
      style={{ boxShadow: '0 4px 20px rgba(165,0,0,0.06)' }}
    >
      <div className="relative h-44 bg-gray-100 overflow-hidden">
        {coverSrc ? (
          <img
            src={coverSrc}
            alt={post.title}
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
    <section className="pt-32 lg:pt-36 pb-12 text-white" style={{ background: T.gradientHero }}>
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

function isHtmlBody(body) {
  if (!body) return false;
  const trimmed = body.trim();
  return trimmed.startsWith('<') || /<(p|h[1-6]|div|img|ul|ol|video|blockquote)\b/i.test(trimmed);
}

function resolveMediaInHtml(html) {
  if (!html) return '';
  const base = import.meta.env.VITE_API_BASE_URL || '';
  return html.replace(
    /(src|href)="(\/api\/media\/[^"]+|\/uploads\/[^"]+)"/g,
    (_, attr, url) => `${attr}="${base}${url}"`,
  );
}

function getQuillListIndent(li) {
  const cls = [...li.classList].find((c) => c.startsWith('ql-indent-'));
  return cls ? Number(cls.replace('ql-indent-', '')) : 0;
}

function listTagForQuillType(type) {
  return type === 'ordered' ? 'ol' : 'ul';
}

function cleanupQuillListItem(li) {
  li.querySelector('.ql-ui')?.remove();
  [...li.classList].forEach((c) => {
    if (c.startsWith('ql-indent-')) li.classList.remove(c);
  });
  li.removeAttribute('data-list');
}

function convertQuillList(ol) {
  const items = [...ol.children].filter((node) => node.tagName === 'LI' && node.hasAttribute('data-list'));
  if (!items.length) return null;

  const rootType = items[0].getAttribute('data-list') || 'bullet';
  const root = document.createElement(listTagForQuillType(rootType));
  const stack = [{ level: 0, list: root, lastLi: null }];

  for (const li of items) {
    const level = getQuillListIndent(li);
    const type = li.getAttribute('data-list') || rootType;
    cleanupQuillListItem(li);

    while (stack.length > 1 && stack[stack.length - 1].level > level) {
      stack.pop();
    }

    const top = stack[stack.length - 1];
    if (level > top.level) {
      const nested = document.createElement(listTagForQuillType(type));
      if (!top.lastLi) continue;
      top.lastLi.appendChild(nested);
      stack.push({ level, list: nested, lastLi: null });
    }

    const frame = stack[stack.length - 1];
    frame.list.appendChild(li);
    frame.lastLi = li;
  }

  return root;
}

/** Quill stores nested bullets as flat <ol> + ql-indent classes; convert to real nested lists. */
export function normalizeQuillHtml(html) {
  if (!html || typeof document === 'undefined') return html;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  doc.querySelectorAll('ol').forEach((ol) => {
    const converted = convertQuillList(ol);
    if (converted) ol.replaceWith(converted);
  });

  return doc.body.innerHTML;
}

function slugifyHeading(text, index) {
  return (text || `section-${index}`)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '') || `section-${index}`;
}

export function buildTocFromHtml(html) {
  if (!html || typeof document === 'undefined') return { html, items: [] };
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const items = [];
  doc.querySelectorAll('h2, h3').forEach((heading, index) => {
    const text = heading.textContent?.trim();
    if (!text) return;
    const id = heading.id || slugifyHeading(text, index);
    heading.id = id;
    items.push({ id, text, level: heading.tagName.toLowerCase() });
  });
  return { html: doc.body.innerHTML, items };
}

export function TableOfContents({ items }) {
  if (!items.length) return null;
  return (
    <nav className="mb-8 p-5 rounded-2xl border border-gray-100 bg-gray-50" aria-label="Table of contents">
      <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">Table of Contents</h2>
      <ol className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className={item.level === 'h3' ? 'pl-4' : ''}>
            <a
              href={`#${item.id}`}
              className="text-sm font-medium text-gray-700 hover:text-[#A50000] transition-colors"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function ArticleFaqs({ faqs }) {
  const [openIndex, setOpenIndex] = useState(0);
  if (!faqs?.length) return null;

  return (
    <section className="mt-12 pt-8 border-t border-gray-100">
      <h2 className="text-2xl font-bold text-gray-900 mb-5">Frequently Asked Questions</h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => {
          const open = openIndex === index;
          return (
            <div key={faq.question} className="rounded-2xl border border-gray-100 overflow-hidden bg-white">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50"
              >
                <span>{faq.question}</span>
                <FiChevronDown className={`shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
              </button>
              {open && (
                <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export function ArticleContent({ body, faqs, showToc = true }) {
  const { processedHtml, tocItems } = useMemo(() => {
    if (!isHtmlBody(body)) {
      return { processedHtml: null, tocItems: [] };
    }
    const resolved = normalizeQuillHtml(resolveMediaInHtml(body));
    const { html, items } = buildTocFromHtml(resolved);
    return { processedHtml: html, tocItems: showToc ? items : [] };
  }, [body, showToc]);

  if (processedHtml) {
    return (
      <>
        <TableOfContents items={tocItems} />
        <div
          className="article-prose"
          dangerouslySetInnerHTML={{ __html: processedHtml }}
        />
        <ArticleFaqs faqs={faqs} />
      </>
    );
  }

  return (
    <>
      <div className="prose prose-gray max-w-none">{renderLegacyBody(body)}</div>
      <ArticleFaqs faqs={faqs} />
    </>
  );
}

export function renderBody(body) {
  return renderLegacyBody(body);
}

function renderLegacyBody(body) {
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

export function useArticleMeta(post) {
  useEffect(() => {
    if (!post?.meta_keywords) return undefined;
    let meta = document.querySelector('meta[name="keywords"]');
    const created = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'keywords');
      document.head.appendChild(meta);
    }
    const previous = meta.getAttribute('content');
    meta.setAttribute('content', post.meta_keywords);
    return () => {
      if (created) meta.remove();
      else if (previous) meta.setAttribute('content', previous);
    };
  }, [post?.meta_keywords]);
}
