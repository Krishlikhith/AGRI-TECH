import React, { createContext, useContext, useState, useEffect } from 'react';

interface Job {
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string;
  duration: string;
  postedDate: string;
  requirements: string;
  employer: string;
  contact: string;
}

interface JobContextType {
  savedJobs: Job[];
  saveJob: (job: Job) => void;
  removeJob: (jobId: number) => void;
  isJobSaved: (jobId: number) => boolean;
}

const JobContext = createContext<JobContextType | undefined>(undefined);

export const useJobs = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Load saved jobs from localStorage on mount
    const saved = localStorage.getItem('savedJobs');
    if (saved) {
      setSavedJobs(JSON.parse(saved));
    }
  }, []);

  const saveJob = (job: Job) => {
    setSavedJobs(prev => {
      const updated = [...prev, job];
      localStorage.setItem('savedJobs', JSON.stringify(updated));
      return updated;
    });
  };

  const removeJob = (jobId: number) => {
    setSavedJobs(prev => {
      const updated = prev.filter(job => job.id !== jobId);
      localStorage.setItem('savedJobs', JSON.stringify(updated));
      return updated;
    });
  };

  const isJobSaved = (jobId: number) => {
    return savedJobs.some(job => job.id === jobId);
  };

  return (
    <JobContext.Provider value={{ savedJobs, saveJob, removeJob, isJobSaved }}>
      {children}
    </JobContext.Provider>
  );
};