import type { DemoImagePreset, CatalogListing, DashboardStats } from '../types';

export const DEMO_PRESETS: DemoImagePreset[] = [
  {
    id: 'demo-1',
    title: 'Indian Handicraft Exhibition Display',
    subtitle: '3 distinct products detected in one multi-product photo',
    url: '/images/demo1.png',
    items: [
      {
        id: 'item-1',
        label: 'Handpainted Terracotta Clay Pot',
        category: 'Home Decor & Pottery',
        confidence: 0.98,
        x: 12,
        y: 18,
        width: 32,
        height: 72
      },
      {
        id: 'item-2',
        label: 'Pochampally Handwoven Silk Scarf',
        category: 'Textiles & Apparel',
        confidence: 0.95,
        x: 44,
        y: 24,
        width: 26,
        height: 60
      },
      {
        id: 'item-3',
        label: 'Polished Antique Brass Oil Diya',
        category: 'Metalware & Puja Craft',
        confidence: 0.96,
        x: 72,
        y: 35,
        width: 24,
        height: 52
      }
    ]
  },
  {
    id: 'demo-2',
    title: 'Eco-Friendly Bamboo & Textile Stall',
    subtitle: '2 separate artisan products isolated automatically',
    url: '/images/demo2.png',
    items: [
      {
        id: 'item-2-1',
        label: 'Handcrafted Bamboo Desk Organizer',
        category: 'Bamboo & Cane Craft',
        confidence: 0.97,
        x: 14,
        y: 20,
        width: 36,
        height: 66
      },
      {
        id: 'item-2-2',
        label: 'Floral Block-Printed Cotton Tote Bag',
        category: 'Fashion & Handbags',
        confidence: 0.94,
        x: 54,
        y: 16,
        width: 38,
        height: 74
      }
    ]
  },
  {
    id: 'demo-3',
    title: 'General Artisanal & Seller Items',
    subtitle: 'Suitable for any seller listing modern artisanal goods',
    url: '/images/demo3.png',
    items: [
      {
        id: 'item-3-1',
        label: 'Rustic Leather Bound Antique Journal',
        category: 'Stationery & Leather Crafts',
        confidence: 0.99,
        x: 12,
        y: 24,
        width: 42,
        height: 60
      },
      {
        id: 'item-3-2',
        label: 'Artisanal Glazed Ceramic Mug',
        category: 'Kitchenware & Ceramic Art',
        confidence: 0.96,
        x: 58,
        y: 20,
        width: 36,
        height: 64
      }
    ]
  }
];

export const VOICE_SAMPLE_PRESETS = [
  {
    id: 'hi',
    langName: 'Hindi (हिंदी)',
    text: 'Yeh mera handpainted mitti ka pot hai. Isme shuddh natural terracotta clay use ki hai jo pani ko naturally thanda rakhti hai. Iski raw material cost 120 rupe hai aur isme 3 ghante ki barik karigari lagi hai.',
    translationEn: 'This is my handpainted terracotta clay pot made with pure natural clay that keeps water naturally cool. The raw material cost is ₹120 and required 3 hours of detailed craftsmanship.',
    translationRegional: 'यह हमारा हस्तनिर्मित टेराकोटा मिट्टी का बर्तन है। इसमें प्राकृतिक मिट्टी का उपयोग किया गया है। लागत ₹120 और निर्माण समय 3 घंटे है।'
  },
  {
    id: 'ta',
    langName: 'Tamil (தமிழ்)',
    text: 'இது பாரம்பரிய கைவினை களிமண் பானை. இதில் இயற்கை மண்பாண்ட களிமண் பயன்படுத்தப்பட்டுள்ளது. இதன் பொருள் செலவு ₹120. கைவினை வேலைப்பாட்டிற்கு 3 மணி நேரம் பிடித்தது.',
    translationEn: 'This is a traditional handcrafted clay pot made with natural pottery clay. Raw material cost is ₹120, and crafting took 3 hours of artisan labor.',
    translationRegional: 'பாரம்பரிய முறையில் தயாரிக்கப்பட்ட களிமண் பாத்திரம். மூலப்பொருள் ₹120 மற்றும் உழைப்பு 3 மணிநேரம்.'
  },
  {
    id: 'bn',
    langName: 'Bengali (বাংলা)',
    text: 'এটি আমাদের হাতে তৈরি ঐতিহ্যবাহী টেরাকোটার মাটির পাত্র। এতে খাঁটি পরিবেশবান্ধব কাদা মাটি ব্যবহার করা হয়েছে। কাঁচামালের খরচ ১২০ টাকা এবং ৩ ঘণ্টা শ্রম দেওয়া হয়েছে।',
    translationEn: 'This is our traditional handmade terracotta pot crafted from eco-friendly clay. Material cost is ₹120 with 3 hours of labor time.',
    translationRegional: 'হাতে আঁকা মাটির পাত্র। প্রাকৃতিক মাটির কাজ। কাঁচামাল খরচ ১২০ টাকা এবং ৩ ঘণ্টা শ্রম।'
  },
  {
    id: 'en',
    langName: 'English',
    text: 'This is an authentic hand-painted terracotta clay pot. Crafted using 100% natural eco-friendly clay, perfect for home decor and natural water cooling. Material cost is ₹120 with 3 hours of artisan work.',
    translationEn: 'This is an authentic hand-painted terracotta clay pot. Crafted using 100% natural eco-friendly clay, perfect for home decor and natural water cooling. Material cost is ₹120 with 3 hours of artisan work.',
    translationRegional: 'प्राकृतिक मिट्टी से बना हाथ से रंगा हुआ बर्तन। लागत ₹120, श्रम 3 घंटे।'
  }
];

