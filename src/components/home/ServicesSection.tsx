import { FC } from 'react';
import * as LucideIcons from 'lucide-react';
import { Card } from '../ui/Card';
import serviceCategories from '../../data/service_categories.json';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  category: string;
  slug: string;
  subcategories: Subcategory[];
}

const ServicesSection: FC = () => {
  const { t } = useTranslation('common');

  const getIcon = (category: string) => {
    const iconMap: { [key: string]: keyof typeof LucideIcons } = {
      'Business and Trade': 'Building2',
      'Certificates and IDs': 'FileCheck',
      Contributions: 'Wallet',
      'Disaster and Weather': 'Cloud',
      Education: 'GraduationCap',
      Employment: 'Briefcase',
      Health: 'Heart',
      Housing: 'Home',
      'Passport and Travel': 'Plane',
      'Social Services': 'Users',
      Tax: 'Receipt',
      'Transport and Driving': 'Car',
    };

    const Icon = LucideIcons[
      iconMap[category] || 'FileText'
    ] as React.ComponentType<{ className?: string }>;
    return Icon ? <Icon className='h-6 w-6' /> : null;
  };

  // Show only first 12 categories
  const displayedCategories = serviceCategories.categories.slice(
    0,
    12
  ) as Category[];

  return (
    <section className='py-12 lg:px-24 bg-white'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <h2 className='text-2xl md:text-3xl font-bold text-gray-900 mb-4'>
            {t('services.governmentServices')}
          </h2>
          <p className='text-gray-800 max-w-2xl mx-auto'>
            {t('services.description')}
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {displayedCategories.map(category => (
            <Card
              key={category.slug}
              hoverable
              className='border border-primary-200'
            >
              <div className='flex items-center justify-between gap-2 bg-gradient-to-tr from-primary-400 to-primary-500 px-4 py-4'>
                <div className='flex items-center gap-2'>
                  <div className=' text-white rounded-full'>
                    {getIcon(category.category)}
                  </div>

                  <h3 className='text-lg font-semibold text-neutral-100'>
                    {category.category}
                  </h3>
                </div>

                <Link
                  to={`/services?category=${category.slug}`}
                  className='flex items-center gap-2 text-white'
                >
                  <p className='text-sm text-primary-100'>View All</p>
                  <LucideIcons.ArrowRight className='bg-primary-50 text-primary-500 rounded-full p-2 h-10 w-10' />
                </Link>
              </div>
              <ul className='space-y-2 mb-6 grow p-6'>
                {category.subcategories.slice(0, 3).map(subcategory => (
                  <li key={subcategory.slug}>
                    <Link
                      to={`/services?category=${category.slug}&subcategory=${subcategory.slug}`}
                      className='text-gray-800 hover:text-primary-600 transition-colors text-md flex items-center'
                    >
                      <span className='w-1.5 h-1.5 bg-gray-300 rounded-full mr-2'></span>
                      {subcategory.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className='text-center mt-8'>
          <Link
            to='/services'
            className='inline-flex items-center justify-center rounded-md font-medium transition-colors px-6 py-3 bg-primary-500 text-white hover:bg-primary-600 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-xs'
          >
            {t('services.viewAll')}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
