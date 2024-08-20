"use client";
import Image from 'next/image';
import React from 'react'
import { useEffect, useState } from "react";
import styles from "./credits.module.scss";

export default function Credits(){
    return(
        <main className = {styles.credits_section}>
            <div className = {styles.credits_container}>
                <div className = {styles.credits_body}>
                    <h1 className = {styles.credits_header}>Credits</h1>
                    <Image className = {styles.image_item} src = "/sources/vercellogo.png" alt = "Website Host" width = {300} height = {100} quality = {100}  />
                    <Image className = {styles.image_item} src = "/sources/unsplashlogo.png" alt = "Images" width = {300} height = {200} quality = {100} />
                    <Image className = {styles.image_item} src = "/sources/apininjalogo.png" alt = "API" width = {300} height = {100} quality = {100} />
                    <Image className = {styles.image_item} src = "/sources/marketchecklogo.png" alt = "Market Data" width = {300} height = {100} quality = {100} />
                    <Image className = {styles.image_item} src = "/sources/renderlogo.png" alt = "Render" width = {300} height = {100} quality = {100} />
                </div>
            </div>
        </main>
    );
}