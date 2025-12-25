import config from '../config';

const useResume = () => {
  return {
    resumeUrl: config.resumeUrl,
    loading: false,
    error: null,
    refetch: () => {} // No-op, kept for API compatibility
  };
};

export default useResume;
