import Header from "@/components/Header";

type Props  = {
    children: React.ReactNode;
}


const Homelayout = ({children}: Props) => {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default Homelayout