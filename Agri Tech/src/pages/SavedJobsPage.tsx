import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, IndianRupee, Bookmark, Search } from 'lucide-react';

interface SavedJob {
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

const SavedJobsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const response = await fetch('/api/saved-jobs');
      if (!response.ok) {
        throw new Error('Failed to fetch saved jobs');
      }
      const data = await response.json();
      setSavedJobs(data);
    } catch (err) {
      setError('Failed to load saved jobs. Please try again later.');
      console.error('Error fetching saved jobs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveJob = async (jobId: number) => {
    try {
      const response = await fetch(`/api/saved-jobs/${jobId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to remove job');
      }
      
      setSavedJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    } catch (err) {
      console.error('Error removing job:', err);
      // Show error toast or message
    }
  };

  const filteredJobs = savedJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading saved jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Saved Jobs</h1>
            <p className="text-gray-600">Keep track of interesting job opportunities and land listings</p>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Search saved jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          {error ? (
            <div className="bg-error-100 text-error-700 p-4 rounded-md">
              {error}
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="space-y-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h2>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            Posted on {new Date(job.postedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center">
                            <IndianRupee size={16} className="mr-1" />
                            {job.salary}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          job.type === 'Seasonal'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {job.type}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-700">Requirements</h3>
                          <p className="mt-1 text-sm text-gray-600">{job.requirements}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-700">Contact Information</h3>
                          <p className="mt-1 text-sm text-gray-600">
                            {job.employer}<br />
                            {job.contact}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => navigate(`/jobs/apply`, { state: { job } })}
                        className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Apply Now
                      </button>
                      <button
                        onClick={() => handleRemoveJob(job.id)}
                        className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
                      >
                        <Bookmark className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bookmark className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No saved jobs</h3>
              <p className="text-gray-600 mb-4">Start exploring jobs and save the ones you're interested in!</p>
              <button
                onClick={() => navigate('/jobs')}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Browse Jobs
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedJobsPage;