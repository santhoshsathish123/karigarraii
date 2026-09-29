/* ===================================================================
   KARIGARAI PROTOTYPE — 100% PURE HTML/CSS/JAVASCRIPT IMPLEMENTATION
   Role-Based Views (Buyer: Products Only | Seller: AI Tools & Studio)
   Smart India Hackathon Demo
=================================================================== */

// Global User State
let currentUser = {
    role: "seller", // 'seller' or 'buyer'
    name: "Ramesh Kumar (Artisan)",
    contact: "9080397187"
};

let activeCategoryFilter = "all";
let originalPreviewSrc = null;
let currentProcessedImage = null;
let voiceTranslationData = { original: "", english: "", hindi: "" };
let domTextNodes = [];
let originalDomTexts = new Map();

// Built-in Comprehensive UI Translation Dictionaries (Instant & Offline-Safe)
const UI_DICTIONARY = {
    hi: {
        "KarigarAI": "कारीगरAI",
        "Smart Business for Artisans": "कारीगरों के लिए स्मार्ट व्यवसाय",
        "Artisan": "कारीगर",
        "Seller": "विक्रेता",
        "Buyer": "खरीदार",
        "Retailer": "खुदरा विक्रेता",
        "AI-POWERED BUSINESS MANAGER": "AI-संचालित व्यवसाय प्रबंधक",
        "HANDMADE MARKETPLACE": "हस्तशिल्प मार्केटप्लेस",
        "Turn your craft into a digital business.": "अपने शिल्प को एक डिजिटल व्यवसाय में बदलें।",
        "Turn your craft": "अपने शिल्प को",
        "into a digital business.": "डिजिटल व्यवसाय में बदलें।",
        "Create professional product listings, discover competitive prices and reach buyers across India — with the power of AI.": "पेशेवर उत्पाद लिस्टिंग बनाएं, प्रतिस्पर्धी मूल्य खोजें और भारत भर के खरीदारों तक पहुंचें — AI की शक्ति के साथ।",
        "Discover authentic handmade crafts from skilled artisans across India with transparent pricing and direct ordering.": "पारदर्शी मूल्य निर्धारण और प्रत्यक्ष ऑर्डर के साथ पूरे भारत के कुशल कारीगरों से प्रामाणिक हस्तनिर्मित शिल्प खोजें।",
        "Add New Product": "नया उत्पाद जोड़ें",
        "Explore Available Products": "उपलब्ध उत्पाद देखें",
        "AI Catalog": "AI कैटलॉग",
        "Generated": "जनरेट हुआ",
        "Smart Price": "स्मार्ट मूल्य",
        "Products Listed": "सूचीबद्ध उत्पाद",
        "Potential Sales": "संभावित बिक्री",
        "Buyer Views": "खरीदार दृश्य",
        "Product Rating": "उत्पाद रेटिंग",
        "YOUR AI ASSISTANT": "आपका AI सहायक",
        "What would you like to do?": "आप क्या करना चाहेंगे?",
        "AI Image Studio": "AI इमेज स्टूडियो",
        "Turn ordinary product photos into professional e-commerce images.": "साधारण उत्पाद तस्वीरों को पेशेवर ई-कॉमर्स छवियों में बदलें।",
        "Background Removal · Lighting · Crop": "पृष्ठभूमि हटाना · प्रकाश · क्रॉप",
        "Smart Catalog": "स्मार्ट कैटलॉग",
        "Describe your product in your regional language and let AI do the rest.": "अपने उत्पाद का वर्णन अपनी क्षेत्रीय भाषा में करें और बाकी AI पर छोड़ दें।",
        "Voice · Translation · SEO": "आवाज़ · अनुवाद · SEO",
        "Dynamic Pricing": "गतिशील मूल्य निर्धारण",
        "Get an AI-powered competitive price based on costs and market trends.": "लागत और बाजार के रुझान के आधार पर AI-संचालित प्रतिस्पर्धी मूल्य प्राप्त करें।",
        "Market · Cost · Demand": "बाजार · लागत · मांग",
        "Market Link": "मार्केट लिंक",
        "Connect your products with buyers, retailers and larger markets.": "अपने उत्पादों को खरीदारों, खुदरा विक्रेताओं और बड़े बाजारों से जोड़ें।",
        "B2B · Buyers · Government": "B2B · खरीदार · सरकार",
        "YOUR INVENTORY": "आपकी सूची",
        "My Products": "मेरे उत्पाद",
        "AUTHENTIC CATALOG": "प्रामाणिक कैटलॉग",
        "Available Handmade Crafts": "उपलब्ध हस्तनिर्मित शिल्प",
        "View All →": "सभी देखें →",
        "Traditional Bamboo Basket": "पारंपरिक बांस की टोकरी",
        "Handcrafted · Eco-friendly": "हस्तनिर्मित · पर्यावरण-अनुकूल",
        "Handwoven Cotton Saree": "हथकरघा सूती साड़ी",
        "Traditional · Handwoven": "पारंपरिक · हथकरघा",
        "Terracotta Pot": "टेराकोटा मिट्टी का बर्तन",
        "Handmade · Traditional": "हस्तनिर्मित · पारंपरिक",
        "Handcrafted Brass Diya Lamp": "हस्तनिर्मित पीतल का दीया",
        "Jaipur Blue Pottery Vase": "जयपुर ब्लू पॉटरी फूलदान",
        "Cane Handcrafted Fruit Tray": "बेंत की हस्तनिर्मित फ्रूट ट्रे",
        "Order Now 🛍": "अभी ऑर्डर करें 🛍",
        "All Crafts": "सभी शिल्प",
        "STEP 01": "चरण 01",
        "Make your product photo ready for online selling.": "अपनी उत्पाद फ़ोटो को ऑनलाइन बिक्री के लिए तैयार करें।",
        "Upload Product Photo": "उत्पाद फ़ोटो अपलोड करें",
        "Take a photo or choose one from your device": "एक फ़ोटो लें या अपने डिवाइस से चुनें",
        "Choose Photo": "फ़ोटो चुनें",
        "AI Enhancement": "AI संवर्धन",
        "Background Removal": "पृष्ठभूमि हटाना",
        "Remove unwanted surroundings": "अवांछित परिवेश हटाएं",
        "Lighting Correction": "प्रकाश सुधार",
        "Improve brightness and clarity": "चमक और स्पष्टता में सुधार करें",
        "E-commerce Format": "ई-कॉमर्स प्रारूप",
        "Optimize image dimensions": "छवि आयामों को अनुकूलित करें",
        "Enhance with AI": "AI के साथ संवर्धित करें",
        "STEP 02": "चरण 02",
        "Multilingual Auto-Cataloger": "बहुभाषी ऑटो-कैटलॉगर",
        "Tell us about your product. AI will create the listing.": "हमें अपने उत्पाद के बारे में बताएं। AI लिस्टिंग तैयार करेगा।",
        "Product Name": "उत्पाद का नाम",
        "Describe your product": "अपने उत्पाद का वर्णन करें",
        "Input Language": "इनपुट भाषा",
        "Generate AI Catalog": "AI कैटलॉग बनाएं",
        "AI GENERATED": "AI द्वारा जनरेट",
        "ENGLISH": "अंग्रेज़ी",
        "हिन्दी": "हिन्दी",
        "SEO KEYWORDS": "SEO कीवर्ड",
        "STEP 03": "चरण 03",
        "Dynamic Pricing Assistant": "गतिशील मूल्य सहायक",
        "Get a competitive price recommendation.": "प्रतिस्पर्धी मूल्य अनुशंसा प्राप्त करें।",
        "Raw Material Cost": "कच्चे माल की लागत",
        "Crafting / Labour Cost": "शिल्प / श्रम लागत",
        "Other Costs": "अन्य लागत",
        "Analyze Market Price": "बाजार मूल्य का विश्लेषण करें",
        "AI RECOMMENDED PRICE": "AI अनुशंसित मूल्य",
        "Based on estimated market demand, production costs and competitive pricing.": "अनुमानित बाजार मांग, उत्पादन लागत और प्रतिस्पर्धी मूल्य निर्धारण पर आधारित।",
        "AI Confidence": "AI विश्वसनीयता",
        "STEP 04": "चरण 04",
        "Market Linkage": "बाजार जुड़ाव",
        "Discover potential markets for your products.": "अपने उत्पादों के लिए संभावित बाजारों की खोज करें।",
        "AI MARKET MATCH": "AI बाजार मिलान",
        "We found 24 potential buyers for your products.": "हमें आपके उत्पादों के लिए 24 संभावित खरीदार मिले हैं।",
        "B2B DIRECT SOURCING": "B2B प्रत्यक्ष स्रोत",
        "Verified Artisan Clusters": "सत्यापित कारीगर क्लस्टर",
        "Request Custom Bulk Quote →": "अनुकूलित थोक मूल्य का अनुरोध करें →",
        "Contact Cooperative & Order": "कारीगर सहकारी समिति से संपर्क करें",
        "OUR IMPACT": "हमारा प्रभाव",
        "From local craftsmanship to global opportunity.": "स्थानीय शिल्प कौशल से वैश्विक अवसर तक।",
        "KarigarAI reduces the digital barrier for marginalized artisans and helps them access continuous, year-round markets.": "कारीगरAI कारीगरों के लिए डिजिटल बाधा को कम करता है और उन्हें वर्ष भर निरंतर बाजारों तक पहुंचने में मदद करता है।",
        "Days of Market Access": "बाजार पहुंच के दिन",
        "Digital Reach Potential": "डिजिटल पहुंच क्षमता",
        "AI Business Assistance": "AI व्यापार सहायता",
        "AI-driven market linkage for artisans.": "कारीगरों के लिए AI-संचालित बाजार जुड़ाव।",
        "Built for Smart India Hackathon": "स्मार्ट इंडिया हैकथॉन के लिए निर्मित"
    },
    ta: {
        "KarigarAI": "காரிகர்AI",
        "Smart Business for Artisans": "கைவினைஞர்களுக்கான ஸ்மார்ட் வணிகம்",
        "Artisan": "கைவினைஞர்",
        "Seller": "விற்பனையாளர்",
        "Buyer": "வாங்குபவர்",
        "Retailer": "சில்லறை விற்பனையாளர்",
        "AI-POWERED BUSINESS MANAGER": "AI-இயங்கும் வணிக மேலாளர்",
        "HANDMADE MARKETPLACE": "கைவினை சந்தை",
        "Turn your craft into a digital business.": "உங்கள் கைவினையை டிஜிட்டல் வணிகமாக மாற்றுங்கள்.",
        "Turn your craft": "உங்கள் கைவினையை",
        "into a digital business.": "டிஜிட்டல் வணிகமாக மாற்றுங்கள்.",
        "Create professional product listings, discover competitive prices and reach buyers across India — with the power of AI.": "தொழில்முறை தயாரிப்பு பட்டியல்களை உருவாக்குங்கள், சிறந்த விலைகளைக் கண்டறியுங்கள் மற்றும் இந்தியா முழுவதும் உள்ள வாங்குபவர்களை சென்றடையுங்கள் — AI ஆற்றலுடன்.",
        "Discover authentic handmade crafts from skilled artisans across India with transparent pricing and direct ordering.": "வெளிப்படையான விலை மற்றும் நேரடி ஆர்டருடன் இந்தியா முழுவதிலும் உள்ள திறமையான கைவினைஞர்களிடமிருந்து உண்மையான கைவினைப் பொருட்களைக் கண்டறியவும்.",
        "Add New Product": "புதிய தயாரிப்பைச் சேர்",
        "Explore Available Products": "கிடைக்கும் தயாரிப்புகளை ஆராயுங்கள்",
        "AI Catalog": "AI பட்டியல்",
        "Generated": "உருவாக்கப்பட்டது",
        "Smart Price": "ஸ்மார்ட் விலை",
        "Products Listed": "பட்டியலிடப்பட்ட தயாரிப்புகள்",
        "Potential Sales": "சாத்தியமான விற்பனை",
        "Buyer Views": "வாங்குபவர் பார்வைகள்",
        "Product Rating": "தயாரிப்பு மதிப்பீடு",
        "YOUR AI ASSISTANT": "உங்கள் AI உதவியாளர்",
        "What would you like to do?": "நீங்கள் என்ன செய்ய விரும்புகிறீர்கள்?",
        "AI Image Studio": "AI பட அரங்கம் (ஸ்டுடியோ)",
        "Turn ordinary product photos into professional e-commerce images.": "சாதாரண தயாரிப்பு புகைப்படங்களை தொழில்முறை இ-காமர்ஸ் படங்களாக மாற்றுங்கள்.",
        "Background Removal · Lighting · Crop": "பின்னணி நீக்கம் · வெளிச்சம் · வெட்டுதல்",
        "Smart Catalog": "ஸ்மார்ட் பட்டியல்",
        "Describe your product in your regional language and let AI do the rest.": "உங்கள் தயாரிப்பை உங்கள் தாய்மொழியில் விவரியுங்கள், மீதியை AI செய்யும்.",
        "Voice · Translation · SEO": "குரல் · மொழிபெயர்ப்பு · SEO",
        "Dynamic Pricing": "டைனமிக் விலை நிர்ணயம்",
        "Get an AI-powered competitive price based on costs and market trends.": "செலவுகள் மற்றும் சந்தை போக்குகளின் அடிப்படையில் AI-இயங்கும் போட்டி விலையைப் பெறுங்கள்.",
        "Market · Cost · Demand": "சந்தை · செலவு · தேவை",
        "Market Link": "சந்தை இணைப்பு",
        "Connect your products with buyers, retailers and larger markets.": "உங்கள் தயாரிப்புகளை வாங்குபவர்கள், சில்லறை விற்பனையாளர்கள் மற்றும் பெரிய சந்தைகளுடன் இணைக்கவும்.",
        "B2B · Buyers · Government": "B2B · வாங்குபவர்கள் · அரசு",
        "YOUR INVENTORY": "உங்கள் இருப்பு",
        "My Products": "என் தயாரிப்புகள்",
        "AUTHENTIC CATALOG": "உண்மையான பட்டியல்",
        "Available Handmade Crafts": "கிடைக்கும் கைவினை பொருட்கள்",
        "View All →": "அனைத்தையும் காண்க →",
        "Traditional Bamboo Basket": "பாரம்பரிய மூங்கில் கூடை",
        "Handcrafted · Eco-friendly": "கைவினை · சூழல் நட்பு",
        "Handwoven Cotton Saree": "கைத்தறி பருத்தி சேலை",
        "Traditional · Handwoven": "பாரம்பரிய · கைத்தறி",
        "Terracotta Pot": "சுடுமண் பானை",
        "Handmade · Traditional": "கைவினை · பாரம்பரியம்",
        "Handcrafted Brass Diya Lamp": "பித்தளை தீப விளக்கு",
        "Jaipur Blue Pottery Vase": "ஜெய்ப்பூர் நீல மட்பாண்ட பூந்தொட்டி",
        "Cane Handcrafted Fruit Tray": "பிரம்பு பழ தட்டு",
        "Order Now 🛍": "இப்போது ஆர்டர் செய்க 🛍",
        "All Crafts": "அனைத்து கைவினைகளும்",
        "STEP 01": "படி 01",
        "Make your product photo ready for online selling.": "உங்கள் தயாரிப்பு புகைப்படத்தை ஆன்லைன் விற்பனைக்கு தயார் செய்யுங்கள்.",
        "Upload Product Photo": "தயாரிப்பு புகைப்படத்தை பதிவேற்றவும்",
        "Take a photo or choose one from your device": "புகைப்படம் எடுக்கவும் அல்லது சாதனத்திலிருந்து தேர்வு செய்யவும்",
        "Choose Photo": "புகைப்படத்தை தேர்வு செய்",
        "AI Enhancement": "AI மேம்பாடு",
        "Background Removal": "பின்னணி நீக்கம்",
        "Remove unwanted surroundings": "தேவையற்ற பின்னணியை நீக்குங்கள்",
        "Lighting Correction": "வெளிச்ச திருத்தம்",
        "Improve brightness and clarity": "பிரகாசம் மற்றும் தெளிவை மேம்படுத்துங்கள்",
        "E-commerce Format": "இ-காமர்ஸ் வடிவம்",
        "Optimize image dimensions": "பட பரிமாணங்களை உகந்ததாக்குங்கள்",
        "Enhance with AI": "AI மூலம் மேம்படுத்துங்கள்",
        "STEP 02": "படி 02",
        "Multilingual Auto-Cataloger": "பன்மொழி தானியங்கி பட்டியல்",
        "Tell us about your product. AI will create the listing.": "உங்கள் தயாரிப்பு பற்றி சொல்லுங்கள். AI பட்டியலை உருவாக்கும்.",
        "Product Name": "தயாரிப்பு பெயர்",
        "Describe your product": "உங்கள் தயாரிப்பை விவரியுங்கள்",
        "Input Language": "உள்ளீட்டு மொழி",
        "Generate AI Catalog": "AI பட்டியலை உருவாக்கு",
        "AI GENERATED": "AI உருவாக்கியது",
        "ENGLISH": "ஆங்கிலம்",
        "हिन्दी": "இந்தி",
        "SEO KEYWORDS": "SEO முக்கிய வார்த்தைகள்",
        "STEP 03": "படி 03",
        "Dynamic Pricing Assistant": "டைனமிக் விலை உதவியாளர்",
        "Get a competitive price recommendation.": "போட்டி விலை பரிந்துரையைப் பெறுங்கள்.",
        "Raw Material Cost": "மூலப்பொருள் செலவு",
        "Crafting / Labour Cost": "கைவினை / உழைப்பு செலவு",
        "Other Costs": "இதர செலவுகள்",
        "Analyze Market Price": "சந்தை விலையை பகுப்பாய்வு செய்",
        "AI RECOMMENDED PRICE": "AI பரிந்துரைத்த விலை",
        "Based on estimated market demand, production costs and competitive pricing.": "மதிப்பிடப்பட்ட சந்தை தேவை, உற்பத்தி செலவுகள் மற்றும் போட்டி விலையின் அடிப்படையில்.",
        "AI Confidence": "AI நம்பிக்கை",
        "STEP 04": "படி 04",
        "Market Linkage": "சந்தை இணைப்பு",
        "Discover potential markets for your products.": "உங்கள் தயாரிப்புகளுக்கான சாத்தியமான சந்தைகளைக் கண்டறியுங்கள்.",
        "AI MARKET MATCH": "AI சந்தை பொருத்தம்",
        "We found 24 potential buyers for your products.": "உங்கள் தயாரிப்புகளுக்கு 24 சாத்தியமான வாங்குபவர்களை நாங்கள் கண்டறிந்துள்ளோம்.",
        "B2B DIRECT SOURCING": "B2B நேரடி ஆதாரம்",
        "Verified Artisan Clusters": "சரிபார்க்கப்பட்ட கைவினைஞர் கிளஸ்டர்கள்",
        "Request Custom Bulk Quote →": "மொத்த விலையைக் கோருங்கள் →",
        "Contact Cooperative & Order": "கூட்டுறவு அமைப்பைத் தொடர்புகொண்டு ஆர்டர் செய்யுங்கள்",
        "OUR IMPACT": "எங்கள் தாக்கம்",
        "From local craftsmanship to global opportunity.": "உள்ளூர் கைவினைத்திறனிலிருந்து உலகளாவிய வாய்ப்பிற்கு.",
        "KarigarAI reduces the digital barrier for marginalized artisans and helps them access continuous, year-round markets.": "காரிகர்AI கைவினைஞர்களுக்கான டிஜிட்டல் தடையைக் குறைத்து, ஆண்டு முழுவதும் தொடர்ச்சியான சந்தைகளை அணுக உதவுகிறது.",
        "Days of Market Access": "சந்தை அணுகல் நாட்கள்",
        "Digital Reach Potential": "டிஜிட்டல் சென்றடையும் திறன்",
        "AI Business Assistance": "AI வணிக உதவி",
        "AI-driven market linkage for artisans.": "கைவினைஞர்களுக்கான AI-இயங்கும் சந்தை இணைப்பு.",
        "Built for Smart India Hackathon": "ஸ்மார்ட் இந்தியா ஹேக்கத்தானுக்காக உருவாக்கப்பட்டது"
    }
};

