import Link from "next/link";
import { Button } from "../ui/button"
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Car, Ellipsis, FolderSync, Home, Package, PanelBottom, Settings, ShoppingBag, ShoppingCart, SlidersVertical, User, Warehouse, Wrench } from "lucide-react";
import { Tooltip, TooltipProvider } from  "../ui/tooltip"
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

export function Sidebar(){
    return (
        <div className="flex w-full flex-col bg-muted/40 print:hidden"> 

            <aside className="fixed inset-y-0 z-10 hidden w-1 border-r bg-background sm:flex  "  >
                <nav className="flex flex-col items-center gap-4  px-2 py-5">
                    
                    <TooltipProvider>
                         
                    <Tooltip>
                            <TooltipTrigger asChild>
                                    <Link href="/home" 
                                        className="flex h-9 w-9 shrink-0 items-center justify-center
                                        rounded-lg text-muted-foreground transition-colors hover:text-foreground
                                        cursor-default ">
                                </Link>
                            </TooltipTrigger>
                    </Tooltip>

                      <Tooltip>
                            <TooltipTrigger asChild>
                                    <Link href="/home" 
                                        className="flex h-9 w-9 shrink-0 items-center justify-center
                                        rounded-lg text-muted-foreground transition-colors hover:text-foreground  ">
                                     <Home className="h-4 w-5"/>
                                      <span className="sr-only " > Inicio</span>

                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="m-5 bg-black text-white rounded-2xl p-1 " >Inicio </TooltipContent>
                            
                        </Tooltip>
                        
                        <Tooltip>
                            <TooltipTrigger asChild>
                                    <Link href="/produtos" 
                                        className="flex h-9 w-9 shrink-0 items-center justify-center
                                        rounded-lg text-muted-foreground transition-colors hover:text-foreground
                                    ">
                                <Package className="h-4 w-5"/>
                                    <span className="sr-only " > produtos</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="m-5 bg-black text-white rounded-2xl p-1 " >produtos </TooltipContent>
                        </Tooltip>

                         <Tooltip>
                            <TooltipTrigger asChild>
                                    <Link href="/setores" 
                                        className="flex h-9 w-9 shrink-0 items-center justify-center
                                        rounded-lg text-muted-foreground transition-colors hover:text-foreground
                                    ">
                                   <Warehouse className="h-4 w-5"/>
                                    <span className="sr-only " > setores</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="m-5 bg-black text-white rounded-2xl p-1 " >setores </TooltipContent>
                        </Tooltip>
                          
                          <Tooltip>
                            <TooltipTrigger asChild>
                                    <Link href="/acertos" 
                                        className="flex h-9 w-9 shrink-0 items-center justify-center
                                        rounded-lg text-muted-foreground transition-colors hover:text-foreground
                                    ">
                                    <FolderSync className="h-4 w-5"/>
                                    <span className="sr-only " > Acertos</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right" className="m-5 bg-black text-white rounded-2xl p-1 " >Acertos </TooltipContent>
                        </Tooltip>
               
                    </TooltipProvider>

            <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-5">
            < TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                        <Link href="/configuracoes" 
                                            className="flex h-9 w-9 shrink-0 items-center justify-center
                                            rounded-lg text-muted-foreground transition-colors hover:text-foreground
                                        ">
                                    <Settings className="h-4 w-5"/>
                                        <span className="sr-only " > Configurações </span>
                                    </Link>
                                </TooltipTrigger>
                            <TooltipContent side="right" className="m-5 bg-black text-white rounded-2xl p-1 " >Configurações </TooltipContent>

                            </Tooltip>
                        </TooltipProvider>
            </nav>

                </nav>
            </aside>

            <div className=" sm:hidden flex flex-col sm:gap-4 sm:py-4 sm:pl-14" >
                <header
                 className="sticky top-0 flex h-14 z-30  items-center px-4 border-b
                  bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6" >
                    <Sheet>
                        <SheetTrigger asChild>
                                <Button size="icon" variant="outline" className="sm:hidden">
                                    <Ellipsis className="w-5 h-5" />
                                        <span className="sr-only" > Abrir / Fechar menu  </span>
                                </Button>
                            </SheetTrigger>

                        <SheetContent className="sm:max-2-x" side="left">
                            <nav className="grid gap gap-6 tex"> 
                                <Link 
                                    href="/home"
                                    className="flex items-center gap-4 px-2.5 text-foreground hover:text-foreground"
                                    prefetch={false}
                                    >
                                    <Home className="h-5 w-5 transition-all" />
                                     Início
                                </Link>

                                <Link 
                                    href="/produtos"
                                    className="flex items-center gap-4 px-2.5 text-foreground hover:text-foreground"
                                    prefetch={false}
                                    >
                                    <Package className="h-5 w-5 transition-all" />
                                     Produtos
                                </Link>
                                <Link 
                                    href="/setores"
                                    className="flex items-center gap-4 px-2.5 text-foreground hover:text-foreground"
                                    prefetch={false}
                                    >
                                   <Warehouse className="h-4 w-5 transition-all"/>
                                     setores
                                </Link>


                            <Link 
                                    href="/acertos"
                                    className="flex items-center gap-4 px-2.5 text-foreground hover:text-foreground"
                                    prefetch={false}
                                    >
                                    <FolderSync className="h-4 w-5"/>
                                     Acertos
                                </Link>
                           
                          
                                <Link 
                                    href="/configuracoes"
                                    className="flex items-center gap-4 px-2.5 text-foreground hover:text-foreground"
                                    prefetch={false}
                                    >
                                    <Settings className="h-5 w-5 transition-all" />
                                     Configurações
                                </Link>

                                

                            </nav>
                        </SheetContent>
                    </Sheet>
                    <h2>Menu</h2>
                </header>

            </div>
        </div>
    )
}