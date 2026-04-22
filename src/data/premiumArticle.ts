import { getReadingTimeMinutes } from "./readingTime";

export type ArticleBlock =
  | { type: "paragraph"; text: string; insight?: boolean; dropCap?: boolean }
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "callout"; title: string; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; language: string; code: string }
  | {
      type: "figure";
      /** Path under /public, e.g. /images/article/01-intro.jpg */
      src: string;
      alt: string;
      /** Optional caption (Medium often shows a line under the image). */
      caption?: string;
    };

export type ArticleSection = {
  id: string;
  title: string;
  kicker?: string;
  blocks: ArticleBlock[];
};

export type PremiumArticle = {
  slug: string;
  title: string;
  subtitle: string;
  readTimeMinutes: number;
  published: string;
  author: {
    name: string;
    role: string;
    initials: string;
  };
  sections: ArticleSection[];
  /** Short bullets for the right rail */
  keyInsights: string[];
};

/** Canonical URL for the full-screen premium reader (this essay). */
export const PREMIUM_ARTICLE_HREF = "/article" as const;

const premiumArticleBase: Omit<PremiumArticle, "readTimeMinutes"> = {
  slug: "no-one-is-coming-to-save-you",
  title: "No One is Coming To Save You",
  subtitle:
    "A grounded path to self-authorship: observation, causality, inner responsibility, and the quiet work of building a life that feels like yours.",
  published: "April 2026",
  author: {
    name: "A. M. S.",
    role: "Writer",
    initials: "AM",
  },
  keyInsights: [
    "Your life is in your hands: outside forces matter, but transformation is an inside job — and naming what you cannot feel is often where the work starts.",
    "You feel Y because you did X. Answering Y with Z lengthens the chain; trace X, fix it, and the loop can finally end.",
    "Negativity is experienced through you, not only at you — seeing your filters and expectations is how the trigger loses its grip.",
    "Purpose can be steadfast: when you aim to impress yourself, you trade borrowed validation for a standard that stays true in any season.",
  ],
  sections: [
    {
      id: "opening",
      title: "Opening",
      kicker: "Essay",
      blocks: [
        {
          type: "paragraph",
          dropCap: true,
          insight: true,
          text:
            "Have you ever paused to realize that your life is entirely in your hands? The challenges you face, the dreams you chase, and the qualities you aspire to cultivate — all of it depends on you. While external factors may influence your path, the truth is, the power to transform your life has always been within you. This is both a liberating and daunting realization, but it's also the key to unlocking a fulfilling, purposeful existence. I too struggled, feeling something was missing despite having a stable job and an amazing group of friends and family. My deeper self-exploration revealed the root cause: I couldn't understand my own emotions, a condition called alexithymia, which led to constant dissatisfaction.",
        },
        {
          type: "paragraph",
          text:
            "In this blog, we'll explore actionable steps and timeless ideas to help you take charge of your life, shift your mindset, and align with the person you truly want to become. The journey starts with one simple but profound truth: no one is coming to save you. Everything begins within you.",
        },
        {
          type: "figure",
          src: "/images/article/01-intro.jpg",
          alt: "Illustration for the opening — authorship, path, and inner work.",
        },
      ],
    },
    {
      id: "self-exploration",
      title: "Self-exploration",
      kicker: "Practice",
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Self-Exploration: A Simple and Powerful Tool",
        },
        {
          type: "paragraph",
          text:
            "Self-exploration doesn't require anything fancy — just a willingness to observe your life as a third person.",
        },
        {
          type: "paragraph",
          text:
            "Start by reflecting on your feelings and actions. Write down what you're doing and why. Understand what you are feeling right now.",
        },
        {
          type: "paragraph",
          text:
            "Deepen your self-awareness. Learn to observe your thoughts without judgment and sustain long-term growth.",
        },
        {
          type: "quote",
          text:
            "Your mind is like a garden. Take time to notice the good thoughts (flowers) and remove the harmful ones (weeds) to make it grow beautifully.",
        },
        {
          type: "figure",
          src: "/images/article/02-self-explore.jpg",
          alt: "Self-exploration and observation — garden or pathway metaphor.",
        },
      ],
    },
    {
      id: "the-moment",
      title: "The moment",
      kicker: "Agency",
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Take Control of the Moment",
        },
        {
          type: "paragraph",
          text:
            'Stop waiting for the "right moment." It will never come. The only moment you have control over is now. If you face a problem, address it head-on. Unresolved issues don\'t disappear; they linger, affecting your emotions, actions, and thoughts, often in ways you may not even recognize.',
        },
      ],
    },
    {
      id: "cause-and-effect",
      title: "Cause and effect",
      kicker: "Clarity",
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Break the Chain of Misguided Actions",
        },
        {
          type: "paragraph",
          text:
            "One of the major mind trap is misunderstanding the chain of cause and effect. For example, you feel Y, so you assume you should do Z. No, no, no. You feel Y because you did X. True consciousness lies in identifying the root cause (X) and addressing it directly. If you respond to Y with Z, you create a new chain of events — Y → Z → A → B → C. This only compounds the issue. Instead, take a step back, identify X, and resolve it. Fixing the root cause eliminates the feeling of Y entirely, breaking the cycle and leading to genuine clarity.",
          insight: true,
        },
        {
          type: "code",
          language: "Pattern",
          code: "feel Y → assume do Z → new chain → more noise\nbetter: find X (cause) → address X → Y loses its fuel",
        },
        {
          type: "callout",
          title: "Litmus test",
          text:
            'Ask yourself: "Am I reacting or responding?" Reaction is automatic and emotional. Response is thoughtful and deliberate.',
        },
        {
          type: "figure",
          src: "/images/article/03-clarity.jpg",
          alt: "Clarity and cause-and-effect — breaking unhelpful chains.",
        },
      ],
    },
    {
      id: "negativity",
      title: "Negativity",
      kicker: "Inquiry",
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Bring the Negativity to Self",
        },
        {
          type: "paragraph",
          text:
            "Negativity often feels like it comes from external situations or people, but in truth, it is generated within you. While external triggers may provoke emotions like anger, frustration, or sadness, these emotions are born and reside in your mind. To break free from negativity, ask yourself: What within me is perceiving this situation as negative? This self-inquiry requires awareness and the willingness to confront your own biases and assumptions. Recognizing that negativity often stems from internal filters, judgments, and unmet expectations — not the external world — opens the door to self-mastery.",
          insight: true,
        },
        {
          type: "paragraph",
          text:
            "When approached consciously, negativity becomes a powerful opportunity for growth. Each time you overcome a challenging situation, you build resilience, and the triggers that once bothered you begin to lose their power. This process, with consistent practice, can lead to a state of \"zero negativity,\" where external events no longer disturb your inner peace. Instead of viewing negativity as a problem, treat it as a teacher. Ask yourself: What can I learn from this experience? How can I grow? By taking responsibility for your reactions — not in a punitive way, but with curiosity and intention — you reclaim control over your life.",
        },
        {
          type: "paragraph",
          text:
            "When you acknowledge that negativity arises within you, you gain the power to change it. You can adjust your intentions, reframe your thoughts, and modify your actions. This is the essence of self-mastery and the secret to happiness that yogis and sages have realized for centuries: happiness isn't dependent on external conditions; it's cultivated within.",
        },
      ],
    },
    {
      id: "mind-traps",
      title: "Mind traps",
      kicker: "Discipline",
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Beware of Mind Traps",
        },
        {
          type: "paragraph",
          text:
            "Do the hard things first — the things you're avoiding. If you keep doing the same things, you won't feel any different.",
        },
        {
          type: "quote",
          text: "The magic you are looking for is in the thing that you are avoiding.",
          attribution: "Saying",
        },
        {
          type: "paragraph",
          text:
            "One trap I noticed in myself was defaulting to easy tasks like cleaning or organizing when I had free time. These activities are satisfying but often serve as distractions from deeper, more meaningful work. Instead of merely maintaining, shift your focus to designing your life. Engage actively, and you'll find your creativity growing day by day. Your environment shapes your behavior. Design spaces that inspire action and reduce friction. For example, if you want to read more, keep a book on your nightstand instead of your phone.",
        },
        {
          type: "callout",
          title: "Litmus test",
          text:
            "Would you do this activity even if no one ever knew you did it? If the answer is yes, it's likely something truly meaningful to you.",
        },
        {
          type: "paragraph",
          text:
            "Another mind trap is overthinking. If you've decided to do something, stop deliberating and just do it. If you find yourself justifying and procrastinating, then you are already in this trap.",
        },
        {
          type: "paragraph",
          text:
            "Change is often challenging because your brain must create new neural pathways — a process known as neuroplasticity. Initially, it requires effort and persistence, but once these pathways are established, the actions become almost effortless.",
        },
      ],
    },
    {
      id: "actionable-steps",
      title: "Actionable steps",
      kicker: "Workbook",
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Actionable Steps For Self Exploration",
        },
        {
          type: "heading",
          level: 3,
          text: '1. Ask "What are the qualities that you would want for yourself?"',
        },
        {
          type: "paragraph",
          text:
            "Don't ask what are the things that you would want for yourself? This subtle but profound shift in focus encourages self-growth and aligns your actions with your values. By prioritizing the development of such qualities, you build a foundation for lasting fulfillment and personal success. Reflect on the traits that resonate with you, and take small steps each day to embody them. Remember, who you become is far more important than what you own, as your inner character ultimately defines your experience of life.",
        },
        {
          type: "heading",
          level: 3,
          text: "2. The Feynman Technique",
        },
        {
          type: "paragraph",
          text:
            "Focus on understanding, not memorizing. In today's education system, the emphasis is often placed on memorization, which leads to superficial learning. True understanding, however, enables you to reproduce concepts at any time. Once you truly understand something, it becomes ingrained in your mind. A powerful test for understanding is to ask \"why\" for everything you do. If you cannot credibly answer the question, then you don't fully understand it. For instance, I enjoy playing games — but why? Because games make it easier to enter a flow state and provide instant feedback, allowing me to track my improvement. This immediate growth is what makes gaming addictive: you can see tangible progress with each failure, which motivates further improvement. True understanding isn't just about recalling information; it's about being able to explain why things work the way they do and using that knowledge to grow and adapt.",
        },
        {
          type: "heading",
          level: 3,
          text: "3. Leverage the Flow State",
        },
        {
          type: "paragraph",
          text:
            "Deep, focused work is where true growth happens. To make significant progress, dedicate uninterrupted time to your goals. This immersion allows your mind to enter a flow state — a mental space where creativity, clarity, and productivity align naturally. In this state, new ideas emerge effortlessly, and tasks that once seemed daunting become easier to manage. One simple but effective way to enhance this flow is by eliminating distractions. For instance, when reading a book, try facing a wall to minimize external interruptions. This small adjustment can significantly improve your ability to concentrate and allow you to absorb and reflect more deeply.",
        },
        {
          type: "heading",
          level: 3,
          text: "4. Read",
        },
        {
          type: "paragraph",
          text:
            "We often learn by observing the world around us and mimicking the people in our lives. However, we can only see so much of a person — the external actions, expressions, and appearances. But the true essence of a person lies within their mind: the decisions, feelings, thought processes, and emotions that drive their actions are what truly shape who they are. Unfortunately, we often overlook this deeper layer. Reading allows us to access the core experiences and memories that shape someone's decisions and behaviors. Through books, we can gain new perspectives and better understand ourselves and others. When a story resonates with us, it helps us navigate our own experiences more effectively. Reading also improves cognitive function and keeps the mind sharp as we age. Best of all, reading is the most cost-effective way to expand the capacity of your mind and invest in personal growth.",
        },
        {
          type: "heading",
          level: 3,
          text: "5. Identify Functional and Dysfunctional Habits",
        },
        {
          type: "paragraph",
          text:
            "In yoga, habits are not categorized as good or bad but as functional or dysfunctional. A functional habit serves a clear purpose and supports your goals, while a dysfunctional one hinders progress or creates unnecessary obstacles. The key is to observe your habits mindfully and assess whether they align with your objectives. By understanding the purpose behind each habit, you can make conscious adjustments to improve your daily routines and overall growth. This self-awareness enables you to cultivate habits that genuinely enhance your life.",
        },
        {
          type: "heading",
          level: 3,
          text: "6. Eliminate Distractions",
        },
        {
          type: "paragraph",
          text:
            "Distractions are the silent thieves of time. To truly focus on your goals, ruthlessly eliminate anything that diverts your attention. Your time is too precious to be wasted 🙂, so prioritize what matters most and remove the noise. This simple yet powerful step can significantly enhance your productivity and lead to greater success.",
        },
        {
          type: "heading",
          level: 3,
          text: "7. Push Your Limits",
        },
        {
          type: "paragraph",
          text:
            "Begin with small steps and gradually challenge yourself to go further. Over time, you'll discover that the limits you once perceived are only illusions. Consistent effort will reveal that there's far more within your capacity than you initially thought. Keep pushing forward, and you'll unlock your true potential.",
        },
        {
          type: "heading",
          level: 3,
          text: "8. All I have is this moment",
        },
        {
          type: "paragraph",
          text:
            "Life unfolds one moment at a time, yet we often lose ourselves in the past or the future, forgetting that the only time we truly have is now. This moment — right here, right now — is all that's real. It's the space where you can act, grow, and experience life fully. By anchoring yourself in the present, you free yourself from the weight of regret and the anxiety of what's to come. Embracing the present moment doesn't mean ignoring your goals or past lessons; it means bringing your full presence to whatever you're doing, however small or significant. When you acknowledge that all you have is this moment, you gain the clarity and power to make it meaningful.",
        },
        {
          type: "heading",
          level: 3,
          text: "9. Separate Things You Can Control From Things You Cannot",
        },
        {
          type: "paragraph",
          text:
            "It's not about ignoring challenges but about choosing where to direct your attention. Life becomes simpler and more fulfilling when you recognize the difference between what you can control and what you cannot. Trying to control external factors — like other people's actions, unforeseen events, or the outcome of a situation — leads to frustration and drains your energy. Instead, focus on what is within your sphere of influence: your thoughts, choices, and actions. This mindset shift is empowering because it redirects your attention to areas where you have agency, fostering a sense of purpose and calm. When faced with challenges, ask yourself: What part of this can I influence? and What must I let go of? By letting go of what's beyond your control, you free yourself from unnecessary worry and can invest your energy in actions that make a meaningful difference. This practice is not about ignoring difficulties but about managing your attention wisely to maintain balance and resilience.",
        },
        {
          type: "heading",
          level: 3,
          text: "10. Harnessing the Power of Shower Thoughts",
        },
        {
          type: "paragraph",
          text:
            "The shower is more than just a place for cleanliness — it can be a sanctuary for clarity and creativity. Many people report having breakthrough ideas in the shower, and there's a reason for this. In the absence of distractions, you are truly alone with your thoughts. Your ego's defenses are down, allowing you to think freely and without judgment. To leverage this phenomenon, step into the shower with a clear intent: focus on a problem or decision you're grappling with. Reflect on the available options and decide on the first action to take. Don't overthink or strive for perfection — remember, perfection is a myth. Solutions often require iteration and exploration. Once out of the shower, act on the decision you made. The act of doing will often lead you closer to clarity than endless pondering ever could.",
        },
      ],
    },
    {
      id: "closing",
      title: "Closing",
      kicker: "Send-off",
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "Closing Thoughts",
        },
        {
          type: "paragraph",
          text:
            "Your journey is yours to shape. No one else will come to save you — but the truth is, you don't need them to. Everything you need is already within you. Start today. Take small steps. And remember, the path to a fulfilling life begins when you decide to take charge of your own story.",
        },
        {
          type: "paragraph",
          text:
            "Life, to me, is about building a character. When you look at the world, look for qualities that you admire — not material possessions. Material things will follow if you cultivate good qualities. Everything that you really want is a side effect.",
        },
        {
          type: "quote",
          text:
            "All the world's a stage, and all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts.",
          attribution: "William Shakespeare",
        },
        {
          type: "paragraph",
          text:
            "Each moment is an opportunity to refine yourself, to grow, and to show up as the person you aspire to be. The key is consistency. Small daily actions, guided by purpose and awareness, will compound over time and shape your legacy. Don't wait for a miraculous moment of change. The magic is in your decisions, and it always has been.",
        },
        {
          type: "paragraph",
          text:
            'Purpose to me is a goal that remains steadfast, regardless of circumstances. Through self-exploration, I built my purpose: "To Impress Myself Every Day." This became a guiding principle. When you focus on impressing yourself, you stop seeking validation from others. That dopamine rush you get from external praise? It pales in comparison to the joy of knowing you\'ve genuinely impressed yourself.',
          insight: true,
        },
        {
          type: "paragraph",
          text:
            "Take these suggestions as a starting point, not a path to follow. Let your real curiosity lead you where you really want to go.",
        },
        {
          type: "figure",
          src: "/images/article/04-closing.jpg",
          alt: "Closing image — path forward, journey, or reflection.",
        },
      ],
    },
    {
      id: "references",
      title: "References",
      kicker: "More soon",
      blocks: [
        {
          type: "heading",
          level: 2,
          text: "References",
        },
        {
          type: "paragraph",
          text:
            "I will add another article on resources that I used for my journey.",
        },
      ],
    },
  ],
};

export const premiumArticle: PremiumArticle = {
  ...premiumArticleBase,
  readTimeMinutes: getReadingTimeMinutes(premiumArticleBase),
};
