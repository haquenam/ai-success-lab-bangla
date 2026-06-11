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

updatePracticalRoadmap();
