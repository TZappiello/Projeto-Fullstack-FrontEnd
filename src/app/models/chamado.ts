export interface Chamado {
    id?: any;
    dataAbertura?: string;
    dataFechamento?: string;
    prioridade: string;
    status: string;
    titulo: string;
    descricao: string;
    tecnico: any;
    cliente: any;
    nomeTecnico: string;
    nomeCliente: string;
}