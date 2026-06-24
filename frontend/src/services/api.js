import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.detail ||
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';
    const msg = typeof message === 'string' ? message : JSON.stringify(message);
    return Promise.reject(new Error(msg));
  }
);

export const submitEnquiry = async (payload) => {
  const response = await api.post('/api/enquiry', payload);
  return response.data;
};

export const submitDemoClass = async (payload) => {
  const response = await api.post('/api/demo-class', {
    examType: payload.examType,
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    targetScore: payload.targetScore,
    batch: payload.batch,
    mode: payload.mode,
    demoDate: payload.demoDate,
    message: payload.message || null,
  });
  return response.data;
};

export const submitReferral = async (payload) => {
  const response = await api.post('/api/referral', payload);
  return response.data;
};

export const submitEducationLoan = async (payload) => {
  const response = await api.post('/api/education-loan', {
    fullName: payload.fullName,
    email: payload.email,
    phone: payload.phone,
    destination: payload.destination,
    university: payload.university || null,
    courseProgram: payload.courseProgram,
    studyLevel: payload.studyLevel,
    loanType: payload.loanType,
    loanAmount: payload.loanAmount,
    city: payload.city,
    state: payload.state,
    coApplicantName: payload.coApplicantName || null,
    monthlyIncome: payload.monthlyIncome || null,
    message: payload.message || null,
  });
  return response.data;
};

export const fetchTestimonials = async () => {
  const response = await api.get('/api/testimonials');
  return response.data;
};

export const fetchNews = async () => {
  const response = await api.get('/api/news');
  return response.data;
};

export const fetchNewsArticle = async (slug) => {
  const response = await api.get(`/api/news/${slug}`);
  return response.data;
};

export const fetchBlog = async () => {
  const response = await api.get('/api/blog');
  return response.data;
};

export const fetchBlogPost = async (slug) => {
  const response = await api.get(`/api/blog/${slug}`);
  return response.data;
};

export const fetchOffers = async (offerType = null) => {
  const params = offerType ? { offer_type: offerType } : {};
  const response = await api.get('/api/offers', { params });
  return response.data;
};

export default api;
