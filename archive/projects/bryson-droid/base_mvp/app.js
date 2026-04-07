const profiles = [
  {
    name: "Maya",
    handicap: "HCP 12",
    distance: "6 miles away",
    course: "Presidio Golf Course",
    availability: "Sat mornings",
    vibe: "Walks 18",
    bio: "Walking 18, keeps a steady pace, always up for a casual competitive round.",
    hints: ["Similar skill level", "Shared morning availability", "Mutual course"],
    photo: "linear-gradient(135deg, #2f855a, #68d391)",
  },
  {
    name: "Jordan",
    handicap: "HCP 16-20",
    distance: "11 miles away",
    course: "TPC Harding Park",
    availability: "Sun afternoons",
    vibe: "Relaxed 9",
    bio: "Rides most rounds, likes 9 holes after lunch, relaxed vibe and no pressure.",
    hints: ["Within travel radius", "Same 9-hole preference", "Good weekend overlap"],
    photo: "linear-gradient(135deg, #2b6cb0, #63b3ed)",
  },
  {
    name: "Chris",
    handicap: "New / Unknown",
    distance: "4 miles away",
    course: "Lincoln Park Golf Course",
    availability: "Weekday twilight",
    vibe: "New golfer",
    bio: "Newer golfer looking for a recurring group, easygoing round, and good course chat.",
    hints: ["Very close by", "Flexible schedule", "Recurring group interest"],
    photo: "linear-gradient(135deg, #805ad5, #d6bcfa)",
  },
];

const profileCard = document.getElementById("profile-card");
const profileCount = document.getElementById("profile-count");
const matchCount = document.getElementById("match-count");
const likedCount = document.getElementById("liked-count");
const passedCount = document.getElementById("passed-count");
const matchesList = document.getElementById("matches-list");
const passButton = document.getElementById("pass-button");
const likeButton = document.getElementById("like-button");
const likedTab = document.getElementById("liked-tab");
const passedTab = document.getElementById("passed-tab");

let currentIndex = 0;
let likedProfiles = [];
let passedProfiles = [];
let activeReviewTab = "liked";

function renderProfile() {
  const profile = profiles[currentIndex];

  profileCount.textContent = profile
    ? `${currentIndex + 1} of ${profiles.length}`
    : "Done";

  if (!profile) {
    profileCard.innerHTML = `
      <div class="done-state">
        <span class="done-pill">Stack complete</span>
        <h3>No more golfers to review.</h3>
        <p>You made it through the starter stack. Refresh to browse again or keep your favorite picks in the saved list.</p>
      </div>
    `;
    passButton.disabled = true;
    likeButton.disabled = true;
    return;
  }

  profileCard.innerHTML = `
    <div class="profile-photo" style="background-image: ${profile.photo};">
      <div class="profile-topline">
        <span class="profile-badge">Top pick nearby</span>
        <span class="profile-badge">${profile.distance}</span>
      </div>
      <div class="profile-headline">
        <h3>${profile.name}</h3>
        <div class="profile-subline">
          <span>${profile.handicap}</span>
          <span>${profile.vibe}</span>
        </div>
      </div>
    </div>
    <div class="profile-body">
      <section class="profile-section">
        <p class="section-label">Round details</p>
        <ul class="profile-meta">
          <li>${profile.course}</li>
          <li>${profile.availability}</li>
        </ul>
      </section>
      <section class="profile-section">
        <p class="section-label">About them</p>
        <p class="profile-bio">${profile.bio}</p>
      </section>
      <section class="profile-section">
        <p class="section-label">Why this match?</p>
        <ul class="hint-list">
          ${profile.hints.map((hint) => `<li>${hint}</li>`).join("")}
        </ul>
      </section>
    </div>
  `;

  passButton.disabled = false;
  likeButton.disabled = false;
}

function renderMatches() {
  const activeProfiles =
    activeReviewTab === "liked" ? likedProfiles : passedProfiles;

  likedCount.textContent = likedProfiles.length;
  passedCount.textContent = passedProfiles.length;

  likedTab.classList.toggle("is-active", activeReviewTab === "liked");
  likedTab.setAttribute(
    "aria-selected",
    activeReviewTab === "liked" ? "true" : "false",
  );
  passedTab.classList.toggle("is-active", activeReviewTab === "passed");
  passedTab.setAttribute(
    "aria-selected",
    activeReviewTab === "passed" ? "true" : "false",
  );

  matchCount.textContent =
    activeReviewTab === "liked"
      ? `${likedProfiles.length} liked`
      : `${passedProfiles.length} passed`;

  if (activeProfiles.length === 0) {
    matchesList.innerHTML = `
      <li>
        <p class="empty-state">
          <strong>${
            activeReviewTab === "liked"
              ? "Start liking golfers"
              : "No passed golfers yet"
          }</strong>
          ${
            activeReviewTab === "liked"
              ? "Golfers you liked will appear here so you can quickly review the playing partners worth circling back to."
              : "Golfers you pass on will stay here so you can revisit them later if you change your mind."
          }
        </p>
      </li>
    `;
    return;
  }

  matchesList.innerHTML = activeProfiles
    .map(
      (profile) => `
        <li class="match-item ${
          activeReviewTab === "passed" ? "match-item-passed" : ""
        }">
          <div class="match-avatar" style="background: ${profile.photo};">${profile.name.charAt(0)}</div>
          <div class="match-copy">
            <strong>${profile.name}</strong>
            <p>${profile.handicap} · ${profile.course} · ${profile.availability}</p>
          </div>
          <button
            class="match-action-button"
            type="button"
            data-profile-name="${profile.name}"
          >
            ${
              activeReviewTab === "liked"
                ? "Move to passed"
                : "Move to liked"
            }
          </button>
        </li>
      `,
    )
    .join("");
}

function setActiveReviewTab(tab) {
  activeReviewTab = tab;
  renderMatches();
}

function moveProfile(profileName, sourceTab) {
  const sourceProfiles = sourceTab === "liked" ? likedProfiles : passedProfiles;
  const destinationProfiles =
    sourceTab === "liked" ? passedProfiles : likedProfiles;
  const profile = sourceProfiles.find(
    (item) => item.name === profileName,
  );

  if (!profile) {
    return;
  }

  if (sourceTab === "liked") {
    likedProfiles = likedProfiles.filter((item) => item.name !== profileName);
    passedProfiles = [...destinationProfiles, profile];
  } else {
    passedProfiles = passedProfiles.filter((item) => item.name !== profileName);
    likedProfiles = [...destinationProfiles, profile];
  }

  renderMatches();
}

function moveToNextProfile() {
  currentIndex += 1;
  renderProfile();
}

passButton.addEventListener("click", () => {
  const profile = profiles[currentIndex];

  if (profile) {
    passedProfiles = [...passedProfiles, profile];
    renderMatches();
  }

  moveToNextProfile();
});

likeButton.addEventListener("click", () => {
  const profile = profiles[currentIndex];

  if (profile) {
    likedProfiles = [...likedProfiles, profile];
    renderMatches();
  }

  moveToNextProfile();
});

likedTab.addEventListener("click", () => {
  setActiveReviewTab("liked");
});

passedTab.addEventListener("click", () => {
  setActiveReviewTab("passed");
});

matchesList.addEventListener("click", (event) => {
  const actionButton = event.target.closest(".match-action-button");

  if (!actionButton) {
    return;
  }

  moveProfile(actionButton.dataset.profileName, activeReviewTab);
});

renderProfile();
renderMatches();
