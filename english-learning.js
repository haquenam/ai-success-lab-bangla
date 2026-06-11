function getSelectedPromptLanguage() {
  const selectedLanguage = document.querySelector('input[name="prompt-language"]:checked');
  return selectedLanguage ? selectedLanguage.value : "বাংলা";
}

function insertEnglishNavLink() {
  const navLinks = document.querySelector(".nav-links");

  if (!navLinks || document.querySelector('a[href="#english-generator"]')) {
    return;
  }

  const freelancerLink = navLinks.querySelector('a[href="#freelancer-generator"]');
  const studentLink = navLinks.querySelector('a[href="#student-generator"]');
  const englishLink = document.createElement("a");
  englishLink.href = "#english-generator";
  englishLink.textContent = "ইংরেজি জেনারেটর";

  if (freelancerLink) {
    freelancerLink.insertAdjacentElement("afterend", englishLink);
    return;
  }

  if (studentLink) {
    studentLink.insertAdjacentElement("afterend", englishLink);
    return;
  }

  navLinks.appendChild(englishLink);
}

function insertEnglishGenerator() {
  if (document.querySelector("#english-generator")) {
    return;
  }

  const freelancerGenerator = document.querySelector("#freelancer-generator");
  const studentGenerator = document.querySelector("#student-generator");
  const insertionPoint = freelancerGenerator || studentGenerator;

  if (!insertionPoint) {
    return;
  }

  insertionPoint.insertAdjacentHTML(
    "afterend",
    `
      <section
        id="english-generator"
        class="section student-generator container"
        aria-labelledby="english-generator-title"
      >
        <div class="section-heading">
          <p class="eyebrow">Beginner Friendly English</p>
          <h2 id="english-generator-title">ইংরেজি শেখার এআই প্রম্পট জেনারেটর</h2>
          <p>
            আপনি একদম শুরু থেকে ইংরেজি শিখতে চাইলে এখান থেকে সহজ, ধাপে ধাপে,
            বাংলা ব্যাখ্যাসহ প্র্যাকটিস প্রম্পট তৈরি করতে পারবেন। এটি আপনার
            ব্যক্তিগত এআই ইংরেজি টিউটর বানানোর জন্য তৈরি।
          </p>
        </div>

        <div class="generator-card">
          <form id="english-prompt-form" class="student-form">
            <div class="form-grid">
              <label class="form-field" for="english-level">
                <span>আপনার বর্তমান ইংরেজি লেভেল কী?</span>
                <select id="english-level" required>
                  <option value="">লেভেল নির্বাচন করুন</option>
                  <option value="Absolute Beginner">একদম শুরু</option>
                  <option value="A1 Beginner">A1 Beginner</option>
                  <option value="A2 Elementary">A2 Elementary</option>
                  <option value="B1 Intermediate">B1 Intermediate</option>
                  <option value="Not Sure">নিশ্চিত নই</option>
                </select>
              </label>

              <label class="form-field" for="english-skill">
                <span>আপনি কোন স্কিল প্র্যাকটিস করতে চান?</span>
                <select id="english-skill" required>
                  <option value="">স্কিল নির্বাচন করুন</option>
                  <option value="Everyday Speaking">কথা বলা</option>
                  <option value="Pronunciation">উচ্চারণ</option>
                  <option value="Vocabulary">ভোকাবুলারি</option>
                  <option value="Grammar">গ্রামার</option>
                  <option value="Writing">লেখা</option>
                  <option value="Reading">পড়া</option>
                  <option value="Listening">শোনা</option>
                  <option value="Job and Freelance English">চাকরি ও ফ্রিল্যান্সিং ইংরেজি</option>
                </select>
              </label>

              <label class="form-field" for="english-goal">
                <span>আপনার শেখার লক্ষ্য কী?</span>
                <select id="english-goal" required>
                  <option value="">লক্ষ্য নির্বাচন করুন</option>
                  <option value="Start from zero">শূন্য থেকে শুরু করতে চাই</option>
                  <option value="Make correct simple sentences">সহজ বাক্য বানাতে চাই</option>
                  <option value="Speak with confidence">আত্মবিশ্বাস নিয়ে কথা বলতে চাই</option>
                  <option value="Understand basic grammar">বেসিক গ্রামার বুঝতে চাই</option>
                  <option value="Write correct English">সঠিক ইংরেজি লিখতে চাই</option>
                  <option value="Practise client communication">ক্লায়েন্টের সঙ্গে কথা বলার ইংরেজি শিখতে চাই</option>
                  <option value="Prepare for interview">ইন্টারভিউর ইংরেজি প্র্যাকটিস করতে চাই</option>
                </select>
              </label>

              <label class="form-field" for="english-practice-style">
                <span>কীভাবে প্র্যাকটিস করতে চান?</span>
                <select id="english-practice-style" required>
                  <option value="">প্র্যাকটিস ধরন নির্বাচন করুন</option>
                  <option value="Explain in Bangla first, then give simple English examples">আগে বাংলায় বুঝিয়ে দিন, তারপর সহজ ইংরেজি উদাহরণ দিন</option>
                  <option value="Conversation practice">কথোপকথন প্র্যাকটিস</option>
                  <option value="Correct my mistakes">আমার ভুল ঠিক করে দিন</option>
                  <option value="Quiz me step by step">ধাপে ধাপে কুইজ নিন</option>
                  <option value="Give me a 7 day practice plan">৭ দিনের প্র্যাকটিস প্ল্যান দিন</option>
                  <option value="Translate and explain word by word">শব্দ ধরে অনুবাদ ও ব্যাখ্যা করুন</option>
                </select>
              </label>

              <label class="form-field form-field-wide" for="english-topic">
                <span>টপিক, পরিস্থিতি বা বাক্য লিখুন</span>
                <input
                  id="english-topic"
                  type="text"
                  placeholder="যেমন: introduce myself, present tense, client message, I am going to market"
                  required
                />
              </label>

              <label class="form-field form-field-wide" for="english-sample">
                <span>আপনার লেখা বাক্য বা সমস্যা থাকলে লিখুন</span>
                <textarea
                  id="english-sample"
                  rows="4"
                  placeholder="যেমন: I am go office yesterday, অথবা আমি ইংরেজিতে নিজের পরিচয় দিতে পারি না"
                ></textarea>
              </label>
            </div>

            <p class="generator-note">
              একদম নতুন হলে ছোট বাক্য, পরিচিত শব্দ এবং দৈনন্দিন পরিস্থিতি দিয়ে
              শুরু করুন। ভুল করা সমস্যা নয়, ভুল ঠিক করাই শেখার সবচেয়ে ভালো পথ।
            </p>

            <div class="generator-actions">
              <button class="button primary" type="submit">ইংরেজি প্রম্পট তৈরি করুন</button>
              <button class="button secondary" id="copy-english-prompt" type="button" disabled>
                প্রম্পট কপি করুন
              </button>
              <button class="button secondary" id="reset-english-form" type="button">
                রিসেট করুন
              </button>
            </div>

            <p id="english-generator-message" class="generator-message" role="status"></p>
          </form>

          <article id="english-result-card" class="result-card" hidden>
            <p class="eyebrow">কপি রেডি ফলাফল</p>
            <h3>তৈরি হওয়া ইংরেজি শেখার প্রম্পট</h3>
            <pre id="english-prompt-output"></pre>
          </article>
        </div>
      </section>
    `
  );
}

