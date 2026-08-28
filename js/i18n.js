/* ============================================================
   DHANOKA — i18n.js
   Lightweight English ⇄ Hindi switcher for the whole site.
   Works by walking visible text nodes + key attributes and
   swapping them using the dictionary below. A MutationObserver
   re-translates content that is added later (product cards,
   cart items, toasts) so the language stays consistent even on
   dynamic pages.
   ============================================================ */

const DHANOKA_HI_DICT = {
  // Top announce bar / meta
  "Reliable agricultural inputs \u00a0\u2022\u00a0 Farmer-focused buying \u00a0\u2022\u00a0 Simple product enquiry": "विश्वसनीय कृषि उत्पाद \u00a0•\u00a0 किसान-केंद्रित खरीद \u00a0•\u00a0 आसान उत्पाद पूछताछ",
  "Skip to main content": "मुख्य सामग्री पर जाएँ",

  // Nav
  "Home": "होम",
  "Products": "उत्पाद",
  "Categories": "श्रेणियाँ",
  "About Us": "हमारे बारे में",
  "Ashok Singh Yadav": "अशोक सिंह यादव",
  "Farm Knowledge": "कृषि जानकारी",
  "Contact": "संपर्क करें",
  "Cart": "कार्ट",
  "Enquire / Order": "पूछताछ / ऑर्डर करें",
  "Search products, e.g. Kinzan, Fungicide...": "उत्पाद खोजें, जैसे Kinzan, फफूंदनाशक...",
  "Search products": "उत्पाद खोजें",
  "Search": "खोजें",
  "View cart": "कार्ट देखें",
  "Open menu": "मेन्यू खोलें",
  "Primary": "मुख्य मेन्यू",
  "Mobile": "मोबाइल मेन्यू",
  "Breadcrumb": "ब्रेडक्रम्ब",
  "Dhanoka home": "धनोका होम",
  "Dhanoka logo": "धनोका लोगो",

  // Homepage hero
  "Dhanoka \u00b7 Agricultural Inputs": "धनोका · कृषि उत्पाद",
  "Better Inputs. Better Farming.": "बेहतर उत्पाद। बेहतर खेती।",
  "Agricultural inputs and crop-care solutions, made simpler for farmers.": "किसानों के लिए आसान बनाए गए कृषि उत्पाद और फसल-देखभाल समाधान।",
  "Dhanoka brings together a wide range of agricultural products through a simple, transparent and farmer-focused buying experience.": "धनोका एक सरल, पारदर्शी और किसान-केंद्रित खरीद अनुभव के माध्यम से कई तरह के कृषि उत्पादों को एक जगह लाता है।",
  "Explore Products": "उत्पाद देखें",
  "Talk to Dhanoka": "धनोका से बात करें",

  // Trust strip
  "Wide Product Range": "विस्तृत उत्पाद श्रेणी",
  "A broad selection of crop-care inputs in one place.": "एक ही जगह पर फसल-देखभाल उत्पादों का व्यापक चयन।",
  "Farmer-Focused Approach": "किसान-केंद्रित सोच",
  "Built around real challenges farmers face every season.": "हर मौसम में किसानों की वास्तविक चुनौतियों को ध्यान में रखकर बनाया गया।",
  "Straightforward Buying": "सरल खरीदारी",
  "Simple product discovery and enquiry, without the runaround.": "बिना किसी परेशानी के आसान उत्पाद खोज और पूछताछ।",
  "Accessible Agricultural Inputs": "सुलभ कृषि उत्पाद",
  "Helping farmers find what they need, more easily.": "किसानों को उनकी ज़रूरत की चीज़ें आसानी से खोजने में मदद।",

  // Category section
  "What We Offer": "हम क्या प्रदान करते हैं",
  "Explore Agricultural Solutions": "कृषि समाधान देखें",
  "Browse crop-care products by category. Category information is added as it becomes available for each product.": "श्रेणी के अनुसार फसल-देखभाल उत्पाद देखें। जैसे-जैसे जानकारी उपलब्ध होगी, हर उत्पाद की श्रेणी जोड़ी जाएगी।",
  "Browse Dhanoka's product range by category. Category tags are added as they are confirmed for each product.": "श्रेणी के अनुसार धनोका के उत्पादों की सूची देखें। हर उत्पाद की श्रेणी की पुष्टि होते ही जोड़ दी जाती है।",
  "Insecticides": "कीटनाशक",
  "Products for managing crop-damaging insects.": "फसल को नुकसान पहुँचाने वाले कीड़ों के प्रबंधन के लिए उत्पाद।",
  "Fungicides": "फफूंदनाशक",
  "Solutions aimed at fungal crop diseases.": "फसल के फफूंद रोगों के लिए समाधान।",
  "Herbicides": "खरपतवारनाशक",
  "Products for weed and unwanted growth management.": "खरपतवार और अनावश्यक वृद्धि के प्रबंधन के लिए उत्पाद।",
  "Plant Growth & Crop Nutrition": "पौध वृद्धि और फसल पोषण",
  "Inputs supporting plant growth and nutrition.": "पौधों की वृद्धि और पोषण में सहायक उत्पाद।",
  "Biological Products": "जैविक उत्पाद",
  "Bio-based crop-care inputs.": "जैव-आधारित फसल-देखभाल उत्पाद।",
  "Adjuvants & Wetting Agents": "सहायक एवं वेटिंग एजेंट",
  "Products that support application of other inputs.": "अन्य उत्पादों के छिड़काव/प्रयोग में सहायक उत्पाद।",
  "Soil & Root Care": "मिट्टी एवं जड़ की देखभाल",
  "Inputs focused on soil and root health.": "मिट्टी और जड़ों के स्वास्थ्य पर केंद्रित उत्पाद।",
  "Other Crop-Care Products": "अन्य फसल-देखभाल उत्पाद",
  "Additional agricultural inputs available through Dhanoka.": "धनोका के माध्यम से उपलब्ध अन्य कृषि उत्पाद।",
  "View Products \u2192": "उत्पाद देखें \u2192",

  // Featured products
  "Available Through Dhanoka": "धनोका पर उपलब्ध",
  "Featured Products": "विशेष उत्पाद",
  "A sample of agricultural products available through Dhanoka. Browse the full catalog for more.": "धनोका पर उपलब्ध कुछ कृषि उत्पादों का नमूना। पूरी सूची देखने के लिए कैटलॉग देखें।",
  "View All Products \u2192": "सभी उत्पाद देखें \u2192",

  // Founder preview - homepage
  "Our Focus": "हमारा फोकस",
  "Built Around the Farmer": "किसान को केंद्र में रखकर बनाया गया",
  "From choosing agricultural inputs to getting them at the right time, farmers already deal with enough complexity. Dhanoka aims to make product discovery and enquiry simpler.": "कृषि उत्पाद चुनने से लेकर उन्हें सही समय पर पाने तक, किसान पहले से ही कई कठिनाइयों का सामना करते हैं। धनोका का उद्देश्य उत्पाद खोज और पूछताछ को आसान बनाना है।",
  "Discover Dhanoka": "धनोका के बारे में जानें",
  "The Story Behind Dhanoka": "धनोका के पीछे की कहानी",
  "Coming from a farming background, Ashok Singh Yadav understood that farmers often face challenges not only in cultivation, but also in accessing agricultural inputs at reasonable prices and at the right time.": "एक किसान परिवार से आने के कारण, अशोक सिंह यादव समझते थे कि किसानों को न केवल खेती में, बल्कि उचित मूल्य पर और सही समय पर कृषि उत्पाद पाने में भी कठिनाइयों का सामना करना पड़ता है।",
  "\u201cDhanoka is my effort to make access to agricultural inputs a little simpler and more affordable for the people who work closest to the land.\u201d": "\u201cधनोका मेरी यह कोशिश है कि जो लोग ज़मीन से सबसे करीब से जुड़े हैं, उनके लिए कृषि उत्पादों तक पहुँच को थोड़ा आसान और किफायती बनाया जाए।\u201d",
  "Read His Story \u2192": "उनकी कहानी पढ़ें \u2192",

  // Why Dhanoka
  "Why Dhanoka": "धनोका क्यों",
  "How Dhanoka Helps": "धनोका कैसे मदद करता है",
  "A simple path from browsing to buying \u2014 built for how farmers actually shop.": "देखने से लेकर खरीदने तक एक सरल रास्ता — जो किसानों की असली खरीदारी की आदत को ध्यान में रखकर बनाया गया है।",
  "Explore": "देखें",
  "Browse agricultural products across categories.": "विभिन्न श्रेणियों में कृषि उत्पाद देखें।",
  "Understand": "समझें",
  "Review available product information for each item.": "हर उत्पाद की उपलब्ध जानकारी देखें।",
  "Enquire": "पूछताछ करें",
  "Send an enquiry for availability and pricing.": "उपलब्धता और मूल्य के लिए पूछताछ भेजें।",
  "Connect": "संपर्क करें",
  "Talk directly with Dhanoka through WhatsApp or contact.": "WhatsApp या संपर्क के माध्यम से सीधे धनोका से बात करें।",

  "Why Choose Dhanoka": "धनोका को क्यों चुनें",
  "Farmer First": "किसान सबसे पहले",
  "Every decision starts with what makes things easier for farmers.": "हर फ़ैसला इस सोच से शुरू होता है कि किसानों के लिए क्या आसान होगा।",
  "Wide Product Selection": "व्यापक उत्पाद चयन",
  "A broad range of agricultural inputs in one place.": "एक ही जगह पर कई तरह के कृषि उत्पाद।",
  "Clear product information and a simple enquiry process.": "स्पष्ट उत्पाद जानकारी और सरल पूछताछ प्रक्रिया।",
  "Practical Approach": "व्यावहारिक सोच",
  "Focused on what actually helps at the ground level.": "ज़मीनी स्तर पर वास्तव में मददगार चीज़ों पर केंद्रित।",
  "Making products easier to discover and enquire about.": "उत्पादों को खोजना और उनके बारे में पूछताछ करना आसान बनाना।",
  "Long-Term Trust": "दीर्घकालिक विश्वास",
  "Built with the intention of lasting, honest relationships.": "स्थायी और ईमानदार रिश्तों की सोच के साथ बनाया गया।",

  // Farm knowledge preview
  "Learn": "जानें",
  "Practical information to support everyday farming decisions.": "रोज़मर्रा के खेती संबंधी फ़ैसलों में मदद करने वाली व्यावहारिक जानकारी।",
  "Crop Care Guides": "फसल देखभाल गाइड",
  "General guidance on caring for common crops.": "आम फसलों की देखभाल पर सामान्य मार्गदर्शन।",
  "Read More \u2192": "और पढ़ें \u2192",
  "Seasonal Farming Tips": "मौसमी खेती सुझाव",
  "Notes on preparing for the season ahead.": "आने वाले मौसम की तैयारी से जुड़े सुझाव।",
  "Pest & Disease Awareness": "कीट एवं रोग जागरूकता",
  "General awareness content on common issues.": "आम समस्याओं पर सामान्य जागरूकता जानकारी।",

  // CTA band
  "Have a question about a product?": "किसी उत्पाद के बारे में सवाल है?",
  "Send an enquiry and Dhanoka will get back to you with availability and pricing.": "पूछताछ भेजें और धनोका आपको उपलब्धता और मूल्य के बारे में जानकारी देगा।",
  "Send Enquiry": "पूछताछ भेजें",

  // Footer
  "Dhanoka helps farmers discover and enquire about a wide range of agricultural inputs and crop-care products through a simple, transparent buying experience.": "धनोका किसानों को एक सरल, पारदर्शी खरीद अनुभव के माध्यम से कई तरह के कृषि उत्पादों और फसल-देखभाल उत्पादों को खोजने और उनके बारे में पूछताछ करने में मदद करता है।",
  "Company": "कंपनी",
  "About Dhanoka": "धनोका के बारे में",
  "All Products": "सभी उत्पाद",
  "Product Enquiry": "उत्पाद पूछताछ",
  "Support": "सहायता",
  "FAQs": "अक्सर पूछे जाने वाले सवाल",
  "Product Information": "उत्पाद जानकारी",
  "\u00a9 2026 Dhanoka. All rights reserved. \u00a0\u00b7\u00a0 An agricultural input and crop-care business based in India.": "\u00a9 2026 धनोका। सर्वाधिकार सुरक्षित। \u00a0·\u00a0 भारत में स्थित एक कृषि उत्पाद और फसल-देखभाल व्यवसाय।",
  "Privacy Policy": "गोपनीयता नीति",
  "Terms & Conditions": "नियम एवं शर्तें",
  "Disclaimer": "अस्वीकरण",

  // About page
  "Focused on making agricultural inputs more accessible.": "कृषि उत्पादों को अधिक सुलभ बनाने पर केंद्रित।",
  "Dhanoka was built around a simple idea: agricultural inputs should be easier for farmers to access, understand and purchase.": "धनोका एक सरल विचार पर बनाया गया है: कृषि उत्पादों तक पहुँच, समझ और खरीद किसानों के लिए आसान होनी चाहिए।",
  "Farmers face practical challenges every season. Agricultural inputs can be difficult to source, and local availability may vary from place to place. In many cases, farmers need to travel to find the products they need.": "किसानों को हर मौसम में व्यावहारिक चुनौतियों का सामना करना पड़ता है। कृषि उत्पाद प्राप्त करना कठिन हो सकता है, और स्थानीय उपलब्धता जगह-जगह अलग हो सकती है। कई बार किसानों को अपनी ज़रूरत का उत्पाद पाने के लिए यात्रा करनी पड़ती है।",
  "Multiple layers of distribution can affect both accessibility and pricing. Product information can also be difficult to compare, especially when time is short during the growing season.": "वितरण की कई परतें उपलब्धता और मूल्य दोनों को प्रभावित कर सकती हैं। उत्पाद जानकारी की तुलना करना भी मुश्किल हो सकता है, खासकर जब बुवाई के मौसम में समय कम हो।",
  "Dhanoka aims to make product discovery and enquiry simpler \u2014 bringing a wide range of agricultural inputs together in one place, with clear information and a straightforward way to ask about availability and pricing.": "धनोका का उद्देश्य उत्पाद खोज और पूछताछ को आसान बनाना है — कई तरह के कृषि उत्पादों को एक जगह लाना, स्पष्ट जानकारी देना और उपलब्धता व मूल्य के बारे में पूछने का सरल तरीका देना।",
  "Our Approach": "हमारा दृष्टिकोण",
  "Focused on Accessibility, Not Just Price": "सिर्फ़ कीमत नहीं, सुलभता पर ध्यान",
  "Dhanoka is focused on making agricultural inputs more accessible \u2014 not on being the cheapest supplier in every case.": "धनोका कृषि उत्पादों को अधिक सुलभ बनाने पर केंद्रित है — न कि हर मामले में सबसे सस्ता विक्रेता बनने पर।",
  "Want to know more about Dhanoka?": "धनोका के बारे में और जानना चाहते हैं?",
  "Read the story behind Dhanoka, or get in touch directly.": "धनोका के पीछे की कहानी पढ़ें, या सीधे संपर्क करें।",
  "Meet Ashok Singh Yadav": "अशोक सिंह यादव से मिलें",
  "Contact Dhanoka": "धनोका से संपर्क करें",

  // Ashok page
  "The Farmer Behind the Vision": "इस सोच के पीछे का किसान",
  "Farmers need reliable access to agricultural inputs, yet those inputs can become expensive as they pass through multiple layers of distribution. Local availability can be inconsistent, often leaving farmers to depend on whatever is immediately at hand rather than what actually suits their crop and season.": "किसानों को कृषि उत्पादों तक विश्वसनीय पहुँच की ज़रूरत होती है, लेकिन वितरण की कई परतों से गुज़रने के कारण ये उत्पाद महंगे हो सकते हैं। स्थानीय उपलब्धता असंगत हो सकती है, जिससे किसान अक्सर वही इस्तेमाल करते हैं जो तुरंत उपलब्ध हो, न कि जो उनकी फसल और मौसम के लिए सही हो।",
  "Comparing products and understanding what is genuinely available can also be difficult. This is what shaped Ashok Singh Yadav's thinking \u2014 that a simpler buying channel could make the entire process more convenient for farmers.": "उत्पादों की तुलना करना और यह समझना कि वास्तव में क्या उपलब्ध है, भी मुश्किल हो सकता है। यही सोच अशोक सिंह यादव के विचार का आधार बनी — कि एक आसान खरीद माध्यम पूरी प्रक्रिया को किसानों के लिए अधिक सुविधाजनक बना सकता है।",
  "\u201cFarming is not only a profession; for millions of families, it is a way of life. Dhanoka is my effort to make access to agricultural inputs a little simpler and more affordable for the people who work closest to the land.\u201d": "\u201cखेती केवल एक पेशा नहीं है; लाखों परिवारों के लिए यह जीवन जीने का एक तरीका है। धनोका मेरी यह कोशिश है कि ज़मीन से सबसे करीब से जुड़े लोगों के लिए कृषि उत्पादों तक पहुँच को थोड़ा आसान और किफायती बनाया जाए।\u201d",
  "\u2014 Ashok Singh Yadav": "\u2014 अशोक सिंह यादव",
  "The Vision": "सोच",
  "Why Dhanoka Exists": "धनोका क्यों बनाया गया",
  "His vision for Dhanoka is simple: make agricultural inputs more accessible, transparent and convenient for farmers, while building a business based on trust and long-term relationships.": "धनोका के लिए उनकी सोच सरल है: कृषि उत्पादों को किसानों के लिए अधिक सुलभ, पारदर्शी और सुविधाजनक बनाना, साथ ही विश्वास और दीर्घकालिक रिश्तों पर आधारित व्यवसाय बनाना।",
  "Gallery": "गैलरी",
  "In His Own Words": "उन्हीं के शब्दों में",
  "Explore what Dhanoka offers": "जानें धनोका क्या प्रदान करता है",
  "Browse the product catalog or get in touch to ask about availability.": "उत्पाद सूची देखें या उपलब्धता जानने के लिए संपर्क करें।",

  // Contact page
  "Let's Talk About Your Farm": "आइए आपके खेत के बारे में बात करें",
  "Send an Enquiry": "पूछताछ भेजें",
  "Name": "नाम",
  "Please enter your name.": "कृपया अपना नाम दर्ज करें।",
  "Mobile Number": "मोबाइल नंबर",
  "Please enter a valid 10-digit mobile number.": "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।",
  "Email": "ईमेल",
  "Village / Town": "गाँव / शहर",
  "District": "ज़िला",
  "State": "राज्य",
  "Select State": "राज्य चुनें",
  "Andhra Pradesh": "आंध्र प्रदेश",
  "Bihar": "बिहार",
  "Gujarat": "गुजरात",
  "Haryana": "हरियाणा",
  "Karnataka": "कर्नाटक",
  "Madhya Pradesh": "मध्य प्रदेश",
  "Maharashtra": "महाराष्ट्र",
  "Punjab": "पंजाब",
  "Rajasthan": "राजस्थान",
  "Tamil Nadu": "तमिलनाडु",
  "Uttar Pradesh": "उत्तर प्रदेश",
  "West Bengal": "पश्चिम बंगाल",
  "Other": "अन्य",
  "Selected Products / Pack Size / Quantity": "चयनित उत्पाद / पैक साइज़ / मात्रा",
  "Message": "संदेश",
  "Submit Enquiry": "पूछताछ भेजें",
  "This is an enquiry/request only. Submitting this form does not place an order.": "यह केवल एक पूछताछ/अनुरोध है। यह फ़ॉर्म भरने से कोई ऑर्डर नहीं होता।",
  "Business": "व्यवसाय",
  "Dhanoka, India": "धनोका, भारत",
  "Address": "पता",
  "Amkho, Shivaji Nagar, Gwalior, Madhya Pradesh, India": "अमखो, शिवाजी नगर, ग्वालियर, मध्य प्रदेश, भारत",
  "Phone": "फ़ोन",
  "WhatsApp": "व्हाट्सएप",
  "Hours": "समय",
  "Open 24 Hours": "24 घंटे खुला",
  "Order via WhatsApp": "व्हाट्सएप पर ऑर्डर करें",
  "Call Dhanoka": "धनोका को कॉल करें",
  "Email Dhanoka": "धनोका को ईमेल करें",

  // Disclaimer page
  "General Disclaimer": "सामान्य अस्वीकरण",
  "Agricultural products should always be used strictly according to the product label and applicable local regulations. Product availability, pack sizes and information may vary. Customers should verify product labels and seek appropriate agricultural guidance before use.": "कृषि उत्पादों का उपयोग हमेशा उत्पाद लेबल और लागू स्थानीय नियमों के अनुसार ही करना चाहिए। उत्पाद की उपलब्धता, पैक साइज़ और जानकारी बदल सकती है। उपयोग से पहले ग्राहकों को उत्पाद लेबल की जाँच करनी चाहिए और उचित कृषि सलाह लेनी चाहिए।",
  "Product Information Accuracy": "उत्पाद जानकारी की सटीकता",
  "Where technical details such as active ingredients, dosage, application rates, target crops or pests are not yet confirmed on this website, the relevant section will state that information will be updated. Dhanoka does not provide unverified application instructions or efficacy claims.": "जहाँ सक्रिय तत्व, मात्रा, प्रयोग दर, लक्षित फसल या कीट जैसी तकनीकी जानकारी अभी इस वेबसाइट पर पुष्ट नहीं है, वहाँ संबंधित सेक्शन में बताया जाएगा कि जानकारी बाद में अपडेट की जाएगी। धनोका असत्यापित प्रयोग निर्देश या प्रभावशीलता के दावे नहीं देता।",
  "No Manufacturer or Distributor Claims": "निर्माता या वितरक होने का कोई दावा नहीं",
  "Unless explicitly stated, Dhanoka does not claim to be the manufacturer, authorized distributor, or exclusive dealer of the products listed on this website, nor does it claim official partnership, certification, or government approval for any product or brand shown.": "जब तक स्पष्ट रूप से न कहा जाए, धनोका इस वेबसाइट पर सूचीबद्ध उत्पादों का निर्माता, अधिकृत वितरक या विशेष डीलर होने का दावा नहीं करता, और न ही किसी उत्पाद या ब्रांड के लिए आधिकारिक साझेदारी, प्रमाणन या सरकारी अनुमोदन का दावा करता है।",
  "Professional Guidance": "विशेषज्ञ सलाह",
  "Content on the Farm Knowledge section of this website is general in nature and is not a substitute for professional agricultural advice. Please consult a qualified agricultural expert and the product label before applying any crop-care product.": "इस वेबसाइट के कृषि जानकारी सेक्शन की सामग्री सामान्य प्रकृति की है और यह पेशेवर कृषि सलाह का विकल्प नहीं है। किसी भी फसल-देखभाल उत्पाद का प्रयोग करने से पहले कृपया एक योग्य कृषि विशेषज्ञ से सलाह लें और उत्पाद लेबल देखें।",
  "Enquiry, Not Order Confirmation": "पूछताछ, ऑर्डर की पुष्टि नहीं",
  "Submitting the enquiry form, WhatsApp message, or cart on this website represents a request for information only. It does not constitute a confirmed order, and no payment is processed through this website.": "इस वेबसाइट पर पूछताछ फ़ॉर्म, व्हाट्सएप संदेश या कार्ट भेजना केवल जानकारी के लिए एक अनुरोध है। यह पुष्ट ऑर्डर नहीं है, और इस वेबसाइट के माध्यम से कोई भुगतान नहीं लिया जाता।",

  // Cart page
  "Your Enquiry Cart": "आपकी पूछताछ कार्ट",
  "Review the products you're interested in, then send an enquiry via WhatsApp or the contact form.": "जिन उत्पादों में आपकी रुचि है उन्हें देखें, फिर WhatsApp या संपर्क फ़ॉर्म के माध्यम से पूछताछ भेजें।",
  "Your enquiry cart is empty.": "आपकी पूछताछ कार्ट खाली है।",
  "Browse the catalog and add products you'd like to ask about.": "सूची देखें और जिन उत्पादों के बारे में पूछना है उन्हें जोड़ें।",
  "Browse Products": "उत्पाद देखें",
  "Enquiry Summary": "पूछताछ सारांश",
  "Items": "वस्तुएं",
  "Pricing": "मूल्य",
  "Shared after enquiry": "पूछताछ के बाद बताया जाएगा",
  "Send via Enquiry Form": "पूछताछ फ़ॉर्म से भेजें",
  "Clear Cart": "कार्ट खाली करें",
  "This is an enquiry cart, not a payment checkout. No order is placed until Dhanoka confirms availability and pricing with you directly.": "यह एक पूछताछ कार्ट है, भुगतान चेकआउट नहीं। जब तक धनोका सीधे आपसे उपलब्धता और मूल्य की पुष्टि नहीं करता, तब तक कोई ऑर्डर नहीं होता।",
  "Remove": "हटाएँ",
  "Decrease quantity": "मात्रा घटाएँ",
  "Increase quantity": "मात्रा बढ़ाएँ",

  // Categories page
  "Product Categories": "उत्पाद श्रेणियाँ",

  // Knowledge page
  "Practical information to support everyday farming decisions. Content is added and updated over time.": "रोज़मर्रा के खेती संबंधी फ़ैसलों में मदद करने वाली व्यावहारिक जानकारी। समय के साथ सामग्री जोड़ी और अपडेट की जाती है।",
  "General guidance on caring for common crops through different growth stages. Content for this section will be added soon.": "विभिन्न वृद्धि चरणों में आम फसलों की देखभाल पर सामान्य मार्गदर्शन। इस सेक्शन की सामग्री जल्द जोड़ी जाएगी।",
  "Background information to help you understand the agricultural products available through Dhanoka. Content for this section will be added soon.": "धनोका पर उपलब्ध कृषि उत्पादों को समझने में मदद करने वाली पृष्ठभूमि जानकारी। इस सेक्शन की सामग्री जल्द जोड़ी जाएगी।",
  "Notes on preparing for the season ahead, based on general agricultural practice. Content for this section will be added soon.": "सामान्य कृषि पद्धति के आधार पर आने वाले मौसम की तैयारी से जुड़े सुझाव। इस सेक्शन की सामग्री जल्द जोड़ी जाएगी।",
  "General awareness content on common pests and diseases. This section will not include specific application rates or dosages.": "आम कीटों और रोगों पर सामान्य जागरूकता सामग्री। इस सेक्शन में विशिष्ट प्रयोग दर या मात्रा शामिल नहीं होगी।",
  "Agricultural Updates": "कृषि अपडेट",
  "Occasional updates relevant to farmers using Dhanoka's product range. Content for this section will be added soon.": "धनोका के उत्पादों का उपयोग करने वाले किसानों के लिए समय-समय पर प्रासंगिक अपडेट। इस सेक्शन की सामग्री जल्द जोड़ी जाएगी।",
  "Farm Knowledge content on this site is general in nature and does not replace product labels or professional agricultural guidance. Please consult the product label and a qualified agricultural expert before applying any crop-care product.": "इस साइट पर कृषि जानकारी सामान्य प्रकृति की है और यह उत्पाद लेबल या पेशेवर कृषि सलाह का विकल्प नहीं है। किसी भी फसल-देखभाल उत्पाद का प्रयोग करने से पहले कृपया उत्पाद लेबल देखें और किसी योग्य कृषि विशेषज्ञ से सलाह लें।",

  // Privacy page
  "Overview": "अवलोकन",
  "This Privacy Policy explains how Dhanoka handles information submitted through this website, such as enquiry forms. This is a general policy for a static informational website and will be updated as Dhanoka's systems and services develop.": "यह गोपनीयता नीति बताती है कि धनोका इस वेबसाइट के माध्यम से भेजी गई जानकारी, जैसे पूछताछ फ़ॉर्म, का उपयोग कैसे करता है। यह एक सामान्य सूचनात्मक वेबसाइट के लिए सामान्य नीति है और धनोका की प्रणालियों व सेवाओं के विकास के साथ अपडेट होती रहेगी।",
  "Information We Collect": "हम कौन सी जानकारी एकत्र करते हैं",
  "When you submit an enquiry, we may collect the information you choose to provide, such as your name, mobile number, email address, location details, and details of the products you are interested in.": "जब आप पूछताछ भेजते हैं, तो हम आपके द्वारा दी गई जानकारी एकत्र कर सकते हैं, जैसे आपका नाम, मोबाइल नंबर, ईमेल पता, स्थान का विवरण, और आपकी रुचि के उत्पादों की जानकारी।",
  "How Information Is Used": "जानकारी का उपयोग कैसे होता है",
  "Information submitted through enquiry forms or WhatsApp is used only to respond to your enquiry and share availability or pricing information. Dhanoka does not sell personal information to third parties.": "पूछताछ फ़ॉर्म या व्हाट्सएप के माध्यम से भेजी गई जानकारी का उपयोग केवल आपकी पूछताछ का जवाब देने और उपलब्धता या मूल्य की जानकारी साझा करने के लिए किया जाता है। धनोका व्यक्तिगत जानकारी किसी तीसरे पक्ष को नहीं बेचता।",
  "Cart / Enquiry Data": "कार्ट / पूछताछ डेटा",
  "Product selections made using the enquiry cart on this website are stored locally in your own browser (using localStorage) and are not automatically transmitted to Dhanoka unless you choose to send them via the WhatsApp or enquiry form options.": "इस वेबसाइट पर पूछताछ कार्ट के माध्यम से चुने गए उत्पाद आपके अपने ब्राउज़र में स्थानीय रूप से (localStorage का उपयोग करके) सहेजे जाते हैं और तब तक धनोका को स्वतः नहीं भेजे जाते, जब तक आप उन्हें WhatsApp या पूछताछ फ़ॉर्म के माध्यम से भेजने का चुनाव नहीं करते।",
  "Cookies & Local Storage": "कुकीज़ एवं लोकल स्टोरेज",
  "This website uses browser local storage to remember your enquiry cart between visits. No third-party advertising cookies are used.": "यह वेबसाइट आपकी पूछताछ कार्ट को याद रखने के लिए ब्राउज़र लोकल स्टोरेज का उपयोग करती है। कोई तीसरे पक्ष की विज्ञापन कुकीज़ उपयोग नहीं की जातीं।",
  "For questions about this policy, please reach out using the contact details on our": "इस नीति से जुड़े सवालों के लिए, कृपया हमारे संपर्क विवरण का उपयोग करके संपर्क करें",
  "Contact page": "संपर्क पृष्ठ",
  "Updates to This Policy": "इस नीति में अपडेट",
  "This policy may be updated from time to time as Dhanoka's website and services evolve. GSTIN, business registration details and additional legal information will be added here as applicable.": "जैसे-जैसे धनोका की वेबसाइट और सेवाएँ विकसित होंगी, यह नीति समय-समय पर अपडेट की जा सकती है। GSTIN, व्यवसाय पंजीकरण विवरण और अतिरिक्त कानूनी जानकारी यहाँ जोड़ी जाएगी।",

  // Product page
  "Product": "उत्पाद",
  "Product Name": "उत्पाद का नाम",
  "Category": "श्रेणी",
  "Available Pack Sizes": "उपलब्ध पैक साइज़",
  "Please refer to the product label and applicable agricultural guidance before use.": "उपयोग से पहले कृपया उत्पाद लेबल और लागू कृषि सलाह देखें।",
  "Product information will be updated.": "उत्पाद जानकारी जल्द अपडेट की जाएगी।",
  "Important Information": "महत्वपूर्ण जानकारी",
  "Product availability, pack sizes and information may vary. Please verify product labels and seek appropriate agricultural guidance before use. Dhanoka does not claim manufacturer, distributor or official partnership status for products shown unless explicitly stated.": "उत्पाद की उपलब्धता, पैक साइज़ और जानकारी बदल सकती है। कृपया उपयोग से पहले उत्पाद लेबल की जाँच करें और उचित कृषि सलाह लें। जब तक स्पष्ट रूप से न कहा जाए, धनोका दिखाए गए उत्पादों के लिए निर्माता, वितरक या आधिकारिक साझेदारी का दावा नहीं करता।",
  "Product not found": "उत्पाद नहीं मिला",
  "The product you're looking for may have been moved or is no longer listed.": "आप जिस उत्पाद को खोज रहे हैं वह हटाया जा चुका है या अब सूचीबद्ध नहीं है।",
  "Browse All Products": "सभी उत्पाद देखें",
  "Enquire Now": "अभी पूछताछ करें",
  "View Product": "उत्पाद देखें",
  "Category: to be updated": "श्रेणी: जल्द अपडेट होगी",
  "Pack size: to be updated": "पैक साइज़: जल्द अपडेट होगा",

  // Products listing page
  "All Products | Dhanoka Agricultural Inputs": "सभी उत्पाद | धनोका कृषि उत्पाद",
  "Browse Dhanoka's agricultural product catalog. Use search and filters to find what you need.": "धनोका के कृषि उत्पादों की सूची देखें। ज़रूरत की चीज़ खोजने के लिए खोज और फ़िल्टर का उपयोग करें।",
  "Name A-Z": "नाम A-Z",
  "Name Z-A": "नाम Z-A",
  "Clear Filters": "फ़िल्टर हटाएँ",
  "No products match your search.": "आपकी खोज से मेल खाता कोई उत्पाद नहीं मिला।",
  "Try a different keyword, or clear your filters to see the full catalog.": "कोई और शब्द आज़माएँ, या पूरी सूची देखने के लिए फ़िल्टर हटाएँ।",

  // Terms page
  "Use of This Website": "इस वेबसाइट का उपयोग",
  "This website is provided by Dhanoka to help farmers and customers discover agricultural inputs and crop-care products, and to submit enquiries about availability and pricing.": "यह वेबसाइट धनोका द्वारा किसानों और ग्राहकों को कृषि उत्पाद और फसल-देखभाल उत्पाद खोजने में मदद करने, तथा उपलब्धता व मूल्य के बारे में पूछताछ भेजने के लिए उपलब्ध कराई गई है।",
  "No Online Payment or Checkout": "कोई ऑनलाइन भुगतान या चेकआउट नहीं",
  "This website does not currently process payments. Any \"cart\" or \"enquiry\" functionality on this site is used to prepare an enquiry message only. No order is confirmed, and no payment is taken, until Dhanoka and the customer agree on availability, pricing and terms separately.": "यह वेबसाइट फ़िलहाल कोई भुगतान संसाधित नहीं करती। इस साइट पर \"कार्ट\" या \"पूछताछ\" सुविधा का उपयोग केवल पूछताछ संदेश तैयार करने के लिए किया जाता है। जब तक धनोका और ग्राहक अलग से उपलब्धता, मूल्य और शर्तों पर सहमत नहीं होते, तब तक कोई ऑर्डर पुष्ट नहीं होता और कोई भुगतान नहीं लिया जाता।",
  "Product names, images and pack sizes shown on this website are provided for reference. Where specific technical information (such as active ingredients, dosage or registration details) is not yet available, the listing will state that the information will be updated. Please always refer to the physical product label before use.": "इस वेबसाइट पर दिखाए गए उत्पाद नाम, चित्र और पैक साइज़ केवल संदर्भ के लिए हैं। जहाँ विशिष्ट तकनीकी जानकारी (जैसे सक्रिय तत्व, मात्रा या पंजीकरण विवरण) अभी उपलब्ध नहीं है, वहाँ बताया जाएगा कि जानकारी अपडेट की जाएगी। कृपया उपयोग से पहले हमेशा वास्तविक उत्पाद लेबल देखें।",
  "Brand & Business Relationships": "ब्रांड एवं व्यावसायिक संबंध",
  "Dhanoka is a business focused on helping customers discover and enquire about agricultural products. Product brands and manufacturers shown on packaging belong to their respective owners. Dhanoka does not claim manufacturer, exclusive distributor, or official partnership status with any brand unless explicitly stated in writing.": "धनोका एक ऐसा व्यवसाय है जो ग्राहकों को कृषि उत्पाद खोजने और उनके बारे में पूछताछ करने में मदद करने पर केंद्रित है। पैकेजिंग पर दिखाए गए उत्पाद ब्रांड और निर्माता उनके संबंधित मालिकों के हैं। जब तक लिखित रूप में स्पष्ट न कहा जाए, धनोका किसी भी ब्रांड के साथ निर्माता, विशेष वितरक या आधिकारिक साझेदारी का दावा नहीं करता।",
  "Limitation of Liability": "दायित्व की सीमा",
  "Agricultural products should be used strictly according to the product label and applicable regulations. Dhanoka is not responsible for misuse of any product purchased or enquired about through this website.": "कृषि उत्पादों का उपयोग हमेशा उत्पाद लेबल और लागू नियमों के अनुसार ही करना चाहिए। इस वेबसाइट के माध्यम से खरीदे या पूछताछ किए गए किसी भी उत्पाद के दुरुपयोग के लिए धनोका ज़िम्मेदार नहीं है।",
  "Changes to These Terms": "इन शर्तों में बदलाव",
  "These terms may be updated periodically. Continued use of this website indicates acceptance of the current terms.": "ये शर्तें समय-समय पर अपडेट की जा सकती हैं। इस वेबसाइट का उपयोग जारी रखना मौजूदा शर्तों की स्वीकृति दर्शाता है।"
};

