import type { BoundingBox, StudioSettings, CatalogListing } from '../types';

export const detectObjectsInImage = async (_imageDataUrl: string): Promise<BoundingBox[]> => {
  await new Promise((res) => setTimeout(res, 800));

  return [
    {
      id: `custom-item-1-${Date.now()}`,
      label: 'Main Product / Primary Item',
      category: 'Artisanal Product',
      confidence: 0.96,
      x: 15,
      y: 15,
      width: 40,
      height: 70
    },
    {
      id: `custom-item-2-${Date.now()}`,
      label: 'Secondary Item / Accessory',
      category: 'Handcrafted Accessory',
      confidence: 0.91,
      x: 58,
      y: 20,
      width: 35,
      height: 65
    }
  ];
};

export const generateCatalogFromVoice = async (
  voiceText: string,
  itemLabel: string,
  _selectedLang: string
): Promise<Partial<CatalogListing>> => {
  await new Promise((res) => setTimeout(res, 900));

  const cleanText = voiceText.trim() || 'Handcrafted artisanal product made with natural materials';

  const isPot = itemLabel.toLowerCase().includes('pot') || itemLabel.toLowerCase().includes('terracotta') || cleanText.includes('mitti');
  const isSilk = itemLabel.toLowerCase().includes('scarf') || itemLabel.toLowerCase().includes('silk') || cleanText.includes('reshmi');
  const isBrass = itemLabel.toLowerCase().includes('diya') || itemLabel.toLowerCase().includes('brass') || cleanText.includes('diya');
  const isBamboo = itemLabel.toLowerCase().includes('bamboo') || cleanText.includes('bamboo');

  let titleEn = itemLabel;
  let titleHi = itemLabel;
  let titleReg = itemLabel;
  let category = 'Artisanal & Handicrafts';
  let subCategory = 'General Craft';
  let taxonomy = 'home-and-kitchen/handicrafts/general';
  let materials = ['Natural Artisanal Material', 'Eco-friendly Paint'];
  let tags = ['#Handmade', '#VocalForLocal', '#PMVishwakarma', '#ONDCReady', '#KalaKart'];

  if (isPot) {
    titleEn = 'Handpainted Eco-Friendly Terracotta Clay Pot';
    titleHi = 'हस्तनिर्मित सजावटी टेराकोटा मिट्टी का मटका';
    titleReg = 'பாரம்பரிய கைவினை களிமண் பானை';
    category = 'Home & Kitchen';
    subCategory = 'Pottery & Clayware';
    taxonomy = 'home-and-kitchen/pottery/terracotta-ware';
    materials = ['100% Organic River Clay', 'Non-toxic Mineral Pigments'];
    tags = ['#Terracotta', '#Handpainted', '#EcoFriendly', '#CoolWater', '#KalaKart'];
  } else if (isSilk) {
    titleEn = 'Pochampally Handwoven Pure Silk Scarf';
    titleHi = 'पोचमपल्ली इकत शुद्ध रेशमी दुपट्टा';
    titleReg = 'போச்சம்பள்ளி பட்டு துப்பட்டா';
    category = 'Fashion & Apparel';
    subCategory = 'Handloom Textiles';
    taxonomy = 'fashion/handloom/scarves-and-stoles';
    materials = ['100% Mulberry Silk', 'Natural Organic Dyes'];
    tags = ['#PochampallyIkat', '#HandloomSilk', '#GIProduct', '#SilkMark', '#KalaKart'];
  } else if (isBrass) {
    titleEn = 'Traditional Polished Antique Brass Diya Lamp';
    titleHi = 'पारंपरिक पीतल का पूजा दीपक (दिया)';
    titleReg = 'பாரंपरिक பித்தளை விளக்கு';
    category = 'Puja & Spiritual Crafts';
    subCategory = 'Brass Metalware';
    taxonomy = 'spiritual/metalware/brass-diya';
    materials = ['Solid Virgin Brass', 'Polished Antique Lacquer'];
    tags = ['#Brassware', '#HandCarved', '#PujaCraft', '#KalaKart'];
  } else if (isBamboo) {
    titleEn = 'Eco-Friendly Handcrafted Bamboo Desk Organizer';
    titleHi = 'पर्यावरण के अनुकूल बांस पेन स्टैंड और आयोजक';
    titleReg = 'மூங்கில் கைவினைப் பொருள்';
    category = 'Office & Home Decor';
    subCategory = 'Bamboo Crafts';
    taxonomy = 'home-decor/bamboo-and-cane/desk-organizer';
    materials = ['Sustainable Indian Bamboo', 'Natural Wood Oil Polish'];
    tags = ['#BambooCraft', '#SustainableLiving', '#ZeroPlastic', '#KalaKart'];
  }

  const descEn = `Expertly handcrafted by traditional artisans. ${cleanText} Features durable finish, eco-friendly sourcing, and vibrant aesthetics suitable for homes and modern offices. Directly listed via KalaKart AI.`;
  const descHi = `पारंपरिक कारीगरों द्वारा हस्तनिर्मित। ${cleanText} पर्यावरण के अनुकूल सामग्रियों से निर्मित, जो टिकाऊ और आकर्षक है। कलाकार्ट एआई की मदद से सीधे डिजिटल बाज़ार से जुड़ा।`;
  const descReg = `பாரம்பரிய கைவினைஞர்களால் தயாரிக்கப்பட்டது. ${cleanText} இயற்கை பொருட்களால் சூழல் நட்பு முறையில் செய்யப்பட்டது.`;

  return {
    productNameEn: titleEn,
    productNameHi: titleHi,
    productNameRegional: titleReg,
    descriptionEn: descEn,
    descriptionHi: descHi,
    descriptionRegional: descReg,
    category,
    subCategory,
    ondcTaxonomy: taxonomy,
    materials,
    tags,
    careInstructions: 'Keep in dry place. Wipe gently with a soft dry cloth.'
  };
};

