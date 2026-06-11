function updatePracticalRoadmap() {
  const roadmapSection = document.querySelector("#roadmap");

  if (!roadmapSection) {
    return;
  }

  const heading = roadmapSection.querySelector("h2");
  const description = roadmapSection.querySelector("p:not(.eyebrow)");
  const roadmapList = roadmapSection.querySelector(".roadmap-list");

  if (heading) {
    heading.textContent = "পরবর্তী লক্ষ্য";
  }

  if (description) {
    description.textContent =
      "প্রথম ধাপে মূল প্রম্পট জেনারেটরগুলো চালু হয়েছে। পরবর্তী লক্ষ্য হলো ব্যবহারকারীদের দ্রুত শেখা, এআই দিয়ে দক্ষতা উন্নয়ন, চাকরি ও ফ্রিল্যান্সিং প্রস্তুতি, ইংরেজি চর্চা এবং বাস্তব আয় প্রস্তুতিতে আরও সহায়ক করা। বড় প্রতিশ্রুতি নয়, ছোট ছোট ব্যবহারযোগ্য উন্নয়নই হবে অগ্রাধিকার।";
  }

  if (roadmapList) {
    roadmapList.innerHTML = `
      <span>প্রস্তুত প্রম্পট উদাহরণ</span>
      <span>দ্রুত শেখার গাইড</span>
      <span>স্কিল ও আয় প্রস্তুতি চেকলিস্ট</span>
    `;
  }
}

function getCurrentPromptLanguage() {
  const selectedLanguage = document.querySelector('input[name="prompt-language"]:checked');
  return selectedLanguage ? selectedLanguage.value : "বাংলা";
}

function insertAiLearningNavLink() {
  const navLinks = document.querySelector(".nav-links");

  if (!navLinks || document.querySelector('a[href="#ai-learning-generator"]')) {
    return;
  }

  const englishLink = navLinks.querySelector('a[href="#english-generator"]');
  const fallbackLink = navLinks.querySelector('a[href="#student-generator"]');
  const aiLink = document.createElement("a");
  aiLink.href = "#ai-learning-generator";
  aiLink.textContent = "এআই জেনারেটর";

  if (englishLink) {
    englishLink.insertAdjacentElement("afterend", aiLink);
    return;
  }

  if (fallbackLink) {
    fallbackLink.insertAdjacentElement("afterend", aiLink);
    return;
  }

  navLinks.appendChild(aiLink);
}

