import { initialCourses } from '../data/coursesData';

/**
 * Maps raw assessment response choices to domain affinity percentages
 */
export function calculateDomainScores(answers) {
  const totals = {
    tech: 0,
    electronics: 0,
    healthcare: 0,
    agriculture: 0,
    automobile: 0,
    business: 0,
    creative: 0,
  };

  const maxPossible = {
    tech: 40,
    electronics: 40,
    healthcare: 30,
    agriculture: 30,
    automobile: 30,
    business: 30,
    creative: 30,
  };

  // Aggregate selected option scores
  Object.values(answers).forEach((option) => {
    if (option && option.scores) {
      Object.entries(option.scores).forEach(([cat, val]) => {
        if (totals[cat] !== undefined) {
          totals[cat] += val;
        }
      });
    }
  });

  // Convert to 0-100% affinity normalized scores
  const normalized = {};
  Object.keys(totals).forEach((cat) => {
    const raw = totals[cat];
    const max = maxPossible[cat] || 35;
    normalized[cat] = Math.min(100, Math.round((raw / max) * 100));
  });

  return normalized;
}

/**
 * Calculates match score for courses based on student profile and assessment
 */
export function calculateCourseRecommendations(courses = initialCourses, studentProfile = {}, domainScores = {}) {
  const {
    qualification = '12th',
    maxBudget = 25000,
    durationPreference = 'all', // 'short', 'medium', 'diploma', 'all'
    workEnvironment = 'any',
  } = studentProfile;

  // Retrieve exact scoring from 3_answer_course_mapping.csv if student answered the 9 questions
  let csvScoreMap = {};
  try {
    const rawCsvScores = typeof window !== 'undefined' ? localStorage.getItem('vista_csv_scored_courses') : null;
    if (rawCsvScores) {
      const parsed = JSON.parse(rawCsvScores);
      if (Array.isArray(parsed)) {
        parsed.forEach((item) => {
          if (item.course_id) {
            csvScoreMap[item.course_id.toUpperCase()] = item.score;
          }
        });
      }
    }
  } catch (e) {
    /* ignore */
  }

  return courses.map((course) => {
    let score = 50; // base score
    const matchFactors = [];

    // 0. Exact CSV Engine Score Contribution (from 3_answer_course_mapping.csv)
    const courseCode = (course.code || '').toUpperCase();
    const csvPoints = csvScoreMap[courseCode] || 0;
    if (csvPoints > 0) {
      score += csvPoints * 5.5;
      matchFactors.push({
        type: 'csv_algorithm_fit',
        labelEn: `Top Match in 9-Question Vocational Assessment (+${csvPoints} weighted pts)`,
        labelTa: `9-கேள்வி தொழிற்கல்வி மதிப்பீட்டில் முன்னிலை (+${csvPoints} புள்ளிகள்)`,
        positive: true,
      });
    }

    // 1. Assessment Domain Interest Match (Weight: 35%)
    const domainAffinity = domainScores[course.categoryKey] || 55;
    const domainContribution = (domainAffinity / 100) * 35;
    score = score - 15 + domainContribution; // shift to reflect domain

    if (domainAffinity >= 75) {
      matchFactors.push({
        type: 'high_interest',
        labelEn: `High interest alignment in ${course.category} (${domainAffinity}%)`,
        labelTa: `${course.categoryTa} துறையில் உங்கள் ஆர்வம் மிக அதிகமாக உள்ளது (${domainAffinity}%)`,
        positive: true,
      });
    }

    // 2. Educational Qualification & Eligibility Match (Weight: 20%)
    let eligibilityMet = true;
    if (course.minQualificationLevel === '12th' && qualification === '10th') {
      eligibilityMet = false;
      score -= 25;
      matchFactors.push({
        type: 'eligibility_gap',
        labelEn: 'Requires Class 12 completion; additional foundation bridge needed',
        labelTa: '12-ஆம் வகுப்பு தேர்ச்சி தேவைப்படுகிறது; கூடுதல் அடிப்படை படிப்பு தேவைப்படலாம்',
        positive: false,
      });
    } else {
      score += 15;
      matchFactors.push({
        type: 'eligibility_fit',
        labelEn: `Directly eligible with your ${qualification} qualification`,
        labelTa: `உங்கள் ${qualification} கல்வித் தகுதிக்கு நேரடியாக அனுமதிக்கப்படலாம்`,
        positive: true,
      });
    }

    // 3. Financial Budget Suitability (Weight: 25%)
    const numericBudget = Number(maxBudget) || 25000;
    if (course.feeMax <= numericBudget) {
      score += 15;
      matchFactors.push({
        type: 'budget_fit',
        labelEn: `Within your budget of ₹${numericBudget.toLocaleString('en-IN')}`,
        labelTa: `உங்கள் பட்ஜெட்டான ₹${numericBudget.toLocaleString('en-IN')}க்குள் அமைகிறது`,
        positive: true,
      });
    } else if (course.feeMin <= numericBudget) {
      score += 5;
      matchFactors.push({
        type: 'budget_partial',
        labelEn: 'Base fee is within budget; advanced modules or equipment may require scholarships',
        labelTa: 'அடிப்படை கட்டணம் உங்கள் பட்ஜெட்டுக்குள் உள்ளது; மேம்பட்ட செய்முறைக்கு உதவித்தொகை பெறலாம்',
        positive: true,
      });
    } else {
      score -= 15;
      matchFactors.push({
        type: 'budget_exceeded',
        labelEn: `Tuition exceeds stated budget by ₹${(course.feeMin - numericBudget).toLocaleString('en-IN')}`,
        labelTa: `கட்டணம் உங்கள் பட்ஜெட்டை விட ₹${(course.feeMin - numericBudget).toLocaleString('en-IN')} அதிகம்`,
        positive: false,
      });
    }

    // 4. Course Duration Preference Match (Weight: 15%)
    if (durationPreference === 'short' && course.durationMonths <= 4) {
      score += 10;
      matchFactors.push({
        type: 'duration_fit',
        labelEn: 'Matches your fast-track short-term training preference',
        labelTa: 'விரைவான குறுகிய கால பயிற்சி விருப்பத்திற்கு பொருந்துகிறது',
        positive: true,
      });
    } else if (durationPreference === 'diploma' && course.durationMonths >= 12) {
      score += 10;
      matchFactors.push({
        type: 'duration_fit',
        labelEn: 'Comprehensive long-term vocational diploma',
        labelTa: 'முழுமையான விரிவான தொழிற்கல்வி டிப்ளமோ',
        positive: true,
      });
    }

    // Bound final score between 35% and 98% (never claim 100% certainty)
    const finalScore = Math.max(35, Math.min(97, Math.round(score)));

    // Generate readable explanation
    const explanationEn = `Matched based on ${domainAffinity}% interest affinity in ${course.category}, ${eligibilityMet ? 'verified academic eligibility' : 'bridge eligibility'}, and ${course.feeMax <= numericBudget ? 'complete fee affordability' : 'accessible payment options'}.`;
    const explanationTa = `${course.categoryTa} பிரிவில் ${domainAffinity}% ஆர்வம், ${qualification} கல்வித் தகுதி பொருத்தம் மற்றும் குடும்ப நிதி பட்ஜெட் ஆகியவற்றின் அடிப்படையில் கணக்கிடப்பட்டுள்ளது.`;

    return {
      ...course,
      matchScore: finalScore,
      matchFactors,
      explanationEn,
      explanationTa,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
