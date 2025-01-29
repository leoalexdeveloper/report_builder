"use client"
import {useParams} from 'next/navigation'
export default function RegisterSuccessfullyPage(){
    const params = useParams<{name:string}>()
    const name = params.name.substring(0,1).toUpperCase()+params.name.substring(1,params.name.length).toLowerCase()
    console.log(params)
    return (
        <>
            <section className="w-screen h-screen bg-gray-200 flex flex-col justify-center items-center">
                <h1 className="w-11/12 text-gray-600 text-3xl text-center">Thank you to register at this platform {name}!</h1>
                <h3 className="w-11/12 text-gray-200 text-3xl bg-gray-400 py-4 px-2 rounded-lg text-center mt-4">Important: <br/>Remember to visit your mail-box to check our e-mail and activate your account before Login!</h3>
            </section>
        </>
    )
}