const config = {
  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL ||
    "https://dpfga0wss8.execute-api.ap-southeast-2.amazonaws.com",

  s3BaseUrl: "https://anyang-personal-website.s3.ap-southeast-2.amazonaws.com",

  resumeUrl:
    "https://anyang-personal-website.s3.ap-southeast-2.amazonaws.com/files/Anyang_Ateny_Resume.pdf",

  endpoints: {
    projects: "/projects",
    contact: "/contact",
  },
};

export default config;
