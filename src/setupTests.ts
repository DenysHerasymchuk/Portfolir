import '@testing-library/jest-dom';

// jsdom has no TextEncoder, and react-router v7 needs it at import time.
import { TextEncoder } from 'util';
Object.assign(global, { TextEncoder });
