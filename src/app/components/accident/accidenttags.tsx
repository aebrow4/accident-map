import * as React from 'react';
import { type AccidentTags as Tags, humanReadableAccidentTags } from '@/app/constants/accidenttags';

export default function AccidentTags({ tags }: { tags: Tags[] }) {
  return (
    <div className='text-sm'>
      <p>
        {tags.map(tag => (
          humanReadableAccidentTags[tag]
        )).join(' | ')}
      </p>
    </div>
  );
}