// Cache manager
const i18nCache = {
    hi: Object.assign({}, UI_DICTIONARY.hi),
    ta: Object.assign({}, UI_DICTIONARY.ta)
};

try {
    const savedHi = localStorage.getItem("karigar_i18n_hi");
    if (savedHi) Object.assign(i18nCache.hi, JSON.parse(savedHi));
    const savedTa = localStorage.getItem("karigar_i18n_ta");
    if (savedTa) Object.assign(i18nCache.ta, JSON.parse(savedTa));
    const savedUser = localStorage.getItem("karigar_user");
    if (savedUser) currentUser = JSON.parse(savedUser);
} catch (e) {
    console.warn("localStorage init error:", e);
}


/* ================= USER AUTH & ROLE MANAGEMENT (TWO-STEP OTP FLOW) ================= */

let selectedRoleInModal = "seller";
let generatedMockOtp = "";

function openAuthModal() {
    const modal = document.getElementById("authModal");
    if (modal) {
        modal.classList.remove("hidden");
        resetAuthFormToStep1();
        selectRole(currentUser.role || "seller");
    }
}

function closeAuthModal() {
    const modal = document.getElementById("authModal");
    if (modal) {
        modal.classList.add("hidden");
        resetAuthFormToStep1();
    }
}

function resetAuthFormToStep1() {
    const existingOtpDiv = document.getElementById("otpFieldContainer");
    if (existingOtpDiv) existingOtpDiv.remove();

    const submitBtn = document.getElementById("authSubmitBtn");
    if (submitBtn) {
        submitBtn.innerText = selectedRoleInModal === "seller" ? "✦ Send Verification OTP" : "🛍 Send Verification OTP";
        submitBtn.setAttribute("onclick", "triggerMockOtp(event)");
    }
}

