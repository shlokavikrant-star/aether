const screens = {
  input: document.getElementById('screen-input'),
  loading: document.getElementById('screen-loading'),
  results: document.getElementById('screen-results')
};

const conceptEl = document.getElementById('concept');
const generateBtn = document.getElementById('generate-btn');
const newBtn = document.getElementById('new-btn');
const inputError = document.getElementById('input-error');

const resultFields = {
  brandNames: document.getElementById('brandNames'),
  typographyDirection: document.getElementById('typographyDirection'),
  colorPalette: document.getElementById('colorPalette'),
  visualStyle: document.getElementById('visualStyle'),
  productIdeas: document.getElementById('productIdeas')
};

const directions = [
  {
    keywords: ['banana'],
    data: {
      brandNames: 'Peel Beauty\nBanana Bloom\nGolden Peel Cosmetics',
      typographyDirection:
        'Elegant high-fashion serif logo paired with a rounded friendly sans-serif for packaging.',
      colorPalette: '#F4D35E banana yellow\n#FFF2B2 soft cream\n#2E2E2E charcoal',
      visualStyle:
        'Glossy packaging inspired by curved banana shapes, minimal luxury aesthetic, editorial beauty photography with yellow lighting.',
      productIdeas: 'Banana Lip Oil\nGolden Peel Highlighter\nBanana Cream Blush'
    }
  },
  {
    keywords: ['cinnamon'],
    data: {
      brandNames: 'CinnaClub\nSweet Swirl Apparel\nThe Cinnamon Collective',
      typographyDirection:
        'Playful retro bubble lettering mixed with vintage bakery style serif fonts.',
      colorPalette: '#C97B4B cinnamon brown\n#F3D1A6 dough beige\n#FFF4E6 icing white',
      visualStyle:
        'Streetwear brand inspired by bakery aesthetics, swirl graphics, melting icing typography.',
      productIdeas: 'Swirl Graphic Tee\nCinnamon Club Hoodie\nSticky Sweet Tote Bag'
    }
  },
  {
    keywords: ['rocket'],
    data: {
      brandNames: 'LiftOff\nOrbit Footwear\nNovaStep',
      typographyDirection: 'Futuristic geometric sans-serif fonts with wide spacing.',
      colorPalette: '#1C1C1C space black\n#FF4D4D rocket red\n#C8D6FF atmospheric blue',
      visualStyle:
        'Performance sneakers inspired by aerospace engineering, metallic textures, propulsion lines.',
      productIdeas: 'Launch Runner\nOrbit Trainer\nGravity Jump Sneaker'
    }
  },
  {
    keywords: ['cotton candy', 'cotton'],
    data: {
      brandNames: 'CloudSkin\nSugarGlow\nCotton Dew',
      typographyDirection:
        'Soft rounded sans-serif fonts with dreamy editorial serif accents.',
      colorPalette: '#FFB7E1 cotton pink\n#B7E4FF sky blue\n#FFF6FB pastel white',
      visualStyle: 'Dreamy pastel packaging with soft gradients and fluffy cloud imagery.',
      productIdeas: 'Cotton Glow Serum\nCloud Moisturizer\nSugar Mist Face Spray'
    }
  },
  {
    keywords: ['pizza'],
    data: {
      brandNames: 'Slice\nOlio\nTomato No.5',
      typographyDirection: 'Italian luxury serif mixed with modern fashion typography.',
      colorPalette: '#C0392B tomato red\n#F1C40F cheese yellow\n#2C3E50 charcoal',
      visualStyle: 'Luxury fragrance campaign but with surreal pizza imagery.',
      productIdeas: 'Signature Eau de Slice\nOlio Night Edition\nTomato No.5 Collector Set'
    }
  },
  {
    keywords: ['volcano', 'lava', 'magma'],
    data: {
      brandNames: 'MagmaFuel\nLavaRush\nCoreCharge',
      typographyDirection: 'Aggressive techno fonts with molten textures.',
      colorPalette: '#FF3B30 lava red\n#FF9500 magma orange\n#1A1A1A volcanic black',
      visualStyle: 'Explosive volcanic graphics and glowing energy effects.',
      productIdeas: 'LavaRush Zero Sugar\nCoreCharge Original\nMagmaFuel Max'
    }
  },
  {
    keywords: ['galaxy', 'cosmic', 'space'],
    data: {
      brandNames: 'CosmoCream\nNebula Scoops\nMilkyWay Gelato',
      typographyDirection: 'Futuristic rounded fonts with sparkly star accents.',
      colorPalette: '#5B4BFF cosmic purple\n#9D4EDD nebula violet\n#F7F7FF star white',
      visualStyle: 'Space themed packaging with galaxy gradients and star patterns.',
      productIdeas: 'Nebula Vanilla Swirl\nMilkyWay Berry Blast\nCosmoCream Stardust Cone'
    }
  }
];

const defaultDirection = {
  brandNames: 'Forme Studio\nQuiet Standard\nMonoline Works',
  typographyDirection:
    'Refined neo-grotesk sans-serif for core identity, paired with a restrained modern serif for editorial hierarchy.',
  colorPalette: '#FFFFFF pure white\n#F1F1F1 light gray\n#1F1F1F graphite',
  visualStyle:
    'Modern minimalist system with clean grids, generous spacing, soft shadows, and high-contrast product framing.',
  productIdeas:
    'Minimal Landing Page Kit\nBrand System Starter Pack\nNeutral Packaging Concept Set'
};

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove('active'));
  screens[name].classList.add('active');
}

function setError(message = '') {
  inputError.textContent = message;
}

function setResults(data) {
  Object.keys(resultFields).forEach((key) => {
    resultFields[key].textContent = data[key] || '';
  });
}

function getDirectionForConcept(concept) {
  const normalized = concept.toLowerCase();
  const match = directions.find((item) =>
    item.keywords.some((keyword) => normalized.includes(keyword))
  );

  return match ? match.data : defaultDirection;
}

async function generateDirection() {
  const concept = conceptEl.value.trim();

  if (!concept) {
    setError('Please enter a concept first.');
    return;
  }

  setError('');
  generateBtn.disabled = true;
  showScreen('loading');

  await new Promise((resolve) => setTimeout(resolve, 950));

  const direction = getDirectionForConcept(concept);
  setResults(direction);
  showScreen('results');
  generateBtn.disabled = false;
}

generateBtn.addEventListener('click', generateDirection);
newBtn.addEventListener('click', () => {
  conceptEl.value = '';
  setError('');
  showScreen('input');
  conceptEl.focus();
});
