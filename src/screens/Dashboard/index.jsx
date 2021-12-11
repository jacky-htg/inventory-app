import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

import { Card } from 'antd';

export default function Example() {
  return (
    <Card title="Example Antd Card" bordered={ false } style={ { width: 300 } }>
      <p>Card content</p>
      <p>Card content</p>
      <p>Card content</p>
    </Card>
  );
}
