import React, { useState } from 'react';

export default function Admin() {
  const [prefix, setPrefix] = useState('Mr.');
  const [guestName, setGuestName] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const baseUrl = window.location.origin;
  
  const generateLink = () => {
    if (!guestName.trim()) return '';
    return `${baseUrl}/?prefix=${encodeURIComponent(prefix)}&guest=${encodeURIComponent(guestName.trim())}`;
  };

  const generateMessage = () => {
    const link = generateLink();
    if (!link) return '';
    return `ආදරණීය ${prefix} ${guestName.trim()} ❤️

අපගේ ජීවිතයේ ඉතා සුවිශේෂී හා සතුටුදායක දිනයක් වන අපගේ විවාහ මංගල්‍යයේ සතුට ඔබ සමඟ බෙදාගැනීමට ආදරයෙන් ආරාධනා කරමු. 💍✨

කරුණාකර පහත link එක හරහා අපගේ මංගල ආරාධනා පත්‍රය සහ උත්සවයට අදාල සියලු විස්තර නරඹන්න 🌐👇

${link}

මෙම සුන්දර මොහොත අප සමඟ එක්ව සැමරීමට ඔබගේ පැමිණීම අපට මහත් ගෞරවයක් හා සතුටක් වනු ඇත. 💖

ආදරයෙන්,
❤️ බවන්ත සහ අනුරාධා`;
  };

  const copyToClipboard = async (text: string, type: 'link' | 'message') => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      if (type === 'link') {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">Wedding Invitation Link Generator</h1>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="col-span-1 space-y-2">
              <label className="text-sm font-semibold text-slate-600">Prefix</label>
              <select 
                value={prefix} 
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              >
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Mr. & Mrs.">Mr. & Mrs.</option>
                <option value="Family">Family</option>
                <option value="Dear">Dear</option>
              </select>
            </div>
            
            <div className="col-span-1 md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-600">Guest Name</label>
              <input 
                type="text" 
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                placeholder="e.g. Sanjaya"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Generated Link</label>
              <div className="text-sm text-slate-700 break-all font-mono bg-white p-3 rounded border border-slate-100 min-h-[44px]">
                {generateLink() || 'Enter guest name to generate link'}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Message Template</label>
              <div className="text-sm text-slate-700 whitespace-pre-wrap bg-white p-4 rounded border border-slate-100 min-h-[100px]">
                {generateMessage() || 'Enter guest name to view message template'}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
            <button 
              onClick={() => copyToClipboard(generateLink(), 'link')}
              disabled={!guestName.trim()}
              className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold py-3 px-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {copiedLink ? '✓ Copied Link' : 'Copy Link Only'}
            </button>
            <button 
              onClick={() => copyToClipboard(generateMessage(), 'message')}
              disabled={!guestName.trim()}
              className="flex-1 bg-[#0369a1] text-white hover:bg-[#0284c7] font-semibold py-3 px-4 rounded-xl transition-all shadow-sm shadow-[#0369a1]/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {copiedMessage ? '✓ Copied Message' : 'Copy Full Message'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
