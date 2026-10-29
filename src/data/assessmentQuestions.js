import { CSV_QUESTIONS, CSV_ANSWER_MAPPINGS } from './csvDataset';

export const assessmentQuestions = [
  {
    id: 1,
    questionId: "Q1",
    categoryKey: "careerGoal",
    questionEn: "What is your primary milestone for the next 12 to 24 months?",
    questionTa: "அடுத்த 1 முதல் 2 ஆண்டுகளில் உங்கள் முதன்மையான மைல்கல் அல்லது இலக்கு என்ன?",
    options: [
      {
        optionId: "A",
        textEn: "Earn an immediate skill certification and secure a stable entry-level job or apprenticeship",
        textTa: "உடனடியாக தொழில் திறன் சான்றிதழ் பெற்று நிரந்தர வேலை அல்லது அப்ரண்டிஸ் பயிற்சியில் சேருவது",
        scores: { tech: 6, electronics: 6, automobile: 6, business: 6 }
      },
      {
        optionId: "B",
        textEn: "Acquire hands-on mastery to launch my own local service shop or freelance business",
        textTa: "செய்முறை நிபுணத்துவம் பெற்று சொந்தமாக சர்வீஸ் கடை அல்லது சுயதொழில் தொடங்குவது",
        scores: { electronics: 8, creative: 7, business: 8, automobile: 6 }
      },
      {
        optionId: "C",
        textEn: "Use this vocational diploma as a stepping stone to enter 2nd year Polytechnic or a university degree",
        textTa: "இந்த தொழிற்கல்வியை பயன்படுத்தி பாலிடெக்னிக் 2ஆம் ஆண்டு அல்லது கல்லூரி மேற்படிப்பில் சேருவது",
        scores: { tech: 7, electronics: 7, automobile: 7, healthcare: 6 }
      },
      {
        optionId: "D",
        textEn: "Gain practical experience while keeping family educational investment within budget",
        textTa: "குடும்ப பட்ஜெட்டுக்குள் குறைந்த செலவில் படித்து நடைமுறை அனுபவத்துடன் நல்ல வருமானம் ஈட்டுவது",
        scores: { tech: 5, electronics: 5, business: 5, healthcare: 5, agriculture: 5 }
      }
    ]
  },
  {
    id: 2,
    questionId: "Q2",
    categoryKey: "workEnvironment",
    questionEn: "What is your ideal day-to-day work environment?",
    questionTa: "உங்கள் விருப்பத்திற்குரிய தினசரி வேலை சூழல் எது?",
    options: [
      {
        optionId: "A",
        textEn: "A high-tech computer workstation with high-speed internet and ergonomic setup",
        textTa: "அதிவேக இணையம் மற்றும் கணினி கொண்ட நவீன டிஜிட்டல் அலுவலகம்",
        scores: { tech: 10, creative: 6, business: 6 }
      },
      {
        optionId: "B",
        textEn: "An active workshop or industrial facility with tools, testing meters, and safety equipment",
        textTa: "கருவிகள் மற்றும் உபகரணங்கள் நிறைந்த தொழிற்துறை பட்டறை அல்லது எந்திர கூடம்",
        scores: { electronics: 9, automobile: 9 }
      },
      {
        optionId: "C",
        textEn: "A clean hospital, diagnostic clinic, or community wellness center helping people",
        textTa: "தூய்மையான மருத்துவமனை, ஆய்வகம் அல்லது நோயாளிகளுக்கு உதவும் மருத்துவ மையம்",
        scores: { healthcare: 10 }
      },
      {
        optionId: "D",
        textEn: "Open outdoors, farms, solar rooftop installations, or flexible fieldwork",
        textTa: "திறந்தவெளி, நவீன பண்ணை, சோலார் மேற்கூரை அல்லது களப்பணிகள்",
        scores: { agriculture: 9, electronics: 6 }
      }
    ]
  },
  {
    id: 3,
    questionId: "Q3",
    categoryKey: "learningStyle",
    questionEn: "How do you learn new skills most effectively?",
    questionTa: "புதிய திறன்களை நீங்கள் மிக விரைவாகவும் திறமையாகவும் எதன் மூலம் கற்றுக்கொள்கிறீர்கள்?",
    options: [
      {
        optionId: "A",
        textEn: "100% Practical & Hands-on: Touching tools, testing components, and trial-and-error in a workshop",
        textTa: "100% செய்முறை: கருவிகளை கையாண்டு, பாகங்களை சோதித்து, பட்டறையில் நேரடியாக செய்து பார்ப்பதன் மூலம்",
        scores: { practicalBonus: 10, automobile: 6, electronics: 6 }
      },
      {
        optionId: "B",
        textEn: "Interactive digital practice: Following step-by-step video labs on my laptop or mobile",
        textTa: "டிஜிட்டல் பயிற்சி: மடிக்கணினியில் மென்பொருள் அல்லது வீடியோ பயிற்சிகளை படிப்படியாக செய்து பார்ப்பதன் மூலம்",
        scores: { tech: 8, creative: 6, business: 5 }
      },
      {
        optionId: "C",
        textEn: "Balanced approach: Understanding the basic principle first, then immediately applying it on real equipment",
        textTa: "சமநிலையான முறை: அடிப்படை விதியை முதலில் புரிந்து கொண்டு, பின் உடனடியாக செய்முறையில் இறங்குதல்",
        scores: { healthcare: 7, electronics: 6, automobile: 6 }
      },
      {
        optionId: "D",
        textEn: "Strictly theoretical textbooks and memorizing concepts for written examinations",
        textTa: "பாடப்புத்தகங்களை படித்து மனப்பாடம் செய்து தேர்வு எழுதுதல் மட்டுமே",
        scores: { business: 6 }
      }
    ]
  },
  {
    id: 4,
    questionId: "Q4",
    categoryKey: "creative",
    questionEn: "Which of these creative expressions resonates with your personal talents?",
    questionTa: "உங்கள் தனிப்பட்ட திறமைகளுடன் கீழ்க்கண்டவற்றில் எந்த படைப்பு செயல் பொருந்துகிறது?",
    options: [
      {
        optionId: "A",
        textEn: "Graphic designing, UI design, color palettes, and creating captivating visual logos",
        textTa: "கிராபிக் டிசைனிங், UI வடிவமைப்பு, வண்ண சேர்க்கைகள் மற்றும் நிறுவன லோகோ உருவாக்குதல்",
        scores: { creative: 10, tech: 4 }
      },
      {
        optionId: "B",
        textEn: "Fashion styling, fabric selection, garment cutting, and designer boutique tailoring",
        textTa: "ஆடை வடிவமைப்பு, நவீன தையல் கலை, ஃபேஷன் மற்றும் பூட்டிக் மேலாண்மை",
        scores: { creative: 10, business: 5 }
      },
      {
        optionId: "C",
        textEn: "3D modelling, architectural drafting, or video editing",
        textTa: "3D மாடலிங், கட்டிட வரைபடங்கள் அல்லது வீடியோ எடிட்டிங்",
        scores: { creative: 9, tech: 6 }
      },
      {
        optionId: "D",
        textEn: "I prefer logical formulas, technical maintenance, or medical tasks over visual design",
        textTa: "கலை வடிவமைப்பை விட தர்க்கரீதியான கணக்குகள், இயந்திர பராமரிப்பு அல்லது மருத்துவ பணிகள் பிடிக்கும்",
        scores: { automobile: 6, electronics: 6, healthcare: 6, business: 6 }
      }
    ]
  },
  {
    id: 5,
    questionId: "Q5",
    categoryKey: "business",
    questionEn: "How do you feel about accounting, managing shop inventory, and business finance?",
    questionTa: "கணக்கு வைப்பது, ஜி.எஸ்.டி, கடை இருப்பு மேலாண்மை மற்றும் வர்த்தக பணிகளைப் பற்றி என்ன நினைக்கிறீர்கள்?",
    options: [
      {
        optionId: "A",
        textEn: "Excited: I enjoy numbers, balance sheets, GST filing, and billing software like Tally",
        textTa: "ஆர்வம்: எண்கள், வரவு செலவு கணக்கு, ஜிஎஸ்டி மற்றும் டாலி பில்லிங் மென்பொருட்களை விரும்புவேன்",
        scores: { business: 10 }
      },
      {
        optionId: "B",
        textEn: "I want to start and manage my own retail shop, service franchise, or trade venture",
        textTa: "சுயதொழில் நிறுவனம், சொந்த கடை அல்லது சர்வீஸ் மையம் தொடங்கி வெற்றிகரமாக நடத்த ஆசை",
        scores: { business: 10, creative: 4 }
      },
      {
        optionId: "C",
        textEn: "Interested in digital marketing, running social media ads, and online customer sales",
        textTa: "டிஜிட்டல் மார்க்கெட்டிங், சமூக வலைத்தள விளம்பரங்கள் மற்றும் ஆன்லைன் விற்பனையில் ஆர்வம்",
        scores: { business: 8, creative: 7 }
      },
      {
        optionId: "D",
        textEn: "I prefer working on physical machinery or code rather than accounting ledgers",
        textTa: "கணக்கு புத்தகங்களை விட எந்திரங்கள் அல்லது தொழில்நுட்ப பணிகளில் ஈடுபடவே விரும்புகிறேன்",
        scores: { tech: 6, automobile: 6, electronics: 6 }
      }
    ]
  },
  {
    id: 6,
    questionId: "Q6",
    categoryKey: "automobile",
    questionEn: "How excited are you when you look at motorbikes, cars, engines, and Electric Vehicles (EV)?",
    questionTa: "இருசக்கர வாகனங்கள், கார்கள், என்ஜின்கள் மற்றும் எலக்ட்ரிக் வாகனங்களை (EV) பார்க்கும்போது உங்கள் ஆர்வம் எப்படி இருக்கும்?",
    options: [
      {
        optionId: "A",
        textEn: "Thrilled: I want to diagnose modern engines, understand gearboxes, and service vehicles",
        textTa: "மிகுந்த உற்சாகம்: என்ஜின் இயக்கம், கியர்பாக்ஸ் மற்றும் வாகனங்களை சர்வீஸ் செய்வதை நேசிக்கிறேன்",
        scores: { automobile: 10 }
      },
      {
        optionId: "B",
        textEn: "Very curious about EV battery packs, electric motors, and smart charging stations",
        textTa: "மின்சார வாகனங்களின் (EV) பேட்டரி, மோட்டார் மற்றும் சார்ஜிங் தொழில்நுட்பங்களில் அதிக ஆர்வம்",
        scores: { automobile: 10, electronics: 8 }
      },
      {
        optionId: "C",
        textEn: "I like precision mechanical parts, CNC cutting, and assembling metal components",
        textTa: "துல்லியமான உதிரிபாகங்கள் தயாரித்தல், லேத்/CNC எந்திரங்கள் மற்றும் அசெம்பிளி செய்வதில் ஆர்வம்",
        scores: { automobile: 8, electronics: 6 }
      },
      {
        optionId: "D",
        textEn: "I enjoy driving, but prefer not to get grease or oil on my hands",
        textTa: "வாகனம் ஓட்ட பிடிக்கும், ஆனால் மெக்கானிக் வேலைகளில் ஈடுபட விருப்பமில்லை",
        scores: { business: 6, tech: 6, healthcare: 4 }
      }
    ]
  },
  {
    id: 7,
    questionId: "Q7",
    categoryKey: "electronics",
    questionEn: "How do you feel about working with wires, electronic circuits, and power systems?",
    questionTa: "மின்சார வயரிங், எலக்ட்ரானிக் சர்க்யூட்கள் மற்றும் உபகரணங்களுடன் வேலை செய்வதை எவ்வாறு உணர்கிறீர்கள்?",
    options: [
      {
        optionId: "A",
        textEn: "I love measuring voltage, fixing loose connections, and setting up home wiring safely",
        textTa: "வோல்டேஜ் அளவிடுவது, மின் இணைப்புகளை சரிசெய்வது மற்றும் வயரிங் செய்வது எனக்கு மிகவும் பிடிக்கும்",
        scores: { electronics: 10 }
      },
      {
        optionId: "B",
        textEn: "I am fascinated by solar panels, renewable energy, and clean power generation",
        textTa: "சூரியசக்தி பேனல்கள், பசுமை மின் உற்பத்தி முறைகள் என்னை மிகவும் ஈர்க்கின்றன",
        scores: { electronics: 10, agriculture: 4 }
      },
      {
        optionId: "C",
        textEn: "I prefer working on delicate circuits like smartphone motherboards and microchips",
        textTa: "ஸ்மார்ட்போன் மதர்போர்டுகள் மற்றும் நுண்ணிய சர்க்யூட்களில் நுணுக்கமாக வேலை செய்ய விரும்புகிறேன்",
        scores: { electronics: 10, tech: 5 }
      },
      {
        optionId: "D",
        textEn: "I prefer software and digital screens over physical electrical hardware",
        textTa: "மின்சார உபகரணங்களை விட மென்பொருள் மற்றும் கணினி திரைகளில் வேலை செய்வதையே விரும்புகிறேன்",
        scores: { tech: 8, business: 4, creative: 4 }
      }
    ]
  },
  {
    id: 8,
    questionId: "Q8",
    categoryKey: "healthcare",
    questionEn: "How drawn are you towards healthcare, first aid, and community well-being?",
    questionTa: "மருத்துவம், முதலுதவி மற்றும் மனிதர்களுக்கு நலம் பயக்கும் பணிகளில் உங்கள் ஆர்வம் எவ்வாறு உள்ளது?",
    options: [
      {
        optionId: "A",
        textEn: "Strongly drawn: I want to monitor patients, check vital signs, and provide compassionate hospital care",
        textTa: "அதிக ஆர்வம்: நோயாளிகளை கவனிப்பது, இரத்த அழுத்தம் பரிசோதிப்பது மற்றும் மருத்துவ பராமரிப்பு வழங்குவது",
        scores: { healthcare: 10 }
      },
      {
        optionId: "B",
        textEn: "Interested in laboratory testing, microscope sample analysis, and diagnostic reports",
        textTa: "மருத்துவ ஆய்வகம், ரத்த மாதிரி பரிசோதனை மற்றும் நோயறிதல் அறிக்கைகளில் ஆர்வம்",
        scores: { healthcare: 10, tech: 4 }
      },
      {
        optionId: "C",
        textEn: "I prefer technical machinery or computers rather than clinical patient interaction",
        textTa: "நோயாளிகளுடன் நேரடி தொடர்பை விட இயந்திரங்கள் அல்லது கணினிகளில் பணிபுரியவே விரும்புகிறேன்",
        scores: { tech: 6, automobile: 6, electronics: 6 }
      },
      {
        optionId: "D",
        textEn: "Open to healthcare only if it involves biomedical equipment and hospital electronics",
        textTa: "மருத்துவ உபகரணங்கள் மற்றும் எலக்ட்ரானிக்ஸ் கருவிகளை பழுதுநீக்கும் துறையாக இருந்தால் விருப்பம்",
        scores: { healthcare: 8, electronics: 8 }
      }
    ]
  },
  {
    id: 9,
    questionId: "Q9",
    categoryKey: "agriculture",
    questionEn: "What is your perspective on sustainable agriculture, plants, and outdoor environmental work?",
    questionTa: "இயற்கை விவசாயம், தாவரங்கள் மற்றும் திறந்தவெளி சூழல் சார்ந்த வேலைகளில் உங்கள் பார்வை என்ன?",
    options: [
      {
        optionId: "A",
        textEn: "Enthusiastic: I want to master modern hydroponics, automated greenhouses, and soilless farming",
        textTa: "மிகுந்த ஆர்வம்: நவீன மண்ணில்லா விவசாயம் (Hydroponics), பசுமைக்குடில் தானியங்கி முறைகளை கற்க விரும்புகிறேன்",
        scores: { agriculture: 10, tech: 4 }
      },
      {
        optionId: "B",
        textEn: "I love nature, organic crop cultivation, and eco-friendly rural businesses",
        textTa: "இயற்கை வழி வேளாண்மை மற்றும் சூழல் நட்பு கிராமப்புற தொழில்களில் ஈடுபட ஆசை",
        scores: { agriculture: 10, business: 4 }
      },
      {
        optionId: "C",
        textEn: "I like agriculture only if using high-tech tools like drones and automated drip sensors",
        textTa: "விவசாய ட்ரோன்கள் மற்றும் தானியங்கி சென்சார்கள் போன்ற நவீன தொழில்நுட்பங்களை பயன்படுத்த விருப்பம்",
        scores: { agriculture: 8, tech: 8 }
      },
      {
        optionId: "D",
        textEn: "I strongly prefer indoor, air-conditioned workshops or office settings",
        textTa: "நான் அலுவலகம் அல்லது குளிரூட்டப்பட்ட உள்ளரங்க பணிகளையே முற்றிலும் விரும்புகிறேன்",
        scores: { tech: 6, business: 6, creative: 5 }
      }
    ]
  }
];
