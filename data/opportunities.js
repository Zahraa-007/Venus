const opportunities = [
  {
    id: "reading-buddies",
    category: "Education",
    organization: "Bright Futures Foundation",
    title: "Reading Buddies for Young Learners",
    description:
      "Help children build confidence and a love of reading through friendly weekly sessions.",
    fullDescription:
      "Spend a few hours each week reading with children at our neighborhood learning center. Volunteers help learners practice at their own pace, choose books they enjoy, and build confidence in a warm, supportive environment. Training and reading materials are provided.",
    location: "Al Noor Community Center",
    type: "On-site",
    volunteers: 8,
    deadline: "Dec 12, 2026",
    schedule: "Saturdays, 10:00 AM–12:00 PM",
    requirements: [
      "Enjoy working with children",
      "Commit to one session each week",
      "Complete a short orientation",
    ],
    organizationDescription:
      "Bright Futures Foundation supports inclusive learning and literacy programs for children and families.",
    icon: "book-open-page-variant",
  },
  {
    id: "community-clinic",
    category: "Healthcare",
    organization: "Care Together Network",
    title: "Community Health Day",
    description:
      "Welcome visitors and support a local team delivering free community health checks.",
    fullDescription:
      "Join Care Together Network for a welcoming, well-organized community health day. Volunteers help guests find the right station, prepare information packs, and support the event team. Clinical services are provided by qualified health professionals; volunteers do not provide medical care.",
    location: "Al Amal Family Clinic",
    type: "On-site",
    volunteers: 12,
    deadline: "Dec 4, 2026",
    schedule: "Dec 19, 9:00 AM–2:00 PM",
    requirements: [
      "Comfortable welcoming community members",
      "Attend a 30-minute briefing",
      "No medical experience required",
    ],
    organizationDescription:
      "Care Together Network connects local communities with accessible health and wellbeing initiatives.",
    icon: "heart-pulse",
  },
  {
    id: "coastal-cleanup",
    category: "Environment",
    organization: "Green Steps Collective",
    title: "Coastal Clean-up & Nature Count",
    description:
      "Protect our shoreline, record litter data, and learn about local coastal habitats.",
    fullDescription:
      "Take part in a guided shoreline clean-up followed by a simple nature count. Green Steps Collective supplies gloves, bags, and a short safety briefing. The data collected helps local partners understand and reduce pollution.",
    location: "North Shore Meeting Point",
    type: "On-site",
    volunteers: 20,
    deadline: "Dec 16, 2026",
    schedule: "Dec 20, 8:30 AM–11:30 AM",
    requirements: [
      "Wear comfortable outdoor clothing",
      "Bring a refillable water bottle",
      "Under-18s must attend with a guardian",
    ],
    organizationDescription:
      "Green Steps Collective brings neighbors together to care for local nature and public spaces.",
    icon: "leaf",
  },
  {
    id: "neighbors-connect",
    category: "Community",
    organization: "Neighbors First Team",
    title: "A Friendly Call, A Brighter Day",
    description:
      "Offer friendly conversation and connection to older neighbors from home.",
    fullDescription:
      "Make a difference with a regular, friendly phone call to an older neighbor who would appreciate more connection. The team provides an introduction, conversation guidance, and ongoing support. Calls are scheduled through the organization and personal contact details are not shared.",
    location: "Remote",
    type: "Remote",
    volunteers: 6,
    deadline: "Jan 5, 2027",
    schedule: "One 20-minute call each week",
    requirements: [
      "Reliable access to a phone",
      "Complete a short online orientation",
      "Respect privacy and safeguarding guidance",
    ],
    organizationDescription:
      "Neighbors First Team creates practical ways for people to feel included and supported in their community.",
    icon: "account-group",
  },
  {
    id: "digital-skills",
    category: "Technology",
    organization: "Open Door Digital",
    title: "Digital Skills Drop-in",
    description:
      "Help adults feel more confident using everyday devices and online services.",
    fullDescription:
      "Support a welcoming drop-in where adults can ask questions about smartphones, email, and everyday digital tools. Volunteers listen first and help visitors learn at their own pace. Sessions are supported by an experienced coordinator.",
    location: "Hybrid — City Library or online",
    type: "Hybrid",
    volunteers: 5,
    deadline: "Jan 10, 2027",
    schedule: "Flexible, two-hour sessions",
    requirements: [
      "Comfortable using common digital tools",
      "Patient, supportive communication",
      "Attend a volunteer orientation",
    ],
    organizationDescription:
      "Open Door Digital helps people take part in an increasingly connected world through friendly, practical learning.",
    icon: "laptop",
  },
];

export default opportunities;
