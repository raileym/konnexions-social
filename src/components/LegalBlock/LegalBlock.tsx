import type { LegalBlockProps } from '@cknTypes/types';

const LegalBlock = ({ label, title, children }: LegalBlockProps) => (
  <div className="legal-block flex mb3 pa4X flex-row">
    {label && <div className="w2 b w-10X mr3">{label}.</div>}
    <div className="flex-auto w-90">
      {title && <div className="b mb2">{title}</div>}
      {children}
    </div>
  </div>
);

export default LegalBlock;
