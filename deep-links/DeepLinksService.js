import { DangerZone } from 'expo';
let { Branch } = DangerZone;

Branch.subscribe(bundle => {
  if (bundle && bundle.params && !bundle.error) {
    console.info(bundle);
  }
});
