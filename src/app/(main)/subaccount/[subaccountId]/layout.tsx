import React from 'react';

type Props = {
  children: React.ReactNode;
  params: {
    subaccountId: string;
  };
};

const SubAccountLayout = ({ children, params }: Props) => {
  return <div>SubAccountLayout</div>;
};

export default SubAccountLayout;