function getEnglishElements() {
  return {
    form: document.querySelector("#english-prompt-form"),
    copyButton: document.querySelector("#copy-english-prompt"),
    resetButton: document.querySelector("#reset-english-form"),
    message: document.querySelector("#english-generator-message"),
    resultCard: document.querySelector("#english-result-card"),
    output: document.querySelector("#english-prompt-output")
  };
}

function getEnglishFormValues() {
  return {
    level: document.querySelector("#english-level").value.trim(),
    skill: document.querySelector("#english-skill").value.trim(),
    goal: document.querySelector("#english-goal").value.trim(),
    practiceStyle: document.querySelector("#english-practice-style").value.trim(),
    topic: document.querySelector("#english-topic").value.trim(),
    sample: document.querySelector("#english-sample").value.trim()
  };
}

function hasRequiredEnglishValues(values) {
  return values.level && values.skill && values.goal && values.practiceStyle && values.topic;
}

function buildBanglaEnglishPrompt(values) {
  const sample = values.sample || "আমার কোনো নির্দিষ্ট বাক্য নেই। আপনি উদাহরণ দিয়ে শুরু করুন।";

  return `আপনি একজন ধৈর্যশীল, beginner friendly English tutor হিসেবে কাজ করুন। আমি বাংলা ভাষাভাষী শিক্ষার্থী এবং ইংরেজি শেখায় খুবই নতুন হতে পারি। আমাকে লজ্জা না দিয়ে, খুব সহজ ভাষায়, ছোট ধাপে ধাপে শেখান।

আমার বর্তমান ইংরেজি লেভেল:
${values.level}

আমি যে স্কিল শিখতে চাই:
${values.skill}

আমার শেখার লক্ষ্য:
${values.goal}

আমি যে টপিক বা পরিস্থিতি নিয়ে শিখতে চাই:
${values.topic}

আমি যেভাবে প্র্যাকটিস করতে চাই:
${values.practiceStyle}

আমার লেখা বাক্য বা সমস্যা:
${sample}

দয়া করে নিচের কাঠামোতে উত্তর দিন:

১. আগে বাংলায় খুব সহজভাবে বিষয়টি বুঝিয়ে দিন।
২. তারপর ৫টি খুব সহজ English example দিন।
৩. প্রতিটি example এর পাশে বাংলা অর্থ দিন।
৪. প্রয়োজন হলে উচ্চারণ বুঝতে বাংলা ধ্বনি বা সহজ pronunciation hint দিন।
৫. গ্রামার থাকলে technical jargon ছাড়া এক লাইনে নিয়মটি বুঝিয়ে দিন।
৬. আমাকে ৫টি ছোট practice sentence দিন।
৭. উত্তর সঙ্গে সঙ্গে দেবেন না। আগে আমাকে চেষ্টা করতে বলুন।
৮. আমি উত্তর দিলে একটি ছোট correction table দিন: আমার বাক্য, সঠিক বাক্য, কেন ভুল হয়েছে, কীভাবে মনে রাখব।
৯. শেষে ১০ মিনিটের daily practice routine দিন।

উত্তর বাংলায় দিন, কিন্তু শেখার জন্য সহজ English বাক্য ব্যবহার করুন।`;
}

