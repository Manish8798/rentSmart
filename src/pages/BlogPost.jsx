import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Footer from "../components/Footer";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  // Complete blog posts data - matching Blog.jsx
  const blogPosts = [
    {
      id: 1,
      title:
        "PS5 on Rent in Delhi NCR: Complete Guide to PlayStation 5 Rental Service 2025",
      excerpt:
        "Looking for PS5 on rent in Delhi? Get Sony PlayStation 5 console starting ₹999/day with free delivery. Weekly deals at ₹2499 and monthly rental at ₹5249. Complete rental guide with pricing, delivery, and setup included.",
      fullContent:
        "PS5 on rent has become the smartest way to enjoy next-generation gaming in Delhi NCR without the hefty ₹54,990 purchase price. At RentSmart, we offer the most competitive PS5 rental rates starting just ₹999 per day.\n\n**PS5 Rental Pricing in Delhi NCR:**\n• Daily Rental: ₹999/day\n• Weekly Special: ₹2499 (Save ₹4501!)\n• Monthly Deal: ₹5249 (41% discount - Save ₹3,721!)\n\n**What's Included with PS5 Rental:**\n• Sony PlayStation 5 Console (Latest Model)\n• DualSense Wireless Controller\n• All necessary cables and power adapter\n• Free home delivery and setup\n• 24/7 customer support\n• Game recommendations\n\n**Why Choose PS5 Rental Over Purchase?**\nWith the PS5 retail price at ₹54,990, renting makes financial sense for casual gamers. You can rent for 54 days before reaching the purchase price! Most gamers only need the console for specific game releases or during holidays.\n\n**Popular PS5 Games Available:**\n• Spider-Man: Miles Morales\n• God of War Ragnarök\n• Horizon Forbidden West\n• Call of Duty: Modern Warfare III\n• FIFA 24\n• Gran Turismo 7\n\n**PS5 Rental Service Areas:**\nWe deliver PS5 consoles across Delhi, Gurgaon, Noida, Faridabad, and Ghaziabad. Same-day delivery available for orders placed before 6 PM.\n\n**Booking Process:**\n1. Call/WhatsApp: +91-8448347366\n2. Select rental duration\n3. Confirm delivery address\n4. Enjoy gaming!\n\nRent PS5 today and experience the future of gaming without breaking the bank!",
      category: "gaming",
      author: "RentSmart Gaming Team",
      date: "January 15, 2025",
      readTime: "6 min read",
      icon: "🎮",
      featured: true,
    },
    {
      id: 2,
      title:
        "PS5 vs Xbox Series X Rental: Which Gaming Console Should You Rent in 2025?",
      excerpt:
        "Comparing PS5 and Xbox Series X rentals in Delhi. PS5 rental starts ₹999/day with exclusive games like Spider-Man and God of War. Complete comparison guide for gaming console rentals.",
      fullContent:
        "When deciding between PS5 on rent vs Xbox Series X rental, several factors come into play. Both consoles offer next-generation gaming, but they cater to different preferences and gaming styles.\n\n**PS5 Rental Advantages:**\n• Exclusive games: Spider-Man, God of War, Horizon series\n• Superior DualSense haptic feedback\n• Faster SSD loading times\n• Better VR support with PSVR2\n• Larger game library\n\n**Xbox Series X Rental Benefits:**\n• Game Pass Ultimate subscription value\n• Better backward compatibility\n• More powerful hardware specs\n• Smart Delivery technology\n• Cross-platform play with PC\n\n**Rental Pricing Comparison:**\n• PS5 Rental: ₹999/day, ₹2499/week, ₹5249/month\n• Xbox Series X: ₹900/day, ₹2299/week, ₹4999/month\n\n**Which Should You Choose?**\nFor exclusive gaming experiences and innovative controller features, PS5 rental is the clear winner. The PlayStation ecosystem offers unmatched exclusives that justify the rental cost.\n\nBoth consoles are available for rent in Delhi NCR with free delivery and setup included.",
      category: "gaming",
      author: "RentSmart Gaming Team",
      date: "January 12, 2025",
      readTime: "5 min read",
      icon: "⚡",
      featured: false,
    },
    {
      id: 3,
      title: "Best PS5 Games to Play During Your Rental Period",
      excerpt:
        "Maximize your PS5 rental experience with these must-play exclusive games. From Spider-Man to God of War Ragnarök, discover the best PlayStation 5 games for your rental period.",
      fullContent:
        "Getting a PS5 on rent? Here are the must-play games that make your rental investment worthwhile:\n\n**PlayStation Exclusives (Must-Play):**\n• Spider-Man: Miles Morales - Perfect showcase of PS5 capabilities\n• God of War Ragnarök - Epic Norse mythology adventure\n• Horizon Forbidden West - Stunning open-world experience\n• Ratchet & Clank: Rift Apart - Demonstrates SSD speed\n• Ghost of Tsushima Director's Cut - Beautiful samurai tale\n\n**Popular Multi-Platform Games:**\n• Call of Duty: Modern Warfare III\n• FIFA 24 with realistic graphics\n• Assassin's Creed Mirage\n• Cyberpunk 2077 (now optimized for PS5)\n• Elden Ring - Game of the Year experience\n\n**Quick Gaming Session (1-3 days rental):**\nFocus on shorter campaigns like Miles Morales or Ratchet & Clank that can be completed in 8-12 hours.\n\n**Week-long Rental:**\nPerfect for God of War Ragnarök or Horizon Forbidden West - games that offer 20-30 hours of content.\n\n**Monthly Rental:**\nExplore everything! Try multiple exclusives, online multiplayer games, and discover new genres.\n\n**Pro Tips for PS5 Rental:**\n• Download games during setup to save time\n• Create your PlayStation account beforehand\n• Take advantage of PS Plus free games\n• Use Activity Cards for guided gameplay\n\nRent your PS5 today and dive into these incredible gaming experiences!",
      category: "gaming",
      author: "RentSmart Gaming Team",
      date: "January 10, 2025",
      readTime: "4 min read",
      icon: "🕹️",
      featured: false,
    },
    {
      id: 4,
      title: "Why Renting Gaming Consoles Makes Financial Sense in 2025",
      excerpt:
        "With PS5 and Xbox Series X still priced above ₹50,000, renting offers a smarter way to enjoy next-gen gaming without the hefty upfront cost.",
      fullContent:
        "Gaming consoles have become increasingly expensive, with the PlayStation 5 retailing for ₹54,990 and Xbox Series X for ₹52,990 in India. For casual gamers who play 2-3 hours per week, purchasing these consoles means paying a premium for features they might not fully utilize.\n\nRenting offers a compelling alternative. At RentSmart, you can rent a PS5 for just ₹2,000 per week or ₹6,000 per month. This means you could rent it for 9 months before reaching the purchase price. For most gamers, this flexibility is invaluable.\n\nConsider these scenarios: You want to play the latest exclusive like Spider-Man 2 or Halo Infinite, but you're not sure if you'll enjoy it long-term. Renting lets you experience the full game without committing to a ₹50,000+ purchase. You can also switch between consoles based on exclusive releases.\n\nThe financial benefits extend beyond the initial cost. Renting eliminates concerns about warranty issues, repairs, or depreciation. When you're done gaming, simply return the console. No storage worries, no selling hassles, and no regrets about an expensive purchase gathering dust.",
      category: "gaming",
      author: "RentSmart Editorial Team",
      date: "January 8, 2025",
      readTime: "5 min read",
      icon: "💰",
      featured: false,
    },
    {
      id: 5,
      title:
        "MacBook vs iPad Pro for Creative Professionals: A Rental Comparison",
      excerpt:
        "Choosing between MacBook and iPad Pro for your creative project? We break down the pros, cons, and rental costs to help you decide.",
      fullContent:
        "Creative professionals often face the dilemma: MacBook or iPad Pro? Both are powerful tools, but they serve different purposes and come with significant price tags.\n\nThe iPad Pro (12.9-inch, M2) costs ₹1,12,900, while the MacBook Air M2 starts at ₹1,19,900. For freelancers or project-based professionals, these prices can be prohibitive.\n\nRenting scenarios:\n• Short-term projects (1-2 weeks): iPad Pro for ₹3,500/week\n• Medium-term projects (1-3 months): MacBook Air for ₹8,000/month\n• Testing before buying: Both for ₹500/day\n\nThe iPad Pro excels in:\n- Portability and battery life\n- Touch-first design workflows\n- Apple Pencil integration for design\n- Instant-on convenience\n\nThe MacBook wins for:\n- Full desktop applications\n- Multiple monitor support\n- Extensive file management\n- Professional video editing\n\nFor most creative projects lasting under 3 months, renting provides access to both devices at a fraction of the purchase cost. You can even rent both simultaneously to determine which better suits your workflow before making a purchase decision.",
      category: "tech",
      author: "RentSmart Editorial Team",
      date: "January 12, 2025",
      readTime: "7 min read",
      icon: "💻",
    },
    {
      id: 6,
      title: "Ultimate Trekking Gear Checklist: What to Rent vs What to Buy",
      excerpt:
        "Planning your first Himalayan trek? Our comprehensive guide covers essential gear and smart rental strategies to keep costs under ₹15,000.",
      fullContent:
        "Trekking in the Himalayas requires specialized gear that can cost over ₹1,00,000 if purchased new. For occasional trekkers, renting is the smart financial choice.\n\nEssential Gear Categories:\n\n**Always Rent (High cost, occasional use):**\n• High-altitude sleeping bags (-20°C rated): ₹800/day\n• Mountaineering boots: ₹600/day\n• Technical jackets (Gore-Tex): ₹700/day\n• Backpacks (60L+): ₹400/day\n• Trekking poles: ₹200/day\n\n**Consider Buying (Regular use, moderate cost):**\n• Base layers and thermal wear\n• Trekking socks and inner gloves\n• Headlamp and batteries\n• Water bottles and purification tablets\n\n**Popular Trek Packages:**\n• Kedarnath (5 days): Complete gear rental ₹12,000\n• Roopkund (8 days): Complete gear rental ₹18,000\n• Everest Base Camp (16 days): Complete gear rental ₹35,000\n\nRenting advantages:\n1. Try different brands before buying\n2. No maintenance or storage issues\n3. Always get latest gear technology\n4. Insurance coverage included\n\nPro tip: Book gear 2 weeks in advance for popular trekking seasons (March-May, September-November) to ensure availability.",
      category: "adventure",
      author: "RentSmart Editorial Team",
      date: "January 10, 2025",
      readTime: "8 min read",
      icon: "🏔️",
    },
    {
      id: 7,
      title: "Apple Vision Pro Experience: Is It Worth ₹3.5 Lakhs?",
      excerpt:
        "We spent 30 days with Apple's Vision Pro to answer the big question: should you buy, rent, or skip this revolutionary device?",
      fullContent:
        "Apple Vision Pro has arrived in India with a staggering ₹3,49,900 price tag. After spending 30 days with the device through our extended rental program, here's our honest assessment.\n\n**The Good:**\n• Incredible display quality - truly feels like magic\n• Seamless integration with Apple ecosystem\n• Revolutionary spatial computing experience\n• Eye and hand tracking works flawlessly\n• Perfect for immersive movie watching\n\n**The Reality Check:**\n• Heavy device (600g) causes neck strain after 30 minutes\n• Limited app ecosystem compared to iPhone/iPad\n• Battery life of 2-3 hours is restrictive\n• Social isolation factor\n• Requires significant space for optimal use\n\n**Rental Economics:**\n• Daily rental: ₹2,500/day\n• Weekly rental: ₹15,000/week\n• Monthly rental: ₹45,000/month\n\nWho should rent:\n• Developers exploring spatial computing\n• Content creators testing VR workflows\n• Early adopters wanting to experience the future\n• Business presentations requiring wow factor\n\n**Verdict:** At ₹3.5 lakhs, Vision Pro is a luxury few can justify purchasing. However, renting for specific projects or experiences makes perfect sense. We recommend a week-long rental to fully understand the device's capabilities and limitations.\n\nThe technology is impressive, but we're still 2-3 generations away from mainstream adoption. Renting lets you experience the future without the massive financial commitment.",
      category: "tech",
      author: "RentSmart Editorial Team",
      date: "January 8, 2025",
      readTime: "6 min read",
      icon: "🥽",
    },
    {
      id: 8,
      title:
        "Wedding Photography Gear: Rent Premium Equipment for Perfect Shots",
      excerpt:
        "Professional wedding photography requires ₹5+ lakh equipment. Here's how renting can give you access to the best gear at 1/10th the cost.",
      fullContent:
        "Wedding photography is a one-time opportunity to capture perfect moments. However, professional-grade equipment can cost over ₹5 lakhs, making it unaffordable for occasional photographers.\n\n**Essential Wedding Photography Kit:**\n• Canon R5 or Sony A7R V: ₹1,200/day\n• 24-70mm f/2.8 lens: ₹800/day\n• 70-200mm f/2.8 lens: ₹900/day\n• 50mm f/1.2 lens: ₹600/day\n• Flash and lighting setup: ₹1,000/day\n• Backup camera body: ₹800/day\n• Memory cards and batteries: ₹300/day\n\n**Total daily rental: ₹5,600 vs ₹5,00,000+ purchase**\n\n**Rental Advantages for Weddings:**\n1. **Latest technology**: Always shoot with newest camera bodies\n2. **Backup security**: Multiple cameras included in packages\n3. **Insurance coverage**: Worry-free shooting experience\n4. **No maintenance**: Focus on photography, not gear upkeep\n5. **Variety**: Different lenses for different ceremony moments\n\n**Popular Wedding Packages:**\n• Single day wedding: ₹8,000 (complete kit)\n• 3-day wedding: ₹20,000 (premium package)\n• Destination wedding (7 days): ₹35,000\n\n**Pro Tips:**\n• Book equipment 1 month before wedding season\n• Test gear 1 day before the wedding\n• Include backup batteries and memory cards\n• Consider drone rental for aerial shots (₹1,500/day)\n\nMany successful wedding photographers start their careers by renting equipment, gradually purchasing pieces as their business grows.",
      category: "lifestyle",
      author: "RentSmart Editorial Team",
      date: "January 5, 2025",
      readTime: "6 min read",
      icon: "📸",
    },
    {
      id: 9,
      title: "Student Life Hacks: Renting vs Buying Tech for College",
      excerpt:
        "College students spend ₹2+ lakhs on gadgets. Smart renting strategies can reduce this cost by 70% while accessing better technology.",
      fullContent:
        "College life demands expensive technology - laptops, tablets, cameras, and more. The average student spends ₹2-3 lakhs on tech over 4 years. Here's how smart renting can slash these costs.\n\n**Traditional Student Purchases:**\n• Laptop: ₹60,000-₹1,20,000\n• iPad for notes: ₹35,000-₹80,000\n• Camera for projects: ₹25,000-₹50,000\n• Gaming console: ₹50,000+\n• Printer: ₹15,000-₹30,000\n\n**Smart Rental Alternatives:**\n\n**Semester-based Rentals:**\n• MacBook Air M2: ₹8,000/month × 4 months = ₹32,000/semester\n• iPad Pro: ₹4,000/month × 4 months = ₹16,000/semester\n• Total: ₹48,000/semester vs ₹95,000+ purchase\n\n**Project-based Rentals:**\n• DSLR for photography assignments: ₹800/week\n• Gaming console for semester break: ₹2,000/week\n• Printer during exam season: ₹500/week\n\n**Benefits for Students:**\n1. **Lower financial burden**: Pay monthly instead of lump sum\n2. **Latest technology**: Always use current-generation devices\n3. **No maintenance worries**: Focus on studies, not repairs\n4. **Flexibility**: Different devices for different subjects\n5. **No depreciation loss**: No resale hassles after graduation\n\n**Real Student Success Story:**\nRahul, B.Tech final year: \"I've rented laptops for each semester based on my course requirements. First year: basic laptop for coding. Second year: gaming laptop for game development course. Third year: MacBook Pro for iOS development. Fourth year: workstation for AI projects. Total spent: ₹1,20,000 over 4 years vs ₹3,00,000+ if I had purchased.\"\n\n**Student-Friendly Policies:**\n• 50% deposit (refundable)\n• Flexible rental periods\n• Semester break storage options\n• Upgrade options mid-semester\n\nStart your college journey smart - rent first, buy later when you know exactly what you need.",
      category: "lifestyle",
      author: "RentSmart Editorial Team",
      date: "January 3, 2025",
      readTime: "7 min read",
      icon: "🎓",
    },
    {
      id: 10,
      title: "Home Office Setup on a Budget: Premium Equipment for Remote Work",
      excerpt:
        "Build a ₹2 lakh home office setup for under ₹15,000 through strategic rentals. Perfect for freelancers and remote workers.",
      fullContent:
        'Remote work demands professional equipment, but setting up a premium home office can cost ₹2+ lakhs. Renting offers a smarter approach for freelancers and remote workers.\n\n**Premium Home Office Rental Package:**\n• 32-inch 4K Monitor: ₹2,000/month\n• Ergonomic chair (Herman Miller): ₹3,000/month\n• Standing desk: ₹2,500/month\n• Webcam + lighting setup: ₹1,500/month\n• Mechanical keyboard + mouse: ₹800/month\n• Speakers + headphones: ₹1,200/month\n• Air purifier: ₹1,000/month\n\n**Total monthly rental: ₹12,000 vs ₹2,00,000+ purchase**\n\n**Flexible Rental Options:**\n\n**Short-term freelancers (1-3 months):**\n• Basic package: ₹8,000/month\n• Premium package: ₹12,000/month\n\n**Long-term remote workers (6+ months):**\n• Discounted rates: ₹15,000/quarter\n• Option to purchase at reduced rates\n\n**Startup-friendly packages:**\n• 5-desk office setup: ₹40,000/month\n• Conference room equipment: ₹15,000/month\n\n**Why Renting Makes Sense:**\n1. **Test before investing**: Try expensive chairs and desks before buying\n2. **Scale up/down**: Adjust setup based on income fluctuations\n3. **Latest ergonomics**: Access to newest workplace wellness equipment\n4. **Tax benefits**: Rental expenses are fully deductible\n5. **No storage issues**: Return equipment when moving\n\n**Success Story:**\nMeera, Graphic Designer: "I started with a basic rental package while building my client base. As my income grew, I upgraded to premium equipment. After 18 months, I purchased the items I loved most at discounted rates. This approach saved me ₹80,000 and taught me what equipment I actually needed."\n\n**Pro Tips:**\n• Start with 3-month rentals to test workflow\n• Prioritize ergonomics - chair and desk first\n• Add equipment gradually based on client feedback\n• Document everything for tax deductions\n\nBuild your dream office gradually without breaking the bank.',
      category: "tech",
      author: "RentSmart Editorial Team",
      date: "January 1, 2025",
      readTime: "8 min read",
      icon: "🏠",
    },
    {
      id: 11,
      title: "Seasonal Sports Equipment: Smart Rentals for Every Adventure",
      excerpt:
        "From skiing in Manali to surfing in Goa, discover how renting seasonal sports equipment can unlock new adventures without storage headaches.",
      fullContent:
        "India's diverse geography offers year-round adventure sports opportunities. However, purchasing equipment for each activity can cost ₹5+ lakhs and create massive storage problems. Renting opens up a world of seasonal adventures.\n\n**Winter Sports (Dec-Feb):**\n\n**Skiing in Manali/Gulmarg:**\n• Skis, boots, poles: ₹1,500/day\n• Snowboard complete set: ₹1,200/day\n• Winter jackets and pants: ₹800/day\n• Helmets and goggles: ₹400/day\n• Complete beginner package: ₹2,500/day\n\n**Summer Water Sports (Mar-Jun):**\n\n**Surfing in Goa/Pondicherry:**\n• Surfboard rental: ₹800/day\n• Wetsuit: ₹500/day\n• SUP boards: ₹600/day\n• Kayaking equipment: ₹700/day\n\n**Monsoon Trekking (Jul-Sep):**\n\n**Western Ghats Adventures:**\n• Waterproof trekking gear: ₹1,000/day\n• Rain jackets and pants: ₹600/day\n• Waterproof backpacks: ₹400/day\n• Monsoon boots: ₹300/day\n\n**Post-Monsoon Climbing (Oct-Nov):**\n\n**Rock Climbing in Hampi/Badami:**\n• Climbing shoes: ₹400/day\n• Harnesses and helmets: ₹300/day\n• Ropes and protection: ₹800/day\n• Complete climbing kit: ₹1,200/day\n\n**Rental vs Purchase Analysis:**\n\n**Skiing Equipment:**\n• Purchase cost: ₹80,000-₹1,50,000\n• Annual usage: 5-10 days\n• Rental cost: ₹12,500-₹25,000/year\n• Savings: ₹67,500+ annually\n\n**Benefits of Seasonal Rentals:**\n1. **Try new sports**: Low barrier to entry for adventures\n2. **Latest equipment**: Always use current-season gear\n3. **No maintenance**: No cleaning, storage, or repairs\n4. **Travel light**: Rent at destination, no luggage issues\n5. **Expert guidance**: Rental shops provide setup and tips\n\n**Seasonal Adventure Calendar:**\n• Jan-Feb: Skiing, ice climbing\n• Mar-Apr: Desert camping, rock climbing\n• May-Jun: Water sports, mountain biking\n• Jul-Aug: Monsoon trekking, river rafting\n• Sep-Oct: High-altitude trekking\n• Nov-Dec: Wildlife photography, camping\n\n**Planning Tips:**\n• Book equipment 2 weeks in advance during peak seasons\n• Check weather conditions before confirming rentals\n• Include insurance for high-value equipment\n• Ask about multi-day discounts\n\nEmbrace India's adventure opportunities year-round without the commitment of purchasing specialized equipment.",
      category: "adventure",
      author: "RentSmart Editorial Team",
      date: "December 28, 2024",
      readTime: "9 min read",
      icon: "⛷️",
    },
    {
      id: 12,
      title:
        "Best Rental Service in Delhi NCR 2025: Why Choose RentSmart for Electronics & Gaming",
      excerpt:
        "Looking for PS5 rental, MacBook rental, or adventure gear in Delhi NCR? RentSmart offers same-day delivery, 70% cost savings, and premium quality. Rated #1 rental service.",
      fullContent:
        "RentSmart has become Delhi NCR's most trusted rental service for electronics, gaming consoles, and adventure equipment. With 10,000+ satisfied customers and same-day delivery across Gurgaon, Noida, Faridabad, and Delhi, here's why we're the top choice.\n\n**🎮 Popular Products Available:**\n• PS5 console rental - ₹999/day, ₹2499/week\n• MacBook Pro M3 rental - ₹2000/day, ₹8000/month\n• iPad Pro rental - ₹800/day, ₹4000/month\n• Gaming laptops, cameras, trekking gear\n• Home office furniture and appliances\n\n**⚡ Why RentSmart Leads in Delhi NCR:**\n\n**Same-Day Delivery Service:**\nOrder before 6 PM and get your rental delivered the same day across Delhi, Gurgaon, Noida, Faridabad, and Ghaziabad. No waiting, no delays.\n\n**Up to 70% Cost Savings:**\nWhy pay ₹54,990 for PS5 when you can rent for ₹999/day? Our customers save lakhs annually on tech and gaming equipment.\n\n**Quality Assurance:**\n• Latest models only (no outdated inventory)\n• Rigorous sanitization before delivery\n• Full insurance coverage included\n• Immediate replacement guarantee\n\n**📱 Easy Booking Process:**\n1. WhatsApp +91-8448347366\n2. Choose product and rental period\n3. Confirm delivery address\n4. Enjoy premium products!\n\n**💰 Current Offers:**\n• First rental: 20% OFF\n• Students: Additional 15% discount\n• Long-term rentals: Up to 40% savings\n• Bulk orders: Special corporate rates\n\n**📞 Service Areas:**\nDelhi, Gurgaon, Noida, Faridabad, Ghaziabad - Free delivery and pickup\n\n**Why Rent Instead of Buy?**\n• Access latest technology without huge investment\n• No depreciation or maintenance worries\n• Flexible upgrade options\n• Perfect for short-term needs\n\nContact RentSmart today for the best rental deals in Delhi NCR!",
      category: "lifestyle",
      author: "RentSmart Team",
      date: "January 18, 2025",
      readTime: "4 min read",
      icon: "🚀",
      featured: false,
    },
    {
      id: 13,
      title:
        "PS5 Rental vs Purchase: Save ₹1 Lakh with Smart Renting in Delhi NCR 2025",
      excerpt:
        "PS5 rental costs ₹999/day vs ₹54,990 purchase price. Smart renting saves ₹1+ lakh annually on gaming, electronics & tech. Discover the cost breakdown and benefits.",
      fullContent:
        "Wondering whether to rent or buy PS5, MacBook, or other expensive electronics? Our financial analysis of 10,000+ customers shows smart renting saves ₹1-5 lakhs annually. Here's the real cost breakdown.\n\n**💰 PS5 Rental vs Purchase Cost Analysis:**\n\n**Buying PS5:**\n• Purchase price: ₹54,990\n• Annual depreciation (30%): ₹16,497\n• Games cost: ₹35,000/year\n• Extended warranty: ₹8,000\n• **Total first-year cost: ₹1,14,487**\n\n**Renting PS5 from RentSmart:**\n• Rental (60 days/year): ₹15,000\n• Games included: Free\n• Insurance included: Free\n• **Total annual cost: ₹15,000**\n• **Annual savings: ₹99,487**\n\n**📊 Real Customer Savings Examples:**\n\n**Tech Professional - Annual Equipment:**\n• MacBook Pro purchase: ₹2,50,000\n• RentSmart rental (8 months): ₹80,000\n• **Savings: ₹1,70,000**\n\n**Student - Semester Needs:**\n• iPad Pro purchase: ₹80,000\n• RentSmart rental (4 months): ₹16,000\n• **Savings: ₹64,000**\n\n**🎯 When to Rent vs Buy (10-20-30 Rule):**\n\n**Always Rent (Usage < 10% per year):**\n• Gaming consoles (weekend gaming)\n• Professional cameras (occasional projects)\n• Adventure gear (seasonal use)\n• High-end laptops (short-term work)\n\n**Consider Renting (10-20% usage):**\n• iPad for specific courses\n• Gaming laptops for temporary projects\n• Photography equipment for events\n\n**Consider Buying (30%+ usage):**\n• Daily work laptop\n• Primary smartphone\n• Regular workout equipment\n\n**💡 Hidden Costs of Ownership:**\n• **Depreciation**: Electronics lose 30-50% value annually\n• **Maintenance**: Repairs, software updates, cleaning\n• **Storage**: Space and organization costs\n• **Insurance**: Theft and damage protection\n• **Upgrade costs**: Latest model replacements\n\n**🚀 RentSmart Advantage:**\n• **Latest models**: Always current generation\n• **No maintenance**: Worry-free experience\n• **Flexible terms**: Daily to yearly rentals\n• **Same-day delivery**: Delhi NCR coverage\n• **Cost savings**: 60-80% less than buying\n\n**📈 Long-term Financial Impact:**\nRenting instead of buying can save ₹2-5 lakhs annually. Investing these savings in mutual funds (12% return) can build:\n• 5 years: ₹15+ lakhs corpus\n• 10 years: ₹35+ lakhs corpus\n• 15 years: ₹75+ lakhs corpus\n\n**💎 Money-Saving Tips:**\n• Book longer rentals for better rates\n• Use student discounts (30% off)\n• Choose off-peak seasons\n• Bundle multiple products\n• Refer friends for credits\n\n**📞 Start Saving Today:**\nContact RentSmart at +91-8448347366 for personalized rental quotes. Calculate your savings and make the smart financial choice!\n\n**Popular Rental Categories in Delhi NCR:**\n• Gaming: PS5, Xbox, Nintendo Switch\n• Tech: MacBook, iPad, Surface, monitors\n• Photography: DSLR, mirrorless, lenses\n• Adventure: Trekking gear, camping equipment\n• Home: Air purifiers, furniture, appliances",
      category: "lifestyle",
      author: "RentSmart Team",
      date: "January 16, 2025",
      readTime: "5 min read",
      icon: "💰",
      featured: false,
    },
  ];

  useEffect(() => {
    // Find the post by ID
    const foundPost = blogPosts.find((p) => p.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);

      // Update page title and meta description
      document.title = `${foundPost.title} | RentSmart Blog`;

      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement("meta");
        metaDescription.name = "description";
        document.head.appendChild(metaDescription);
      }
      metaDescription.content = foundPost.excerpt;
    } else {
      // Post not found, redirect to blog
      navigate("/blog");
    }
  }, [id, navigate]);

  const handleBrowseProducts = () => {
    navigate("/#products-section");
    setTimeout(() => {
      const element = document.getElementById("products-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const formatContent = (content) => {
    return content
      .split("\n")
      .map((paragraph, index) => {
        if (paragraph.trim() === "") return null;

        // Handle bold text with **
        const formattedParagraph = paragraph.replace(
          /\*\*(.*?)\*\*/g,
          "<strong>$1</strong>"
        );

        return (
          <p
            key={index}
            dangerouslySetInnerHTML={{ __html: formattedParagraph }}
            className={paragraph.startsWith("**") ? "content-heading" : ""}
          />
        );
      })
      .filter(Boolean);
  };

  if (!post) {
    return (
      <div className="blog-post-loader">
        <div className="container">
          <div className="loading-skeleton">
            <div className="skeleton-title"></div>
            <div className="skeleton-meta"></div>
            <div className="skeleton-content"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Blog Post Header */}
      <section className="blog-post-header">
        <div className="container">
          <div className="blog-post-breadcrumb">
            <Link to="/blog" className="breadcrumb-link">
              ← Back to Blog
            </Link>
          </div>

          <div className="blog-post-meta">
            <div className="post-icon">{post.icon}</div>
            <div className="post-category">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
            </div>
            <span className="meta-separator">•</span>
            <span className="post-date">{post.date}</span>
            <span className="meta-separator">•</span>
            <span className="post-read-time">{post.readTime}</span>
          </div>

          <h1 className="blog-post-title">{post.title}</h1>
          <p className="blog-post-excerpt">{post.excerpt}</p>

          <div className="post-author">
            <span>By {post.author}</span>
          </div>
        </div>
      </section>

      {/* Blog Post Content */}
      <section className="blog-post-content">
        <div className="container">
          <div className="blog-content-wrapper">
            <article className="blog-article">
              <div className="article-content">
                {formatContent(post.fullContent)}
              </div>

              {/* Social Share Buttons */}
              <div className="blog-post-share">
                <h4>Share this article:</h4>
                <div className="share-buttons">
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      post.title +
                        " - " +
                        `https://rentsmart.in/blog/${post.id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn whatsapp"
                  >
                    <span>📱</span> WhatsApp
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      post.title
                    )}&url=${encodeURIComponent(
                      `https://rentsmart.in/blog/${post.id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn twitter"
                  >
                    <span>🐦</span> Twitter
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `https://rentsmart.in/blog/${post.id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-btn facebook"
                  >
                    <span>📘</span> Facebook
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="blog-post-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Rental Journey?</h2>
            <p>Explore our wide range of products and start saving today!</p>
            <div className="cta-buttons">
              <button
                onClick={handleBrowseProducts}
                className="cta-button primary"
              >
                Browse Products
              </button>
              <a href="tel:+918448347366" className="cta-button secondary">
                Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogPost;
