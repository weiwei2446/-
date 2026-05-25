const noodleTypes = {
  shantou: {
    name: "汕頭麵",
    traits: ["直接", "豪爽", "外冷內熱", "重朋友", "不拐彎抹角"],
    description:
      "你是汕頭麵。你給人的感覺很直接，不喜歡把事情講得太複雜。你看起來可能有點冷，但其實很重感情，也很在乎身邊的人。你適合出現在熱鬧的南部街邊小吃店，是那種越熟越有味道的人。",
    line: "不用講那麼多，來吃麵就知道。"
  },
  yanshui: {
    name: "鹽水意麵",
    traits: ["溫柔", "細膩", "念舊", "有生活感", "重視回憶"],
    description:
      "你是鹽水意麵。你是一個細膩又有溫度的人，容易注意到別人忽略的小地方。你重視回憶，也喜歡有故事感的事物。你給人的感覺不張揚，但相處久了會發現你很耐人尋味。",
    line: "真正重要的東西，要慢慢熬。"
  },
  oil: {
    name: "油麵",
    traits: ["效率高", "實際", "理性", "適應力強", "生活節奏快"],
    description:
      "你是油麵。你做事講求效率，面對問題時通常會先想辦法解決，而不是停在情緒裡。你適應力很強，能快速融入不同環境。你像市場或城市裡常見的油麵，看似平凡，但其實非常實用。",
    line: "先把事情做好，再說。"
  },
  knife: {
    name: "刀削麵",
    traits: ["有韌性", "抗壓強", "獨立", "有個性", "越挫越勇"],
    description:
      "你是刀削麵。你不是最圓滑的人，但你很有自己的形狀。你面對壓力時不容易被打倒，反而會慢慢磨出自己的力量。你給人的感覺可能有點硬派，但其實很可靠。",
    line: "撐過去，就會變得更有勁道。"
  }
};

const answerMap = ["shantou", "yanshui", "oil", "knife"];

const questions = [
  {
    text: "假日你最想怎麼過？",
    options: [
      "找朋友去吃東西、聊天",
      "去老街、咖啡廳或有故事的地方走走",
      "把事情處理完，再安排自己的時間",
      "去挑戰一個沒做過的活動"
    ]
  },
  {
    text: "朋友通常怎麼形容你？",
    options: [
      "很直接，但其實很照顧人",
      "很溫柔，想事情很細",
      "很有效率，做事很可靠",
      "很有個性，不太容易被影響"
    ]
  },
  {
    text: "遇到問題時，你通常會？",
    options: [
      "直接面對，能講清楚就講清楚",
      "先想想感受，再慢慢處理",
      "先找最快能解決的方法",
      "自己撐住，慢慢找到突破口"
    ]
  },
  {
    text: "你比較喜歡哪種地方？",
    options: [
      "熱鬧的南部街邊小吃店",
      "有歷史感的老街巷弄",
      "節奏快速的城市市場",
      "有手工感、粗獷感的小店"
    ]
  },
  {
    text: "如果要和朋友出去玩，你會？",
    options: [
      "先揪人，大家到時候再說",
      "找一個有氣氛、有回憶感的地方",
      "先確認時間、路線和預算",
      "想安排一點特別或有挑戰性的行程"
    ]
  },
  {
    text: "你比較像哪一種味道？",
    options: [
      "鹹香直接，入口很明確",
      "溫和細緻，越吃越有味道",
      "簡單實在，怎麼搭都可以",
      "厚實有嚼勁，需要慢慢咀嚼"
    ]
  },
  {
    text: "你在人群中通常是？",
    options: [
      "熟了之後很吵、很講義氣的人",
      "安靜觀察，但會默默照顧別人",
      "負責讓事情順利進行的人",
      "不一定合群，但很有存在感的人"
    ]
  },
  {
    text: "你最不能接受的是？",
    options: [
      "講話拐彎抹角",
      "沒有人在意細節和感受",
      "做事沒效率、一直拖",
      "被迫變得跟大家一樣"
    ]
  },
  {
    text: "你覺得自己最大的優點是？",
    options: ["真誠直接", "細膩體貼", "實際可靠", "堅韌獨立"]
  },
  {
    text: "如果你是一碗麵，你希望別人怎麼記住你？",
    options: [
      "一吃就知道很夠味",
      "吃完後會慢慢想起來",
      "平常但不可或缺",
      "很有口感，很難被取代"
    ]
  }
];

const screens = {
  start: document.querySelector("#start-screen"),
  quiz: document.querySelector("#quiz-screen"),
  result: document.querySelector("#result-screen")
};

const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");
const questionCard = document.querySelector("#question-card");
const questionCount = document.querySelector("#question-count");
const questionNumber = document.querySelector("#question-number");
const questionText = document.querySelector("#question-text");
const answers = document.querySelector("#answers");
const progressBar = document.querySelector("#progress-bar");
const resultTitle = document.querySelector("#result-title");
const resultTags = document.querySelector("#result-tags");
const resultDescription = document.querySelector("#result-description");
const resultLine = document.querySelector("#result-line");

let currentQuestion = 0;
let scores = {};
let isLocked = false;

function resetScores() {
  scores = Object.keys(noodleTypes).reduce((result, key) => {
    result[key] = 0;
    return result;
  }, {});
}

function switchScreen(screenName) {
  Object.values(screens).forEach((screen) => screen.classList.remove("screen-active"));
  screens[screenName].classList.add("screen-active");
}

function startQuiz() {
  currentQuestion = 0;
  isLocked = false;
  resetScores();
  switchScreen("quiz");
  renderQuestion();
}

function renderQuestion() {
  const question = questions[currentQuestion];
  const displayNumber = currentQuestion + 1;

  questionCard.classList.remove("is-changing");
  void questionCard.offsetWidth;
  questionCard.classList.add("is-changing");

  questionCount.textContent = `第 ${displayNumber} / ${questions.length} 題`;
  questionNumber.textContent = displayNumber;
  questionText.textContent = question.text;
  progressBar.style.width = `${(displayNumber / questions.length) * 100}%`;

  answers.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.type = "button";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span>${option}`;
    button.addEventListener("click", () => chooseAnswer(index));
    answers.appendChild(button);
  });
}

function chooseAnswer(optionIndex) {
  if (isLocked) return;
  isLocked = true;

  scores[answerMap[optionIndex]] += 1;

  window.setTimeout(() => {
    currentQuestion += 1;
    if (currentQuestion >= questions.length) {
      showResult();
    } else {
      renderQuestion();
      isLocked = false;
    }
  }, 220);
}

function getWinningType() {
  const highestScore = Math.max(...Object.values(scores));
  const winners = Object.keys(scores).filter((key) => scores[key] === highestScore);
  const randomIndex = Math.floor(Math.random() * winners.length);
  return winners[randomIndex];
}

function showResult() {
  const winner = noodleTypes[getWinningType()];

  resultTitle.textContent = winner.name;
  resultDescription.textContent = winner.description;
  resultLine.textContent = `「${winner.line}」`;
  resultTags.innerHTML = "";
  winner.traits.forEach((trait) => {
    const tag = document.createElement("span");
    tag.textContent = trait;
    resultTags.appendChild(tag);
  });

  switchScreen("result");
}

startBtn.addEventListener("click", startQuiz);
restartBtn.addEventListener("click", startQuiz);
