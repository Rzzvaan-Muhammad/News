export type Option = {
  value: string;
  label: string;
};
export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export const categoryOptions: Option[] = [
  { value: 'tesla', label: 'Tesla' },
  { value: 'election', label: 'Election' },
  { value: 'debate', label: 'Debate' },
  { value: 'technology', label: 'Technology' },
  { value: 'business', label: 'Business' },
  { value: 'health', label: 'Health' },
  { value: 'science', label: 'Science' },
  { value: 'sports', label: 'Sports' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'politics', label: 'Politics' },
  { value: 'environment', label: 'Environment' },
];

export const sourceOptions: Option[] = [
  { value: 'bbc-news', label: 'BBC News' },
  { value: 'cnn', label: 'CNN' },
  { value: 'the-verge', label: 'The Verge' },
  { value: 'techcrunch', label: 'TechCrunch' },
  { value: 'reuters', label: 'Reuters' },
  { value: 'bloomberg', label: 'Bloomberg' },
  { value: 'al-jazeera-english', label: 'Al Jazeera English' },
  { value: 'the-new-york-times', label: 'The New York Times' },
  { value: 'engadget', label: 'Engadget' },
  { value: 'wired', label: 'Wired' },
];
