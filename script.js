// =================================
// ELEMEN DOM
// =================================
const openingScreen = document.getElementById('opening-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const showMoreBtn = document.getElementById('show-more-btn');
const questionText = document.getElementById('question-text');
const questionNumber = document.getElementById('question-number');
const answerOptions = document.getElementById('answer-options');
const progressBar = document.getElementById('progress-bar');
const otherLovesContainer = document.getElementById('other-loves');

// =================================
// DATA & STATE KUIS
// =================================
const questions = [
    { text: "Bareng pasangan tuh rasanya hangat, kayak minum cokelat panas di malam dingin.", dimension: 'intimacy', type: 'likert' },
    { text: "Kalau aku lagi down, pasangan selalu jadi charger emosiku.", dimension: 'intimacy', type: 'likert' },
    { text: "Pasangan itu kayak VIP di hidupku, nomor satu di hati.", dimension: 'intimacy', type: 'likert' },
    { text: "Hubungan kami tuh bikin aku nyaman, kayak pakai hoodie kesayangan.", dimension: 'intimacy', type: 'likert' },
    { text: "Dia ngerti aku bahkan tanpa aku ngomong banyak.", dimension: 'intimacy', type: 'likert' },
    { text: "Hubungan ini kadang bikin aku merasa kayak main film romantis.", dimension: 'passion', type: 'likert' },
    { text: "Pilih emoji yang paling pas menggambarkan gairah di hubungan kalian:", dimension: 'passion', type: 'emoji', options: ['❄️', '💧', '😊', '🔥', '💥'] },
    { text: "Nggak ada orang lain yang bisa bikin aku se-happy ini.", dimension: 'passion', type: 'likert' },
    { text: "Kadang hubungan kami terasa penuh spark, kayak ada efek kembang api.", dimension: 'passion', type: 'likert' },
    { text: "Deg-degan dan penuh passion — itulah aku kalau mikirin dia.", dimension: 'passion', type: 'likert' },
    { text: "Seberapa kuat komitmenmu? Pilih ikon yang mewakili:", dimension: 'commitment', type: 'emoji', options: ['🤔', '📝', '🤝', '🔒', '💍'] },
    { text: "Komitmenku ke pasangan kuat banget, kayak password 16 karakter.", dimension: 'commitment', type: 'likert' },
    { text: "Aku yakin banget sama cintaku ke dia, no doubt.", dimension: 'commitment', type: 'likert' },
    { text: "Buatku, hubungan ini bukan sementara — ini long-term plan.", dimension: 'commitment', type: 'likert' },
    { text: "Aku merasa punya tanggung jawab buat jaga dia, kayak guardian di game.", dimension: 'commitment', type: 'likert' }
];

const loveTypes = {
    nonlove: { title: "Nonlove", description: "Wah, kamu belum masuk ke arena cinta nih! Hubunganmu lebih ke arah kenalan biasa. Enggak ada chemistry, kedekatan, atau komitmen... tapi enggak apa-apa, siapa tahu perjalanan cintamu seperti kata penjaga pom bensin, 'mulai dari nol!'" },
    liking: { title: "Liking (Koneksi Hangat)", description: "Kamu punya koneksi hati yang hangat! Seperti perapian di tengah badai salju, hubunganmu penuh cerita, kepercayaan, dan kedekatan. Yah, meskipun begitu, masih belum ada bumbu romansa yang cukup... Hm, mungkin saja persahabatanmu bisa jadi pondasi indah untuk level selanjutnya?" },
    infatuated: { title: "Infatuated Love (Api Asmara)", description: "Wow, api asmara berkobar cukup besar di sini! Ada rasa kagum, ketertarikan, dan deg-degan tiap kali bersama. Tapi hati-hati ya, karena kalau tidak dibarengi kedekatan hati atau komitmen, cinta ini bisa cepat redup seperti kembang api." },
    empty: { title: "Empty Love (Kontrak Jangka Panjang)", description: "Hubunganmu sudah seperti kontrak jangka panjang. Ada keputusan untuk tetap bersama, tapi tidak ada kehangatan atau gairah. Kadang stabil, kadang terasa hambar. Jadi... apakah mau kamu biarkan flat atau kamu tambah bumbu lagi?" },
    romantic: { title: "Romantic Love (Manisnya Romansa)", description: "Wah, manisnya! Sama seperti musim semi, pasti cintamu sedang dalam fase berbunga-bunga ya? Meskipun belum ada komitmen, tapi sudah ada kedekatan hati sekaligus ketertarikan romantis yang bikin hubungan serasa drama korea." },
    companionate: { title: "Companionate Love (Nyaman Berdua)", description: "Cinta yang ini senyaman semangkuk bakso panas ditengah hujan deras. Ada rasa aman dan nyaman karena sudah berkomitmen untuk saling menemani. Hatimu akan tetap tenang karena kamu tahu ada seseorang yang selalu setia di sisimu." },
    fatuous: { title: "Fatuous Love (Roller Coaster Cinta)", description: "Cinta yang ini ibarat naik roller coaster tanpa sabuk, sangat seru karena adanya gairah yang intens ditambah komitmen kilat dan menantang karena enggak ada kedekatan." },
    consummate: { title: "Consummate Love (Tahta Tertinggi Cinta)", description: "Selamat! Kamu sudah membuka Tahta Tertinggi Cinta. Ada kedekatan hati, gairah yang membara, dan komitmen yang solid, benar-benar kombinasi lengkap yang jadi level cinta paling ideal. Pertahankan terus, ya!" }
};

let currentQuestionIndex = 0;
let scores = { intimacy: 0, passion: 0, commitment: 0 };

// =================================
// FUNGSI-FUNGSI UTAMA
// =================================

function startQuiz() {
    currentQuestionIndex = 0;
    scores = { intimacy: 0, passion: 0, commitment: 0 };
    openingScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    showQuestion();
}

function showQuestion() {
    answerOptions.innerHTML = '';
    const progressPercentage = (currentQuestionIndex / questions.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;
    questionNumber.textContent = `Pertanyaan ${currentQuestionIndex + 1} dari ${questions.length}`;
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.text;

    if (currentQuestion.type === 'emoji') {
        currentQuestion.options.forEach((emoji, index) => {
            const button = document.createElement('button');
            button.innerText = emoji;
            button.classList.add('emoji-btn');
            button.addEventListener('click', () => selectAnswer(index + 1, currentQuestion.dimension));
            answerOptions.appendChild(button);
        });
    } else {
        for (let i = 1; i <= 5; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => selectAnswer(i, currentQuestion.dimension));
            answerOptions.appendChild(button);
        }
    }
}

function selectAnswer(value, dimension) {
    scores[dimension] += value;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        setTimeout(showResult, 300);
    }
}

