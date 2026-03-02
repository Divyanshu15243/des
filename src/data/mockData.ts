export interface City {
  id: string;
  name: string;
  slug: string;
  image?: string;
  status: "published" | "unpublished";
}

export interface Roadshow {
  id: string;
  title: string;
  slug: string;
  cityId: string;
  cityName: string;
  venue: string;
  startDate: string;
  endDate: string;
  shortDescription: string;
  fullDescription: string;
  bannerImage: string;
  galleryImages: string[];
  tags: string[];
  registrationLink?: string;
  status: "published" | "draft";
  metaTitle?: string;
  metaDescription?: string;
  agenda?: { time: string; title: string; description?: string }[];
  speakers?: { name: string; role: string; image?: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  author: string;
  publishDate: string;
  featuredImage: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: "published" | "draft";
  metaTitle?: string;
  metaDescription?: string;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  order: number;
  status: "published" | "unpublished";
}

export interface AwardItem {
  id: string;
  title: string;
  year: string;
  image?: string;
  description: string;
  order: number;
  status: "published" | "unpublished";
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

// Mock Cities
export const mockCities: City[] = [
  { id: "1", name: "Mumbai", slug: "mumbai", status: "published" },
  { id: "2", name: "Pune", slug: "pune", status: "published" },
  { id: "3", name: "Delhi", slug: "delhi", status: "published" },
  { id: "4", name: "Bangalore", slug: "bangalore", status: "published" },
  { id: "5", name: "Hyderabad", slug: "hyderabad", status: "published" },
  { id: "6", name: "Chennai", slug: "chennai", status: "published" },
];

// Mock Roadshows
export const mockRoadshows: Roadshow[] = [
  {
    id: "1",
    title: "Exclusive Dubai Real Estate Opportunity for Mumbai Investors",
    slug: "dubai-real-estate-mumbai-2026",
    cityId: "1",
    cityName: "Mumbai",
    venue: "The Taj Mahal Palace, Mumbai",
    startDate: "2026-03-15",
    endDate: "2026-03-16",
    shortDescription: "Invest in tax-free, dollar-linked real estate in one of the world's fastest-growing global property markets.",
    fullDescription: `<p>Join us for an exclusive two-day roadshow featuring premium Dubai real estate opportunities tailored for Mumbai-based investors.</p>
<p>Discover properties near world-class landmarks like the Burj Khalifa, Palm Jumeirah, and Dubai Marina. Learn about rental yields of 6%–11%, tax-free income, and flexible payment plans.</p>
<h3>Why Attend?</h3>
<ul>
<li>Direct access to top Dubai developers</li>
<li>Exclusive launch prices not available elsewhere</li>
<li>One-on-one consultation with investment advisors</li>
<li>Free property portfolio analysis</li>
</ul>`,
    bannerImage: "/roadshow-1.jpg",
    galleryImages: [],
    tags: ["Dubai", "Investment", "Tax-Free"],
    registrationLink: "#register",
    status: "published",
    metaTitle: "Dubai Real Estate Roadshow Mumbai 2026",
    metaDescription: "Exclusive Dubai property investment opportunities for Mumbai investors. Tax-free returns, 6-11% rental yields.",
    agenda: [
      { time: "10:00 AM", title: "Registration & Welcome Coffee" },
      { time: "10:30 AM", title: "Dubai Market Overview 2026", description: "Key trends, growth areas, and investment hotspots" },
      { time: "11:30 AM", title: "Developer Presentations", description: "Exclusive projects from top Dubai developers" },
      { time: "1:00 PM", title: "Networking Lunch" },
      { time: "2:00 PM", title: "One-on-One Consultations", description: "Meet our advisors for personalized portfolio analysis" },
      { time: "4:00 PM", title: "Closing & Q&A" },
    ],
    speakers: [
      { name: "Rahul Sharma", role: "Head of International Sales" },
      { name: "Ahmed Al-Maktoum", role: "Senior Property Consultant" },
      { name: "Priya Patel", role: "Investment Advisor" },
    ],
  },
  {
    id: "2",
    title: "Dubai Property Roadshow in Pune",
    slug: "dubai-property-roadshow-pune-2026",
    cityId: "2",
    cityName: "Pune",
    venue: "JW Marriott Hotel, Pune",
    startDate: "2026-02-07",
    endDate: "2026-02-08",
    shortDescription: "What if your next Pune investment wasn't in India? Explore Dubai's booming real estate with ROI of 8%-15%+.",
    fullDescription: `<p>DestinationROI brings an exclusive Dubai property roadshow to Pune. Discover how savvy Pune investors are diversifying their portfolios with high-yield Dubai properties.</p>
<p>Average rental yields of 6%–11% (often tax-free), ROI in prime markets of 8%–15%+. Your home near Ferrari World, Yas Island, and upcoming Disney Land.</p>`,
    bannerImage: "/roadshow-2.jpg",
    galleryImages: [],
    tags: ["Dubai", "Pune", "ROI"],
    registrationLink: "#register",
    status: "published",
    agenda: [
      { time: "10:00 AM", title: "Doors Open & Registration" },
      { time: "10:30 AM", title: "Investment Landscape: Dubai vs India" },
      { time: "12:00 PM", title: "Premium Project Showcase" },
      { time: "1:30 PM", title: "Lunch & Networking" },
      { time: "2:30 PM", title: "Private Consultations" },
    ],
  },
  {
    id: "3",
    title: "Dubai Real Estate Investment Summit – Delhi",
    slug: "dubai-investment-summit-delhi-2026",
    cityId: "3",
    cityName: "Delhi",
    venue: "The Oberoi, New Delhi",
    startDate: "2026-04-20",
    endDate: "2026-04-21",
    shortDescription: "Premium Dubai properties with guaranteed rental returns. Explore the future of real estate investment.",
    fullDescription: `<p>Delhi's most anticipated real estate investment event. Meet top Dubai developers face-to-face and explore properties with guaranteed returns.</p>`,
    bannerImage: "/roadshow-1.jpg",
    galleryImages: [],
    tags: ["Dubai", "Delhi", "Summit"],
    status: "published",
  },
  {
    id: "4",
    title: "Bangalore Dubai Property Expo 2026",
    slug: "bangalore-dubai-expo-2026",
    cityId: "4",
    cityName: "Bangalore",
    venue: "ITC Gardenia, Bangalore",
    startDate: "2025-12-10",
    endDate: "2025-12-11",
    shortDescription: "Past event: Explore our gallery from the successful Bangalore Dubai Property Expo.",
    fullDescription: `<p>A highly successful event that brought together Bangalore's top investors with Dubai's premier developers.</p>`,
    bannerImage: "/roadshow-2.jpg",
    galleryImages: [],
    tags: ["Dubai", "Bangalore", "Past"],
    status: "published",
  },
];

// Mock Blog Posts
export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Why Dubai Real Estate is the Smartest Investment in 2026",
    slug: "why-dubai-real-estate-smartest-investment-2026",
    author: "DestinationROI Team",
    publishDate: "2026-02-15",
    featuredImage: "/blog-1.jpg",
    excerpt: "Dubai's real estate market continues to outperform global benchmarks. Here's why Indian investors are flocking to the emirate.",
    content: `<p>Dubai's real estate market has shown remarkable resilience and growth over the past few years, consistently outperforming global property benchmarks.</p>
<h2>Key Advantages of Dubai Real Estate</h2>
<p>Tax-free income, high rental yields, world-class infrastructure, and a strategic location make Dubai one of the most attractive investment destinations globally.</p>
<h3>1. Tax-Free Returns</h3>
<p>Unlike most global cities, Dubai offers zero property tax, zero capital gains tax, and zero income tax on rental earnings.</p>
<h3>2. High Rental Yields</h3>
<p>Average rental yields in Dubai range from 6% to 11%, significantly higher than major cities like London (3-4%), New York (2-3%), or Mumbai (2-3%).</p>
<h3>3. Dollar-Linked Investment</h3>
<p>The UAE Dirham is pegged to the US Dollar, providing currency stability and protection against INR depreciation.</p>`,
    category: "Investment",
    tags: ["Dubai", "Investment", "2026"],
    status: "published",
  },
  {
    id: "2",
    title: "Top 5 Areas to Buy Property in Dubai for Maximum ROI",
    slug: "top-5-areas-buy-property-dubai-maximum-roi",
    author: "DestinationROI Team",
    publishDate: "2026-02-10",
    featuredImage: "/blog-2.jpg",
    excerpt: "From Dubai Marina to JVC, discover the best neighborhoods offering the highest returns on real estate investment.",
    content: `<p>Choosing the right location is crucial for maximizing your return on investment in Dubai's dynamic real estate market.</p>
<h2>1. Dubai Marina</h2><p>Consistently one of the most popular areas...</p>
<h2>2. Jumeirah Village Circle (JVC)</h2><p>Affordable entry point with high yields...</p>
<h2>3. Business Bay</h2><p>Prime location next to Downtown Dubai...</p>
<h2>4. Dubai Hills Estate</h2><p>Family-friendly community with excellent amenities...</p>
<h2>5. Palm Jumeirah</h2><p>Iconic address with premium rental returns...</p>`,
    category: "Market Analysis",
    tags: ["Dubai", "ROI", "Property"],
    status: "published",
  },
  {
    id: "3",
    title: "How Indian Investors Can Buy Property in Dubai: Complete Guide",
    slug: "indian-investors-buy-property-dubai-complete-guide",
    author: "DestinationROI Team",
    publishDate: "2026-01-28",
    featuredImage: "/blog-1.jpg",
    excerpt: "Step-by-step guide for Indian nationals looking to invest in Dubai real estate. From documentation to financing.",
    content: `<p>Buying property in Dubai as an Indian investor is straightforward...</p>`,
    category: "Guide",
    tags: ["Guide", "India", "Dubai"],
    status: "published",
  },
];

