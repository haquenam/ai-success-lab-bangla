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

function insertJobSeekerNavLink() {
  const navLinks = document.querySelector(".nav-links");

  if (!navLinks || document.querySelector('a[href="#job-seeker-generator"]')) {
    return;
  }

  const studentLink = navLinks.querySelector('a[href="#student-generator"]');
  const jobLink = document.createElement("a");
  jobLink.href = "#job-seeker-generator";
  jobLink.textContent = "চাকরি জেনারেটর";

  if (studentLink) {
    studentLink.insertAdjacentElement("afterend", jobLink);
    return;
  }

  navLinks.appendChild(jobLink);
}

function insertJobSeekerGenerator() {
  if (document.querySelector("#job-seeker-generator")) {
    return;
  }

  const studentGenerator = document.querySelector("#student-generator");

  if (!studentGenerator) {
    return;
  }

  studentGenerator.insertAdjacentHTML(
    "afterend",
    `
      <section
        id="job-seeker-generator"
        class="section student-generator container"
        aria-labelledby="job-seeker-generator-title"
      >
        <div class="section-heading">
          <p class="eyebrow">Career Starter Module</p>
          <h2 id="job-seeker-generator-title">চাকরি প্রার্থী এআই প্রম্পট জেনারেটর</h2>
          <p>
            নতুন CV তৈরি, পুরোনো CV উন্নত করা, চাকরির বিজ্ঞাপন বোঝা, cover letter,
            LinkedIn profile, interview preparation এবং application message লেখার জন্য
            সহজভাবে প্রয়োজনীয় তথ্য দিন। এরপর কপি করার মতো শক্তিশালী প্রম্পট তৈরি হবে।
          </p>
        </div>

        <div class="generator-card">
          <form id="job-seeker-prompt-form" class="student-form">
            <div class="form-grid">
              <label class="form-field" for="job-action">
                <span>আপনি কী করতে চান?</span>
                <select id="job-action" required>
                  <option value="">কাজ নির্বাচন করুন</option>
                  <option value="Create a new CV">নতুন CV তৈরি করুন</option>
                  <option value="Improve an existing CV">পুরোনো CV উন্নত করুন</option>
                  <option value="Analyse a job advert">চাকরির বিজ্ঞাপন বিশ্লেষণ করুন</option>
                  <option value="Match CV with job advert">CV এবং চাকরির মিল যাচাই করুন</option>
                  <option value="Create a cover letter">Cover letter তৈরি করুন</option>
                  <option value="Improve LinkedIn profile">LinkedIn প্রোফাইল সাজান</option>
                  <option value="Prepare for interview">ইন্টারভিউ প্রস্তুতি নিন</option>
                  <option value="Write job application message">চাকরির আবেদন মেসেজ লিখুন</option>
                  <option value="Full job application kit">Full job application kit</option>
                </select>
              </label>

              <label class="form-field" for="job-sector">
                <span>কাজের ধরন বা সেক্টর</span>
                <select id="job-sector" required>
                  <option value="">সেক্টর নির্বাচন করুন</option>
                  <option value="IT and Technology">IT and Technology</option>
                  <option value="Data Entry">Data Entry</option>
                  <option value="Customer Support">Customer Support</option>
                  <option value="Admin and Office Support">Admin and Office Support</option>
                  <option value="Teaching and Tutoring">Teaching and Tutoring</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Sales and Retail">Sales and Retail</option>
                  <option value="Finance and Accounts">Finance and Accounts</option>
                  <option value="Healthcare Support">Healthcare Support</option>
                  <option value="Freelance or Remote Work">Freelance or Remote Work</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label class="form-field" for="job-experience">
                <span>আপনার অভিজ্ঞতার লেভেল</span>
                <select id="job-experience" required>
                  <option value="">অভিজ্ঞতা নির্বাচন করুন</option>
                  <option value="No formal experience">No formal experience</option>
                  <option value="Beginner">Beginner</option>
                  <option value="1 to 2 years">1 to 2 years</option>
                  <option value="3 to 5 years">3 to 5 years</option>
                  <option value="5 plus years">5 plus years</option>
                </select>
              </label>

              <label class="form-field" for="job-education">
                <span>শিক্ষাগত যোগ্যতা</span>
                <select id="job-education" required>
                  <option value="">যোগ্যতা নির্বাচন করুন</option>
                  <option value="SSC">SSC</option>
                  <option value="HSC">HSC</option>
                  <option value="Diploma">Diploma</option>
                  <option value="Bachelor">Bachelor</option>
                  <option value="Master">Master</option>
                  <option value="Professional Certificate">Professional Certificate</option>
                  <option value="Other">Other</option>
                </select>
              </label>

              <label class="form-field form-field-wide" for="target-role">
                <span>যে চাকরি বা ভূমিকার জন্য প্রস্তুতি নিচ্ছেন</span>
                <input
                  id="target-role"
                  type="text"
                  placeholder="যেমন: Data Entry Operator, Junior Web Developer, Customer Support Executive"
                  required
                />
              </label>

              <label class="form-field form-field-wide" for="job-skills">
                <span>আপনার স্কিল লিখুন</span>
                <textarea
                  id="job-skills"
                  rows="3"
                  placeholder="যেমন: Excel, communication, email writing, customer service, basic AI tools, data entry"
                  required
                ></textarea>
              </label>

              <label class="form-field form-field-wide" for="job-advert">
                <span>চাকরির বিজ্ঞাপন থাকলে এখানে লিখুন</span>
                <textarea
                  id="job-advert"
                  rows="5"
                  placeholder="চাকরির পোস্ট, দায়িত্ব, যোগ্যতা বা employer requirements এখানে paste করুন"
                ></textarea>
              </label>

              <label class="form-field form-field-wide" for="cv-information">
                <span>আপনার বর্তমান CV বা নিজের তথ্য লিখুন</span>
                <textarea
                  id="cv-information"
                  rows="5"
                  placeholder="শিক্ষা, কাজের অভিজ্ঞতা, project, certificate, volunteer work, achievements বা বর্তমান CV information লিখুন"
                ></textarea>
              </label>
            </div>

            <p class="generator-note">
              সতর্কতা: অভিজ্ঞতা বা দক্ষতা বানিয়ে লিখবেন না। নিজের বাস্তব তথ্যকে
              পরিষ্কার, পেশাদার এবং চাকরির সঙ্গে মিল রেখে সাজানোই সবচেয়ে ভালো পদ্ধতি।
            </p>

            <div class="generator-actions">
              <button class="button primary" type="submit">চাকরির প্রম্পট তৈরি করুন</button>
              <button class="button secondary" id="copy-job-seeker-prompt" type="button" disabled>
                প্রম্পট কপি করুন
              </button>
              <button class="button secondary" id="reset-job-seeker-form" type="button">
                রিসেট করুন
              </button>
            </div>

            <p id="job-seeker-generator-message" class="generator-message" role="status"></p>
          </form>

          <article id="job-seeker-result-card" class="result-card" hidden>
            <p class="eyebrow">কপি রেডি ফলাফল</p>
            <h3>তৈরি হওয়া চাকরির প্রম্পট</h3>
            <pre id="job-seeker-prompt-output"></pre>
          </article>
        </div>
      </section>
    `
  );
}

