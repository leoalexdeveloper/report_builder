"use client"
import {Register as RegisterAction} from './actions'
import {useState} from 'react'
import {redirect} from 'next/navigation'
export default function Register(){
    
    const [name, setName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const isButtonDisabled = [name, password, repeatPassword, email].includes('')
    const [errors, setErrors] = useState<{location:string, msg:string, path:string, type: string, value: string}[]>()
    
    const submit = async () => {
        const form = document.querySelector('form') as HTMLFormElement
        (form as HTMLFormElement).onSubmit = (event: SubmitEvent) => {event.preventDefault()}
        
        const data = new FormData()
        data.append('name', name)
        data.append('password', password)
        data.append('email', email)
        data.append('repeat_password', repeatPassword)
        const user = await RegisterAction(data)
        console.log(user)
        if(user.errors){
            setErrors(user.errors)
            errors?.forEach(error => console.log(error.msg))
        }
        if(user.uuid && !(user instanceof Error)){
            redirect(`/user/registered/${user.name}`)
        }
    }
    
    return (
        <>
            <section className="w-screen h-screen bg-gray-200 flex flex-col justify-center items-center p-2">
            <form action={submit}
                className="w-full xs:w-11/12 sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-5/12 2xl:w-4/12 
                flex flex-col justify-between items-center border border-gray-500 rounded">
                
                    <header className="w-full h-112 px-2 py-4 bg-gray-500">
                        <h1 className="text-2xl text-gray-200">
                            Register
                        </h1>
                    </header>
                    <div className="w-full flex flex-col px-2 pt-2 mt-2">
                        <label htmlFor="username" 
                        className="text-lg text-gray-400">
                            Username
                        </label>
                        <input 
                            type="text" id="username" name="username" title="username" 
                            placeholder="Username: Between 4 and 255 characters" 
                            className="w-full px-2 py-2 rounded my-2 text-gray-500 bg-gray-100 outline-none"
                            value={name}
                            onChange={event => setName(event.target.value)}
                            /* pattern="[\w+_@]{4,255}" */
                            /* required *//>
                            <ul>
                               {errors?.map((error, index) => {
                                if(error.path === 'name')
                                return (
                                    <li key={index} className="text-red-500">{error.msg.substring(0,1).toUpperCase()+error.msg.substring(1,error.msg.length).toLowerCase()}</li>
                                )
                               })}
                            </ul>
                    </div>

                    <div className="w-full flex flex-col px-2 pt-2 mt-2">
                        <label htmlFor="email" 
                        className="text-lg text-gray-400">
                            Email
                        </label>
                        <input 
                            type="email" id="email" name="email" title="email" 
                            placeholder="Email: Must be a valid e-mail" 
                            className="w-full px-2 py-2 rounded my-2 text-gray-500 bg-gray-100 outline-none"
                            value={email}
                            onChange={event => setEmail(event.target.value)}
                            /* required *//>
                            <ul>
                               {errors?.map((error, index) => {
                                if(error.path === 'email')
                                return (
                                    <li key={index} className="text-red-500">{error.msg.substring(0,1).toUpperCase()+error.msg.substring(1,error.msg.length).toLowerCase()}</li>
                                )
                               })}
                            </ul>
                    </div>

                    <div className="w-full flex flex-col px-2 pt-2">
                        <label htmlFor="password" className="text-lg text-gray-400">
                            Password
                        </label>
                        <input 
                            type="password" id="password" name="password" title="password" 
                            placeholder="Password: Between 4 and 255 characters" 
                            className="w-full px-2 py-2 rounded my-2 text-gray-500 bg-gray-100 outline-none"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                            /* pattern="[\w+_@]{4,255}" */
                            /* required *//>
                            <ul>
                               {errors?.map((error, index) => {
                                if(error.path === 'password')
                                return (
                                    <li key={index} className="text-red-500">{error.msg.substring(0,1).toUpperCase()+error.msg.substring(1,error.msg.length).toLowerCase()}</li>
                                )
                               })}
                            </ul>
                    </div>

                    <div className="w-full flex flex-col px-2 pt-2">
                        <label htmlFor="repeat_password" className="text-lg text-gray-400">
                            Repeat Password
                        </label>
                        <input 
                            type="password" id="repeat_password" name="repeat_password" title="repeat_password" 
                            placeholder="Repeat Password" 
                            className="w-full px-2 py-2 rounded my-2 text-gray-500 bg-gray-100 outline-none"
                            value={repeatPassword}
                            onChange={event => setRepeatPassword(event.target.value)}
                            /* required *//>
                            <ul>
                               {errors?.map((error, index) => {
                                if(error.path === 'repeat_password')
                                return (
                                    <li key={index} className="text-red-500">{error.msg.substring(0,1).toUpperCase()+error.msg.substring(1,error.msg.length).toLowerCase()}</li>
                                )
                               })}
                            </ul>
                    </div>

                    <footer className="w-full h-auto px-2 pt-2">
                        <button type="submit" value="Register"
                        className="w-full h-ato text-gray=800 border px-4 py-3 bg-blue-500 text-lg rounded disabled:bg-gray-400"
                        disabled={isButtonDisabled}>Save</button>
                        <div className="py-4">
                            <a href="" className="text-gray-500 text-md pt-2">Forgot your password?</a>
                        </div>
                    </footer>
                
                </form>
            </section>
        </>
    )
}