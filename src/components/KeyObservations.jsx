import React from 'react';
import { CheckCircle, CheckCircle2 } from 'lucide-react';

function KeyObservations({ data }) {
    return (
        <div className="bg-white rounded-lg p-6 shadow-md">
            {/* Header */}
            <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="w-6 h-6 text-indigo-800" />
                <h2 className="text-xl font-semibold text-gray-800">Key Observations</h2>
            </div>

            <div className="space-y-6">
                {/* Overall Summary */}
                <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Overall Summary</h3>
                    <p className="text-gray-600">{data['Overall Summary']}</p>
                </div>

                {/* Feedback */}
                <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Feedback</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                                <h4 className="text-md font-medium text-gray-700">Strengths</h4>
                            </div>

                            <p className="text-gray-600">{data.Feedback.Strengths}</p>
                        </div>
                        <div>
                        <div className="flex items-center space-x-2">
                                <CheckCircle2 className="w-5 h-5 text-red-500" />
                                <h4 className="text-md font-medium text-gray-700">Weakness</h4>
                            </div>
                            <p className="text-gray-600">{data.Feedback.Weaknesses}</p>
                            
                        </div>

                    </div>
                </div>

                {/* Areas for Improvement */}
                <div>
                    <h3 className="text-lg font-medium text-gray-800 mb-2">Areas for Improvement</h3>
                    {data['Areas for Improvement'].map((item, index) => (
                        <div key={index} className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-blue-600" />
                            <p className="text-gray-700">{item}</p>
                        </div>
                    ))}
                </div>
                
            </div>
        </div>
    );
}

export default KeyObservations;
