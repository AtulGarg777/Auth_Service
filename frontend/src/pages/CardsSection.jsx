import Cards from "./Cards"

function CardsSection({songCategory,limit,query}) {
    return (
        <section className='bg-neutral-950 text-white sm:p-7'>
            <h2 className='sm:text-2xl pl-3 py-4'>{songCategory}</h2>
            <Cards limit={limit} query={query} />
        </section>
    )
}

export default CardsSection
