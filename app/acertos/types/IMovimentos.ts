export type IMovimentos = {
    	 id: number,
		 codigo: number,
		 setor: number,
		 produto: number,
		 quantidade: number | string ,
		 unidade_medida: string,
		 tipo: string,
		 historico: string,
		 data_recadastro: string,
		 usuario: number,
		 ent_sai: 'E' | 'S'
}
export type IMovimentoCompleto = 
{
		 produto : {
			 codigo : number,
			 id : number,
			 estoque : number,
			 preco : number,
			 unidade_medida : string,
			 grupo : number,
			 origem : number | string,
			 descricao : string,
			 num_fabricante : string,
			 num_original : string,
			 sku : string,
			 marca : number,
			 ativo : "S" | "N",
			 class_fiscal : string,
			 cst : string,
			 data_recadastro : string,
			 data_cadastro : string,
			 observacoes1 : string,
			 observacoes2 : string,
			 observacoes3 : string,
			 tipo : number
		},
		 movimento : {
			 id: number,
			 codigo: number,
			 setor: number,
			 produto: number,
			 quantidade: number | string,
			 unidade_medida: string,
			 tipo: string | 'A',
			 historico: string,
			 data_recadastro: string,
			 usuario: number,
			 ent_sai: 'E' | 'S'
		},
		 setor : {
			 codigo: number,
			 descricao: string,
			 data_cadastro: string,
			 data_recadastro: string,
			 ativo: "S" | "N",
			 id: string
		}
	}