function getJobSeekerElements() {
  return {
    form: document.querySelector("#job-seeker-prompt-form"),
    copyButton: document.querySelector("#copy-job-seeker-prompt"),
    resetButton: document.querySelector("#reset-job-seeker-form"),
    message: document.querySelector("#job-seeker-generator-message"),
    resultCard: document.querySelector("#job-seeker-result-card"),
    output: document.querySelector("#job-seeker-prompt-output")
  };
}

function getJobSeekerFormValues() {
  return {
    action: document.querySelector("#job-action").value.trim(),
    sector: document.querySelector("#job-sector").value.trim(),
    experience: document.querySelector("#job-experience").value.trim(),
    education: document.querySelector("#job-education").value.trim(),
    targetRole: document.querySelector("#target-role").value.trim(),
    skills: document.querySelector("#job-skills").value.trim(),
    jobAdvert: document.querySelector("#job-advert").value.trim(),
    cvInformation: document.querySelector("#cv-information").value.trim()
  };
}

function hasRequiredJobSeekerValues(values) {
  return values.action && values.sector && values.experience && values.education && values.targetRole && values.skills;
}

function buildBanglaJobSeekerPrompt(values) {
  const advert = values.jobAdvert || "চাকরির বিজ্ঞাপন দেওয়া হয়নি। সাধারণ বাজার চাহিদা ধরে সাহায্য করুন।";
  const cvInfo = values.cvInformation || "আমার CV তথ্য এখনো পূর্ণ নয়। দেওয়া তথ্যের ভিত্তিতে একটি পরিষ্কার কাঠামো তৈরি করুন এবং কী তথ্য যোগ করা দরকার তা বলুন।";

  return `আপনি একজন অভিজ্ঞ career coach, CV writer, recruiter এবং interview preparation mentor হিসেবে কাজ করুন। আমি বাংলা ভাষাভাষী চাকরি প্রার্থী। আমার অভিজ্ঞতা সীমিত হতে পারে, তাই আমাকে সহজ ভাষায়, বাস্তবসম্মতভাবে এবং পেশাদারভাবে সাহায্য করুন।

আমি যা করতে চাই:
${values.action}

যে সেক্টর বা কাজের ধরন:
${values.sector}

টার্গেট চাকরি বা ভূমিকা:
${values.targetRole}

আমার অভিজ্ঞতার লেভেল:
${values.experience}

আমার শিক্ষাগত যোগ্যতা:
${values.education}

আমার স্কিল:
${values.skills}

চাকরির বিজ্ঞাপন বা employer requirements:
${advert}

আমার বর্তমান CV বা নিজের তথ্য:
${cvInfo}

দয়া করে নিচের কাঠামোতে সাহায্য করুন:

১. আগে চাকরিটি কী ধরনের মানুষ খুঁজছে তা সহজ ভাষায় ব্যাখ্যা করুন।
২. আমার তথ্য থেকে কোন স্কিল ও অভিজ্ঞতা চাকরির সঙ্গে সবচেয়ে বেশি মেলে তা দেখান।
৩. নতুন CV দরকার হলে professional summary, skills, education, experience, project এবং achievements section সাজিয়ে দিন।
৪. পুরোনো CV উন্নত করতে হলে weak wording বদলে strong কিন্তু সত্যভিত্তিক wording দিন।
৫. চাকরির বিজ্ঞাপন থাকলে CV to job match analysis করুন: strong match, partial match, missing skill, কীভাবে improve করব।
৬. Cover letter বা application message দরকার হলে সংক্ষিপ্ত, ভদ্র, role specific version লিখুন।
৭. Interview preparation দরকার হলে ৮টি সম্ভাব্য প্রশ্ন এবং beginner friendly sample answer দিন।
৮. LinkedIn profile দরকার হলে headline, about section এবং skills list সাজিয়ে দিন।
৯. কোনো অভিজ্ঞতা বা দক্ষতা বানিয়ে লিখবেন না। আমার বাস্তব তথ্যকে ভালোভাবে সাজিয়ে দিন।
১০. শেষে apply করার আগে একটি final checklist দিন।

উত্তর বাংলায় দিন, তবে CV, cover letter, interview, LinkedIn, recruiter, achievement, skills এর মতো প্রচলিত career শব্দ ব্যবহার করতে পারেন।`;
}