function insertAiLearningGenerator() {
  if (document.querySelector("#ai-learning-generator")) {
    return;
  }

  const englishGenerator = document.querySelector("#english-generator");
  const jobGenerator = document.querySelector("#job-seeker-generator");
  const freelancerGenerator = document.querySelector("#freelancer-generator");
  const studentGenerator = document.querySelector("#student-generator");
  const insertionPoint = englishGenerator || jobGenerator || freelancerGenerator || studentGenerator;

  if (!insertionPoint) {
    return;
  }

  insertionPoint.insertAdjacentHTML(
    "afterend",
    `
      <section
        id="ai-learning-generator"
        class="section student-generator container"
        aria-labelledby="ai-learning-generator-title"
      >
        <div class="section-heading">
          <p class="eyebrow">AI Learning Starter</p>
          <h2 id="ai-learning-generator-title">এআই শেখার এআই প্রম্পট জেনারেটর</h2>
          <p>
            ChatGPT, prompt, custom GPT, AI agent, automation এবং দৈনন্দিন কাজে
            এআই ব্যবহারের জন্য আপনার শেখার লক্ষ্য বেছে নিন। এরপর ধাপে ধাপে শেখার
            মতো একটি কপি করার প্রম্পট তৈরি হবে।
          </p>
        </div>

        <div class="generator-card">
          <form id="ai-learning-prompt-form" class="student-form">
            <div class="form-grid">
              <label class="form-field" for="ai-learning-level">
                <span>আপনার বর্তমান এআই শেখার লেভেল কী?</span>
                <select id="ai-learning-level" required>
                  <option value="">লেভেল নির্বাচন করুন</option>
                  <option value="Absolute Beginner">একদম শুরু</option>
                  <option value="Basic User">মোবাইল বা কম্পিউটারে ChatGPT ব্যবহার করেছি</option>
                  <option value="Prompt Learner">প্রম্পট লেখা শিখছি</option>
                  <option value="Tool Explorer">বিভিন্ন এআই টুল ব্যবহার করছি</option>
                  <option value="Builder Mindset">ছোট এআই সলিউশন বানাতে চাই</option>
                </select>
              </label>

              <label class="form-field" for="ai-learning-topic">
                <span>আপনি কী শিখতে চান?</span>
                <select id="ai-learning-topic" required>
                  <option value="">টপিক নির্বাচন করুন</option>
                  <option value="ChatGPT Basics">ChatGPT Basics</option>
                  <option value="Prompt Writing">Prompt Writing</option>
                  <option value="Prompt Engineering">Prompt Engineering</option>
                  <option value="Custom GPT">Custom GPT</option>
                  <option value="AI Agent">AI Agent</option>
                  <option value="AI Automation">AI Automation</option>
                  <option value="AI for Study">পড়াশোনায় এআই ব্যবহার</option>
                  <option value="AI for Job Search">চাকরিতে এআই ব্যবহার</option>
                  <option value="AI for Freelancing">ফ্রিল্যান্সিংয়ে এআই ব্যবহার</option>
                  <option value="AI Safety and Ethics">AI Safety and Ethics</option>
                </select>
              </label>

              <label class="form-field" for="ai-learning-goal">
                <span>আপনার শেখার লক্ষ্য কী?</span>
                <select id="ai-learning-goal" required>
                  <option value="">লক্ষ্য নির্বাচন করুন</option>
                  <option value="Understand the concept simply">সহজভাবে ধারণা বুঝতে চাই</option>
                  <option value="Learn by examples">উদাহরণ দিয়ে শিখতে চাই</option>
                  <option value="Practise with tasks">অনুশীলন করে শিখতে চাই</option>
                  <option value="Create useful prompts">ব্যবহারযোগ্য প্রম্পট বানাতে চাই</option>
                  <option value="Use AI for productivity">সময় বাঁচাতে এআই ব্যবহার করতে চাই</option>
                  <option value="Use AI for income readiness">আয় প্রস্তুতির জন্য এআই ব্যবহার শিখতে চাই</option>
                  <option value="Build a small AI project">ছোট এআই প্রজেক্ট বানাতে চাই</option>
                </select>
              </label>

              <label class="form-field" for="ai-learning-time">
                <span>আপনি প্রতিদিন কত সময় দিতে পারবেন?</span>
                <select id="ai-learning-time" required>
                  <option value="">সময় নির্বাচন করুন</option>
                  <option value="10 minutes daily">প্রতিদিন ১০ মিনিট</option>
                  <option value="20 minutes daily">প্রতিদিন ২০ মিনিট</option>
                  <option value="30 minutes daily">প্রতিদিন ৩০ মিনিট</option>
                  <option value="1 hour daily">প্রতিদিন ১ ঘণ্টা</option>
                  <option value="Weekend only">শুধু সপ্তাহান্তে</option>
                </select>
              </label>

              <label class="form-field form-field-wide" for="ai-learning-use-case">
                <span>কোন কাজে এআই ব্যবহার করতে চান?</span>
                <textarea
                  id="ai-learning-use-case"
                  rows="4"
                  placeholder="যেমন: পড়াশোনা, চাকরির আবেদন, Fiverr gig লেখা, client message, content idea, business planning"
                  required
                ></textarea>
              </label>

              <label class="form-field form-field-wide" for="ai-learning-extra">
                <span>অতিরিক্ত নির্দেশনা</span>
                <textarea
                  id="ai-learning-extra"
                  rows="3"
                  placeholder="যেমন: আমি একদম নতুন, মোবাইল দিয়ে শিখব, ইংরেজি দুর্বল, খুব সহজ উদাহরণ চাই"
                ></textarea>
              </label>
            </div>

            <p class="generator-note">
              এআই শেখার সবচেয়ে ভালো পদ্ধতি হলো ছোট লক্ষ্য, দ্রুত অনুশীলন এবং
              নিজের বাস্তব কাজের সঙ্গে শেখাকে যুক্ত করা।
            </p>

            <div class="generator-actions">
              <button class="button primary" type="submit">এআই শেখার প্রম্পট তৈরি করুন</button>
              <button class="button secondary" id="copy-ai-learning-prompt" type="button" disabled>
                প্রম্পট কপি করুন
              </button>
              <button class="button secondary" id="reset-ai-learning-form" type="button">
                রিসেট করুন
              </button>
            </div>

            <p id="ai-learning-generator-message" class="generator-message" role="status"></p>
          </form>

          <article id="ai-learning-result-card" class="result-card" hidden>
            <p class="eyebrow">কপি রেডি ফলাফল</p>
            <h3>তৈরি হওয়া এআই শেখার প্রম্পট</h3>
            <pre id="ai-learning-prompt-output"></pre>
          </article>
        </div>
      </section>
    `
  );
}

