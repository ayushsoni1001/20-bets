/* 20 Bets — Punchcard Life Game
   All outcomes and weights are intentionally hardcoded for a playful vibe. */

// Elements
const $ = (sel) => document.querySelector(sel);
const intro = $('#intro');
const game = $('#game');
const results = $('#results');

const startBtn = $('#startBtn');
const surpriseBtn = $('#surpriseBtn');
const progressLabel = $('#progressLabel');
const progressBar = $('#progressBar');
const punchCount = $('#punchCount');
const slots = $('#slots');

const betEmoji = $('#betEmoji');
const betTitle = $('#betTitle');
const betSubtitle = $('#betSubtitle');
const options = $('#options');
const backBtn = $('#backBtn');
const nextBtn = $('#nextBtn');

const archetypeEmoji = $('#archetypeEmoji');
const archetypeTitle = $('#archetypeTitle');
const archetypeBlurb = $('#archetypeBlurb');
const scoreBars = $('#scoreBars');
const highlights = $('#highlights');
const flags = $('#flags');
const replayBtn = $('#replayBtn');
const shareBtn = $('#shareBtn');
const copyBtn = $('#copyBtn');
const confettiLayer = $('#confetti');

// Questions bank (exactly 20)
const BETS = [
  {
    id: 'values',
    emoji: '🧭',
    title: 'Core values',
    subtitle: 'What do you stand on?',
    options: [
      { id: 'integrity', label: 'Integrity', desc: 'Do the right thing.', weights: { wisdom: 2, trust: 3 } },
      { id: 'curiosity', label: 'Curiosity', desc: 'Keep learning.', weights: { creativity: 2, wisdom: 1 } },
      { id: 'drive', label: 'Ambition', desc: 'Aim big, stay steady.', weights: { wealth: 1, grit: 2 } },
      { id: 'service', label: 'Service', desc: 'Help first.', weights: { trust: 3, joy: 1 } },
    ],
  },
  {
    id: 'learn',
    emoji: '📚',
    title: 'Learning style',
    subtitle: 'How do you get better?',
    options: [
      { id: 'system', label: 'Simple systems', desc: 'Small, daily reps.', weights: { wisdom: 3, grit: 1 } },
      { id: 'projects', label: 'Projects', desc: 'Build to learn.', weights: { creativity: 2, wealth: 1 } },
      { id: 'people', label: 'Mentors', desc: 'Guidance + feedback.', weights: { trust: 1, wisdom: 2 } },
      { id: 'teach', label: 'Teach it', desc: 'Explain to retain.', weights: { trust: 2, wisdom: 1 } },
    ],
  },
  {
    id: 'partner',
    emoji: '💞',
    title: 'Life partner',
    subtitle: 'What do you optimize for?',
    options: [
      { id: 'growth', label: 'Growth together', desc: 'Push each other.', weights: { joy: 2, wisdom: 1 } },
      { id: 'kind', label: 'Kind stability', desc: 'Safe and steady.', weights: { joy: 2, trust: 1 } },
      { id: 'solo', label: 'Solo by choice', desc: 'Freedom focus.', weights: { wealth: 1, creativity: 1, joy: -1 } },
      { id: 'adventure', label: 'Adventure partners', desc: 'Explore + build.', weights: { creativity: 1, joy: 2 } },
    ],
  },
  {
    id: 'circle',
    emoji: '👥',
    title: 'Inner circle',
    subtitle: 'Who’s around you?',
    options: [
      { id: 'doers', label: 'Doers', desc: 'Action first.', weights: { wealth: 1, grit: 1 } },
      { id: 'readers', label: 'Thinkers', desc: 'Reflect first.', weights: { wisdom: 2 } },
      { id: 'artists', label: 'Artists', desc: 'Wonder first.', weights: { creativity: 2 } },
      { id: 'family', label: 'Family anchor', desc: 'Roots matter.', weights: { trust: 2, joy: 1 } },
    ],
  },
  {
    id: 'craft',
    emoji: '🔧',
    title: 'Deep craft',
    subtitle: 'What will you master first?',
    options: [
      { id: 'code', label: 'Coding', desc: 'Automate leverage.', weights: { wealth: 2, creativity: 1 } },
      { id: 'words', label: 'Writing', desc: 'Clarity compounds.', weights: { wisdom: 1, creativity: 2 } },
      { id: 'design', label: 'Design', desc: 'Taste matters.', weights: { creativity: 2, joy: 1 } },
      { id: 'sales', label: 'Sales & story', desc: 'Make it spread.', weights: { wealth: 1, trust: 2 } },
    ],
  },
  {
    id: 'pivot',
    emoji: '🔁',
    title: 'Pivot muscle',
    subtitle: 'When do you switch?',
    options: [
      { id: 'early', label: 'Early', desc: 'Find fit fast.', weights: { creativity: 1, wealth: 1 } },
      { id: 'patient', label: 'Patient', desc: 'Stay, compound.', weights: { wisdom: 1, wealth: 1 } },
      { id: 'contrarian', label: 'Contrarian', desc: 'Move when others don’t.', weights: { grit: 1, wealth: 1 } },
      { id: 'review', label: 'Quarterly review', desc: 'Data-driven turns.', weights: { wisdom: 2 } },
    ],
  },
  {
    id: 'arena',
    emoji: '🎮',
    title: 'Career game',
    subtitle: 'Where do you play?',
    options: [
      { id: 'startup', label: 'Startup', desc: 'High risk, big upside.', weights: { wealth: 2, grit: 2 } },
      { id: 'creator', label: 'Creator', desc: 'Audience leverage.', weights: { creativity: 2, wealth: 1 } },
      { id: 'career', label: 'Career compounding', desc: 'Climb with intent.', weights: { trust: 1, wealth: 1 } },
      { id: 'smallbiz', label: 'Small business', desc: 'Quiet cashflow.', weights: { wealth: 2, trust: 1 } },
    ],
  },
  {
    id: 'timing',
    emoji: '⏱️',
    title: 'When to start',
    subtitle: 'Now or later?',
    options: [
      { id: 'now', label: 'Start now', desc: 'Ship before ready.', weights: { grit: 1, wealth: 1 } },
      { id: 'prep', label: 'Prep then leap', desc: 'Sharpen first.', weights: { wisdom: 1, trust: 1 } },
      { id: 'join', label: 'Join a rocket', desc: 'Learn fast.', weights: { wealth: 1, wisdom: 1 } },
      { id: 'apprentice', label: 'Apprenticeship', desc: 'Learn under a master.', weights: { trust: 1, wisdom: 1 } },
    ],
  },
  {
    id: 'sayno',
    emoji: '🚪',
    title: 'Say no to “safe”?',
    subtitle: 'Comfort vs fit.',
    options: [
      { id: 'no', label: 'Say no', desc: 'Protect alignment.', weights: { joy: 1, grit: 1 } },
      { id: 'yes', label: 'Take it', desc: 'Buy optionality.', weights: { trust: 1, joy: -1 } },
      { id: 'side', label: 'Test on side', desc: 'Probe before jump.', weights: { wisdom: 1 } },
      { id: 'mini', label: 'Mini sabbatical', desc: 'Short, clear reset.', weights: { joy: 1, wisdom: 1 } },
    ],
  },
  {
    id: 'vehicle',
    emoji: '💸',
    title: 'Wealth vehicle',
    subtitle: 'Your main engine.',
    options: [
      { id: 'index', label: 'Index funds', desc: 'Simple + steady.', weights: { wealth: 2, wisdom: 1 } },
      { id: 'business', label: 'Own a business', desc: 'Equity magic.', weights: { wealth: 3, grit: 1 } },
      { id: 'royalty', label: 'Royalties/IP', desc: 'Create once, earn long.', weights: { creativity: 1, wealth: 2 } },
      { id: 'realestate', label: 'Real estate', desc: 'Boring compounding.', weights: { wealth: 2, wisdom: 1 } },
    ],
  },
  {
    id: 'spend',
    emoji: '🧾',
    title: 'Spending style',
    subtitle: 'How you use money.',
    options: [
      { id: 'frugal', label: 'Frugal freedom', desc: 'Buy time.', weights: { joy: 1, wealth: 1 } },
      { id: 'roi', label: 'ROI mindset', desc: 'Spend to compound.', weights: { wisdom: 1, wealth: 1 } },
      { id: 'xp', label: 'Experiences', desc: 'Stories > stuff.', weights: { joy: 2 } },
      { id: 'give', label: 'Give % away', desc: 'Values > vanity.', weights: { trust: 2 } },
    ],
  },
  {
    id: 'conviction',
    emoji: '🎯',
    title: 'Big bet',
    subtitle: 'Where’s your chip?',
    options: [
      { id: 'time', label: 'Time in mission', desc: 'Decade game.', weights: { grit: 2, wisdom: 1 } },
      { id: 'capital', label: 'Capital at work', desc: 'Skin in game.', weights: { wealth: 2 } },
      { id: 'skill', label: 'Skill compounding', desc: 'Sharpen craft.', weights: { creativity: 1, wisdom: 1 } },
      { id: 'audience', label: 'Audience', desc: 'Distribution is leverage.', weights: { trust: 1, creativity: 1 } },
    ],
  },
  {
    id: 'where',
    emoji: '📍',
    title: 'Home base',
    subtitle: 'Where to live.',
    options: [
      { id: 'hub', label: 'Big hub', desc: 'Talent density.', weights: { wealth: 1, creativity: 1 } },
      { id: 'calm', label: 'Calm place', desc: 'Think clearly.', weights: { joy: 2, wisdom: 1 } },
      { id: 'mix', label: 'Mix of places', desc: 'Seasonal switch.', weights: { joy: 1, wealth: 1 } },
      { id: 'nearfam', label: 'Near family', desc: 'Support network.', weights: { trust: 2 } },
    ],
  },
  {
    id: 'staygo',
    emoji: '🧭',
    title: 'Stay or go',
    subtitle: 'Double down or move on?',
    options: [
      { id: 'stay', label: 'Stay, compound', desc: 'Let roots grow.', weights: { wisdom: 1, trust: 1 } },
      { id: 'leave', label: 'Leave smartly', desc: 'Cut losses.', weights: { grit: 1 } },
      { id: 'reset', label: 'Short reset', desc: 'Fresh eyes.', weights: { joy: 1, creativity: 1 } },
      { id: 'double', label: 'Double down', desc: 'Push through dip.', weights: { grit: 2 } },
    ],
  },
  {
    id: 'health',
    emoji: '💪',
    title: 'Health base',
    subtitle: 'What’s non‑negotiable?',
    options: [
      { id: 'sleep', label: 'Sleep + steps', desc: 'Boring superpower.', weights: { joy: 1, grit: 1 } },
      { id: 'sport', label: 'Sport habit', desc: 'Play + compete.', weights: { joy: 2 } },
      { id: 'measure', label: 'Measure basics', desc: 'Simple tracking.', weights: { wisdom: 1 } },
      { id: 'food', label: 'Food quality', desc: 'Eat like an athlete.', weights: { wisdom: 1, joy: 1 } },
    ],
  },
  {
    id: 'quit',
    emoji: '🧨',
    title: 'Drop a drag',
    subtitle: 'What do you cut?',
    options: [
      { id: 'scroll', label: 'Scrolling', desc: 'Reclaim focus.', weights: { creativity: 1, joy: 1 } },
      { id: 'vice', label: 'A vice', desc: 'Hard but worth it.', weights: { grit: 2 } },
      { id: 'toxic', label: 'Toxic people', desc: 'Upgrade inputs.', weights: { trust: 1, wisdom: 1 } },
      { id: 'late', label: 'Late nights', desc: 'Protect mornings.', weights: { grit: 1, joy: 1 } },
    ],
  },
  {
    id: 'metrics',
    emoji: '📏',
    title: 'Success =',
    subtitle: 'What does “good” mean?',
    options: [
      { id: 'freedom', label: 'Freedom of time', desc: 'Own your day.', weights: { joy: 1, wealth: 1 } },
      { id: 'impact', label: 'Impact', desc: 'Help at scale.', weights: { trust: 1, wisdom: 1 } },
      { id: 'mastery', label: 'Mastery', desc: 'Love the work.', weights: { creativity: 1, grit: 1 } },
      { id: 'presence', label: 'Presence', desc: 'Enjoy the ride.', weights: { joy: 2 } },
    ],
  },
  {
    id: 'create',
    emoji: '🛠️',
    title: 'Create vs consume',
    subtitle: 'Your tilt.',
    options: [
      { id: 'create', label: 'Create often', desc: 'Publish + share.', weights: { creativity: 2, trust: 1 } },
      { id: 'balance', label: 'Balanced', desc: 'Good inputs.', weights: { wisdom: 1 } },
      { id: 'consume', label: 'Mostly consume', desc: 'Comfort mode.', weights: { joy: -1 } },
      { id: 'curate', label: 'Curate + remix', desc: 'Bridge ideas.', weights: { wisdom: 1, creativity: 1 } },
    ],
  },
  {
    id: 'failure',
    emoji: '🧩',
    title: 'When it fails…',
    subtitle: 'What’s your move?',
    options: [
      { id: 'learn', label: 'Learn fast', desc: 'Iterate.', weights: { grit: 2, wisdom: 1 } },
      { id: 'rest', label: 'Rest + reset', desc: 'Recover.', weights: { joy: 1 } },
      { id: 'double', label: 'Smart double down', desc: 'Adapt.', weights: { grit: 1, wealth: 1 } },
      { id: 'ask', label: 'Ask for help', desc: 'Borrow perspective.', weights: { trust: 2 } },
    ],
  },
  {
    id: 'giving',
    emoji: '🎁',
    title: 'Give back',
    subtitle: 'How will you give?',
    options: [
      { id: 'time', label: 'Time', desc: 'Mentor, teach.', weights: { trust: 2 } },
      { id: 'money', label: 'Money', desc: 'Back others.', weights: { wealth: -1, trust: 2 } },
      { id: 'open', label: 'Open ideas/tools', desc: 'Share leverage.', weights: { creativity: 1, trust: 1 } },
      { id: 'community', label: 'Build community', desc: 'Create a space.', weights: { trust: 2, joy: 1 } },
    ],
  },
];

