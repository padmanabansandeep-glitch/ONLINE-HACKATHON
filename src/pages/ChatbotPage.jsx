import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { askCareerCounsellor } from '../services/aiCounsellorService';
import {
  Bot,
  User,
  Send,
  Sparkles,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  ShieldCheck,
  Check,
  CornerDownLeft
} from 'lucide-react';

export default function ChatbotPage() {
  const { studentProfile } = useAuth();
  const { language, t } = useLanguage();

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('vista_chat_history');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 1,
        sender: 'bot',
        text: language === 'ta'
          ? `வணக்கம்! நான் **விஸ்டா AI தொழிற்கல்வி ஆலோசகர்**.\n\n10 அல்லது 12-ஆம் வகுப்பிற்குப் பின் என்ன படிக்கலாம், குறைந்த கட்டண படிப்புகள் எவை, வெப் டெவலப்மெண்ட், எலக்ட்ரீசியன் அல்லது EV வாகன தொழில்நுட்பம் பற்றி என்னிடம் தாராளமாகக் கேட்கலாம்.`
          : `Hello! I am **VISTA AI**, your personalized vocational and career education counsellor.\n\nI can help you explore courses after Class 10 or 12, compare ITI vs Diploma, find options within your budget, or guide you on certifications in English and Tamil. How can I help you today?`,
        source: 'VISTA Guidance System',
        time: 'Just now'
      }
    ];
  });

  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSuggestions, setActiveSuggestions] = useState(() => {
    if (language === 'ta') {
      return [
        '10-ஆம் வகுப்பு முடித்தபின் என்ன படிக்கலாம்?',
        '12-ஆம் வகுப்பு முடித்தபின் என்ன படிக்கலாம்?',
        'குறைந்த செலவில் படிக்கும் தொழிற்கல்விகள் எவை?',
        'வெப் டெவலப்மெண்ட் படிக்க என்ன திறன்கள் தேவை?'
      ];
    }
    return [
      'Which vocational courses can I study after Class 10?',
      'What options are available after Class 12?',
      'Which options fit my education budget?',
      'What skills are needed for web development?'
    ];
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('vista_chat_history', JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (messageToSend) => {
    const text = (messageToSend || inputValue).trim();
    if (!text || loading) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const result = await askCareerCounsellor({
        message: text,
        language,
        studentProfile,
        chatHistory: messages.slice(-6)
      });

      const botMessage = {
        id: Date.now() + 1,
        sender: 'bot',
        text: result.reply,
        source: result.source,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
      if (result.suggestions && result.suggestions.length > 0) {
        setActiveSuggestions(result.suggestions);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: Date.now(),
        sender: 'bot',
        text: language === 'ta'
          ? "உரையாடல் வரலாறு அழிக்கப்பட்டது. தொழிற்கல்வி குறித்து உங்கள் கேள்விகளை கேட்கலாம்."
          : "Conversation history cleared. Feel free to ask any career or vocational education questions.",
        source: 'VISTA System',
        time: 'Just now'
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-xl gradient-banner flex items-center justify-center text-white shadow-sm">
              <Bot className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
              {language === 'ta' ? 'AI தொழிற்கல்வி ஆலோசகர்' : 'Interactive Career Advisor'}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            {t('chatbotTitle')}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {t('chatbotSubtitle')}
          </p>
        </div>

        <button
          onClick={handleClearHistory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-500 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Chat</span>
        </button>
      </div>

      {/* Main Chat Container */}
      <div className="glass-card rounded-3xl border border-slate-200 dark:border-slate-800 flex flex-col h-[600px] overflow-hidden shadow-xl">
        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
              >
                {isBot && (
                  <div className="w-8 h-8 rounded-xl gradient-banner flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-xl p-4 sm:p-5 rounded-3xl text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? 'bg-white dark:bg-slate-800/95 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-tl-none shadow-md'
                      : 'bg-brand-600 text-white rounded-tr-none shadow-md shadow-brand-500/20 font-medium'
                  }`}
                >
                  {/* Markdown formatted text rendering with bold and bullet highlights */}
                  <div className="whitespace-pre-line space-y-2">
                    {msg.text.split('\n').map((line, idx) => {
                      if (line.startsWith('**') && line.endsWith('**')) {
                        return (
                          <p key={idx} className="font-bold text-slate-900 dark:text-white">
                            {line.replace(/\*\*/g, '')}
                          </p>
                        );
                      }
                      if (line.startsWith('• ') || line.startsWith('- ')) {
                        return (
                          <div key={idx} className="flex items-start gap-1.5 ml-2">
                            <span className="text-brand-500">•</span>
                            <span>{line.substring(2)}</span>
                          </div>
                        );
                      }
                      return <p key={idx}>{line}</p>;
                    })}
                  </div>

                  {/* Message footer timestamp and source tag */}
                  <div className="mt-2 pt-1 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] opacity-70">
                    <span>{msg.time}</span>
                    {isBot && msg.source && (
                      <span className="flex items-center gap-1 font-semibold">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" />
                        <span>{msg.source}</span>
                      </span>
                    )}
                  </div>
                </div>

                {!isBot && (
                  <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl gradient-banner flex items-center justify-center text-white shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-3xl glass-card border border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                <span>{language === 'ta' ? 'AI யோசிக்கிறது...' : 'VISTA AI is thinking...'}</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompt Buttons */}
        <div className="p-3 bg-slate-50/70 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 overflow-x-auto flex items-center gap-2 scrollbar-none">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider shrink-0 px-1">
            {t('suggestedQuestionsTitle')}:
          </span>
          {activeSuggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sug)}
              className="text-[11px] font-medium px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors shrink-0 shadow-sm"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t('chatInputPlaceholder')}
              className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-600 to-violet-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-brand-500/20 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all flex items-center gap-1.5"
            >
              <span>{t('sendBtn')}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* AI Advisory Disclaimer */}
      <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 text-xs leading-relaxed flex items-start gap-2 border border-slate-200 dark:border-slate-700">
        <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <p>{t('aiDisclaimer')}</p>
      </div>
    </div>
  );
}
