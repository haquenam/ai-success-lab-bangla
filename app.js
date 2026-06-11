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
    icon: "&#127891;",
    description: "পরীক্ষার প্রস্তুতি, কঠিন বিষয় বোঝা, অনুশীলন প্রশ্ন তৈরি"
  },
  {
    id: "job-seekers",
    title: "চাকরি প্রার্থী",
    icon: "&#128188;",
    description: "সিভি, ইন্টারভিউ প্রস্তুতি, লিংকডইন প্রোফাইল"
  },
  {
    id: "freelancers",
    title: "ফ্রিল্যান্সার",
    icon: "&#127760;",
    description: "ক্লায়েন্ট প্রপোজাল, পোর্টফোলিও, যোগাযোগ"
  },
  {
    id: "english-learning",
    title: "ইংরেজি শেখা",
    icon: "&#128483;&#65039;",
    description: "ইংরেজি লেখা, কথা বলা, ব্যাকরণ"
  },
  {
    id: "ai-learning",
    title: "এআই শেখা",
    icon: "&#129302;",
    description: "এআই, প্রম্পট, কাস্টম জিপিটি, এজেন্ট"
  }
];

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
const studentForm = document.querySelector("#student-prompt-form");
const copyStudentPromptButton = document.querySelector("#copy-student-prompt");
const studentGeneratorMessage = document.querySelector("#student-generator-message");
const studentResultCard = document.querySelector("#student-result-card");
const studentPromptOutput = document.querySelector("#student-prompt-output");

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

function scrollToStudentGenerator() {
  outcomeStatus.hidden = true;
  detailSection.classList.add("hidden");
  studentGenerator.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", "#student-generator");
}

function showOutcomeStatus() {
  outcomeStatus.textContent = "Coming in Version 2";
  outcomeStatus.hidden = false;
}

function openCategory(categoryId) {
  if (categoryId === "students") {
    scrollToStudentGenerator();
    return;
  }

  const category = promptCategories.find((item) => item.id === categoryId);

  if (!category) {
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

function getStudentFormValues() {
  return {
    level: document.querySelector("#student-level").value.trim(),
    subject: document.querySelector("#student-subject").value.trim(),
    topic: document.querySelector("#student-topic").value.trim(),
    helpType: document.querySelector("#student-help-type").value.trim(),
    difficulty: document.querySelector("#student-difficulty").value.trim(),
    extra: document.querySelector("#student-extra").value.trim()
  };
}

function hasRequiredStudentValues(values) {
  return values.level && values.subject && values.topic && values.helpType && values.difficulty;
}

function buildBanglaStudentPrompt(values) {
  const extraInstruction = values.extra || "কোনো অতিরিক্ত নির্দেশনা নেই।";

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

function buildEnglishStudentPrompt(values) {
  const extraInstruction = values.extra || "No additional instruction provided.";

  return `Act as an experienced ${values.level} level ${values.subject} teacher.

Help me understand the topic: ${values.topic}.

My learning goal is:
${values.helpType}

Difficulty level:
${values.difficulty}

Please respond in the following structure:

1. Explain the topic in simple language.
2. Highlight the key formulas, rules, or concepts.
3. Provide step by step examples where needed.
4. Give me practice questions at the end.
5. Do not give the answers immediately. Let me try first.
6. After I submit my answers, check my work and explain my mistakes.

Additional instruction:
${extraInstruction}

Please answer in English.`;
}

function buildStudentPrompt(values) {
  return state.promptLanguage === "English"
    ? buildEnglishStudentPrompt(values)
    : buildBanglaStudentPrompt(values);
}

function showGeneratorMessage(message, type = "info") {
  studentGeneratorMessage.textContent = message;
  studentGeneratorMessage.dataset.type = type;
}

function clearStudentGenerator() {
  state.generatedStudentPrompt = "";
  studentForm.reset();
  studentPromptOutput.textContent = "";
  studentResultCard.hidden = true;
  copyStudentPromptButton.disabled = true;
  showGeneratorMessage("ফর্ম রিসেট হয়েছে। নতুন করে শুরু করুন।", "info");
}

function createResetButton() {
  const existingResetButton = document.querySelector("#reset-student-form");

  if (existingResetButton || !copyStudentPromptButton) {
    return existingResetButton;
  }

  const resetButton = document.createElement("button");
  resetButton.className = "button secondary";
  resetButton.id = "reset-student-form";
  resetButton.type = "button";
  resetButton.textContent = "রিসেট করুন";

  copyStudentPromptButton.insertAdjacentElement("afterend", resetButton);
  return resetButton;
}

function handleStudentFormSubmit(event) {
  event.preventDefault();

  const values = getStudentFormValues();

  if (!hasRequiredStudentValues(values)) {
    showGeneratorMessage("দয়া করে লেভেল, বিষয়, টপিক এবং সাহায্যের ধরন নির্বাচন করুন।", "error");
    studentResultCard.hidden = true;
    copyStudentPromptButton.disabled = true;
    return;
  }

  state.generatedStudentPrompt = buildStudentPrompt(values);
  studentPromptOutput.textContent = state.generatedStudentPrompt;
  studentResultCard.hidden = false;
  copyStudentPromptButton.disabled = false;
  showGeneratorMessage("প্রম্পট তৈরি হয়েছে। এখন কপি করে ব্যবহার করতে পারেন।", "success");
}

async function copyStudentPrompt() {
  if (!state.generatedStudentPrompt) {
    return;
  }

  try {
    await navigator.clipboard.writeText(state.generatedStudentPrompt);
    showGeneratorMessage("প্রম্পট কপি হয়েছে। এখন এটি আপনার পছন্দের এআই টুলে ব্যবহার করুন।", "success");
  } catch {
    studentPromptOutput.focus();
    showGeneratorMessage("স্বয়ংক্রিয়ভাবে কপি করা যায়নি। প্রম্পটটি নির্বাচন করে ম্যানুয়ালি কপি করুন।", "error");
  }
}

function attachEventListeners() {
  const resetStudentFormButton = createResetButton();

  outcomeGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-outcome]");

    if (!card) {
      return;
    }

    if (card.dataset.outcome === "পরীক্ষার প্রস্তুতি নিতে চাই") {
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
    input.addEventListener("change", (event) => updatePromptLanguage(event.target.value));
  });

  backButton.addEventListener("click", closeCategory);

  if (studentForm) {
    studentForm.addEventListener("submit", handleStudentFormSubmit);
  }

  if (copyStudentPromptButton) {
    copyStudentPromptButton.addEventListener("click", copyStudentPrompt);
  }

  if (resetStudentFormButton) {
    resetStudentFormButton.addEventListener("click", clearStudentGenerator);
  }
}

function openCategoryFromHash() {
  const hashId = window.location.hash.replace("#", "");
  const hasCategory = promptCategories.some((category) => category.id === hashId);

  if (hashId === "student-generator") {
    scrollToStudentGenerator();
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