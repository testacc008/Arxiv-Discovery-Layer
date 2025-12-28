// Generate last 8 weeks (Mon-Fri ranges)
function getLastWeeks(n) {
  const weeks = [];
  const today = new Date();
  today.setDate(today.getDate() - today.getDay()); // go to Sunday
  for (let i = 0; i < n; i++) {
    const friday = new Date(today);
    friday.setDate(friday.getDate() - (i * 7) - 2); // Friday
    const monday = new Date(friday);
    monday.setDate(friday.getDate() - 4); // Monday
    const fmt = d => d.toLocaleDateString("en-GB");
    weeks.push({ label: `${fmt(monday)} - ${fmt(friday)}`, start: monday, end: friday });
  }
  return weeks;
}

// Papers from Thu, 25 Dec 2025
const papers = [
  { id: "2512.21327", title: "Aspects of holographic timelike entanglement entropy in black hole backgrounds" },
  { id: "2512.21291", title: "T-Duality Effects in Electrodynamics: The (2+1)-dimensional Case" },
  // … add the rest
];

function renderWeeks() {
  const weekList = document.getElementById("week-list");
  const weeks = getLastWeeks(8);
  weeks.forEach((w, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" onclick="renderFeed()">${w.label}</a>`;
    weekList.appendChild(li);
  });
}

function renderFeed() {
  const feed = document.getElementById("papers");
  feed.innerHTML = "";
  papers.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <a href="https://arxiv.org/pdf/${p.id}.pdf" target="_blank">📄 View PDF</a>
    `;
    feed.appendChild(card);
  });
}

// Initialize
renderWeeks();
renderFeed(); // show most recent week by default
