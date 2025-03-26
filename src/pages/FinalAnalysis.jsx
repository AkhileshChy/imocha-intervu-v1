import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Gauge, Brain, MessageSquare, Lightbulb, Code, Trophy, CheckCircle, XCircle, Target, MessageCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Drawer from '../components/Drawer';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const descriptions = {
    problem_solving_ability: "Ability to analyze and solve complex problems effectively",
    technical_proficiency: "Mastery of technical concepts and implementation",
    structured_thinking: "Capability to organize thoughts and approaches systematically",
    real_world_application: "Practical application of knowledge in real scenarios",
    communication_skills: "Effectiveness in conveying ideas and concepts"
};

function FinalAnalysis() {
    const [scores, setScores] = useState(null);
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const testId = queryParams.get("testId");
    const userId = queryParams.get("userId");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [transcriptions, setTranscriptions] = useState("");


    useEffect(() => {
        const fetchScores = async () => {
            try {
                let formData = new FormData();
                formData.append('test_id', testId);
                formData.append('user_id', userId);
                const token = localStorage.getItem("token");
                const response = await fetch('https://intervu-1-0.onrender.com/admin/get_score', {
                    method: 'POST',
                    headers: {
                        "Authorization": `${token}`
                    },
                    credentials: 'include',
                    body: formData
                });
                const res = await response.json();
                const { assessment, ...scoreData } = res.score;
                setScores(scoreData);
                console.log(res.transcript)
                setTranscriptions(res.transcript)
                setAssessment(assessment);
            } catch (err) {
                setError('Failed to fetch scores');
                // Fallback data for development
                setScores({
                    problem_solving_ability: 6.5,
                    technical_proficiency: 7.0,
                    structured_thinking: 5.5,
                    real_world_application: 6.0,
                    communication_skills: 6.0
                });
                setAssessment({
                    "Overall Summary": "The candidate demonstrated some knowledge of overfitting and its causes, but struggled to provide specific solutions and explanations.",
                    "Feedback": {
                        "Strengths": "The candidate was able to identify some common techniques.",
                        "Weaknesses": "The candidate lacked confidence and clarity in their responses."
                    },
                    "Areas for Improvement": [
                        "Develop a deeper understanding of machine learning concepts",
                        "Improve problem-solving skills",
                        "Enhance communication skills"
                    ]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error || !scores) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-red-600">Error: {error}</div>
            </div>
        );
    }

    const totalScore = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
    const overallPercentage = (totalScore / (50 * 5) * 100).toFixed(1); // Assuming max score is 10 for each category

    const labels = Object.keys(scores).map(key =>
        key.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase())
    );

    const radarData = {
        labels: labels,
        datasets: [
            {
                label: 'Score Analysis',
                data: Object.values(scores),
                backgroundColor: 'rgba(99, 102, 241, 0.2)',
                borderColor: 'rgba(99, 102, 241, 1)',
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <button
                onClick={() => setIsDrawerOpen(true)}
                className="fixed top-4 right-4 bg-indigo-600 text-white p-2 rounded-full shadow-lg hover:bg-indigo-700 transition-colors z-50"
                aria-label="Open conversation"
            >
                <MessageCircle className="w-6 h-6" />
            </button>

            <Drawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                data={transcriptions}
            />
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-12">Final Analysis</h1>

                <div className="flex flex-col gap-8">
                    {/* Overall Score Card - Centered */}
                    <div className="max-w-md mx-auto w-full">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <Trophy className="h-8 w-8 text-indigo-600" />
                                <span className="text-3xl font-bold text-indigo-600">{overallPercentage}%</span>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">Overall Score</h2>
                            <p className="text-gray-600 mt-2">Combined performance across all assessment areas</p>
                        </div>
                    </div>

                    {/* First Row: Detailed Breakdown and Score Distribution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Individual Scores Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed Breakdown</h2>
                            {Object.entries(scores).map(([key, score]) => (
                                <div className="mb-6" key={key}>
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="text-lg font-medium text-gray-800">
                                            {key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                                        </h3>
                                        <span className="text-lg font-bold text-indigo-600">{(score / 50 * 100).toFixed(1)}%</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-2">{descriptions[key]}</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div
                                            className="bg-indigo-600 h-2.5 rounded-full"
                                            style={{ width: `${score / 50 * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Radar Chart Card */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Score Distribution</h2>
                            <div className="w-full h-[500px] flex items-center justify-center">
                                <Radar
                                    data={radarData}
                                    options={{
                                        scales: {
                                            r: {
                                                beginAtZero: true,
                                                max: 50,
                                                ticks: {
                                                    stepSize: 10
                                                }
                                            }
                                        },
                                        plugins: {
                                            legend: {
                                                display: false
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Second Row: Overall Summary and Detailed Feedback */}
                    {assessment && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Overall Summary Card */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Overall Summary</h2>
                                <p className="text-gray-700">{assessment["Overall Summary"]}</p>
                            </div>

                            {/* Feedback and Improvements Card */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed Feedback</h2>

                                {/* Strengths */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <h3 className="text-lg font-medium text-gray-800">Strengths</h3>
                                    </div>
                                    <p className="text-gray-700">{assessment.Feedback.Strengths}</p>
                                </div>

                                {/* Weaknesses */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <XCircle className="h-5 w-5 text-red-500" />
                                        <h3 className="text-lg font-medium text-gray-800">Weaknesses</h3>
                                    </div>
                                    <p className="text-gray-700">{assessment.Feedback.Weaknesses}</p>
                                </div>

                                {/* Areas for Improvement */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Target className="h-5 w-5 text-blue-500" />
                                        <h3 className="text-lg font-medium text-gray-800">Areas for Improvement</h3>
                                    </div>
                                    <ul className="list-disc list-inside text-gray-700">
                                        {assessment["Areas for Improvement"].map((area, index) => (
                                            <li key={index} className="mb-1">{area}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FinalAnalysis;