/* ---------- Attribute keys we translate in addition to text ---------- */
const DHANOKA_I18N_ATTRS = ["placeholder", "aria-label", "alt", "title"];

/* ---------- Suffix / prefix templated strings (dynamic content) ---------- */
function translateDynamicFragment(text) {
  if (/ added to your enquiry cart\.$/.test(text)) {
    const name = text.replace(/ added to your enquiry cart\.$/, "");
    return name + " आपकी पूछताछ कार्ट में जोड़ा गया।";
  }
  if (/^Pack size: /.test(text)) {
    return text.replace(/^Pack size: /, "पैक साइज़: ");
  }
  if (text === "Your enquiry details are ready. Please also send via WhatsApp for a faster response.") {
    return "आपकी पूछताछ जानकारी तैयार है। तेज़ जवाब के लिए कृपया WhatsApp पर भी भेजें।";
  }
  return null;
}

function dhanokaTranslateString(str) {
  if (DHANOKA_HI_DICT.hasOwnProperty(str)) return DHANOKA_HI_DICT[str];
  const dyn = translateDynamicFragment(str);
  if (dyn) return dyn;
  return null;
}

/* ---------- Core walker ---------- */
function dhanokaWalk(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: function (node) {
      const parentTag = node.parentNode && node.parentNode.tagName;
      if (parentTag === "SCRIPT" || parentTag === "STYLE") return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);

  nodes.forEach((node) => {
    const raw = node.nodeValue;
    const trimmed = raw.trim();
    if (!trimmed) return;
    const translated = dhanokaTranslateString(trimmed);
    if (translated) {
      // preserve surrounding whitespace
      const leading = raw.match(/^\s*/)[0];
      const trailing = raw.match(/\s*$/)[0];
      node.nodeValue = leading + translated + trailing;
    }
  });

  // Attributes
  const attrEls = root.querySelectorAll ? root.querySelectorAll("[placeholder],[aria-label],[alt],[title]") : [];
  attrEls.forEach((el) => {
    DHANOKA_I18N_ATTRS.forEach((attr) => {
      const val = el.getAttribute(attr);
      if (!val) return;
      const t = dhanokaTranslateString(val.trim());
      if (t) el.setAttribute(attr, t);
    });
  });
}

