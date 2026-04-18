import moringaImg from '../assets/moringa-powder.png';
import jaggeryImg from '../assets/jaggery-powder.png';

const products = [
  {
    id: 'moringa-powder',
    name: 'Organic Moringa Powder',
    shortName: 'Moringa Powder',
    tagline: 'The Miracle Green Superfood',
    price: 349,
    originalPrice: 499,
    discount: 30,
    image: moringaImg,
    category: 'Superfood',
    weight: '200g',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    description: 'Our 100% pure organic Moringa Powder is sourced from naturally grown Moringa Oleifera trees in the foothills of Uttarakhand. Hand-picked, shade-dried, and stone-ground to preserve maximum nutrients. Moringa is known as the "Miracle Tree" — packed with vitamins, minerals, and antioxidants.',
    shortDescription: 'Pure, organic moringa leaf powder from Uttarakhand. Rich in vitamins A, C, E, iron, calcium & protein.',
    benefits: [
      'Rich in Vitamins A, C, E & K',
      'Contains 9 Essential Amino Acids',
      'Powerful Antioxidant Properties',
      'Supports Immune System',
      'Boosts Energy & Metabolism',
      'Anti-inflammatory Benefits',
      'Supports Healthy Digestion',
      'Natural Detoxification'
    ],
    howToUse: [
      'Mix 1 teaspoon in warm water or juice',
      'Add to smoothies and shakes',
      'Sprinkle over salads and soups',
      'Use in cooking for nutritional boost'
    ],
    nutritionalInfo: {
      'Energy': '205 kcal per 100g',
      'Protein': '27.1g',
      'Iron': '28.2mg',
      'Calcium': '2003mg',
      'Vitamin A': '18,900 IU',
      'Vitamin C': '17.3mg',
      'Fiber': '19.2g',
      'Potassium': '1324mg'
    }
  },
  {
    id: 'jaggery-powder',
    name: 'Pure Cane Jaggery Powder',
    shortName: 'Jaggery Powder',
    tagline: 'Nature\'s Golden Sweetener',
    price: 199,
    originalPrice: 299,
    discount: 33,
    image: jaggeryImg,
    category: 'Natural Sweetener',
    weight: '500g',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
    description: 'Our Pure Cane Jaggery Powder (Gur) is traditionally made from fresh sugarcane juice, slowly cooked in iron vats without any chemicals or preservatives. Sourced from organic sugarcane farms in Uttarakhand, this golden powder retains all the natural minerals and goodness of sugarcane.',
    shortDescription: 'Traditional cane jaggery powder, chemical-free, rich in iron & minerals. Perfect healthy sugar alternative.',
    benefits: [
      'Natural Source of Iron & Minerals',
      'Healthier Alternative to Sugar',
      'Aids in Digestion',
      'Purifies Blood Naturally',
      'Boosts Immunity',
      'Rich in Antioxidants',
      'Provides Instant Energy',
      'Supports Respiratory Health'
    ],
    howToUse: [
      'Use as a sugar substitute in tea/coffee',
      'Add to milk for a warm jaggery drink',
      'Use in traditional sweets and desserts',
      'Mix in warm water for digestive benefits'
    ],
    nutritionalInfo: {
      'Energy': '383 kcal per 100g',
      'Carbohydrates': '95g',
      'Iron': '11mg',
      'Calcium': '85mg',
      'Magnesium': '70mg',
      'Phosphorus': '40mg',
      'Potassium': '1056mg',
      'Sodium': '30mg'
    }
  }
];

export default products;
