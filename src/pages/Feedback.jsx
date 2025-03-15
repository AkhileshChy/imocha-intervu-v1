import React, { useState } from 'react';
import { StarRating } from '../components/StarRating';
import { Link } from 'react-router-dom';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, feedback });
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl font-semibold text-center text-[#4F46E5] mb-4">
          Share Your Interview Experience
        </h1>

        <p className="text-center text-gray-600 mb-12">
          Your feedback helps us improve our interview process and create a better experience for
          future candidates.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl text-center text-gray-700">
              How would you rate your overall interview experience?
            </h2>
            <div className="flex justify-center">
              <StarRating
                onChange={setRating}
                starClassName="text-4xl text-[#4F46E5]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl text-gray-700">
              Would you like to share more about your experience? (Optional)
            </h2>
            <textarea
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
              placeholder="Share your thoughts about the interview process, questions, or any suggestions for improvement..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
          </div>

          <Link to='/'>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
              >
                Submit Feedback
              </button>
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Feedback;
