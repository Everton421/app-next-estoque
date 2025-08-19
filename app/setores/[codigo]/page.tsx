



'use client';

import { UseDateFunction } from "@/app/hooks/useDateFunction";
import { configApi } from "@/app/services/api";
import { AlertDemo } from "@/components/alert/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Optional but good for structure
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea
import { useAuth } from "@/contexts/AuthContext";
import { Save, ArrowLeft } from "lucide-react"; // Add ArrowLeft if you want a back button
import { useRouter } from "next/navigation"; // Use router for navigation
import { useCallback, useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import { ISetor } from "../types/setor";


export default function setorEdit({ params }: { params: { codigo: string } }) {  

    const [data, setData] = useState<ISetor | null>(null);  
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [msgAlert, setMsgAlert] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);  
    const [isSaving, setIsSaving] = useState(false);  

    const [descricao, setDescricao] = useState<string>('');

    const api = configApi();
    const useDateService = UseDateFunction();
    const { user,loading }: any = useAuth();  
    const router = useRouter();  
       
    
    function delay(ms:number) {
            return new Promise((resolve)=>{ setTimeout( resolve,ms )})
           }


  useEffect(() => {
    if (!loading) {
      if (!user && !user.token) {
        router.push('/login'); // Redireciona para a página de login (ajuste se for outra)
      }
    }
  }, [user, loading, router]);


  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
         <p>Verificando autenticação...</p>
      </div>
    );
  }


    async function gravar() {
        if (!data || isSaving) return;  

        setIsSaving(true);
        const dadosParaGravar: Partial<ISetor> = {  
            codigo: data.codigo,  
            id: data.id,  
            aplicacao: aplicacao,
            valor: valor,
            data_recadastro: useDateService.obterDataHoraAtual(),
             tipo_serv: data.tipo_serv,  
             ativo: data.ativo
        };

        console.log("Enviando para API:", dadosParaGravar);  
 
        try {
            const result = await api.put('/servico', dadosParaGravar, {
                headers: { token:  user.token  },
            });
            console.log(result);
            if (result.status === 200 && result.data?.codigo > 0) {  
                console.log(result);
                setVisibleAlert(true);
                setMsgAlert(`Serviço ${result.data.codigo} Alterado com Sucesso!`);
            } else {
                 throw new Error(result.data?.message || `Erro ao salvar Serviço ${data.codigo}. Status: ${result.status}`);
            }
        } catch (error: any) {
            console.error("Erro ao gravar serviço:", error);
            setMsgAlert(error.message || `Erro ao salvar alterações do serviço ${data.codigo}.`);
            setVisibleAlert(true);
        } finally {
            setIsSaving(false);
        }

  
    }

    /*
    const handleActive = useCallback((newStatus: 'S' | 'N') => {
         //console.log("Status change requested (implement if needed):", newStatus);
         setData(
            (prev:any)=> { 
               return  {...prev, ativo:newStatus};
            }

            )
    }, []);
    */

       async function busca() {
            setIsLoading(true);
 
            try {
                const result = await api.get(`/setores`, {
                    params: { codigo: Number(params.codigo) , limit:1 },
                      headers:{ token:  user.token },
                });

                if (result.status === 200 && result.data?.length > 0) {
                    const dadosSetor: ISetor = result.data[0];
                    console.log(dadosSetor);
                    setData(dadosSetor);
                    setDescricao(dadosSetor.descricao || '');
                } else {
                    console.warn(`Setor com código ${params.codigo} não encontrado.`);
                    setMsgAlert(`Setor com código ${params.codigo} não encontrado.`);
                    setVisibleAlert(true);
                    setData(null); 
                }
            } catch (error) {
                console.error("Erro ao buscar dados do Setor:", error);
                setMsgAlert("Erro ao carregar dados do Setor.");
                setVisibleAlert(true);
                setData(null);  
            } finally {
                setIsLoading(false);
            }
        }



    useEffect(() => {
        if (  !params.codigo) {
            console.warn("User or Codigo missing");
             setIsLoading(false);  
            return;
        }
     
        if( !user || !user.token){
            console.log(`Token nao informado ${ user} `)
            return
        }else{
        busca();
        }
    }, [  ]);  


    if (isLoading) {
        return (
                <div className="flex justify-center items-center h-screen">
                 <ThreeDot variant="pulsate" color="#2563eb" size="medium" text="" textColor="" />
               </div>
        );
    }

     if (!data && !isLoading) {
         return (
             <div className="flex flex-col justify-center items-center min-h-screen p-4">
                 <p className="text-xl text-red-600 mb-4">Setor não encontrado ou erro ao carregar.</p>
                 <Button onClick={() => router.push('/setores')} variant="outline">
                     <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para Setores
                 </Button>
                 <AlertDemo content={msgAlert} title="Aviso" visible={visibleAlert} setVisible={setVisibleAlert} />
             </div>
         );
     }

    if (!data) return null;





    return (
        <div className="h-screen flex flex-col sm:ml-14 bg-slate-100 overflow-hidden">
     <div className="w-full max-w-screen-2xl mx-auto bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 flex flex-col flex-1">

            <AlertDemo content={msgAlert} title="Aviso" visible={visibleAlert} setVisible={setVisibleAlert} to={'/setores'} />

            <ScrollArea className="flex-1 p-4 md:p-6">

                <div className="max-w-7xl mx-auto flex flex-col gap-6 pb-24"> {/* Added pb-24 for footer space */}

                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-2xl font-bold text-gray-800">
                            Editar Setor
                        </h1>
                        <Button variant="outline" onClick={() => router.push('/setores')}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                        </Button>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Detalhes do Serviço</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-4">
                            <div>
                                <Label className="text-sm font-medium text-gray-600">Código:</Label>
                                <p className="text-lg font-semibold text-gray-900 mt-1">{data.codigo}</p>
                            </div>

                            <div>
                                <Label htmlFor="descricao" className="text-sm font-medium text-gray-600">Descrição:</Label>
                                <Input
                                    id="descricao"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}
                                    className="mt-1 text-base"
                                    placeholder="Descrição do Setor"
                                />
                            </div>

                        </CardContent>
                    </Card>

                </div>
            </ScrollArea>

            {/* Fixed Bottom Bar - Aligned with sm:ml-14 */}
            <div className="fixed bottom-0 left-0 right-0 border-t bg-background shadow-md p-3 z-10 sm:ml-14 bg-white">
                {/* Inner container matching content max-width */}
                <div className="max-w-3xl mx-auto flex justify-end">
                    <Button onClick={gravar} disabled={isSaving || isLoading}>
                        <Save className="mr-2 h-4 w-4" />
                        {isSaving ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                </div>
            </div>
            </div>

        </div>
    );
}



 