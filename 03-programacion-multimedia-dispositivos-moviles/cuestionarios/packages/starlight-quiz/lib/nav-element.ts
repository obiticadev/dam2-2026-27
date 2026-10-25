import {
  CHANGE_EVENT,
  FLAGS_KEY_PREFIX,
  ORDER_KEY_PREFIX,
  QUIZ_ELEMENT,
  QUIZ_NAV_ELEMENT,
  QUIZ_RESULTS_ELEMENT,
  RESET_ALL_EVENT,
  TIMER_KEY_PREFIX,
} from './constants';
import { isComplete } from './score';
import { shuffle } from './shuffle';
import { getTracker } from './tracker';
import { setTextAll } from './widget-dom';

/** Hash used to address the results "page" (quizzes use their own id). */
const RESULTS_HASH = 'resultados';

/** How often (in timer ticks of one second) the stopwatch is persisted. */
const TIMER_SAVE_EVERY = 5;

type CellState = 'none' | 'correct' | 'wrong';

interface NavLabels {
  heading: string;
  previous: string;
  next: string;
  flag: string;
  unflag: string;
  finish: string;
  back: string;
  question: string;
  results: string;
  correct: string;
  wrong: string;
  flagged: string;
  confirmReset: string;
}

interface PagerOptions {
  labels: NavLabels;
  shuffleQuestions: boolean;
}

function readLabels(host: HTMLElement): NavLabels {
  const data = host.dataset;
  return {
    heading: data['labelHeading'] || 'Questions',
    previous: data['labelPrevious'] || 'Previous',
    next: data['labelNext'] || 'Next',
    flag: data['labelFlag'] || 'Flag',
    unflag: data['labelUnflag'] || 'Unflag',
    finish: data['labelFinish'] || 'See results',
    back: data['labelBack'] || 'Back to questions',
    question: data['labelQuestion'] || 'Question {n}',
    results: data['labelResults'] || 'Results',
    correct: data['labelCorrect'] || 'Correct',
    wrong: data['labelWrong'] || 'Wrong',
    flagged: data['labelFlagged'] || 'Flagged',
    confirmReset: data['confirmLabel'] || '',
  };
}

/** `localStorage`, or `null` where it is unavailable (private mode, blocked). */
function safeStorage(): Storage | null {
  try {
    const probe = '__starlight_quiz_probe__';
    localStorage.setItem(probe, '1');
    localStorage.removeItem(probe);
    return localStorage;
  } catch {
    return null;
  }
}

