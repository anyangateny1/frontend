import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import config from '../config';

const CACHE_KEY = 'resumeUrl';
const CACHE_EXPIRY_KEY = 'resumeUrlExpiry';
const CACHE_DURATION = 50 * 60 * 1000; // 50 minutes (presigned URL valid for 60)

const useResume = () => {
  const [resumeUrl, setResumeUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCachedUrl = () => {
    const cached = localStorage.getItem(CACHE_KEY);
    const expiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    
    if (cached && expiry && Date.now() < parseInt(expiry, 10)) {
      return cached;
    }
    
    // Clear expired cache
    localStorage.removeItem(CACHE_KEY);
    localStorage.removeItem(CACHE_EXPIRY_KEY);
    return null;
  };

  const cacheUrl = (url) => {
    localStorage.setItem(CACHE_KEY, url);
    localStorage.setItem(CACHE_EXPIRY_KEY, (Date.now() + CACHE_DURATION).toString());
  };

  const fetchResumeUrl = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Check cache first
      const cachedUrl = getCachedUrl();
      if (cachedUrl) {
        setResumeUrl(cachedUrl);
        setLoading(false);
        return;
      }

      const apiUrl = `${config.apiBaseUrl}/api/files/Anyang_Ateny_Resume.pdf`;
      console.log('Fetching resume URL from:', apiUrl);

      const response = await axios.get(apiUrl);
      
      if (response.data?.url) {
        setResumeUrl(response.data.url);
        cacheUrl(response.data.url);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err) {
      console.error('Error fetching resume URL:', err);
      setError(err.message || 'Failed to fetch resume');
      
      const fallbackUrl = localStorage.getItem(CACHE_KEY);
      if (fallbackUrl) {
        setResumeUrl(fallbackUrl);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResumeUrl();
  }, [fetchResumeUrl]);

  return {
    resumeUrl,
    loading,
    error,
    refetch: fetchResumeUrl
  };
};

export default useResume;