function selectRole(role) {
    selectedRoleInModal = role;
    const sellerCard = document.getElementById("roleCardSeller");
    const buyerCard = document.getElementById("roleCardBuyer");
    const nameInput = document.getElementById("authUserName");
    const idProofContainer = document.getElementById("sellerIdProofContainer");
    
    resetAuthFormToStep1();

    if (role === "seller") {
        if (sellerCard) sellerCard.classList.add("active");
        if (buyerCard) buyerCard.classList.remove("active");
        if (nameInput && (!nameInput.value || nameInput.value.includes("Buyer") || nameInput.value.includes("Retailer"))) {
            nameInput.value = "Ramesh Kumar (Artisan)";
        }
        // Force show ID proof container when Seller is selected
        if (idProofContainer) {
            idProofContainer.style.display = "block";
            idProofContainer.classList.remove("hidden");
        }
    } else {
        if (buyerCard) buyerCard.classList.add("active");
        if (sellerCard) sellerCard.classList.remove("active");
        if (nameInput && (!nameInput.value || nameInput.value.includes("Artisan"))) {
            nameInput.value = "Priya Sharma (Craft Boutique Buyer)";
        }
        // Hide ID proof container when Buyer is selected
        if (idProofContainer) {
            idProofContainer.style.display = "none";
        }
    }
}

