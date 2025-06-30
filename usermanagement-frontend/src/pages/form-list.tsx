import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { SubmittedFormList } from 'src/section/form-list';


// ----------------------------------------------------------------------

const metadata = { title: `Formlist | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <SubmittedFormList/>
    </>
  );
}
