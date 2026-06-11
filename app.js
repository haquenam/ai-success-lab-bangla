const outcomeItems = [
  "পরীক্ষার প্রস্তুতি নিতে চাই",
  "পরীক্ষার পড়া প্র্যাকটিস করতে চাই",
  "চাকরি খুঁজতে চাই",
  "সিভি তৈরি করতে চাই",
  "ফ্রিল্যান্সিং শুরু করতে চাই",
  "ইংরেজি শিখতে চাই",
  "এআই শিখতে চাই"
];

const promptCategories = [
  {
    id: "students",
    title: "শিক্ষার্থী",
    icon: "&#127891;",
    description: "পরীক্ষার প্রস্তুতি, কঠিন বিষয় বোঝা, অনুশীলন প্রশ্ন তৈরি",
    templates: []
  },
  {
    id: "job-seekers",
    title: "চাকরি প্রার্থী",
    icon: "&#128188;",
    description: "সিভি, ইন্টারভিউ প্রস্তুতি, লিংকডইন প্রোফাইল",
    templates: []
  },
  {
    id: "freelancers",
    title: "ফ্রিল্যান্সার",
    icon: "&#127760;",
    description: "ক্লায়েন্ট প্রপোজাল, পোর্টফোলিও, যোগাযোগ",
    templates: []
  },
  {
    id: "english-learning",
    title: "ইংরেজি শেখা",
    icon: "&#128483;&#65039;",
    description: "ইংরেজি লেখা, কথা বলা, ব্যাকরণ",
    templates: []
  },
  {
    id: "ai-learning",
    title: "এআই শেখা",
    icon: "&#129302;",
    description: "এআই, প্রম্পট, কাস্টম জিপিটি, এজেন্ট",
    templates: []
  }
];

const englishSubjectLabels = {
  "গণিত": "Mathematics",
  "ইংরেজি": "English",
  "পদার্থবিজ্ঞান": "Physics",
  "রসায়ন": "Chemistry",
  "জীববিজ্ঞান": "Biology",
  "বাংলা": "Bangla",
  "আইসিটি": "ICT",
  "সাধারণ জ্ঞান": "General Knowledge",
  "অন্যান্য": "Other"
};

const englishHelpTypeLabels = {
  "সহজভাবে বুঝিয়ে দিন": "Explain it simply",
  "ধাপে ধাপে সমাধান দেখান": "Show step-by-step solutions",
  "অনুশীলন প্রশ্ন দিন": "Give practice questions",
  "মক টেস্ট তৈরি করুন": "Create a mock test",
  "আমার উত্তর যাচাই করুন": "Check my answer",
  "পড়ার পরিকল্পনা তৈরি করুন": "Create a study plan"
};

const englishDifficultyLabels = {
  "সহজ": "Easy",
  "মাঝারি": "Medium",
  "পরীক্ষার মতো": "Exam style",
  "চ্যালেঞ্জিং": "Challenging"
};

const state = {
  promptLanguage: "বাংলা",
  generatedPrompt: ""
};

const outcomeGrid = document.querySelector("#outcome-grid");
const outcomeStatus = document.querySelector("#outcome-status");
const categoryGrid = document.querySelector("#category-grid");
const detailSection = document.querySelector("#category-detail");
const detailTitle = document.querySelector("#detail-title");
const detailDescription = document.querySelector("#detail-description");
const detailLanguage = document.querySelector("#detail-language");
const backButton = document.querySelector("#back-button");
const studentGenerator = document.querySelector("#student-generator");
const studentPromptForm = document.querySelector("#student-prompt-form");
const generatorMessage = document.querySelector("#generator-message");
const promptResult = document.querySelector("#prompt-result");
const generatedPrompt = document.querySelector("#generated-prompt");
const copyPromptButton = document.querySelector("#copy-prompt");
const copyMessage = document.querySelector("#copy-message");

function renderOutcomes() {
  outcomeGrid.innerHTML = outcomeItems
    .map(
      (outcome) => `
        <button class="outcome-card" type="button" data-outcome="${outcome}" aria-label="${outcome}">
          ${outcome}
        </button>
      `
    )
    .join("");
}

function showOutcomeStatus() {
  outcomeStatus.textContent = "Coming in Version 2";
  outcomeStatus.hidden = false;
}

function scrollToStudentGenerator() {
  detailSection.classList.add("hidden");
  outcomeStatus.hidden = true;
  studentGenerator.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", "#student-generator");
}

function renderCategories() {
  categoryGrid.innerHTML = promptCategories
    .map(
      (category) => `
        <button class="category-card" type="button" data-category-id="${category.id}" aria-label="${category.title} ক্যাটাগরি খুলুন">
          <span class="category-icon" aria-hidden="true">${category.icon}</span>
          <span class="category-title">${category.title}</span>
          <span class="category-description">${category.description}</span>
        </button>
      `
    )
    .join("");
}

function updatePromptLanguage(language) {
  state.promptLanguage = language;
  if (!detailSection.classList.contains("hidden")) {
    detailLanguage.textContent = state.promptLanguage;
  }
}

