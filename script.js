// ИЗМЕНЯЙ ТОЛЬКО ЭТИ ДВЕ СТРОЧКИ, ЧТОБЫ ПОМЕНЯТЬ ИМЯ И ПОДПИСЬ.
const LEADER_NAME = 'Игорь';
const DEVELOPER_NAME = 'Polina.dev';

// Здесь можно изменить текст поздравления. Абзацы разделяются пустой строкой.
const GREETING = `Дорогой ${LEADER_NAME}!

Сегодня система решила приостановить все процессы, потому что обнаружила событие, которое невозможно оставить без внимания.

Ещё один год жизни! Ещё один год Божьей верности, новых уроков, опыта, решений и историй, которые только предстоит написать.

Хочется пожелать тебе прежде всего оставаться человеком, чьё сердце горит для Бога. Пусть с каждым годом познание Господа становится глубже, вера крепче, а понимание Его воли яснее.

Пусть Бог даёт мудрость для каждого решения, силы для служения, свежесть и радость в Его присутствии.

Спасибо за посвящение, труд, наставничество и вклад в жизни людей. За то, что вкладываешься в других и несёшь ответственность за то, что Бог доверил тебе.

Пусть впереди будет ещё много Божьих откровений, открытых дверей, побед и свидетельств Его верности!

С днём рождения! Божьих благословений во всём!`;

const screens = document.querySelectorAll('.screen');
let messageTimer = null;
let bootTimer = null;

function showScreen(id) {
  clearTimeout(messageTimer);
  screens.forEach(screen => screen.classList.toggle('active', screen.id === id));
  window.scrollTo({top:0,behavior:'instant'});
  if (id === 'stats') {
    document.getElementById('stats-list').classList.remove('animated');
    setTimeout(() => document.getElementById('stats-list').classList.add('animated'), 150);
  }
  if (id === 'message') {
  launchConfetti();
  typeMessage();
}
  if (id === 'final') celebrate();
}

function boot() {
  const lines = ['> INITIALIZING SYSTEM...', '> Подключение к базе данных...', '> Поиск особенного пользователя...', '> Обнаружена подозрительная активность...', '> SYSTEM READY ✓'];
  const container = document.getElementById('boot-lines');
  const progress = document.getElementById('boot-progress');
  let i = 0;
  function step() {
    if (i < lines.length) {
      const p = document.createElement('p');
      p.textContent = lines[i];
      container.append(p);
      progress.style.width = `${((i + 1) / lines.length) * 100}%`;
      i += 1;
      bootTimer = setTimeout(step, 520);
    } else {
      document.getElementById('boot-status').textContent = 'Система готова к сканированию.';
      document.getElementById('scan-start').classList.remove('hidden');
    }
  }
  step();
}

function typeMessage() {
  const target = document.getElementById('typed-message');
  const next = document.getElementById('message-next');
  next.classList.add('hidden');
  target.textContent = '';
  let i = 0;
  function type() {
    if (!document.getElementById('message').classList.contains('active')) return;
    const step = 3; // Печатаем по 3 символа, чтобы не ждать слишком долго.
    i = Math.min(GREETING.length, i + step);
    target.textContent = GREETING.slice(0, i);
    if (i < GREETING.length) messageTimer = setTimeout(type, 20);
    else next.classList.remove('hidden');
  }
  type();
}

function holidayChoice(choice) {
  const box = document.getElementById('holiday-result');
  box.classList.remove('hidden');
  if (choice === 'beach') {
    box.textContent = 'REQUEST ACCEPTED ✓\n\nБронирование отпуска...\nЗагрузка пальм...\nОтключение рабочих уведомлений...\n\nERROR!\n\nОбнаружен входящий звонок: «А можно один маленький вопрос?»\nРЕЖИМ ОТПУСКА НАРУШЕН! 😂';
  } else {
    box.textContent = 'DESTINATION SELECTED: ТЕКЕЛИ\n\nПроверка маршрута... ✓\nПроверка готовности к приключениям... ✓\n\nWARNING!\n\nСистема обнаружила подозрительную вероятность новых задач.\nЭто точно отпуск? 😂';
  }
  document.getElementById('holiday-next').classList.remove('hidden');
  box.scrollIntoView({behavior:'smooth',block:'nearest'});
}

// Небольшое праздничное конфетти без дополнительных библиотек.
function celebrate() {
  const panel = document.querySelector('#final .panel');
  for (let i=0;i<26;i++) {
    const piece = document.createElement('span');
    piece.textContent = ['✦','✧','★'][i%3];
    piece.setAttribute('aria-hidden','true');
    piece.style.cssText = `position:absolute;pointer-events:none;color:${i%2?'#f7cf82':'#77f5b4'};left:${Math.random()*95}%;top:-25px;z-index:4;font-size:${12+Math.random()*12}px;transition:transform ${2+Math.random()*2}s linear,opacity 3.5s;`;
    panel.append(piece);
    setTimeout(()=>{piece.style.transform=`translateY(${300+Math.random()*600}px) rotate(${Math.random()*720}deg)`;piece.style.opacity='0';},30);
    setTimeout(()=>piece.remove(),4200);
  }
}

document.querySelectorAll('[data-name]').forEach(el => el.textContent = LEADER_NAME);
document.querySelectorAll('[data-developer]').forEach(el => el.textContent = DEVELOPER_NAME);
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('scan-start').addEventListener('click',()=>showScreen('scan'));
document.querySelectorAll('.next').forEach(button => button.addEventListener('click',()=>showScreen(button.dataset.next)));
document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click',()=>holidayChoice(button.dataset.choice)));
document.getElementById('about-dev').addEventListener('click',()=>document.getElementById('dev-details').classList.toggle('hidden'));
document.getElementById('restart').addEventListener('click',()=>{document.getElementById('holiday-result').classList.add('hidden');document.getElementById('holiday-next').classList.add('hidden');showScreen('start');});
boot();

// ===== АНИМАЦИЯ КОНФЕТТИ =====

function launchConfetti() {
    const colors = [
        '#FFD700',
        '#FF69B4',
        '#00E5FF',
        '#7CFF6B',
        '#FFFFFF',
        '#FF914D'
    ];

    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');

        confetti.classList.add('confetti-piece');

        confetti.style.left = Math.random() * 100 + 'vw';

        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        confetti.style.animationDelay =
            Math.random() * 1.5 + 's';

        confetti.style.animationDuration =
            (3 + Math.random() * 2) + 's';

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}
