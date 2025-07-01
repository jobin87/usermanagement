import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/config-global";
import { NotFoundView } from "src/section/error";

// ----------------------------------------------------------------------

const metadata = { title: `Form | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <NotFoundView />
    </>
  );
}