function openCategory(categoryId) {
  const category = promptCategories.find((item) => item.id === categoryId);

  if (!category) {
    return;
  }

  if (category.id === "students") {
    scrollToStudentGenerator();
    return;
  }

  detailTitle.textContent = category.title;
  detailDescription.textContent = category.description;
  detailLanguage.textContent = state.promptLanguage;
  detailSection.classList.remove("hidden");
  detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${category.id}`);
}

function closeCategory() {
  detailSection.classList.add("hidden");
  window.history.replaceState(null, "", "#categories");
  document.querySelector("#categories").scrollIntoView({ behavior: "smooth" });
}

function getFormValues() {
  const formData = new FormData(studentPromptForm);

  return {
    level: formData.get("level").trim(),
    subject: formData.get("subject").trim(),
    topic: formData.get("topic").trim(),
    helpType: formData.get("helpType").trim(),
    difficulty: formData.get("difficulty").trim(),
    extra: formData.get("extra").trim()
  };
}

function buildBanglaPrompt(values) {
  const extraInstruction = values.extra || "নেই";

  return `আপনি একজন অভিজ্ঞ ${values.level} পর্যায়ের ${values.subject} শিক্ষক।

আমাকে ${values.topic} বিষয়টি সহজভাবে বুঝতে সাহায্য করুন।

আমার শেখার লক্ষ্য:
${values.helpType}

কঠিনতার মাত্রা:
${values.difficulty}

দয়া করে নিচের ধাপে উত্তর দিন:

১. আগে বিষয়টি সহজ ভাষায় ব্যাখ্যা করুন।
২. গুরুত্বপূর্ণ সূত্র, নিয়ম বা ধারণাগুলো আলাদা করে দেখান।
৩. প্রয়োজন হলে ধাপে ধাপে উদাহরণ দিন।
৪. শেষে আমাকে অনুশীলনের জন্য প্রশ্ন দিন।
৫. উত্তর সঙ্গে সঙ্গে দেবেন না, আগে আমাকে চেষ্টা করতে দিন।
৬. আমি উত্তর দিলে ভুলগুলো ব্যাখ্যা করে ঠিক করে দিন।

অতিরিক্ত নির্দেশনা:
${extraInstruction}

উত্তর বাংলায় দিন।`;
}

function buildEnglishPrompt(values) {
  const subject = englishSubjectLabels[values.subject] || values.subject;
  const helpType = englishHelpTypeLabels[values.helpType] || values.helpType;
  const difficulty = englishDifficultyLabels[values.difficulty] || values.difficulty;
  const extraInstruction = values.extra || "None";

  return `Act as an experienced ${values.level} level ${subject} teacher.

Help me understand the topic: ${values.topic}.

My learning goal is:
${helpType}

Difficulty level:
${difficulty}

Please respond in the following structure:

1. Explain the topic in simple language.
2. Highlight the key formulas, rules, or concepts.
3. Provide step-by-step examples where needed.
4. Give me practice questions at the end.
5. Do not give the answers immediately. Let me try first.
6. After I submit my answers, check my work and explain my mistakes.

Additional instruction:
${extraInstruction}

Please answer in English.`;
}

function showGeneratorMessage(message) {
  generatorMessage.textContent = message;
  generatorMessage.hidden = false;
}

function clearGeneratorMessage() {
  generatorMessage.textContent = "";
  generatorMessage.hidden = true;
}

function handlePromptSubmit(event) {
  event.preventDefault();

  const values = getFormValues();
  const hasRequiredValues =
    values.level && values.subject && values.topic && values.helpType;

  copyMessage.hidden = true;

  if (!hasRequiredValues) {
    showGeneratorMessage(
      "দয়া করে লেভেল, বিষয়, টপিক এবং সাহায্যের ধরন নির্বাচন করুন।"
    );
    promptResult.hidden = true;
    return;
  }

  clearGeneratorMessage();
  state.generatedPrompt =
    state.promptLanguage === "English"
      ? buildEnglishPrompt(values)
      : buildBanglaPrompt(values);
  generatedPrompt.textContent = state.generatedPrompt;
  promptResult.hidden = false;
  promptResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function copyWithFallback(text) {
  const temporaryTextArea = document.createElement("textarea");
  temporaryTextArea.value = text;
  temporaryTextArea.setAttribute("readonly", "");
  temporaryTextArea.style.position = "absolute";
  temporaryTextArea.style.left = "-9999px";
  document.body.appendChild(temporaryTextArea);
  temporaryTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(temporaryTextArea);
}

async function handleCopyPrompt() {
  if (!state.generatedPrompt) {
    return;
  }

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(state.generatedPrompt);
  } else {
    copyWithFallback(state.generatedPrompt);
  }

  copyMessage.textContent =
    "প্রম্পট কপি হয়েছে। এখন এটি ChatGPT বা অন্য এআই টুলে ব্যবহার করুন।";
  copyMessage.hidden = false;
}

function attachEventListeners() {
  outcomeGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-outcome]");

    if (!card) {
      return;
    }

    if (card.dataset.outcome === "পরীক্ষার পড়া প্র্যাকটিস করতে চাই") {
      scrollToStudentGenerator();
      return;
    }

    showOutcomeStatus();
  });

  categoryGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-category-id]");

    if (card) {
      openCategory(card.dataset.categoryId);
    }
  });

  document.querySelectorAll('input[name="prompt-language"]').forEach((input) => {
    input.addEventListener("change", (event) => {
      updatePromptLanguage(event.target.value);
    });
  });

  backButton.addEventListener("click", closeCategory);
  studentPromptForm.addEventListener("submit", handlePromptSubmit);
  copyPromptButton.addEventListener("click", handleCopyPrompt);
}

function openCategoryFromHash() {
  const hashId = window.location.hash.replace("#", "");
  const hasCategory = promptCategories.some((category) => category.id === hashId);

  if (hashId === "student-generator") {
    studentGenerator.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (hasCategory) {
    openCategory(hashId);
  }
}

renderOutcomes();
renderCategories();
attachEventListeners();
openCategoryFromHash();