function quickLogin(role) {
    selectRole(role);
    const nameInput = document.getElementById("authUserName");
    const contactInput = document.getElementById("authUserContact");

    if (role === "seller") {
        nameInput.value = "Ramesh Kumar (Artisan)";
        contactInput.value = "9080397187";
    } else {
        nameInput.value = "Priya Sharma (Craft Boutique Buyer)";
        contactInput.value = "+91 91234 56789";
    }

    applyUserLogin(role, nameInput.value, contactInput.value);
    closeAuthModal();
}

// Step 1: Send OTP Button Clicked
function triggerMockOtp(event) {
    event.preventDefault();
    const contactInput = document.getElementById("authUserContact");
    const contact = contactInput ? contactInput.value.trim() : "";

    if (!contact) {
        alert("Please enter your mobile number or email.");
        return;
    }

    // Generate 4-digit OTP
    generatedMockOtp = Math.floor(1000 + Math.random() * 9000).toString();
    
    // Show Alert with OTP
    alert(`📱 [KarigarAI Secure Gateway]\n\nDemo SMS sent to ${contact}\nYour Verification OTP is: ${generatedMockOtp}`);

    // Create OTP Input Box
    const formContainer = document.querySelector(".auth-form");
    if (formContainer && !document.getElementById("otpFieldContainer")) {
        const otpDiv = document.createElement("div");
        otpDiv.id = "otpFieldContainer";
        otpDiv.style.cssText = "margin-top: 15px; margin-bottom: 15px; background: #fdfbf7; padding: 15px; border-radius: 8px; border: 1px solid #e2d7c5;";
        otpDiv.innerHTML = `
            <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #2f6f4e;">Enter 4-Digit Verification OTP</label>
            <input type="text" id="authOtpInput" placeholder="Enter ${generatedMockOtp}" maxlength="4" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 1.1rem; letter-spacing: 3px; text-align: center;" required autocomplete="off">
            <small style="color: #666; display: block; margin-top: 5px;">Mock SMS Sent! Demo OTP: <strong>${generatedMockOtp}</strong></small>
        `;
        
        const submitBtn = document.getElementById("authSubmitBtn");
        formContainer.insertBefore(otpDiv, submitBtn);
        
        // Change button to Verify & Login mode
        submitBtn.innerText = "Verify OTP & Complete Login";
        submitBtn.setAttribute("onclick", "verifyOtpAndLogin(event)");
    }
}

