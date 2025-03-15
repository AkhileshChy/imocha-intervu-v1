import Navbar from '../components/Navbar';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Navbar />
            <section className="w-full h-screen bg-gray-50 flex flex-col justify-center items-center text-center m-0 p-0">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/5 to-brand-purple/5" />
                <h1 className="text-6xl font-bold text-gray-900 z-10">
                    AI-Powered <span className="text-indigo-600">Technical</span>{" "}

                    <span className="block mt-2">Assessment</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed z-10 mt-5">
                    Enhance your communication skills with advanced AI feedback,
                    specifically designed for{" "}
                    <span className="text-indigo-600 font-semibold">
                        Indian professionals
                    </span>
                </p>
                <Link to='/login'>
                    <button
                        className="text-white bg-indigo-600 px-10 py-4 rounded-lg hover:text-black
                    transition-all duration-300 transform hover:scale-105 mt-8 z-10"
                    >
                        Start Assessment
                    </button>
                </Link>
            </section>
        </>
    );
};

export default Home;
