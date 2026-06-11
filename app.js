const outcomeItems = [
  "পরীক্ষার প্রস্তুতি নিতে চাই",
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
    icon: "📚",
    description: "পরীক্ষার প্রস্তুতি, কঠিন বিষয় বোঝা, অনুশীলন প্রশ্ন তৈরি",
    templates: []
  },
  {
    id: "job-seekers",
    title: "চাকরি প্রার্থী",
    icon: "💼",
    description: "সিভি, ইন্টারভিউ প্রস্তুতি, লিংকডইন প্রোফাইল",
    templates: []
  },
  {
    id: "freelancers",
    title: "ফ্রিল্যান্সার",
    icon: "🚀",
    description: "ক্লায়েন্ট প্রপোজাল, পোর্টফোলিও, যোগাযোগ",
    templates: []
  },
  {
    id: "english-learning",
    title: "ইংরেজি শেখা",
    icon: "🗣️",
    description: "ইংরেজি লেখা, কথা বলা, ব্যাকরণ",
    templates: []
  },
  {
    id: "ai-learning",
    title: "এআই শেখা",
    icon: "🤖",
    description: "এআই, প্রম্পট, কাস্টম জিপিটি, এজেন্ট",
    templates: []
  }
];

const studentTaskLabels = {
  "exam-practice": {
    bn: "পরীক্ষার অনুশীলন",
    en: "exam practice"
  },
  "concept-explanation": {
    bn: "কঠিন বিষয় বোঝা",
    en: "concept explanation"
  },
  "study-plan": {
    bn: "স্টাডি প্ল্যান",
    en: "study plan"
  }
};

const state = {
  promptLanguage: "বাংলা",
  generatedStudentPrompt: ""
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
const studentPromptLanguage = document.querySelector("#student-prompt-language");
const studentTaskType = document.querySelector("#student-task-type");
const studentTopic = document.querySelector("#student-topic");
const studentValidationMessage = document.querySelector(
  "#student-validation-message"
);
const copyPromptButton = document.querySelector("#copy-prompt-button");
const generatedStudentPrompt = document.querySelector("#generated-student-prompt");

function renderOutcomes() {
  outcomeGrid.innerHTML = outcomeItems
    .map(
      (outcome) => `
        <button
          class="outcome-card"
          type="button"
          data-outcome="${outcome}"
          aria-label="${outcome}"
        >
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

function renderCategories() {
  categoryGrid.innerHTML = promptCategories
    .map(
      (category) => `
        <button
          class="category-card"
          type="button"
          data-category-id="${category.id}"
          aria-label="${category.title} ক্যাটাগরি খুলুন"
        >
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

function scrollToStudentGenerator() {
  if (!studentGenerator) {
    return;
  }

  studentGenerator.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function openCategory(categoryId) {
  const category = promptCategories.find((item) => item.id === categoryId);

  if (!category) {
    return;
  }

  if (category.id === "students") {
    detailSection.classList.add("hidden");
    window.history.replaceState(null, "", "#student-generator");
    scrollToStudentGenerator();
    return;
  }

  detailTitle.textContent = category.title;
  detailDescription.textContent = category.description;
  detailLanguage.textContent = state.promptLanguage;
  detailSection.classList.remove("hidden");
  detailSection.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
  window.history.replaceState(null, "", `#${category.id}`);
}

function closeCategory() {
  detailSection.classList.add("hidden");
  window.history.replaceState(null, "", "#categories");
  document.querySelector("#categories").scrollIntoView({
    behavior: "smooth"
  });
}

function getStudentTaskLabel(taskType, language) {
  const labels =
    studentTaskLabels[taskType] || studentTaskLabels["exam-practice"];
  return language === "English" ? labels.en : labels.bn;
}

function buildBanglaStudentPrompt(topic, taskType) {
  const taskLabel = getStudentTaskLabel(taskType, "বাংলা");

  return `আপনি একজন সহায়ক বাংলা শিক্ষক। আমার জন্য ${taskLabel} তৈরি করুন।

বিষয় / লক্ষ্য:
${topic}

অনুগ্রহ করে:
1. বিষয়টি সহজ বাংলায় ব্যাখ্যা করুন।
2. গুরুত্বপূর্ণ পয়েন্টগুলো বুলেট আকারে দিন।
3. পরীক্ষার জন্য সম্ভাব্য প্রশ্ন দিন।
4. উত্তর অনুশীলনের জন্য ছোট ধাপে নির্দেশনা দিন।
5. শেষে ৩০ মিনিটের একটি দ্রুত রিভিশন প্ল্যান দিন।`;
}

function buildEnglishStudentPrompt(topic, taskType) {
  const taskLabel = getStudentTaskLabel(taskType, "English");

  return `You are a helpful tutor for Bangla-speaking learners.
Create a ${taskLabel} support prompt for me.

Topic or learning goal:
${topic}

Please:
1. Explain the topic in simple language.
2. List the key points in bullets.
3. Suggest likely exam or practice questions.
4. Give step-by-step guidance for answering them.
5. End with a focused 30-minute revision plan.`;
}

function buildStudentPrompt(topic, taskType, language) {
  if (language === "English") {
    return buildEnglishStudentPrompt(topic, taskType);
  }

  return buildBanglaStudentPrompt(topic, taskType);
}

function showStudentValidation(message) {
  studentValidationMessage.textContent = message;
  studentValidationMessage.hidden = false;
}

function clearStudentValidation() {
  studentValidationMessage.textContent = "";
  studentValidationMessage.hidden = true;
}

function handleStudentPromptSubmit(event) {
  event.preventDefault();

  const topic = studentTopic.value.trim();
  const language = studentPromptLanguage.value;
  const taskType = studentTaskType.value;

  if (!topic) {
    state.generatedStudentPrompt = "";
    generatedStudentPrompt.textContent = "প্রম্পট তৈরি করলে এখানে দেখা যাবে।";
    copyPromptButton.disabled = true;
    showStudentValidation("অনুগ্রহ করে বিষয়, অধ্যায় বা শেখার লক্ষ্য লিখুন।");
    studentTopic.focus();
    return;
  }

  clearStudentValidation();
  state.generatedStudentPrompt = buildStudentPrompt(topic, taskType, language);
  generatedStudentPrompt.textContent = state.generatedStudentPrompt;
  copyPromptButton.disabled = false;
}

async function copyGeneratedPrompt() {
  if (!state.generatedStudentPrompt) {
    return;
  }

  await navigator.clipboard.writeText(state.generatedStudentPrompt);
  copyPromptButton.textContent = "কপি হয়েছে";

  window.setTimeout(() => {
    copyPromptButton.textContent = "প্রম্পট কপি করুন";
  }, 1800);
}

function attachEventListeners() {
  outcomeGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-outcome]");

    if (!card) {
      return;
    }

    showOutcomeStatus();

    if (card.dataset.outcome.includes("পরীক্ষার প্রস্তুতি")) {
      scrollToStudentGenerator();
    }
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
  studentPromptForm.addEventListener("submit", handleStudentPromptSubmit);
  copyPromptButton.addEventListener("click", copyGeneratedPrompt);
}

function openCategoryFromHash() {
  const hashId = window.location.hash.replace("#", "");
  const hasCategory = promptCategories.some(
    (category) => category.id === hashId
  );

  if (hasCategory) {
    openCategory(hashId);
    return;
  }

  if (hashId === "student-generator") {
    scrollToStudentGenerator();
  }
}

renderOutcomes();
renderCategories();
attachEventListeners();
openCategoryFromHash();