function buildEnglishEnglishPrompt(values) {
  const sample = values.sample || "I do not have a specific sentence yet. Please start with simple examples.";

  return `Act as a patient, beginner friendly English tutor. I may know very little English, so teach me slowly, kindly, and step by step.

My current English level:
${values.level}

Skill I want to practise:
${values.skill}

My learning goal:
${values.goal}

Topic or situation I want to learn:
${values.topic}

Practice style I prefer:
${values.practiceStyle}

My sentence or problem:
${sample}

Please respond in this structure:

1. Explain the idea in very simple language.
2. Give me 5 very easy English examples.
3. Add a simple meaning beside each example.
4. Add pronunciation help where useful.
5. If grammar is involved, explain the rule without technical jargon.
6. Give me 5 short practice sentences.
7. Do not give the answers immediately. Ask me to try first.
8. After I answer, correct me using a small table: my sentence, corrected sentence, why it was wrong, how to remember it.
9. End with a 10 minute daily practice routine.

Please answer in simple English.`;
}

function buildEnglishLearningPrompt(values) {
  return getSelectedPromptLanguage() === "English"
    ? buildEnglishEnglishPrompt(values)
    : buildBanglaEnglishPrompt(values);
}

function showEnglishMessage(message, type = "info") {
  const { message: messageElement } = getEnglishElements();

  if (!messageElement) {
    return;
  }

  messageElement.textContent = message;
  messageElement.dataset.type = type;
}