function buildEnglishJobSeekerPrompt(values) {
  const advert = values.jobAdvert || "No job advert has been provided. Please guide me using general market expectations for this role.";
  const cvInfo = values.cvInformation || "My CV information is not complete yet. Please create a clean structure from the available information and tell me what else I should add.";

  return `Act as an experienced career coach, CV writer, recruiter, and interview preparation mentor. I may have limited experience, so help me present my real background clearly, professionally, and honestly.

What I want to do:
${values.action}

Sector or job type:
${values.sector}

Target role:
${values.targetRole}

My experience level:
${values.experience}

My education:
${values.education}

My skills:
${values.skills}

Job advert or employer requirements:
${advert}

My current CV or personal information:
${cvInfo}

Please help me in this structure:

1. Explain what kind of candidate this role is looking for in simple language.
2. Identify which of my skills and experiences match the role best.
3. If I need a new CV, draft a professional summary, skills section, education, experience, projects, and achievements section.
4. If I need to improve an existing CV, rewrite weak wording into stronger but truthful wording.
5. If a job advert is provided, create a CV to job match analysis: strong match, partial match, missing skill, and how to improve.
6. If I need a cover letter or application message, write a short, polite, role specific version.
7. If I need interview preparation, give me 8 likely interview questions with beginner friendly sample answers.
8. If I need a LinkedIn profile, suggest a headline, about section, and skills list.
9. Do not invent experience, skills, education, or achievements. Improve only the way my real information is presented.
10. End with a final checklist before I apply.

Please answer in simple professional English.`;
}

