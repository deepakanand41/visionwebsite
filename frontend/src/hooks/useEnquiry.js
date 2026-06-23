import { useState } from 'react';
import { submitEnquiry } from '../services/api';

export function useEnquiry() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submit = async (data) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await submitEnquiry(data);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setSuccess(false);
  };

  return { loading, error, success, submit, reset };
}
