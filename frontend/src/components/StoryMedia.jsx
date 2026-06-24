import { resolveMediaUrl } from '../utils/mediaUrl';

export default function StoryMedia({
  mediaType,
  mediaUrl,
  className = 'aspect-video',
  alt = 'Student success story',
  variant = 'default',
  showBadge = true,
}) {
  const src = resolveMediaUrl(mediaUrl);
  if (!src || !mediaType) return null;

  const isReel = variant === 'reel' && mediaType === 'video';

  const badge = showBadge ? (
    <span
      className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm"
      style={{ background: 'rgba(165,0,0,0.85)' }}
    >
      {isReel ? 'Reel' : mediaType === 'video' ? 'Video' : 'Photo'}
    </span>
  ) : null;

  if (mediaType === 'video') {
    const video = (
      <video
        src={src}
        controls
        playsInline
        preload="metadata"
        className="w-full h-full object-cover"
      />
    );

    if (isReel) {
      return (
        <div className="flex justify-center py-5 px-4 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800">
          <div className="relative w-full max-w-[240px] aspect-[9/16] rounded-[1.75rem] overflow-hidden shadow-2xl ring-1 ring-white/15">
            {badge}
            {video}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.45), transparent)' }}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={`relative overflow-hidden bg-gray-900 ${className}`}>
        {badge}
        {video}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
      {badge}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16"
        style={{ background: 'linear-gradient(to top, rgba(17,17,17,0.35), transparent)' }}
      />
    </div>
  );
}
