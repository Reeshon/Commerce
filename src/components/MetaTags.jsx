import React from 'react';
import { Helmet } from 'react-helmet';

function MetaTags({ title, description, keywords }) {
  return (
    <Helmet>
      <title>{title} | Deleen's Home Bake</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
    </Helmet>
  );
}

export default MetaTags;