// Derived meta
const TRAITS = ['wealth', 'creativity', 'wisdom', 'grit', 'joy', 'trust'];

let state = {
  index: 0,
  answers: Array(BETS.length).fill(null),
  scores: Object.fromEntries(TRAITS.map((t) => [t, 0])),
};

function resetState() {
  state = {
    index: 0,
    answers: Array(BETS.length).fill(null),
    scores: Object.fromEntries(TRAITS.map((t) => [t, 0])),
  };
}

// UI builders
function buildSlots() {}
function updateSlots() {}

function renderProgress() {
  const current = state.index + 1;
  progressLabel.textContent = `Bet ${current} / ${BETS.length}`;
  const answered = state.answers.filter(Boolean).length;
  punchCount.textContent = answered.toString();
  const percent = Math.round((answered / BETS.length) * 100);
  progressBar.style.width = `${percent}%`;
}

function renderQuestion() {
  const q = BETS[state.index];
  betEmoji.textContent = q.emoji;
  betTitle.textContent = q.title;
  betSubtitle.textContent = q.subtitle;
  options.innerHTML = '';

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    const selected = state.answers[state.index]?.id === opt.id;
    btn.className = [
      'group w-full text-left rounded-xl border px-4 py-3 bg-white/5 border-white/10 hover:bg-white/10 transition',
      selected ? 'ring-2 ring-indigo-500/60 bg-indigo-500/10' : '',
      'animate-fadeInUp',
    ].join(' ');
    btn.style.animationDelay = `${idx * 60}ms`;
    btn.innerHTML = `
      <div class="flex items-center justify-between">
        <div>
          <div class="font-semibold">${opt.label}</div>
          <div class="text-sm text-slate-300">${opt.desc}</div>
        </div>
        <div class="opacity-0 group-hover:opacity-100 transition text-xl">👉</div>
      </div>`;
    btn.addEventListener('click', () => {
      state.answers[state.index] = opt;
      updateSlots();
      goNext();
    });
    options.appendChild(btn);
  });

  backBtn.disabled = state.index === 0;
  nextBtn.disabled = !state.answers[state.index];
  renderProgress();
}

