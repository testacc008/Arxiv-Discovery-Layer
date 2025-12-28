// Example static data (later you can connect to arXiv API)
const papers = [
  { id: "2501.01234", title: "Sample Paper A", likes: 5 },
  { id: "2501.05678", title: "Sample Paper B", likes: 12 }
];

function renderFeed() {
  const feed = document.getElementById("feed");
  feed.innerHTML = "";
  papers.sort((a,b) => b.likes - a.likes).forEach(p => {
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
  renderFeed();
}

renderFeed();