function getAiLearningElements() {
  return {
    form: document.querySelector("#ai-learning-prompt-form"),
    copyButton: document.querySelector("#copy-ai-learning-prompt"),
    resetButton: document.querySelector("#reset-ai-learning-form"),
    message: document.querySelector("#ai-learning-generator-message"),
    resultCard: document.querySelector("#ai-learning-result-card"),
    output: document.querySelector("#ai-learning-prompt-output")
  };
}

function getAiLearningValues() {
  return {
    level: document.querySelector("#ai-learning-level").value.trim(),
    topic: document.querySelector("#ai-learning-topic").value.trim(),
    goal: document.querySelector("#ai-learning-goal").value.trim(),
    time: document.querySelector("#ai-learning-time").value.trim(),
    useCase: document.querySelector("#ai-learning-use-case").value.trim(),
    extra: document.querySelector("#ai-learning-extra").value.trim()
  };
}

function hasRequiredAiLearningValues(values) {
  return values.level && values.topic && values.goal && values.time && values.useCase;
}

function buildBanglaAiLearningPrompt(values) {
  const extra = values.extra || "কোনো অতিরিক্ত নির্দেশনা নেই।";

  return `আপনি একজন ধৈর্যশীল AI learning coach হিসেবে কাজ করুন। আমি বাংলা ভাষাভাষী শিক্ষার্থী এবং এআই শেখায় নতুন হতে পারি। আমাকে সহজ ভাষায়, ছোট ধাপে, বাস্তব উদাহরণ দিয়ে শেখান।

আমার বর্তমান লেভেল:
${values.level}

আমি যে বিষয় শিখতে চাই:
${values.topic}

আমার শেখার লক্ষ্য:
${values.goal}

আমি প্রতিদিন সময় দিতে পারব:
${values.time}

আমি যে কাজে এআই ব্যবহার করতে চাই:
${values.useCase}

অতিরিক্ত নির্দেশনা:
${extra}

দয়া করে নিচের কাঠামোতে উত্তর দিন:

১. আগে বিষয়টি খুব সহজ বাংলায় ব্যাখ্যা করুন।
২. কেন এটি আমার জন্য দরকার হতে পারে তা বাস্তব উদাহরণ দিয়ে বুঝান।
৩. ৫টি সহজ উদাহরণ দিন, যা আমি আজই চেষ্টা করতে পারি।
৪. আমাকে ৭ দিনের ছোট practice plan দিন, আমার সময় অনুযায়ী।
৫. প্রতিদিন কী prompt লিখব তার নমুনা দিন।
৬. সাধারণ ভুলগুলো বলুন এবং কীভাবে ঠিক করব তা দেখান।
৭. নিরাপদ ও দায়িত্বশীল এআই ব্যবহারের ছোট সতর্কতা দিন।
৮. শেষে একটি checklist দিন, যাতে বুঝতে পারি আমি এই টপিকটি প্রাথমিকভাবে শিখেছি কি না।

উত্তর বাংলায় দিন, কিন্তু ChatGPT, prompt, custom GPT, AI agent, automation এর মতো প্রচলিত শব্দ ব্যবহার করতে পারেন।`;
}

function buildEnglishAiLearningPrompt(values) {
  const extra = values.extra || "No additional instruction provided.";

  return `Act as a patient AI learning coach. I may be new to AI, so teach me in simple language, step by step, with practical examples.

My current level:
${values.level}

Topic I want to learn:
${values.topic}

My learning goal:
${values.goal}

Time I can spend:
${values.time}

How I want to use AI:
${values.useCase}

Additional instruction:
${extra}

Please respond in this structure:

1. Explain the topic in very simple language.
2. Explain why this can be useful for me using practical examples.
3. Give me 5 simple examples I can try today.
4. Create a 7 day practice plan based on my available time.
5. Give me sample prompts to practise each day.
6. Show common mistakes and how to fix them.
7. Add a short note on safe and responsible AI use.
8. End with a checklist so I can confirm whether I have understood the basics.

Please answer in simple English.`;
}

