import { FaRegUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";

const LoginForm = () => {
    return (
        <>
            <form action="authentification" className="place-self-center place-content-center shadow-[0px_0px_10px_#1D546C]
            rounded-lg overflow-hidden bg-white flex flex-col items-center min-w-[300px]">

                <section className="w-full bg-[#D9FFF4] py-8 px-6 flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-bold text-[#4E1F6E]">Welcome</h1>
                </section>


                <section className="w-full flex flex-col gap-10 items-center py-12 px-6">
                    <div className="flex items-end gap-6 text-[#007979]">
                        <label htmlFor="email"><FaRegUser className="text-2xl" /></label>
                        <input
                            type="email"
                            name=""
                            id="email"
                            className="bg-transparent border-b-2 rounded-sm border-[#007979] focus:outline-none px-2 py-[0.5px] text-[#4E1F6E]"
                        />
                    </div>
                    <div className="flex items-end gap-6 text-[#007979]">
                        <label htmlFor="password"><MdPassword className="text-2xl" /></label>
                        <input
                            type="password"
                            name=""
                            id="password"
                            className="bg-transparent border-b-2 rounded-sm border-[#007979] focus:outline-none px-1 text-[#4E1F6E]"
                        />
                    </div>
                </section>

                <section className="w-full bg-[#D9FFF4] py-8 px-6 flex justify-center">
                    <button
                        type="submit"
                        className="w-full bg-[#4E1F6E] text-white font-bold py-2 px-8 rounded-lg shadow-md hover:bg-[#65DCD5] hover:text-[#4E1F6E] transition-colors duration-500"
                    >
                        Login
                    </button>
                </section>

            </form>
        </>
    )
}

export default LoginForm;