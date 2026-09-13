import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config";

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

let projectsCache = null;
let fetchingPromise = null;

const fetchWithRetry = async (url, options = {}, retries = 0) => {
  try {
    return await axios({
      url,
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch (err) {
    if (
      retries < MAX_RETRIES &&
      (err.response?.status >= 500 || !err.response)
    ) {
      console.log(`Retrying request (${retries + 1}/${MAX_RETRIES})...`);
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY * (retries + 1)),
      );
      return fetchWithRetry(url, options, retries + 1);
    }
    throw err;
  }
};

const loadProjects = async () => {
  const apiUrl = `${config.apiBaseUrl}/api/projects`;
  console.log("Fetching projects from:", apiUrl);

  const response = await fetchWithRetry(apiUrl);

  if (!response.data || !Array.isArray(response.data)) {
    throw new Error("Invalid response format");
  }

  // Resolve presigned image URLs where needed
  const resolved = await Promise.all(
    response.data.map(async (project) => {
      if (project.imgUrl?.startsWith("/api/images/")) {
        try {
          const imageRes = await fetchWithRetry(
            `${config.apiBaseUrl}${project.imgUrl}`,
          );
          if (imageRes.data?.url)
            return { ...project, imgUrl: imageRes.data.url };
        } catch (e) {
          console.error("Failed to fetch presigned URL for", project.imgUrl, e);
          // Fall back to a previously cached presigned URL for this project
          const cached = JSON.parse(localStorage.getItem("projects") || "[]");
          const hit = cached.find((p) => p.id === project.id);
          if (hit?.imgUrl && !hit.imgUrl.startsWith("/api/images/")) {
            return { ...project, imgUrl: hit.imgUrl };
          }
        }
      }
      return project;
    }),
  );

  return resolved;
};

// --------------------------------------------------------------------------
// Hook
// --------------------------------------------------------------------------
const useProjects = () => {
  // Initialise from cache synchronously — components that mount after the
  // first fetch already have data on their first render (no loading flash).
  const [projects, setProjects] = useState(projectsCache ?? []);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(projectsCache === null);

  useEffect(() => {
    // Cache hit — nothing to do
    if (projectsCache !== null) {
      setProjects(projectsCache);
      setLoading(false);
      return;
    }

    // Start a fetch (or reuse the one already in flight)
    if (!fetchingPromise) {
      fetchingPromise = loadProjects()
        .then((data) => {
          projectsCache = data;
          localStorage.setItem("projects", JSON.stringify(data));
          return data;
        })
        .catch((err) => {
          // Clear the promise so the next mount can retry
          fetchingPromise = null;
          throw err;
        });
    }

    let mounted = true;

    fetchingPromise
      .then((data) => {
        if (!mounted) return;
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        console.error("Error fetching projects:", err);
        setError(
          err.response?.data?.error || err.message || "Error fetching projects",
        );
        setLoading(false);

        // Best-effort: show stale localStorage data rather than a blank screen
        const stale = localStorage.getItem("projects");
        if (stale) {
          try {
            setProjects(JSON.parse(stale));
          } catch {
            /* ignore parse errors */
          }
        }
      });

    return () => {
      mounted = false;
    };
  }, []); // empty deps — intentional, fetch is managed by the module-level cache

  return { projects, error, loading };
};

export default useProjects;

