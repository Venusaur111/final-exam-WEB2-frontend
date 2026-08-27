import { FaMagnifyingGlass } from 'react-icons/fa6'

const FilterBarForStudent = () => {

    return (
        <>
            <section className="rounded-2xl border border-[#dfe4eb] bg-white p-5 shadow-sm m-5">
                <div className="grid gap-4 xl:grid-cols-[1.5fr_0.8fr_0.8fr_auto]">
                    <div className="flex items-center gap-3 rounded-xl border border-[#d9dee7] px-4 py-3 text-[#7a8296]">
                        <FaMagnifyingGlass />

                        <input
                            type="text"
                            placeholder="Search"
                            className="w-full bg-transparent outline-none"
                        />
                    </div>

                    <select className="rounded-xl border border-[#d9dee7] bg-white px-4 py-3 text-[#566078] outline-none">
                        <option>All classes</option>
                    </select>

                    <select className="rounded-xl border border-[#d9dee7] bg-white px-4 py-3 text-[#566078] outline-none">
                        <option>All statuts</option>
                        <option>Enabled</option>
                        <option>Disabled</option>
                    </select>

                    <button
                        type="button"
                        className="rounded-xl bg-[#4e1f6e] border px-5 py-3 font-semibold text-white transition hover:bg-[#321E48]"
                    >
                        Clear all
                    </button>
                </div>
            </section>
        </>
    )
}

export default FilterBarForStudent;
