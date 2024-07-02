import { Toaster } from "@/components/ui/toaster";


type Props  = {
    children: React.ReactNode;
}


const SiginLayout = ({children}: Props) => {
  return (
    <div>
        {children}
        <Toaster />
    </div>
  )
}

export default SiginLayout