function tapPunch(i) {
  // Selection animation removed per request; keep function no-op for safety
}

function computeScores() {
  const totals = Object.fromEntries(TRAITS.map((t) => [t, 0]));
  state.answers.forEach((opt) => {
    if (!opt) return;
    Object.entries(opt.weights).forEach(([k, v]) => {
      totals[k] += v;
    });
  });
  // Add slight diversification bonus: if user shows a clear theme, amplify it; if spread thin, nudge top traits
  const ordered = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const [t1, v1] = ordered[0];
  const [t2, v2] = ordered[1];
  if (v1 - v2 >= 3) {
    totals[t1] += 1; // reward clear signal
  } else if (v1 - v2 <= 1) {
    totals[t1] += 1; // gentle tie-breaker
  }
  state.scores = totals;
}

function classifyArchetype(scores) {
  const ordered = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [top1, top1Val] = ordered[0];
  const [top2, top2Val] = ordered[1];
  const diff = top1Val - top2Val;
  const minVal = ordered[ordered.length - 1][1];
  const maxVal = top1Val;

  // If everything is very even, call it balanced (tightened)
  if (maxVal - minVal <= 1) {
    return {
      emoji: '🔮',
      title: 'The Balanced Navigator',
      blurb: 'Your bets are diversified. You’ll chart a resilient path, adjusting course with measured curiosity and care.',
      highlights: ['Adaptive', 'Resilient', 'Holistic compass'],
      flags: ['Avoid spreading too thin', 'Define a spiky edge'],
    };
  }

  // Single-trait dominance
  if (diff >= 2) {
    const singleMap = {
      wealth: {
        emoji: '💼',
        title: 'The Allocator',
        blurb: 'You think in expected value and optionality. You’ll likely excel at owning assets and compounding capital.',
        highlights: ['Owner mindset', 'Strong prioritization', 'Long-term focus'],
        flags: ['Beware over-optimization', 'Remember joy and craft'],
      },
      creativity: {
        emoji: '🎨',
        title: 'The Original',
        blurb: 'You generate novel ideas and taste. Expect to create memorable products, stories, or experiences.',
        highlights: ['Taste', 'Idea generation', 'Storytelling'],
        flags: ['Ship rhythm matters', 'Focus your efforts'],
      },
      wisdom: {
        emoji: '🧠',
        title: 'The Strategist',
        blurb: 'You model the world cleanly. You avoid unforced errors and make calm, compounding decisions.',
        highlights: ['Clear thinking', 'Great judgment', 'Calm execution'],
        flags: ['Avoid analysis paralysis', 'Bias to action helps'],
      },
      grit: {
        emoji: '🏋️‍♀️',
        title: 'The Relentless Doer',
        blurb: 'You keep showing up. That consistency will outlast luck and deliver big arcs over time.',
        highlights: ['Consistency', 'High follow-through', 'Momentum builder'],
        flags: ['Rest protects the engine', 'Choose the right hill'],
      },
      joy: {
        emoji: '🌞',
        title: 'The Joyful Optimizer',
        blurb: 'You prioritize energy, play, and sustainability. People want to work with you again.',
        highlights: ['Positive-sum vibe', 'Sustainable pace', 'Experience design'],
        flags: ['Guard against comfort creep', 'Pair with focus'],
      },
      trust: {
        emoji: '🤝',
        title: 'The Trust Builder',
        blurb: 'You compound through people. Expect strong networks, mentorship, and collaborative wins.',
        highlights: ['High-signal network', 'Reputation capital', 'Great collaborator'],
        flags: ['Overcommit risk', 'Protect boundaries'],
      },
    };
    return singleMap[top1];
  }

  // Two-trait blends
  const key = `${top1}+${top2}`;
  const pairMap = {
    'wealth+grit': {
      emoji: '🚀',
      title: 'The Compounder Founder',
      blurb: 'Ownership plus execution. You’ll likely build or back enduring businesses with practical momentum.',
      highlights: ['Equity mindset', 'Bias to action', 'Systems over hacks'],
      flags: ['Guard against burnout', 'Beware sunk-cost fallacy'],
    },
    'grit+wealth': null,
    'creativity+wisdom': {
      emoji: '🧩',
      title: 'The Thoughtful Maker',
      blurb: 'Taste plus models. You’ll create resonant work that lasts and teaches.',
      highlights: ['Strong taste', 'Deep curiosity', 'Clarity of thought'],
      flags: ['Perfectionism risk', 'Ship cadence'],
    },
    'wisdom+creativity': null,
    'trust+wisdom': {
      emoji: '🛡️',
      title: 'The Community Strategist',
      blurb: 'You compound via people and insight. Expect to lead, mentor, and orchestrate networks.',
      highlights: ['Mentorship energy', 'Good judgment', 'Social capital'],
      flags: ['Say “no” more', 'Avoid politics drag'],
    },
    'wisdom+trust': null,
    'joy+creativity': {
      emoji: '🌈',
      title: 'The Delight Architect',
      blurb: 'You design for wonder. Expect to craft experiences people love to share.',
      highlights: ['Experience design', 'Playful rigor', 'Storytelling'],
      flags: ['Mind distribution', 'Resource runway'],
    },
    'creativity+joy': null,
    'wealth+wisdom': {
      emoji: '📈',
      title: 'The Rational Investor',
      blurb: 'Calm, patient, and probability-weighted. You excel at allocation and avoiding unforced errors.',
      highlights: ['Process over outcomes', 'Risk-adjusted thinking', 'Long horizon'],
      flags: ['Analysis paralysis risk', 'Invite serendipity'],
    },
    'wisdom+wealth': null,
    'creativity+grit': {
      emoji: '🛠️',
      title: 'The Indie Builder',
      blurb: 'You ship. Expect a portfolio of small bets, some of which break out.',
      highlights: ['Maker energy', 'Iterative shipping', 'Taste meets hustle'],
      flags: ['Avoid scattered focus', 'Mind marketing'],
    },
    'grit+creativity': null,
    'trust+wealth': {
      emoji: '🏗️',
      title: 'The Trusted Operator',
      blurb: 'People rely on you to run important things. You make teams and assets compound.',
      highlights: ['Reliability', 'Team builder', 'Operational clarity'],
      flags: ['Underplay creativity', 'Guard against comfort'],
    },
    'wealth+trust': null,
    'joy+wisdom': {
      emoji: '🧘‍♂️',
      title: 'The Calm Coach',
      blurb: 'You choose sustainable paths and help others do the same. Expect durable progress.',
      highlights: ['Sustainable pace', 'Good frameworks', 'Empathy'],
      flags: ['Push when needed', 'Avoid over-coaching'],
    },
    'wisdom+joy': null,
    'trust+creativity': {
      emoji: '🔗',
      title: 'The Connector-Creator',
      blurb: 'You merge people and ideas. Expect collaborations that travel far.',
      highlights: ['Community energy', 'Story-led reach', 'Partnerships'],
      flags: ['Boundary management', 'Finish cycles'],
    },
    'creativity+trust': null,
    'grit+joy': {
      emoji: '🏃‍♂️',
      title: 'The Playful Grinder',
      blurb: 'You work hard without losing the joy. That combo makes momentum stick.',
      highlights: ['Consistency', 'Energy bringer', 'Resilience'],
      flags: ['Rest matters', 'Pick worthy goals'],
    },
    'joy+grit': null,
  };

  const found = pairMap[key] || pairMap[`${top2}+${top1}`];
  if (found) return found;

  // Fallback balanced
  return {
    emoji: '🔮',
    title: 'The Balanced Navigator',
    blurb: 'Your bets are diversified. You’ll chart a resilient path, adjusting course with measured curiosity and care.',
    highlights: ['Adaptive', 'Resilient', 'Holistic compass'],
    flags: ['Avoid spreading too thin', 'Define a spiky edge'],
  };
}

