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
    icon: "🎓",
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
    icon: "🌍",
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

const state = {
  promptLanguage: "বাংলা"
};

const outcomeGrid = document.querySelector("#outcome-grid");
const outcomeStatus = document.querySelector("#outcome-status");
const categoryGrid = document.querySelector("#category-grid");
const detailSection = document.querySelector("#category-detail");
const detailTitle = document.querySelector("#detail-title");
const detailDescription = document.querySelector("#detail-description");
const detailLanguage = document.querySelector("#detail-language");
const backButton = document.querySelector("#back-button");

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

function attachEventListeners() {
  outcomeGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-outcome]");
    if (card) {
      showOutcomeStatus();
    }
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
}

function openCategoryFromHash() {
  const hashId = window.location.hash.replace("#", "");
  const hasCategory = promptCategories.some((category) => category.id === hashId);

  if (hasCategory) {
    openCategory(hashId);
  }
}

renderOutcomes();
renderCategories();
attachEventListeners();
openCategoryFromHash();
