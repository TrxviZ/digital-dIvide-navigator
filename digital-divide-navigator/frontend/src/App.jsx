// File: frontend/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import { Sparkles, FileText, User, CheckCircle } from 'lucide-react';

const App = () => {
  const [formType, setFormType] = useState('');
  const [paragraph, setParagraph] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedData, setExtractedData] = useState(null);

  const handleProcess = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://192.168.12.118:5000/api/extract-data',{
        formType: formType,
        paragraph: paragraph
      });
      setExtractedData(response.data);
    } catch (err) {
      alert("Error connecting to local AI. Make sure Ollama is running.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans">
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-2">Digital Divide Navigator</h1>
        <p className="text-slate-600">Bridging the gap between your stories and formal applications.</p>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-4 text-blue-700">
            <FileText size={20} />
            <h2 className="text-xl font-semibold">1. Select Form & Tell your Story</h2>
          </div>
          
          <label className="block mb-4">
            <span className="text-sm font-medium text-slate-700">What form are you filling?</span>
            <select 
              className="w-full mt-1 p-2 border rounded-md bg-slate-50"
              onChange={(e) => setFormType(e.target.value)}
            >
              <option value="">Select a type...</option>
              <option value="scholarship">Scholarship Application</option>
              <option value="job_application">Job Application</option>
              <option value="government_grant">Government Grant</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-medium text-slate-700">Describe your situation in your own words:</span>
            <textarea 
              className="w-full mt-1 p-3 border rounded-md h-64 bg-slate-50"
              placeholder="e.g., I am a first-generation college student from a rural area. I've worked in community service for 3 years and want to become a nurse..."
              value={paragraph}
              onChange={(e) => setParagraph(e.target.value)}
            />
          </label>

          <button 
            onClick={handleProcess}
            disabled={loading || !formType || !paragraph}
            className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:bg-slate-400 flex justify-center items-center gap-2"
          >
            {loading ? "AI is thinking..." : <><Sparkles size={18}/> Analyze & Extract</>}</button>
        </div>

        {/* Result Section */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-100">
          <div className="flex items-center gap-2 mb-4 text-green-700">
            <CheckCircle size={20} />
            <h2 className="text-xl font-semibold">2. Structured Data</h2>
          </div>

          {extractedData ? (
            <div className="space-y-4">
              {Object.entries(extractedData).map(([key, value]) => (
                <div key={key} className="p-3 bg-slate-50 rounded border">
                  <label className="block text-xs font-bold uppercase text-slate-500">{key.replace('_', ' ')}</label>
                  <p className="text-slate-800">{value}</p>
                </div>
              ))}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 font-medium">
                  Success! The AI has organized your paragraph into the required fields. You can now copy these into your official form.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 italic">
              <User size={48} className="mb-4 opacity-20" />
              <p>Click 'Analyze' to see the structured data here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