export const INITIAL_DASHBOARD_STATS: DashboardStats = {
  totalListings: 14,
  totalViews: 3840,
  totalOrders: 42,
  totalRevenue: 24650,
  pendingPayout: 3200
};

export const INITIAL_LISTINGS: CatalogListing[] = [
  {
    id: 'lst-101',
    productNameEn: 'Handpainted Terracotta Clay Pot',
    productNameHi: 'हस्तनिर्मित मटका (टेराकोटा पॉट)',
    productNameRegional: 'களிமண் பானை',
    descriptionEn: 'Authentic eco-friendly terracotta clay water pot hand-painted with traditional folk motifs. Keeps drinking water naturally cool while enhancing home decor.',
    descriptionHi: 'पारंपरिक लोक कला से सजाया गया प्राकृतिक टेराकोटा मिट्टी का मटका। पानी को स्वाभाविक रूप से ठंडा रखता है।',
    descriptionRegional: 'பாரம்பரிய முறையில் இயற்கை முறையில் தயாரிக்கப்பட்ட களிமண் பானை.',
    category: 'Home & Kitchen',
    subCategory: 'Terracotta Pottery',
    ondcTaxonomy: 'home-and-kitchen/pottery/terracotta-ware',
    materials: ['Natural River Clay', 'Organic Mineral Pigments', 'Natural Varnish'],
    tags: ['#Handcrafted', '#EcoFriendly', '#Terracotta', '#VocalForLocal', '#PMVishwakarma'],
    careInstructions: 'Wash gently with warm water. Avoid chemical detergents.',
    rawMaterialCost: 120,
    laborHours: 3,
    hourlyRate: 80,
    packagingCost: 40,
    suggestedPrice: 480,
    marketPrices: {
      ondc: 480,
      meesho: 520,
      amazon: 650,
      gem: 460
    },
    artisanMargin: 72,
    status: 'published',
    publishedChannels: ['ONDC DigiHaat', 'GeM Portal', 'Meesho'],
    createdAt: '2026-09-20',
    imageUrl: '/images/demo1.png'
  },
  {
    id: 'lst-102',
    productNameEn: 'Pochampally Handwoven Silk Scarf',
    productNameHi: 'पोचमपल्ली रेशमी दुपट्टा',
    productNameRegional: 'போச்சம்பள்ளி பட்டு துப்பட்டா',
    descriptionEn: 'Pure Mulberry silk scarf handwoven using authentic Ikat technique by traditional weavers of Telangana. Vibrant geometric patterns with soft silk texture.',
    descriptionHi: 'तेलंगाना के पारंपरिक बुनकरों द्वारा इकत तकनीक से बुना गया शुद्ध शहतूत रेशमी दुपट्टा।',
    descriptionRegional: 'பாரம்பரிய இக்கத் நெசவு முறையில் தயாரிக்கப்பட்ட தூய பட்டு துப்பட்டா.',
    category: 'Fashion & Apparel',
    subCategory: 'Handloom Sarees & Stoles',
    ondcTaxonomy: 'fashion/handloom/scarves-and-stoles',
    materials: ['100% Mulberry Silk', 'Natural Vegetable Dyes'],
    tags: ['#Handloom', '#PochampallyIkat', '#GIProduct', '#SilkMark', '#MoSJE'],
    careInstructions: 'Dry clean only. Store in a cotton cloth bag.',
    rawMaterialCost: 450,
    laborHours: 6,
    hourlyRate: 120,
    packagingCost: 50,
    suggestedPrice: 1450,
    marketPrices: {
      ondc: 1450,
      meesho: 1600,
      amazon: 1890,
      gem: 1400
    },
    artisanMargin: 78,
    status: 'published',
    publishedChannels: ['ONDC DigiHaat', 'FabIndia'],
    createdAt: '2026-09-19',
    imageUrl: '/images/demo1.png'
  }
];