function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    const maxScorePerDimension = 25;
    const intimacyPercentage = Math.round((scores.intimacy / maxScorePerDimension) * 100);
    const passionPercentage = Math.round((scores.passion / maxScorePerDimension) * 100);
    const commitmentPercentage = Math.round((scores.commitment / maxScorePerDimension) * 100);

    document.getElementById('intimacy-bar').style.setProperty('--p', intimacyPercentage);
    document.getElementById('intimacy-percent').textContent = `${intimacyPercentage}%`;
    document.getElementById('passion-bar').style.setProperty('--p', passionPercentage);
    document.getElementById('passion-percent').textContent = `${passionPercentage}%`;
    document.getElementById('commitment-bar').style.setProperty('--p', commitmentPercentage);
    document.getElementById('commitment-percent').textContent = `${commitmentPercentage}%`;

    const threshold = 40;
    const hasIntimacy = intimacyPercentage > threshold;
    const hasPassion = passionPercentage > threshold;
    const hasCommitment = commitmentPercentage > threshold;

    let loveTypeName = 'nonlove';
    if (hasIntimacy && !hasPassion && !hasCommitment) loveTypeName = 'liking';
    else if (!hasIntimacy && hasPassion && !hasCommitment) loveTypeName = 'infatuated';
    else if (!hasIntimacy && !hasPassion && hasCommitment) loveTypeName = 'empty';
    else if (hasIntimacy && hasPassion && !hasCommitment) loveTypeName = 'romantic';
    else if (hasIntimacy && !hasPassion && hasCommitment) loveTypeName = 'companionate';
    else if (!hasIntimacy && hasPassion && hasCommitment) loveTypeName = 'fatuous';
    else if (hasIntimacy && hasPassion && hasCommitment) loveTypeName = 'consummate';

    const resultType = loveTypes[loveTypeName];
    document.getElementById('love-type-title').textContent = resultType.title;
    document.getElementById('love-type-description').textContent = resultType.description;

    otherLovesContainer.classList.add('hidden');
    showMoreBtn.textContent = 'Lihat Tipe Cinta Lainnya';
}

function toggleOtherLoves() {
    otherLovesContainer.classList.toggle('hidden');
    if (otherLovesContainer.classList.contains('hidden')) {
        showMoreBtn.textContent = 'Lihat Tipe Cinta Lainnya';
    } else {
        showMoreBtn.textContent = 'Sembunyikan';
        if (otherLovesContainer.innerHTML.includes('h4')) return;
        
        otherLovesContainer.innerHTML = '<h4>8 Tipe Cinta Menurut Sternberg</h4>';
        for (const type in loveTypes) {
            const p = document.createElement('p');
            p.innerHTML = `<b>${loveTypes[type].title}:</b> ${loveTypes[type].description}`;
            otherLovesContainer.appendChild(p);
        }
    }
}

// =================================
// EVENT LISTENERS
// =================================
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);
showMoreBtn.addEventListener('click', toggleOtherLoves);