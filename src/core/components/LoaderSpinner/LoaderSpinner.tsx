import './LoaderSpinner.scss';
import { memo } from 'react';

/**
 * A simple spinning css loader wheel.
 */
const LoaderSpinner = () => (<span className="loader"></span>);

export default memo(LoaderSpinner);
