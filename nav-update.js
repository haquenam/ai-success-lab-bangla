function updateNavigationLabels() {
  const labels = {
    "#home": "হোম",
    "#categories": "বিভাগ",
    "#student-generator": "পড়াশোনা",
    "#job-seeker-generator": "চাকরি",
    "#freelancer-generator": "ফ্রিল্যান্স",
    "#english-generator": "ইংরেজি",
    "#ai-learning-generator": "এআই",
    "#learning-hub": "হাব",
    "#roadmap": "রোডম্যাপ"
  };

  const titles = {
    "#home": "হোম",
    "#categories": "মূল বিভাগ",
    "#student-generator": "শিক্ষার্থী প্রম্পট জেনারেটর",
    "#job-seeker-generator": "চাকরি প্রার্থী প্রম্পট জেনারেটর",
    "#freelancer-generator": "ফ্রিল্যান্সার প্রম্পট জেনারেটর",
    "#english-generator": "ইংরেজি শেখার প্রম্পট জেনারেটর",
    "#ai-learning-generator": "এআই শেখার প্রম্পট জেনারেটর",
    "#learning-hub": "এআই লার্নিং হাব",
    "#roadmap": "রোডম্যাপ"
  };

  Object.entries(labels).forEach(([href, label]) => {
    document.querySelectorAll(`.nav-links a[href="${href}"]`).forEach((link) => {
      link.textContent = label;
      link.title = titles[href] || label;
      link.setAttribute("aria-label", titles[href] || label);
    });
  });
}

updateNavigationLabels();
