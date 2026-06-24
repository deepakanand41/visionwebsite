export const mainDestinations = [
  { slug: 'canada', name: 'Canada', flag: '🇨🇦' },
  { slug: 'australia', name: 'Australia', flag: '🇦🇺' },
  { slug: 'united-kingdom', name: 'United Kingdom', flag: '🇬🇧' },
  { slug: 'united-states', name: 'United States', flag: '🇺🇸' },
  { slug: 'new-zealand', name: 'New Zealand', flag: '🇳🇿' },
];

export const europeDestinations = [
  { slug: 'france', name: 'France', flag: '🇫🇷' },
  { slug: 'denmark', name: 'Denmark', flag: '🇩🇰' },
  { slug: 'sweden', name: 'Sweden', flag: '🇸🇪' },
  { slug: 'finland', name: 'Finland', flag: '🇫🇮' },
  { slug: 'latvia', name: 'Latvia', flag: '🇱🇻' },
  { slug: 'lithuania', name: 'Lithuania', flag: '🇱🇹' },
];

export const otherDestinations = [
  { slug: 'singapore', name: 'Singapore', flag: '🇸🇬' },
  { slug: 'cyprus', name: 'Cyprus', flag: '🇨🇾' },
  { slug: 'malta', name: 'Malta', flag: '🇲🇹' },
  { slug: 'mauritius', name: 'Mauritius', flag: '🇲🇺' },
];

/** @deprecated Use mainDestinations, europeDestinations, or otherDestinations */
export const destinationsList = mainDestinations;

export const allDestinations = [
  ...mainDestinations,
  ...europeDestinations,
  ...otherDestinations,
];

/** Grouped options for enquiry / counselling forms */
export const destinationFormGroups = [
  { label: 'Popular Destinations', items: mainDestinations },
  { label: 'Europe', items: europeDestinations },
  { label: 'Other Destinations', items: otherDestinations },
];

export function getDestinationNameBySlug(slug) {
  const found = allDestinations.find((d) => d.slug === slug);
  return found?.name ?? null;
}

function createDestination({ slug, name, flag, accentColor, heroSubtitle, stats }) {
  return {
    slug,
    name,
    flag,
    heroTitle: `Study in ${name} For Indian Students`,
    heroSubtitle:
      heroSubtitle ||
      `Discover world-class universities, affordable programs, and global career pathways in ${name} with expert guidance from Vision International.`,
    stats: stats || ['Quality Universities', 'Global Recognition', 'Career Pathways', 'Student Support'],
    landmark: name,
    accentColor,
    tabs: [
      { id: 'why-popular', label: `Why Study in ${name}` },
      { id: 'latest-updates', label: 'Latest Updates' },
      { id: 'top-universities', label: 'Top Universities' },
      { id: 'cost-living', label: 'Cost & Living' },
      { id: 'visa-process', label: 'Visa Process' },
    ],
    sections: [
      {
        id: 'why-popular',
        title: `Why ${name} is a great study destination for Indian students`,
        highlight: 'Quality Education | Global Degrees | Career Opportunities | Multicultural Environment',
        content: [
          `${name} offers internationally recognised qualifications, modern campuses, and strong industry connections that help graduates build successful global careers.`,
          `Indian students benefit from English or bilingual programs, supportive student communities, and clear pathways from study to work in ${name} and beyond.`,
        ],
        bullets: [
          'Globally recognised degrees and qualifications',
          'Diverse programs across engineering, business, IT, and health sciences',
          'Safe and welcoming environment for international students',
          'Strong post-study work and career opportunities',
        ],
      },
      {
        id: 'latest-updates',
        title: `Latest Updates for Studying in ${name} (2026 Onwards)`,
        content: [`${name} continues to welcome international students with updated visa policies and expanded English-taught programs.`],
        bullets: [
          'Updated student visa guidelines for 2026 intakes',
          'Expanded scholarship and financial aid options',
          'Part-time work rights for eligible students',
          'Streamlined admission processes for Indian applicants',
        ],
      },
      {
        id: 'top-universities',
        title: `Top Universities in ${name}`,
        content: [`Leading institutions in ${name} offer research-driven education and strong graduate employability.`],
        bullets: [
          `Top-ranked public and private universities in ${name}`,
          'English-taught bachelor\'s and master\'s programs',
          'Industry partnerships and internship opportunities',
          'Strong alumni networks across Europe and globally',
        ],
      },
      {
        id: 'cost-living',
        title: `Cost of Studying & Living in ${name}`,
        content: [`Tuition and living costs in ${name} vary by city and program — our counsellors help you plan a realistic budget.`],
        bullets: [
          'Competitive tuition compared to other popular destinations',
          'Student accommodation and living expense guidance',
          'Scholarship and education loan assistance available',
          'Part-time work options to offset living costs',
        ],
      },
      {
        id: 'visa-process',
        title: `${name} Student Visa Process`,
        content: ['Our visa specialists guide you through documentation, financial proof, and embassy appointments.'],
        bullets: [
          'Step 1: Receive admission letter from institution',
          'Step 2: Gather financial and academic documents',
          'Step 3: Complete visa application form',
          'Step 4: Schedule biometrics and interview (if required)',
          'Step 5: Submit application and track status',
          'Step 6: Receive visa approval and prepare for departure',
        ],
      },
    ],
  };
}

