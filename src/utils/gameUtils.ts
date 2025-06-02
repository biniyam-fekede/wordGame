// Common letter combinations that can start words
const commonLetterPairs = [
  'AN', 'BA', 'BE', 'BO', 'BR', 'CA', 'CH', 'CO', 'DE', 'DI',
  'DO', 'EN', 'EX', 'FA', 'FE', 'FI', 'FO', 'FR', 'GA', 'GE',
  'GO', 'GR', 'HA', 'HE', 'HI', 'HO', 'IN', 'JO', 'JU', 'KI',
  'KN', 'LA', 'LE', 'LI', 'LO', 'MA', 'ME', 'MI', 'MO', 'NA',
  'NE', 'NO', 'ON', 'OU', 'OV', 'PA', 'PE', 'PL', 'PO', 'PR',
  'QU', 'RA', 'RE', 'RO', 'RU', 'SA', 'SC', 'SE', 'SH', 'SI',
  'SL', 'SO', 'SP', 'ST', 'SU', 'TA', 'TE', 'TH', 'TI', 'TO',
  'TR', 'TW', 'UN', 'UP', 'VA', 'VE', 'VI', 'WA', 'WE', 'WH',
  'WI', 'WO', 'YE', 'YO'
];

export const generatePrompt = (): string => {
  const randomIndex = Math.floor(Math.random() * commonLetterPairs.length);
  return commonLetterPairs[randomIndex];
};

export const validateWord = (word: string, prompt: string): boolean => {
  if (!word || word.length < prompt.length + 1) return false;
  
  // Check if the word starts with the prompt
  if (!word.toUpperCase().startsWith(prompt)) return false;
  
  // For now, accept any word that meets the basic criteria
  // In a production environment, you would want to implement a proper dictionary check
  // or integrate with a spellcheck API
  return true;
};

export const formatTime = (seconds: number): string => {
  return seconds.toString();
};