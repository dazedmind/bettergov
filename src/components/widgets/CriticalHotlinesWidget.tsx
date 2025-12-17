import { FC } from 'react';
import { Link } from 'react-router-dom';
import { PhoneIcon, ChevronRightIcon, AlertCircleIcon } from 'lucide-react';
import hotlinesData from '../../data/philippines_hotlines.json';

interface Hotline {
  name: string;
  category: string;
  numbers: string[];
  description?: string;
}

interface CriticalHotlinesWidgetProps {
  maxItems?: number;
}

const CriticalHotlinesWidget: FC<CriticalHotlinesWidgetProps> = ({
  maxItems = 4,
}) => {
  const displayedHotlines = (hotlinesData.criticalHotlines as Hotline[]).slice(
    0,
    maxItems
  );

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden border h-full border-gray-200'>
      <div className='bg-red-600 px-4 py-6 flex items-center justify-between'>
        <div className='flex items-center'>
          <AlertCircleIcon className='h-5 w-5 text-white mr-2' />
          <h3 className='font-bold text-white'>Critical Emergency Hotlines</h3>
        </div>
        <Link
          to='/philippines/hotlines'
          className='text-white text-sm hover:underline flex items-center'
        >
          View all <ChevronRightIcon className='h-4 w-4 ml-1' />
        </Link>
      </div>

      <div className='p-6'>
        <div className='grid grid-cols-1 gap-4'>
          {displayedHotlines.map((hotline, index) => (
            <div key={index} className='flex flex-col'>
              <span className='font-bold text-lg text-gray-900'>
                {hotline.name}
              </span>
              <div className='mt-1 space-y-1'>
                {hotline.numbers.map((number, idx) => (
                  <a
                    key={idx}
                    href={`tel:${number.replace(/\D/g, '')}`}
                    className='flex items-center text-blue-600 hover:underline'
                  >
                    <PhoneIcon className='h-4 w-4 mr-1' />
                    <span className='text-md'>{number}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-4 pt-3 border-t border-gray-200 text-center'>
          <Link
            to='/philippines/hotlines'
            className='inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800'
          >
            See all emergency hotlines
            <ChevronRightIcon className='h-4 w-4 ml-1' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CriticalHotlinesWidget;