function dhanokaRevertToEnglish() {
  window.location.reload();
}

const DHANOKA_LANG_KEY = "dhanoka_lang";

function dhanokaApplyLanguage(lang) {
  document.documentElement.lang = lang === "hi" ? "hi" : "en";
  if (lang === "hi") {
    dhanokaWalk(document.body);
  }
  const toggles = document.querySelectorAll("[data-lang-toggle]");
  toggles.forEach((btn) => {
    btn.textContent = lang === "hi" ? "English" : "हिंदी";
    btn.setAttribute("aria-label", lang === "hi" ? "Switch to English" : "हिंदी में देखें");
  });
}

function dhanokaSetLanguage(lang) {
  try { localStorage.setItem(DHANOKA_LANG_KEY, lang); } catch (e) {}
  if (lang === "hi") {
    dhanokaApplyLanguage("hi");
  } else {
    // Simplest reliable way back to English is a reload (no HI state kept in DOM once reloaded).
    dhanokaRevertToEnglish();
  }
}

function dhanokaInitLangToggle() {
  const toggles = document.querySelectorAll("[data-lang-toggle]");
  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const current = (localStorage.getItem(DHANOKA_LANG_KEY) || "en");
      dhanokaSetLanguage(current === "hi" ? "en" : "hi");
    });
  });

  let lang = "en";
  try { lang = localStorage.getItem(DHANOKA_LANG_KEY) || "en"; } catch (e) {}
  dhanokaApplyLanguage(lang);

  if (lang === "hi") {
    // Watch for dynamically-added content (product grids, cart items, toasts)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            dhanokaWalk(node);
          } else if (node.nodeType === 3) {
            const trimmed = node.nodeValue.trim();
            if (trimmed) {
              const t = dhanokaTranslateString(trimmed);
              if (t) node.nodeValue = node.nodeValue.replace(trimmed, t);
            }
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

document.addEventListener("DOMContentLoaded", dhanokaInitLangToggle);
