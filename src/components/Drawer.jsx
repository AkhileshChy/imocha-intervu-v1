import React from 'react';
import { MessageCircle, X, User } from 'lucide-react';



function Drawer({ isOpen, onClose, data }) {
  return (
    <div
      className={`fixed inset-y-0 right-0 w-[40%] bg-indigo-100 backdrop-blur-sm shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } z-50`}
    >
      <div className="h-full flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-indigo-500 text-white">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Conversation History</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-indigo-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {data.Conversation.conversation.map((item, index) => (
            <div key={index} className="space-y-3">
              {/* Question */}
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-300 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 bg-white rounded-lg rounded-tl-none px-3 py-2">
                  <p className="text-md text-black ">{item.question}</p>
                </div>
              </div>

              {/* Answer */}
              <div className="flex gap-2 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 bg-white rounded-lg rounded-tr-none px-3 py-2">
                  <p className="text-sm text-black">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Drawer;