function buildAiLearningPrompt(values) {
  return getCurrentPromptLanguage() === "English"
    ? buildEnglishAiLearningPrompt(values)
    : buildBanglaAiLearningPrompt(values);
}

function showAiLearningMessage(message, type = "info") {
  const { message: messageElement } = getAiLearningElements();

  if (!messageElement) {
    return;
  }

  messageElement.textContent = message;
  messageElement.dataset.type = type;
}

function handleAiLearningSubmit(event) {
  event.preventDefault();

  const values = getAiLearningValues();
  const { copyButton, resultCard, output } = getAiLearningElements();

  if (!hasRequiredAiLearningValues(values)) {
    showAiLearningMessage("দয়া করে লেভেল, টপিক, লক্ষ্য, সময় এবং ব্যবহার ক্ষেত্র পূরণ করুন।", "error");
    resultCard.hidden = true;
    copyButton.disabled = true;
    return;
  }

  output.textContent = buildAiLearningPrompt(values);
  resultCard.hidden = false;
  copyButton.disabled = false;
  showAiLearningMessage("এআই শেখার প্রম্পট তৈরি হয়েছে। এখন কপি করে ব্যবহার করতে পারেন।", "success");
}

async function copyAiLearningPrompt() {
  const { output } = getAiLearningElements();

  if (!output || !output.textContent.trim()) {
    return;
  }

  try {
    await navigator.clipboard.writeText(output.textContent);
    showAiLearningMessage("প্রম্পট কপি হয়েছে। এখন এটি আপনার পছন্দের এআই টুলে ব্যবহার করুন।", "success");
  } catch {
    output.focus();
    showAiLearningMessage("স্বয়ংক্রিয়ভাবে কপি করা যায়নি। প্রম্পটটি নির্বাচন করে ম্যানুয়ালি কপি করুন।", "error");
  }
}

function clearAiLearningGenerator() {
  const { form, copyButton, resultCard, output } = getAiLearningElements();

  form.reset();
  output.textContent = "";
  resultCard.hidden = true;
  copyButton.disabled = true;
  showAiLearningMessage("এআই শেখার ফর্ম রিসেট হয়েছে। নতুন করে শুরু করুন।", "info");
}

function scrollToAiLearningGenerator() {
  const aiGenerator = document.querySelector("#ai-learning-generator");

  if (!aiGenerator) {
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

  aiGenerator.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", "#ai-learning-generator");
}

function attachAiLearningRouting() {
  const categoryGrid = document.querySelector("#category-grid");
  const outcomeGrid = document.querySelector("#outcome-grid");

  if (categoryGrid) {
    categoryGrid.addEventListener(
      "click",
      (event) => {
        const card = event.target.closest('[data-category-id="ai-learning"]');

        if (!card) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        scrollToAiLearningGenerator();
      },
      true
    );
  }

  if (outcomeGrid) {
    outcomeGrid.addEventListener(
      "click",
      (event) => {
        const card = event.target.closest("[data-outcome]");

        if (!card || card.dataset.outcome !== "এআই শিখতে চাই") {
          return;
        }

        event.preventDefault();
        event.stopPropagation();
        scrollToAiLearningGenerator();
      },
      true
    );
  }
}

function attachAiLearningFormEvents() {
  const { form, copyButton, resetButton } = getAiLearningElements();

  if (form) {
    form.addEventListener("submit", handleAiLearningSubmit);
  }

  if (copyButton) {
    copyButton.addEventListener("click", copyAiLearningPrompt);
  }

  if (resetButton) {
    resetButton.addEventListener("click", clearAiLearningGenerator);
  }
}

function openAiLearningFromHash() {
  if (window.location.hash === "#ai-learning-generator") {
    scrollToAiLearningGenerator();
  }
}

updatePracticalRoadmap();
insertAiLearningNavLink();
insertAiLearningGenerator();
attachAiLearningRouting();
attachAiLearningFormEvents();
openAiLearningFromHash();
