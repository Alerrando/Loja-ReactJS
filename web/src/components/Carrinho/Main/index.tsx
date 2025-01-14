import React, { useContext } from 'react';
import { ShoppingBag, ShoppingCart, Trash } from 'phosphor-react'
import { ShopContext } from '../../../context/shopContext';
import { ProdutosCarrinho } from './ProdutosCarrinho';
import { ResumoCompra } from './ResumoCompra';

export function Main() {
    const { user ,setUser } = useContext(ShopContext)

    return (
        <main className='w-full h-auto md:h-screen pt-[3%] md:pt-[11%] pb-6 px-2 md:px-0 bg-[#e5e5e5] flex flex-col gap-8 md:gap-0 md:flex-row md:justify-center'>
             <section className='w-full md:w-[90%] h-[95%] md:h-auto md:ml-16 md:py-4 px-4 md:px-8 bg-white overflow-auto'>
                <header className='w-full h-auto py-2 flex items-center justify-start gap-4'>
                    <ShoppingCart size={30} className="text-[#ff0000]" />
                    <h2 className='text-xl font-bold'>Meu Carrinho</h2>
                </header>

                <section className='w-full h-auto md:mt-[2%]'>
                    <div className='w-full h-auto py-2 border-b border-[#929292] flex items-center justify-between'>
                        <div className='flex flex-row-reverse items-center gap-6'>
                            <h2 className='font-bold text-xl'>Produtos</h2>
                            <ShoppingBag size={24} className="text-[#f00]" />
                        </div>

                        <div className='flex flex-row gap-4 border border-[#f00] cursor-pointer p-2' onClick={() => handleDeleteAllProducts()}>
                            <Trash size={26} className="text-[#f00]" />
                            <span className='text-[#f00] font-bold hidden md:block'>Remover Todos os Produtos</span>
                        </div>
                    </div>

                    <div className='flex flex-col items-center justify-start gap-6'>
                        {Object.keys(user).length > 0 ? ( <ProdutosCarrinho /> ) : null}
                    </div>                    
                </section>
            </section>

            <aside className='w-full md:w-[35%] h-full  md:h-auto md:mx-20 py-4 bg-white'>
                <ResumoCompra />
            </aside>
        </main>
    );

    function handleDeleteAllProducts(){
        if(confirm("Tem certeza que deseja remover todos os produtos?")){
            const deleteAllProducts = [];
    
            setUser(prevState => {
                return { ...prevState, carrinho: deleteAllProducts }
            })
        }
    }
}