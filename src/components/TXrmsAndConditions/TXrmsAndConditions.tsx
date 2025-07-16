// import { useTranslation } from 'react-i18next'
import { isOnlyNumbers } from '@components/Util'
import type React from 'react'
type LegaldivProps = {
  children: React.ReactNode
}

type LegalTitleProps = {
  children: React.ReactNode
}

type LegalEmphasisProps = {
  children: React.ReactNode
}

type LinkProps = {
  href: string
  children: React.ReactNode
}

const Legaldiv: React.FC<LegaldivProps> = ({ children }) => {
  return (
    <div className="gray, f6, mt5">{children}</div>
  )
}

const LegalTitle: React.FC<LegalTitleProps> = ({ children }) => {
  return (
    <div className="black, f6, b">{children}</div>
  )
}

const LegalEmphasis: React.FC<LegalEmphasisProps> = ({ children }) => {
  return (
    <div className="gray, f6, b">{children}</div>
  )
}

const Link: React.FC<LinkProps> = ({ href, children }) => {
  return (
    <>
      <div className="secondary, f7, b">{href}</div>
      <div className="secondary, f7, b">{children}</div>
    </>
  )
}

const legalContent = [
  {
    id: 'A',
    title: '',
    content:
    <>
      <Legaldiv>
        Welcome to CitePrep.com (<LegalEmphasis>Showcase</LegalEmphasis>), a showcase for teaching math (<LegalEmphasis>Topic</LegalEmphasis>) through study guides that feature flashcards, dynamic questions, interactive graphics, and videos (collectively, the <LegalEmphasis>Content</LegalEmphasis>). The Showcase demonstrates how the Site uses the CitePrep Framework (<LegalEmphasis>Framework</LegalEmphasis>) to partition, select, deliver, and arrange Content as a related set of citation
      </Legaldiv>
    </>
  },
  {
    id: 'B',
    title: '',
    content:
    <>
      <Legaldiv>
        The Showcase is hosted on CitePrep.com (<LegalEmphasis>Site</LegalEmphasis>), a website owned and operated by Professor Malcolm&apos;s LLC, which delivers services under two Florida-registered ficticious names, CitePrep Guides and CitePrep Tutoring. Collectively, we refer to Professor Malcolm&apos;s LLC, CitePrep Guides, and CitePrep Tutoring as the <LegalEmphasis>Company</LegalEmphasis> (&apos;we&apos;, &apos;us&apos;, or &apos;our&apos;).
      </Legaldiv>
    </>
  },
  {
    id: 'C',
    title: '',
    content:
    <>
      <Legaldiv>
        The following terms and conditions (<LegalEmphasis>Terms of Use</LegalEmphasis>) form a binding agreement between you and us when you are a <LegalEmphasis>Visitor</LegalEmphasis> to this Site, hereafter referred to as our <LegalEmphasis>End Users</LegalEmphasis>.
      </Legaldiv>
    </>
  },
  {
    id: 'D',
    title: '',
    content:
    <>
      <Legaldiv>
        PLEASE READ THESE TERMS OF USE CAREFULLY. BY ACCESSING THE SITE AND USING THE PRODUCT YOU AGREE TO BE BOUND BY THESE TERMS OF USE. IF YOU ARE ACCESSING THE SITE OR USING THE PRODUCT AN ENTITY OR BUSINESS, YOU REPRESENT AND WARRANT THAT YOU HAVE THE AUTHORITY TO BIND SUCH ENTITY OR BUSINESS TO THESE TERMS OF USE. IF YOU OR THE ENTITY DO NOT WISH TO BE BOUND BY THESE TERMS OF USE, YOU MAY NOT ACCESS OR USE THIS SITE OR THE PRODUCT.
      </Legaldiv>
    </>
  },
  {
    id: '1',
    title: <LegalTitle>PRODUCT</LegalTitle>,
    content:
    <>
      <Legaldiv>
        The Site provides access to on-screen presentation tools (<LegalEmphasis>Tools</LegalEmphasis>) that add customization to the studying experience, enabling an End User to temporarily highlight particular Content. The Site provides an assortment of Content, including interactive flashcards (<LegalEmphasis>Flashcards</LegalEmphasis>), dynamic questions and graphics (<LegalEmphasis>Dynamics</LegalEmphasis>), and instructive videos (<LegalEmphasis>Videos</LegalEmphasis>). The Tools, Flashcards, Dynamics, and Videos are enriched content, collectively referred to as the <LegalEmphasis>Product</LegalEmphasis>.
      </Legaldiv>{'\n\n'}

      <Legaldiv>
        Unless explicitly stated otherwise, any updates that add new features or functionality to the Product and Site, including new releases, shall be subject to these Term You also understand and acknowledge that the Company may modify, terminate, suspend, or otherwise adjust any and all functions, features, options, utilities, tools, or other aspects of the Product, Site, and Content at any time without prior notice to you.
      </Legaldiv>{'\n\n'}

      <Legaldiv>
        You understand and agree that the Product, Site, and Content are provided “AS-IS” and that the Company assumes no responsibility for, among other things, usefulness, applicability, availability, timeliness, deletion, failure to store any user data or communications, personalization settings, or changes that the Company may make from time to time.
      </Legaldiv>
    </>
  },
  {
    id: '2',
    title: <LegalTitle>LICENSING</LegalTitle>,
    content:
    <>
      <Legaldiv>
        Licensing to access this Site is free without purchase. There are no requirements for login credentials (<LegalEmphasis>Credentials</LegalEmphasis>) to access the Product, Site, and Content.
      </Legaldiv>
    </>
  },
  {
    id: '3',
    title: <LegalTitle>CONTENT</LegalTitle>,
    content:
    <>
      <Legaldiv>
        We do not endorse any Content or any opinion, recommendation, or advice expressed in any Content, and we expressly disclaim any and all liability in connection with any Content.
      </Legaldiv>{'\n\n'}

      <Legaldiv>
        Content on the Site is drawn from the topic of mathematics, while Content in general can be drawn from topics in literature, history, languages, science, technology, engineering, and mathematic Content can be rendered as text, articles, videos, images, audio clips, photos, graphics, animations, and other content types or combination thereof.
      </Legaldiv>
    </>
  },
  {
    id: '4',
    title: <LegalTitle>OWNERSHIP AND CITEPREP LICENSES</LegalTitle>,
    content:
    <>
      <Legaldiv>
        You understand and acknowledge that the software, code, proprietary methods and systems used to provide the Site, the Product, and the Framework (collectively, <LegalEmphasis>Our Technology</LegalEmphasis>) are: (i) copyrighted by us or our licensors or both under United States and international copyright laws; (ii) subject to other intellectual property and proprietary rights and laws; and (iii) owned by us or our licensor Except as specifically allowed in this paragraph, Our Technology may not be modified, reproduced, republished, posted, displayed, performed, transmitted, sold, offered for sale, or redistributed in any way without our prior written permission and the prior written permission of our applicable licensor You must abide by all copyright notices, information, or restrictions contained in or attached to any of Our Technology.
      </Legaldiv>

      <Legaldiv>
        If you are a U.S. Government End User, any of the components that constitute Our Technology and its related documentation is a &apos;commercial item&apos; as that term is defined at 48 C.F.R. 2.101, consisting of &apos;commercial computer software&apos; and &apos;commercial computer software documentation&apos; as such terms are used in 48 C.F.R. 12.212. Consistent with 48 C.F.R. 12.212 and 48 C.F.R. 227.7202-1 through 227.7202-4, all U.S. Government end users acquire Our Technology and any documentation provided with the Products with only those rights set forth in this Agreement.
      </Legaldiv>
    </>
  },
  {
    id: '5',
    title: <LegalTitle>OUR TRADEMARKS</LegalTitle>,
    content:
    <>
      <Legaldiv>
        CITEPREP and CITE are registered trademarks in the United State Other graphics, logos, designs, page headers, button icons, and toolbars appearing on the Site may be trademarks in the United States and other countries (collectively, with the registered trademarks, the <LegalEmphasis>Marks</LegalEmphasis>). All other logos and trademarks are trademarks of their respective owner You are not authorized to use any Marks without our prior written permission. Ownership of all Marks and the goodwill associated therewith remains with u
      </Legaldiv>
    </>
  },
  {
    id: '6',
    title: <LegalTitle>FEEDBACK</LegalTitle>,
    content:
    <>
      <Legaldiv>
        In the event that you provide us any ideas, thoughts, criticisms, suggested improvements or other feedback related to the Site or Products, (collectively, <LegalEmphasis>Feedback</LegalEmphasis>), you agree we may use the Feedback to modify our products and that you will not be due any compensation, including any royalty related to the Site or Product that incorporates your Feedback. You grant to us a worldwide, royalty-free, fully paid, perpetual, irrevocable license to use, reproduce, modify, translate, distribute, perform, display, import, sell, offer for sale, make, have made and otherwise exploit the Feedback in any form, media, or technology, whether now known or hereafter developed, and to allow others to do the same. This is true whether you provide the Feedback on the Site or through any other method of communication with us, unless we have entered into a separate agreement with you that provides otherwise.
      </Legaldiv>
    </>
  },
  {
    id: '7',
    title: <LegalTitle>INTERACTIVE FORUMS</LegalTitle>,
    content:
    <>
      <Legaldiv>
        The Site may contain <LegalEmphasis>Forums</LegalEmphasis> that allow our End Users to interact with us and each other. You are solely responsible for any Content you post to a Forum. We reserve the right, but do not undertake the obligation, to alter, edit, refuse to post or remove a post on the Forums if it does not meet the standards established in this Agreement or for any other reason we deem appropriate. We are merely acting as a passive conduit for such distribution and are not undertaking any obligation or liability relating to any Content or activities of other users on the Site. You agree that (i) we are not in any manner responsible for the Content, (ii) we do not guarantee the accuracy, integrity or quality of the Content, and (iii) we cannot ensure that harmful, inaccurate, deceptive, offensive, threatening, defamatory, unlawful or otherwise objectionable Content will not appear on the Site or Forum You retain the copyright in any Content that you post in the Forums, and by posting any Content in the Forums, you grant to us a worldwide, royalty-free, fully paid, perpetual, irrevocable license to use, reproduce, modify, translate, distribute, perform, display, import, sell, offer for sale, make, have made and otherwise exploit the Content in any form, media, or technology, whether now known or hereafter developed, and to allow others to do the same.
      </Legaldiv>
    </>
  },
  {
    id: '8',
    title: <LegalTitle>DATA RIGHTS AND PUBLISHER PRIVACY POLICIES</LegalTitle>,
    content:
    <>
      <Legaldiv>
        We do not charge End Users to access the Site or use the Product However, we may collect <LegalEmphasis>Data</LegalEmphasis> related to an End User&apos;s use of the Product. Our Data collection, use, and disclosure practices are described more fully in our <Link href={'/privacy-policy/'}>Privacy Policy</Link> and include the use of log information and cookies that record anonymous (i.e., non-personal) information about our End User
      </Legaldiv>{'\n\n'}

      <Legaldiv>
        When an End User downloads a page from the Site, we may deploy a cookie on our own behalf or on behalf of our data partners, to record information about how an End User uses our Site or the web, such as the web search that landed the End User on a particular page or when the End User accesses particular Content.
      </Legaldiv>{'\n\n'}

      <Legaldiv>
        We will not collect Data from End Users that are directed to children pursuant to the U.S. Children&apos;s Online Privacy Protection Act.
      </Legaldiv>{'\n\n'}

      <Legaldiv>
        If you are an End User and prefer that we do not collect, and do not assist others in the collection of, Data about your usage of our Site, you you may reach us using the <Link href={'#contact'}>contact form</Link> below and we will respond in a reasonable time in order to assist you in discontinuing our placement of cookies related to this Data collection. If you do not cause us to discontinue the placement of our cookies, you grant us a non-exclusive, perpetual, worldwide and irrevocable right and license to collect, use and disclose the Data as provided in our <Link href={'/privacy-policy/'}>Privacy Policy</Link> and to allow our third party data partners to do the same.
      </Legaldiv>{'\n\n'}

      <Legaldiv>
        We allow third-party companies, including Professor Malcolm&apos;s LLC, to collect certain anonymous information when you visit the Site. These companies may use non-personally identifiable information during your visits to this and other websites in order to provide advertisements about goods and services likely to be of greater interest to you. These companies typically use a cookie or a third party web beacon to collect this information. To learn more about this behavioral advertising practice, please visit the sites <Link href={'http://www.networkadvertising.org/" target="_blank'}>www.networkadvertising.org</Link> and <Link href={'http://www.youronlinechoiceeu" target="_blank'}>www.youronlinechoiceeu</Link>.
      </Legaldiv>
    </>
  },
  {
    id: '9',
    title: <LegalTitle>PRIVACY</LegalTitle>,
    content:
    <>
      <Legaldiv>
        We know that your privacy and the security of your information is important. For this reason, we have created a <Link href={'/privacy-policy/'}>Privacy Policy</Link> that describes our collection, use, and disclosure of information.
      </Legaldiv>
    </>
  },
  {
    id: '10',
    title: <LegalTitle>GEOGRAPHICAL RESTRICTIONS</LegalTitle>,
    content:
    <>
      <Legaldiv>
        We make no representation that all of the Products are appropriate or available for use in locations outside the United States or all territories within the United State If you choose to access our Site and the Products, you do so on your own initiative and are responsible for compliance with local law
      </Legaldiv>
    </>
  },
  {
    id: '11',
    title: <LegalTitle>MODIFICATIONS TO TERMS</LegalTitle>,
    content:
    <>
      <Legaldiv>
        We may change the terms of these Terms of Use from time to time on a going-forward basi We will notify you of any such material changes by posting notice of the changes on the Site, or, at our sole discretion, by email. Any such modifications become effective upon the earlier to occur of (i) your acknowledgement of such modifications; or (ii) your continued access to or use of the Site or Product after we post notice of such modification It is your sole responsibility to check the Site from time to time to view any such changes to the terms in the Terms of Use. If you do not agree to any changes, if and when such changes may be made to the Terms of Use, you must cease access to the Site and use of the Product.
      </Legaldiv>
    </>
  },
  {
    id: '12',
    title: <LegalTitle>MODIFICATIONS TO THE SITE OR PRODUCT</LegalTitle>,
    content:
    <>
      <Legaldiv>
        We reserve the right to modify or discontinue the Site or Product with or without notice to you. We will not be liable to you or any third party should we exercise our right to modify or discontinue the Site or Product or both. If you object to any such changes, your sole recourse will be to cease access to the Site or Product. Continued access to the Site or Product following notice of any such changes will indicate your acknowledgement of such changes and satisfaction with the Site or Product as so modified. You agree that we, at our sole discretion, may immediately terminate your access to the Site at any time, for any reason, at our sole discretion. YOU AGREE THAT WE WILL NOT BE LIABLE TO YOU OR ANY OTHER PARTY FOR ANY TERMINATION OF YOUR ACCESS TO THE SITE OR PRODUCT.
      </Legaldiv>
    </>
  },
  {
    id: '13',
    title: <LegalTitle>TERMINATION</LegalTitle>,
    content:
    <>
      <Legaldiv>
        You acknowledge and agree that we, at our sole discretion, may terminate your use of the Site or the Product or both without prior notice for any reason at any time. You agree that we shall not be liable to you or any third party for termination of your access to the Site and Product. In the event of any termination, you will immediately cease access to the Site and Product.
      </Legaldiv>
    </>
  },
  {
    id: '14',
    title: <LegalTitle>COPYRIGHT VIOLATIONS</LegalTitle>,
    content:
    <>
      <Legaldiv>
        We respect the intellectual property of others, and we ask you to do the same. If you believe that your work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent the following information:
      </Legaldiv>{'\n\n'}

      {/* <Legaldiv>
        <ul>
          <li>An electronic or physical signature of the person authorized to act on behalf of the owner of the copyright interest;</li>
          <li>A description of the copyrighted work that you claim has been infringed;</li>
          <li>A description of where the material that you claim is infringing is located on the Site or Product;</li>
          <li>Your address, telephone number, and email address;</li>
          <li>A statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law; and</li>
          <li>A statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner&apos;s behalf.</li>
        </ul>
      </Legaldiv> */}

      <Legaldiv>
        Our Copyright Agent for notice of claims of copyright infringement on the Site or the Product can be reached using the <Link href={'#contact'}>contact form</Link> below. Please note that, pursuant to 17 U.S.C., section 512(f), any misrepresentation of material fact (falsities) in a written notification automatically subjects the complaining party to liability for any damages, costs and attorney&apos;s fees incurred by Professor Malcolm&apos;s LLC in connection with the written notification and allegation of copyright infringement.
      </Legaldiv>
    </>
  },
  {
    id: '15',
    title: <LegalTitle>DISCLAIMERS</LegalTitle>,
    content:
    <>
      <Legaldiv>
        THE SITE AND PRODUCT AS WELL AS ALL SOFTWARE, MATERIALS, AND TECHNOLOGY USED TO PROVIDE ANY OF THE FOREGOING, ARE PROVIDED ON AN &apos;AS IS&apos; AND &apos;AS AVAILABLE&apos; BASIS WITHOUT ANY WARRANTY OF ANY KIND. TO THE MAXIMUM EXTENT PERMITTED BY LAW, PROFESSOR MALCOLM&apos;S LLC, FICTICIOUS NAMES, OUR OFFICERS, DIRECTORS, AGENTS, AND EMPLOYEES EXPRESSLY DISCLAIM ALL REPRESENTATIONS AND WARRANTIES, WHETHER EXPRESS OR IMPLIED, ORAL OR WRITTEN, INCLUDING ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, ACCURACY, TITLE, QUIET ENJOYMENT, UN-INTERRUPTION, SYSTEM INTEGRATION, OR COMBINATION THEREOF. PROFESSOR MALCOLM&apos;S LLC, FICTICIOUS NAMES, OUR OFFICERS, DIRECTORS, AGENTS, AND EMPLOYEES MAKE NO WARRANTY ABOUT THE ACCURACY, RELIABILITY, COMPLETENESS, QUALITY, OR TIMELINESS OF THE SITE OR PRODUCT, OR THAT PROBLEMS WITH THE FOREGOING WILL BE CORRECTED, OR THAT THE SITE OR PRODUCT ARE FREE OF VIRUSES AND OTHER HARMFUL COMPONENTS, OR THAT THEY WILL BE UNINTERRUPTED OR ERROR FREE.
      </Legaldiv>
    </>
  },
  {
    id: '16',
    title: <LegalTitle>LIMITATIONS OF LIABILITY AND CONTENT</LegalTitle>,
    content:
    <>
      <Legaldiv>
        YOU ACKNOWLEDGE AND AGREE THAT WE ARE ONLY WILLING TO PROVIDE ACCESS TO THE SITE AND ACCESS TO THE PRODUCT IF YOU AGREE TO CERTAIN LIMITATIONS OF OUR LIABILITY TO YOU AND TO THIRD PARTIES. IN NO EVENT WILL PROFESSOR MALCOLM&apos;S LLC, ITS PARENT, AFFILIATES, FICTICIOUS NAMES, OFFICERS, DIRECTORS, AGENTS OR EMPLOYEES BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY INDIRECT, INCIDENTAL, SPECIAL AND CONSEQUENTIAL DAMAGES OR LIKE DAMAGES, INCLUDING, LOST PROFITS, GOODWILL, LOST OPPORTUNITIES AND INTANGIBLE LOSSES, ARISING IN CONNECTION WITH THE SITE, PRODUCT OR THESE TERMS, INCLUDING, FOR EXAMPLE AND CLARITY ONLY, DAMAGES RESULTING FROM LOST DATA, LOST EMPLOYMENT OPPORTUNITIES, OR BUSINESS INTERRUPTIONS, OR RESULTING FROM THE USE OR ACCESS TO, OR THE INABILITY TO USE OR TO ACCESS, THE SITE OR THE PRODUCT. THESE LIMITATIONS OF LIABILITY APPLY REGARDLESS OF THE NATURE OF ANY CLAIM, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL OR EQUITABLE THEORY, AND WHETHER OR NOT PROFESSOR MALCOLM&apos;S LLC IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
      </Legaldiv>{'\n\n'}

      <Legaldiv>
        YOU AGREE THAT YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY CLAIMS ARISING IN CONNECTION WITH ANY VIOLATION BY US OF THESE TERMS OF USE IS TO DISCONTINUE USING THE SITE, THE PRODUCT, OR BOTH. IN THE EVENT THAT A COURT DETERMINES THAT THE PRECEDING SENTENCE IS UNENFORCEABLE, OUR AGGREGATE LIABILITY FOR ALL CLAIMS ARISING IN CONNECTION WITH ANY VIOLATION OF THESE TERMS WILL NOT EXCEED ONE HUNDRED DOLLARS (U.S. $100.00). Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of liability for certain types of damage Accordingly, some of the above limitations and disclaimers may not apply to you. To the extent that we may not, as a matter of applicable law, disclaim any warranty or limit our liabilities, the scope and duration of such warranty and the extent of our liability will be the minimum permitted under such applicable law.
      </Legaldiv>{'\n\n'}

      <Legaldiv>
        WITHOUT LIMITING THE FOREGOING, UNDER NO CIRCUMSTANCES WILL WE OR OUR LICENSORS BE HELD LIABLE FOR ANY DELAY OR FAILURE IN PERFORMANCE RESULTING DIRECTLY OR INDIRECTLY FROM ACTS OF NATURE, FORCES, OR CAUSES BEYOND OUR REASONABLE CONTROL, INCLUDING, WITHOUT LIMITATION, INTERNET FAILURES, COMPUTER EQUIPMENT FAILURES, TELECOMMUNICATION EQUIPMENT FAILURES, OTHER EQUIPMENT FAILURES, ELECTRICAL POWER FAILURES, STRIKES, LABOR DISPUTES, RIOTS, INSURRECTIONS, CIVIL DISTURBANCES, SHORTAGES OF LABOR OR MATERIALS, FIRES, FLOODS, STORMS, EXPLOSIONS, ACTS OF GOD, WAR, GOVERNMENTAL ACTIONS, ORDERS OF DOMESTIC OR FOREIGN COURTS OR TRIBUNALS, OR NON-PERFORMANCE OF THIRD PARTIES.
      </Legaldiv>
    </>
  },
  {
    id: '17',
    title: <LegalTitle>INDEMNIFICATION</LegalTitle>,
    content:
    <>
      <Legaldiv>
        You agree to indemnify, defend and hold harmless Professor Malcolm&apos;s LLC, our officers, directors, ficticious names, co-branders and other partners, employees, consultants and agents, from and against any and all third-party claims, liabilities, damages, losses, costs, expenses, fees (including reasonable attorney&apos;s fees and court costs) that such parties may incur as a result of or arising from (i) any Content you submit, post or transmit through the Site, (ii) your use of the Site or Product, including without limitation any use or modification of the Downloadable Code, (iii) your violation of these Terms of Use, (iv) your violation of any rights of any other person or entity, or (v) any viruses, trojan horses, worms, time bombs, cancelbots or other similar harmful or deleterious programming routines input by you into the Site or Product.
      </Legaldiv>
    </>
  },
  {
    id: '18',
    title: <LegalTitle>ELECTRONIC COMMUNICATIONS</LegalTitle>,
    content:
    <>
      <Legaldiv>
        We can only give you the benefits of our service by conducting business through the Internet, and therefore we need you to consent to our giving you <LegalEmphasis>Communications</LegalEmphasis> electronically. This Section informs you of your rights when receiving Communications from us electronically. For contractual purposes, you (i) consent to receive Communications from us in an electronic form; and (ii) agree that all terms and conditions, agreements, notices, documents, disclosures, and other communications (collectively, <LegalEmphasis>Communications</LegalEmphasis>) that we provide to you electronically satisfy any legal requirement that such Communications would satisfy if it were in a writing. Your consent to receive Communications and do business electronically, and our agreement to do so, applies to all of your interactions and transactions with u The foregoing does not affect your non-waivable right You may also receive a copy of these Terms of Use by accessing this Site. You may withdraw your consent to receive Communications electronically by contacting us in the manner described below. If you withdraw your consent, from that time forward, you must stop using the Site and Product. The withdrawal of your consent will not affect the legal validity and enforceability of any obligations or any electronic Communications provided or business transacted between us prior to the time you withdraw your consent. Please keep us informed of any changes in your email or mailing address so that you continue to receive all Communications without interruption.
      </Legaldiv>
    </>
  },
  {
    id: '19',
    title: <LegalTitle>SURVIVAL</LegalTitle>,
    content:
    <>
      <Legaldiv>
        Any provisions regarding ownership, any licenses that by their terms survive termination, as well as <LegalEmphasis>Sections 14 through 24</LegalEmphasis> will survive the expiration or termination of these Terms of Use for any reason.
      </Legaldiv>
    </>
  },
  {
    id: '20',
    title: <LegalTitle>NOTICE VIOLATIONS</LegalTitle>,
    content:
    <>
      <Legaldiv>
        We may give notice to you by email, a posting on the Site, or other reasonable mean You must give notice to us in writing using the <Link href={'#contact'}>contact form</Link> below or as otherwise expressly provided. Please report any violations of these Terms of Use using the <Link href={'#contact'}>contact form</Link> below.
      </Legaldiv>
    </>
  },
  {
    id: '21',
    title: <LegalTitle>HEADINGS</LegalTitle>,
    content:
    <>
      <Legaldiv>
        The paragraph headings in these Terms of Use, shown in boldface type, are included only to help make these Terms of Use easier to read and have no binding effect.
      </Legaldiv>
    </>
  },
  {
    id: '22',
    title: <LegalTitle>TRANSFERABILITY AND ASSIGNABILITY</LegalTitle>,
    content:
    <>
      <Legaldiv>
        These Terms of Use are personal to you, and you may not transfer, assign or delegate your right or duties or both under these Terms of Use to anyone else and any attempted assignment or delegation is void.
      </Legaldiv>
    </>
  },
  {
    id: '23',
    title: <LegalTitle>GENERAL TERMS</LegalTitle>,
    content:
    <>
      <Legaldiv>
        You are responsible for compliance with all applicable law The Terms of Use and the relationship between you and Professor Malcolm&apos;s LLC will be governed by the <LegalEmphasis>laws of the State of Florida</LegalEmphasis>, without giving effect to any choice of laws principles that would require the application of the laws of a different country or state. Any legal action, suit or proceeding arising out of or relating to the Terms of Use, or your use of the Site or Product must be instituted exclusively in the federal or state courts located in <LegalEmphasis>Orange County, Florida</LegalEmphasis> and in no other jurisdiction. You further consent to exclusive personal jurisdiction and venue in, and agree to service of process issued or authorized by, any such court.
      </Legaldiv>{'\n\n'}

      <Legaldiv>
        You acknowledge that we have the right hereunder to seek an injunction, if necessary, to stop or prevent a breach of your obligations hereunder. Any delay or failure by us to exercise or enforce any right or provision of these Terms of Use will not constitute a waiver of such right or provision. No waiver by us will have effect unless such waiver is set forth in writing, signed by us; nor will any such waiver of any breach or default constitute a waiver of any subsequent breach or default.
      </Legaldiv>{'\n\n'}

      <Legaldiv>
        YOU AND PROFESSOR MALCOLM&apos;S LLC AGREE THAT ANY CAUSE OF ACTION ARISING OUT OF OR RELATED TO THE SITE OR PRODUCT MUST COMMENCE WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES, OTHERWISE, SUCH CAUSE OF ACTION IS PERMANENTLY BARRED.
      </Legaldiv>
    </>
  },
  {
    id: '24',
    title: <LegalTitle>COMPLETENESS</LegalTitle>,
    content:
    <>
      <Legaldiv>
         These Terms of Use constitute the complete and exclusive agreement between you and us with respect to the subject matter hereof, and supersedes all prior oral or written understandings, communications or agreement If for any reason a court of competent jurisdiction finds any provision of these Terms of Use, or portion thereof, to be unenforceable, that provision of the Terms of Use will be enforced to the maximum extent permissible so as to effect the intent of the parties, and the remainder of these Terms of Use will continue in full force and effect.
      </Legaldiv>
    </>
  },
  {
    id: 'E',
    title: '',
    content:
    <>
      <Legaldiv>
        Last Updated: January 31, 2024
      </Legaldiv>
    </>
  }
]

const TermsAndConditionsScreen = (): React.ReactNode => {
  return (
    <div className="aic, w-100, bg-background, pa1">
      <div className="flex-row, aic, jcc, w-100X">
        {/* <Icon name={'folder'} size={36} className="mr3" color={paperTheme.colorprimary as string} testID={'iconProfile'} /> */}
        <div className="b, f3, tc, mv3, primary">Terms | Conditions</div>
        {/* <div className="b, f3, tc, mv3, primary">{t('screenfiletermsAndConditions')}</div> */}
      </div>
      <div className="flex-1, pa3, w-100">
        {legalContent.map((item) => (
          <div key={item.id} className="mb3 flex-row">
            <div className="f6 black b w_5 mr2 ml0">
              {isOnlyNumbers(item.id) ? item.id : ' '}
            </div>
            <div className="f6 primary w_90">
              {item.title} {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TermsAndConditionsScreen