export interface Project {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  focus: string;
  images: string[];
  externalLink?: string;
  details?: {
    problem: string;
    solution: string;
    challenges?: { title: string; points: string[] }[];
    hybridDesign?: string;
    systemFlow?: string[];
    features: { title: string; description: string }[];
    realWorldContext?: string[];
    fieldInsights?: string[];
    techStack: string[];
    outcome?: string;
    credibility?: string;
    closingStatement?: string;
    secondaryLink?: { label: string; url: string; icon?: 'playstore' | 'globe' };
  };
}

export const projects: Project[] = [
  {
    slug: "taybly",
    title: "Taybly — AI Timetable System",
    description: "Designed and built a constraint-based scheduling system for schools and colleges. Handles teachers, rooms, subjects, and complex constraints.",
    tags: ["Systems Design", "AI Solver", "Product Ownership"],
    focus: "Turning operational chaos into structured systems.",
    images: ["/projects/taybly-1.png", "/projects/taybly-2.png", "/projects/taybly-3.png"],
    externalLink: "https://www.taybly.com/",
    details: {
      problem: "Timetable scheduling in Indian institutions is traditionally a manual nightmare, taking administrators 3–7 days of trial-and-error in Excel. Legacy desktop tools are outdated, and generic ERP modules treat scheduling as an afterthought, leading to mid-semester room clashes, teacher burnout, and chaotic substitution workflows.",
      solution: "A modern, cloud-native platform built from the ground up for complex academic scheduling. Taybly reduces days of manual labor to minutes by combining world-class optimization engines with a premium, AI-native user experience.",
      challenges: [
        { 
          title: "Legacy Chaos", 
          points: [
            "Replacing 20-year-old Windows desktop apps (aSc, FET) with zero-install cloud SaaS.",
            "Handling fragmented curriculum structures (CBSE, ICSE, AICTE, UGC) out of the box.",
            "Normalizing massive institutional data imports with 2-step verification."
          ] 
        },
        { 
          title: "Constraint Complexity", 
          points: [
            "Coordinating 18+ constraint categories including Room Capacity, Faculty Load, and Consecutive Class limits.",
            "Balancing conflicting requirements from 100+ faculty members simultaneously.",
            "Ensuring deterministic output (same input always produces same result) for debugging."
          ] 
        }
      ],
      hybridDesign: "Taybly features a unique Dual-Solver Architecture. A high-speed JavaScript Greedy Solver runs in-process (<100ms) to provide instant visual previews of changes, while a production-grade Java/Timefold engine handles heavy-duty optimization in the cloud. This ensures the UI feels alive while delivering mathematically optimized results.",
      systemFlow: [
        "Data Intake → Production-grade CSV/Excel validation",
        "Constraint Config → Priority sliders for 18+ categories",
        "Hybrid Solve → Greedy Preview → Timefold Finalization",
        "Management → AI-powered substitution & fairness tracking",
        "Multi-Export → Publication-quality PDF and iCal sync"
      ],
      features: [
        { title: "AI Co-Pilot (Claude)", description: "Powered by Anthropic, providing pre-scan health checks, plain-English conflict explanations, and natural language queries." },
        { title: "Substitution Engine", description: "Recommends substitutes based on qualifications and workload, featuring fairness tracking and automated email alerts." },
        { title: "18 Constraint Engine", description: "Deepest constraint system in the market, handling everything from faculty leave to room-type requirements." },
        { title: "Analytics Dashboard", description: "Real-time visualization of faculty workload balance and room occupancy rates via Recharts." }
      ],
      realWorldContext: [
        "Highly fragmented Indian institutional landscape.",
        "Zero-tolerance for data loss or overlapping schedules.",
        "Requirement for offline-compatible iCal sync for faculty.",
        "Need for bulk ZIP exports for large department coordination."
      ],
      fieldInsights: [
        "Scheduling is the operational heartbeat of an institution, not just an ERP module.",
        "Faculty retention is directly impacted by balanced scheduling and fair substitution duty.",
        "Administrators value 'What-If' speed over perfect optimization in early planning stages."
      ],
      techStack: ["Next.js 16", "TypeScript", "Neon PostgreSQL", "Prisma v7", "Timefold (Java)", "Claude AI", "Razorpay"],
      outcome: "Successfully reduced scheduling time from 5 days to 3 minutes for pilot institutions while ensuring 100% hard-constraint satisfaction.",
      credibility: "Developed with feedback from administrators across AICTE and UGC affiliated colleges.",
      closingStatement: "I believe that when you solve for scheduling, you're not just moving boxes—you're optimizing the daily lives of thousands of students and teachers."
    }
  },
  {
    slug: "pathology-lims",
    title: "Pathology LIMS System",
    description: "A hybrid-first LIMS system designed for unreliable infrastructure environments, ensuring uninterrupted lab operations regardless of internet connectivity.",
    tags: ["Systems Design", "Hybrid Architecture", "Healthcare"],
    focus: "Reliability in low-infrastructure environments.",
    images: ["/projects/lims-1.png", "/projects/lims-2.png", "/projects/lims-3.png"],
    details: {
      problem: "In tier-2/3 cities, pathology labs operate where internet reliability is inconsistent—but accuracy and speed are critical. Existing systems force a trade-off: offline systems are fragmented and unscalable, while cloud systems fail entirely during connectivity drops.",
      solution: "A hybrid-first architecture that ensures uninterrupted lab operations while maintaining cloud-level coordination and reporting. This project explores how to build systems that operate in imperfect environments—where infrastructure is unreliable, but outcomes are critical.",
      challenges: [
        { 
          title: "Offline Systems", 
          points: ["No real-time sync across centers", "Manual backups leading to data loss risk", "Hard to scale and manage centrally"] 
        },
        { 
          title: "Cloud-Only Systems", 
          points: ["Operations halt during outages", "Latency issues in real-time workflows", "Poor fit for low-infrastructure environments"] 
        }
      ],
      hybridDesign: "The system is built on an offline-first foundation. The local system runs independently, while a custom sync engine pushes data to the cloud whenever internet is available. Conflict resolution ensures consistency, enabling multi-center visibility, centralized reporting, and automated backups without depending on a constant connection.",
      systemFlow: [
        "Sample collected → Stored locally immediately",
        "Tests performed → Result data captured offline",
        "Connectivity detected → Automatic background sync to cloud",
        "Reports generated → Accessible across all centers instantly"
      ],
      features: [
        { title: "Local-First Data Handling", description: "Ensures uninterrupted operation even during extended internet outages." },
        { title: "Sync Engine", description: "Automatically syncs lab data to the cloud when connectivity resumes with robust conflict resolution." },
        { title: "Analyzer Integration", description: "Removes manual data entry errors by pulling directly from hardware regardless of connectivity state." },
        { title: "Inventory System", description: "Tracks stock locally with cloud-level aggregation for multi-center management." }
      ],
      realWorldContext: [
        "Intermittent internet connectivity as a baseline expectation.",
        "Low digital literacy among ground staff requiring intuitive, fail-safe UIs.",
        "Heavy hardware dependency for analyzer data integration.",
        "Zero-tolerance for data inaccuracies in high-stakes healthcare."
      ],
      fieldInsights: [
        "Labs prioritize reliability and uptime over flashy features.",
        "Staff prefer simple, clear workflows over automation complexity.",
        "Data errors are viewed as significantly more damaging than slight reporting delays."
      ],
      techStack: ["React", "Node.js", "PostgreSQL", "MQTT for Hardware", "Docker", "Custom Sync Logic"],
      outcome: "Zero workflow disruption during internet outages, reduced dependency on manual logs, and improved cross-center coordination without infrastructure upgrades.",
      credibility: "Developed alongside full-time work, with continuous feedback from practicing doctors and lab technicians.",
      closingStatement: "I'm interested in building systems that operate in imperfect environments—where infrastructure is unreliable, but outcomes are critical."
    }
  },
  {
    slug: "torqup",
    title: "TorqUp — Automotive Intelligence Platform",
    description: "A unified platform for automotive enthusiasts to stay updated, make better decisions, and engage with the community—without fragmentation.",
    tags: ["Automotive Hub", "AI Integration", "Product Strategy"],
    focus: "Scaling digital ecosystems for enthusiast communities.",
    images: ["/projects/torqup-1.png", "/projects/torqup-2.png", "/projects/torqup-3.png"],
    externalLink: "https://torqup.in",
    details: {
      problem: "The automotive ecosystem is highly fragmented. News is scattered across platforms, reliable product recommendations are hard to find, and community content is often unfiltered. Users spend more time searching for information than using it, lacking a single place for tools and discussions.",
      solution: "TorqUp brings together content, tools, and community into a single, cohesive system designed for enthusiasts. It solves the chaos of fragmented automotive information, combining news, discovery, tools, and community into one platform.",
      challenges: [
        { 
          title: "Data Chaos", 
          points: [
            "Structuring highly unstructured automotive data from multiple sources.",
            "Balancing multiple feature layers without overwhelming the user.",
            "Ensuring relevance in search and recommendations across diverse vehicle categories."
          ] 
        },
        { 
          title: "Community Quality", 
          points: [
            "Maintaining high quality in user-generated content via context-aware filtering.",
            "Building trust in recommendation systems through community vetting.",
            "Scaling engagement while keeping the utility tools front and center."
          ] 
        }
      ],
      hybridDesign: "TorqUp is not just a feature set—it's a multi-layered system. It integrates a Content Layer (news), Discovery Layer (recommendations), Utility Layer (rescue tools), Community Layer (UGC), and an Intelligence Layer (AI assistance) into a single unified architecture.",
      systemFlow: [
        "Aggregation → News engine pulls from across the ecosystem",
        "Discovery → Natural language search for products & gear",
        "Utility → Real-time GPS rescue and vehicle comparisons",
        "Community → Filtered enthusiast wall and wallpaper sharing",
        "Intelligence → AI Assistant providing daily car knowledge"
      ],
      features: [
        { title: "Aggregated News Engine", description: "Brings updates into a single, structured feed to eliminate fragmentation." },
        { title: "Natural Language Search", description: "Plain-language querying (e.g., 'best tyres for i20') instead of manual forum searching." },
        { title: "Product Discovery System", description: "Vetted recommendations surfaced in one place, reducing the need for multiple forums." },
        { title: "Rescue System", description: "Real-time breakdown assistance listing the 10 nearest service options instantly." },
        { title: "AI Automotive Assistant", description: "Daily updated AI guide answering complex queries about vehicle maintenance and buying." },
        { title: "Filtered Community Carousel", description: "Instagram-style feed with context-aware filtering to ensure relevant, high-quality content." }
      ],
      realWorldContext: [
        "Enthusiasts need structured ecosystems, not more isolated apps.",
        "Fragmentation leads to high cognitive load and search-time fatigue.",
        "Visual culture (wallpapers/galleries) is a core part of the enthusiast identity.",
        "Emergency situations require instant, reliable utility tools (Rescue System)."
      ],
      fieldInsights: [
        "Users prefer clarity over depth in information discovery.",
        "Trust is the most critical currency in automotive recommendation systems.",
        "Utility (rescue/tools) serves as a powerful retention hook for community engagement.",
        "Discovery is significantly more valuable than raw, unorganized information."
      ],
      techStack: ["Kotlin", "Jetpack Compose", "Material 3", "Firebase", "Room + SQLCipher", "ML Kit", "Google Places API"],
      outcome: "Built a production-grade ecosystem that scaled to 500+ daily active users, proving that enthusiasts crave structured journeys over fragmented information.",
      credibility: "Solo builder — from product strategy and UX design to full-stack development and AI integration.",
      closingStatement: "TorqUp reflects my interest in building structured ecosystems in fragmented domains—where users currently rely on disconnected tools and manual effort.",
      secondaryLink: { 
        label: "Get it on Play Store", 
        url: "https://play.google.com/store/apps/details?id=com.fluxorlabs.torqup.app&pcampaignid=web_share",
        icon: "playstore"
      }
    }
  }
];
