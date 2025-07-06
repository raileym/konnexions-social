import React, { FC, ReactNode } from 'react';

interface MDXPageProps {
  children: ReactNode;
}

const MDXPage: FC<MDXPageProps> = ({ children }) => {
  return (
    <div className="mdx-content">
      {children}
    </div>
  );
};

export default MDXPage;
