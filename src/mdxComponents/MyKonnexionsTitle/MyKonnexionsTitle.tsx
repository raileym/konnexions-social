type MyKonnexionsTitleProps = {
  nominal?: string
}

const MyKonnexionsTitle = ({nominal}: MyKonnexionsTitleProps) => {
  return (
    <span className="b grey">My <span className="b brand">K</span>onne<span className="b brand">x</span>ions {nominal}</span>
  )
}

export default MyKonnexionsTitle