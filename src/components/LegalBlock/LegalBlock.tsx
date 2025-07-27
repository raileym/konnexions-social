import type { LegalBlockProps } from '@cknTypes/types';

const LegalBlock = ({ label, title, disable, children }: LegalBlockProps) => (
  <div className={`legal-block mb3 pa4X flex-row on-background ${disable ? 'dn' : 'flex'}`}>
    {label && <div className="w2 b w-10X mr3">{label}.</div>}
    <div className="flex-auto w-90">
      {title && <div className="b mb2">{title}</div>}
      {children}
    </div>
  </div>
);

export default LegalBlock;
