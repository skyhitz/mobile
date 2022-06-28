import { Platform } from 'react-native';

let cursorPointer;
Platform.OS === 'web'
  ? (cursorPointer = { cursor: 'pointer' } as any)
  : (cursorPointer = {});
export default cursorPointer;