function buildJobSeekerPrompt(values) {
  return getSelectedPromptLanguage() === "English"
    ? buildEnglishJobSeekerPrompt(values)
    : buildBanglaJobSeekerPrompt(values);
}

function showJobSeekerMessage(message, type = "info") {
  const { message: messageElement } = getJobSeekerElements();

  if (!messageElement) {
    return;
  }

  messageElement.textContent = message;
  messageElement.dataset.type = type;
}

function handleJobSeekerFormSubmit(event) {
  event.preventDefault();

  const values = getJobSeekerFormValues();
  const { copyButton, resultCard, output } = getJobSeekerElements();

  if (!hasRequiredJobSeekerValues(values)) {
    showJobSeekerMessage("দয়া করে কাজের ধরন, সেক্টর, অভিজ্ঞতা, শিক্ষা, টার্গেট role এবং স্কিল পূরণ করুন।", "error");
    resultCard.hidden = true;
    copyButton.disabled = true;
    return;
  }

  const prompt = buildJobSeekerPrompt(values);
  output.textContent = prompt;
  resultCard.hidden = false;
  copyButton.disabled = false;
  showJobSeekerMessage("চাকরির প্রম্পট তৈরি হয়েছে। এখন কপি করে ব্যবহার করতে পারেন।", "success");
}

async function copyJobSeekerPrompt() {
  const { output } = getJobSeekerElements();

  if (!output || !output.textContent.trim()) {
    return;
  }

  try {
    await navigator.clipboard.writeText(output.textContent);
    showJobSeekerMessage("প্রম্পট কপি হয়েছে। এখন এটি আপনার পছন্দের এআই টুলে ব্যবহার করুন।", "success");
  } catch {
    output.focus();
    showJobSeekerMessage("স্বয়ংক্রিয়ভাবে কপি করা যায়নি। প্রম্পটটি নির্বাচন করে ম্যানুয়ালি কপি করুন।", "error");
  }
}

function clearJobSeekerGenerator() {
  const { form, copyButton, resultCard, output } = getJobSeekerElements();

  form.reset();
  output.textContent = "";
  resultCard.hidden = true;
  copyButton.disabled = true;
  showJobSeekerMessage("চাকরি প্রার্থী ফর্ম রিসেট হয়েছে। নতুন করে শুরু করুন।", "info");
}

function scrollToJobSeekerGenerator() {
  const jobGenerator = document.querySelector("#job-seeker-generator");

  if (!jobGenerator) {
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

  jobGenerator.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", "#job-seeker-generator");
}

function attachJobSeekerRouting() {
  const categoryGrid = document.querySelector("#category-grid");
  const outcomeGrid = document.querySelector("#outcome-grid");

  if (categoryGrid) {
    categoryGrid.addEventListener(
      "click",
      (event) => {
        const card = event.target.closest('[data-category-id="job-seekers"]');

        if (!card) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        scrollToJobSeekerGenerator();
      },
      true
    );
  }

  if (outcomeGrid) {
    outcomeGrid.addEventListener(
      "click",
      (event) => {
        const card = event.target.closest("[data-outcome]");

        if (!card) {
          return;
        }

        if (card.dataset.outcome === "চাকরি খুঁজতে চাই" || card.dataset.outcome === "সিভি তৈরি করতে চাই") {
          event.preventDefault();
          event.stopPropagation();
          scrollToJobSeekerGenerator();
        }
      },
      true
    );
  }
}

function attachJobSeekerFormEvents() {
  const { form, copyButton, resetButton } = getJobSeekerElements();

  if (form) {
    form.addEventListener("submit", handleJobSeekerFormSubmit);
  }

  if (copyButton) {
    copyButton.addEventListener("click", copyJobSeekerPrompt);
  }

  if (resetButton) {
    resetButton.addEventListener("click", clearJobSeekerGenerator);
  }
}

function openJobSeekerGeneratorFromHash() {
  if (window.location.hash === "#job-seeker-generator") {
    scrollToJobSeekerGenerator();
  }
}

insertEnglishNavLink();
insertEnglishGenerator();
attachEnglishRouting();
attachEnglishFormEvents();
openEnglishGeneratorFromHash();

insertJobSeekerNavLink();
insertJobSeekerGenerator();
attachJobSeekerRouting();
attachJobSeekerFormEvents();
openJobSeekerGeneratorFromHash();