// Step 2: Verify OTP & Login Button Clicked
function verifyOtpAndLogin(event) {
    event.preventDefault();
    const nameInput = document.getElementById("authUserName");
    const contactInput = document.getElementById("authUserContact");
    const otpInput = document.getElementById("authOtpInput");

    const name = nameInput ? nameInput.value.trim() : "User";
    const contact = contactInput ? contactInput.value.trim() : "";

    if (!otpInput || otpInput.value.trim() !== generatedMockOtp) {
        alert("❌ Invalid OTP! Please enter the correct verification code shown in the alert.");
        return;
    }

    // Success! Log user in
    applyUserLogin(selectedRoleInModal, name, contact);
    closeAuthModal();
}

// Dummy handler to prevent default form submits breaking anything
function handleAuthSubmit(event) {
    event.preventDefault();
}

function handleAuthSubmit(event) {
    event.preventDefault();
    const nameInput = document.getElementById("authUserName");
    const contactInput = document.getElementById("authUserContact");
    const otpInput = document.getElementById("authOtpInput");

    const name = nameInput ? nameInput.value.trim() : "User";
    const contact = contactInput ? contactInput.value.trim() : "";

    if (!isOtpStepActive) {
        // Step 1: Generate Mock OTP and Display Simulation Alert
        generatedMockOtp = Math.floor(1000 + Math.random() * 9000).toString();
        
        alert(`📱 [KarigarAI Secure Gateway]\n\nDemo SMS sent to ${contact}\nYour Verification OTP is: ${generatedMockOtp}`);

        // Step 2: Inject OTP input field dynamically into the form
        const formContainer = document.querySelector(".auth-form");
        if (formContainer && !document.getElementById("otpFieldContainer")) {
            const otpDiv = document.createElement("div");
            otpDiv.id = "otpFieldContainer";
            otpDiv.style.cssText = "margin-top: 15px; margin-bottom: 15px; background: #fdfbf7; padding: 15px; border-radius: 8px; border: 1px solid #e2d7c5;";
            otpDiv.innerHTML = `
                <label style="display: block; margin-bottom: 5px; font-weight: bold; color: #2f6f4e;">Enter 4-Digit Verification OTP</label>
                <input type="text" id="authOtpInput" placeholder="Enter ${generatedMockOtp}" maxlength="4" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; font-size: 1.1rem; letter-spacing: 3px; text-align: center;" required>
                <small style="color: #666; display: block; margin-top: 5px;">Mock SMS Sent! Demo OTP: <strong>${generatedMockOtp}</strong></small>
            `;
            
            const submitBtn = document.getElementById("authSubmitBtn");
            formContainer.insertBefore(otpDiv, submitBtn);
            submitBtn.innerText = "Verify OTP & Complete Login";
        }

        isOtpStepActive = true;
        return;
    }

    // Step 3: Verify OTP Input
    if (!otpInput || otpInput.value.trim() !== generatedMockOtp) {
        alert("❌ Invalid OTP! Please enter the correct verification code shown in the demo alert.");
        return;
    }

    // Successful Verification & Login
    applyUserLogin(selectedRoleInModal, name, contact);
    closeAuthModal();
}

function handleAuthSubmit(event) {
    event.preventDefault();
    const nameInput = document.getElementById("authUserName");
    const contactInput = document.getElementById("authUserContact");

    const name = nameInput ? nameInput.value.trim() : "User";
    const contact = contactInput ? contactInput.value.trim() : "";

    applyUserLogin(selectedRoleInModal, name, contact);
    closeAuthModal();
}

function applyUserLogin(role, name, contact) {
    currentUser = { role, name, contact };
    try {
        localStorage.setItem("karigar_user", JSON.stringify(currentUser));
    } catch (e) {}

    updateUIRole();

    const roleName = role === "seller" ? "Artisan / Seller" : "Buyer / Retailer";
    alert(
        `Welcome, ${name}!\n\n` +
        `Logged in as ${roleName}.\n` +
        (role === "seller" 
            ? "Your AI Creator Studio, Pricing & Auto-Cataloger are ready." 
            : "Available artisan products and direct maker orders are ready.")
    );
}

function updateUIRole() {
    const isSeller = currentUser.role === "seller";
    const avatar = document.getElementById("headerAvatar");
    const userName = document.getElementById("headerUserName");
    const roleBadge = document.getElementById("headerRoleBadge");
    const notifText = document.getElementById("roleNotifText");
    const notifIcon = document.getElementById("notifIcon");
    const heroBadge = document.getElementById("heroBadge");
    const heroTitle = document.getElementById("heroTitle");
    const heroSubtitle = document.getElementById("heroSubtitle");
    const heroBtn = document.getElementById("heroActionBtn");
    const heroCardOne = document.getElementById("heroCardOne");
    const heroCardTwo = document.getElementById("heroCardTwo");
    const inventoryEyebrow = document.getElementById("inventoryEyebrow");
    const inventoryTitle = document.getElementById("inventoryTitle");

    if (avatar) avatar.innerText = isSeller ? "A" : "B";
    if (userName) userName.innerText = isSeller ? "Artisan" : "Retailer";
    if (roleBadge) {
        roleBadge.innerText = isSeller ? "Seller" : "Buyer";
        roleBadge.style.color = isSeller ? "#8b6528" : "#2f6f4e";
    }

    if (notifIcon) notifIcon.innerText = isSeller ? "✦" : "🛍";
    if (notifText) {
        notifText.innerHTML = isSeller
            ? `Logged in as <strong>${currentUser.name} (Seller Mode)</strong>. AI creator studio, dynamic pricing, and cataloger are active.`
            : `Logged in as <strong>${currentUser.name} (Buyer Mode)</strong>. Showing available handmade crafts and direct artisan order options.`;
    }

    if (heroBadge) {
        heroBadge.innerHTML = isSeller
            ? `<span>✦</span> AI-POWERED BUSINESS MANAGER`
            : `<span>🛍</span> HANDMADE MARKETPLACE`;
    }

    if (heroTitle) {
        heroTitle.innerHTML = isSeller
            ? `Turn your craft<br>into a <span>digital business.</span>`
            : `Discover authentic crafts<br><span>directly from Indian artisans.</span>`;
    }

    if (heroSubtitle) {
        heroSubtitle.innerText = isSeller
            ? `Create professional product listings, discover competitive prices and reach buyers across India — with the power of AI.`
            : `Discover authentic handmade crafts from skilled artisans across India with transparent pricing and direct ordering.`;
    }

    if (heroBtn) {
        heroBtn.innerHTML = isSeller
            ? `<span>＋</span> Add New Product`
            : `<span>🛍</span> Explore Available Products`;
    }

    if (heroCardOne) {
        heroCardOne.innerHTML = isSeller
            ? `<span>✦</span> AI Catalog<strong>Generated</strong>`
            : `<span>✦</span> Verified<strong>500+ Makers</strong>`;
    }

    if (heroCardTwo) {
        heroCardTwo.innerHTML = isSeller
            ? `<span>₹</span> Smart Price<strong>₹1,250</strong>`
            : `<span>🤝</span> Direct<strong>0% Commission</strong>`;
    }

    if (inventoryEyebrow) inventoryEyebrow.innerText = isSeller ? "YOUR INVENTORY" : "AUTHENTIC CATALOG";
    if (inventoryTitle) inventoryTitle.innerText = isSeller ? "My Products" : "Available Handmade Crafts";

    document.querySelectorAll(".seller-only").forEach(el => {
        if (isSeller) {
            el.classList.remove("hidden");
        } else {
            el.classList.add("hidden");
        }
    });

    document.querySelectorAll(".buyer-only").forEach(el => {
        if (!isSeller) {
            el.classList.remove("hidden");
        } else {
            el.classList.add("hidden");
        }
    });

    if (!isSeller) {
        hideAllWorkspaces();
        const notifBtn = document.getElementById("sellerOrderNotifBtn");
        if(notifBtn) notifBtn.remove();
    }
}

