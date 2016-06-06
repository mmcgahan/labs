import React from 'react';
import BigMap from './BigMap.jsx';
import { storiesOf } from '@kadira/storybook';

storiesOf('BigMap', module)
	.add('default', () => <BigMap />);