function renderBars(scores) {
  scoreBars.innerHTML = '';
  TRAITS.forEach((t) => {
    const val = Math.max(0, scores[t]);
    const pct = Math.min(100, Math.round((val / 10) * 100));
    const wrap = document.createElement('div');
    wrap.innerHTML = `
      <div class="flex items-center justify-between text-sm mb-1">
        <span class="capitalize">${t}</span>
        <span class="text-slate-400">${val}</span>
      </div>
      <div class="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div class="h-full w-0 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500"></div>
      </div>
    `;
    // Select the gradient fill inside the progress track (second block)
    const bar = wrap.querySelector('.h-2 > div');
    scoreBars.appendChild(wrap);
    requestAnimationFrame(() => {
      bar.style.transition = 'width 700ms cubic-bezier(.22,1,.36,1)';
      bar.style.width = pct + '%';
    });
  });
}

function renderList(list, el) {
  el.innerHTML = '';
  list.forEach((item, i) => {
    const li = document.createElement('li');
    li.textContent = item;
    li.className = 'animate-fadeInUp';
    li.style.animationDelay = `${i * 60}ms`;
    el.appendChild(li);
  });
}

function showResults() {
  computeScores();
  const arc = classifyArchetype(state.scores);
  archetypeEmoji.textContent = arc.emoji;
  archetypeTitle.textContent = arc.title;
  archetypeBlurb.textContent = arc.blurb;
  renderBars(state.scores);
  renderList(arc.highlights, highlights);
  renderList(arc.flags, flags);
  intro.classList.add('hidden');
  game.classList.add('hidden');
  results.classList.remove('hidden');
  blastConfetti();
}

