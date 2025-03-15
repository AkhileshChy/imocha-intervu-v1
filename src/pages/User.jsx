import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function User() {
  const [interviewId, setInterviewId] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoinTest = async (e) => {
    e.preventDefault();
    if (!interviewId.trim()) {
      setError('Please enter an interview ID');
      return;
    }

    setIsJoining(true);
    setError('');

    try {
        navigate(`/interview/${interviewId}`);
    //   const response = await fetch('https://intervu-1-0.onrender.com/user/joinTest', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ interviewId }),
    //   });

    //   if (!response.ok) {
    //     throw new Error('Invalid interview ID or test not found');
    //   }

    //   const data = await response.json();
      console.log('Joined test:', data);
      // Handle successful join - redirect or show test interface
    } catch (error) {
      setError(error.message || 'Failed to join test. Please try again.');
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join Interview
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your interview ID to begin the test
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleJoinTest}>
            <div>
              <label htmlFor="interviewId" className="block text-sm font-medium text-gray-700">
                Interview ID
              </label>
              <div className="mt-1">
                <input
                  id="interviewId"
                  name="interviewId"
                  type="text"
                  required
                  value={interviewId}
                  onChange={(e) => setInterviewId(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your interview ID"
                />
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      {error}
                    </h3>
                  </div>
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isJoining}
                className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isJoining ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isJoining ? (
                  'Joining...'
                ) : (
                  <>
                    Join Test
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default User;