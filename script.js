// Generate last 8 weeks (Mon-Fri ranges)
function getLastWeeks(n) {
  const weeks = [];
  const today = new Date();
  // Start from last Friday
  today.setDate(today.getDate() - today.getDay()); // go to Sunday
  for (let i = 0; i < n; i++) {
    const friday = new Date(today);
    friday.setDate(friday.getDate() - (i * 7) - 2); // Friday
    const monday = new Date(friday);
    monday.setDate(friday.getDate() - 4); // Monday
    const fmt = d => d.toLocaleDateString("en-GB"); // dd/mm/yyyy
    weeks.push({ label: `${fmt(monday)} - ${fmt(friday)}`, start: monday, end: friday });
  }
  return weeks;
}

// Example static papers (later connect to arXiv API)
const papers = [
  { id: "2501.01234", title: "Sample Paper A", likes: 5, week: 0 },
  { id: "2501.05678", title: "Sample Paper B", likes: 12, week: 1 }
];

function renderWeeks() {
  const weekList = document.getElementById("week-list");
  const weeks = getLastWeeks(8);
  weeks.forEach((w, idx) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" onclick="renderFeed(${idx})">${w.label}</a>`;
    weekList.appendChild(li);
  });
}

function renderFeed(weekIndex) {
  const feed = document.getElementById("papers");
  feed.innerHTML = "";
  papers.filter(p => p.week === weekIndex).sort((a,b) => b.likes - a.likes).forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${p.title}</h3>
      <a href="https://arxiv.org/pdf/${p.id}.pdf" target="_blank">📄 View PDF</a><br>
      <button onclick="like('${p.id}')">👍 ${p.likes}</button>
    `;
    feed.appendChild(card);
  });
}

function like(id) {
  const paper = papers.find(p => p.id === id);
  paper.likes++;
  renderFeed(paper.week);
}

// Initialize
renderWeeks();
renderFeed(0); // show most recent week by default