function blastConfetti() {
  confettiLayer.innerHTML = '';
  const EMOJIS = ['🎉', '✨', '🎊', '🌟', '💫'];
  const count = 40;
  for (let i = 0; i < count; i++) {
    const span = document.createElement('span');
    span.textContent = EMOJIS[i % EMOJIS.length];
    span.className = 'absolute animate-confetti text-xl select-none';
    span.style.left = Math.random() * 100 + 'vw';
    span.style.top = -Math.random() * 20 + 'vh';
    span.style.animationDelay = Math.random() * 0.6 + 's';
    confettiLayer.appendChild(span);
  }
  setTimeout(() => (confettiLayer.innerHTML = ''), 2200);
}

// Navigation
function goNext() {
  if (!state.answers[state.index]) return;
  if (state.index < BETS.length - 1) {
    state.index += 1;
    renderQuestion();
  } else {
    showResults();
  }
}

function goBack() {
  if (state.index === 0) return;
  state.index -= 1;
  renderQuestion();
}

function startGame(shuffle = false) {
  resetState();
  buildSlots();
  if (shuffle) {
    // randomly preselect 2-3 to create a fun surprise start
    for (let i = 0; i < 3; i++) {
      const qi = Math.floor(Math.random() * BETS.length);
      const opt = BETS[qi].options[Math.floor(Math.random() * BETS[qi].options.length)];
      state.answers[qi] = opt;
    }
  }
  intro.classList.add('hidden');
  results.classList.add('hidden');
  game.classList.remove('hidden');
  renderQuestion();
}