function handleEnglishFormSubmit(event) {
  event.preventDefault();

  const values = getEnglishFormValues();
  const { copyButton, resultCard, output } = getEnglishElements();

  if (!hasRequiredEnglishValues(values)) {
    showEnglishMessage("দয়া করে লেভেল, স্কিল, লক্ষ্য, প্র্যাকটিস ধরন এবং টপিক পূরণ করুন।", "error");
    resultCard.hidden = true;
    copyButton.disabled = true;
    return;
  }

  const prompt = buildEnglishLearningPrompt(values);
  output.textContent = prompt;
  resultCard.hidden = false;
  copyButton.disabled = false;
  showEnglishMessage("ইংরেজি শেখার প্রম্পট তৈরি হয়েছে। এখন কপি করে ব্যবহার করতে পারেন।", "success");
}

async function copyEnglishPrompt() {
  const { output } = getEnglishElements();

  if (!output || !output.textContent.trim()) {
    return;
  }

  try {
    await navigator.clipboard.writeText(output.textContent);
    showEnglishMessage("প্রম্পট কপি হয়েছে। এখন এটি আপনার পছন্দের এআই টুলে ব্যবহার করুন।", "success");
  } catch {
    output.focus();
    showEnglishMessage("স্বয়ংক্রিয়ভাবে কপি করা যায়নি। প্রম্পটটি নির্বাচন করে ম্যানুয়ালি কপি করুন।", "error");
  }
}

function clearEnglishGenerator() {
  const { form, copyButton, resultCard, output } = getEnglishElements();

  form.reset();
  output.textContent = "";
  resultCard.hidden = true;
  copyButton.disabled = true;
  showEnglishMessage("ইংরেজি শেখার ফর্ম রিসেট হয়েছে। নতুন করে শুরু করুন।", "info");
}

function scrollToEnglishGenerator() {
  const englishGenerator = document.querySelector("#english-generator");

  if (!englishGenerator) {
    return;
  }

  const detailSection = document.querySelector("#category-detail");
  const outcomeStatus = document.querySelector("#outcome-status");

  if (detailSection) {
    detailSection.classList.add("hidden");
  }

  if (outcomeStatus) {
    outcomeStatus.hidden = true;
    outcomeStatus.textContent = "";
  }

  englishGenerator.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", "#english-generator");
}

function attachEnglishRouting() {
  const categoryGrid = document.querySelector("#category-grid");
  const outcomeGrid = document.querySelector("#outcome-grid");

  if (categoryGrid) {
    categoryGrid.addEventListener(
      "click",
      (event) => {
        const card = event.target.closest('[data-category-id="english-learning"]');

        if (!card) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        scrollToEnglishGenerator();
      },
      true
    );
  }

  if (outcomeGrid) {
    outcomeGrid.addEventListener(
      "click",
      (event) => {
        const card = event.target.closest("[data-outcome]");

        if (!card || card.dataset.outcome !== "ইংরেজি শিখতে চাই") {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        scrollToEnglishGenerator();
      },
      true
    );
  }
}

function attachEnglishFormEvents() {
  const { form, copyButton, resetButton } = getEnglishElements();

  if (form) {
    form.addEventListener("submit", handleEnglishFormSubmit);
  }

  if (copyButton) {
    copyButton.addEventListener("click", copyEnglishPrompt);
  }

  if (resetButton) {
    resetButton.addEventListener("click", clearEnglishGenerator);
  }
}

function openEnglishGeneratorFromHash() {
  if (window.location.hash === "#english-generator") {
    scrollToEnglishGenerator();
  }
}

insertEnglishNavLink();
insertEnglishGenerator();
attachEnglishRouting();
attachEnglishFormEvents();
openEnglishGeneratorFromHash();
