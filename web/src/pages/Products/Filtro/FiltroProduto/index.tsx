import { Accordion, AccordionDetails, AccordionSummary, Slider, Typography } from '@mui/material';
import { useForm } from "react-hook-form";
import { Faders, X } from 'phosphor-react';
import React, { useContext, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CardKeys, ShopContext } from '../../../../context/shopContext';

type FiltroProdutoProps = {
    setModalFiltro: (modalFiltro: boolean) => void,
}

type FormFiltroInputs = {
    tipoProduto: string;
    preço: number;
    marcas: string;
}

export function FiltroProduto(props: FiltroProdutoProps) {
    const { setModalFiltro } = props;
    const { register, handleSubmit,formState: { isValid }} = useForm<FormFiltroInputs>();
    const { products } = useContext(ShopContext);
    const categorias: CardKeys[] = filterCategory();

    return (
        <div className="w-full h-screen fixed top-0 left-0 bg-sombreamento z-50">
            <div className='w-4/5 md:w-1/3 h-full px-8 bg-white overflow-auto'>
                <header className='h-auto py-4 w-full flex items-center justify-end'>
                    <X size={28} className="cursor-pointer" onClick={() => setModalFiltro(false)} />
                </header>

                <section className='w-full h-auto flex flex-col items-center justify-start gap-6 mb-3'>
                    <header className='h-auto w-full relative flex flex-row items-center justify-between'>
                        <div className='w-auto h-auto flex items-center justify-start gap-3'>
                            <Faders size={26} className="text-[#88C8BC]" />
                            <span>Filtrar Por: </span>
                        </div>

                        <span className='font-semibold opacity-70 cursor-pointer'>Limpar Filtros</span>
                    </header>

                    <form className='w-full h-auto flex flex-col gap-6' onSubmit={handleSubmit(applyFilter)}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Tipo de Produto</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='flex flex-col gap-4 border-t border-[#e5e5e5]'>
                                <div>
                                    <input type="radio" value="ofertaProduto" className="w-[25px]" {...register("tipoProduto")} />
                                    <label translate='no'>Oferta</label>
                                </div>
                                <div>
                                    <input type="radio" value="liquidaçãoProduto" className="w-[25px]" {...register("tipoProduto")} />
                                    <label translate='no'>Liquidação</label>
                                </div>
                                <div>
                                    <input type="radio" value="freteGratisProduto" className="w-[25px]" {...register("tipoProduto")} />
                                    <label translate='no'>Frete Gratis</label>
                                </div>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Preço</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='flex flex-col gap-6 border-t border-[#e5e5e5]'>
                                <label>Intervalo de Preço</label>
                                <Slider size="small" aria-label="Small" valueLabelDisplay="auto" min={0} max={9999} {...register("preço")} />
                            </AccordionDetails>
                        </Accordion>
                        
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>Categoria</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='flex flex-col gap-6 border-t border-[#e5e5e5]'>
                                {categorias.map((category: CardKeys) => (
                                    <div className='flex flex-row items-center justify-start gap-4'>
                                        <input type="radio" value={category.categoria} className="w-[25px]" {...register("marcas")} />
                                        <label className='first-letter:uppercase' translate='no'>{category.categoria}</label>
                                    </div>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                        
                        <button type="submit" className='w-full py-2 bg-blue-600 text-white'>Aplicar Filtro</button>
                    </form>
                </section>
            </div>
        </div>
    );
    
    function filterCategory(){
        const auxCategoria: string[] = [];
        const aux: CardKeys[] = [];


        products.map((product: CardKeys) => {
            if(auxCategoria.length == 0){
                auxCategoria.push(product.categoria)
                return ;
            }

            if(auxCategoria.indexOf(product.categoria) == -1){
                auxCategoria.push(product.categoria)
                aux.push(product)
            }
        })

        return aux;
    }

    function applyFilter(e){
        console.log(e);
    }
}