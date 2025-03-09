import React from 'react';

const page = ({ params }: { params: { agencyId: string } }) => {
  return <div>{params.agencyId}page.tsx</div>;
};

export default page;