function readJson(storage: Storage | null, key: string): unknown {
  try {
    const raw = storage?.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJson(storage: Storage | null, key: string, value: unknown): void {
  try {
    storage?.setItem(key, JSON.stringify(value));
  } catch {
    /* quota or availability errors: the feature degrades to in-memory only */
  }
}

/** Format milliseconds as `mm:ss`, or `h:mm:ss` past the hour. */
export function formatTime(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  const pad = (value: number): string => String(value).padStart(2, '0');
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`;
}

/**
 * The attempt stopwatch. It starts with the first answer picked, only counts
 * while the page is open and visible, survives reloads through `localStorage`,
 * and freezes once every question is answered.
 */
class Stopwatch {
  readonly #storage: Storage | null;
  readonly #key: string;
  #elapsed = 0;
  #startedAt: number | null = null;
  #begun = false;
  #done = false;

  constructor(storage: Storage | null, key: string) {
    this.#storage = storage;
    this.#key = key;
    const saved = readJson(storage, key) as { elapsed?: unknown; begun?: unknown; done?: unknown } | null;
    if (saved && typeof saved.elapsed === 'number' && saved.elapsed >= 0) {
      this.#elapsed = saved.elapsed;
      this.#begun = saved.begun === true;
      this.#done = saved.done === true;
    }
  }

  get elapsed(): number {
    return this.#elapsed + (this.#startedAt === null ? 0 : performance.now() - this.#startedAt);
  }

  get begun(): boolean {
    return this.#begun;
  }

  get done(): boolean {
    return this.#done;
  }

  /** Mark the attempt as started; `start()` does nothing until then. */
  begin(): void {
    this.#begun = true;
    this.save();
  }

  start(): void {
    if (!this.#begun || this.#done || this.#startedAt !== null) return;
    this.#startedAt = performance.now();
  }

  pause(): void {
    if (this.#startedAt !== null) {
      this.#elapsed = this.elapsed;
      this.#startedAt = null;
    }
    this.save();
  }

  finish(): void {
    this.pause();
    this.#done = true;
    this.save();
  }

  reopen(): void {
    this.#done = false;
    this.save();
  }

  reset(): void {
    this.#elapsed = 0;
    this.#startedAt = null;
    this.#begun = false;
    this.#done = false;
    this.save();
  }

  save(): void {
    writeJson(this.#storage, this.#key, {
      elapsed: Math.round(this.elapsed),
      begun: this.#begun,
      done: this.#done,
    });
  }
}

/** What every navigator paints from: one cell per question plus the totals. */
interface NavSnapshot {
  cells: { state: CellState; flagged: boolean; current: boolean }[];
  hasResults: boolean;
  resultsCurrent: boolean;
  answered: number;
  correct: number;
  total: number;
  complete: boolean;
  questionLabel: string;
}

/**
 * The page-wide pager: shows one quiz at a time (plus the results panel as a
 * final page), owns the flags and the stopwatch, and drives every
 * `<sl-quiz-nav>` on the page (sidebar and mobile bar) from one snapshot.
 */
class QuizPager {
  /** The questions in the order shown, which is also their order in the page. */
  #quizzes: HTMLElement[];
  readonly #results: HTMLElement | null;
  readonly #navs = new Set<StarlightQuizNavElement>();
  readonly #labels: NavLabels;
  readonly #shuffleQuestions: boolean;
  readonly #storage = safeStorage();
  readonly #orderKey: string;
  readonly #flagsKey: string;
  readonly #flags: Set<string>;
  readonly #timer: Stopwatch;
  readonly #pager: HTMLElement;
  readonly #live: HTMLElement;
  #index = 0;
  /** The question to return to from the results page. */
  #lastQuestion = 0;
  #ticks = 0;

  constructor({ labels, shuffleQuestions }: PagerOptions) {
    this.#labels = labels;
    this.#shuffleQuestions = shuffleQuestions;
    this.#quizzes = Array.from(document.querySelectorAll<HTMLElement>(QUIZ_ELEMENT));
    this.#results = document.querySelector<HTMLElement>(QUIZ_RESULTS_ELEMENT);

    const path = location.pathname;
    this.#orderKey = ORDER_KEY_PREFIX + path;
    this.#flagsKey = FLAGS_KEY_PREFIX + path;
    const savedFlags = readJson(this.#storage, this.#flagsKey);
    this.#flags = new Set(Array.isArray(savedFlags) ? savedFlags.filter((id) => typeof id === 'string') : []);
    this.#timer = new Stopwatch(this.#storage, TIMER_KEY_PREFIX + path);

    this.#live = document.createElement('p');
    this.#live.className = 'sr-only';
    this.#live.setAttribute('aria-live', 'polite');
    this.#pager = this.#buildPager();

    this.#applyOrder(false);
    this.#syncTimer();
    this.#show(this.#indexFromHash() ?? this.#resumeIndex(), { scroll: false });
    document.documentElement.dataset['quizReady'] = '';

    // The stopwatch waits for the first answer picked (or typed), whichever
    // question it is, instead of starting when the page opens.
    const onAnswer = (event: Event): void => {
      if (event.target instanceof Element && event.target.closest(QUIZ_ELEMENT)) this.#beginTimer();
    };
    document.addEventListener('change', onAnswer);
    document.addEventListener('input', onAnswer);

    window.addEventListener(CHANGE_EVENT, () => this.#onChange());
    window.addEventListener(RESET_ALL_EVENT, () => this.#onResetAll());
    window.addEventListener('hashchange', () => {
      const index = this.#indexFromHash();
      if (index !== null) this.#show(index, { updateHash: false });
    });
    document.addEventListener('keydown', (event) => this.#onKeydown(event));
    document.addEventListener('visibilitychange', () => this.#syncTimer());
    window.addEventListener('pagehide', () => this.#timer.pause());
    window.setInterval(() => this.#tick(), 1000);
  }

  get labels(): NavLabels {
    return this.#labels;
  }

  get #resultsIndex(): number | null {
    return this.#results ? this.#quizzes.length : null;
  }

  get #lastIndex(): number {
    return this.#resultsIndex ?? this.#quizzes.length - 1;
  }

  attach(nav: StarlightQuizNavElement): void {
    this.#navs.add(nav);
    nav.paint(this.#snapshot(), formatTime(this.#timer.elapsed));
  }

  detach(nav: StarlightQuizNavElement): void {
    this.#navs.delete(nav);
  }

  go(index: number): void {
    this.#show(index, {});
  }

  showResults(): void {
    const index = this.#resultsIndex;
    if (index !== null) this.#show(index, {});
  }

  resetAll(): void {
    if (this.#labels.confirmReset && !window.confirm(this.#labels.confirmReset)) return;
    getTracker().resetAll();
  }

  // --- Question order -----------------------------------------------------

  /**
   * With `shuffleQuestions`, put the questions in this attempt's random order,
   * both in `#quizzes` and in the page (so the auto-numbering follows it). The
   * order is saved so a reload keeps it; `fresh` draws a new one.
   */
  #applyOrder(fresh: boolean): void {
    if (!this.#shuffleQuestions || this.#quizzes.length < 2) return;
    const ids = this.#quizzes.map((quiz) => quiz.id);
    // Ids are the only link between the saved order and the page.
    if (new Set(ids).size !== ids.length) return;

    const saved = fresh ? null : readJson(this.#storage, this.#orderKey);
    const valid = Array.isArray(saved) && saved.length === ids.length && ids.every((id) => saved.includes(id));
    const order = valid ? (saved as string[]) : shuffle([...ids]);
    if (!valid) writeJson(this.#storage, this.#orderKey, order);

    const byId = new Map(this.#quizzes.map((quiz) => [quiz.id, quiz]));
    const ordered = order.map((id) => byId.get(id)!);

    // `#quizzes` is in page order, so its first element marks where the block starts.
    const anchor = document.createComment('');
    this.#quizzes[0]!.before(anchor);
    let previous: ChildNode = anchor;
    for (const quiz of ordered) {
      previous.after(quiz);
      previous = quiz;
    }
    anchor.remove();
    this.#quizzes = ordered;

    // Quizzes upgraded before the move numbered themselves in the old order.
    ordered.forEach((quiz, i) => {
      const heading = quiz.querySelector(':scope > .sl-quiz-number');
      const label = quiz.dataset['numberLabel'];
      if (heading && label) heading.textContent = label.replace('{n}', String(i + 1));
    });
  }

  // --- Navigation ---------------------------------------------------------

  #show(index: number, { scroll = true, updateHash = true }: { scroll?: boolean; updateHash?: boolean }): void {
    this.#index = Math.min(Math.max(index, 0), this.#lastIndex);
    const onResults = this.#index === this.#resultsIndex;
    if (!onResults) this.#lastQuestion = this.#index;

    this.#quizzes.forEach((quiz, i) => quiz.toggleAttribute('data-quiz-inactive', i !== this.#index));
    this.#results?.toggleAttribute('data-quiz-inactive', !onResults);

    const current = onResults ? this.#results : this.#quizzes[this.#index];
    if (current) {
      current.after(this.#pager);
      if (scroll) this.#scrollTo(current);
    }

    if (updateHash) {
      const hash = onResults ? RESULTS_HASH : (this.#quizzes[this.#index]?.id ?? '');
      if (hash) this.#setHash(hash);
    }

    this.#live.textContent = this.#questionLabel();
    this.#render();
  }

  /**
   * Keep the current question in the URL so a reload returns to it. Before the
   * load event the browser would still scroll to the new fragment, hiding the
   * page title and intro, so the first update waits for it.
   */
  #setHash(hash: string): void {
    const replace = (): void => history.replaceState(history.state, '', `#${hash}`);
    if (document.readyState === 'complete') replace();
    else window.addEventListener('load', replace, { once: true });
  }

  /** Bring the newly shown page into view when it starts off screen or low down. */
  #scrollTo(element: HTMLElement): void {
    const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const top = element.getBoundingClientRect().top;
    if (top >= offset && top <= window.innerHeight * 0.4) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: window.scrollY + top - offset, behavior: reduced ? 'auto' : 'smooth' });
  }

  #indexFromHash(): number | null {
    const hash = decodeURIComponent(location.hash.slice(1));
    if (!hash) return null;
    if (hash === RESULTS_HASH) return this.#resultsIndex;
    const index = this.#quizzes.findIndex((quiz) => quiz.id === hash);
    return index === -1 ? null : index;
  }

  /** Without a hash, resume at the first unanswered question (or the results). */
  #resumeIndex(): number {
    const index = this.#quizzes.findIndex((quiz) => !getTracker().stateOf(quiz.id)?.answered);
    if (index !== -1) return index;
    return this.#resultsIndex ?? 0;
  }

  #onKeydown(event: KeyboardEvent): void {
    if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    const target = event.target as HTMLElement | null;
    // Arrow keys move between radio options and through text; leave them be.
    if (target?.closest('input, textarea, select, [contenteditable="true"], summary')) return;
    event.preventDefault();
    this.#show(this.#index + (event.key === 'ArrowLeft' ? -1 : 1), {});
  }

  // --- Pager --------------------------------------------------------------

  #buildPager(): HTMLElement {
    const pager = document.createElement('nav');
    pager.className = 'sl-quiz-pager not-content';
    pager.setAttribute('aria-label', this.#labels.heading);

    const button = (className: string, onClick: () => void): HTMLButtonElement => {
      const element = document.createElement('button');
      element.type = 'button';
      element.className = className;
      element.addEventListener('click', onClick);
      return element;
    };

    const prev = button('sl-quiz-pager-prev', () => {
      if (this.#index === this.#resultsIndex) this.#show(this.#lastQuestion, {});
      else this.#show(this.#index - 1, {});
    });
    const flag = button('sl-quiz-pager-flag', () => this.#toggleFlag());
    const next = button('sl-quiz-pager-next', () => this.#show(this.#index + 1, {}));

    pager.append(prev, flag, next, this.#live);
    return pager;
  }

  #paintPager(): void {
    const prev = this.#pager.querySelector<HTMLButtonElement>('.sl-quiz-pager-prev');
    const flag = this.#pager.querySelector<HTMLButtonElement>('.sl-quiz-pager-flag');
    const next = this.#pager.querySelector<HTMLButtonElement>('.sl-quiz-pager-next');
    if (!prev || !flag || !next) return;

    const onResults = this.#index === this.#resultsIndex;
    const quiz = this.#quizzes[this.#index];
    const flagged = !onResults && !!quiz && this.#flags.has(quiz.id);
    const lastQuestion = this.#index === this.#quizzes.length - 1;

    prev.textContent = onResults ? `‹ ${this.#labels.back}` : `‹ ${this.#labels.previous}`;
    prev.disabled = this.#index === 0;

    flag.hidden = onResults;
    flag.textContent = flagged ? `⚑ ${this.#labels.unflag}` : `⚐ ${this.#labels.flag}`;
    flag.setAttribute('aria-pressed', String(flagged));

    next.hidden = onResults;
    next.textContent = lastQuestion && this.#results ? `${this.#labels.finish} ›` : `${this.#labels.next} ›`;
    next.disabled = this.#index >= this.#lastIndex;
    next.classList.toggle('sl-quiz-pager-next--finish', lastQuestion && !!this.#results);
  }

  #toggleFlag(): void {
    const quiz = this.#quizzes[this.#index];
    if (!quiz) return;
    if (this.#flags.has(quiz.id)) this.#flags.delete(quiz.id);
    else this.#flags.add(quiz.id);
    writeJson(this.#storage, this.#flagsKey, [...this.#flags]);
    this.#render();
  }

  // --- State --------------------------------------------------------------

  #onChange(): void {
    this.#syncTimer();
    this.#render();
  }

  #onResetAll(): void {
    this.#flags.clear();
    writeJson(this.#storage, this.#flagsKey, []);
    this.#timer.reset();
    this.#syncTimer();
    // Reorder once the reset event has reached every quiz: moving a quiz
    // re-registers its listener, which would skip it in this dispatch.
    setTimeout(() => {
      this.#applyOrder(true);
      this.#show(0, {});
    });
  }

  #beginTimer(): void {
    if (this.#timer.begun || this.#timer.done) return;
    this.#timer.begin();
    this.#syncTimer();
  }

  /** Run the stopwatch only while the attempt is open and the tab is visible. */
  #syncTimer(): void {
    const complete = isComplete(getTracker().progress);
    if (complete) {
      if (!this.#timer.done) this.#timer.finish();
    } else {
      if (this.#timer.done) this.#timer.reopen();
      if (document.visibilityState === 'visible') this.#timer.start();
      else this.#timer.pause();
    }
    this.#paintTime();
  }

  #tick(): void {
    this.#paintTime();
    this.#ticks = (this.#ticks + 1) % TIMER_SAVE_EVERY;
    if (this.#ticks === 0 && !this.#timer.done) this.#timer.save();
  }

  #paintTime(): void {
    const time = formatTime(this.#timer.elapsed);
    for (const nav of this.#navs) nav.paintTime(time);
    if (this.#results) {
      setTextAll(this.#results, '.sl-quiz-results-time-value', time);
      const row = this.#results.querySelector<HTMLElement>('.sl-quiz-results-time');
      if (row) row.hidden = false;
    }
  }

  #questionLabel(): string {
    if (this.#index === this.#resultsIndex) return this.#labels.results;
    return `${this.#labels.question.replace('{n}', String(this.#index + 1))} / ${this.#quizzes.length}`;
  }

  #snapshot(): NavSnapshot {
    const tracker = getTracker();
    const progress = tracker.progress;
    return {
      cells: this.#quizzes.map((quiz, i) => {
        const state = tracker.stateOf(quiz.id);
        return {
          state: state?.answered ? (state.correct ? 'correct' : 'wrong') : 'none',
          flagged: this.#flags.has(quiz.id),
          current: i === this.#index,
        };
      }),
      hasResults: this.#results !== null,
      resultsCurrent: this.#index === this.#resultsIndex,
      answered: progress.answered,
      correct: progress.correct,
      total: this.#quizzes.length,
      complete: isComplete(progress),
      questionLabel: this.#questionLabel(),
    };
  }

  #render(): void {
    this.#paintPager();
    const snapshot = this.#snapshot();
    const time = formatTime(this.#timer.elapsed);
    for (const nav of this.#navs) nav.paint(snapshot, time);
  }
}

const PAGER_KEY = Symbol.for('starlight-quiz.pager');

/** The page's pager, created by the first navigator to connect. */
function getPager(options: PagerOptions): QuizPager | null {
  const globals = globalThis as typeof globalThis & { [PAGER_KEY]?: QuizPager };
  if (!globals[PAGER_KEY]) {
    if (!document.querySelector(QUIZ_ELEMENT)) return null;
    globals[PAGER_KEY] = new QuizPager(options);
  }
  return globals[PAGER_KEY];
}

/**
 * The `<sl-quiz-nav>` custom element: the question grid, stopwatch and score
 * summary. Rendered twice per quiz page — in the right sidebar on wide screens
 * and as a fixed bar with a drop-down on narrow ones — both fed by the shared
 * `QuizPager`.
 */
class StarlightQuizNavElement extends HTMLElement {
  #pager: QuizPager | null = null;
  #cells: HTMLButtonElement[] = [];
  #resultsCell: HTMLButtonElement | null = null;

  connectedCallback(): void {
    if (this.#pager) return;
    this.#pager = getPager({
      labels: readLabels(this),
      shuffleQuestions: this.dataset['shuffleQuestions'] === 'true',
    });
    if (!this.#pager) return;
    this.hidden = false;

    this.querySelector('.sl-quiz-nav-finish')?.addEventListener('click', () => {
      this.#close();
      this.#pager?.showResults();
    });
    this.querySelector('.sl-quiz-nav-restart')?.addEventListener('click', () => {
      this.#close();
      this.#pager?.resetAll();
    });
    if (this.dataset['variant'] === 'mobile') this.#wireDropdown();

    this.#pager.attach(this);
  }

  disconnectedCallback(): void {
    this.#pager?.detach(this);
    this.#pager = null;
  }

  paint(snapshot: NavSnapshot, time: string): void {
    this.#ensureCells(snapshot);
    const labels = this.#pager?.labels;

    snapshot.cells.forEach((cell, i) => {
      const button = this.#cells[i];
      if (!button) return;
      button.dataset['state'] = cell.state;
      button.toggleAttribute('data-flagged', cell.flagged);
      if (cell.current) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
      if (labels) {
        const parts = [labels.question.replace('{n}', String(i + 1))];
        if (cell.state === 'correct') parts.push(labels.correct);
        if (cell.state === 'wrong') parts.push(labels.wrong);
        if (cell.flagged) parts.push(labels.flagged);
        button.setAttribute('aria-label', parts.join(', '));
      }
    });

    if (this.#resultsCell) {
      if (snapshot.resultsCurrent) this.#resultsCell.setAttribute('aria-current', 'step');
      else this.#resultsCell.removeAttribute('aria-current');
    }

    setTextAll(this, '.sl-quiz-nav-answered', String(snapshot.answered));
    setTextAll(this, '.sl-quiz-nav-correct', String(snapshot.correct));
    setTextAll(this, '.sl-quiz-nav-total', String(snapshot.total));
    setTextAll(this, '.sl-quiz-nav-current', snapshot.questionLabel);

    const fraction = (count: number): string => (snapshot.total > 0 ? `${(count / snapshot.total) * 100}%` : '0%');
    const correctBar = this.querySelector<HTMLElement>('.sl-quiz-progress-bar-correct');
    const wrongBar = this.querySelector<HTMLElement>('.sl-quiz-progress-bar-incorrect');
    if (correctBar) correctBar.style.inlineSize = fraction(snapshot.correct);
    if (wrongBar) wrongBar.style.inlineSize = fraction(snapshot.answered - snapshot.correct);

    const finish = this.querySelector<HTMLButtonElement>('.sl-quiz-nav-finish');
    if (finish) {
      finish.hidden = !snapshot.hasResults;
      finish.classList.toggle('sl-quiz-nav-finish--ready', snapshot.complete);
    }

    this.paintTime(time);
  }

  paintTime(time: string): void {
    setTextAll(this, '.sl-quiz-nav-timer-value', time);
  }

  /** Build the grid buttons once, when the question count is first known. */
  #ensureCells(snapshot: NavSnapshot): void {
    const grid = this.querySelector<HTMLElement>('.sl-quiz-nav-grid');
    if (!grid || this.#cells.length === snapshot.cells.length) return;

    grid.replaceChildren();
    this.#cells = snapshot.cells.map((_, i) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'sl-quiz-nav-cell';
      button.textContent = String(i + 1);
      button.addEventListener('click', () => {
        this.#close();
        this.#pager?.go(i);
      });
      grid.append(button);
      return button;
    });

    if (snapshot.hasResults && this.#pager) {
      const results = document.createElement('button');
      results.type = 'button';
      results.className = 'sl-quiz-nav-cell sl-quiz-nav-cell--results';
      results.textContent = this.#pager.labels.results;
      results.addEventListener('click', () => {
        this.#close();
        this.#pager?.showResults();
      });
      grid.append(results);
      this.#resultsCell = results;
    }
  }

  /** Mobile only: close the drop-down on outside clicks and Escape. */
  #wireDropdown(): void {
    const details = this.querySelector('details');
    if (!details) return;
    window.addEventListener('click', (event) => {
      if (details.open && !details.contains(event.target as Node)) details.open = false;
    });
    window.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape' || !details.open) return;
      const hadFocus = details.contains(document.activeElement);
      details.open = false;
      if (hadFocus) details.querySelector('summary')?.focus();
    });
  }

  #close(): void {
    const details = this.querySelector('details');
    if (details) details.open = false;
  }
}

/** Register the `<sl-quiz-nav>` custom element (idempotent). */
export function defineQuizNavElement(): void {
  if (typeof customElements !== 'undefined' && !customElements.get(QUIZ_NAV_ELEMENT)) {
    customElements.define(QUIZ_NAV_ELEMENT, StarlightQuizNavElement);
  }
}
