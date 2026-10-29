import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baseDir = path.resolve(__dirname, '..');
const dataImportsDir = path.join(baseDir, 'data_imports');
const srcDataDir = path.join(baseDir, 'src', 'data');

// Simple CSV parser supporting quotes
function parseCSV(content) {
  const lines = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const rows = [];
  
  for (const line of lines) {
    if (!line.trim()) continue;
    const row = [];
    let insideQuotes = false;
    let field = '';
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (insideQuotes && line[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        row.push(field.trim());
        field = '';
      } else {
        field += char;
      }
    }
    row.push(field.trim());
    rows.push(row);
  }
  return rows;
}

// 1. Parse Courses
const coursesRaw = fs.readFileSync(path.join(dataImportsDir, '1_courses.csv.xls'), 'utf-8');
const coursesRows = parseCSV(coursesRaw);
const coursesHeader = coursesRows[0];
const courses = coursesRows.slice(1).map(r => ({
  course_id: r[0],
  course_name: r[1],
  field: r[2],
  description: r[3]
}));

// 2. Parse Questions and Options
const questionsRaw = fs.readFileSync(path.join(dataImportsDir, '2_questions_options.csv.xls'), 'utf-8');
const questionsRows = parseCSV(questionsRaw);
const questionsMap = {};

for (let i = 1; i < questionsRows.length; i++) {
  const [qid, qtext, optId, optText] = questionsRows[i];
  if (!qid) continue;
  if (!questionsMap[qid]) {
    questionsMap[qid] = {
      question_id: qid,
      question_text: qtext,
      options: []
    };
  }
  questionsMap[qid].options.push({
    option_id: optId,
    option_text: optText
  });
}
const questionsList = Object.values(questionsMap);

// 3. Parse Answer Course Mapping
const mappingRaw = fs.readFileSync(path.join(dataImportsDir, '3_answer_course_mapping.csv.xls'), 'utf-8');
const mappingRows = parseCSV(mappingRaw);
const answerMappings = mappingRows.slice(1).map(r => ({
  question_id: r[0],
  option_id: r[1],
  course_id: r[2],
  weight: parseInt(r[3], 10) || 1,
  course_name: r[4]
}));

// 4. Parse Synthetic Student Responses
const syntheticRaw = fs.readFileSync(path.join(dataImportsDir, '4_synthetic_student_responses.csv.xls'), 'utf-8');
const syntheticRows = parseCSV(syntheticRaw);
const syntheticStudents = syntheticRows.slice(1).map(r => ({
  student_id: r[0],
  Q1: r[1],
  Q2: r[2],
  Q3: r[3],
  Q4: r[4],
  Q5: r[5],
  Q6: r[6],
  Q7: r[7],
  Q8: r[8],
  Q9: r[9],
  recommended_course_id: r[10],
  recommended_course: r[11],
  top_score: parseInt(r[12], 10) || 0,
  second_course: r[13],
  third_course: r[14]
}));

// Compute analytics summary
const courseStats = {};
syntheticStudents.forEach(s => {
  const cid = s.recommended_course_id;
  if (!courseStats[cid]) {
    courseStats[cid] = {
      course_id: cid,
      course_name: s.recommended_course,
      count: 0
    };
  }
  courseStats[cid].count++;
});

// Output comprehensive csvDataset.js
const datasetContent = `// Auto-generated unified CSV Dataset from data_imports/

export const CSV_COURSES = ${JSON.stringify(courses, null, 2)};

export const CSV_QUESTIONS = ${JSON.stringify(questionsList, null, 2)};

export const CSV_ANSWER_MAPPINGS = ${JSON.stringify(answerMappings, null, 2)};

export const CSV_STUDENT_ANALYTICS = {
  totalStudents: ${syntheticStudents.length},
  distributionByCourse: ${JSON.stringify(Object.values(courseStats), null, 2)}
};

// First 100 benchmark student responses for live inspection
export const CSV_BENCHMARK_STUDENTS = ${JSON.stringify(syntheticStudents.slice(0, 100), null, 2)};

/**
 * Calculates course scores according to 3_answer_course_mapping.csv.xls
 * @param {Record<string, string>} studentAnswers - e.g. { Q1: 'B', Q2: 'C', ... }
 * @returns {Array<{ course_id: string, course_name: string, score: number }>}
 */
export function scoreCoursesFromAnswers(studentAnswers) {
  const scoreMap = {};
  CSV_COURSES.forEach(c => {
    scoreMap[c.course_id] = {
      course_id: c.course_id,
      course_name: c.course_name,
      field: c.field,
      score: 0
    };
  });

  CSV_ANSWER_MAPPINGS.forEach(mapping => {
    const chosenOption = studentAnswers[mapping.question_id];
    if (chosenOption && chosenOption.toUpperCase() === mapping.option_id.toUpperCase()) {
      if (scoreMap[mapping.course_id]) {
        scoreMap[mapping.course_id].score += mapping.weight;
      }
    }
  });

  return Object.values(scoreMap).sort((a, b) => b.score - a.score);
}
`;

fs.writeFileSync(path.join(srcDataDir, 'csvDataset.js'), datasetContent, 'utf-8');
console.log('Successfully generated src/data/csvDataset.js with all 4 CSV datasets!');
