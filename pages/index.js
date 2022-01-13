import Head from 'next/head'
import dynamic from "next/dynamic";
import { useEffect, useState } from 'react';
 import TrangChu from "./TrangChu"
//import Header from "./Header"
import Link from "next/link"


export default function Home() {

    return (
        <div className="abc">
            <TrangChu />
        </div>
    )
}