import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/config-global";
import { FormListPageView } from "src/section/auth/view/form-list-view";

// ----------------------------------------------------------------------

const metadata = { title: `Formlist | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <FormListPageView />
    </>
  );
}
