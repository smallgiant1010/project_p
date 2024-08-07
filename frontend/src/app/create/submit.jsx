import styles from "./create.module.scss";
import Link from 'next/link';
import {useState} from 'react';

export default function Submit(){

    const[email, setEmail] = useState('');
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');


    async function onSubmit(event){
        event.preventDefault();
        fetch('http://127.0.0.1:8000/profiles/create',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                email,
            }),
        })

        .then(response =>{
            if (!response.ok){
                return response.json().then(errorData =>{
                    throw new Error("can not make profile :(");
                });
            }
            return response.json();
        })
        .then(data=>{
            alert('Profile successfully created');
        })
        .catch(error=>{
            console.error('Error: ' ,error);
            alert("error boo hoo");
        });
    }

    return (
        <>
        </>
    )
}