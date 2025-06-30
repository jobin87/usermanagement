import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { FormPageView } from 'src/section/auth/view/form-view';


// ----------------------------------------------------------------------

const metadata = { title: `Form | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <FormPageView/>
    </>
  );
}
