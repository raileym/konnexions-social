type MyKonnectionsTitleProps = {
  nominal?: string
}

const MyKonnectionsTitle = ({nominal}: MyKonnectionsTitleProps) => {
  return (
    <span className="b grey">My <span className="b brand">K</span>onnections {nominal}</span>
  )
}

export default MyKonnectionsTitle