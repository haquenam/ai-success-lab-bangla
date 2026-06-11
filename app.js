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
    description: "Fiverr gig, Upwork proposal, পোর্টফোলিও, ক্লায়েন্ট মেসেজ"
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
  generatedStudentPrompt: "",
  generatedFreelancerPrompt: ""
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

function hideOutcomeStatus() {
  outcomeStatus.hidden = true;
  outcomeStatus.textContent = "";
}

function showOutcomeStatus() {
  outcomeStatus.textContent = "Coming in Version 2";
  outcomeStatus.hidden = false;
}

function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);

  if (!section) {
    return;
  }

  hideOutcomeStatus();
  detailSection.classList.add("hidden");
  section.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", sectionId);
}

function scrollToStudentGenerator() {
  scrollToSection("#student-generator");
}

function scrollToFreelancerGenerator() {
  scrollToSection("#freelancer-generator");
}

function openCategory(categoryId) {
  if (categoryId === "students") {
    scrollToStudentGenerator();
    return;
  }

  if (categoryId === "freelancers") {
    scrollToFreelancerGenerator();
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

function insertFreelancerNavLink() {
  const navLinks = document.querySelector(".nav-links");

  if (!navLinks || document.querySelector('a[href="#freelancer-generator"]')) {
    return;
  }

  const studentLink = navLinks.querySelector('a[href="#student-generator"]');
  const freelancerLink = document.createElement("a");
  freelancerLink.href = "#freelancer-generator";
  freelancerLink.textContent = "ফ্রিল্যান্সার জেনারেটর";

  if (studentLink) {
    studentLink.insertAdjacentElement("afterend", freelancerLink);
    return;
  }

  navLinks.appendChild(freelancerLink);
}

function insertFreelancerGenerator() {
  if (!studentGenerator || document.querySelector("#freelancer-generator")) {
    return;
  }

  studentGenerator.insertAdjacentHTML(
    "afterend",
    `
      <section
        id="freelancer-generator"
        class="section student-generator container"
        aria-labelledby="freelancer-generator-title"
      >
        <div class="section-heading">
          <p class="eyebrow">Freelancer Priority Module</p>
          <h2 id="freelancer-generator-title">ফ্রিল্যান্সার এআই প্রম্পট জেনারেটর</h2>
          <p>
            Fiverr gig, Upwork proposal, ক্লায়েন্ট মেসেজ, সার্ভিস অফার আর
            পোর্টফোলিও লেখার জন্য প্রয়োজনীয় তথ্য দিন। এরপর কপি করার মতো
            শক্তিশালী প্রম্পট তৈরি হবে।
          </p>
        </div>

        <div class="generator-card">
          <form id="freelancer-prompt-form" class="student-form">
            <div class="form-grid">
              <label class="form-field" for="freelancer-platform">
                <span>আপনি কোন প্ল্যাটফর্মের জন্য প্রস্তুতি নিচ্ছেন?</span>
                <select id="freelancer-platform" required>
                  <option value="">প্ল্যাটফর্ম নির্বাচন করুন</option>
                  <option value="Fiverr">Fiverr</option>
                  <option value="Upwork">Upwork</option>
                  <option value="Fiverr ও Upwork দুই প্ল্যাটফর্মের জন্যই">দুই প্ল্যাটফর্মের জন্যই</option>
                </select>
              </label>

              <label class="form-field" for="freelancer-service">
                <span>আপনি কোন ধরনের সার্ভিস দিতে চান?</span>
                <select id="freelancer-service" required>
                  <option value="">সার্ভিস নির্বাচন করুন</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="Custom GPT">Custom GPT</option>
                  <option value="Chatbot">Chatbot</option>
                  <option value="Website">Website</option>
                  <option value="Logo Design">Logo Design</option>
                  <option value="Data Entry">Data Entry</option>
                  <option value="Excel or Google Sheets">Excel or Google Sheets</option>
                  <option value="Content Writing">Content Writing</option>
                  <option value="YouTube Script">YouTube Script</option>
                  <option value="Social Media Post">Social Media Post</option>
                  <option value="Translation">Translation</option>
                  <option value="Virtual Assistant">Virtual Assistant</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label class="form-field" for="freelancer-skill-level">
                <span>আপনার বর্তমান দক্ষতার লেভেল কী?</span>
                <select id="freelancer-skill-level" required>
                  <option value="">লেভেল নির্বাচন করুন</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Experienced">Experienced</option>
                </select>
              </label>

              <label class="form-field" for="freelancer-output-type">
                <span>আপনি কী তৈরি করতে চান?</span>
                <select id="freelancer-output-type" required>
                  <option value="">আউটপুট নির্বাচন করুন</option>
                  <option value="Fiverr Gig Title">Fiverr Gig Title</option>
                  <option value="Fiverr Gig Description">Fiverr Gig Description</option>
                  <option value="Fiverr Packages">Fiverr Packages</option>
                  <option value="Fiverr FAQ">Fiverr FAQ</option>
                  <option value="Fiverr Buyer Requirements">Fiverr Buyer Requirements</option>
                  <option value="Upwork Proposal">Upwork Proposal</option>
                  <option value="Client Message">Client Message</option>
                  <option value="Portfolio Description">Portfolio Description</option>
                  <option value="Service Offer">Service Offer</option>
                  <option value="Full Freelance Starter Kit">Full Freelance Starter Kit</option>
                </select>
              </label>

              <label class="form-field" for="freelancer-tone">
                <span>লেখার টোন কেমন হবে?</span>
                <select id="freelancer-tone" required>
                  <option value="Professional">Professional</option>
                  <option value="Friendly">Friendly</option>
                  <option value="Confident">Confident</option>
                  <option value="Simple English">Simple English</option>
                  <option value="Short and Direct">Short and Direct</option>
                </select>
              </label>

              <label class="form-field" for="freelancer-budget">
                <span>বাজেট বা প্যাকেজ ধারণা</span>
                <input
                  id="freelancer-budget"
                  type="text"
                  placeholder="যেমন: Basic $10, Standard $30, Premium $70 অথবা ক্লায়েন্টের বাজেট $100"
                />
              </label>

              <label class="form-field form-field-wide" for="freelancer-brief">
                <span>ক্লায়েন্টের কাজের বিবরণ বা আপনার সার্ভিস আইডিয়া লিখুন</span>
                <textarea
                  id="freelancer-brief"
                  rows="5"
                  placeholder="যেমন: আমি ছোট ব্যবসার জন্য ওয়েবসাইট বানাতে চাই, অথবা ক্লায়েন্ট একটি রেস্টুরেন্ট চ্যাটবট চেয়েছে"
                  required
                ></textarea>
              </label>

              <label class="form-field form-field-wide" for="freelancer-proof">
                <span>আপনার অভিজ্ঞতা, নমুনা কাজ বা পোর্টফোলিও তথ্য</span>
                <textarea
                  id="freelancer-proof"
                  rows="3"
                  placeholder="যেমন: আমি আগে দুইটি রেস্টুরেন্ট ওয়েবসাইট বানিয়েছি, অথবা আমার একটি ডেমো পোর্টফোলিও আছে"
                ></textarea>
              </label>
            </div>

            <p class="generator-note">
              সতর্কতা: নিজের দক্ষতা অতিরঞ্জিত করবেন না। ক্লায়েন্টের কাজের বিবরণ
              ভালোভাবে পড়ে সংক্ষিপ্ত, পরিষ্কার এবং বিশ্বাসযোগ্য প্রস্তাব তৈরি করুন।
            </p>

            <div class="generator-actions">
              <button class="button primary" type="submit">ফ্রিল্যান্স প্রম্পট তৈরি করুন</button>
              <button class="button secondary" id="copy-freelancer-prompt" type="button" disabled>
                প্রম্পট কপি করুন
              </button>
              <button class="button secondary" id="reset-freelancer-form" type="button">
                রিসেট করুন
              </button>
            </div>

            <p id="freelancer-generator-message" class="generator-message" role="status"></p>
          </form>

          <article id="freelancer-result-card" class="result-card" hidden>
            <p class="eyebrow">কপি রেডি ফলাফল</p>
            <h3>তৈরি হওয়া ফ্রিল্যান্সিং প্রম্পট</h3>
            <pre id="freelancer-prompt-output"></pre>
          </article>
        </div>
      </section>
    `
  );
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

function showStudentMessage(message, type = "info") {
  studentGeneratorMessage.textContent = message;
  studentGeneratorMessage.dataset.type = type;
}

function clearStudentGenerator() {
  state.generatedStudentPrompt = "";
  studentForm.reset();
  studentPromptOutput.textContent = "";
  studentResultCard.hidden = true;
  copyStudentPromptButton.disabled = true;
  showStudentMessage("ফর্ম রিসেট হয়েছে। নতুন করে শুরু করুন।", "info");
}

function createStudentResetButton() {
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
    showStudentMessage("দয়া করে লেভেল, বিষয়, টপিক এবং সাহায্যের ধরন নির্বাচন করুন।", "error");
    studentResultCard.hidden = true;
    copyStudentPromptButton.disabled = true;
    return;
  }

  state.generatedStudentPrompt = buildStudentPrompt(values);
  studentPromptOutput.textContent = state.generatedStudentPrompt;
  studentResultCard.hidden = false;
  copyStudentPromptButton.disabled = false;
  showStudentMessage("প্রম্পট তৈরি হয়েছে। এখন কপি করে ব্যবহার করতে পারেন।", "success");
}

async function copyStudentPrompt() {
  if (!state.generatedStudentPrompt) {
    return;
  }

  try {
    await navigator.clipboard.writeText(state.generatedStudentPrompt);
    showStudentMessage("প্রম্পট কপি হয়েছে। এখন এটি আপনার পছন্দের এআই টুলে ব্যবহার করুন।", "success");
  } catch {
    studentPromptOutput.focus();
    showStudentMessage("স্বয়ংক্রিয়ভাবে কপি করা যায়নি। প্রম্পটটি নির্বাচন করে ম্যানুয়ালি কপি করুন।", "error");
  }
}

function getFreelancerElements() {
  return {
    form: document.querySelector("#freelancer-prompt-form"),
    copyButton: document.querySelector("#copy-freelancer-prompt"),
    resetButton: document.querySelector("#reset-freelancer-form"),
    message: document.querySelector("#freelancer-generator-message"),
    resultCard: document.querySelector("#freelancer-result-card"),
    output: document.querySelector("#freelancer-prompt-output")
  };
}

function getFreelancerFormValues() {
  return {
    platform: document.querySelector("#freelancer-platform").value.trim(),
    service: document.querySelector("#freelancer-service").value.trim(),
    skillLevel: document.querySelector("#freelancer-skill-level").value.trim(),
    outputType: document.querySelector("#freelancer-output-type").value.trim(),
    tone: document.querySelector("#freelancer-tone").value.trim(),
    budget: document.querySelector("#freelancer-budget").value.trim(),
    brief: document.querySelector("#freelancer-brief").value.trim(),
    proof: document.querySelector("#freelancer-proof").value.trim()
  };
}

function hasRequiredFreelancerValues(values) {
  return values.platform && values.service && values.skillLevel && values.outputType && values.brief;
}

function buildBanglaFreelancerPrompt(values) {
  const budget = values.budget || "বাজেট বা প্যাকেজ এখনো নির্ধারিত নয়।";
  const proof = values.proof || "আমার অভিজ্ঞতা সীমিত, তাই আমাকে সততার সঙ্গে বিশ্বাসযোগ্যভাবে পজিশন করতে সাহায্য করুন।";

  return `আপনি একজন অভিজ্ঞ ফ্রিল্যান্সিং মেন্টর, Fiverr gig strategist এবং Upwork proposal writer হিসেবে কাজ করুন।

আমার প্ল্যাটফর্ম:
${values.platform}

আমার সার্ভিস ক্যাটাগরি:
${values.service}

আমার বর্তমান দক্ষতার লেভেল:
${values.skillLevel}

আমি যে আউটপুট তৈরি করতে চাই:
${values.outputType}

লেখার টোন:
${values.tone}

বাজেট বা প্যাকেজ ধারণা:
${budget}

ক্লায়েন্টের কাজের বিবরণ বা আমার সার্ভিস আইডিয়া:
${values.brief}

আমার অভিজ্ঞতা, নমুনা কাজ বা পোর্টফোলিও তথ্য:
${proof}

দয়া করে নিচের কাঠামোতে সাহায্য করুন:

১. আগে আমার সার্ভিসটি সহজ ভাষায় পরিষ্কার করে সাজিয়ে দিন।
২. Fiverr হলে একটি আকর্ষণীয় gig title, gig description, search tags, Basic Standard Premium package idea, FAQ এবং buyer requirements তৈরি করুন।
৩. Upwork হলে একটি ছোট, ব্যক্তিগত, ক্লায়েন্ট ফোকাসড proposal তৈরি করুন, যেখানে ক্লায়েন্টের সমস্যা বোঝা, কাজের পদ্ধতি, প্রাসঙ্গিক অভিজ্ঞতা, ২ থেকে ৩টি প্রশ্ন এবং একটি পরিষ্কার call to action থাকবে।
৪. যদি আমি Beginner হই, তাহলে অতিরঞ্জিত দাবি না করে কীভাবে বিশ্বাসযোগ্যভাবে নিজেকে উপস্থাপন করব তা দেখান।
৫. আউটপুটটি এমনভাবে লিখুন যেন আমি কপি করে ব্যবহার করতে পারি, তবে আমার বাস্তব তথ্য দিয়ে সামান্য পরিবর্তন করার জায়গা থাকে।
৬. শেষে একটি ছোট checklist দিন, যাতে আমি পোস্ট বা proposal দেওয়ার আগে যাচাই করতে পারি।

উত্তর বাংলায় দিন, তবে Fiverr, Upwork, gig, proposal, portfolio, package, client brief এর মতো প্রচলিত শব্দ ব্যবহার করতে পারেন।`;
}

function buildEnglishFreelancerPrompt(values) {
  const budget = values.budget || "No budget or package idea has been defined yet.";
  const proof = values.proof || "My experience is limited, so help me position myself honestly and credibly.";

  return `Act as an experienced freelancing mentor, Fiverr gig strategist, and Upwork proposal writer.

Platform:
${values.platform}

Service category:
${values.service}

Current skill level:
${values.skillLevel}

Output I want to create:
${values.outputType}

Writing tone:
${values.tone}

Budget or package idea:
${budget}

Client requirement or service idea:
${values.brief}

My experience, sample work, or portfolio information:
${proof}

Please help me in this structure:

1. First, clarify and position my service in simple language.
2. If this is for Fiverr, create a strong gig title, gig description, search tags, Basic Standard Premium package ideas, FAQ, and buyer requirements.
3. If this is for Upwork, create a short, personal, client focused proposal that shows understanding of the client's need, a practical work approach, relevant experience, 2 to 3 clarifying questions, and a clear call to action.
4. If I am a beginner, do not exaggerate my experience. Show me how to sound credible and honest.
5. Make the output copy ready, but leave room for me to personalise it with real details.
6. Add a short checklist before I publish the gig or send the proposal.

Please answer in English.`;
}

function buildFreelancerPrompt(values) {
  return state.promptLanguage === "English"
    ? buildEnglishFreelancerPrompt(values)
    : buildBanglaFreelancerPrompt(values);
}

function showFreelancerMessage(message, type = "info") {
  const { message: messageElement } = getFreelancerElements();

  if (!messageElement) {
    return;
  }

  messageElement.textContent = message;
  messageElement.dataset.type = type;
}

function handleFreelancerFormSubmit(event) {
  event.preventDefault();

  const values = getFreelancerFormValues();
  const { copyButton, resultCard, output } = getFreelancerElements();

  if (!hasRequiredFreelancerValues(values)) {
    showFreelancerMessage("দয়া করে প্ল্যাটফর্ম, সার্ভিস, দক্ষতার লেভেল, আউটপুট এবং কাজের বিবরণ পূরণ করুন।", "error");
    resultCard.hidden = true;
    copyButton.disabled = true;
    return;
  }

  state.generatedFreelancerPrompt = buildFreelancerPrompt(values);
  output.textContent = state.generatedFreelancerPrompt;
  resultCard.hidden = false;
  copyButton.disabled = false;
  showFreelancerMessage("ফ্রিল্যান্সিং প্রম্পট তৈরি হয়েছে। এখন কপি করে ব্যবহার করতে পারেন।", "success");
}

async function copyFreelancerPrompt() {
  const { output } = getFreelancerElements();

  if (!state.generatedFreelancerPrompt) {
    return;
  }

  try {
    await navigator.clipboard.writeText(state.generatedFreelancerPrompt);
    showFreelancerMessage("প্রম্পট কপি হয়েছে। এখন এটি আপনার পছন্দের এআই টুলে ব্যবহার করুন।", "success");
  } catch {
    output.focus();
    showFreelancerMessage("স্বয়ংক্রিয়ভাবে কপি করা যায়নি। প্রম্পটটি নির্বাচন করে ম্যানুয়ালি কপি করুন।", "error");
  }
}

function clearFreelancerGenerator() {
  const { form, copyButton, resultCard, output } = getFreelancerElements();

  state.generatedFreelancerPrompt = "";
  form.reset();
  output.textContent = "";
  resultCard.hidden = true;
  copyButton.disabled = true;
  showFreelancerMessage("ফ্রিল্যান্সার ফর্ম রিসেট হয়েছে। নতুন করে শুরু করুন।", "info");
}

function attachEventListeners() {
  const resetStudentFormButton = createStudentResetButton();
  const freelancerElements = getFreelancerElements();

  outcomeGrid.addEventListener("click", (event) => {
    const card = event.target.closest("[data-outcome]");

    if (!card) {
      return;
    }

    if (card.dataset.outcome === "পরীক্ষার প্রস্তুতি নিতে চাই") {
      scrollToStudentGenerator();
      return;
    }

    if (card.dataset.outcome === "ফ্রিল্যান্সিং শুরু করতে চাই") {
      scrollToFreelancerGenerator();
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

  if (freelancerElements.form) {
    freelancerElements.form.addEventListener("submit", handleFreelancerFormSubmit);
  }

  if (freelancerElements.copyButton) {
    freelancerElements.copyButton.addEventListener("click", copyFreelancerPrompt);
  }

  if (freelancerElements.resetButton) {
    freelancerElements.resetButton.addEventListener("click", clearFreelancerGenerator);
  }
}

function openCategoryFromHash() {
  const hashId = window.location.hash.replace("#", "");
  const hasCategory = promptCategories.some((category) => category.id === hashId);

  if (hashId === "student-generator") {
    scrollToStudentGenerator();
    return;
  }

  if (hashId === "freelancer-generator") {
    scrollToFreelancerGenerator();
    return;
  }

  if (hasCategory) {
    openCategory(hashId);
  }
}

insertFreelancerNavLink();
insertFreelancerGenerator();
renderOutcomes();
renderCategories();
attachEventListeners();
openCategoryFromHash();