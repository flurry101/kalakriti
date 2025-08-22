import { MapRegion } from '../types';

export const MAP_REGIONS: MapRegion[] = [
  {
    id: 'rajasthan',
    name: 'Rajasthan',
    artForms: ['Phad Painting', 'Miniature Art', 'Block Printing'],
    description: 'Known for vibrant Phad paintings and intricate miniature art.',
    path: 'M20,20 L35,15 L45,20 L40,35 L25,40 L20,30 Z'
  },
  {
    id: 'west-bengal',
    name: 'West Bengal',
    artForms: ['Kantha Embroidery', 'Patachitra', 'Terracotta'],
    description: 'Famous for Kantha embroidery and Patachitra scroll paintings.',
    path: 'M70,35 L80,30 L85,40 L80,50 L70,45 L65,40 Z'
  },
  {
    id: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    artForms: ['Gond Art', 'Bagh Print', 'Chanderi Weaving'],
    description: 'Home to vibrant Gond art and traditional Bagh printing.',
    path: 'M40,45 L50,40 L60,45 L55,55 L45,60 L35,50 Z'
  },
  {
    id: 'gujarat',
    name: 'Gujarat',
    artForms: ['Bandhani', 'Mirror Work', 'Kutch Embroidery'],
    description: 'Renowned for Bandhani tie-dye and intricate mirror work.',
    path: 'M15,45 L25,40 L30,45 L25,55 L15,50 Z'
  },
  {
    id: 'odisha',
    name: 'Odisha',
    artForms: ['Pattachitra', 'Applique Work', 'Palm Leaf Art'],
    description: 'Traditional Pattachitra paintings and palm leaf manuscripts.',
    path: 'M60,55 L70,50 L75,60 L70,70 L60,65 Z'
  },
  {
    id: 'bihar',
    name: 'Bihar',
    artForms: ['Madhubani', 'Sikki Grass Work', 'Manjusha Art'],
    description: 'Birthplace of Madhubani paintings and Sikki grass crafts.',
    path: 'M60,35 L70,30 L75,40 L70,45 L60,40 Z'
  }
];
