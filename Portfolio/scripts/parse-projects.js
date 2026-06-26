const fs = require('fs');
const path = require('path');

const docPath = path.join(__dirname, '../docs/projects.md');
const outputPath = path.join(__dirname, '../src/data/projects.json');

function parseMarkdown() {
  if (!fs.existsSync(docPath)) {
    console.error("Markdown file not found at:", docPath);
    process.exit(1);
  }

  const content = fs.readFileSync(docPath, 'utf8');

  // Find index bounds of section headers
  const academicIndex = content.indexOf("Academic Projects");
  const professionalIndex = content.indexOf("Professional Projects");
  const personalIndex = content.indexOf("Personal Projects");

  if (academicIndex === -1) {
    console.error("Could not find 'Academic Projects' section in projects.md");
    process.exit(1);
  }

  // Segment raw text
  const academicText = content.slice(academicIndex, professionalIndex === -1 ? undefined : professionalIndex);
  const professionalText = professionalIndex === -1 ? "" : content.slice(professionalIndex, personalIndex === -1 ? undefined : personalIndex);
  const personalText = personalIndex === -1 ? "" : content.slice(personalIndex);

  const projects = [];

  parseCategory(academicText, 'Academic', projects);
  parseCategory(professionalText, 'Professional', projects);
  parseCategory(personalText, 'Personal', projects);

  // Ensure output folder exists
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2), 'utf8');
  console.log(`Successfully parsed ${projects.length} projects into ${outputPath}`);
}

function parseCategory(text, category, projectsList) {
  if (!text) return;

  // Split text blocks using lookahead to match "1. ", "2. ", etc. at the start of a line
  // Note: since project entries begin with digits (e.g. \n\n2. EHCo), look for numbers preceding the entry name.
  const regex = /\n+(?=\d+\.\s+)/g;
  const blocks = text.split(regex);

  blocks.forEach((block) => {
    const lines = block.trim().split('\n');
    if (lines.length === 0) return;

    const headerLine = lines[0].trim();
    // Match line starting with: "2. EHCo — Enhanced Huffman Coding... (2025)"
    const headerMatch = headerLine.match(/^\d+\.\s+(.*?)\s*\((\d{4}.*?)\)/);
    if (!headerMatch) return;

    const name = headerMatch[1].trim();
    const year = headerMatch[2].trim();
    
    // Create url-friendly index id based on name
    const rawId = name.split('—')[0].trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const id = `${category.toLowerCase()}-${rawId}`;

    const project = {
      id,
      name,
      year,
      category,
      shortDescription: '',
      role: '',
      outcome: '',
      techStack: [],
      detailedDescription: '',
      futureWorks: '',
      github: '',
      liveSite: '',
      team: ''
    };

    let currentField = '';
    let currentContent = [];

    const flushField = () => {
      const textVal = currentContent.join('\n').trim();
      if (!currentField || !textVal) return;

      if (currentField === 'short') {
        project.shortDescription = textVal;
      } else if (currentField === 'role') {
        project.role = textVal.replace(/^Role:\s*/i, '');
      } else if (currentField === 'outcome') {
        project.outcome = textVal;
      } else if (currentField === 'tech') {
        const cleanedStack = textVal.replace(/^(Tech Stack|Tech Stacks):\s*/i, '');
        project.techStack = cleanedStack
          .split(/•|·|,/)
          .map(t => t.trim())
          .filter(Boolean);
      } else if (currentField === 'detailed') {
        project.detailedDescription = textVal;
      } else if (currentField === 'future') {
        project.futureWorks = textVal;
      } else if (currentField === 'github') {
        project.github = textVal.replace(/^GitHub:\s*/i, '');
      } else if (currentField === 'live') {
        project.liveSite = textVal.replace(/^(Live Site|Live Prototype|Live Site:):\s*/i, '');
      } else if (currentField === 'team') {
        project.team = textVal.replace(/^(Project Team|Project Developers|Researchers|Research Team|Project Team:):\s*/i, '');
      }
      
      currentContent = [];
    };

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      if (trimmed.startsWith("Featured / Short Description") || trimmed.startsWith("Short Description")) {
        flushField();
        currentField = 'short';
      } else if (trimmed.startsWith("Role:")) {
        flushField();
        currentField = 'role';
        currentContent.push(trimmed);
      } else if (trimmed.startsWith("Outcome")) {
        flushField();
        currentField = 'outcome';
      } else if (trimmed.startsWith("Tech Stack:") || trimmed.startsWith("Tech Stack")) {
        flushField();
        currentField = 'tech';
        if (trimmed.includes(':')) {
          currentContent.push(trimmed);
        }
      } else if (trimmed.startsWith("Detailed Description")) {
        flushField();
        currentField = 'detailed';
      } else if (trimmed.startsWith("Future Works:") || trimmed.startsWith("Future Works")) {
        flushField();
        currentField = 'future';
      } else if (trimmed.startsWith("GitHub:")) {
        flushField();
        currentField = 'github';
        currentContent.push(trimmed);
      } else if (trimmed.startsWith("Live Site:") || trimmed.startsWith("Live Site") || trimmed.startsWith("Live Prototype:")) {
        flushField();
        currentField = 'live';
        currentContent.push(trimmed);
      } else if (
        trimmed.startsWith("Project Team:") || 
        trimmed.startsWith("Project Team") || 
        trimmed.startsWith("Project Developers:") || 
        trimmed.startsWith("Project Developers") || 
        trimmed.startsWith("Researchers:") || 
        trimmed.startsWith("Researchers") || 
        trimmed.startsWith("Research Team:") ||
        trimmed.startsWith("Research Team")
      ) {
        flushField();
        currentField = 'team';
        currentContent.push(trimmed);
      } else {
        currentContent.push(line);
      }
    }
    flushField();

    projectsList.push(project);
  });
}

parseMarkdown();
