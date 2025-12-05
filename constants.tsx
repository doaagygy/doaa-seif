
import { NavItem, Project, Service } from './types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', labelEn: 'Home', labelAr: 'الرئيسية', path: '/' },
  { id: 'about', labelEn: 'About', labelAr: 'من أنا', path: '/about' },
  { id: 'portfolio', labelEn: 'Portfolio', labelAr: 'أعمالي', path: '/portfolio' },
  { id: 'services', labelEn: 'Services', labelAr: 'خدماتي', path: '/services' },
  { id: 'contact', labelEn: 'Contact', labelAr: 'تواصل معي', path: '/contact' },
];

export const SERVICES: Service[] = [
  { 
    id: 1, 
    titleEn: 'Logo Design', 
    titleAr: 'تصميم الشعارات',
    descriptionEn: 'Creating distinct and memorable symbols that capture the essence of your brand in a single mark. I focus on simplicity, scalability, and relevance to ensure your logo stands the test of time.',
    descriptionAr: 'إنشاء رموز مميزة لا تُنسى تلتقط جوهر علامتك التجارية في علامة واحدة. أركز على البساطة، وقابلية التوسع، والملاءمة لضمان بقاء شعارك قوياً مع مرور الوقت.'
  },
  { 
    id: 2, 
    titleEn: 'Visual Identity Design', 
    titleAr: 'تصميم الهوية البصرية',
    descriptionEn: 'Building a cohesive visual system beyond just the logo. This includes color palettes, typography, patterns, and usage guidelines to ensure consistency across all touchpoints.',
    descriptionAr: 'بناء نظام بصري متماسك يتجاوز مجرد الشعار. يشمل ذلك لوحات الألوان، والخطوط، والأنماط، وإرشادات الاستخدام لضمان التناسق عبر جميع نقاط الاتصال.'
  },
  { 
    id: 3, 
    titleEn: 'Brand Strategy Direction', 
    titleAr: 'توجيه استراتيجية العلامة التجارية',
    descriptionEn: 'Defining the "why" and "how" of your brand. We work together to establish your brand voice, positioning, and target audience to align visuals with business goals.',
    descriptionAr: 'تحديد "السبب" و "الكيفية" لعلامتك التجارية. نعمل معاً لتأسيس صوت علامتك التجارية، ومكانتها، والجمهور المستهدف لمواءمة العناصر البصرية مع أهداف العمل.'
  },
  { 
    id: 4, 
    titleEn: 'Visual Communication Design', 
    titleAr: 'تصميم التواصل البصري',
    descriptionEn: 'Crafting effective marketing materials, packaging, and digital assets that communicate your message clearly and persuasively to your audience.',
    descriptionAr: 'صياغة مواد تسويقية، وتغليف، وأصول رقمية فعالة توصل رسالتك بوضوح وبشكل مقنع لجمهورك.'
  },
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Neon Pulse',
    descriptionEn: 'Brand identity for a modern tech startup.',
    descriptionAr: 'هوية بصرية لشركة تقنية حديثة.',
    imageUrl: 'https://picsum.photos/800/800?random=1',
    category: 'Branding',
    client: 'Neon Pulse Tech',
    year: '2024',
    services: ['Brand Strategy', 'Visual Identity', 'Web Design'],
    longDescriptionEn: 'Neon Pulse approached us to create a visual identity that reflects their cutting-edge technology in AI and machine learning. The goal was to visualize the "pulse" of data in a way that feels organic yet digital. We developed a dynamic logo system and a vibrant color palette that stands out in the dark mode-heavy tech sector.',
    longDescriptionAr: 'تواصلت معنا Neon Pulse لإنشاء هوية بصرية تعكس تقنيتهم المتطورة في الذكاء الاصطناعي والتعلم الآلي. كان الهدف هو تصور "نبض" البيانات بطريقة تبدو عضوية ولكن رقمية. قمنا بتطوير نظام شعار ديناميكي ولوحة ألوان نابضة بالحياة تبرز في قطاع التكنولوجيا.',
    gallery: [
      { url: 'https://picsum.photos/1200/800?random=11', captionEn: 'Initial Concept Sketches', captionAr: 'رسومات المفهوم الأولي' },
      { url: 'https://picsum.photos/1200/800?random=12', captionEn: 'Brand Color Palette', captionAr: 'لوحة ألوان العلامة التجارية' },
      { url: 'https://picsum.photos/1200/800?random=13', captionEn: 'Logo Construction', captionAr: 'بناء الشعار' },
      { url: 'https://picsum.photos/1200/800?random=14', captionEn: 'Stationery Mockups', captionAr: 'نماذج القرطاسية' }
    ],
    liveUrl: 'https://example.com/neon-pulse'
  },
  {
    id: 2,
    title: 'Urban Flow',
    descriptionEn: 'Visual communication strategy for a city event.',
    descriptionAr: 'استراتيجية تواصل بصري لحدث في المدينة.',
    imageUrl: 'https://picsum.photos/800/1000?random=2',
    category: 'Visual Strategy',
    client: 'City Council',
    year: '2023',
    services: ['Art Direction', 'Print Design', 'Wayfinding'],
    longDescriptionEn: 'Urban Flow is an annual art and music festival. The challenge was to create a cohesive visual language that could guide thousands of visitors through the city streets. We utilized bold typography and a map-inspired layout system to create wayfinding, posters, and digital assets that felt like part of the city architecture.',
    longDescriptionAr: 'Urban Flow هو مهرجان سنوي للفن والموسيقى. كان التحدي هو خلق لغة بصرية متماسكة يمكن أن توجه آلاف الزوار عبر شوارع المدينة. استخدمنا طباعة جريئة ونظام تخطيط مستوحى من الخرائط لإنشاء لافتات وملصقات وأصول رقمية تبدو وكأنها جزء من بنية المدينة.',
    gallery: [
      { url: 'https://picsum.photos/1200/800?random=21', captionEn: 'Street Banner Design', captionAr: 'تصميم لافتة الشارع' },
      { url: 'https://picsum.photos/1200/800?random=22', captionEn: 'Wayfinding System', captionAr: 'نظام التوجيه' },
      { url: 'https://picsum.photos/1200/800?random=23', captionEn: 'Event Poster Series', captionAr: 'سلسلة ملصقات الحدث' }
    ],
    liveUrl: 'https://example.com/urban-flow'
  },
  {
    id: 3,
    title: 'Eco Leaf',
    descriptionEn: 'Logo and packaging for sustainable products.',
    descriptionAr: 'شعار وتغليف لمنتجات مستدامة.',
    imageUrl: 'https://picsum.photos/800/600?random=3',
    category: 'Packaging',
    client: 'EcoLeaf Goods',
    year: '2023',
    services: ['Packaging', 'Illustration', 'Copywriting'],
    longDescriptionEn: 'Eco Leaf needed packaging that shouted "sustainability" without using the cliché kraft paper look. We opted for a clean, minimalist white design using recycled materials, accented with hand-drawn botanical illustrations to emphasize the natural ingredients. The result is premium yet approachable.',
    longDescriptionAr: 'احتاجت Eco Leaf إلى تغليف يعبر بوضوح عن "الاستدامة" دون استخدام مظهر ورق الكرافت التقليدي. اخترنا تصميماً أبيض نظيفاً وبسيطاً باستخدام مواد معاد تدويرها، مع رسوم نباتية مرسومة يدوياً للتأكيد على المكونات الطبيعية. النتيجة هي منتج فاخر ولكنه في المتناول.',
    gallery: [
      { url: 'https://picsum.photos/1200/800?random=31', captionEn: 'Product Range Overview', captionAr: 'نظرة عامة على مجموعة المنتجات' },
      { url: 'https://picsum.photos/1200/800?random=32', captionEn: 'Detail of Illustrations', captionAr: 'تفاصيل الرسوم التوضيحية' },
      { url: 'https://picsum.photos/1200/800?random=33', captionEn: 'Packaging Texture', captionAr: 'ملمس التغليف' },
      { url: 'https://picsum.photos/1200/800?random=34' }
    ]
  },
  {
    id: 4,
    title: 'Minimalist Cafe',
    descriptionEn: 'Full rebranding for a boutique coffee shop.',
    descriptionAr: 'إعادة تسمية شاملة لمقهى صغير.',
    imageUrl: 'https://picsum.photos/800/800?random=4',
    category: 'Branding',
    client: 'The Daily Grind',
    year: '2024',
    services: ['Rebranding', 'Interior Graphics', 'Social Media'],
    longDescriptionEn: 'A boutique coffee shop wanted to shed its rustic image for something more modern and sharp. We introduced a monochrome color palette with a single accent color. The logo is purely typographic, reflecting the precision of their brewing process. We extended this identity to cups, aprons, and wall art.',
    longDescriptionAr: 'أراد مقهى بوتيك التخلص من صورته الريفية لشيء أكثر حداثة وحدة. قدمنا لوحة ألوان أحادية اللون مع لون تمييز واحد. الشعار تيبوغرافي بحت، يعكس دقة عملية التحضير لديهم. قمنا بتوسيع هذه الهوية لتشمل الأكواب والمآزر والفن الجداري.',
    gallery: [
      { url: 'https://picsum.photos/1200/800?random=41', captionEn: 'Cup Design', captionAr: 'تصميم الكوب' },
      { url: 'https://picsum.photos/1200/800?random=42', captionEn: 'Interior Signage', captionAr: 'اللافتات الداخلية' },
      { url: 'https://picsum.photos/1200/800?random=43', captionEn: 'Menu Layout', captionAr: 'تخطيط القائمة' }
    ]
  }
];

