import config from '../config';

/**
 * Simple hook that returns the resume URL from config.
 * No API call needed - points directly to the public S3 URL.
 * To update the resume, just upload a new file to S3 (with the same name).
 */
const useResume = () => {
  return {
    resumeUrl: config.resumeUrl,
    loading: false,
    error: null,
    refetch: () => {} // No-op, kept for API compatibility
  };
};

export default useResume;

