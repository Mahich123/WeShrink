import Header from "@/components/Header";

type Props  = {
    children: React.ReactNode;
}


const DashBoardLayout = ({children}: Props) => {
  return (
    <div>
        <Header />
        {children}
    </div>
  )
}

export default DashBoardLayout