function summarize() {
  const choices = state.answers.map((opt, i) => `#${i + 1} ${BETS[i].title}: ${opt ? opt.label : '—'}`).join('\n');
  const lines = [
    `20 Bets — ${archetypeTitle.textContent} ${archetypeEmoji.textContent}`,
    '',
    choices,
    '',
    `Scores: ${TRAITS.map((t) => `${t}:${state.scores[t]}`).join(' | ')}`,
  ];
  return lines.join('\n');
}

// Wire events
startBtn?.addEventListener('click', () => startGame(false));
surpriseBtn?.addEventListener('click', () => startGame(true));
nextBtn?.addEventListener('click', goNext);
backBtn?.addEventListener('click', goBack);
replayBtn?.addEventListener('click', () => {
  startGame(false);
});

shareBtn?.addEventListener('click', async () => {
  const link = 'http://20bets.ayushsoni.com/';
  const text = `I played 20 Bets and got: ${archetypeTitle.textContent} ${archetypeEmoji.textContent}. Try it: ${link}`;
  try {
    if (navigator.share) {
      await navigator.share({ title: '20 Bets — My result', text, url: link });
    } else {
      await navigator.clipboard.writeText(text);
      shareBtn.textContent = 'Copied to clipboard ✅';
      setTimeout(() => (shareBtn.textContent = 'Share 📣'), 1400);
    }
  } catch (_) {}
});

copyBtn?.addEventListener('click', async () => {
  const text = summarize();
  try {
    await navigator.clipboard.writeText(text);
    copyBtn.textContent = 'Copied ✅';
    setTimeout(() => (copyBtn.textContent = 'Copy summary 📋'), 1400);
  } catch (_) {}
});

// Auto-start if hash present
window.addEventListener('load', () => {
  // build empty slots for first render of game hidden state
  buildSlots();
  if (location.hash === '#play') startGame(false);
});


