import { useState, useEffect } from 'react';
import { fetchTestimonials } from '../services/api';

function normalizeTestimonial(t) {
  return {
    id: t.id,
    name: t.name,
    destination: t.destination,
    university: t.university,
    course: t.course,
    review: t.review,
    rating: t.rating,
    avatarColor: t.avatar_color || t.avatarColor || '#fde9d1',
    initial: t.initial,
    highlight: t.highlight,
    mediaType: t.media_type || t.mediaType || null,
    mediaUrl: t.media_url || t.mediaUrl || null,
  };
}

const FALLBACK = [
  normalizeTestimonial({
    id: 1, name: 'Priya Sharma', destination: 'Canada 🇨🇦',
    university: 'University of Toronto', course: 'MSc Data Science',
    review: 'Vision Overseas made my dream of studying in Canada a reality.',
    rating: 5, avatar_color: '#fde9d1', initial: 'PS',
  }),
];

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials()
      .then((data) => setTestimonials(data.map(normalizeTestimonial)))
      .catch(() => setTestimonials(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return { testimonials, loading };
}
