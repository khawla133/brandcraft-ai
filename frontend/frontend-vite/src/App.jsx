import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    role: "",
    industry: "",
    skills: "",
    goals: "",
  });
  const [kit, setKit] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setKit(null);
    try {
      const res = await fetch(`${API_BASE}/generate-brand-kit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setKit(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const formFields = [
    { name: "name", label: "Full Name", placeholder: "Jane Doe", icon: "👤" },
    {
      name: "role",
      label: "Target Role",
      placeholder: "Machine Learning Engineer",
      icon: "💼"
    },
    {
      name: "industry",
      label: "Industry",
      placeholder: "FinTech, HealthTech...",
      icon: "🏢"
    },
    {
      name: "skills",
      label: "Key Skills",
      placeholder: "Python, LLMs, MLOps (comma separated)",
      icon: "⚡"
    },
    {
      name: "goals",
      label: "Career Goals",
      placeholder: "e.g. Become a senior AI Engineer at a top tech company",
      textarea: true,
      icon: "🎯"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-gray-100">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            🚀 BrandCraft AI
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Generate a professional LinkedIn headline, About section, resume bullets,
            and a banner tailored to your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8">
              <h2 className="text-2xl font-bold text-white text-center">
                Tell us about yourself
              </h2>
            </div>
            
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {formFields.map((field, index) => (
                  <div key={field.name} className="group">
                    <label 
                      htmlFor={field.name}
                      className="flex items-center gap-3 text-sm font-medium text-gray-200 mb-3"
                    >
                      <span className="text-lg">{field.icon}</span>
                      <span className="uppercase tracking-wider">{field.label}</span>
                    </label>
                    
                    <div className="relative">
                      {field.textarea ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          rows={4}
                          className="w-full px-4 py-4 rounded-2xl bg-gray-800/50 border border-gray-600/30 
                                     text-gray-100 placeholder-gray-400 text-base
                                     focus:ring-2 focus:ring-indigo-400 focus:border-transparent 
                                     transition-all duration-300 outline-none resize-none
                                     hover:bg-gray-800/70 hover:border-gray-500/50
                                     group-hover:shadow-lg"
                        />
                      ) : (
                        <input
                          id={field.name}
                          name={field.name}
                          type="text"
                          value={form[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          className="w-full px-4 py-4 rounded-2xl bg-gray-800/50 border border-gray-600/30 
                                     text-gray-100 placeholder-gray-400 text-base
                                     focus:ring-2 focus:ring-indigo-400 focus:border-transparent 
                                     transition-all duration-300 outline-none
                                     hover:bg-gray-800/70 hover:border-gray-500/50
                                     group-hover:shadow-lg"
                        />
                      )}
                    </div>
                  </div>
                ))}

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 px-8 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 
                               hover:from-indigo-700 hover:to-purple-700 
                               font-bold text-lg transition-all duration-300 
                               disabled:opacity-50 disabled:cursor-not-allowed
                               transform hover:scale-[1.02] active:scale-[0.98]
                               shadow-xl hover:shadow-2xl
                               border border-indigo-500/20"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-3">
                        <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                        Generating your brand kit...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-3">
                        ✨ Generate Brand Kit
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Results Card */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl shadow-2xl overflow-hidden sticky top-8">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8">
              <h2 className="text-2xl font-bold text-white text-center">
                📊 Your Brand Kit
              </h2>
            </div>
            
            <div className="p-8">
              {!kit && !loading && (
                <div className="text-center py-16">
                  <div className="text-7xl mb-6 animate-bounce">🎯</div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Fill in the form and click Generate to see your personalized brand kit.
                  </p>
                </div>
              )}

              {loading && (
                <div className="text-center py-16">
                  <div className="text-7xl mb-6">⏳</div>
                  <p className="text-gray-300 text-lg">
                    Crafting your perfect brand kit...
                  </p>
                  <div className="mt-4 flex justify-center">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
              )}

              {kit && (
                <div className="space-y-8">
                  {kit.headline && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-xl text-indigo-400 flex items-center gap-3">
                        💼 LinkedIn Headline
                      </h3>
                      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 p-6 rounded-2xl border border-indigo-500/20 backdrop-blur-sm">
                        <p className="text-gray-100 leading-relaxed text-lg">{kit.headline}</p>
                      </div>
                    </div>
                  )}

                  {kit.about && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-xl text-green-400 flex items-center gap-3">
                        📝 About Section
                      </h3>
                      <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 p-6 rounded-2xl border border-green-500/20 backdrop-blur-sm">
                        <p className="text-gray-100 leading-relaxed text-base whitespace-pre-wrap">
                          {kit.about}
                        </p>
                      </div>
                    </div>
                  )}

                  {kit.bullets && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-xl text-purple-400 flex items-center gap-3">
                        🎯 Resume Bullets
                      </h3>
                      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 p-6 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
                        <ul className="space-y-3">
                          {kit.bullets.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-4 text-gray-100">
                              <span className="text-purple-400 mt-1 text-lg">•</span>
                              <span className="leading-relaxed text-base">{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}