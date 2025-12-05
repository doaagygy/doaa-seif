import React, { useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { Language } from '../types';

interface SEOProps {
  titleEn: string;
  titleAr: string;
  descriptionEn?: string;
  descriptionAr?: string;
}

const SEO: React.FC<SEOProps> = ({ titleEn, titleAr, descriptionEn, descriptionAr }) => {
  const { language } = useLanguage();

  useEffect(() => {
    // Determine content based on current language
    const currentTitle = language === Language.EN ? titleEn : titleAr;
    const currentDesc = language === Language.EN 
      ? (descriptionEn || "Portfolio of Graphic Designer Doaa Seif.")
      : (descriptionAr || "معرض أعمال مصممة الجرافيك دعاء سيف.");

    // Update Document Title
    document.title = `${currentTitle} | Doaa Seif`;

    // Update Meta Description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentDesc);
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = currentDesc;
      document.head.appendChild(meta);
    }

    // Update Open Graph Title & Description
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', `${currentTitle} | Doaa Seif`);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', currentDesc);

  }, [language, titleEn, titleAr, descriptionEn, descriptionAr]);

  return null;
};

export default SEO;