export const TEXTS = {
  en: {
    name: 'Doaa Seif',
    role: 'Graphic Designer',
    positioning: 'I help brands design and develop visual identities and brand strategies to stand out and improve internal and external communication.',
    aboutTitle: 'About Me',
    aboutText1: 'I’m Doaa Seif, a graphic designer focused on building visual identities and brand strategies that help brands stand out and communicate clearly.',
    aboutText2: 'With a passion for clean aesthetics and strategic thinking, I bridge the gap between visual beauty and functional communication. My work is dedicated to finding the unique voice of each brand I partner with.',
    portfolioTitle: 'Selected Work',
    servicesTitle: 'Services',
    contactTitle: 'Let’s Work Together',
    contactName: 'Name',
    contactEmail: 'Email',
    contactMessage: 'Message',
    contactSend: 'Send Message',
    contactSuccess: 'Message sent successfully!',
    socials: 'Connect with me',
    
    // Project Detail
    client: 'Client',
    year: 'Year',
    services: 'Services',
    nextProject: 'Next Project',
    back: 'Back to Portfolio'
  },
  ar: {
    name: 'دعاء سيف',
    role: 'مصممة جرافيك',
    positioning: 'أساعد العلامات التجارية على تصميم وتطوير الهويات البصرية واستراتيجيات العلامة التجارية للتميز وتحسين التواصل الداخلي والخارجي.',
    aboutTitle: 'من أنا',
    aboutText1: 'أنا دعاء سيف، مصممة جرافيك أركز على بناء الهويات البصرية واستراتيجيات العلامة التجارية التي تساعد العلامات التجارية على التميز والتواصل بوضوح.',
    aboutText2: 'بشغف للجماليات النظيفة والتفكير الاستراتيجي، أقوم بسد الفجوة بين الجمال البصري والتواصل الوظيفي. عملي مكرس لإيجاد الصوت الفريد لكل علامة تجارية أشارك معها.',
    portfolioTitle: 'مختارات من أعمالي',
    servicesTitle: 'خدماتي',
    contactTitle: 'لنعمل معاً',
    contactName: 'الاسم',
    contactEmail: 'البريد الإلكتروني',
    contactMessage: 'الرسالة',
    contactSend: 'إرسال الرسالة',
    contactSuccess: 'تم إرسال الرسالة بنجاح!',
    socials: 'تواصل معي',
    
    // Project Detail
    client: 'العميل',
    year: 'السنة',
    services: 'الخدمات',
    nextProject: 'المشروع التالي',
    back: 'العودة للمعرض'
  }
};