export const calculateDynamicPrice = (
  rawCost: number,
  laborHours: number,
  hourlyRate: number = 80,
  packaging: number = 40
) => {
  const laborCost = laborHours * hourlyRate;
  const totalBaseCost = rawCost + laborCost + packaging;
  const suggestedPrice = Math.round(totalBaseCost * 1.65);
  
  return {
    laborCost,
    totalBaseCost,
    suggestedPrice,
    marketPrices: {
      ondc: suggestedPrice,
      meesho: Math.round(suggestedPrice * 1.12),
      amazon: Math.round(suggestedPrice * 1.35),
      gem: Math.round(suggestedPrice * 0.98)
    },
    artisanProfitShare: Math.round(((suggestedPrice - totalBaseCost) / suggestedPrice) * 100) + 40
  };
};

export const generateBecknPayload = (listing: Partial<CatalogListing>) => {
  return {
    context: {
      domain: 'nic2004:52110',
      action: 'on_search',
      country: 'IND',
      city: 'std:080',
      core_version: '1.1.0',
      bap_id: 'buyer-app.ondc.org',
      bpp_id: 'kalakart-artisan-gateway.ondc.gov.in',
      transaction_id: `txn-${Date.now()}`,
      timestamp: new Date().toISOString()
    },
    message: {
      catalog: {
        'bpp/descriptor': {
          name: 'KalaKart MoSJE Artisan Collective',
          short_desc: 'Direct Marketplace for SC/ST, Rural Artisans & Micro-Sellers'
        },
        'bpp/providers': [
          {
            id: 'artisan-provider-090',
            descriptor: {
              name: 'Shrimati Sunita Devi Artisan Self-Group',
              symbol: 'https://pmvishwakarma.gov.in/badge.png'
            },
            categories: [
              {
                id: listing.ondcTaxonomy || 'handicrafts',
                descriptor: { name: listing.category || 'Handicrafts' }
              }
            ],
            items: [
              {
                id: listing.id || `item-${Date.now()}`,
                descriptor: {
                  name: listing.productNameEn || 'Artisanal Product',
                  symbol: listing.imageUrl || '',
                  short_desc: listing.descriptionEn?.slice(0, 100) || '',
                  long_desc: listing.descriptionEn || '',
                  images: [listing.imageUrl || '']
                },
                price: {
                  currency: 'INR',
                  value: `${listing.suggestedPrice || 480}.00`
                },
                category_id: listing.ondcTaxonomy || 'handicrafts',
                matched: true,
                tags: [
                  {
                    code: 'origin',
                    list: [{ code: 'country', value: 'IND' }]
                  },
                  {
                    code: 'scheme',
                    list: [
                      { code: 'name', value: 'KalaKart / PM-Vishwakarma / MoSJE TULIP' },
                      { code: 'beneficiary_type', value: 'Marginalized Artisan & Seller' }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    }
  };
};

export const applyStudioEffectsToCanvas = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  settings: StudioSettings
) => {
  if (settings.background === 'warm') {
    const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, width * 0.8);
    grad.addColorStop(0, '#FFFBF5');
    grad.addColorStop(0.5, '#F5E6D3');
    grad.addColorStop(1, '#E6D2B8');
    ctx.fillStyle = grad;
  } else if (settings.background === 'wood') {
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#5C3A21');
    grad.addColorStop(0.5, '#422712');
    grad.addColorStop(1, '#2E1909');
    ctx.fillStyle = grad;
  } else if (settings.background === 'white') {
    ctx.fillStyle = '#FFFFFF';
  } else if (settings.background === 'dark') {
    const grad = ctx.createRadialGradient(width / 2, height / 2, 30, width / 2, height / 2, width);
    grad.addColorStop(0, '#1F2937');
    grad.addColorStop(1, '#0B0F17');
    ctx.fillStyle = grad;
  }
  
  if (settings.background !== 'transparent') {
    ctx.fillRect(0, 0, width, height);
  }
};
