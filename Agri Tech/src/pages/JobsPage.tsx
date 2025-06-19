import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Calendar, IndianRupee, Search, Filter, Bookmark } from 'lucide-react';
import { useJobs } from '../contexts/JobContext';

const jobs = [
  {
    id: 1,
    title: 'Farm Labor Required for Paddy Harvest',
    location: 'Mysuru, Karnataka',
    type: 'Seasonal',
    salary: '500-600 per day',
    duration: '15 days',
    postedDate: '2024-02-20',
    requirements: 'Experience in paddy harvesting',
    employer: 'Krishna Farms',
    contact: '+91 9876543210'
  },
  {
    id: 2,
    title: 'Agricultural Land for Lease',
    location: 'Belgaum, Karnataka',
    type: 'Long Term',
    salary: '50,000 per acre/year',
    duration: '3 years',
    postedDate: '2024-02-19',
    requirements: 'Must have farming experience',
    employer: 'Patil Estates',
    contact: '+91 9876543211'
  },
];

const JobsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { saveJob, removeJob, isJobSaved } = useJobs();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || job.location.includes(selectedLocation);
    return matchesSearch && matchesType && matchesLocation;
  });

  const handleSaveJob = (job: any, event: React.MouseEvent) => {
    event.stopPropagation();
    if (isJobSaved(job.id)) {
      removeJob(job.id);
    } else {
      saveJob(job);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Agricultural Jobs in Karnataka</h1>
          <p className="text-lg text-gray-600">Find farm labor, land leasing, and agricultural employment opportunities</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search jobs..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Seasonal">Seasonal</option>
              <option value="Long Term">Long Term</option>
              <option value="Daily Wage">Daily Wage</option>
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="Mysuru">Mysuru</option>
              <option value="Belgaum">Belgaum</option>
              <option value="Bangalore">Bangalore</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
            >
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
                  <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
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
                  onClick={() => navigate(`/jobs/apply/${job.id}`, { state: { job } })}
                  className="flex-1 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Apply Now
                </button>
                <button
                  onClick={(e) => handleSaveJob(job, e)}
                  className={`flex items-center justify-center px-4 py-2 border rounded-lg transition-colors ${
                    isJobSaved(job.id)
                      ? 'border-primary-600 text-primary-600 hover:bg-primary-50'
                      : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobsPage;