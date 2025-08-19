'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Check, Edit, Plus, X } from "lucide-react";
import { config } from "process";
import { useEffect, useState } from "react";
import { configApi } from "../services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ThreeDot } from "react-loading-indicators";
import { ISetor } from "./types/setor";

type paramsGet = {
   ativo:'S'|'N' 
  codigo?:number
  descricao?:string
  }

export default function setores(){

const {user, loading }:any = useAuth();

 const [ pesquisa , setPesquisa ] = useState('');
 const [ dados, setDados ] = useState();
 const [ setores, setSetores ] = useState([]);
 const [ filtroAtivo, setFiltroAtivo ] = useState<'S' | 'N'> ('S');
 const [isLoading, setIsLoading] = useState(false);  

    const api = configApi();
    const router = useRouter();

   
    async function busca() {
      setSetores([])
      setIsLoading(true)
      try{
        let params:paramsGet = { 
          ativo:filtroAtivo,
        }

        let verifPesqu = parseInt(pesquisa)

          if( isNaN(verifPesqu)){
            params.descricao = pesquisa
        }else{
            params.codigo = verifPesqu

        }

      let result = await api.get(`/setores`, { 
          headers:{
             token:  user.token 
          }, 
          params:params
          
      })

          if( result.status === 200 && !result.data.erro ){
              setSetores( result.data);
              console.log(result.data)
          }
      }catch(e:any){
        console.log(e.response)
      }finally{
        setIsLoading(false)
      }
    
    }


    useEffect(() => {
      if (!loading) {
        if (!user) {
          router.push('/'); // Redireciona para a página de login (ajuste se for outra)
        }
      }
    }, [user, loading, router]);
  
  
   useEffect(()=>{
       busca();
    },[ pesquisa, filtroAtivo])



    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
                  <ThreeDot variant="pulsate" color="#2563eb" size="medium" text="" textColor="" />
        </div>
      );
    }
  
    if (!user) {
      return (
         <div className="flex justify-center items-center h-screen">
           <ThreeDot variant="pulsate" color="#2563eb" size="medium" text="" textColor="" />
         </div>
      );
    }

    function handleClick(i:any) {
      router.push(`/setores/${i}`)
  
       }

    return(
      <div className= " min-h-screen flex flex-col sm:ml-14 p-4 w-full h-full  justify-itens-center items-center    bg-slate-100"  >
        <div className="  w-full md:w-5/6   p-2 mt-22 min-h-screen    rounded-lg bg-white shadow-md " >
           
          <div className="p-2 rounded-sm bg-slate-100">

            <div className="m-5  flex justify-between   ">
                 <h1 className="text-2xl md:text-4xl font-bold font-sans text-gray-800">
                     Setores
                  </h1>
                </div>

           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6  ">
          <div className="  md:w-auto md:max-w-md md:min-w-[60%] items-center gap-2 mt-3" >

            <Input
              placeholder="Pesquisar por código ou descrição..."
              className="shadow-sm flex-grow bg-white" // Takes available space
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
            />
           <div className="flex items-center justify-center sm:justify-start gap-4 m-3">
              <div className="flex items-center gap-1" title="Ativo">
              { filtroAtivo === 'S' ?
                ( <Button onClick={()=> setFiltroAtivo('S')}
                 className="bg-green-600 p-1 w-5 h-5 rounded-full flex items-center justify-center">
                  <Check size={16} color="#FFF" strokeWidth={3} />
                </Button> ) :(
                  <Button onClick={()=> setFiltroAtivo('S')}
                     className="bg-gray-400 p-1 w-5 h-5 rounded-full flex items-center justify-center">
                   <Check size={16} color="#FFF" strokeWidth={3} />
                 </Button>    
                )
              } 
              </div>
              <div className="flex items-center gap-1" title="Inativo">
              { filtroAtivo === 'N' ? (
                 <Button  onClick={()=> setFiltroAtivo('N')}
                 className="bg-red-600 p-1 w-5 h-5 rounded-full flex items-center justify-center">
                  <X size={16} color="#FFF" strokeWidth={3} />
                </Button>
                ) : (
                  <Button onClick={()=> setFiltroAtivo('N')}
                   className="bg-gray-400 p-1 w-5 h-5 rounded-full flex items-center justify-center">
                  <X size={16} color="#FFF" strokeWidth={3} />
                </Button>
                )
              }
              
              </div>
            </div>
          </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4   md:mt-0">
              <Button type="button" className="shadow-sm w-full sm:w-auto" 
              onClick={()=> router.push('/setores/novo')}
            >
              <Plus className="h-4 w-4 mr-2" /> Novo
            </Button>

          
          </div>

        </div>  
         </div>

            <div className="w-full mt-4  h-screen shadow-lg ">
                        <Table  className="w-full  bg-gray-100 rounded-sm ">
                           <TableHead className= " w-[5%]   text-xs md:text-base">Codigo</TableHead>
                           <TableHead className= " w-[70%]  text-xs md:text-base   " >Descrição</TableHead>
                           <TableHead className= " w-[20%]  text-xs md:text-base   " >Data De Cadastro</TableHead>
                           <TableHead className=" text-base" > </TableHead>
                        </Table >
      { 
        setores.length > 0 ?
        (
              <ScrollArea className="w-full mt-4  h-[80%] overflow-auto  shadow-lg rounded-lg  ">
                    <Table  className="w-full bg-white rounded-xl ">
       
                    <TableBody>
                 { 
                      setores.length > 0 && 
                        setores.map(( i:ISetor )=>(
                              <TableRow  
                              className="h-14 justify-center items-center"
                              key={i.codigo}
                              > 
                              
                                <TableCell className=" text-xs md:text-base text-center font-medium text-gray-700 whitespace-nowrap w-[5%]  " >  {i.codigo}     </TableCell>
                                <TableCell className=" text-xs md:text-base   text-gray-600 w-[70%] "> {i?.descricao ?? ''}  </TableCell>
                                <TableCell className=" text-xs md:text-base   text-gray-600 w-[20%] "> {new Date(i?.data_cadastro).toLocaleString('pt-br',{ day:'2-digit', month:'short',year:'numeric'})  }  </TableCell>
                                <TableCell className=" text-left   font-bold text-gray-600">  
                                  <div className="flex items-center justify-center gap-2">
                                  
                                          <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-8 w-8"
                                                  onClick={() => handleClick(i.codigo)}
                                                  title="Editar Produto"
                                                >
                                                  <Edit className="h-4 w-4" />
                                              </Button>
                                    <div
                                        className={`p-1 w-5 h-5 rounded-full flex items-center justify-center ${
                                          i.ativo === 'S' ? 'bg-green-600' : 'bg-red-600'
                                        }`}
                                        title={i.ativo === 'S' ? 'Ativo' : 'Inativo'}
                                      >
                                        {i.ativo === 'S' ? (
                                          <Check size={16} color="#FFF" strokeWidth={3} />
                                        ) : (
                                          <X size={16} color="#FFF" strokeWidth={3} />
                                          )}
                                      </div>
                                  </div>

                                </TableCell>
                               
                              </TableRow>
                              )
                          )
                       }
                    </TableBody>
                    
                    </Table>
              </ScrollArea>
        ):(
          isLoading ? 
          (
            <div className="flex justify-center my-4"> {/* Container para centralizar */}
            <ThreeDot variant="pulsate" color="#2563eb" size="medium" text="" textColor="" />
          </div>
      ):
          <span className=" text-xs md:text-xl text-gray-500 text-center   m-7 "> nenhum setor encontrado!</span>
      
        )  
      }         
                     
          </div>
      
          
          </div>
        </div>
    )
}