export const destinationData = {
  canada: {
    slug: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    heroTitle: 'Study in Canada For Indian Students',
    heroSubtitle:
      'Canada offers world-class education, affordable tuition, multicultural campuses, and a clear pathway to permanent residency — making it the #1 choice for Indian students.',
    stats: ['30+ Top-Ranked Universities', '3 Years of PSW', 'High Employability', 'Affordable Tuition'],
    landmark: 'CN Tower',
    accentColor: '#c8102e',
    tabs: [
      { id: 'why-popular', label: 'Why Study in Canada' },
      { id: 'latest-updates', label: 'Latest Updates' },
      { id: 'top-universities', label: 'Top Universities' },
      { id: 'cost-living', label: 'Cost & Living' },
      { id: 'visa-process', label: 'Visa Process' },
    ],
    sections: [
      {
        id: 'why-popular',
        title: 'Know why study in Canada is so popular with Indian students',
        highlight: '30 Top-Ranked Universities | 3 Years of PSW | High Employability | Affordable Tuition',
        content: [
          'Canada consistently ranks among the top destinations for international students. With institutions like the University of Toronto, UBC, and McGill University, students gain globally recognized degrees at a fraction of the cost compared to the US or UK.',
          'The Post-Graduation Work Permit (PGWP) allows graduates to work in Canada for up to 3 years, providing invaluable international work experience. Many students transition to permanent residency through programs like Express Entry and Provincial Nominee Programs (PNP).',
        ],
        bullets: [
          'Safe, multicultural society welcoming to international students',
          'Co-op and internship opportunities built into many programs',
          'Spouse can apply for open work permit',
          'High quality of life and excellent healthcare',
        ],
      },
      {
        id: 'latest-updates',
        title: 'Latest Updates for Studying in Canada (2026 Onwards)',
        content: [
          'Canada continues to welcome international students with updated study permit policies. Master\'s and PhD students at public institutions may be eligible for extended work permits upon graduation.',
          'The Student Direct Stream (SDS) offers faster visa processing for eligible Indian students with strong English proficiency and financial documentation.',
        ],
        bullets: [
          'Study permit processing: 4–8 weeks for SDS applicants',
          'PGWP extended to 3 years for eligible master\'s graduates',
          'Off-campus work: up to 24 hours/week during academic sessions',
          'GIC requirement: CAD $22,895 for living expenses proof',
        ],
      },
      {
        id: 'top-universities',
        title: 'Top Universities in Canada for Indian Students',
        content: [
          'Canada is home to over 100 universities and 200+ colleges offering programs across every discipline. Here are the most sought-after institutions by Indian students:',
        ],
        bullets: [
          'University of Toronto — #1 in Canada, strong in CS & Engineering',
          'University of British Columbia — Top research university on the West Coast',
          'McGill University — Prestigious programs in Medicine & Law',
          'University of Waterloo — #1 for Co-op programs and tech placements',
          'McMaster University — Renowned Health Sciences faculty',
          'University of Alberta — Affordable tuition with strong STEM programs',
        ],
      },
      {
        id: 'cost-living',
        title: 'Cost of Studying & Living in Canada',
        content: [
          'Tuition fees in Canada range from CAD $15,000 to $35,000 per year for undergraduate programs and CAD $18,000 to $45,000 for postgraduate programs, depending on the institution and course.',
        ],
        bullets: [
          'Undergraduate tuition: CAD $15,000 – $35,000/year',
          'Postgraduate tuition: CAD $18,000 – $45,000/year',
          'Living expenses: CAD $12,000 – $18,000/year',
          'Part-time work: up to 24 hrs/week during studies',
          'Scholarships available: merit-based and need-based',
        ],
      },
      {
        id: 'visa-process',
        title: 'Canada Student Visa Process for Indian Students',
        content: [
          'To study in Canada, you need a study permit. Our visa specialists guide you through every step with a 98% success rate.',
        ],
        bullets: [
          'Step 1: Receive Letter of Acceptance from a DLI',
          'Step 2: Gather financial proof (GIC + tuition receipt)',
          'Step 3: Complete medical examination',
          'Step 4: Submit study permit application online',
          'Step 5: Biometrics appointment at VFS',
          'Step 6: Receive study permit approval',
        ],
      },
    ],
  },

  australia: {
    slug: 'australia',
    name: 'Australia',
    flag: '🇦🇺',
    heroTitle: 'Study in Australia For Indian Students',
    heroSubtitle:
      'Australia combines top QS-ranked universities, a vibrant lifestyle, and generous post-study work rights — making it a premier destination for Indian students seeking global careers.',
    stats: ['Group of 8 Universities', '2-4 Year PSW Visa', 'High Graduate Employability', 'Safe & Welcoming'],
    landmark: 'Sydney Opera House',
    accentColor: '#00843D',
    tabs: [
      { id: 'why-popular', label: 'Why Study in Australia' },
      { id: 'latest-updates', label: 'Latest Updates' },
      { id: 'top-universities', label: 'Top Universities' },
      { id: 'cost-living', label: 'Cost & Living' },
      { id: 'visa-process', label: 'Visa Process' },
    ],
    sections: [
      {
        id: 'why-popular',
        title: 'Why Australia is a top choice for Indian students',
        highlight: 'Group of 8 | 2-4 Year PSW | World-Class Research | Excellent Lifestyle',
        content: [
          'Australia hosts 7 universities in the global top 100. With institutions like the University of Melbourne, ANU, and UNSW, students receive education that is recognized and respected worldwide.',
          'The Temporary Graduate Visa (subclass 485) allows international graduates to work in Australia for 2–4 years depending on qualification level and location, providing a strong pathway to skilled migration.',
        ],
        bullets: [
          'English-speaking country with multicultural cities',
          'Strong industry connections and internship programs',
          'High minimum wage for part-time student workers',
          'Beautiful climate and excellent quality of life',
        ],
      },
      {
        id: 'latest-updates',
        title: 'Latest Updates for Studying in Australia (2026 Onwards)',
        content: [
          'Australia has updated its student visa policies to ensure genuine students receive streamlined processing. The Genuine Student (GS) requirement replaces the previous GTE assessment.',
        ],
        bullets: [
          'Student visa (subclass 500) processing: 4–6 weeks',
          'PSW visa: 2 years (bachelor\'s), 3 years (master\'s), 4 years (PhD)',
          'Work rights: 48 hours per fortnight during study',
          'Regional study bonus: additional PSW year in designated areas',
        ],
      },
      {
        id: 'top-universities',
        title: 'Top Universities in Australia',
        content: ['Australia\'s Group of 8 universities are equivalent to the US Ivy League in prestige and research output.'],
        bullets: [
          'University of Melbourne — #1 in Australia',
          'Australian National University (ANU) — Top for research',
          'University of Sydney — Strong business & law programs',
          'UNSW Sydney — Leading engineering & technology',
          'Monash University — Largest university, diverse programs',
          'University of Queensland — Excellent life sciences',
        ],
      },
      {
        id: 'cost-living',
        title: 'Cost of Studying & Living in Australia',
        content: ['Australia offers competitive tuition with strong ROI through post-study work opportunities.'],
        bullets: [
          'Undergraduate tuition: AUD $20,000 – $45,000/year',
          'Postgraduate tuition: AUD $22,000 – $50,000/year',
          'Living expenses: AUD $20,000 – $27,000/year',
          'Part-time work: up to 48 hrs/fortnight',
          'Australia Awards and university scholarships available',
        ],
      },
      {
        id: 'visa-process',
        title: 'Australia Student Visa Process',
        content: ['Our team handles your complete visa application with document preparation and interview coaching.'],
        bullets: [
          'Step 1: Receive Confirmation of Enrolment (CoE)',
          'Step 2: Purchase OSHC health insurance',
          'Step 3: Complete Genuine Student assessment',
          'Step 4: Submit visa application online via ImmiAccount',
          'Step 5: Biometrics and health check',
          'Step 6: Visa grant and travel to Australia',
        ],
      },
    ],
  },

  'united-kingdom': {
    slug: 'united-kingdom',
    name: 'United Kingdom',
    flag: '🇬🇧',
    heroTitle: 'Study in the United Kingdom For Indian Students',
    heroSubtitle:
      'The UK offers prestigious degrees from world-renowned universities, shorter program durations, and the Graduate Route visa — an ideal choice for ambitious Indian students.',
    stats: ['Russell Group Universities', '1-2 Year Masters', 'Graduate Route Visa', 'Global Recognition'],
    landmark: 'Big Ben',
    accentColor: '#012169',
    tabs: [
      { id: 'why-popular', label: 'Why Study in UK' },
      { id: 'latest-updates', label: 'Latest Updates' },
      { id: 'top-universities', label: 'Top Universities' },
      { id: 'cost-living', label: 'Cost & Living' },
      { id: 'visa-process', label: 'Visa Process' },
    ],
    sections: [
      {
        id: 'why-popular',
        title: 'Why the UK remains a top study destination',
        highlight: 'Russell Group | 1-Year Masters | Graduate Route | Historic Excellence',
        content: [
          'The UK is home to Oxford, Cambridge, Imperial College London, and over 150 universities. A master\'s degree typically takes just 1 year, saving time and money compared to other destinations.',
          'The Graduate Route allows international students to stay and work in the UK for 2 years (3 years for PhD graduates) after completing their studies.',
        ],
        bullets: [
          'Shorter degree durations save overall costs',
          'Strong alumni networks across global industries',
          'Rich cultural heritage and diverse student cities',
          'English language immersion in birthplace of English',
        ],
      },
      {
        id: 'latest-updates',
        title: 'Latest Updates for Studying in the UK (2026 Onwards)',
        content: ['The UK continues to welcome international students with streamlined visa processing and expanded Graduate Route benefits.'],
        bullets: [
          'Student visa processing: 3–4 weeks standard',
          'Graduate Route: 2 years work rights post-study',
          'CAS (Confirmation of Acceptance) required from university',
          'Maintenance funds: £1,334/month (London) or £1,023/month (outside)',
        ],
      },
      {
        id: 'top-universities',
        title: 'Top Universities in the United Kingdom',
        content: ['The Russell Group represents 24 leading UK universities committed to research excellence.'],
        bullets: [
          'University of Oxford — World\'s oldest English-speaking university',
          'University of Cambridge — Top for sciences and humanities',
          'Imperial College London — #1 for engineering & medicine',
          'UCL — Diverse programs in central London',
          'University of Manchester — Strong business school',
          'University of Edinburgh — Scotland\'s top university',
        ],
      },
      {
        id: 'cost-living',
        title: 'Cost of Studying & Living in the UK',
        content: ['While tuition can be higher, the shorter program duration often makes the UK cost-competitive overall.'],
        bullets: [
          'Undergraduate tuition: £12,000 – £38,000/year',
          'Postgraduate tuition: £14,000 – £45,000/year',
          'Living expenses: £12,000 – £18,000/year',
          'Part-time work: 20 hrs/week during term',
          'Chevening, Commonwealth, and university scholarships available',
        ],
      },
      {
        id: 'visa-process',
        title: 'UK Student Visa Process',
        content: ['Our visa team ensures your application meets all UKVI requirements for a smooth approval.'],
        bullets: [
          'Step 1: Receive CAS from your university',
          'Step 2: Pay IHS health surcharge',
          'Step 3: Prepare financial evidence (28-day rule)',
          'Step 4: Complete online visa application',
          'Step 5: Biometrics at VFS Global',
          'Step 6: Receive BRP upon arrival in UK',
        ],
      },
    ],
  },

  'united-states': {
    slug: 'united-states',
    name: 'United States',
    flag: '🇺🇸',
    heroTitle: 'Study in the United States For Indian Students',
    heroSubtitle:
      'The USA is the global hub for innovation, research, and career opportunities — home to Harvard, MIT, Stanford, and thousands of programs across every field.',
    stats: ['Ivy League & Top 50', '3-Year OPT (STEM)', 'Research Excellence', 'Global Career Launch'],
    landmark: 'Statue of Liberty',
    accentColor: '#3C3B6E',
    tabs: [
      { id: 'why-popular', label: 'Why Study in USA' },
      { id: 'latest-updates', label: 'Latest Updates' },
      { id: 'top-universities', label: 'Top Universities' },
      { id: 'cost-living', label: 'Cost & Living' },
      { id: 'visa-process', label: 'Visa Process' },
    ],
    sections: [
      {
        id: 'why-popular',
        title: 'Why the USA leads global higher education',
        highlight: 'Ivy League | STEM OPT 3 Years | Cutting-Edge Research | Silicon Valley Access',
        content: [
          'The United States hosts more top-ranked universities than any other country. With flexible curricula, extensive research funding, and strong industry ties, US degrees open doors to global careers.',
          'STEM graduates can apply for a 3-year Optional Practical Training (OPT) extension, providing crucial US work experience before returning home or applying for an H-1B visa.',
        ],
        bullets: [
          'Flexible major/minor system allows interdisciplinary study',
          'Campus life with clubs, sports, and networking events',
          'Strong Indian student community at most universities',
          'Access to internships at Fortune 500 companies',
        ],
      },
      {
        id: 'latest-updates',
        title: 'Latest Updates for Studying in the USA (2026 Onwards)',
        content: ['US student visa policies continue to support genuine international students with streamlined interview scheduling.'],
        bullets: [
          'F-1 visa interview scheduling via US Embassy',
          'STEM OPT extension: 24 additional months',
          'CPT available after 1 year of study',
          'SEVIS fee: $350 for F-1 visa applicants',
        ],
      },
      {
        id: 'top-universities',
        title: 'Top Universities in the United States',
        content: ['From Ivy League to state universities, the US offers options for every academic profile and budget.'],
        bullets: [
          'MIT — #1 for engineering and technology',
          'Stanford University — Silicon Valley innovation hub',
          'Harvard University — World\'s most prestigious institution',
          'Carnegie Mellon — Top for computer science',
          'University of California, Berkeley — Public ivy excellence',
          'Northeastern University — Co-op and career-focused',
        ],
      },
      {
        id: 'cost-living',
        title: 'Cost of Studying & Living in the USA',
        content: ['While tuition varies widely, scholarships and assistantships can significantly reduce costs for deserving students.'],
        bullets: [
          'Undergraduate tuition: $20,000 – $60,000/year',
          'Postgraduate tuition: $25,000 – $70,000/year',
          'Living expenses: $12,000 – $20,000/year',
          'On-campus jobs: up to 20 hrs/week',
          'Fulbright, university merit scholarships, and TA/RA positions',
        ],
      },
      {
        id: 'visa-process',
        title: 'USA F-1 Student Visa Process',
        content: ['Our visa specialists provide mock interview preparation with a proven track record of approvals.'],
        bullets: [
          'Step 1: Receive I-20 from SEVP-certified university',
          'Step 2: Pay SEVIS fee ($350)',
          'Step 3: Complete DS-160 visa application',
          'Step 4: Pay visa application fee ($185)',
          'Step 5: Schedule and attend visa interview',
          'Step 6: Receive F-1 visa stamp in passport',
        ],
      },
    ],
  },

  germany: {
    slug: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    heroTitle: 'Study in Germany For Indian Students',
    heroSubtitle:
      'Germany offers tuition-free education at public universities, world-class engineering programs, and an 18-month post-study job seeker visa — Europe\'s best value destination.',
    stats: ['Low/No Tuition Fees', 'Engineering Hub', '18-Month Job Seeker', 'EU Career Access'],
    landmark: 'Brandenburg Gate',
    accentColor: '#FFCE00',
    tabs: [
      { id: 'why-popular', label: 'Why Study in Germany' },
      { id: 'latest-updates', label: 'Latest Updates' },
      { id: 'top-universities', label: 'Top Universities' },
      { id: 'cost-living', label: 'Cost & Living' },
      { id: 'visa-process', label: 'Visa Process' },
    ],
    sections: [
      {
        id: 'why-popular',
        title: 'Why Germany is Europe\'s top study destination',
        highlight: 'Tuition-Free Public Universities | Engineering Excellence | Strong Economy | EU Access',
        content: [
          'Most public universities in Germany charge little to no tuition fees — even for international students. You only pay a semester contribution of €150–€350, making Germany the most affordable top-tier education destination.',
          'Germany is Europe\'s largest economy with booming demand for engineers, IT professionals, and healthcare workers. The 18-month job seeker visa gives graduates ample time to find employment.',
        ],
        bullets: [
          'Over 400 universities offering 20,000+ programs',
          'Many English-taught master\'s programs available',
          'Strong automotive, engineering, and tech industries',
          'Central location in Europe for travel and networking',
        ],
      },
      {
        id: 'latest-updates',
        title: 'Latest Updates for Studying in Germany (2026 Onwards)',
        content: ['Germany continues to expand English-taught programs and streamline visa processing for Indian students.'],
        bullets: [
          'Blocked account requirement: €11,904/year (2026)',
          'Student visa processing: 6–12 weeks',
          '18-month post-study job seeker visa',
          'Part-time work: 140 full days or 280 half days/year',
        ],
      },
      {
        id: 'top-universities',
        title: 'Top Universities in Germany',
        content: ['Germany\'s TU9 alliance represents the country\'s leading technical universities.'],
        bullets: [
          'TU Munich — Germany\'s #1 technical university',
          'RWTH Aachen — Top for mechanical engineering',
          'Heidelberg University — Oldest university in Germany',
          'LMU Munich — Strong humanities and sciences',
          'University of Stuttgart — Automotive engineering hub',
          'KIT Karlsruhe — Leading computer science programs',
        ],
      },
      {
        id: 'cost-living',
        title: 'Cost of Studying & Living in Germany',
        content: ['Germany offers the best ROI for international education with minimal tuition at public universities.'],
        bullets: [
          'Tuition at public universities: €0 – €1,500/semester',
          'Private university tuition: €10,000 – €20,000/year',
          'Living expenses: €10,000 – €12,000/year',
          'Blocked account: €11,904 required for visa',
          'DAAD scholarships and university grants available',
        ],
      },
      {
        id: 'visa-process',
        title: 'Germany Student Visa Process',
        content: ['We guide you through blocked account setup, health insurance, and embassy appointment scheduling.'],
        bullets: [
          'Step 1: Receive admission letter (Zulassungsbescheid)',
          'Step 2: Open blocked account (Sperrkonto)',
          'Step 3: Purchase health insurance',
          'Step 4: Schedule visa appointment at German embassy',
          'Step 5: Submit documents and attend interview',
          'Step 6: Receive national visa and travel to Germany',
        ],
      },
    ],
  },

  'new-zealand': {
    slug: 'new-zealand',
    name: 'New Zealand',
    flag: '🇳🇿',
    heroTitle: 'Study in New Zealand For Indian Students',
    heroSubtitle:
      'New Zealand offers a safe, welcoming environment, quality research universities, and generous post-study work visas — perfect for students seeking balance between academics and lifestyle.',
    stats: ['8 Top Universities', '3-Year PSW Visa', 'Safe & Peaceful', 'Quality Research'],
    landmark: 'Sky Tower',
    accentColor: '#00274C',
    tabs: [
      { id: 'why-popular', label: 'Why Study in NZ' },
      { id: 'latest-updates', label: 'Latest Updates' },
      { id: 'top-universities', label: 'Top Universities' },
      { id: 'cost-living', label: 'Cost & Living' },
      { id: 'visa-process', label: 'Visa Process' },
    ],
    sections: [
      {
        id: 'why-popular',
        title: 'Why New Zealand is gaining popularity among Indian students',
        highlight: 'Safe Country | 3-Year PSW | Quality Education | Stunning Lifestyle',
        content: [
          'New Zealand consistently ranks among the world\'s safest and most peaceful countries. All 8 universities are in the global top 500, offering internationally recognized qualifications.',
          'The Post-Study Work Visa allows graduates to work in New Zealand for up to 3 years, with pathways to skilled migrant residence for those who secure relevant employment.',
        ],
        bullets: [
          'English-speaking country with friendly locals',
          'Smaller class sizes and personalized attention',
          'Stunning natural landscapes and outdoor lifestyle',
          'Growing tech and agriculture industries',
        ],
      },
      {
        id: 'latest-updates',
        title: 'Latest Updates for Studying in New Zealand (2026 Onwards)',
        content: ['New Zealand has updated its post-study work visa policies to attract skilled international graduates.'],
        bullets: [
          'Student visa processing: 4–6 weeks',
          'Post-study work visa: up to 3 years',
          'Work rights: 20 hrs/week during study, full-time in holidays',
          'Funds requirement: NZD $20,000/year for living expenses',
        ],
      },
      {
        id: 'top-universities',
        title: 'Top Universities in New Zealand',
        content: ['All 8 New Zealand universities are publicly funded and maintain high academic standards.'],
        bullets: [
          'University of Auckland — NZ\'s largest and highest-ranked',
          'University of Otago — Strong health sciences programs',
          'Victoria University of Wellington — Capital city location',
          'University of Canterbury — Engineering and forestry excellence',
          'Massey University — Agriculture and veterinary science',
          'AUT — Industry-focused and career-oriented',
        ],
      },
      {
        id: 'cost-living',
        title: 'Cost of Studying & Living in New Zealand',
        content: ['New Zealand offers competitive tuition with a high quality of life and strong post-study work options.'],
        bullets: [
          'Undergraduate tuition: NZD $22,000 – $35,000/year',
          'Postgraduate tuition: NZD $26,000 – $40,000/year',
          'Living expenses: NZD $18,000 – $22,000/year',
          'Part-time work: 20 hrs/week during term',
          'NZ Excellence Awards and university scholarships',
        ],
      },
      {
        id: 'visa-process',
        title: 'New Zealand Student Visa Process',
        content: ['Our team assists with complete visa documentation and financial evidence preparation.'],
        bullets: [
          'Step 1: Receive Offer of Place from NZ institution',
          'Step 2: Pay tuition fees and receive receipt',
          'Step 3: Prepare financial evidence (NZD $20,000+)',
          'Step 4: Complete medical and chest X-ray',
          'Step 5: Submit visa application online via Immigration NZ',
          'Step 6: Receive visa approval and travel to NZ',
        ],
      },
    ],
  },

  france: createDestination({
    slug: 'france',
    name: 'France',
    flag: '🇫🇷',
    accentColor: '#002395',
    heroSubtitle:
      'France offers prestigious grandes écoles, affordable public universities, and a vibrant student life in the heart of Europe.',
    stats: ['Top Grandes Écoles', 'Low Public Tuition', 'EU Access', 'Rich Culture'],
  }),

  denmark: createDestination({
    slug: 'denmark',
    name: 'Denmark',
    flag: '🇩🇰',
    accentColor: '#C8102E',
    heroSubtitle:
      'Denmark combines innovative teaching, English-taught programs, and one of Europe\'s highest standards of living.',
    stats: ['Innovative Education', 'English Programs', 'High Quality of Life', 'EU Work Rights'],
  }),

  sweden: createDestination({
    slug: 'sweden',
    name: 'Sweden',
    flag: '🇸🇪',
    accentColor: '#006AA7',
    heroSubtitle:
      'Sweden is known for research excellence, sustainability-focused education, and strong tech and engineering industries.',
    stats: ['Research Excellence', 'English-Taught', 'Innovation Hub', 'Post-Study Options'],
  }),

  finland: createDestination({
    slug: 'finland',
    name: 'Finland',
    flag: '🇫🇮',
    accentColor: '#003580',
    heroSubtitle:
      'Finland ranks among the world\'s best education systems with affordable tuition and a safe, student-friendly environment.',
    stats: ['World-Class Education', 'Affordable Fees', 'Safe & Modern', 'English Programs'],
  }),

  latvia: createDestination({
    slug: 'latvia',
    name: 'Latvia',
    flag: '🇱🇻',
    accentColor: '#9E3039',
    heroSubtitle:
      'Latvia offers affordable EU education, English-taught degrees, and a gateway to careers across Europe.',
    stats: ['Affordable EU Study', 'English Programs', 'EU Degrees', 'Central Location'],
  }),

  lithuania: createDestination({
    slug: 'lithuania',
    name: 'Lithuania',
    flag: '🇱🇹',
    accentColor: '#006A44',
    heroSubtitle:
      'Lithuania provides cost-effective European education with growing English programs and a dynamic student community.',
    stats: ['Low Tuition', 'EU Recognition', 'English Courses', 'Growing Hub'],
  }),

  singapore: createDestination({
    slug: 'singapore',
    name: 'Singapore',
    flag: '🇸🇬',
    accentColor: '#EF3340',
    heroSubtitle:
      'Singapore is Asia\'s education hub with top global universities, strong industry links, and excellent graduate outcomes.',
    stats: ['Asia\'s Top Hub', 'Global Universities', 'Strong Economy', 'Safe City'],
  }),

  cyprus: createDestination({
    slug: 'cyprus',
    name: 'Cyprus',
    flag: '🇨🇾',
    accentColor: '#D57800',
    heroSubtitle:
      'Cyprus offers affordable Mediterranean study options with EU-aligned degrees and a warm, welcoming environment.',
    stats: ['Affordable Study', 'EU Standards', 'Mediterranean Lifestyle', 'English Programs'],
  }),

  malta: createDestination({
    slug: 'malta',
    name: 'Malta',
    flag: '🇲🇹',
    accentColor: '#CF142B',
    heroSubtitle:
      'Malta combines English-speaking education, EU membership benefits, and a sunny island lifestyle for international students.',
    stats: ['English Speaking', 'EU Member', 'Affordable Living', 'Safe Environment'],
  }),

  mauritius: createDestination({
    slug: 'mauritius',
    name: 'Mauritius',
    flag: '🇲🇺',
    accentColor: '#EA2839',
    heroSubtitle:
      'Mauritius offers affordable British-pattern education, tropical living, and growing opportunities for Indian students.',
    stats: ['Affordable Fees', 'English Medium', 'Tropical Island', 'British Curriculum'],
  }),
};

export function getDestination(slug) {
  return destinationData[slug] || null;
}
