import { CSV_COURSES } from '../data/csvDataset';

/**
 * Intelligent AI vocational counselling service.
 * Supports live Gemini / Backend proxy when configured,
 * and strictly recommends courses from the official 19 CSV courses (C01 to C19).
 */

const CSV_COURSES_SUMMARY = CSV_COURSES.map(
  (c) => `[${c.course_id}] ${c.course_name} (${c.field}): ${c.description}`
).join('\n');

export async function askCareerCounsellor({ message, language = 'en', studentProfile = {}, chatHistory = [] }) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const backendUrl = import.meta.env.VITE_AI_ENDPOINT;

  // If live backend endpoint is configured:
  if (backendUrl) {
    try {
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, language, studentProfile, chatHistory, availableCourses: CSV_COURSES }),
      });
      if (response.ok) {
        const data = await response.json();
        return {
          reply: data.reply,
          source: 'Live Gemini Cloud AI',
          suggestions: data.suggestions || getDefaultSuggestions(language),
        };
      }
    } catch (err) {
      console.warn('Backend AI proxy failed, falling back to local counsellor knowledge base', err);
    }
  }

  // If direct client Gemini API key is configured:
  if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY_HERE') {
    try {
      const systemPrompt = `You are "VISTA AI" (விஸ்டா), an empathetic, professional career counsellor specializing in vocational, technical, ITI, and polytechnic skill education in Tamil Nadu and India.
Respond in ${language === 'ta' ? 'Tamil' : 'English'}.
CRITICAL CONSTRAINT: You MUST recommend courses ONLY from this official 19 vocational courses list from the catalog:
${CSV_COURSES_SUMMARY}

DO NOT recommend generic or demo courses outside this list. Reference courses by their exact name and code (e.g. C01, C07, C13, etc.).
Student context:
- Qualification: ${studentProfile.qualification || 'Class 10/12'}
- Budget: ₹${studentProfile.maxBudget || '25000'}
- Career Goals: ${studentProfile.careerGoal || 'Practical skill employment'}
Always provide neutral, realistic advice. Highlight eligibility, skills, and certifications.`;

      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
          ]
        })
      });

      if (res.ok) {
        const json = await res.json();
        const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            reply: text,
            source: 'Gemini 1.5 Flash (Live AI)',
            suggestions: getDefaultSuggestions(language)
          };
        }
      }
    } catch (e) {
      console.warn('Direct Gemini call failed, engaging domain counsellor engine', e);
    }
  }

  // Grounded Domain Knowledge-Base Mode (Strictly citing the 19 CSV courses)
  const lowerMsg = message.toLowerCase();
  let reply = '';
  let suggestions = [];

  const isTamil = language === 'ta' || /[\u0B80-\u0BFF]/.test(message);

  if (isTamil) {
    if (lowerMsg.includes('10') || lowerMsg.includes('பத்தாம்') || lowerMsg.includes('10th')) {
      reply = `**10-ஆம் வகுப்பு முடித்த மாணவர்களுக்கான அதிகாரப்பூர்வ தொழிற்கல்வி படிப்புகள் (CSV அட்டவணை):**\n
1. **[C10] மின்சார வயரிங் & எலக்ட்ரீசியன் (Electrician & Domestic Wiring):** வீட்டு வயரிங், வோல்டேஜ் சோதனை, பாதுகாப்பு மின் இணைப்பு.\n
2. **[C12] மொபைல் போன் பழுதுநீக்குதல் & எலக்ட்ரானிக்ஸ் (Electronics & Mobile Phone Repair):** ஸ்மார்ட்போன் மதர்போர்டு மற்றும் சிப்-லெவல் பழுதுநீக்குதல்.\n
3. **[C07] ஆட்டோமொபைல் டெக்னாலஜி (Automobile Technology):** எஞ்சின் கண்டறிதல், கியர்பாக்ஸ் மற்றும் வாகன சர்வீஸ்.\n
4. **[C02] ஆடை வடிவமைப்பு & தையல் கலை (Fashion Design & Garment Making):** ஆடை வடிவமைப்பு, கட்டிங் மற்றும் பூட்டிக் தையல் கலை.\n\n
💡 **பரிந்துரை:** நீங்கள் உடனடி சுயதொழில் அல்லது வேலைவாய்ப்பை விரும்பினால் C10 அல்லது C12 சிறந்த துவக்கம்.`;
      suggestions = [
        '[C10] எலக்ட்ரீசியன் படிப்பு பற்றிய விவரங்கள்',
        '[C12] மொபைல் போன் பழுதுநீக்கும் திறன் தேவைகள்',
        '[C08] எலக்ட்ரிக் வாகனம் (EV) தொழில்நுட்பம்'
      ];
    } else if (lowerMsg.includes('12') || lowerMsg.includes('பன்னிரண்டாம்') || lowerMsg.includes('12th')) {
      reply = `**12-ஆம் வகுப்பு முடித்த மாணவர்களுக்கான பரிந்துரைக்கப்பட்ட தொழிற்கல்வி படிப்புகள் (CSV அட்டவணை):**\n
1. **[C13] கணினி பயன்பாடுகள் & மென்பொருள் (Computer Applications & Software):** அலுவலக மென்பொருட்கள், டிஜிட்டல் திரைப் பணிகள் மற்றும் புரோகிராமிங் அடிப்படைகள்.\n
2. **[C01] கிராஃபிக் டிசைன் & UI/UX (Graphic Design & UI/UX):** லோகோ, வண்ண சேர்க்கை, UI மற்றும் காட்சி வடிவமைப்பு.\n
3. **[C04] கணக்கியல் & வரிவிதிப்பு - டாலி, ஜிஎஸ்டி (Accounting & Taxation):** புத்தக பராமரிப்பு, இருப்புநிலைக் குறிப்பு, ஜிஎஸ்டி தாக்கல் மற்றும் பில்லிங்.\n
4. **[C15] மருத்துவ ஆய்வகத் தொழில்நுட்பம் (Medical Laboratory Technology):** மாதிரி சோதனை, நுண்ணோக்கி பகுப்பாய்வு மற்றும் நோயறிதல் அறிக்கைகள்.\n\n
💡 **பரிந்துரை:** அலுவலகம் அல்லது டிஜிட்டல் பணிகளில் ஆர்வம் இருந்தால் C13 அல்லது C04 சிறந்த வாய்ப்புகளைத் தரும்.`;
      suggestions = [
        '[C13] கணினி பயன்பாடுகள் படிக்க என்ன தேவை?',
        '[C04] டாலி மற்றும் ஜிஎஸ்டி பயிற்சி விவரங்கள்',
        '[C01] கிராபிக் டிசைன் & UI/UX சான்றிதழ்'
      ];
    } else if (lowerMsg.includes('computer') || lowerMsg.includes('கணினி') || lowerMsg.includes('software') || lowerMsg.includes('மென்பொருள்') || lowerMsg.includes('coding')) {
      reply = `**அதிகாரப்பூர்வ CSV பட்டியலில் உள்ள கணினி மற்றும் டிஜிட்டல் படிப்புகள்:**\n
• **[C13] Computer Applications & Software (IT):**\n  மென்பொருள் பயன்பாடு, அடிப்படை கோடிங் மற்றும் டிஜிட்டல் திரைப் பணிகள்.\n
• **[C01] Graphic Design & UI/UX (Creative & Design):**\n  நிறுவன லோகோ, வண்ண கலை, இணையப்பக்க UI மற்றும் காட்சி வடிவமைப்பு.\n
• **[C03] CAD Drafting, 3D Modelling & Video Editing:**\n  3D மாடலிங், கட்டிட வரைபடங்கள் மற்றும் வீடியோ எடிட்டிங்.\n\n
📌 **வேலைவாய்ப்பு:** ஐடி நிறுவனங்கள், வடிவமைப்பு முகமைகள் மற்றும் அலுவலகங்களில் உதவி மென்பொருள் டெக்னீசியன் பணிகளுக்கு இவை உகந்தது.`;
      suggestions = [
        '[C13] மற்றும் [C01] இரண்டுக்கும் உள்ள வித்தியாசம் என்ன?',
        '[C03] CAD வரைபடங்கள் படிக்க கட்டணம் எவ்வளவு?',
        'முழு பாடப்பிரிவு பட்டியலை காட்டு'
      ];
    } else if (lowerMsg.includes('ev') || lowerMsg.includes('வாகனம்') || lowerMsg.includes('ஆட்டோமொபைல்') || lowerMsg.includes('automobile') || lowerMsg.includes('car')) {
      reply = `**அதிகாரப்பூர்வ CSV பட்டியலில் உள்ள வாகன தொழில்நுட்ப படிப்புகள்:**\n
• **[C07] Automobile Technology (Mechanical & Automotive):**\n  எஞ்சின் கண்டறிதல், கியர்பாக்ஸ் மற்றும் பெட்ரோல்/டீசல் வாகன சர்வீஸ்.\n
• **[C08] Electric Vehicle (EV) Technology (Mechanical & Automotive):**\n  EV பேட்டரி பேக்குகள், எலக்ட்ரிக் மோட்டார்கள் மற்றும் ஸ்மார்ட் சார்ஜிங் நிலையங்கள்.\n
• **[C09] CNC Machining & Mechanical Fitting:**\n  துல்லியமான இயந்திர உதிரிபாகங்கள் தயாரித்தல் மற்றும் CNC கட்டிங்.\n\n
💡 **எதிர்கால தேவை:** C08 எலக்ட்ரிக் வாகன தொழில்நுட்ப வல்லுநர்களுக்கான தேவை தமிழ்நாட்டில் மிக வேகமாக அதிகரித்து வருகிறது.`;
      suggestions = [
        '[C08] EV டெக்னாலஜி படிக்க என்ன தகுதி வேண்டும்?',
        '[C07] ஆட்டோமொபைல் மற்றும் [C08] EV ஒப்பீடு',
        '[C11] சோலார் & புதுப்பிக்கத்தக்க ஆற்றல்'
      ];
    } else if (lowerMsg.includes('மருத்துவம்') || lowerMsg.includes('health') || lowerMsg.includes('hospital') || lowerMsg.includes('lab')) {
      reply = `**அதிகாரப்பூர்வ CSV பட்டியலில் உள்ள சுகாதார மற்றும் மருத்துவ படிப்புகள்:**\n
• **[C14] Healthcare Assistant - Patient Care:**\n  நோயாளி பராமரிப்பு, இரத்த அழுத்தம்/நாடித்துடிப்பு கண்காணிப்பு மற்றும் முதலுதவி.\n
• **[C15] Medical Laboratory Technology:**\n  இரத்த மாதிரி பரிசோதனை, நுண்ணோக்கி ஆய்வுகள் மற்றும் மருத்துவ அறிக்கைகள்.\n
• **[C16] Biomedical Equipment Technology:**\n  மருத்துவமனை எலக்ட்ரானிக் உபகரணங்கள் மற்றும் மருத்துவ கருவிகளை பராமரித்தல்.`;
      suggestions = [
        '[C14] நோயாளி பராமரிப்பு பணி வாய்ப்புகள்',
        '[C15] மருத்துவ ஆய்வக பயிற்சி கட்டணம்',
        '[C16] பயோமெடிக்கல் எக்யூப்மெண்ட் டெக்னீசியன்'
      ];
    } else if (lowerMsg.includes('விவசாயம்') || lowerMsg.includes('agri') || lowerMsg.includes('farm')) {
      reply = `**அதிகாரப்பூர்வ CSV பட்டியலில் உள்ள நவீன விவசாய படிப்புகள்:**\n
• **[C17] Hydroponics & Greenhouse Technology:**\n  மண்ணில்லா விவசாயம் மற்றும் தானியங்கி பசுமைக்குடில் தொழில்நுட்பம்.\n
• **[C18] Organic Farming & Agri-Business:**\n  இயற்கை விவசாயம் மற்றும் சூழல் நட்பு கிராமப்புற வர்த்தகம்.\n
• **[C19] Precision Agriculture - Drone & Sensor Tech:**\n  விவசாய ட்ரோன்கள், சொட்டுநீர் சென்சார்கள் மற்றும் நவீன பண்ணைக் கருவிகள்.`;
      suggestions = [
        '[C17] Hydroponics பயிற்சி விவரங்கள்',
        '[C19] விவசாய ட்ரோன் தொழில்நுட்பம்',
        '[C18] இயற்கை விவசாய வணிகம்'
      ];
    } else {
      reply = `வணக்கம்! நான் உங்கள் **விஸ்டா AI தொழிற்கல்வி ஆலோசகர்**.\n\n
நான் உங்களுக்கு பரிந்துரைக்கும் அனைத்து தொழிற்கல்வி பிரிவுகளும் **அதிகாரப்பூர்வ 19 படிப்புகள் கொண்ட CSV அட்டவணையில் (C01 - C19)** இருந்து மட்டுமே வழங்கப்படும்.\n\n
**19 தொழிற்கல்வி பிரிவுகள்:**\n
• **வடிவமைப்பு:** [C01] கிராபிக் & UI/UX, [C02] ஆடை வடிவமைப்பு, [C03] CAD & 3D\n
• **வணிகம்:** [C04] டாலி & ஜிஎஸ்டி, [C05] சில்லறை வர்த்தகம், [C06] டிஜிட்டல் மார்க்கெட்டிங்\n
• **மெக்கானிக்கல்:** [C07] ஆட்டோமொபைல், [C08] EV வாகனம், [C09] CNC எந்திரங்கள்\n
• **எலக்ட்ரிக்கல்:** [C10] எலக்ட்ரீசியன், [C11] சோலார், [C12] மொபைல் சர்வீஸ்\n
• **தகவல் தொழில்நுட்பம்:** [C13] கணினி பயன்பாடுகள் & மென்பொருள்\n
• **சுகாதாரம்:** [C14] மருத்துவ உதவியாளர், [C15] மெடிக்கல் லேப், [C16] பயோமெடிக்கல்\n
• **விவசாயம்:** [C17] ஹைட்ரோபோனிக்ஸ், [C18] இயற்கை வேளாண்மை, [C19] ட்ரோன் அக்ரி\n\n
உங்களுக்கு விருப்பமான துறையைத் தேர்ந்தெடுத்து என்னிடம் கேட்கலாம்!`;
      suggestions = [
        '10-ஆம் வகுப்பிற்குப் பிறகு சிறந்த படிப்புகள் எவை?',
        '[C13] கணினி பயன்பாடுகள் படிப்பு பற்றி கூறுங்கள்',
        '[C08] எலக்ட்ரிக் வாகனம் (EV) வாய்ப்புகள்',
        '[C10] எலக்ட்ரீசியன் & வயரிங் பயிற்சி'
      ];
    }
  } else {
    // English Logic - Strictly 19 CSV Courses
    if (lowerMsg.includes('10') || lowerMsg.includes('class 10') || lowerMsg.includes('10th') || lowerMsg.includes('after 10')) {
      reply = `**Official Vocational Courses Recommended After Class 10 (From CSV Catalog):**\n
1. **[C10] Electrician & Domestic Wiring (Electrical & Electronics):**
   - Safe wiring, voltage testing, circuit repairs, and domestic installations.\n
2. **[C12] Electronics & Mobile Phone Repair (Electrical & Electronics):**
   - Chip-level repair of smartphone motherboards, screen replacements, and circuitry.\n
3. **[C07] Automobile Technology (Mechanical & Automotive):**
   - Engine diagnosis, gearboxes, and multi-brand vehicle servicing.\n
4. **[C02] Fashion Design & Garment Making (Creative & Design):**
   - Boutique styling, apparel pattern making, and garment cutting.\n\n
💡 **Recommendation:** C10 and C12 offer the fastest route to independent trade mastery or entry-level service employment within 6 months.`;
      suggestions = [
        'Details about [C10] Electrician & Domestic Wiring',
        'Skills learned in [C12] Mobile Phone Repair',
        'Tell me about [C08] Electric Vehicle (EV) Technology'
      ];
    } else if (lowerMsg.includes('12') || lowerMsg.includes('class 12') || lowerMsg.includes('12th') || lowerMsg.includes('after 12')) {
      reply = `**Official Vocational Courses Recommended After Class 12 (From CSV Catalog):**\n
1. **[C13] Computer Applications & Software (IT):**
   - Software tools, digital data workflows, and programming fundamentals.\n
2. **[C01] Graphic Design & UI/UX (Creative & Design):**
   - Brand logos, color palettes, interface design in Figma and Photoshop.\n
3. **[C04] Accounting & Taxation (Tally, GST) (Business & Finance):**
   - Bookkeeping, balance sheets, GST filing, and business invoicing.\n
4. **[C15] Medical Laboratory Technology (Healthcare):**
   - Sample analysis, diagnostic pathology tests, and clinical lab reporting.\n\n
💡 **Recommendation:** If you prefer office or tech settings, C13 and C04 have high placement demand across private and public sectors.`;
      suggestions = [
        'What jobs can I get after [C13] Computer Applications?',
        'Career paths after [C04] Accounting & Taxation (Tally, GST)',
        'What skills are in [C01] Graphic Design & UI/UX?'
      ];
    } else if (lowerMsg.includes('computer') || lowerMsg.includes('software') || lowerMsg.includes('it') || lowerMsg.includes('coding') || lowerMsg.includes('programming')) {
      reply = `**Computer & IT Courses in the Official CSV Catalog:**\n
• **[C13] Computer Applications & Software (IT):**
  - Software, coding basics, and digital screen-based work.
  - Roles: Computer Assistant, Software Operator, Junior Data Associate.\n
• **[C01] Graphic Design & UI/UX (Creative & Design):**
  - Digital creative design, UI layouts, and brand visual assets.
  - Roles: UI/UX Designer, Visual Designer, Digital Artist.\n
• **[C03] CAD Drafting, 3D Modelling & Video Editing (Creative & Design):**
  - 3D modelling, architectural drafts, and multimedia video editing.\n\n
📌 All three courses match students looking for clean computer workstation environments without physical mechanical grease.`;
      suggestions = [
        'Compare [C13] Computer Applications and [C01] UI/UX',
        'What software is used in [C03] CAD Drafting?',
        'Which courses fit a budget under ₹20,000?'
      ];
    } else if (lowerMsg.includes('ev') || lowerMsg.includes('electric vehicle') || lowerMsg.includes('automobile') || lowerMsg.includes('car') || lowerMsg.includes('engine')) {
      reply = `**Automotive & Mechanical Courses in the Official CSV Catalog:**\n
• **[C07] Automobile Technology:**
  - Engine diagnosis, gearboxes, and vehicle maintenance.\n
• **[C08] Electric Vehicle (EV) Technology:**
  - EV lithium battery packs, electric motors, and smart charging stations.\n
• **[C09] CNC Machining & Mechanical Fitting:**
  - Precision mechanical parts, CNC cutting, and metal assembly.\n\n
⭐ **Industry Outlook:** C08 EV Technology is Tamil Nadu's fastest growing manufacturing sector with EV hubs in Hosur and Chennai.`;
      suggestions = [
        'What qualifications are needed for [C08] EV Technology?',
        'Difference between [C07] Automobile and [C08] EV',
        'Tell me about [C11] Solar & Renewable Energy'
      ];
    } else if (lowerMsg.includes('health') || lowerMsg.includes('medical') || lowerMsg.includes('hospital') || lowerMsg.includes('lab')) {
      reply = `**Healthcare Courses in the Official CSV Catalog:**\n
• **[C14] Healthcare Assistant (Patient Care):**
  - Vital signs monitoring, patient bedside care, and first aid assistance.\n
• **[C15] Medical Laboratory Technology:**
  - Blood sample testing, microscope analysis, and pathology reporting.\n
• **[C16] Biomedical Equipment Technology:**
  - Maintaining hospital electronics, ultrasound/ECG equipment, and clinical sensors.`;
      suggestions = [
        'Career opportunities for [C14] Healthcare Assistant',
        'Eligibility for [C15] Medical Laboratory Technology',
        'What does a [C16] Biomedical Technician do?'
      ];
    } else if (lowerMsg.includes('agri') || lowerMsg.includes('farm') || lowerMsg.includes('plant') || lowerMsg.includes('greenhouse')) {
      reply = `**Sustainable Agriculture Courses in the Official CSV Catalog:**\n
• **[C17] Hydroponics & Greenhouse Technology:**
  - Soilless agriculture and automated climate-controlled greenhouses.\n
• **[C18] Organic Farming & Agri-Business:**
  - Eco-friendly crop cultivation and rural agribusiness entrepreneurship.\n
• **[C19] Precision Agriculture (Drone & Sensor Tech):**
  - Agricultural drone surveying, automated drip irrigation, and soil sensors.`;
      suggestions = [
        'Learn more about [C17] Hydroponics Technology',
        'How does [C19] Drone Agriculture work?',
        'Show me the full 19-course list'
      ];
    } else {
      reply = `Hello! I am your **VISTA AI Vocational Counsellor**.\n\n
All of my recommendations are drawn **strictly from the official 19 courses defined in the CSV catalog (C01 through C19)**—never from mockup or demo placeholders.\n\n
**The 19 Official Vocational Courses:**\n
• **Creative & Design:** [C01] Graphic Design & UI/UX, [C02] Fashion Design, [C03] CAD & 3D Drafting\n
• **Business & Finance:** [C04] Accounting & Taxation (Tally, GST), [C05] Retail Management, [C06] Digital Marketing\n
• **Mechanical & Automotive:** [C07] Automobile Tech, [C08] EV Technology, [C09] CNC Machining\n
• **Electrical & Electronics:** [C10] Electrician & Wiring, [C11] Solar Technician, [C12] Mobile Phone Repair\n
• **Information Technology:** [C13] Computer Applications & Software\n
• **Healthcare:** [C14] Healthcare Assistant, [C15] Medical Lab Tech, [C16] Biomedical Equipment\n
• **Agriculture:** [C17] Hydroponics, [C18] Organic Farming, [C19] Precision Drone Agriculture\n\n
Tell me your educational background or preferred field to get started!`;
      suggestions = [
        'Which courses are best after Class 10?',
        'Tell me about [C13] Computer Applications',
        'What can I learn in [C08] EV Technology?',
        'Which courses fit a ₹20,000 budget?'
      ];
    }
  }

  return {
    reply,
    source: 'VISTA CSV Catalog Engine (19 Courses)',
    suggestions,
  };
}

function getDefaultSuggestions(language) {
  if (language === 'ta') {
    return [
      '10-ஆம் வகுப்பிற்குப் பிறகு சிறந்த படிப்புகள் எவை?',
      '[C13] கணினி பயன்பாடுகள் படிப்பு பற்றி கூறுங்கள்',
      '[C08] எலக்ட்ரிக் வாகனம் (EV) வாய்ப்புகள்',
      '[C10] எலக்ட்ரீசியன் & வயரிங் பயிற்சி'
    ];
  }
  return [
    'Which courses are best after Class 10?',
    'Tell me about [C13] Computer Applications',
    'What can I learn in [C08] EV Technology?',
    'Which courses fit a ₹20,000 budget?'
  ];
}
