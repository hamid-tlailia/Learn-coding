import type { Locale } from "./config";

const ar = {
  brand: "سطر",
  tagline: "سطرًا بعد سطر، تصبح مبرمجًا.",
  nav: { learn: "المسار", home: "الرئيسية" },
  hero: {
    title: "تعلّم البرمجة بالعربية والإنجليزية، واكتب الكود من أول دقيقة.",
    subtitle:
      "دروس قصيرة مع أمثلة حيّة، محرر داخل كل درس، نتيجة فورية، تمارين تُصحَّح تلقائيًا واختبارات اجتياز بين كل مرحلة، من الويب إلى الموبايل.",
    cta: "ابدأ الدرس الأول",
    secondary: "شاهد المسار كاملًا",
  },
  features: [
    { title: "محرر ونتيجة في نفس الشاشة", text: "تكتب الكود بجانب الشرح وترى النتيجة تتحدّث أثناء الكتابة." },
    { title: "شرح بلغتين", text: "بدّل بين العربية والإنجليزية في أي لحظة، والمصطلحات التقنية تبقى كما يستخدمها المحترفون." },
    { title: "الطريقة الأسرع", text: "في كل درس اختصار حديث: Emmet للوسوم، وأقصر طريقة لكتابة الدوال." },
    { title: "مستويات واختبارات", text: "تتقدّم مرحلة بعد مرحلة، ولا تنتقل حتى تجتاز اختبار المرحلة." },
  ],
  learn: {
    title: "مسار التعلّم",
    subtitle: "من أول وسم HTML حتى نشر تطبيق موبايل.",
    lessons: "دروس",
    soon: "قريبًا",
    locked: "مقفلة: اجتز اختبار المرحلة السابقة",
    exam: "اختبار المرحلة",
    examPassed: "تم الاجتياز",
    start: "ابدأ",
    continue: "تابع",
    done: "مكتمل",
  },
  lesson: {
    of: "من",
    tip: "الطريقة الأسرع",
    task: "مهمتك",
    check: "تحقّق",
    hint: "تلميح",
    reset: "إعادة الكود",
    solution: "اعرض الحل",
    result: "النتيجة",
    liveNote: "النتيجة تتحدّث مباشرة أثناء الكتابة",
    allPassed: "أحسنت! أكملت الدرس.",
    somePassed: "اقتربت، راجع المهام غير المكتملة.",
    next: "الدرس التالي",
    toExam: "إلى اختبار المرحلة",
    back: "المسار",
    noMoreHints: "لا مزيد من التلميحات. يمكنك عرض الحل.",
  },
  exam: {
    title: "اختبار المرحلة",
    intro: "أجب عن كل الأسئلة. تحتاج {pass}% على الأقل للاجتياز وفتح المرحلة التالية.",
    submit: "سلّم الإجابات",
    passed: "مبروك! اجتزت الاختبار بنتيجة {score}%.",
    failed: "نتيجتك {score}%. راجع الدروس وحاول مرة أخرى.",
    retry: "أعد المحاولة",
    backToPath: "العودة إلى المسار",
  },
  stats: { xp: "XP", streak: "يوم" },
  footer: "سطر · مشروع تعليمي مفتوح",
};

export type Dictionary = typeof ar;

const en: Dictionary = {
  brand: "Satr",
  tagline: "Line by line, you become a developer.",
  nav: { learn: "Path", home: "Home" },
  hero: {
    title: "Learn to code in Arabic and English, writing real code from minute one.",
    subtitle:
      "Short lessons with live examples, an editor in every lesson, instant results, auto-graded exercises and a passing exam between stages, from web to mobile.",
    cta: "Start the first lesson",
    secondary: "See the full path",
  },
  features: [
    { title: "Editor and result side by side", text: "Write code next to the explanation and watch the result update as you type." },
    { title: "Two languages", text: "Switch between Arabic and English any time. Technical terms stay the way professionals use them." },
    { title: "The fastest way", text: "Every lesson shows a modern shortcut: Emmet for tags, the shortest way to write a function." },
    { title: "Levels and exams", text: "Move stage by stage, and pass each stage's exam before moving on." },
  ],
  learn: {
    title: "Learning path",
    subtitle: "From your first HTML tag to shipping a mobile app.",
    lessons: "lessons",
    soon: "Coming soon",
    locked: "Locked: pass the previous stage exam",
    exam: "Stage exam",
    examPassed: "Passed",
    start: "Start",
    continue: "Continue",
    done: "Done",
  },
  lesson: {
    of: "of",
    tip: "The fastest way",
    task: "Your task",
    check: "Check",
    hint: "Hint",
    reset: "Reset code",
    solution: "Show solution",
    result: "Result",
    liveNote: "The result updates live as you type",
    allPassed: "Well done! Lesson complete.",
    somePassed: "Almost there. Look at the unfinished tasks.",
    next: "Next lesson",
    toExam: "Go to the stage exam",
    back: "Path",
    noMoreHints: "No more hints. You can show the solution.",
  },
  exam: {
    title: "Stage exam",
    intro: "Answer every question. You need at least {pass}% to pass and unlock the next stage.",
    submit: "Submit answers",
    passed: "Congratulations! You passed with {score}%.",
    failed: "You scored {score}%. Review the lessons and try again.",
    retry: "Try again",
    backToPath: "Back to the path",
  },
  stats: { xp: "XP", streak: "days" },
  footer: "Satr · an open learning project",
};

const dictionaries: Record<Locale, Dictionary> = { ar, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
