import React, { useState, useEffect } from 'react';
import { PlusCircle, X, ChevronDown, Check, LayoutDashboard, LineChart } from 'lucide-react';

function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTest, setNewTest] = useState(null);
  const [existingTests, setExistingTests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [analyzingTestId, setAnalyzingTestId] = useState(null);
  
  // Form state
  const [testName, setTestName] = useState('');
  const [domain, setDomain] = useState('Frontend Development');
  const [testType, setTestType] = useState('adaptive');
  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState('');
  const [isDomainDropdownOpen, setIsDomainDropdownOpen] = useState(false);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  const domains = [
    'System-Design',
    'AI-ML',
    'Product-Manager',
  ];

  const testTypes = ['adaptive', 'static'];

  useEffect(() => {
    fetchExistingTests();
  }, []);

  const fetchExistingTests = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('https://intervu-1-0.onrender.com/admin/getTest', {
        method: "POST",
        headers: {
          "Authorization": `${token}`
        },
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setExistingTests(data);
    } catch (error) {
      console.error('Error fetching tests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyze = async (testId) => {
    setAnalyzingTestId(testId);
    let formData = new FormData();
    formData.append('test_id', testId);
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('https://intervu-1-0.onrender.com/admin/analyze', {
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          "Authorization": `${token}`
        },
        credentials: 'include',
        body: formData
        // body: JSON.stringify({ testId }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Analysis result:', data);
      // Handle the analysis result as needed
      alert('Analysis completed successfully!');
    } catch (error) {
      console.error('Error analyzing test:', error);
      alert('Failed to analyze test. Please try again.');
    } finally {
      setAnalyzingTestId(null);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTestName('');
    setDomain('Frontend Development');
    setTestType('adaptive');
    setSkills([]);
    setCurrentSkill('');
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() !== '' && !skills.includes(currentSkill.trim())) {
      setSkills([...skills, currentSkill.trim()]);
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (skills.length === 0) {
      setSubmitError("Please add at least one skill");
      return;
    }
    
    const testData = {
      name: testName,
      domain,
      type: testType,
      skills
    };
    
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      const token = localStorage.getItem("token");
      const response = await fetch('https://intervu-1-0.onrender.com/admin/createTest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `${token}`
        },
        credentials: 'include',
        body: JSON.stringify(testData),
      });
      
      const responseData = await response.json();
      console.log('Response:', responseData);
      
      if (!response.ok) {
        throw new Error(responseData?.message || `Error: ${response.status}`);
      }
      
      setNewTest(responseData);
      setSubmitSuccess(true);
      
      // Refresh existing tests list
      fetchExistingTests();
      
      // Close modal after successful submission
      setTimeout(() => {
        handleCloseModal();
      }, 1500);
      
    } catch (error) {
      console.error('Error submitting test:', error);
      setSubmitError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const TestTable = ({ tests }) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Domain
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Id
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tests.map((test, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {test.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {test.domain}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {test.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {test._id || test.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button
                  onClick={() => handleAnalyze(test._id)}
                  disabled={analyzingTestId === test._id}
                  className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                    analyzingTestId === test._id ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <LineChart className="h-4 w-4 mr-1" />
                  {analyzingTestId === test._id ? 'Analyzing...' : 'Analyze'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <LayoutDashboard className="h-8 w-8 text-indigo-600 mr-3" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Action Button */}
        <div className="flex justify-end">
          <button
            onClick={handleOpenModal}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Test
          </button>
        </div>

        {/* New Test Section */}
        {newTest && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">New Test</h2>
            <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
              <p className="text-green-700">Test created successfully!</p>
            </div>
            <TestTable tests={[newTest]} />
          </div>
        )}

        {/* Existing Tests Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Previously Created Tests</h2>
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">Loading tests...</p>
            </div>
          ) : existingTests.length > 0 ? (
            <TestTable tests={existingTests} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">No tests found. Create your first test!</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={handleCloseModal}
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Create New Test</h3>
                
                {submitSuccess && (
                  <div className="mb-4 p-3 bg-green-50 text-green-800 rounded-md">
                    Test created successfully!
                  </div>
                )}
                
                {submitError && (
                  <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-md">
                    {submitError}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  {/* Test Name */}
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={testName}
                      onChange={(e) => setTestName(e.target.value)}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>

                  {/* Domain Dropdown */}
                  <div className="mb-4">
                    <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
                      Domain
                    </label>
                    <div className="relative mt-1">
                      <button
                        type="button"
                        className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onClick={() => setIsDomainDropdownOpen(!isDomainDropdownOpen)}
                      >
                        <span className="block truncate">{domain}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </span>
                      </button>

                      {isDomainDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                          {domains.map((domainOption) => (
                            <div
                              key={domainOption}
                              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 ${
                                domain === domainOption ? 'bg-indigo-100' : ''
                              }`}
                              onClick={() => {
                                setDomain(domainOption);
                                setIsDomainDropdownOpen(false);
                              }}
                            >
                              <span className="block truncate">{domainOption}</span>
                              {domain === domainOption && (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                  <Check className="h-5 w-5 text-indigo-600" />
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Test Type Dropdown */}
                  <div className="mb-4">
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                      Type
                    </label>
                    <div className="relative mt-1">
                      <button
                        type="button"
                        className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
                      >
                        <span className="block truncate">{testType}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </span>
                      </button>

                      {isTypeDropdownOpen && (
                        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                          {testTypes.map((typeOption) => (
                            <div
                              key={typeOption}
                              className={`cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 ${
                                testType === typeOption ? 'bg-indigo-100' : ''
                              }`}
                              onClick={() => {
                                setTestType(typeOption);
                                setIsTypeDropdownOpen(false);
                              }}
                            >
                              <span className="block truncate">{typeOption}</span>
                              {testType === typeOption && (
                                <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                                  <Check className="h-5 w-5 text-indigo-600" />
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Skills Input */}
                  <div className="mb-4">
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                      Skills
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        id="skills"
                        value={currentSkill}
                        onChange={(e) => setCurrentSkill(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                        placeholder="Add a skill and press Enter"
                      />
                      <button
                        type="button"
                        onClick={handleAddSkill}
                        className="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 sm:text-sm hover:bg-gray-100"
                      >
                        Add
                      </button>
                    </div>
                    
                    {/* Skills Tags */}
                    <div className="mt-2 flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <div key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                          {skill}
                          <button
                            type="button"
                            onClick={() => handleRemoveSkill(skill)}
                            className="flex-shrink-0 ml-1.5 h-4 w-4 rounded-full inline-flex items-center justify-center text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                          >
                            <span className="sr-only">Remove {skill}</span>
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    {skills.length === 0 && (
                      <p className="mt-1 text-sm text-gray-500">
                        Please add at least one skill
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {isSubmitting ? 'Creating...' : 'Create'}
                    </button>
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      disabled={isSubmitting}
                      className={`mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;