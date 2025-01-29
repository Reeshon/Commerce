import React from 'react';
import Head from 'next/head';

function MetaTags({ title, description, keywords }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Head>
  );
}

export default MetaTags;
