type CknSocialTitleProps = {
  nominal?: string
}

const CknSocialTitle = ({nominal}: CknSocialTitleProps) => {
  return (
    <span className="b grey"><span className="b brand">CK</span>Ո Social {nominal}</span>
  )
}

export default CknSocialTitle