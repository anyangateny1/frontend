const config = {
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || 'https://yhrh5asyof.execute-api.ap-southeast-2.amazonaws.com/prod',
    s3BaseUrl: 'https://anyang-personal-website.s3.ap-southeast-2.amazonaws.com',
    resumeUrl: 'https://anyang-personal-website.s3.ap-southeast-2.amazonaws.com/files/Anyang_Ateny_Resume.pdf',
    endpoints: {
        projects: '/api/projects',
        contact: '/api/contact'
    }
};

export default config; 