// Mock Features
export const mockFeatures: FeatureItem[] = [
  { id: "1", title: "Expert Market Analysis", description: "Our team provides in-depth analysis of Dubai's real estate market to help you make informed investment decisions.", icon: "BarChart3", order: 1, status: "published" },
  { id: "2", title: "Curated Property Selection", description: "We handpick the best properties from top developers, ensuring quality and value for every investor.", icon: "Building2", order: 2, status: "published" },
  { id: "3", title: "End-to-End Support", description: "From property selection to legal documentation and post-purchase management, we handle everything.", icon: "Shield", order: 3, status: "published" },
  { id: "4", title: "Exclusive Roadshow Events", description: "Meet developers face-to-face at our exclusive roadshow events across major Indian cities.", icon: "Calendar", order: 4, status: "published" },
  { id: "5", title: "High ROI Properties", description: "We focus on properties with proven rental yields of 6-11% and capital appreciation potential.", icon: "TrendingUp", order: 5, status: "published" },
  { id: "6", title: "Flexible Payment Plans", description: "Access developer payment plans with as low as 10% down payment and multi-year installments.", icon: "CreditCard", order: 6, status: "published" },
];

// Mock Awards
export const mockAwards: AwardItem[] = [
  { id: "1", title: "Best International Property Consultant", year: "2025", description: "Awarded for excellence in connecting Indian investors with Dubai's premium real estate opportunities.", order: 1, status: "published" },
  { id: "2", title: "Top Real Estate Roadshow Organizer", year: "2025", description: "Recognized for hosting the most impactful real estate roadshows across India.", order: 2, status: "published" },
  { id: "3", title: "Excellence in Customer Service", year: "2024", description: "Awarded for outstanding investor support and after-sales service.", order: 3, status: "published" },
  { id: "4", title: "Best Property Investment Platform", year: "2024", description: "Recognized as the leading platform for international real estate investment from India.", order: 4, status: "published" },
];