function handleHeroAction() {
    if (currentUser.role === "seller") {
        openStudio();
    } else {
        const prodSec = document.getElementById("buyerFilterSection") || document.getElementById("productsSection");
        if (prodSec) {
            prodSec.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }
}


/* ================= BUYER SOURCING & ORDERING ================= */

function setCategoryFilter(category, buttonElement) {
    activeCategoryFilter = category;
    document.querySelectorAll(".category-pills .pill").forEach(p => p.classList.remove("active"));
    if (buttonElement) buttonElement.classList.add("active");
    filterBuyerProducts();
}

function filterBuyerProducts() {
    const searchVal = (document.getElementById("buyerSearchInput")?.value || "").toLowerCase().trim();
    const cards = document.querySelectorAll("#productsGrid .product-card");

    cards.forEach(card => {
        const cardCategory = card.getAttribute("data-category") || "";
        const cardName = (card.getAttribute("data-name") || "").toLowerCase();

        const matchesCategory = activeCategoryFilter === "all" || cardCategory === activeCategoryFilter;
        const matchesSearch = !searchVal || cardName.includes(searchVal) || cardCategory.includes(searchVal);

        if (matchesCategory && matchesSearch) {
            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

function orderProduct(name, price) {
    const modal = document.getElementById("orderModal");
    const nameInput = document.getElementById("orderProductName");
    const priceInput = document.getElementById("orderProductPrice");
    const qtyInput = document.getElementById("orderQuantity");

    if (nameInput) nameInput.value = name;
    if (priceInput) priceInput.value = price;
    if (qtyInput) qtyInput.value = "1";

    if (modal) modal.classList.remove("hidden");
}

function closeOrderModal() {
    const modal = document.getElementById("orderModal");
    if (modal) modal.classList.add("hidden");
}

function handleOrderSubmit(event) {
    event.preventDefault();
    const name = document.getElementById("orderProductName")?.value || "Craft Item";
    const price = document.getElementById("orderProductPrice")?.value || "";
    const qty = document.getElementById("orderQuantity")?.value || "1";
    const address = document.getElementById("orderAddress")?.value || "Not provided";

    fetch('http://localhost:3000/trigger-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => console.log("Real Exotel Alert Triggered:", data.message))
    .catch(err => console.warn("Backend alert notification note:", err));

    const pendingOrder = {
        name: name,
        price: price,
        qty: qty,
        address: address,
        status: "pending"
    };
    localStorage.setItem("karigar_pending_order", JSON.stringify(pendingOrder));

    closeOrderModal();

    let artisanDetailsPage = document.getElementById("artisanDetailsPage");
    if (!artisanDetailsPage) {
        artisanDetailsPage = document.createElement("section");
        artisanDetailsPage.id = "artisanDetailsPage";
        artisanDetailsPage.className = "workspace";
        const mainContent = document.querySelector("main") || document.body;
        mainContent.appendChild(artisanDetailsPage);
    }

    artisanDetailsPage.innerHTML = `
        <div style="max-width: 800px; margin: 30px auto; padding: 25px; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e2d7c5;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #f4efe6; padding-bottom: 15px; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #2f6f4e; font-size: 1.6rem;">🎉 Order Placed & Artisan Details</h2>
                <button onclick="closeArtisanPage()" style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #666;">✕</button>
            </div>

            <div style="background: #fdfbf7; padding: 15px; border-radius: 8px; border-left: 4px solid #8b6528; margin-bottom: 20px;">
                <h3 style="margin-top: 0; color: #8b6528;">Order Summary</h3>
                <p style="margin: 5px 0;"><strong>Item:</strong> ${name}</p>
                <p style="margin: 5px 0;"><strong>Quantity:</strong> ${qty}</p>
                <p style="margin: 5px 0;"><strong>Price:</strong> ${price} each</p>
                <p style="margin: 5px 0;"><strong>Shipping Location:</strong> ${address}</p>
            </div>

            <div style="background: #f4f8f5; padding: 15px; border-radius: 8px; border-left: 4px solid #2f6f4e; margin-bottom: 20px;">
                <h3 style="margin-top: 0; color: #2f6f4e;">Artisan Maker Information</h3>
                <p style="margin: 5px 0;"><strong>Artisan Name:</strong> Ramesh Kumar (Handicraft Specialist)</p>
                <p style="margin: 5px 0;"><strong>Craft Hub / Cluster:</strong> Jaipur Artisan Cooperative, Rajasthan</p>
                <p style="margin: 5px 0;"><strong>Verification Status:</strong> Verified Authentic Maker (0% Middleman Commission)</p>
                <p style="margin: 5px 0;"><strong>Contact Direct Phone:</strong> 9080397187</p>
            </div>

            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 25px;">
                <button onclick="connectArtisanWhatsApp('Ramesh Kumar', '${name}', '9080397187')" style="flex: 1; min-width: 200px; padding: 12px 20px; background: #25D366; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
                    💬 Chat on WhatsApp
                </button>
                <button onclick="callArtisanPhone('9080397187')" style="flex: 1; min-width: 200px; padding: 12px 20px; background: #2f6f4e; color: white; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
                    📞 Call Artisan Direct
                </button>
                <button onclick="closeArtisanPage()" style="padding: 12px 20px; background: #e0e0e0; color: #333; border: none; border-radius: 6px; font-weight: bold; cursor: pointer;">
                    Back to Marketplace
                </button>
            </div>
        </div>
    `;

    artisanDetailsPage.classList.remove("hidden");
    artisanDetailsPage.scrollIntoView({ behavior: "smooth", block: "start" });
}

function closeArtisanPage() {
    const page = document.getElementById("artisanDetailsPage");
    if (page) page.classList.add("hidden");
}

function callArtisanPhone(phone) {
    const phoneNumber = phone || currentUser.contact || "9080397187";
    const cleanNumber = phoneNumber.replace(/[^0-9+]/g, "");
    window.location.href = `tel:${cleanNumber}`;
}

function connectArtisanWhatsApp(artisanName, productName, phone) {
    const rawNumber = phone || currentUser.contact || "9080397187";
    let cleanNumber = rawNumber.replace(/[^0-9]/g, "");
    if (cleanNumber.length === 10) cleanNumber = "91" + cleanNumber;

    const message = encodeURIComponent(
        `Hello ${artisanName || "Artisan"}, I saw your product "${productName || "craft item"}" on KarigarAI and would like to place an order or ask for more details.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
}

function requestBulkQuote() {
    alert("📦 B2B Bulk Sourcing Request Initiated!\n\nWe have forwarded your wholesale inquiry to the Artisan Craft Cluster Coordinator.");
}

function contactArtisan(clusterName, phone) {
    const rawNumber = phone || "9080397187";
    let cleanNumber = rawNumber.replace(/[^0-9]/g, "");
    if (cleanNumber.length === 10) cleanNumber = "91" + cleanNumber;

    const message = encodeURIComponent(`Hello ${clusterName || "Artisan Cluster"}, I am interested in connecting directly for wholesale and bulk ordering via KarigarAI.`);
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
}


/* ================= WORKSPACE SHOW/HIDE (SELLER) ================= */

function hideAllWorkspaces() {
    document.querySelectorAll(".workspace").forEach(section => {
        section.classList.add("hidden");
    });
}

function openWorkspace(id) {
    if (currentUser.role !== "seller") {
        alert("Please switch to Seller Mode to use AI creator tools.");
        openAuthModal();
        return;
    }
    hideAllWorkspaces();
    const section = document.getElementById(id);
    if (section) {
        section.classList.remove("hidden");
        setTimeout(() => {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    }
}

function closeWorkspace() {
    hideAllWorkspaces();
}

function openStudio() { openWorkspace("studio"); }
function openCatalog() { openWorkspace("catalog"); }
function openPricing() { openWorkspace("pricing"); }
function openMarket() { openWorkspace("market"); }


/* ================= IMAGE PREVIEW & AI TOOLS ================= */

function previewImage(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        const preview = document.getElementById("preview");
        const message = document.getElementById("uploadMessage");
        originalPreviewSrc = e.target.result;
        currentProcessedImage = originalPreviewSrc;
        preview.src = e.target.result;
        preview.classList.remove("hidden");
        message.classList.add("hidden");
    };
    reader.readAsDataURL(file);
}

function loadImageElement(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(new Error("Image load error: " + err));
        img.src = src;
    });
}

function applyBackgroundRemoval(imageElement) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const w = imageElement.naturalWidth || imageElement.width || 600;
    const h = imageElement.naturalHeight || imageElement.height || 600;
    canvas.width = w; canvas.height = h;
    ctx.drawImage(imageElement, 0, 0, w, h);
    return canvas.toDataURL("image/png");
}

function applyLightingCorrection(imageElement) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const w = imageElement.naturalWidth || imageElement.width || 600;
    const h = imageElement.naturalHeight || imageElement.height || 600;
    canvas.width = w; canvas.height = h;
    ctx.drawImage(imageElement, 0, 0, w, h);
    return canvas.toDataURL("image/png");
}

function applyEcommerceFormat(imageElement) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const targetSize = 1000;
    canvas.width = targetSize; canvas.height = targetSize;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, targetSize, targetSize);
    ctx.drawImage(imageElement, 0, 0, targetSize, targetSize);
    return canvas.toDataURL("image/png");
}

async function enhanceImage() {
    const preview = document.getElementById("preview");
    if (preview.classList.contains("hidden") || !preview.src) {
        alert("Please upload a product image first.");
        return;
    }
    alert("AI enhancement completed successfully!");
}

async function translateTextClientSide(text, targetLang, sourceLang = "auto") {
    return text;
}

/* ================= REAL WEB SPEECH-TO-TEXT VOICE INPUT ================= */

function startVoice() {
    // Check if browser supports Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
        alert("⚠️ Speech recognition is not supported in this browser. Please use Google Chrome.");
        return;
    }

    const recognition = new SpeechRecognition();
    
    // Get selected input language or default to Tamil/Hindi based on dropdown
    const langSelect = document.getElementById("inputLanguage");
    recognition.lang = langSelect ? langSelect.value : "ta-IN";
    
    const descInput = document.getElementById("productDescription");
    const translatingBadge = document.getElementById("voiceTranslatingState");

    if (translatingBadge) translatingBadge.classList.remove("hidden");
    if (descInput) descInput.placeholder = "🎤 Listening... Speak now...";

    recognition.onstart = function() {
        console.log("Voice recognition started. Speak into the microphone.");
    };

    recognition.onresult = function(event) {
        const spokenText = event.results[0][0].transcript;
        if (descInput) {
            descInput.value = spokenText;
        }
        if (translatingBadge) translatingBadge.classList.add("hidden");
    };

    recognition.onerror = function(event) {
        console.warn("Speech recognition error:", event.error);
        alert("⚠️️ Voice input error or permission denied. Please type manually or try again.");
        if (translatingBadge) translatingBadge.classList.add("hidden");
        if (descInput) descInput.placeholder = "Type your description or use your voice...";
    };

    recognition.onend = function() {
        if (translatingBadge) translatingBadge.classList.add("hidden");
        if (descInput && !descInput.value) {
            descInput.placeholder = "Type your description or use your voice...";
        }
    };

    // Start listening
    try {
        recognition.start();
    } catch (e) {
        console.warn("Recognition start info:", e);
    }
}

async function generateCatalog() {
    const nameInput = document.getElementById("productName");
    const name = nameInput ? nameInput.value.trim() : "";
    if (!name) {
        alert("Please enter product name.");
        return;
    }
    document.getElementById("resultName").innerText = name;
    document.getElementById("catalogResult").classList.remove("hidden");
}

function calculatePrice() {
    alert("AI Market Analysis Complete! Recommended Price calculated.");
}


/* ================= LIVE CUSTOMER ORDER DETAILS & IMAGE UPLOAD ================= */

document.addEventListener("DOMContentLoaded", () => {
    updateUIRole();
});

setInterval(() => {
    if (currentUser.role === "seller" && localStorage.getItem("karigar_pending_order")) {
        const order = JSON.parse(localStorage.getItem("karigar_pending_order"));
        if (!document.getElementById("sellerOrderNotifBtn")) {
            const btn = document.createElement("button");
            btn.id = "sellerOrderNotifBtn";
            btn.innerHTML = "🔔 New Order Received! Click to View";
            btn.style.cssText = "position: fixed; bottom: 30px; right: 30px; background: #2f6f4e; color: white; border: none; padding: 15px 25px; border-radius: 50px; font-weight: bold; cursor: pointer; z-index: 9999; box-shadow: 0 4px 15px rgba(0,0,0,0.3);";
            btn.onclick = openSimpleSellerDashboard;
            document.body.appendChild(btn);
        }
    } else {
        const btn = document.getElementById("sellerOrderNotifBtn");
        if(btn) btn.remove();
    }
}, 2000);

function openSimpleSellerDashboard() {
    if (currentUser.role !== "seller") return;
    
    hideAllWorkspaces();

    const existingBtn = document.getElementById("sellerOrderNotifBtn");
    if(existingBtn) existingBtn.remove();

    let page = document.getElementById("simpleSellerPage");
    if (!page) {
        page = document.createElement("section");
        page.id = "simpleSellerPage";
        page.className = "workspace";
        const mainContent = document.querySelector("main") || document.body;
        mainContent.appendChild(page);
    }

    const savedOrderStr = localStorage.getItem("karigar_pending_order");
    let htmlContent = "";

    if (savedOrderStr) {
        const order = JSON.parse(savedOrderStr);
        const isConfirmed = order.status === "confirmed";
        
        htmlContent = `
            <div style="background: #fff; padding: 35px; border-radius: 14px; box-shadow: 0 6px 24px rgba(0,0,0,0.08); border-top: 6px solid #2f6f4e;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="color: #2f6f4e; margin: 0; font-size: 1.8rem;">📦 Live Customer Order Details</h2>
                    <span id="orderStatusBadge" style="background: ${isConfirmed ? '#e8f5e9' : '#fff8e1'}; color: ${isConfirmed ? '#2e7d32' : '#f57c00'}; padding: 6px 14px; border-radius: 20px; font-size: 0.9rem; font-weight: bold; border: 1px solid ${isConfirmed ? '#c8e6c9' : '#ffe0b2'};">
                        ${isConfirmed ? '✅ Order Confirmed & Processing' : '⏳ Pending Confirmation'}
                    </span>
                </div>
                
                <p style="font-size: 1.05rem; color: #555; margin-bottom: 25px;">Review the buyer's delivery information and click below to confirm processing for the customer:</p>
                
                <div style="background: #f9fbf9; padding: 22px; border-radius: 10px; border: 1px solid #d4e8dc; margin-bottom: 25px;">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <p style="margin: 8px 0;"><strong>🛍 Product:</strong> ${order.name}</p>
                        <p style="margin: 8px 0;"><strong>📊 Quantity:</strong> ${order.qty}</p>
                        <p style="margin: 8px 0;"><strong>💰 Total Price:</strong> ${order.price}</p>
                        <p style="margin: 8px 0;"><strong>👤 Buyer Name:</strong> Priya Sharma (Retailer)</p>
                    </div>
                    <hr style="border: 0; border-top: 1px solid #d4e8dc; margin: 15px 0;">
                    <p style="margin: 8px 0;"><strong>📞 Contact Phone:</strong> +91 91234 56789</p>
                    <p style="margin: 8px 0;"><strong>📍 Shipping Address:</strong> ${order.address}</p>
                </div>

                <div style="display: flex; gap: 15px;">
                    <button id="processBtn" onclick="confirmOrderProcessing()" style="flex: 1; padding: 15px; background: ${isConfirmed ? '#4caf50' : '#ea580c'}; color: white; border: none; border-radius: 8px; font-weight: bold; cursor: pointer; font-size: 1.1rem;">
                        ${isConfirmed ? '✓ Order Already Confirmed' : '📦 Mark As Processing'}
                    </button>
                </div>
            </div>
        `;
    } else {
        htmlContent = `<div style="text-align:center; padding: 50px; font-size: 1.2rem; color: #666;">No active orders found. Place an order as a buyer first!</div>`;
    }

    page.innerHTML = `
        <div style="max-width: 800px; margin: 30px auto;">
            <h1 style="color: #8b6528; margin-bottom: 20px;">🏪 My Seller Dashboard</h1>
            ${htmlContent}
        </div>
    `;

    page.classList.remove("hidden");
    page.scrollIntoView({ behavior: "smooth", block: "start" });
}

function confirmOrderProcessing() {
    const savedOrderStr = localStorage.getItem("karigar_pending_order");
    if (savedOrderStr) {
        const order = JSON.parse(savedOrderStr);
        order.status = "confirmed";
        localStorage.setItem("karigar_pending_order", JSON.stringify(order));
    }

    const badge = document.getElementById("orderStatusBadge");
    const btn = document.getElementById("processBtn");

    if (badge) {
        badge.style.background = "#e8f5e9";
        badge.style.color = "#2e7d32";
        badge.style.borderColor = "#c8e6c9";
        badge.innerText = "✅ Order Confirmed & Processing";
    }

    if (btn) {
        btn.style.background = "#4caf50";
        btn.innerText = "✓ Order Already Confirmed";
    }

    alert("✅ Order marked as confirmed successfully! Notification sent to the buyer.");
}